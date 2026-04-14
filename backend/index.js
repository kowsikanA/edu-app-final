import "dotenv/config";
import axios from "axios";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import lessonsData from "./lessonStruct.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY?.trim();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

void lessonsData;

const recentLessonVariations = new Map();

const QUESTION_IMAGE_TIMEOUT_MS = 45000;
const QUESTION_IMAGE_CONCURRENCY = 3;

const STYLE_BOOST =
  "minimal flat 2d cartoon illustration, children's educational app style, simple clean shapes, smooth outlines, bright vibrant colours, uncluttered background, easy to understand, vector-style, no realism";

const ANATOMY_GUARD =
  "correct anatomy, one head, two arms, two hands, two legs, natural pose, no extra limbs, no duplicated body parts, no distorted face";

function getLessonVariationKey(payload) {
  return `${payload.grade || "grade"}::${payload.unit || "unit"}::${payload.lessonId || payload.title || "lesson"}`;
}

function rememberLessonVariation(payload, questions) {
  const key = getLessonVariationKey(payload);

  const compact = (questions || []).map((q) => ({
    type: q.type || "",
    scenarioTitle: q.scenarioTitle || "",
    scenarioText: q.scenarioText || "",
    question: q.question || "",
    options: (q.options || []).map((o) => o.text || ""),
    cards: (q.cards || []).map((c) => c.title || c.text || ""),
    items: (q.items || []).map((i) => i.name || i.label || "")
  }));

  recentLessonVariations.set(key, compact);
}

function getPreviousLessonVariation(payload) {
  return recentLessonVariations.get(getLessonVariationKey(payload)) || null;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function sanitizeHintEmojis(value) {
  return String(value || "")
    .replace(/✅|❌/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeQuestionType(rawType) {
  const value = String(rawType || "").trim().toLowerCase();

  if (value.includes("drag")) return "drag-drop";
  if (value.includes("budget")) return "budget-builder";
  if (value.includes("tap")) return "tap-reveal";
  if (value.includes("scenario")) return "scenario-choice";

  return "scenario-choice";
}

function normalizeSemanticText(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractScenarioKeywords(question = {}) {
  const combined = normalizeSemanticText(
    `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""} ${question?.heroCaption || ""}`
  );

  const keywordGroups = {
    snacks: [
      "snack", "lunch", "food", "treat", "drink", "juice", "sandwich",
      "fruit", "cookie", "chips", "candy", "ice cream", "cafeteria"
    ],
    school: [
      "school", "classroom", "supplies", "notebook", "pencil",
      "markers", "folder", "backpack", "glue", "crayons"
    ],
    art: [
      "art", "paint", "canvas", "poster", "project", "craft",
      "brush", "glitter", "scissors"
    ],
    toys: [
      "toy", "game", "doll", "puzzle", "blocks", "board game",
      "stuffed animal", "action figure", "slime"
    ],
    reading: [
      "book", "reading", "library", "comic", "flash cards", "storybook"
    ],
    sports: [
      "sports", "soccer", "basketball", "practice", "helmet",
      "ball", "sneakers", "whistle"
    ],
    pets: [
      "pet", "dog", "cat", "leash", "pet food", "collar", "water bowl"
    ],
    saving: [
      "save", "saving", "coupon", "sale", "shopping list",
      "compare prices", "spend", "money habits"
    ]
  };

  const matched = new Set();

  Object.entries(keywordGroups).forEach(([group, words]) => {
    if (words.some((word) => combined.includes(word))) {
      matched.add(group);
    }
  });

  return {
    combined,
    matched: [...matched]
  };
}

function itemMatchesScenario(itemLabel, question = {}) {
  const label = normalizeSemanticText(itemLabel);
  const { matched } = extractScenarioKeywords(question);

  const labelGroups = {
    snacks: [
      "sandwich", "water bottle", "apple", "banana", "orange", "fruit",
      "yogurt", "granola", "juice", "cookie", "chips", "candy", "ice cream", "soda"
    ],
    school: [
      "notebook", "pencil", "folder", "glue", "eraser", "markers",
      "crayons", "backpack", "ruler", "calculator", "poster board"
    ],
    art: [
      "canvas", "paint", "brush", "brushes", "poster board",
      "glitter", "scissors", "markers", "glue"
    ],
    toys: [
      "toy", "toy car", "board game", "video game", "puzzle",
      "building blocks", "stuffed animal", "action figure", "doll", "slime"
    ],
    reading: [
      "book", "comic", "flash cards", "notebook", "reading light", "bookmark"
    ],
    sports: [
      "soccer ball", "basketball", "helmet", "sports bag", "sneakers",
      "water bottle", "whistle"
    ],
    pets: [
      "pet food", "water bowl", "leash", "collar", "pet bed", "brush"
    ],
    saving: [
      "coupon", "compare prices", "shopping list", "sale",
      "save money", "bring lunch", "buy candy", "buy toys", "spend it all"
    ]
  };

  for (const group of matched) {
    const words = labelGroups[group] || [];
    if (words.some((word) => label.includes(word))) {
      return true;
    }
  }

  return false;
}

function inferDragDropBuckets(question) {
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

  if (
    containsAny(combined, [
      "saving action",
      "helps you save",
      "promote saving",
      "hinder",
      "hurts saving",
      "help you save",
      "saving habits",
      "smart money action"
    ])
  ) {
    return {
      left: {
        id: "helps-saving",
        title: "Helps Saving",
        subtitle: "Good saving actions"
      },
      right: {
        id: "hurts-saving",
        title: "Hurts Saving",
        subtitle: "Actions that make saving harder"
      }
    };
  }

  if (
    containsAny(combined, [
      "school supplies",
      "for school",
      "needed for school",
      "classroom",
      "bring to school"
    ])
  ) {
    return {
      left: {
        id: "school-need",
        title: "Needed for School",
        subtitle: "Important school items"
      },
      right: {
        id: "school-extra",
        title: "Extra Items",
        subtitle: "Fun but not needed"
      }
    };
  }

  return {
    left: {
      id: "need",
      title: "Needs",
      subtitle: "Must-have items"
    },
    right: {
      id: "want",
      title: "Wants",
      subtitle: "Fun extras"
    }
  };
}

function isActionLabel(label = "") {
  const value = label.toLowerCase();

  return containsAny(value, [
    "use",
    "buy",
    "save",
    "wait",
    "make",
    "bring",
    "pack",
    "compare",
    "forget",
    "spend",
    "look",
    "plan",
    "reuse",
    "borrow",
    "fix"
  ]);
}
function buildMinimalEmergencyDragDropItems(bucketConfig, index, question = {}) {
  const leftId = bucketConfig.left.id;
  const rightId = bucketConfig.right.id;

  const { matched } = extractScenarioKeywords(question);

  let emergencyLeft = ["Water Bottle", "Notebook", "Pencils", "Backpack", "Lunch"];
  let emergencyRight = ["Candy", "Toy Car", "Sticker Pack", "Cookie", "Video Game"];

  if (matched.includes("snacks")) {
    emergencyLeft = ["Apple Slices", "Sandwich", "Yogurt", "Banana", "Water Bottle"];
    emergencyRight = ["Candy", "Cookie", "Chips", "Soda", "Ice Cream"];
  } else if (matched.includes("school")) {
    emergencyLeft = ["Notebook", "Pencils", "Folder", "Glue", "Backpack"];
    emergencyRight = ["Sticker Pack", "Toy Car", "Candy", "Bracelet", "Slime"];
  } else if (matched.includes("art")) {
    emergencyLeft = ["Canvas", "Paint Set", "Brushes", "Markers", "Scissors"];
    emergencyRight = ["Glitter", "Sticker Pack", "Candy", "Bracelet", "Toy Car"];
  } else if (matched.includes("toys")) {
    emergencyLeft = ["Board Game", "Puzzle", "Building Blocks", "Book", "Craft Kit"];
    emergencyRight = ["Toy Car", "Stuffed Animal", "Slime", "Candy", "Video Game"];
  } else if (matched.includes("sports")) {
    emergencyLeft = ["Soccer Ball", "Water Bottle", "Helmet", "Sneakers", "Sports Bag"];
    emergencyRight = ["Candy", "Sticker Pack", "Toy Car", "Cookie", "Video Game"];
  } else if (matched.includes("reading")) {
    emergencyLeft = ["Book", "Notebook", "Pencil", "Flash Cards", "Bookmark"];
    emergencyRight = ["Toy Car", "Candy", "Sticker Pack", "Bracelet", "Video Game"];
  }

  return [
    ...emergencyLeft.map((label, itemIndex) => ({
      id: `q${index + 1}l${itemIndex + 1}`,
      label,
      emoji: pickItemEmoji(label, leftId, question),
      bucket: leftId
    })),
    ...emergencyRight.map((label, itemIndex) => ({
      id: `q${index + 1}r${itemIndex + 1}`,
      label,
      emoji: pickItemEmoji(label, rightId, question),
      bucket: rightId
    }))
  ];
}



function normalizeDragDropBucketValue(rawBucket, bucketConfig, itemLabel = "") {
  const value = String(rawBucket || "").trim().toLowerCase();
  const label = String(itemLabel || "").trim().toLowerCase();

  const leftId = bucketConfig.left.id;
  const rightId = bucketConfig.right.id;

  const leftAliases = new Set([
    leftId,
    "need",
    "needs",
    "must-have",
    "must have",
    "help",
    "helps",
    "helpful",
    "good",
    "smart",
    "saving",
    "save",
    "helps-saving",
    "good for saving",
    "helpful actions",
    "healthy",
    "healthy snack",
    "school-need",
    "needed",
    "important",
    "essential"
  ]);

  const rightAliases = new Set([
    rightId,
    "want",
    "wants",
    "extra",
    "extras",
    "fun",
    "hurt",
    "hurts",
    "not helpful",
    "bad",
    "not-saving",
    "hurts-saving",
    "not good for saving",
    "not helpful actions",
    "treat",
    "treats",
    "school-extra",
    "optional",
    "nonessential",
    "non-essential"
  ]);

  if (leftAliases.has(value)) return leftId;
  if (rightAliases.has(value)) return rightId;

  // saving actions / habits
  if (leftId === "helps-saving" && rightId === "hurts-saving") {
    if (
      containsAny(label, [
        "use a coupon",
        "compare prices",
        "wait for a sale",
        "make a shopping list",
        "bring lunch from home",
        "save part of your money",
        "put money in savings",
        "buy only what you need",
        "reuse supplies",
        "borrow from the library",
        "fix it instead of replacing it",
        "plan before shopping",
        "look for a better price",
        "save first",
        "pack a snack from home"
      ])
    ) {
      return leftId;
    }

    if (
      containsAny(label, [
        "buy candy at checkout",
        "buy toys first",
        "spend it all right away",
        "shop without a plan",
        "forget your saving goal",
        "buy extras you do not need",
        "impulse buy",
        "waste money",
        "pay full price without checking",
        "shop just because",
        "buy snacks every day",
        "spend all your coins",
        "grab extra treats"
      ])
    ) {
      return rightId;
    }
  }

  // generic helpful actions vs not helpful actions
  if (
    containsAny(leftId, ["helpful"]) ||
    containsAny(rightId, ["not-helpful"]) ||
    containsAny(bucketConfig.left.title.toLowerCase(), ["helpful"]) ||
    containsAny(bucketConfig.right.title.toLowerCase(), ["not helpful"])
  ) {
    if (
      containsAny(label, [
        "use a coupon",
        "compare prices",
        "wait for a sale",
        "make a shopping list",
        "bring lunch from home",
        "save part of your money",
        "pack a snack",
        "buy only what you need",
        "plan your spending",
        "look for deals"
      ])
    ) {
      return leftId;
    }

    if (
      containsAny(label, [
        "buy candy right away",
        "buy toys first",
        "spend it all",
        "shop without a plan",
        "forget your goal",
        "buy extras",
        "impulse buy",
        "waste money"
      ])
    ) {
      return rightId;
    }
  }

  // needs vs wants
  if (leftId === "need" && rightId === "want") {
    if (
      containsAny(label, [
        "water bottle",
        "lunch",
        "sandwich",
        "apple",
        "banana",
        "orange",
        "fruit",
        "yogurt",
        "granola bar",
        "notebook",
        "pencil",
        "pencils",
        "backpack",
        "glue",
        "folder",
        "eraser",
        "crayons",
        "markers",
        "book",
        "poster board",
        "calculator",
        "ruler",
        "scissors"
      ])
    ) {
      return leftId;
    }

    if (
      containsAny(label, [
        "candy",
        "toy",
        "sticker",
        "cookie",
        "movie ticket",
        "ice cream",
        "chips",
        "bracelet",
        "keychain",
        "video game",
        "glitter",
        "slime",
        "comic"
      ])
    ) {
      return rightId;
    }
  }

  // school items
  if (leftId === "school-need" && rightId === "school-extra") {
    if (
      containsAny(label, [
        "notebook",
        "pencil",
        "pencils",
        "folder",
        "glue",
        "eraser",
        "markers",
        "crayons",
        "backpack",
        "water bottle",
        "lunch",
        "poster board",
        "ruler",
        "calculator",
        "scissors"
      ])
    ) {
      return leftId;
    }

    if (
      containsAny(label, [
        "sticker",
        "toy",
        "candy",
        "cookie",
        "bracelet",
        "keychain",
        "movie ticket",
        "ice cream",
        "glitter",
        "slime"
      ])
    ) {
      return rightId;
    }
  }

  return "";
}

function getDragDropSceneInstruction(question) {
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

  if (
    containsAny(combined, [
      "saving action",
      "helps you save",
      "promote saving",
      "hinder",
      "saving habits"
    ])
  ) {
    return "Show a child thinking about saving money, shopping choices, and money habits in a realistic store or everyday spending setting.";
  }

  return "Show a clear topic scene that matches the sorting activity so the child understands the category situation.";
}

function containsAny(text, words) {
  const value = String(text || "").toLowerCase();
  return words.some((word) => value.includes(word));
}

function cleanSceneText(text) {
  return String(text || "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMoneyAmount(text) {
  const match = String(text || "").match(/\$(\d+)/);
  return match ? Number(match[1]) : null;
}

function extractAllMoneyAmounts(text) {
  return [...String(text || "").matchAll(/\$(\d+)/g)].map((match) =>
    Number(match[1])
  );
}

function normalizeCurrencyText(value) {
  return typeof value === "number" && Number.isFinite(value)
    ? `$${value}`
    : null;
}

function getWalletAmount(question) {
  if (
    typeof question?.walletAmount === "number" &&
    Number.isFinite(question.walletAmount)
  ) {
    return question.walletAmount;
  }

  const values = extractAllMoneyAmounts(
    `${question?.scenarioText || ""} ${question?.question || ""}`
  );
  return values.length > 0 ? values[0] : null;
}

function getGoalPrice(question) {
  const sources = [
    question?.goal,
    question?.scenarioText,
    question?.question,
    question?.heroCaption
  ];

  for (const source of sources) {
    const values = extractAllMoneyAmounts(source);
    if (values.length > 0) return Math.max(...values);
  }

  return null;
}

function detectGoalItem(question) {
  const combined =
    `${question?.goal || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

  const map = [
    ["video game", ["video game", "new game", "game"]],
    ["toy car", ["toy car"]],
    ["toy", ["toy"]],
    ["book", ["storybook", "children's book", "childrens book", "book"]],
    ["backpack", ["backpack"]],
    ["notebook", ["notebook"]],
    ["school supplies", ["school supplies", "art supplies", "supplies"]],
    ["skateboard", ["skateboard"]],
    ["scooter", ["scooter"]],
    ["headphones", ["headphones"]],
    ["bike", ["bike", "bicycle"]],
    ["water bottle", ["water bottle"]],
    ["lunch", ["lunch", "meal"]],
    ["soccer ball", ["soccer ball"]],
    ["art kit", ["art kit"]],
    ["lunch box", ["lunch box"]],
    ["tablet", ["tablet"]]
  ];

  for (const [label, keywords] of map) {
    if (containsAny(combined, keywords)) return label;
  }

  return "";
}

function detectScenarioLocation(question) {
  const combined =
    `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""} ${question?.goal || ""}`.toLowerCase();

  if (containsAny(combined, ["bookstore", "book shop"])) return "bookstore";
  if (containsAny(combined, ["bike", "bicycle"])) return "bike shop";
  if (containsAny(combined, ["toy store", "toy shop"])) return "toy store";
  if (containsAny(combined, ["cafeteria", "lunch room", "school lunch"])) return "cafeteria";
  if (containsAny(combined, ["art table", "art class", "class art"])) return "classroom art table";
  if (containsAny(combined, ["party table", "class party"])) return "classroom party table";
  if (containsAny(combined, ["movie night"])) return "home movie night table";
  if (
    containsAny(combined, [
      "school supplies",
      "markers",
      "pencil",
      "notebook",
      "backpack",
      "folder",
      "glue",
      "crayons"
    ])
  ) {
    return "school supply store";
  }
  if (
    containsAny(combined, [
      "cookie",
      "chips",
      "ice cream",
      "juice",
      "sandwich",
      "fruit",
      "snack"
    ])
  ) {
    return "snack shop";
  }

  return "store";
}

function normalizeEmojiLabel(label = "") {
  return String(label || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickItemEmoji(label, bucketId = "", question = null) {
  const value = normalizeEmojiLabel(label);
  const bucket = String(bucketId || "").toLowerCase();
  const combinedQuestionText = normalizeEmojiLabel(
    `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""}`
  );

  const hasAny = (phrases) => phrases.some((phrase) => value.includes(phrase));
  const questionHasAny = (phrases) =>
    phrases.some((phrase) => combinedQuestionText.includes(phrase));

  // saving / money actions
  if (hasAny(["save part of your money", "put money in savings", "save money", "save for later"])) {
    return "💰";
  }
  if (hasAny(["compare prices", "check prices", "price check"])) {
    return "🏷️";
  }
  if (hasAny(["use a coupon", "coupon"])) {
    return "🏷️";
  }
  if (hasAny(["wait for a sale", "wait for sale"])) {
    return "⏳";
  }
  if (hasAny(["make a shopping list", "shopping list", "make a list"])) {
    return "📝";
  }
  if (hasAny(["bring lunch from home", "bring lunch", "packed lunch"])) {
    return "🥪";
  }
  if (hasAny(["buy only what you need", "buy what you need", "only what you need"])) {
    return "🛒";
  }
  if (hasAny(["reuse supplies", "reuse"])) {
    return "♻️";
  }
  if (hasAny(["borrow from the library", "library"])) {
    return "📚";
  }
  if (hasAny(["fix it instead of replacing it", "fix it", "repair"])) {
    return "🛠️";
  }

  // hurts saving / spending actions
  if (hasAny(["buy candy at checkout", "buy candy", "candy at checkout"])) {
    return "🍬";
  }
  if (hasAny(["buy toys first", "buy toys", "toy first"])) {
    return "🧸";
  }
  if (hasAny(["spend it all right away", "spend it all"])) {
    return "💸";
  }
  if (hasAny(["shop without a plan", "without a plan"])) {
    return "🛍️";
  }
  if (hasAny(["forget your saving goal", "forget your goal"])) {
    return "🎯";
  }
  if (hasAny(["buy extras you do not need", "buy extras", "extras you do not need"])) {
    return "🛒";
  }
  if (hasAny(["impulse buy", "impulse buying"])) {
    return "⚡";
  }
  if (hasAny(["waste money"])) {
    return "💸";
  }

  // project / school supplies
  if (hasAny(["poster board"])) return "📋";
  if (hasAny(["notebook paper"])) return "📄";
  if (hasAny(["notebook"])) return "📓";
  if (hasAny(["pencil", "pencils"])) return "✏️";
  if (hasAny(["markers"])) return "🖍️";
  if (hasAny(["crayons"])) return "🖍️";
  if (hasAny(["eraser"])) return "🩹";
  if (hasAny(["glue"])) return "🧴";
  if (hasAny(["folder"])) return "📁";
  if (hasAny(["scissors"])) return "✂️";
  if (hasAny(["ruler"])) return "📏";
  if (hasAny(["calculator"])) return "🧮";
  if (hasAny(["backpack"])) return "🎒";
  if (hasAny(["book", "comic book"])) return hasAny(["comic book"]) ? "📚" : "📚";
  if (hasAny(["water bottle"])) return "💧";
  if (hasAny(["lunch box"])) return "🍱";
  if (hasAny(["lunch"])) return "🍽️";

  // food
  if (hasAny(["sandwich"])) return "🥪";
  if (hasAny(["apple slices", "apple"])) return "🍎";
  if (hasAny(["banana"])) return "🍌";
  if (hasAny(["orange"])) return "🍊";
  if (hasAny(["fruit"])) return "🍎";
  if (hasAny(["yogurt"])) return "🥣";
  if (hasAny(["granola bar", "granola"])) return "🥨";
  if (hasAny(["cookie"])) return "🍪";
  if (hasAny(["chips"])) return "🥔";
  if (hasAny(["ice cream"])) return "🍦";
  if (hasAny(["soda"])) return "🥤";
  if (hasAny(["juice"])) return "🧃";
  if (hasAny(["candy", "chocolate bar"])) return hasAny(["chocolate bar"]) ? "🍫" : "🍬";

  // fun / extras
  if (hasAny(["toy car"])) return "🚗";
  if (hasAny(["toy"])) return "🧸";
  if (hasAny(["video game", "game"])) return "🎮";
  if (hasAny(["bracelet"])) return "📿";
  if (hasAny(["keychain"])) return "🔑";
  if (hasAny(["sticker pack", "stickers", "sticker"])) return "✨";
  if (hasAny(["glitter"])) return "✨";
  if (hasAny(["slime"])) return "🫧";

  // bucket-aware fallback
  if (bucket === "helps-saving") return "💰";
  if (bucket === "hurts-saving") return "💸";
  if (bucket === "school-need") {
    if (questionHasAny(["project", "art", "poster", "craft"])) return "📋";
    return "📚";
  }
  if (bucket === "school-extra") return "✨";
  if (bucket === "need") return "🛍️";
  if (bucket === "want") return "⭐";

  return "🧩";
}

function pickCardEmoji(title, text, index) {
  const value = `${title || ""} ${text || ""}`.toLowerCase();

  if (containsAny(value, ["money", "$", "cost", "price", "save"])) return "💰";
  if (containsAny(value, ["goal", "target"])) return "🎯";
  if (containsAny(value, ["smart", "best", "good choice", "correct"])) return "💡";
  if (containsAny(value, ["think", "clue", "hint"])) return "💡";

  return index === 0 ? "💡" : index === 1 ? "🎯" : index === 2 ? "🧠" : "💰";
}

function getQuestionObjects(question) {
  const objects = [];

  if (Array.isArray(question?.items)) {
    for (const item of question.items) {
      objects.push({
        name: item.name || item.label || "",
        price:
          typeof item.price === "number" && Number.isFinite(item.price)
            ? item.price
            : null,
        tag: item.tag || "",
        type: "item"
      });
    }
  }

  if (Array.isArray(question?.options)) {
    for (const option of question.options) {
      objects.push({
        name: option.text || "",
        price: extractMoneyAmount(option.text || ""),
        tag: option.subText || "",
        type: "option"
      });
    }
  }

  return objects;
}

function dedupeObjects(objects) {
  const seen = new Set();
  const result = [];

  for (const obj of objects) {
    const key = `${String(obj.name || "").toLowerCase()}::${obj.price ?? ""}`;
    if (!obj.name || seen.has(key)) continue;
    seen.add(key);
    result.push(obj);
  }

  return result;
}

function shuffleArray(array) {
  if (!Array.isArray(array)) return [];

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function buildObjectListForPrompt(question) {
  const objects = dedupeObjects(getQuestionObjects(question));

  return objects
    .slice(0, 8)
    .map((obj) => {
      if (obj.price != null) {
        return `${obj.name} with a clear ${normalizeCurrencyText(obj.price)} price tag`;
      }
      return obj.name;
    })
    .join(", ");
}

function buildScenarioFacts(question) {
  const facts = [];

  const walletAmount = getWalletAmount(question);
  const goalPrice = getGoalPrice(question);
  const goalItem = detectGoalItem(question);

  if (walletAmount != null) {
    facts.push(`The student currently has ${normalizeCurrencyText(walletAmount)}.`);
  }

  if (question?.budget != null && Number.isFinite(question.budget)) {
    facts.push(`The total budget is ${normalizeCurrencyText(question.budget)}.`);
  }

  if (goalItem) {
    if (goalPrice != null) {
      facts.push(`The saving goal is a ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}.`);
    } else {
      facts.push(`The student has a saving goal: ${goalItem}.`);
    }
  }

  return facts.join(" ");
}

function buildLocationInstruction(question) {
  const location = detectScenarioLocation(question);

  const map = {
    bookstore:
      "Use a realistic bookstore setting that matches the question.",
    "bike shop":
      "Use a realistic bike shop setting that matches the question.",
    "toy store":
      "Use a realistic toy store setting that matches the question.",
    cafeteria:
      "Use a realistic cafeteria or school lunch setting that matches the question.",
    "classroom art table":
      "Use a classroom art table or classroom supply area that matches the question.",
    "classroom party table":
      "Use a classroom party setup that matches the question.",
    "home movie night table":
      "Use a home movie night setup that matches the question.",
    "school supply store":
      "Use a realistic school supply store or school supply shelf setting that matches the question.",
    "snack shop":
      "Use a realistic snack shop, snack counter, or food counter setting that matches the question.",
    store:
      "Use a realistic store or everyday shopping setting that matches the question."
  };

  return map[location] || map.store;
}

function buildUniversalScenePrompt(question) {
  const scenarioTitle = cleanSceneText(question?.scenarioTitle || "");
  const scenarioText = cleanSceneText(question?.scenarioText || "");
  const questionText = cleanSceneText(question?.question || "");
  const goalText = cleanSceneText(question?.goal || "");
  const heroCaption = cleanSceneText(question?.heroCaption || "");
  const objectList = buildObjectListForPrompt(question);
  const scenarioFacts = buildScenarioFacts(question);
  const locationInstruction = buildLocationInstruction(question);
  const questionType = normalizeQuestionType(question?.type);

  const typeInstructionMap = {
    "scenario-choice":
      "Show the exact decision moment from the question. The image must represent the whole situation, not just one answer option.",
    "tap-reveal":
      "Show the full situation the clues are about. The image should support the reasoning context, not just a single item.",
    "budget-builder":
      "Show the full shopping or planning scene with the exact listed items naturally present in the image.",
    "drag-drop": getDragDropSceneInstruction(question)
  };

  const typeInstruction =
    typeInstructionMap[questionType] ||
    "Show the full situation from the question.";

  const parts = [
    scenarioTitle ? `Scene title: ${scenarioTitle}.` : "",
    scenarioText ? `Main scenario: ${scenarioText}.` : "",
    questionText ? `Question being illustrated: ${questionText}.` : "",
    goalText ? `Goal context: ${goalText}.` : "",
    heroCaption ? `Helpful context: ${heroCaption}.` : "",
    scenarioFacts,
    objectList
      ? `Show these exact relevant objects naturally in the same scene: ${objectList}.`
      : "",
    locationInstruction,
    typeInstruction,
    "Show one child or student in the scene when appropriate.",
    "The image must illustrate the full real-life situation described in the lesson question.",
    "Do not focus on only one shelf item unless the question is specifically about one single item.",
    "Do not invent unrelated products.",
    "Do not invent unrelated prices.",
    "Do not add random thought bubbles.",
    "Do not add random text labels.",
    "Do not turn the image into an answer-choice poster.",
    "Do not use split-screen options unless the question truly describes comparing two stores or two products.",
    "Any visible prices must match the question data exactly.",
    "If an item is not mentioned in the lesson data, do not include it.",
    "If the question is about school, keep the setting school-related.",
    "If the question is about shopping, keep the setting shopping-related.",
    "If the question is about a goal, include the goal naturally only when relevant.",
    "Wide horizontal composition, full scene visible, centered composition."
  ];

  return parts.filter(Boolean).join(" ");
}

function buildFinalImagePrompt(rawPrompt) {
  return [
    rawPrompt,
    STYLE_BOOST,
    ANATOMY_GUARD,
    "show a full real-life scenario, not isolated objects",
    "show the whole situation from the question",
    "include all important items naturally in one scene",
    "do not create an answer-choice layout",
    "do not show one or two answer options by themselves",
    "show a realistic everyday setting a student would recognize",
    "clear spatial relationship between objects",
    "correct prices must stay attached to the correct items",
    "only include numbers directly relevant to the question",
    "do not add random prices or unrelated numbers",
    "do not add random thought bubbles",
    "do not add labels with incorrect text",
    "avoid floating objects on a blank background",
    "avoid infographic style",
    "show the exact decision situation as one complete moment",
    "full subject visible",
    "fit entire scene in frame",
    "wide horizontal composition",
    "centered composition",
    "plain soft background",
    "educational illustration",
    "kid friendly",
    "avoid extra unrelated objects",
    "no misleading or swapped price tags"
  ].join(", ");
}

async function generateImageBase64(prompt, options = {}) {
  if (!huggingFaceApiKey) {
    throw new Error("Missing HUGGINGFACE_API_KEY in .env");
  }

  const { width = 896, height = 384 } = options;
  const finalPrompt = buildFinalImagePrompt(prompt);

  const model = "black-forest-labs/FLUX.1-schnell";
  const url = `https://router.huggingface.co/hf-inference/models/${model}`;

  const res = await axios.post(
    url,
    {
      inputs: finalPrompt,
      parameters: {
        width,
        height,
        num_inference_steps: 3,
        guidance_scale: 2.5
      }
    },
    {
      responseType: "arraybuffer",
      timeout: QUESTION_IMAGE_TIMEOUT_MS,
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        "Content-Type": "application/json",
        Accept: "image/png"
      },
      validateStatus: () => true
    }
  );

  if (res.status !== 200) {
    const body =
      Buffer.isBuffer(res.data) || res.data instanceof Uint8Array
        ? Buffer.from(res.data).toString("utf8")
        : String(res.data);

    throw new Error(`Hugging Face error ${res.status}: ${body}`);
  }

  return `data:image/png;base64,${Buffer.from(res.data).toString("base64")}`;
}

function buildExactImagePromptFromQuestion(question) {
  const customPrompt = cleanSceneText(question?.questionImagePrompt || "");
  const universalPrompt = buildUniversalScenePrompt(question);

  if (customPrompt) {
    return `${universalPrompt} Custom prompt guidance: ${customPrompt}`;
  }

  return universalPrompt;
}

function cleanScenarioChoiceOptionText(text, question, isBest) {
  let value = sanitizeHintEmojis(String(text || "").trim());
  if (!value) {
    return isBest ? "Save your money for your goal" : "Spend your money now";
  }

  value = value.replace(/\s+/g, " ").trim();
  const lower = value.toLowerCase();
  const questionText = String(question?.question || "").toLowerCase();
  const scenarioText = String(question?.scenarioText || "").toLowerCase();
  const goalItem = detectGoalItem(question);

  if (lower === "save money" || lower === "save it" || lower === "keep saving") {
    return goalItem
      ? `Save your money for the ${goalItem}`
      : "Save your money for your goal";
  }

  if (
    containsAny(lower, [
      "cookie",
      "cake",
      "chips",
      "candy",
      "snack",
      "ice cream",
      "juice box",
      "muffin",
      "granola bar",
      "sandwich",
      "fruit cup",
      "popcorn",
      "yogurt"
    ]) &&
    !containsAny(lower, ["after school", "today", "now"])
  ) {
    return `${value} after school`;
  }

  if (
    containsAny(lower, [
      "toy",
      "game",
      "stuffed bear",
      "bouncy ball",
      "yo-yo",
      "puzzle",
      "sticker pack",
      "bike"
    ]) &&
    !containsAny(lower, ["after school", "today", "now"])
  ) {
    return `${value} after school`;
  }

  if (
    (containsAny(questionText, ["after school"]) ||
      containsAny(scenarioText, ["after school"])) &&
    !containsAny(lower, ["after school"]) &&
    containsAny(lower, ["buy", "spend"])
  ) {
    return `${value} after school`;
  }

  return value;
}

function buildScenarioChoiceHint(text, question) {
  const value = sanitizeHintEmojis(String(text || "")).toLowerCase();
  const goal = sanitizeHintEmojis(String(question?.goal || "").trim());

  if (
    containsAny(value, [
      "cookie",
      "cake",
      "chips",
      "candy",
      "snack",
      "ice cream",
      "juice box",
      "muffin",
      "granola bar",
      "sandwich",
      "fruit cup",
      "popcorn",
      "yogurt"
    ])
  ) {
    return goal
      ? `That snack may be fun now, but it does not help your goal to ${goal.toLowerCase()}.`
      : "That snack may be fun now, but it does not help your goal.";
  }

  if (
    containsAny(value, [
      "toy",
      "game",
      "stuffed bear",
      "bouncy ball",
      "yo-yo",
      "puzzle",
      "sticker pack",
      "bike"
    ])
  ) {
    return goal
      ? `That choice may be fun now, but it slows down your goal to ${goal.toLowerCase()}.`
      : "That choice may be fun now, but it slows down your goal.";
  }

  if (containsAny(value, ["wait", "later"])) {
    return "Think about which choice best helps the goal right now.";
  }

  return "Think about which choice helps your goal the most.";
}

function buildScenarioChoiceEffect(text, question, isBest) {
  const value = sanitizeHintEmojis(String(text || "")).toLowerCase();
  const goal = sanitizeHintEmojis(String(question?.goal || "").trim());

  if (isBest) {
    return goal
      ? `Great choice! That helps you get closer to your goal to ${goal.toLowerCase()}.`
      : "Great choice! That helps you reach your goal.";
  }

  if (
    containsAny(value, [
      "cookie",
      "cake",
      "chips",
      "candy",
      "snack",
      "ice cream",
      "juice box",
      "muffin",
      "granola bar",
      "sandwich",
      "fruit cup",
      "popcorn",
      "yogurt"
    ])
  ) {
    return goal
      ? `Buying that snack uses money that could help you ${goal.toLowerCase()}.`
      : "Buying that snack uses money that could help with your goal.";
  }

  if (
    containsAny(value, [
      "toy",
      "game",
      "stuffed bear",
      "bouncy ball",
      "yo-yo",
      "puzzle",
      "sticker pack",
      "bike"
    ])
  ) {
    return goal
      ? `Buying that now means it will take longer to ${goal.toLowerCase()}.`
      : "Buying that now means your goal will take longer.";
  }

  return goal
    ? `That choice does not help you ${goal.toLowerCase()}.`
    : "That choice does not help your goal.";
}

function pickScenarioChoiceEmoji(text, isBest, index) {
  const value = String(text || "").toLowerCase();

  if (containsAny(value, ["fruit salad"])) return "🥗";
  if (containsAny(value, ["fruit"])) return "🍎";
  if (containsAny(value, ["salad"])) return "🥗";
  if (containsAny(value, ["apple"])) return "🍎";
  if (containsAny(value, ["banana"])) return "🍌";
  if (containsAny(value, ["orange"])) return "🍊";
  if (containsAny(value, ["strawberry"])) return "🍓";
  if (containsAny(value, ["watermelon"])) return "🍉";
  if (containsAny(value, ["sandwich"])) return "🥪";
  if (containsAny(value, ["cookie"])) return "🍪";
  if (containsAny(value, ["chips"])) return "🥔";
  if (containsAny(value, ["candy bar"])) return "🍫";
  if (containsAny(value, ["candy"])) return "🍬";
  if (containsAny(value, ["ice cream"])) return "🍦";
  if (containsAny(value, ["juice", "juice box", "drink"])) return "🧃";
  if (containsAny(value, ["muffin"])) return "🧁";
  if (containsAny(value, ["popcorn"])) return "🍿";
  if (containsAny(value, ["yogurt"])) return "🥣";
  if (containsAny(value, ["healthy snack"])) return "🥗";
  if (containsAny(value, ["snack"])) return "🍪";

  if (containsAny(value, ["save", "savings", "saving", "money left", "keep the money", "put all of it into savings", "bank"])) {
    return "💰";
  }

  if (containsAny(value, ["phone case", "phone", "tablet", "device"])) {
    return "📱";
  }

  if (
    containsAny(value, [
      "school",
      "notebook",
      "pencil",
      "markers",
      "crayons",
      "backpack",
      "book"
    ])
  ) {
    return "📚";
  }

  if (containsAny(value, ["lunch", "meal"])) return "🍽️";

  if (containsAny(value, ["toy", "stuffed bear", "doll"])) {
    return "🧸";
  }

  if (containsAny(value, ["toy car", "car"])) return "🚗";
  if (containsAny(value, ["ball"])) return "⚽";
  if (containsAny(value, ["puzzle"])) return "🧩";
  if (containsAny(value, ["game"])) return "🎮";
  if (containsAny(value, ["bike"])) return "🚲";
  if (containsAny(value, ["scooter"])) return "🛴";
  if (containsAny(value, ["wait", "later"])) return "⏳";

  if (isBest) return "💡";
  if (index === 1) return "🛍️";
  return "📦";
}

function buildTapRevealClueText(question, clueIndex) {
  const goal = sanitizeHintEmojis(String(question?.goal || "").trim());
  const walletAmount = getWalletAmount(question);
  const goalPrice = getGoalPrice(question);
  const goalItem = detectGoalItem(question);

  if (clueIndex === 0) {
    return walletAmount != null
      ? `You have ${normalizeCurrencyText(walletAmount)} right now.`
      : "Think about how much money you have right now.";
  }

  if (clueIndex === 1) {
    if (goalPrice != null && goalItem) {
      return `The ${goalItem} costs ${normalizeCurrencyText(goalPrice)}.`;
    }
    if (goalPrice != null) {
      return `Your goal costs ${normalizeCurrencyText(goalPrice)}.`;
    }
    return goal
      ? `Think about your goal to ${goal.toLowerCase()}.`
      : "Think about your bigger goal.";
  }

  if (clueIndex === 2) {
    if (walletAmount != null && goalPrice != null && goalPrice > walletAmount) {
      return `Saving today helps you get closer because ${normalizeCurrencyText(walletAmount)} is less than ${normalizeCurrencyText(goalPrice)}.`;
    }
    return "Spending less now helps you save more for later.";
  }

  return goalItem
    ? `A smart choice helps you reach the ${goalItem} sooner.`
    : "A smart choice helps you reach your goal sooner.";
}

function buildTapRevealOptions(question) {
  const walletAmount = getWalletAmount(question);
  const goalPrice = getGoalPrice(question);
  const goalItem = detectGoalItem(question);
  const amountText =
    walletAmount != null ? normalizeCurrencyText(walletAmount) : "your money";

  const bestText = goalItem
    ? `Save ${amountText} for the ${goalItem}`
    : `Save ${amountText} for your goal`;

  const wrongText = "Spend the money now";

  const bestEffect =
    goalItem && goalPrice != null
      ? `Great choice! Saving ${amountText} helps you get closer to the ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}.`
      : "Great choice! Saving today helps you get closer to your goal.";

  const wrongHint = goalItem
    ? `That uses money you could save for the ${goalItem}.`
    : "That uses money you could save for your goal.";

  const wrongEffect =
    goalItem && goalPrice != null
      ? `Spending now means you still need more money for the ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}.`
      : "Spending now means it will take longer to reach your goal.";

  return [
    { text: bestText, isBest: true, effect: bestEffect },
    { text: wrongText, isBest: false, hint: wrongHint, effect: wrongEffect }
  ];
}

function normalizeBudgetTag(tag) {
  const value = String(tag || "").trim().toLowerCase();

  if (
    [
      "need",
      "needs",
      "must-have",
      "must have",
      "required",
      "important",
      "necessary",
      "essential",
      "school need",
      "needed",
      "must buy"
    ].includes(value)
  ) {
    return "need";
  }

  if (
    [
      "helpful",
      "optional",
      "useful",
      "good to have",
      "nice to have",
      "recommended"
    ].includes(value)
  ) {
    return "helpful";
  }

  if (
    [
      "want",
      "wants",
      "extra",
      "fun",
      "extra item",
      "not needed",
      "bonus"
    ].includes(value)
  ) {
    return "want";
  }

  return "";
}

function inferBudgetTagFromItemName(name, question = {}) {
  const value = String(name || "").toLowerCase();
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();

  const isPartySnackQuestion = containsAny(combined, [
    "party",
    "snack budget",
    "snacks to share",
    "healthy snacks to share",
    "pick snacks for a party"
  ]);

  if (isPartySnackQuestion) {
    if (
      containsAny(value, [
        "apple",
        "apple slices",
        "banana",
        "orange",
        "fruit",
        "water bottle",
        "juice",
        "yogurt"
      ])
    ) {
      return "need";
    }

    if (
      containsAny(value, [
        "sandwich",
        "granola bar",
        "crackers",
        "trail mix",
        "popcorn"
      ])
    ) {
      return "helpful";
    }

    if (
      containsAny(value, [
        "candy",
        "cookie",
        "chips",
        "ice cream",
        "soda",
        "chocolate"
      ])
    ) {
      return "want";
    }
  }

  if (
    containsAny(value, [
      "notebook",
      "pencil",
      "markers",
      "crayons",
      "folder",
      "glue",
      "poster board",
      "canvas",
      "paint set",
      "water bottle",
      "lunch box",
      "backpack",
      "book",
      "brushes",
      "calculator"
    ])
  ) {
    return "need";
  }

  if (
    containsAny(value, [
      "eraser",
      "ruler",
      "scissors",
      "tape",
      "brush",
      "brushes",
      "highlighter",
      "fruit cup",
      "fruit salad",
      "granola bar",
      "yogurt",
      "ice cream cone"
    ])
  ) {
    return "helpful";
  }

  if (
    containsAny(value, [
      "sticker",
      "stickers",
      "glitter",
      "toy",
      "movie ticket",
      "candy",
      "candy bar",
      "chips",
      "cookie",
      "phone case",
      "keychain",
      "bracelet"
    ])
  ) {
    return "want";
  }

  if (containsAny(combined, ["project", "school", "class", "supplies", "art"])) {
    return "helpful";
  }

  return "helpful";
}


function shouldBudgetBuilderLeaveSavings(question) {
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();

  return containsAny(combined, [
    "save some money",
    "save money",
    "save for later",
    "still want to save",
    "also want to save",
    "and save",
    "money left",
    "left over",
    "leftover",
    "save the rest"
  ]);
}

function getBudgetSavingsTarget(question, budget) {
  if (!Number.isFinite(budget) || budget <= 0) return 0;
  if (!shouldBudgetBuilderLeaveSavings(question)) return 0;

  if (budget <= 5) return 1;
  if (budget <= 10) return 1;
  return 2;
}

function getBudgetTagPriority(tag) {
  const normalized = normalizeBudgetTag(tag);
  if (normalized === "need") return 3;
  if (normalized === "helpful") return 2;
  return 0;
}

function ensureUniqueBudgetItems(items) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const key = `${String(item.name || "").toLowerCase()}::${Number(item.price || 0)}`;
    if (!item.name || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result.slice(0, 5);
}

function buildReliableBudgetFallback(question, index) {
  const budget =
    typeof question?.budget === "number" && Number.isFinite(question.budget)
      ? question.budget
      : 15;

  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();
  const { matched } = extractScenarioKeywords(question);

  let items = [
    { id: `q${index + 1}i1`, name: "Notebook", price: 4, tag: "need" },
    { id: `q${index + 1}i2`, name: "Pencils", price: 2, tag: "need" },
    { id: `q${index + 1}i3`, name: "Markers", price: 3, tag: "helpful" },
    { id: `q${index + 1}i4`, name: "Sticker Pack", price: 3, tag: "want" }
  ];

  if (
    matched.includes("snacks") ||
    containsAny(combined, ["party", "snacks to share", "healthy snacks to share"])
  ) {
    items = [
      { id: `q${index + 1}i1`, name: "Apple Slices", price: 3, tag: "need" },
      { id: `q${index + 1}i2`, name: "Water Bottle", price: 2, tag: "need" },
      { id: `q${index + 1}i3`, name: "Sandwich", price: 5, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Cookie", price: 2, tag: "want" },
      { id: `q${index + 1}i5`, name: "Candy", price: 2, tag: "want" }
    ];
  } else if (matched.includes("art")) {
    items = [
      { id: `q${index + 1}i1`, name: "Canvas", price: 5, tag: "need" },
      { id: `q${index + 1}i2`, name: "Paint Set", price: 7, tag: "need" },
      { id: `q${index + 1}i3`, name: "Brushes", price: 4, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Glitter", price: 3, tag: "want" },
      { id: `q${index + 1}i5`, name: "Candy", price: 2, tag: "want" }
    ];
  } else if (matched.includes("toys")) {
    items = [
      { id: `q${index + 1}i1`, name: "Board Game", price: 6, tag: "need" },
      { id: `q${index + 1}i2`, name: "Puzzle", price: 5, tag: "helpful" },
      { id: `q${index + 1}i3`, name: "Building Blocks", price: 4, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Toy Car", price: 3, tag: "want" },
      { id: `q${index + 1}i5`, name: "Slime", price: 2, tag: "want" }
    ];
  } else if (matched.includes("sports")) {
    items = [
      { id: `q${index + 1}i1`, name: "Soccer Ball", price: 6, tag: "need" },
      { id: `q${index + 1}i2`, name: "Water Bottle", price: 2, tag: "need" },
      { id: `q${index + 1}i3`, name: "Whistle", price: 3, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Candy", price: 2, tag: "want" },
      { id: `q${index + 1}i5`, name: "Sticker Pack", price: 2, tag: "want" }
    ];
  } else if (matched.includes("reading")) {
    items = [
      { id: `q${index + 1}i1`, name: "Book", price: 6, tag: "need" },
      { id: `q${index + 1}i2`, name: "Notebook", price: 3, tag: "need" },
      { id: `q${index + 1}i3`, name: "Pencil", price: 2, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Sticker Pack", price: 2, tag: "want" },
      { id: `q${index + 1}i5`, name: "Bracelet", price: 2, tag: "want" }
    ];
  }

  items = items.map((item) => ({
    ...item,
    emoji: pickItemEmoji(item.name, item.tag, question)
  }));

  const correctItemIds = chooseBestBudgetBuilderCorrectIds(
    items,
    budget,
    getBudgetSavingsTarget(question, budget),
    question
  );

  return {
    scenarioTitle: sanitizeHintEmojis(
      question?.scenarioTitle || `Question ${index + 1}`
    ),
    scenarioText: sanitizeHintEmojis(question?.scenarioText || ""),
    goal: sanitizeHintEmojis(question?.goal || ""),
    question: sanitizeHintEmojis(
      question?.question || "Choose the best items to buy."
    ),
    generalHint: buildBudgetBuilderHint(question),
    successMessage: buildBudgetBuilderSuccessMessage(question),
    budget,
    items,
    correctItemIds
  };
}

function rebalanceBudgetItems(rawItems, question, index) {
  let normalizedItems = (rawItems || []).map((item, itemIndex) => {
    const rawName = item.name || item.label || `Item ${itemIndex + 1}`;
    const inferredTag = inferBudgetTagFromItemName(rawName, question);
    const normalizedTag = normalizeBudgetTag(item.tag) || inferredTag;

    return {
      id: item.id || `q${index + 1}i${itemIndex + 1}`,
      name: sanitizeHintEmojis(rawName),
      price: Math.max(0, Number(item.price || 0)),
      emoji: pickItemEmoji(rawName, normalizedTag, question),
      tag: normalizedTag
    };
  });

  normalizedItems = ensureUniqueBudgetItems(
    normalizedItems.filter(
      (item) =>
        item.name &&
        Number.isFinite(item.price) &&
        item.price > 0 &&
        itemMatchesScenario(item.name, question)
    )
  );

  const needCount = normalizedItems.filter((item) => item.tag === "need").length;
  const helpfulCount = normalizedItems.filter((item) => item.tag === "helpful").length;
  const wantCount = normalizedItems.filter((item) => item.tag === "want").length;

  const hasEnoughItems =
    normalizedItems.length >= 4 && normalizedItems.length <= 5;

  const hasReliableMix =
    needCount >= 1 && helpfulCount >= 1 && wantCount >= 1;

  if (!hasEnoughItems || !hasReliableMix) {
    return [];
  }

  return normalizedItems.slice(0, 5);
}

function summarizeBudgetSelectionScore(items, budget, savingsTarget, ids, question = {}) {
  const selected = items.filter((item) => ids.includes(item.id));
  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const leftover = budget - total;

  const needs = selected.filter((item) => item.tag === "need").length;
  const helpful = selected.filter((item) => item.tag === "helpful").length;
  const wants = selected.filter((item) => item.tag === "want").length;

  const combinedText = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();
  const savingGoal = shouldBudgetBuilderLeaveSavings(question);

  const isPartySnackQuestion = containsAny(combinedText, [
    "party",
    "snacks to share",
    "healthy snacks to share",
    "pick snacks for a party",
    "snack budget planning"
  ]);

  const wantsAllowed = containsAny(combinedText, [
    "small treat",
    "one treat",
    "enjoying a treat"
  ]);

  if (total > budget || leftover < 0) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (savingGoal && leftover < savingsTarget) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (needs === 0 && helpful === 0) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (!wantsAllowed && wants > 0) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  let score = 0;

  score += needs * 1000;
  score += helpful * 300;

  if (wantsAllowed) {
    if (wants === 1) score += 80;
    if (wants > 1) score -= wants * 150;
  } else {
    score -= wants * 700;
  }

  if (savingGoal) {
    score += leftover * 40;
  }

  if (isPartySnackQuestion) {
    const labels = selected.map((item) => String(item.name || "").toLowerCase());

    const healthyCount = labels.filter((label) =>
      containsAny(label, [
        "apple",
        "banana",
        "orange",
        "fruit",
        "water bottle",
        "juice",
        "yogurt"
      ])
    ).length;

    const shareableCount = labels.filter((label) =>
      containsAny(label, [
        "apple",
        "fruit",
        "sandwich",
        "water bottle",
        "juice",
        "yogurt",
        "granola"
      ])
    ).length;

    score += healthyCount * 500;
    score += shareableCount * 250;

    if (labels.some((label) => containsAny(label, ["candy", "cookie", "chips", "soda"]))) {
      score -= 900;
    }
  }

  return {
    valid: true,
    score,
    total,
    leftover,
    needs,
    helpful,
    wants
  };
}


function chooseBestBudgetBuilderCorrectIds(items, budget, savingsTarget = 0, question = {}) {
  const validItems = items.filter(
    (item) =>
      item &&
      item.id &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      ["need", "helpful", "want"].includes(item.tag)
  );

  if (validItems.length === 0 || !Number.isFinite(budget) || budget <= 0) {
    return [];
  }

  let bestIds = [];
  let bestMeta = null;
  const totalMasks = 1 << validItems.length;

  for (let mask = 1; mask < totalMasks; mask += 1) {
    const ids = [];

    for (let i = 0; i < validItems.length; i += 1) {
      if (mask & (1 << i)) ids.push(validItems[i].id);
    }

    const meta = summarizeBudgetSelectionScore(
      validItems,
      budget,
      savingsTarget,
      ids,
      question
    );

    if (!meta.valid) continue;

    if (
      !bestMeta ||
      meta.score > bestMeta.score ||
      (meta.score === bestMeta.score && meta.leftover > bestMeta.leftover) ||
      (meta.score === bestMeta.score &&
        meta.leftover === bestMeta.leftover &&
        ids.length < bestIds.length)
    ) {
      bestMeta = meta;
      bestIds = ids;
    }
  }

  return bestIds;
}

function buildBudgetBuilderHint(question) {
  if (shouldBudgetBuilderLeaveSavings(question)) {
    return "Pick needs first and save the rest.";
  }
  return "Pick the most important items first.";
}

function buildBudgetBuilderSuccessMessage(question) {
  if (shouldBudgetBuilderLeaveSavings(question)) {
    return "Great job! You picked the important items and still saved some money.";
  }
  return "Great job! You picked the most important items.";
}

function getPromptSchema(questionType, index = 0) {
  const q = index + 1;

  if (questionType === "budget-builder") {
    return `
{
  "type": "budget-builder",
  "scenarioTitle": "...",
  "scenarioText": "...",
  "budget": 15,
  "goal": "Save some money for later",
  "heroEmoji": "🎨",
  "heroCaption": "...",
  "question": "Choose the best items to buy.",
  "generalHint": "Pick needs first and avoid wants.",
  "successMessage": "...",
  "showAnswerTip": true,
  "questionImagePrompt": "...",
  "items": [
    { "id": "q${q}i1", "name": "Notebook", "price": 4, "emoji": "📓", "tag": "need" },
    { "id": "q${q}i2", "name": "Pencils", "price": 2, "emoji": "✏️", "tag": "need" },
    { "id": "q${q}i3", "name": "Markers", "price": 3, "emoji": "🖍️", "tag": "helpful" },
    { "id": "q${q}i4", "name": "Sticker Pack", "price": 3, "emoji": "✨", "tag": "want" },
    { "id": "q${q}i5", "name": "Toy Keychain", "price": 2, "emoji": "🧸", "tag": "want" }
  ],
  "correctItemIds": ["q${q}i1", "q${q}i2", "q${q}i3"]
}`;
  }

  if (questionType === "drag-drop") {
  return `
{
  "type": "drag-drop",
  "scenarioTitle": "...",
  "scenarioText": "...",
  "heroEmoji": "💡",
  "heroCaption": "...",
  "question": "...",
  "generalHint": "...",
  "successMessage": "...",
  "questionImagePrompt": "...",
  "bucketConfig": {
    "left": { "id": "helps-saving", "title": "Helpful Actions", "subtitle": "Habits that help save" },
    "right": { "id": "hurts-saving", "title": "Unhelpful Actions", "subtitle": "Habits that waste money" }
  },
  "items": [
    { "id": "q${q}i1", "label": "Use a Coupon", "emoji": "🏷️", "bucket": "helps-saving" },
    { "id": "q${q}i2", "label": "Compare Prices", "emoji": "🏷️", "bucket": "helps-saving" },
    { "id": "q${q}i3", "label": "Wait for a Sale", "emoji": "⏳", "bucket": "helps-saving" },
    { "id": "q${q}i4", "label": "Make a Shopping List", "emoji": "📝", "bucket": "helps-saving" },
    { "id": "q${q}i5", "label": "Bring Lunch From Home", "emoji": "🥪", "bucket": "helps-saving" },
    { "id": "q${q}i6", "label": "Save Part of Your Money", "emoji": "💰", "bucket": "helps-saving" },
    { "id": "q${q}i7", "label": "Buy Candy at Checkout", "emoji": "🍬", "bucket": "hurts-saving" },
    { "id": "q${q}i8", "label": "Spend It All Right Away", "emoji": "💸", "bucket": "hurts-saving" },
    { "id": "q${q}i9", "label": "Shop Without a Plan", "emoji": "🛍️", "bucket": "hurts-saving" },
    { "id": "q${q}i10", "label": "Forget Your Saving Goal", "emoji": "🎯", "bucket": "hurts-saving" }
  ]
}`;
}

  if (questionType === "tap-reveal") {
    return `
{
  "type": "tap-reveal",
  "scenarioTitle": "...",
  "scenarioText": "...",
  "walletAmount": 8,
  "goal": "...",
  "heroEmoji": "🧠",
  "heroCaption": "...",
  "question": "...",
  "generalHint": "...",
  "questionImagePrompt": "...",
  "cards": [
    { "id": "q${q}c1", "coverEmoji": "🃏", "emoji": "💡", "title": "Clue 1", "text": "..." },
    { "id": "q${q}c2", "coverEmoji": "🃏", "emoji": "🎯", "title": "Clue 2", "text": "..." },
    { "id": "q${q}c3", "coverEmoji": "🃏", "emoji": "🧠", "title": "Clue 3", "text": "..." },
    { "id": "q${q}c4", "coverEmoji": "🃏", "emoji": "💰", "title": "Clue 4", "text": "..." }
  ],
  "options": [
    { "text": "...", "isBest": true, "effect": "..." },
    { "text": "...", "isBest": false, "hint": "...", "effect": "..." }
  ]
}`;
  }

  return `
{
  "type": "scenario-choice",
  "scenarioTitle": "...",
  "scenarioText": "...",
  "walletAmount": 10,
  "goal": "...",
  "heroEmoji": "🪙",
  "heroCaption": "...",
  "question": "...",
  "generalHint": "...",
  "questionImagePrompt": "...",
  "options": [
    { "text": "...", "subText": "", "emoji": "💰", "effect": "...", "isBest": true },
    { "text": "...", "subText": "", "emoji": "🍪", "hint": "...", "effect": "...", "isBest": false },
    { "text": "...", "subText": "", "emoji": "🧸", "hint": "...", "effect": "...", "isBest": false }
  ]
}`;
}

function buildQuestionSequence(sampleQuestions = [], fallbackType = "scenario-choice") {
  if (!Array.isArray(sampleQuestions) || sampleQuestions.length === 0) {
    return [normalizeQuestionType(fallbackType)];
  }

  return sampleQuestions.map((question) =>
    normalizeQuestionType(question?.type || fallbackType)
  );
}

function buildTypeSpecificRules(questionType) {
  if (questionType === "scenario-choice") {
    return `
Type-specific rules for scenario-choice:
- Include exactly 3 options
- Keep option key order exactly: text, subText, emoji, hint/effect, isBest
- subText must always be an empty string ""
- Do not write any subText content
- The emoji must directly match the option text
- Use specific emojis, not generic stars
- For saving options, use money-related emojis like 💰
- For snack options, use food-related emojis like 🍪 or 🧃
- For healthy food options, use emojis like 🥗 🍎 🍌
- For candy bar options, use 🍫
- For chips options, use 🥔
- For phone or tech options, use 📱
- For toy options, use 🧸
- Make the three options very clear and parallel
- When the question asks "after school", the buying options should also say "after school"
- Wrong options must clearly sound like real alternatives a child might pick
- Only one option can have isBest: true
- You may change the scenario concept completely from the sample
- Use lessonStruct.js only as a format and type guide, not a concept lock
- The image prompt must show the FULL scenario from the question, not isolated objects
- Do not generate an image that only shows one answer choice
- Do not generate an image that only shows the goal item
- Show the student’s real-life situation as one complete scene
- Include all important details from the scenario naturally in the same image
- The setting must match the scenario
- Use a store/shop setting if the question is about buying an item
- Prices must be attached to the correct items
- Only include numbers directly relevant to the question
- Do not include random or conflicting numbers
- If the question includes current money, show it naturally in the scene
- If the question includes a saving goal, include that goal naturally in the same scene only if relevant
- The image alone should help a student understand the whole situation
- Avoid floating objects, split-screen option layouts, unrelated items, and wrong backgrounds
- Never use vague prompts like "shopping choice" or "money decision"
- NEVER repeat the same wrong item in multiple options
- Use different items for each wrong option
- Never use ✅ or ❌ in option text, emoji, hint, effect, or subText
- Never use checkmarks or cross marks to signal correctness
- Use neutral, topic-related emojis only
`;
  }

  if (questionType === "tap-reveal") {
    return `
Type-specific rules for tap-reveal:
- Include exactly 4 cards
- Include exactly 2 options
- Keep cards key order exactly: id, coverEmoji, emoji, title, text
- Keep options key order exactly: text, isBest, hint/effect
- Only one option can have isBest: true
- You may change the scenario concept completely from the sample
- Use lessonStruct.js only as a format and type guide, not a concept lock
- Each clue should help the child reason toward the best answer
- The image prompt must show the full scenario or learning situation, not just one object
- Do not add random prices or thought bubbles
- Keep wording simple for grades 4 to 6
- Never use ✅ or ❌ in cards, options, clue text, emoji fields, hints, or effects
- Never use checkmarks or cross marks to hint which option is correct
- Use neutral clue emojis only, such as 💡 🎯 🧠 💰
`;
  }

  if (questionType === "budget-builder") {
  return `
Type-specific rules for budget-builder:
- Include 4 to 5 items only
- Never generate only 3 items
- tag must be exactly one of: "need", "helpful", or "want"
- Keep items key order exactly: id, name, price, emoji, tag
- The final items must include at least:
  - 1 need
  - 1 helpful
  - 1 want
- The items must directly relate to the scenarioTitle, scenarioText, goal, and question
- If the scenario mentions a small treat, one reasonable want may be allowed in the correct answer
- Do not create item sets where multiple totally different answers feel equally correct
- Make one clearly best combination
- Needs and helpful items should still matter more than wants
- The correct answer should feel fair and easy to explain to a grade 4 student
- Do not use school supplies unless the scenario is actually about school or supplies
- Do not use art supplies unless the scenario is actually about art, craft, poster, or project work
- Do not use snack items unless the scenario is actually about food, lunch, or treats
- Do not use toy items unless the scenario is actually about toys or games
- Every item must belong to the same exact shopping or planning situation as the question
- Make sure the items and tags reliably reflect the scenario and goal
- Do not tag every item as helpful
- Do not generate a budget-builder question with no clear best answer
- Do not make all items equally optional
- Build a reliable needs-first decision
- correctItemIds must only include ids that exist in items
- The correct set must fit inside the budget
- The correct answer must prioritize items tagged as "need"
- Helpful items can be chosen after needs if they still support the goal
- Wants should not be in the correct answer when a better need/helpful choice exists
- If the scenario says to save money, the correct answer should leave some money unspent when possible
- The image prompt must match the full scenario or main shopping situation
- Use the exact listed items in the image prompt
- Keep wording simple for grades 4 to 6
- Never use ✅ or ❌ in item names, emojis, tags, hints, or messages
`;
}

     return `
Type-specific rules for drag-drop:
- Include 10 to 12 items
- Never generate fewer than 10 items
- Keep items key order exactly: id, label, emoji, bucket
- Include bucketConfig with this exact key order:
  left -> id, title, subtitle
  right -> id, title, subtitle

- If the sorting is about actions or habits, every label MUST be an action phrase starting with a verb
- Do NOT generate physical objects (like notebook, backpack, candy, toy car)
- Example: "Use a Coupon", "Wait for a Sale", "Shop Without a Plan"

- If the sorting categories describe actions, habits, or behaviors, every label must be a short action phrase
- For action-based sorting, do not generate physical objects like notebook, backpack, water bottle, toy car, cookie, or sticker pack
- Example action labels: "Use a Coupon", "Wait for a Sale", "Compare Prices", "Shop Without a Plan"

- The item labels must directly relate to the scenarioTitle, scenarioText, and question
- Every item must belong to the same exact scenario world as the question
- Do not mix categories
- If the scenario is about saving actions, ALL items must be actions or habits, not store objects
- If the scenario is about snacks or food, ALL items must be food or snack choices
- If the scenario is about school supplies, ALL items must be school-related items
- If the scenario is about art or projects, ALL items must be art/project-related items
- If the scenario is about toys, ALL items must be toy or play choices
- Do not use a generic school-supplies set unless the scenario is actually about school
- Do not use snack items unless the scenario is actually about snacks or food
- Do not use art items unless the scenario is actually about art, craft, or a project
- Do not use toy items unless the scenario is actually about toys or games

- The bucket meaning must match the lesson concept
- The question sentence must explicitly name the 2 bucket groups
- Every item must clearly belong to one of the two buckets
- Avoid ambiguous items
- Do not generate placeholder labels like "Item 1"
- Do not generate generic filler labels

- If the buckets are about helps saving vs hurts saving, generate action labels such as:
  "Use a Coupon", "Wait for a Sale", "Compare Prices", "Make a Shopping List",
  "Bring Lunch From Home", "Save Part of Your Money",
  "Buy Candy at Checkout", "Spend It All Right Away", "Buy Toys First",
  "Shop Without a Plan", "Forget Your Saving Goal", "Buy Extras You Do Not Need"
- If the buckets are about helpful actions vs not helpful actions, generate action labels, not physical objects
- Do not turn action-based sorting into item-based sorting

- Use real kid-friendly labels
- Use correct emojis for each label
- The image prompt must match the full sorting topic or scene
- Keep wording simple for grades 4 to 6
- Keep the two buckets reasonably balanced
- Never use ✅ or ❌ in item labels, emojis, hints, or bucket text
`;
}

function buildQuestionPromptBlock(questionType, sampleQuestion, index) {
  return `
Question ${index + 1}
Required type: ${questionType}

Use this sample question only as a structural and tone guide:
${JSON.stringify(sampleQuestion || {}, null, 2)}

Output this exact question shape:
${getPromptSchema(questionType, index)}

${buildTypeSpecificRules(questionType)}
`;
}

function buildFallbackScenarioOptions(question) {
  const goalItem = detectGoalItem(question);
  const walletAmount = getWalletAmount(question);
  const amountText =
    walletAmount != null ? normalizeCurrencyText(walletAmount) : "your money";

  return [
    {
      text: goalItem
        ? `Save ${amountText} for the ${goalItem}`
        : `Save ${amountText} for your goal`,
      subText: "",
      emoji: "💰",
      hint: "",
      effect: buildScenarioChoiceEffect("save", question, true),
      isBest: true
    },
    {
      text: "Buy a treat after school",
      subText: "",
      emoji: "🍪",
      hint: buildScenarioChoiceHint("treat", question),
      effect: buildScenarioChoiceEffect("treat", question, false),
      isBest: false
    },
    {
      text: "Buy a toy after school",
      subText: "",
      emoji: "🧸",
      hint: buildScenarioChoiceHint("toy", question),
      effect: buildScenarioChoiceEffect("toy", question, false),
      isBest: false
    }
  ];
}

function ensureUniqueScenarioOptions(options) {
  const seen = new Set();
  const result = [];

  for (const option of options) {
    const key = String(option.text || "").toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(option);
  }

  return result.slice(0, 3);
}

function ensureScenarioChoice(question, index) {
  const options = Array.isArray(question.options) ? question.options.slice(0, 3) : [];
  const fallbackOptions = buildFallbackScenarioOptions(question);

  const normalizedOptions = options.map((option, optionIndex) => {
    const isBest = Boolean(option.isBest);
    const rawText =
      option.text ||
      fallbackOptions[optionIndex]?.text ||
      `Option ${optionIndex + 1}`;
    const text = cleanScenarioChoiceOptionText(rawText, question, isBest);

    return {
      text,
      subText: "",
      emoji: sanitizeHintEmojis(option.emoji || pickScenarioChoiceEmoji(text, isBest, optionIndex)),
      hint: sanitizeHintEmojis(option.hint || ""),
      effect: sanitizeHintEmojis(option.effect || ""),
      isBest
    };
  });

  while (normalizedOptions.length < 3) {
    normalizedOptions.push({ ...fallbackOptions[normalizedOptions.length] });
  }

  let uniqueOptions = ensureUniqueScenarioOptions(normalizedOptions);

  while (uniqueOptions.length < 3) {
    uniqueOptions.push({ ...fallbackOptions[uniqueOptions.length] });
    uniqueOptions = ensureUniqueScenarioOptions(uniqueOptions);
  }

  let bestIndex = uniqueOptions.findIndex((option) => option.isBest);
  if (bestIndex === -1) {
    uniqueOptions[0].isBest = true;
    bestIndex = 0;
  } else {
    uniqueOptions.forEach((option, i) => {
      option.isBest = i === bestIndex;
    });
  }

  uniqueOptions.forEach((option, i) => {
    option.text = cleanScenarioChoiceOptionText(
      option.text,
      question,
      option.isBest
    );
    option.subText = "";

    if (!option.emoji || option.emoji === "⭐" || option.emoji === "🌟") {
      option.emoji = sanitizeHintEmojis(
        pickScenarioChoiceEmoji(option.text, option.isBest, i)
      );
    } else {
      option.emoji = sanitizeHintEmojis(option.emoji);
    }

    if (!option.isBest && !option.hint) {
      option.hint = buildScenarioChoiceHint(option.text, question);
    }

    if (!option.effect) {
      option.effect = buildScenarioChoiceEffect(
        option.text,
        question,
        option.isBest
      );
    }

    option.hint = sanitizeHintEmojis(option.hint || "");
    option.effect = sanitizeHintEmojis(option.effect || "");
  });

  const finalQuestion = {
    type: "scenario-choice",
    scenarioTitle: sanitizeHintEmojis(question.scenarioTitle || `Question ${index + 1}`),
    scenarioText: sanitizeHintEmojis(question.scenarioText || ""),
    walletAmount:
      typeof question.walletAmount === "number" ? question.walletAmount : 10,
    goal: sanitizeHintEmojis(question.goal || ""),
    heroEmoji: sanitizeHintEmojis(question.heroEmoji || "💡"),
    heroCaption: sanitizeHintEmojis(question.heroCaption || ""),
    question: sanitizeHintEmojis(question.question || ""),
    generalHint:
      sanitizeHintEmojis(question.generalHint) ||
      "Think about which choice helps your goal the most.",
    options: uniqueOptions.slice(0, 3)
  };

  finalQuestion.questionImagePrompt =
    buildExactImagePromptFromQuestion(finalQuestion);
  return finalQuestion;
}

function ensureTapReveal(question, index) {
  const cards = Array.isArray(question.cards) ? question.cards.slice(0, 4) : [];
  const options = Array.isArray(question.options) ? question.options.slice(0, 2) : [];
  const fallbackOptions = buildTapRevealOptions(question);

  const normalizedCards = cards.map((card, cardIndex) => ({
    id: card.id || `q${index + 1}c${cardIndex + 1}`,
    coverEmoji: sanitizeHintEmojis(card.coverEmoji || "🃏"),
    emoji: sanitizeHintEmojis(card.emoji || pickCardEmoji(card.title, card.text, cardIndex)),
    title: sanitizeHintEmojis(card.title || `Clue ${cardIndex + 1}`),
    text: sanitizeHintEmojis(card.text || buildTapRevealClueText(question, cardIndex))
  }));

  while (normalizedCards.length < 4) {
    const cardIndex = normalizedCards.length;
    const title = `Clue ${cardIndex + 1}`;
    const text = buildTapRevealClueText(question, cardIndex);

    normalizedCards.push({
      id: `q${index + 1}c${cardIndex + 1}`,
      coverEmoji: "🃏",
      emoji: sanitizeHintEmojis(pickCardEmoji(title, text, cardIndex)),
      title: sanitizeHintEmojis(title),
      text: sanitizeHintEmojis(text)
    });
  }

  const normalizedOptions = options.map((option, optionIndex) => ({
    text: sanitizeHintEmojis(option.text || fallbackOptions[optionIndex].text),
    isBest: Boolean(option.isBest),
    hint: sanitizeHintEmojis(option.hint || ""),
    effect: sanitizeHintEmojis(option.effect || "")
  }));

  while (normalizedOptions.length < 2) {
    normalizedOptions.push({ ...fallbackOptions[normalizedOptions.length] });
  }

  const bestIndex = normalizedOptions.findIndex((option) => option.isBest);
  if (bestIndex === -1) {
    normalizedOptions[0].isBest = true;
  } else {
    normalizedOptions.forEach((option, i) => {
      option.isBest = i === bestIndex;
    });
  }

  normalizedOptions.forEach((option, i) => {
    const fallback = fallbackOptions[i];
    if (!option.text || /^option\s\d+$/i.test(option.text.trim())) {
      option.text = sanitizeHintEmojis(fallback.text);
    }
    if (!option.effect) {
      option.effect = sanitizeHintEmojis(fallback.effect);
    }
    if (!option.isBest && !option.hint) {
      option.hint = sanitizeHintEmojis(fallback.hint);
    }

    option.text = sanitizeHintEmojis(option.text);
    option.hint = sanitizeHintEmojis(option.hint);
    option.effect = sanitizeHintEmojis(option.effect);
  });

  const finalQuestion = {
    type: "tap-reveal",
    scenarioTitle: sanitizeHintEmojis(question.scenarioTitle || `Question ${index + 1}`),
    scenarioText: sanitizeHintEmojis(question.scenarioText || ""),
    walletAmount:
      typeof question.walletAmount === "number"
        ? question.walletAmount
        : undefined,
    goal: sanitizeHintEmojis(question.goal || ""),
    heroEmoji: sanitizeHintEmojis(question.heroEmoji || "💡"),
    heroCaption: sanitizeHintEmojis(question.heroCaption || ""),
    question: sanitizeHintEmojis(question.question || ""),
    generalHint:
      sanitizeHintEmojis(question.generalHint) ||
      "Use the clues to think about the smartest choice.",
    cards: normalizedCards,
    options: normalizedOptions
  };

  finalQuestion.questionImagePrompt =
    buildExactImagePromptFromQuestion(finalQuestion);
  return finalQuestion;
}

function ensureBudgetBuilder(question, index) {
  const fallback = buildReliableBudgetFallback(question, index);

  let normalizedItems = rebalanceBudgetItems(
    Array.isArray(question.items) ? question.items.slice(0, 5) : [],
    question,
    index
  );

  if (normalizedItems.length < 4 || normalizedItems.length > 5) {
    normalizedItems = fallback.items;
  }

  const needCount = normalizedItems.filter((item) => item.tag === "need").length;
  const helpfulCount = normalizedItems.filter((item) => item.tag === "helpful").length;
  const wantCount = normalizedItems.filter((item) => item.tag === "want").length;

  if (needCount < 1 || helpfulCount < 1 || wantCount < 1) {
    normalizedItems = fallback.items;
  }

  let budget = Number(question.budget);
  if (!Number.isFinite(budget) || budget <= 0) {
    budget = Number(fallback.budget);
  }

  const savingsTarget = getBudgetSavingsTarget(question, budget);
  const validIds = new Set(normalizedItems.map((item) => item.id));

  let correctItemIds = Array.isArray(question.correctItemIds)
    ? question.correctItemIds.filter((id) => validIds.has(id))
    : [];

  const providedSelectionMeta = summarizeBudgetSelectionScore(
    normalizedItems,
    budget,
    savingsTarget,
    correctItemIds,
    question
  );

  if (!providedSelectionMeta.valid) {
    correctItemIds = chooseBestBudgetBuilderCorrectIds(
      normalizedItems,
      budget,
      savingsTarget,
      question
    );
  }

  if (correctItemIds.length === 0) {
    normalizedItems = fallback.items;
    correctItemIds = fallback.correctItemIds;
  }

  const finalQuestion = {
    type: "budget-builder",
    scenarioTitle: sanitizeHintEmojis(
      question.scenarioTitle || fallback.scenarioTitle || `Question ${index + 1}`
    ),
    scenarioText: sanitizeHintEmojis(
      question.scenarioText || fallback.scenarioText || ""
    ),
    budget,
    goal: sanitizeHintEmojis(question.goal || fallback.goal || ""),
    heroEmoji: sanitizeHintEmojis(question.heroEmoji || "💡"),
    heroCaption: sanitizeHintEmojis(question.heroCaption || ""),
    question: sanitizeHintEmojis(
      question.question || fallback.question || "Choose the best items to buy."
    ),
    generalHint:
      sanitizeHintEmojis(question.generalHint) ||
      fallback.generalHint ||
      buildBudgetBuilderHint(question),
    successMessage:
      sanitizeHintEmojis(question.successMessage) ||
      fallback.successMessage ||
      buildBudgetBuilderSuccessMessage(question),
    showAnswerTip:
      typeof question.showAnswerTip === "boolean"
        ? question.showAnswerTip
        : true,
    items: normalizedItems,
    correctItemIds
  };

  finalQuestion.questionImagePrompt =
    buildExactImagePromptFromQuestion(finalQuestion);

  return finalQuestion;
}

function buildDragDropQuestionText(bucketConfig) {
  const leftTitle = bucketConfig.left.title;
  const rightTitle = bucketConfig.right.title;

  if (
    (leftTitle === "Helps Saving" && rightTitle === "Hurts Saving") ||
    (bucketConfig.left.id === "helps-saving" && bucketConfig.right.id === "hurts-saving")
  ) {
    return "Drag each card into the correct group: helps saving or hurts saving.";
  }

  if (
    (leftTitle === "Needed for School" && rightTitle === "Extra Items") ||
    (bucketConfig.left.id === "school-need" && bucketConfig.right.id === "school-extra")
  ) {
    return "Drag each item into the correct group: needed for school or extra item.";
  }

  return "Drag each item into the correct group: needs or wants.";
}

function buildDragDropHint(bucketConfig) {
  if (bucketConfig.left.id === "helps-saving") {
    return "Think about which actions help you keep money for later.";
  }

  if (bucketConfig.left.id === "school-need") {
    return "Think about which items are really important for school.";
  }

  return "Think about which items are needs and which are wants.";
}

function buildDragDropSuccess(bucketConfig) {
  if (bucketConfig.left.id === "helps-saving") {
    return "Awesome! You sorted the saving actions correctly.";
  }

  if (bucketConfig.left.id === "school-need") {
    return "Awesome! You sorted the school items correctly.";
  }

  return "Amazing! You sorted every item correctly.";
}

function hasMeaningfulDragDropQuestionText(question = "") {
  const value = String(question || "").trim().toLowerCase();

  if (!value) return false;
  if (value.length < 18) return false;

  const vaguePatterns = [
    "sort the items",
    "drag the items",
    "put them in the correct bucket",
    "sort each card",
    "group the items",
    "drag and drop"
  ];

  return !vaguePatterns.includes(value);
}


function ensureDragDrop(question, index) {
  const inferredBuckets = inferDragDropBuckets(question);

  const bucketConfig = {
    left: {
      id: question?.bucketConfig?.left?.id || inferredBuckets.left.id,
      title: question?.bucketConfig?.left?.title || inferredBuckets.left.title,
      subtitle:
        question?.bucketConfig?.left?.subtitle || inferredBuckets.left.subtitle
    },
    right: {
      id: question?.bucketConfig?.right?.id || inferredBuckets.right.id,
      title:
        question?.bucketConfig?.right?.title || inferredBuckets.right.title,
      subtitle:
        question?.bucketConfig?.right?.subtitle || inferredBuckets.right.subtitle
    }
  };

  const rawItems = Array.isArray(question?.items) ? question.items : [];
  const combinedText = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

  const isActionSort = containsAny(combinedText, [
    "helpful actions",
    "unhelpful actions",
    "not helpful actions",
    "helps saving",
    "hurts saving",
    "actions for saving",
    "saving habits",
    "good for saving",
    "not good for saving"
  ]);

  let normalizedItems = rawItems
    .map((item, itemIndex) => {
      const label = sanitizeHintEmojis(
        item?.label || item?.name || ""
      ).trim();

      const bucket = normalizeDragDropBucketValue(
        item?.bucket,
        bucketConfig,
        label
      );

      return {
        id: item?.id || `q${index + 1}i${itemIndex + 1}`,
        label,
        emoji: pickItemEmoji(label, bucket, question),
        bucket
      };
    })
    .filter((item) => {
      if (!item.label || !item.bucket) return false;

      if (isActionSort) {
        return isActionLabel(item.label);
      }

      return itemMatchesScenario(item.label, question);
    });

  const seen = new Set();
  normalizedItems = normalizedItems.filter((item) => {
    const key = item.label.toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const leftCount = normalizedItems.filter(
    (item) => item.bucket === bucketConfig.left.id
  ).length;

  const rightCount = normalizedItems.filter(
    (item) => item.bucket === bucketConfig.right.id
  ).length;

  const hasTooManyGenericItems = normalizedItems.some(
    (item) =>
      /^item \d+$/i.test(item.label) ||
      /^need item \d+$/i.test(item.label) ||
      /^want item \d+$/i.test(item.label)
  );

  const badDistribution =
    normalizedItems.length < 10 ||
    normalizedItems.length > 12 ||
    leftCount < 4 ||
    rightCount < 4 ||
    hasTooManyGenericItems;

  if (badDistribution) {
    normalizedItems = [];
  }

  if (normalizedItems.length === 0) {
    if (isActionSort) {
      normalizedItems = [
        { label: "Use a Coupon", bucket: bucketConfig.left.id },
        { label: "Compare Prices", bucket: bucketConfig.left.id },
        { label: "Wait for a Sale", bucket: bucketConfig.left.id },
        { label: "Make a Shopping List", bucket: bucketConfig.left.id },
        { label: "Bring Lunch From Home", bucket: bucketConfig.left.id },
        { label: "Save Part of Your Money", bucket: bucketConfig.left.id },
        { label: "Buy Candy at Checkout", bucket: bucketConfig.right.id },
        { label: "Spend It All Right Away", bucket: bucketConfig.right.id },
        { label: "Shop Without a Plan", bucket: bucketConfig.right.id },
        { label: "Forget Your Saving Goal", bucket: bucketConfig.right.id }
      ].map((item, i) => ({
        id: `q${index + 1}i${i + 1}`,
        label: item.label,
        emoji: pickItemEmoji(item.label, item.bucket, question),
        bucket: item.bucket
      }));
    } else {
      normalizedItems = buildMinimalEmergencyDragDropItems(
        bucketConfig,
        index,
        question
      );
    }
  }

  const finalQuestion = {
    type: "drag-drop",
    scenarioTitle: sanitizeHintEmojis(
      question?.scenarioTitle || `Question ${index + 1}`
    ),
    scenarioText: sanitizeHintEmojis(question?.scenarioText || ""),
    heroEmoji: sanitizeHintEmojis(question?.heroEmoji || "💡"),
    heroCaption: sanitizeHintEmojis(question?.heroCaption || ""),
    question: sanitizeHintEmojis(
      hasMeaningfulDragDropQuestionText(question?.question)
        ? question.question
        : buildDragDropQuestionText(bucketConfig)
    ),
    generalHint: sanitizeHintEmojis(
      question?.generalHint || buildDragDropHint(bucketConfig)
    ),
    successMessage: sanitizeHintEmojis(
      question?.successMessage || buildDragDropSuccess(bucketConfig)
    ),
    bucketConfig,
    items: shuffleArray(normalizedItems)
  };

  finalQuestion.questionImagePrompt =
    buildExactImagePromptFromQuestion(finalQuestion);

  return finalQuestion;
}

function sanitizeGeneratedQuestion(question = {}) {
  const clone = JSON.parse(JSON.stringify(question));

  if (Array.isArray(clone.options)) {
    clone.options = clone.options.map((option) => ({
      ...option,
      text: sanitizeHintEmojis(option.text),
      subText: sanitizeHintEmojis(option.subText),
      hint: sanitizeHintEmojis(option.hint),
      effect: sanitizeHintEmojis(option.effect),
      emoji: sanitizeHintEmojis(option.emoji)
    }));
  }

  if (Array.isArray(clone.cards)) {
    clone.cards = clone.cards.map((card) => ({
      ...card,
      title: sanitizeHintEmojis(card.title),
      text: sanitizeHintEmojis(card.text),
      emoji: sanitizeHintEmojis(card.emoji),
      coverEmoji: sanitizeHintEmojis(card.coverEmoji)
    }));
  }

  if (Array.isArray(clone.items)) {
    clone.items = clone.items.map((item) => ({
      ...item,
      name: sanitizeHintEmojis(item.name),
      label: sanitizeHintEmojis(item.label),
      emoji: sanitizeHintEmojis(item.emoji),
      tag: sanitizeHintEmojis(item.tag)
    }));
  }

  clone.scenarioTitle = sanitizeHintEmojis(clone.scenarioTitle);
  clone.scenarioText = sanitizeHintEmojis(clone.scenarioText);
  clone.question = sanitizeHintEmojis(clone.question);
  clone.generalHint = sanitizeHintEmojis(clone.generalHint);
  clone.successMessage = sanitizeHintEmojis(clone.successMessage);
  clone.heroCaption = sanitizeHintEmojis(clone.heroCaption);
  clone.goal = sanitizeHintEmojis(clone.goal);
  clone.questionImagePrompt = sanitizeHintEmojis(clone.questionImagePrompt);
  clone.heroEmoji = sanitizeHintEmojis(clone.heroEmoji);

  return clone;
}

function normalizeQuestionByType(question, expectedType, index) {
  const type = normalizeQuestionType(expectedType);

  if (type === "budget-builder") return ensureBudgetBuilder(question, index);
  if (type === "tap-reveal") return ensureTapReveal(question, index);
  if (type === "drag-drop") return ensureDragDrop(question, index);
  return ensureScenarioChoice(question, index);
}

async function generateLessonStructure(payload) {
  const sampleQuestions = Array.isArray(payload.sampleQuestions)
    ? payload.sampleQuestions
    : [];

  const fallbackType =
    payload.questionType ||
    payload.lessonType ||
    sampleQuestions?.[0]?.type ||
    "scenario-choice";

  const questionSequence = buildQuestionSequence(sampleQuestions, fallbackType);
  const previousVariation = getPreviousLessonVariation(payload);
  const previousVariationText = previousVariation
  ? JSON.stringify(previousVariation, null, 2)
  : "None";

  const sequenceDescription = questionSequence
    .map((type, index) => `${index + 1}. ${type}`)
    .join("\n");

  const promptQuestionBlocks = questionSequence
    .map((type, index) =>
      buildQuestionPromptBlock(
        type,
        sampleQuestions[index] || sampleQuestions[0] || {},
        index
      )
    )
    .join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.95,
    top_p: 0.95,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
        Previous generated version for this same lesson:
${previousVariationText}

Variation rules:
- Do NOT repeat the same overall concept from the previous generated version.
- If the previous version used a school-supplies or classroom concept, switch to a different kid-friendly concept such as snacks, sports, toys, books, lunch planning, party planning, hobby items, pet care, saving actions, or craft choices.
- Do NOT repeat the same main nouns across versions unless absolutely necessary for the lesson objective.
- Do NOT repeat the same drag-drop bucket theme every time.
- Across repeated generations of the same lesson, vary all question types, not just drag-drop.
- Keep the learning goal the same, but change the scenario concept, item names, wording, and examples.

You generate NEW lesson questions for a children's finance education app.

Return valid JSON only.
No markdown.
No explanation.

The response must be a JSON object in this exact top-level format:
{
  "questions": [ ... ]
}

Use the provided sampleQuestions array as the source of truth ONLY for:
- number of questions
- order of questions
- type of each question
- field names
- field order
- nesting
- shape of each question object

Do NOT treat the sampleQuestions topics, story themes, objects, or exact concepts as fixed.
You are encouraged to create a fresh concept for the same lesson, as long as:
- the money-learning objective still fits
- the question type stays correct
- the structure stays correct
- the wording stays simple for grades 4 to 6

Important:
- lessonStruct.js is only a template for structure and style
- You must generate NEW content, not copy the sample content
- You must preserve the exact question type order from sampleQuestions
- Do not turn all questions into the same type
- If question 1 in sampleQuestions is scenario-choice and question 2 is tap-reveal, then your output must keep that exact order
- You may completely change the concept from something like school preparation to party planning, snack choice, toy saving, craft project, sports item choice, book fair, lunch planning, or other age-appropriate money scenarios
- Make this version noticeably different from earlier versions of the same lesson
- Change the scenario, item names, money amounts, goals, option wording, clue wording
- Do not repeat the same exact snack, toy, school item, or savings goal across all questions unless the lesson absolutely requires it
- If the same lesson is generated again, it must feel like a fresh variation, not a copy
- Keep wording simple for grades 4 to 6
- Keep text short
- For scenario-choice, subText must always be ""
- Do not include markdown fences
- Do not include commentary before or after JSON
- Never use ✅ or ❌ anywhere in the generated JSON
- Never use checkmarks, cross marks, or any symbol that directly reveals the correct or wrong answer
- Keep all emojis neutral and topic-related

Required question sequence:
${sequenceDescription}

${promptQuestionBlocks}

Variation request id: ${payload.variationId || "none"}

Previously generated version for this lesson:
${JSON.stringify(previousVariation || [], null, 2)}

Avoid repeating that previous version.
        `
      },
      {
        role: "user",
        content: JSON.stringify({
          title: payload.title,
          lessonId: payload.lessonId,
          grade: payload.grade,
          unit: payload.unit,
          questionType: payload.questionType,
          lessonType: payload.lessonType,
          tips: payload.tips,
          context: payload.context,
          sampleQuestions,
          variationId: payload.variationId || null
        })
      }
    ]
  });

  const content = response.choices?.[0]?.message?.content || "";
  const parsed = safeJsonParse(content);

  if (!Array.isArray(parsed?.questions) || parsed.questions.length === 0) {
    throw new Error("Model did not return valid lesson questions JSON.");
  }

  const output = [];
  const total = questionSequence.length;

  for (let i = 0; i < total; i += 1) {
    const expectedType = questionSequence[i];
    const question = sanitizeGeneratedQuestion(parsed.questions[i] || {});
    output.push(normalizeQuestionByType(question, expectedType, i));
  }

  rememberLessonVariation(payload, output);
  return output;
}

async function runWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= items.length) {
        return;
      }

      try {
        results[currentIndex] = await worker(items[currentIndex], currentIndex);
      } catch {
        results[currentIndex] = null;
      }
    }
  }

  const workerCount = Math.max(1, Math.min(limit, items.length));
  await Promise.all(Array.from({ length: workerCount }, () => runWorker()));

  return results;
}

async function attachQuestionImages(questions) {
  const output = questions.map((question) => {
    const nextQuestion = { ...question };
    const finalPrompt = buildExactImagePromptFromQuestion(nextQuestion);

    if (finalPrompt) {
      nextQuestion.questionImagePrompt = finalPrompt;
    }

    return nextQuestion;
  });

  await runWithConcurrency(
    output,
    QUESTION_IMAGE_CONCURRENCY,
    async (question) => {
      const finalPrompt = question.questionImagePrompt;
      if (!finalPrompt) return null;

      try {
        const questionImg = await generateImageBase64(finalPrompt, {
          width: 896,
          height: 384
        });
        question.images = [{ questionImg }];
        return questionImg;
      } catch (error) {
        console.error("Question image generation failed:", error.message);
        return null;
      }
    }
  );

  return output;
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    imageGeneration: true,
    imageConcurrency: QUESTION_IMAGE_CONCURRENCY,
    timeoutMs: QUESTION_IMAGE_TIMEOUT_MS
  });
});

app.post("/api/generate-lesson", async (req, res) => {
  try {
    const payload = req.body || {};

    if (!payload.title && !payload.lessonId) {
      return res.status(400).json({ error: "Missing lesson payload." });
    }

    payload.variationId =
      payload.variationId ||
      `${payload.lessonId || payload.title || "lesson"}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

    const structuredQuestions = await generateLessonStructure(payload);
    const questionsWithImages = await attachQuestionImages(structuredQuestions);

    return res.json({
      lessonId: payload.lessonId,
      title: payload.title,
      questions: questionsWithImages
    });
  } catch (error) {
    const message = error?.message || "Lesson generation failed.";
    console.error("Lesson generation failed:", message);

    if (message.includes("rate_limit_exceeded") || message.includes("429")) {
      return res.status(429).json({
        error:
          "AI lesson generation is temporarily unavailable because the model limit was reached."
      });
    }

    return res.status(500).json({
      error: message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Lesson generator API running on http://localhost:${PORT}`);
});