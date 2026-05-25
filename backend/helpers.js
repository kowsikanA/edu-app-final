export function sanitizeHintEmojis(value) {
  return String(value || "")
    .replace(/✅|❌/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeQuestionType(rawType) {
  const value = String(rawType || "").trim().toLowerCase();

  if (value.includes("drag")) return "drag-drop";
  if (value.includes("budget")) return "budget-builder";
  if (value.includes("tap")) return "tap-reveal";
  if (value.includes("scenario")) return "scenario-choice";

  return "scenario-choice";
}

export function normalizeSemanticText(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractScenarioKeywords(question = {}) {
  const combined = normalizeSemanticText(
    `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""} ${question?.heroCaption || ""}`
  );

  const keywordGroups = {
    snacks: [
      "snack",
      "lunch",
      "food",
      "treat",
      "drink",
      "juice",
      "sandwich",
      "fruit",
      "cookie",
      "chips",
      "candy",
      "ice cream",
      "cafeteria"
    ],
    school: [
      "school",
      "classroom",
      "notebook",
      "pencil",
      "markers",
      "folder",
      "backpack",
      "glue",
      "crayons"
    ],
    art: [
      "art",
      "paint",
      "canvas",
      "poster",
      "project",
      "craft",
      "brush",
      "glitter",
      "scissors"
    ],
    toys: [
      "toy",
      "game",
      "doll",
      "puzzle",
      "blocks",
      "board game",
      "stuffed animal",
      "action figure",
      "slime"
    ],
    reading: [
      "book",
      "reading",
      "library",
      "comic",
      "flash cards",
      "storybook"
    ],
    sports: [
      "sports",
      "soccer",
      "basketball",
      "practice",
      "helmet",
      "ball",
      "sneakers",
      "whistle"
    ],
    pets: [
      "pet",
      "dog",
      "cat",
      "leash",
      "pet food",
      "collar",
      "water bowl"
    ],
    activities: [
      "activity",
      "activities",
      "playtime",
      "play",
      "outdoor",
      "indoor",
      "exercise",
      "fun",
      "hobby",
      "hobbies"
    ],
    saving: [
      "save",
      "saving",
      "coupon",
      "sale",
      "shopping list",
      "compare prices",
      "spend",
      "money habits"
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

export function containsAny(text, words) {
  const value = String(text || "").toLowerCase();
  return words.some((word) => value.includes(word));
}

export function cleanSceneText(text) {
  return String(text || "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractMoneyAmount(text) {
  const match = String(text || "").match(/\$(\d+)/);
  return match ? Number(match[1]) : null;
}

export function extractAllMoneyAmounts(text) {
  return [...String(text || "").matchAll(/\$(\d+)/g)].map((match) =>
    Number(match[1])
  );
}

export function normalizeCurrencyText(value) {
  return typeof value === "number" && Number.isFinite(value)
    ? `$${value}`
    : null;
}

export function getWalletAmount(question) {
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

export function getGoalPrice(question) {
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

export function detectGoalItem(question) {
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

export function detectScenarioLocation(question) {
  const combined =
    `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""} ${question?.goal || ""}`.toLowerCase();

  if (containsAny(combined, ["bookstore", "book shop"])) return "bookstore";
  if (containsAny(combined, ["bike", "bicycle"])) return "bike shop";
  if (containsAny(combined, ["toy store", "toy shop"])) return "toy store";
  if (containsAny(combined, ["cafeteria", "lunch room", "school lunch"])) return "cafeteria";
  if (containsAny(combined, ["art table", "art class", "class art"])) return "classroom art table";
  if (containsAny(combined, ["party table", "class party", "birthday party"])) return "classroom party table";
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

export function normalizeEmojiLabel(label = "") {
  return String(label || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function pickItemEmoji(label, bucketId = "", question = null) {
  const value = normalizeEmojiLabel(label);
  const bucket = String(bucketId || "").toLowerCase();

  const combinedQuestionText = normalizeEmojiLabel(
    `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""} ${question?.goal || ""}`
  );

  const hasAny = (phrases) => phrases.some((phrase) => value.includes(phrase));
  const questionHasAny = (phrases) =>
    phrases.some((phrase) => combinedQuestionText.includes(phrase));

  const stablePick = (choices) => {
    const text = `${value}-${bucket}-${combinedQuestionText}`;
    let hash = 0;

    for (let i = 0; i < text.length; i += 1) {
      hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    }

    return choices[hash % choices.length];
  };

  if (
    hasAny([
      "gift",
      "present",
      "card",
      "friendship",
      "gift bag",
      "party bag",
      "birthday",
      "balloon",
      "ribbon",
      "wrapping",
      "decorations",
      "decoration",
      "party hat",
      "invite",
      "invitation"
    ]) ||
    questionHasAny(["birthday", "party", "gift", "present"])
  ) {
    if (hasAny(["card", "friendship", "invite", "invitation"])) return "💌";
    if (hasAny(["gift", "present"])) return "🎁";
    if (hasAny(["bag"])) return "🛍️";
    if (hasAny(["balloon"])) return "🎈";
    if (hasAny(["ribbon", "wrapping"])) return "🎀";
    if (hasAny(["decoration", "decorations", "party hat"])) return "🎉";
    if (hasAny(["sticker"])) return "🌟";
    if (hasAny(["keychain"])) return "🔑";

    return stablePick(["🎁", "🎉", "🛍️", "💌"]);
  }

  if (
    hasAny([
      "pet food",
      "water bowl",
      "leash",
      "collar",
      "pet bed",
      "pet brush",
      "pet costume",
      "fancy collar",
      "pet toy",
      "treats"
    ]) ||
    questionHasAny(["pet", "dog", "cat"])
  ) {
    if (hasAny(["food"])) return "🥣";
    if (hasAny(["water", "bowl"])) return "💧";
    if (hasAny(["leash", "collar"])) return "🦮";
    if (hasAny(["bed"])) return "🛏️";
    if (hasAny(["brush"])) return "🪮";
    if (hasAny(["toy"])) return "🧸";
    if (hasAny(["treat"])) return "🦴";

    return stablePick(["🐶", "🐱", "🐾", "🦴"]);
  }

  if (
    hasAny([
      "apple",
      "banana",
      "orange",
      "fruit",
      "sandwich",
      "yogurt",
      "granola",
      "cookie",
      "chips",
      "ice cream",
      "soda",
      "juice",
      "candy",
      "chocolate",
      "cupcake",
      "popcorn",
      "water bottle",
      "lunch",
      "pizza",
      "cake",
      "snack",
      "drink"
    ]) ||
    questionHasAny(["snack", "food", "lunch", "meal", "treat", "movie night"])
  ) {
    if (hasAny(["water"])) return "💧";
    if (hasAny(["apple", "fruit"])) return "🍎";
    if (hasAny(["banana"])) return "🍌";
    if (hasAny(["orange"])) return "🍊";
    if (hasAny(["sandwich", "lunch"])) return "🥪";
    if (hasAny(["yogurt"])) return "🥣";
    if (hasAny(["granola"])) return "🥨";
    if (hasAny(["cookie"])) return "🍪";
    if (hasAny(["chips"])) return "🥔";
    if (hasAny(["ice cream"])) return "🍦";
    if (hasAny(["soda"])) return "🥤";
    if (hasAny(["juice", "drink"])) return "🧃";
    if (hasAny(["chocolate"])) return "🍫";
    if (hasAny(["candy"])) return "🍬";
    if (hasAny(["cupcake"])) return "🧁";
    if (hasAny(["cake"])) return "🎂";
    if (hasAny(["popcorn"])) return "🍿";
    if (hasAny(["pizza"])) return "🍕";

    return stablePick(["🍎", "🥪", "🥣", "🍪", "🧃"]);
  }

  if (
    hasAny([
      "coupon",
      "sale",
      "shopping list",
      "compare prices",
      "price compare"
    ])
  ) {
    if (hasAny(["coupon", "sale", "price"])) return "🏷️";
    if (hasAny(["list"])) return "📝";

    return stablePick(["🏷️", "📝", "🪙"]);
  }

  if (
    hasAny([
      "toy",
      "game",
      "board game",
      "video game",
      "puzzle",
      "blocks",
      "stuffed",
      "slime",
      "bracelet",
      "keychain",
      "sticker",
      "doll",
      "action figure"
    ]) ||
    questionHasAny(["toy", "game", "play", "game night"])
  ) {
    if (hasAny(["toy car", "car"])) return "🚗";
    if (hasAny(["board game"])) return "🎲";
    if (hasAny(["video game", "game"])) return "🎮";
    if (hasAny(["puzzle"])) return "🧩";
    if (hasAny(["blocks"])) return "🧱";
    if (hasAny(["stuffed", "toy", "doll", "action figure"])) return "🧸";
    if (hasAny(["slime"])) return "🫧";
    if (hasAny(["bracelet"])) return "📿";
    if (hasAny(["keychain"])) return "🔑";
    if (hasAny(["sticker"])) return "🌟";

    return stablePick(["🧸", "🎮", "🧩", "🎲"]);
  }

  if (
    hasAny([
      "notebook",
      "pencil",
      "marker",
      "crayon",
      "folder",
      "glue",
      "backpack",
      "eraser",
      "book",
      "ruler",
      "calculator",
      "paper"
    ]) ||
    questionHasAny(["school", "classroom"])
  ) {
    if (hasAny(["notebook", "book"])) return "📚";
    if (hasAny(["pencil"])) return "✏️";
    if (hasAny(["marker", "crayon"])) return "🖍️";
    if (hasAny(["folder"])) return "📁";
    if (hasAny(["glue"])) return "🧴";
    if (hasAny(["backpack"])) return "🎒";
    if (hasAny(["eraser"])) return "🧽";
    if (hasAny(["ruler"])) return "📏";
    if (hasAny(["calculator"])) return "🧮";

    return stablePick(["📚", "✏️", "📁", "🎒"]);
  }

  if (
    hasAny([
      "canvas",
      "paint",
      "brush",
      "scissors",
      "glitter",
      "craft",
      "poster",
      "art"
    ]) ||
    questionHasAny(["art", "craft", "project"])
  ) {
    if (hasAny(["paint", "canvas", "brush", "art"])) return "🎨";
    if (hasAny(["scissors"])) return "✂️";
    if (hasAny(["glitter"])) return "✨";
    if (hasAny(["poster"])) return "📋";

    return stablePick(["🎨", "✂️", "✨", "📋"]);
  }

  if (
    hasAny([
      "soccer",
      "basketball",
      "helmet",
      "sneakers",
      "sports",
      "whistle",
      "bike",
      "swim",
      "running"
    ]) ||
    questionHasAny(["sports", "exercise", "practice"])
  ) {
    if (hasAny(["soccer", "ball"])) return "⚽";
    if (hasAny(["basketball"])) return "🏀";
    if (hasAny(["helmet"])) return "⛑️";
    if (hasAny(["sneakers", "running"])) return "👟";
    if (hasAny(["bike"])) return "🚴";
    if (hasAny(["swim"])) return "🏊";
    if (hasAny(["whistle"])) return "📣";

    return stablePick(["⚽", "🏀", "👟", "🏃"]);
  }

  if (bucket.includes("help") || bucket.includes("need")) {
    return stablePick(["💡", "🛒", "📌", "⭐"]);
  }

  if (bucket.includes("hurt") || bucket.includes("want") || bucket.includes("extra")) {
    return stablePick(["🎁", "✨", "🧸", "🍬"]);
  }

  return stablePick(["⭐", "💡", "📦", "🛒"]);
}

export function getQuestionObjects(question) {
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

export function dedupeObjects(objects) {
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

export function shuffleArray(array) {
  if (!Array.isArray(array)) return [];

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function buildObjectListForPrompt(question) {
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

export function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}