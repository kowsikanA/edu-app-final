// import "dotenv/config";
// import axios from "axios";
// import express from "express";
// import cors from "cors";
// import Groq from "groq-sdk";
// import lessonsData from "./lessonStruct.js";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY?.trim();

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(cors());
// app.use(express.json({ limit: "2mb" }));

// const STYLE_BOOST =
//   "minimal flat 2d cartoon illustration, children's educational app style, simple clean shapes, smooth outlines, bright vibrant colours, uncluttered background, easy to understand, vector-style, no realism";

// const ANATOMY_GUARD =
//   "correct anatomy, one head, two arms, two hands, two legs, natural pose, no extra limbs, no duplicated body parts, no distorted face";

// const SPEND_ITEM_POOLS = {
//   snack: [
//     "cookie",
//     "chips",
//     "ice cream",
//     "juice box",
//     "muffin",
//     "granola bar",
//     "sandwich",
//     "fruit cup",
//     "popcorn",
//     "yogurt"
//   ],
//   toy: [
//     "toy car",
//     "stuffed bear",
//     "bouncy ball",
//     "sticker pack",
//     "small puzzle",
//     "yo-yo",
//     "toy dinosaur",
//     "coloring book"
//   ],
//   school: [
//     "notebook",
//     "pencil case",
//     "markers",
//     "eraser set",
//     "glue stick",
//     "crayons",
//     "folder",
//     "water bottle"
//   ],
//   fun: [
//     "comic book",
//     "trading cards",
//     "bracelet kit",
//     "mini sketchbook"
//   ]
// };

// const GOAL_ITEM_POOLS = [
//   "video game",
//   "storybook",
//   "backpack",
//   "soccer ball",
//   "skateboard",
//   "scooter",
//   "headphones",
//   "bike",
//   "art kit",
//   "lunch box",
//   "water bottle",
//   "notebook set",
//   "tablet"
// ];

// void lessonsData;
// const recentLessonVariations = new Map();

// function getLessonVariationKey(payload) {
//   return `${payload.grade || "grade"}::${payload.unit || "unit"}::${payload.lessonId || payload.title || "lesson"}`;
// }

// function rememberLessonVariation(payload, questions) {
//   const key = getLessonVariationKey(payload);

//   const compact = (questions || []).map((q) => ({
//     type: q.type || "",
//     scenarioTitle: q.scenarioTitle || "",
//     scenarioText: q.scenarioText || "",
//     question: q.question || "",
//     options: (q.options || []).map((o) => o.text || ""),
//     cards: (q.cards || []).map((c) => c.title || c.text || ""),
//     items: (q.items || []).map((i) => i.name || i.label || "")
//   }));

//   recentLessonVariations.set(key, compact);
// }

// function getPreviousLessonVariation(payload) {
//   const key = getLessonVariationKey(payload);
//   return recentLessonVariations.get(key) || null;
// }

// function safeJsonParse(text) {
//   try {
//     return JSON.parse(text);
//   } catch {
//     return null;
//   }
// }

// function normalizeQuestionType(rawType) {
//   const value = String(rawType || "").trim().toLowerCase();

//   if (value.includes("drag")) return "drag-drop";
//   if (value.includes("budget")) return "budget-builder";
//   if (value.includes("tap")) return "tap-reveal";
//   if (value.includes("scenario")) return "scenario-choice";

//   return "scenario-choice";
// }

// function buildFinalImagePrompt(rawPrompt) {
//   return [
//     rawPrompt,
//     STYLE_BOOST,
//     ANATOMY_GUARD,
//     "show a full real-life scenario, not isolated objects",
//     "show the whole situation from the question",
//     "include all important items naturally in one scene",
//     "do not create an answer-choice layout",
//     "do not show one or two answer options by themselves",
//     "show a realistic everyday setting a student would recognize",
//     "the location must match the scenario",
//     "use a store if the question is about buying something",
//     "use a school setting if the question is about school items",
//     "use a snack counter or cafeteria if the question is about food or snacks",
//     "clear spatial relationship between objects",
//     "correct prices must stay attached to the correct items",
//     "only include numbers directly relevant to the question",
//     "do not add random prices or unrelated numbers",
//     "do not add random thought bubbles",
//     "do not add labels with incorrect text",
//     "if money is mentioned, show the money naturally in the scene",
//     "if a saving goal is mentioned, show the goal item naturally in the same scene only if relevant",
//     "avoid floating objects on a blank background",
//     "avoid infographic style",
//     "avoid split-screen comparison unless the question literally describes comparing two things",
//     "show the exact decision situation as one complete moment",
//     "full subject visible",
//     "fit entire scene in frame",
//     "wide horizontal composition",
//     "centered composition",
//     "plain soft background",
//     "educational illustration",
//     "kid friendly",
//     "do not replace toy items with real-life adult versions",
//     "if the prompt says toy car, show a toy car clearly",
//     "avoid extra unrelated objects",
//     "do not add random extra products",
//     "do not include objects not mentioned in the lesson goal or question",
//     "no misleading or swapped price tags"
//   ].join(", ");
// }

// async function generateImageBase64(prompt, options = {}) {
//   if (!huggingFaceApiKey) {
//     throw new Error("Missing HUGGINGFACE_API_KEY in .env");
//   }

//   const { width = 1200, height = 500 } = options;
//   const finalPrompt = buildFinalImagePrompt(prompt);

//   const model = "black-forest-labs/FLUX.1-schnell";
//   const url = `https://router.huggingface.co/hf-inference/models/${model}`;

//   const res = await axios.post(
//     url,
//     {
//       inputs: finalPrompt,
//       parameters: {
//         width,
//         height
//       }
//     },
//     {
//       responseType: "arraybuffer",
//       headers: {
//         Authorization: `Bearer ${huggingFaceApiKey}`,
//         "Content-Type": "application/json",
//         Accept: "image/png"
//       },
//       validateStatus: () => true
//     }
//   );

//   if (res.status !== 200) {
//     const body =
//       Buffer.isBuffer(res.data) || res.data instanceof Uint8Array
//         ? Buffer.from(res.data).toString("utf8")
//         : String(res.data);

//     throw new Error(`Hugging Face error ${res.status}: ${body}`);
//   }

//   return `data:image/png;base64,${Buffer.from(res.data).toString("base64")}`;
// }

// function sanitizeImagePrompt(
//   prompt,
//   fallback = "a child-friendly educational picture"
// ) {
//   const text = String(prompt || "").trim();
//   if (!text) return fallback;

//   return text
//     .replace(/\breal car\b/gi, "toy car")
//     .replace(/\bcar\b/gi, "toy car")
//     .replace(/\brealistic\b/gi, "")
//     .replace(/\babstract\b/gi, "")
//     .replace(/\bconcept\b/gi, "")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function extractMoneyAmount(text) {
//   const match = String(text || "").match(/\$(\d+)/);
//   return match ? Number(match[1]) : null;
// }

// function extractAllMoneyAmounts(text) {
//   return [...String(text || "").matchAll(/\$(\d+)/g)].map((match) =>
//     Number(match[1])
//   );
// }

// function containsAny(text, words) {
//   const value = String(text || "").toLowerCase();
//   return words.some((word) => value.includes(word));
// }

// function normalizeCurrencyText(value) {
//   return typeof value === "number" && Number.isFinite(value)
//     ? `$${value}`
//     : "some money";
// }

// function normalizeItemKey(text) {
//   return String(text || "")
//     .toLowerCase()
//     .replace(/\b(a|an|the)\b/g, "")
//     .replace(/\bafter school\b/g, "")
//     .replace(/\bnow\b/g, "")
//     .replace(/\btoday\b/g, "")
//     .replace(/\$?\d+/g, "")
//     .replace(/[^\w\s]/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function createLessonMemory() {
//   return {
//     usedSpendItems: new Set(),
//     usedGoalItems: new Set(),
//     usedOptionTexts: new Set(),
//     usedQuestionTitles: new Set()
//   };
// }

// function getFlattenedSpendPool() {
//   return [
//     ...SPEND_ITEM_POOLS.snack,
//     ...SPEND_ITEM_POOLS.toy,
//     ...SPEND_ITEM_POOLS.school,
//     ...SPEND_ITEM_POOLS.fun
//   ];
// }

// function pickUniqueFromPool(pool, usedSet, fallback = "snack") {
//   const cleanPool = Array.isArray(pool) ? [...new Set(pool)] : [];
//   const available = cleanPool.filter(
//     (item) => !usedSet.has(normalizeItemKey(item))
//   );

//   const source = available.length > 0 ? available : cleanPool;
//   if (source.length === 0) return fallback;

//   const choice = source[Math.floor(Math.random() * source.length)];
//   usedSet.add(normalizeItemKey(choice));
//   return choice;
// }

// function guessSpendCategory(question) {
//   const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""} ${question?.goal || ""}`.toLowerCase();

//   if (
//     containsAny(combined, [
//       "snack",
//       "lunch",
//       "after school",
//       "cookie",
//       "chips",
//       "candy",
//       "ice cream",
//       "food",
//       "meal",
//       "sandwich",
//       "fruit"
//     ])
//   ) {
//     return "snack";
//   }

//   if (containsAny(combined, ["school", "class", "homework", "supplies", "pencil", "notebook", "bookstore"])) {
//     return "school";
//   }

//   if (containsAny(combined, ["toy", "stuffed", "ball", "game stand", "play", "bike", "scooter"])) {
//     return "toy";
//   }

//   return "fun";
// }

// function pickDynamicSpendItem(question, lessonMemory) {
//   const category = guessSpendCategory(question);
//   const pool = SPEND_ITEM_POOLS[category] || getFlattenedSpendPool();
//   return pickUniqueFromPool(pool, lessonMemory.usedSpendItems, "cookie");
// }

// function pickTwoDifferentDynamicSpendItems(question, lessonMemory) {
//   const category = guessSpendCategory(question);
//   const pool = SPEND_ITEM_POOLS[category] || getFlattenedSpendPool();

//   const first = pickUniqueFromPool(pool, lessonMemory.usedSpendItems, "cookie");
//   let second = pickUniqueFromPool(pool, lessonMemory.usedSpendItems, "chips");

//   if (normalizeItemKey(first) === normalizeItemKey(second)) {
//     const backupPool = getFlattenedSpendPool().filter(
//       (item) => normalizeItemKey(item) !== normalizeItemKey(first)
//     );
//     second = pickUniqueFromPool(backupPool, lessonMemory.usedSpendItems, "juice box");
//   }

//   return [first, second];
// }

// function pickDynamicGoalItem(question, lessonMemory) {
//   const detected = detectGoalItem(question);
//   if (detected) {
//     lessonMemory.usedGoalItems.add(normalizeItemKey(detected));
//     return detected;
//   }

//   return pickUniqueFromPool(GOAL_ITEM_POOLS, lessonMemory.usedGoalItems, "video game");
// }

// function getGoalPrice(question) {
//   const sources = [
//     question?.goal,
//     question?.scenarioText,
//     question?.question,
//     question?.heroCaption
//   ];

//   for (const source of sources) {
//     const values = extractAllMoneyAmounts(source);
//     if (values.length > 0) {
//       return Math.max(...values);
//     }
//   }

//   return null;
// }

// function getWalletAmount(question) {
//   if (
//     typeof question?.walletAmount === "number" &&
//     Number.isFinite(question.walletAmount)
//   ) {
//     return question.walletAmount;
//   }

//   const values = extractAllMoneyAmounts(
//     `${question?.scenarioText || ""} ${question?.question || ""}`
//   );
//   if (values.length > 0) return values[0];

//   return null;
// }

// function detectGoalItem(question) {
//   const combined =
//     `${question?.goal || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

//   const map = [
//     ["video game", ["video game", "new game", "game"]],
//     ["toy car", ["toy car"]],
//     ["toy", ["toy"]],
//     ["book", ["storybook", "children's book", "childrens book", "book"]],
//     ["backpack", ["backpack"]],
//     ["notebook", ["notebook"]],
//     ["school supplies", ["school supplies", "art supplies", "supplies"]],
//     ["skateboard", ["skateboard"]],
//     ["scooter", ["scooter"]],
//     ["headphones", ["headphones"]],
//     ["bike", ["bike", "bicycle"]],
//     ["water bottle", ["water bottle"]],
//     ["lunch", ["lunch", "meal"]],
//     ["soccer ball", ["soccer ball"]],
//     ["art kit", ["art kit"]],
//     ["lunch box", ["lunch box"]],
//     ["tablet", ["tablet"]]
//   ];

//   for (const [label, keywords] of map) {
//     if (containsAny(combined, keywords)) return label;
//   }

//   return "";
// }

// function detectPrimarySpendItem(question) {
//   const combined =
//     `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

//   const spendMap = [
//     ["cookie", ["cookie"]],
//     ["chips", ["chips"]],
//     ["candy", ["candy"]],
//     ["ice cream", ["ice cream"]],
//     ["cake", ["cake"]],
//     ["snack", ["snack"]],
//     ["toy car", ["toy car"]],
//     ["toy", ["toy"]],
//     ["book", ["book"]],
//     ["game", ["game"]],
//     ["notebook", ["notebook"]],
//     ["backpack", ["backpack"]],
//     ["lunch", ["lunch", "meal"]],
//     ["juice box", ["juice box", "juice"]],
//     ["sandwich", ["sandwich"]],
//     ["muffin", ["muffin"]],
//     ["tablet", ["tablet"]],
//     ["bike", ["bike", "bicycle"]],
//     ["blanket", ["blanket"]],
//     ["water bottle", ["water bottle"]],
//     ["ball", ["ball", "soccer ball"]],
//     ["fruit", ["fruit", "watermelon"]]
//   ];

//   for (const [label, keywords] of spendMap) {
//     if (containsAny(combined, keywords)) return label;
//   }

//   return "";
// }

// function detectScenarioLocation(question) {
//   const combined =
//     `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""} ${question?.goal || ""}`.toLowerCase();

//   if (containsAny(combined, ["book", "bookstore", "school book"])) return "bookstore";
//   if (containsAny(combined, ["bike", "bicycle"])) return "bike shop";
//   if (containsAny(combined, ["snack", "cookie", "chips", "ice cream", "juice", "sandwich", "fruit"])) return "snack shop";
//   if (containsAny(combined, ["notebook", "markers", "eraser", "glue", "crayons", "supplies", "backpack"])) return "school supply store";
//   if (containsAny(combined, ["toy", "toy car", "puzzle", "stuffed", "ball"])) return "toy store";
//   if (containsAny(combined, ["lunch", "meal", "cafeteria"])) return "cafeteria";
//   return "store";
// }

// function pickItemEmoji(label) {
//   const value = String(label || "").toLowerCase();

//   if (containsAny(value, ["blanket"])) return "🛏️";
//   if (containsAny(value, ["sandwich", "sandwiches"])) return "🥪";
//   if (containsAny(value, ["ball", "soccer"])) return "⚽";
//   if (containsAny(value, ["basket"])) return "🧺";
//   if (containsAny(value, ["fruit", "watermelon"])) return "🍉";
//   if (containsAny(value, ["toy car"])) return "🚗";
//   if (containsAny(value, ["bubbles"])) return "🫧";
//   if (containsAny(value, ["water bottle"])) return "💧";
//   if (containsAny(value, ["notebook"])) return "📓";
//   if (containsAny(value, ["pencil"])) return "✏️";
//   if (containsAny(value, ["markers"])) return "🖍️";
//   if (containsAny(value, ["eraser"])) return "🩹";
//   if (containsAny(value, ["glue"])) return "🧴";
//   if (containsAny(value, ["crayons"])) return "🖍️";
//   if (containsAny(value, ["folder"])) return "📁";
//   if (containsAny(value, ["cookie"])) return "🍪";
//   if (containsAny(value, ["chips"])) return "🥔";
//   if (containsAny(value, ["ice cream"])) return "🍦";
//   if (containsAny(value, ["juice"])) return "🧃";
//   if (containsAny(value, ["muffin"])) return "🧁";
//   if (containsAny(value, ["granola"])) return "🥨";
//   if (containsAny(value, ["popcorn"])) return "🍿";
//   if (containsAny(value, ["yogurt"])) return "🥣";
//   if (containsAny(value, ["book", "storybook"])) return "📚";
//   if (containsAny(value, ["bike", "bicycle"])) return "🚲";
//   if (containsAny(value, ["tablet"])) return "📱";
//   if (containsAny(value, ["backpack"])) return "🎒";
//   if (containsAny(value, ["lunch"])) return "🍽️";
//   if (containsAny(value, ["headphones"])) return "🎧";
//   if (containsAny(value, ["soccer ball"])) return "⚽";
//   if (containsAny(value, ["art kit"])) return "🎨";
//   if (containsAny(value, ["lunch box"])) return "🍱";
//   if (containsAny(value, ["toy"])) return "🧸";

//   return "📦";
// }

// function pickCardEmoji(title, text, index) {
//   const value = `${title || ""} ${text || ""}`.toLowerCase();

//   if (containsAny(value, ["money", "$", "cost", "price", "save"])) return "💰";
//   if (containsAny(value, ["goal", "target"])) return "🎯";
//   if (containsAny(value, ["smart", "best", "good choice", "correct"])) return "✅";
//   if (containsAny(value, ["think", "clue", "hint"])) return "💡";

//   return index === 0 ? "💡" : index === 1 ? "🎯" : index === 2 ? "✅" : "💰";
// }

// function cleanSceneText(text) {
//   return String(text || "")
//     .replace(/[^\x20-\x7E]/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function buildScenarioScenePrompt(question, lessonMemory) {
//   const scenarioTitle = cleanSceneText(question?.scenarioTitle || "");
//   const scenarioText = cleanSceneText(question?.scenarioText || "");
//   const questionText = cleanSceneText(question?.question || "");
//   const goalText = cleanSceneText(question?.goal || "");
//   const combined =
//     `${scenarioTitle} ${scenarioText} ${questionText} ${goalText}`.toLowerCase();

//   const walletAmount = getWalletAmount(question);
//   const goalPrice = getGoalPrice(question);
//   const goalItem = detectGoalItem(question) || pickDynamicGoalItem(question, lessonMemory);
//   const spendItem = detectPrimarySpendItem(question) || pickDynamicSpendItem(question, lessonMemory);
//   const location = detectScenarioLocation(question);

//   if (location === "bike shop") {
//     return `a child in a bike shop holding ${normalizeCurrencyText(walletAmount || 15)}, looking at a bike for sale in the shop, realistic store setting, full question scene, only show prices directly relevant to the question, do not show unrelated books or random numbers, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (location === "bookstore") {
//     const bookPrice = extractMoneyAmount(`${scenarioText} ${questionText}`) || 12;

//     if (containsAny(combined, ["tablet"])) {
//       return `a child in a bookstore holding ${normalizeCurrencyText(walletAmount || 15)}, looking at a book with a clear ${normalizeCurrencyText(bookPrice)} price tag while also thinking about saving for a tablet${goalPrice ? ` that costs ${normalizeCurrencyText(goalPrice)}` : ""}, full real-life bookstore scene, only show prices mentioned in the question, kid-friendly educational cartoon, simple clean background`;
//     }

//     return `a child in a bookstore looking at a book with a clear ${normalizeCurrencyText(bookPrice)} price tag on a shelf, realistic bookstore setting, full question scene, do not add unrelated numbers or objects, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (location === "snack shop") {
//     return `a child in a snack shop or cafeteria holding ${normalizeCurrencyText(walletAmount || 0)}, looking at a ${spendItem}${goalPrice ? ` while thinking about saving for a ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}` : ""}, full real-life decision scene, only include relevant items and prices, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (location === "school supply store") {
//     return `a child in a school supply store looking at ${spendItem} with other relevant school items nearby in a realistic store setting, full question scene, only show details directly related to the question, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (location === "toy store") {
//     return `a child in a toy store looking at a ${spendItem} in a realistic store setting${goalPrice ? ` while thinking about a ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}` : ""}, full question scene, only show relevant prices and objects, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (location === "cafeteria") {
//     return `a child in a cafeteria or lunch area looking at a meal choice in a realistic school setting, full question scene, only include relevant objects and prices, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (goalItem && goalPrice != null && walletAmount != null) {
//     return `a child in a realistic ${location} setting holding ${normalizeCurrencyText(walletAmount)}, with a ${spendItem} nearby and a ${goalItem} with a clear ${normalizeCurrencyText(goalPrice)} price tag naturally included in the same scene, full question scenario, only include details relevant to the question, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (spendItem && walletAmount != null) {
//     return `a child in a realistic ${location} setting holding ${normalizeCurrencyText(walletAmount)} and looking at a ${spendItem}, full scenario from the question, only include relevant objects and prices, kid-friendly educational cartoon, simple clean background`;
//   }

//   return "";
// }

// function buildGoalFirstImagePrompt(question, lessonMemory) {
//   return buildScenarioScenePrompt(question, lessonMemory);
// }

// function buildExactImagePromptFromQuestion(question, lessonMemory) {
//   const prompt = cleanSceneText(question?.questionImagePrompt || "");
//   const questionText = cleanSceneText(question?.question || "");
//   const scenarioText = cleanSceneText(question?.scenarioText || "");
//   const scenarioTitle = cleanSceneText(question?.scenarioTitle || "");
//   const combined =
//     `${scenarioTitle} ${scenarioText} ${question?.goal || ""} ${prompt} ${questionText}`.toLowerCase();

//   const scenarioPrompt = buildScenarioScenePrompt(question, lessonMemory);
//   if (scenarioPrompt) {
//     return scenarioPrompt;
//   }

//   if (containsAny(combined, ["toy car"])) {
//     return "a child in a toy store looking at a toy car with the correct visible price tag in the full scene, realistic toy store setting, kid-friendly educational cartoon, simple clean background";
//   }

//   if (containsAny(combined, ["backpack"])) {
//     return "a child in a school supplies store looking at a backpack with other school items naturally around it, full real-life store scene, kid-friendly educational cartoon, plain background";
//   }

//   if (containsAny(combined, ["notebook"])) {
//     return "a child in a bookstore or school supplies store looking at a notebook and pencil in a full real-life store scene, kid-friendly educational cartoon, plain background";
//   }

//   if (containsAny(combined, ["lunch", "meal"])) {
//     return "a child choosing a lunch in a cafeteria or food setting, full real-life scene, kid-friendly educational cartoon, simple background";
//   }

//   if (containsAny(combined, ["cookie"])) {
//     const amount =
//       extractMoneyAmount(prompt) ||
//       extractMoneyAmount(questionText) ||
//       extractMoneyAmount(scenarioText);

//     return `a child in a snack shop looking at a cookie${amount != null ? ` with a clear $${amount} price tag` : ""}, full real-life question scene, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (containsAny(combined, ["cake"])) {
//     const amount =
//       extractMoneyAmount(prompt) ||
//       extractMoneyAmount(questionText) ||
//       extractMoneyAmount(scenarioText);

//     return `a child in a snack shop looking at a slice of cake${amount != null ? ` with a clear $${amount} price tag` : ""}, full real-life question scene, kid-friendly educational cartoon, simple clean background`;
//   }

//   if (containsAny(combined, ["chips"])) {
//     const amount =
//       extractMoneyAmount(prompt) ||
//       extractMoneyAmount(questionText) ||
//       extractMoneyAmount(scenarioText);

//     return `a child in a snack shop looking at chips${amount != null ? ` with a clear $${amount} price tag` : ""}, full real-life question scene, kid-friendly educational cartoon, simple clean background`;
//   }

//   return sanitizeImagePrompt(
//     prompt,
//     "a full real-life scene that clearly shows the entire question situation in a kid-friendly educational style"
//   );
// }

// function cleanScenarioChoiceOptionText(text, question, isBest) {
//   let value = String(text || "").trim();
//   if (!value) return isBest ? "Save your money for your goal" : "Spend your money now";

//   value = value.replace(/\s+/g, " ").trim();
//   const lower = value.toLowerCase();
//   const questionText = String(question?.question || "").toLowerCase();
//   const scenarioText = String(question?.scenarioText || "").toLowerCase();
//   const goalItem = detectGoalItem(question);

//   if (lower === "save money" || lower === "save it" || lower === "keep saving") {
//     return goalItem ? `Save your money for the ${goalItem}` : "Save your money for your goal";
//   }

//   if (containsAny(lower, ["cookie", "cake", "chips", "candy", "snack", "ice cream", "juice box", "muffin", "granola bar", "sandwich", "fruit cup", "popcorn", "yogurt"])) {
//     if (!containsAny(lower, ["after school", "today", "now"])) {
//       return `${value} after school`;
//     }
//   }

//   if (containsAny(lower, ["toy", "game", "stuffed bear", "bouncy ball", "yo-yo", "puzzle", "sticker pack", "bike"])) {
//     if (!containsAny(lower, ["after school", "today", "now"])) {
//       return `${value} after school`;
//     }
//   }

//   if (
//     (containsAny(questionText, ["after school"]) ||
//       containsAny(scenarioText, ["after school"])) &&
//     !containsAny(lower, ["after school"]) &&
//     containsAny(lower, ["buy", "spend"])
//   ) {
//     return `${value} after school`;
//   }

//   return value;
// }

// function buildScenarioChoiceHint(text, question) {
//   const value = String(text || "").toLowerCase();
//   const goal = String(question?.goal || "").trim();

//   if (containsAny(value, ["cookie", "cake", "chips", "candy", "snack", "ice cream", "juice box", "muffin", "granola bar", "sandwich", "fruit cup", "popcorn", "yogurt"])) {
//     return goal
//       ? `That snack may be fun now, but it does not help your goal to ${goal.toLowerCase()}.`
//       : "That snack may be fun now, but it does not help your goal.";
//   }

//   if (containsAny(value, ["toy", "game", "stuffed bear", "bouncy ball", "yo-yo", "puzzle", "sticker pack", "bike"])) {
//     return goal
//       ? `That choice may be fun now, but it slows down your goal to ${goal.toLowerCase()}.`
//       : "That choice may be fun now, but it slows down your goal.";
//   }

//   if (containsAny(value, ["wait", "later"])) {
//     return "Think about which choice best helps the goal right now.";
//   }

//   return "Think about which choice helps your goal the most.";
// }

// function buildScenarioChoiceEffect(text, question, isBest) {
//   const value = String(text || "").toLowerCase();
//   const goal = String(question?.goal || "").trim();

//   if (isBest) {
//     if (goal) {
//       return `Great choice! That helps you get closer to your goal to ${goal.toLowerCase()}.`;
//     }
//     return "Great choice! That helps you reach your goal.";
//   }

//   if (containsAny(value, ["cookie", "cake", "chips", "candy", "snack", "ice cream", "juice box", "muffin", "granola bar", "sandwich", "fruit cup", "popcorn", "yogurt"])) {
//     return goal
//       ? `Buying that snack uses money that could help you ${goal.toLowerCase()}.`
//       : "Buying that snack uses money that could help with your goal.";
//   }

//   if (containsAny(value, ["toy", "game", "stuffed bear", "bouncy ball", "yo-yo", "puzzle", "sticker pack", "bike"])) {
//     return goal
//       ? `Buying that now means it will take longer to ${goal.toLowerCase()}.`
//       : "Buying that now means your goal will take longer.";
//   }

//   return goal
//     ? `That choice does not help you ${goal.toLowerCase()}.`
//     : "That choice does not help your goal.";
// }

// function pickScenarioChoiceEmoji(text, isBest, index) {
//   const value = String(text || "").toLowerCase();

//   if (isBest) {
//     if (containsAny(value, ["save", "money left", "good price"])) return "💰";
//     if (containsAny(value, ["school", "notebook", "pencil", "markers", "backpack", "book"])) return "📚";
//     if (containsAny(value, ["food", "lunch", "meal"])) return "🍽️";
//     if (containsAny(value, ["bike"])) return "🚲";
//     return "✅";
//   }

//   if (containsAny(value, ["toy", "car", "doll", "stuffed bear", "bouncy ball", "puzzle", "yo-yo"])) return "🧸";
//   if (value.includes("game")) return "🎮";
//   if (containsAny(value, ["bike"])) return "🚲";
//   if (containsAny(value, ["cookie", "cake", "chips", "candy", "snack", "ice cream", "muffin", "granola bar", "sandwich", "fruit cup", "popcorn", "yogurt"])) return "🍪";
//   if (containsAny(value, ["juice", "juice box"])) return "🧃";
//   if (value.includes("book")) return "📚";
//   if (containsAny(value, ["wait", "later"])) return "⏳";

//   return index === 1 ? "❌" : "⭐";
// }

// function buildTapRevealClueText(question, clueIndex, lessonMemory) {
//   const goal = String(question?.goal || "").trim();
//   const walletAmount = getWalletAmount(question);
//   const goalPrice = getGoalPrice(question);
//   const goalItem = detectGoalItem(question) || pickDynamicGoalItem(question, lessonMemory);

//   if (clueIndex === 0) {
//     return walletAmount != null
//       ? `You have ${normalizeCurrencyText(walletAmount)} right now.`
//       : "Think about how much money you have right now.";
//   }

//   if (clueIndex === 1) {
//     if (goalPrice != null && goalItem) {
//       return `The ${goalItem} costs ${normalizeCurrencyText(goalPrice)}.`;
//     }
//     if (goalPrice != null) {
//       return `Your goal costs ${normalizeCurrencyText(goalPrice)}.`;
//     }
//     return goal
//       ? `Think about your goal to ${goal.toLowerCase()}.`
//       : "Think about your bigger goal.";
//   }

//   if (clueIndex === 2) {
//     if (walletAmount != null && goalPrice != null && goalPrice > walletAmount) {
//       return `Saving today helps you get closer because ${normalizeCurrencyText(walletAmount)} is less than ${normalizeCurrencyText(goalPrice)}.`;
//     }
//     return "Spending less now helps you save more for later.";
//   }

//   return goalItem
//     ? `A smart choice helps you reach the ${goalItem} sooner.`
//     : "A smart choice helps you reach your goal sooner.";
// }

// function buildTapRevealOptions(question, lessonMemory) {
//   const walletAmount = getWalletAmount(question);
//   const goalPrice = getGoalPrice(question);
//   const goalItem = detectGoalItem(question) || pickDynamicGoalItem(question, lessonMemory);
//   let spendItem = detectPrimarySpendItem(question);

//   if (!spendItem || spendItem === "snack") {
//     spendItem = pickDynamicSpendItem(question, lessonMemory);
//   } else {
//     lessonMemory.usedSpendItems.add(normalizeItemKey(spendItem));
//   }

//   const amountText = walletAmount != null ? normalizeCurrencyText(walletAmount) : "your money";

//   const bestText = goalItem
//     ? `Save ${amountText} for the ${goalItem}`
//     : `Save ${amountText} for your goal`;

//   const wrongText = containsAny(spendItem, ["cookie", "chips", "candy", "ice cream", "juice box", "muffin", "granola bar", "sandwich", "fruit cup", "popcorn", "yogurt"])
//     ? `Buy ${spendItem} after school`
//     : `Buy ${spendItem} now`;

//   const bestEffect =
//     goalItem && goalPrice != null
//       ? `Great choice! Saving ${amountText} helps you get closer to the ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}.`
//       : "Great choice! Saving today helps you get closer to your goal.";

//   const wrongHint = goalItem
//     ? `That uses money you could save for the ${goalItem}.`
//     : "That uses money you could save for your goal.";

//   const wrongEffect =
//     goalItem && goalPrice != null
//       ? `Spending now means you still need more money for the ${goalItem} that costs ${normalizeCurrencyText(goalPrice)}.`
//       : "Spending now means it will take longer to reach your goal.";

//   return [
//     { text: bestText, isBest: true, effect: bestEffect },
//     { text: wrongText, isBest: false, hint: wrongHint, effect: wrongEffect }
//   ];
// }

// function getPromptSchema(questionType, index = 0) {
//   const q = index + 1;

//   if (questionType === "budget-builder") {
//     return `
// {
//   "type": "budget-builder",
//   "scenarioTitle": "...",
//   "scenarioText": "...",
//   "budget": 10,
//   "goal": "...",
//   "heroEmoji": "🎨",
//   "heroCaption": "...",
//   "question": "...",
//   "generalHint": "...",
//   "successMessage": "...",
//   "showAnswerTip": true,
//   "questionImagePrompt": "...",
//   "items": [
//     { "id": "q${q}i1", "name": "Paper", "price": 3, "emoji": "📄", "tag": "need" },
//     { "id": "q${q}i2", "name": "Markers", "price": 4, "emoji": "🖍️", "tag": "need" },
//     { "id": "q${q}i3", "name": "Glue", "price": 2, "emoji": "🧴", "tag": "helpful" },
//     { "id": "q${q}i4", "name": "Candy", "price": 3, "emoji": "🍭", "tag": "extra" }
//   ],
//   "correctItemIds": ["q${q}i1", "q${q}i2", "q${q}i3"]
// }`;
//   }

//   if (questionType === "drag-drop") {
//     return `
// {
//   "type": "drag-drop",
//   "scenarioTitle": "...",
//   "scenarioText": "...",
//   "heroEmoji": "🛍️",
//   "heroCaption": "...",
//   "question": "...",
//   "generalHint": "...",
//   "successMessage": "...",
//   "questionImagePrompt": "...",
//   "items": [
//     { "id": "q${q}i1", "label": "Water Bottle", "emoji": "💧", "bucket": "need" },
//     { "id": "q${q}i2", "label": "Lunch", "emoji": "🥪", "bucket": "need" },
//     { "id": "q${q}i3", "label": "Notebook", "emoji": "📓", "bucket": "need" },
//     { "id": "q${q}i4", "label": "Winter Coat", "emoji": "🧥", "bucket": "need" },
//     { "id": "q${q}i5", "label": "Pencil", "emoji": "✏️", "bucket": "need" },
//     { "id": "q${q}i6", "label": "Candy", "emoji": "🍬", "bucket": "want" },
//     { "id": "q${q}i7", "label": "Toy Car", "emoji": "🚗", "bucket": "want" },
//     { "id": "q${q}i8", "label": "Video Game", "emoji": "🎮", "bucket": "want" },
//     { "id": "q${q}i9", "label": "Ice Cream", "emoji": "🍦", "bucket": "want" },
//     { "id": "q${q}i10", "label": "Sticker Pack", "emoji": "🌟", "bucket": "want" }
//   ]
// }`;
//   }

//   if (questionType === "tap-reveal") {
//     return `
// {
//   "type": "tap-reveal",
//   "scenarioTitle": "...",
//   "scenarioText": "...",
//   "walletAmount": 8,
//   "goal": "...",
//   "heroEmoji": "🧠",
//   "heroCaption": "...",
//   "question": "...",
//   "generalHint": "...",
//   "questionImagePrompt": "...",
//   "cards": [
//     { "id": "q${q}c1", "coverEmoji": "🃏", "emoji": "💡", "title": "Clue 1", "text": "..." },
//     { "id": "q${q}c2", "coverEmoji": "🃏", "emoji": "🎯", "title": "Clue 2", "text": "..." },
//     { "id": "q${q}c3", "coverEmoji": "🃏", "emoji": "✅", "title": "Clue 3", "text": "..." },
//     { "id": "q${q}c4", "coverEmoji": "🃏", "emoji": "💰", "title": "Clue 4", "text": "..." }
//   ],
//   "options": [
//     { "text": "...", "isBest": true, "effect": "..." },
//     { "text": "...", "isBest": false, "hint": "...", "effect": "..." }
//   ]
// }`;
//   }

//   return `
// {
//   "type": "scenario-choice",
//   "scenarioTitle": "...",
//   "scenarioText": "...",
//   "walletAmount": 10,
//   "goal": "...",
//   "heroEmoji": "🪙",
//   "heroCaption": "...",
//   "question": "...",
//   "generalHint": "...",
//   "questionImagePrompt": "...",
//   "options": [
//     { "text": "...", "subText": "", "emoji": "💰", "effect": "...", "isBest": true },
//     { "text": "...", "subText": "", "emoji": "🍪", "hint": "...", "effect": "...", "isBest": false },
//     { "text": "...", "subText": "", "emoji": "🧸", "hint": "...", "effect": "...", "isBest": false }
//   ]
// }`;
// }

// function buildQuestionSequence(sampleQuestions = [], fallbackType = "scenario-choice") {
//   if (!Array.isArray(sampleQuestions) || sampleQuestions.length === 0) {
//     return [normalizeQuestionType(fallbackType)];
//   }

//   return sampleQuestions.map((question) =>
//     normalizeQuestionType(question?.type || fallbackType)
//   );
// }

// function buildTypeSpecificRules(questionType) {
//   if (questionType === "scenario-choice") {
//     return `
// Type-specific rules for scenario-choice:
// - Include exactly 3 options
// - Keep option key order exactly: text, subText, emoji, hint/effect, isBest
// - subText must always be an empty string ""
// - Do not write any subText content
// - The emoji must match the option text
// - Make the three options very clear and parallel
// - When the question asks "after school", the buying options should also say "after school"
// - Wrong options must clearly sound like real alternatives a child might pick
// - Only one option can have isBest: true
// - The image prompt must show the FULL scenario from the question, not isolated objects
// - Do not generate an image that only shows one answer choice
// - Do not generate an image that only shows the goal item
// - Show the student’s real-life situation as one complete scene
// - Include all important details from the scenario naturally in the same image
// - The setting must match the scenario
// - Use a store/shop setting if the question is about buying an item
// - Prices must be attached to the correct items
// - Only include numbers directly relevant to the question
// - Do not include random or conflicting numbers
// - If the question includes current money, show it naturally in the scene
// - If the question includes a saving goal, include that goal naturally in the same scene only if relevant
// - The image alone should help a student understand the whole situation
// - Avoid floating objects, split-screen option layouts, unrelated items, and wrong backgrounds
// - Never use vague prompts like "shopping choice" or "money decision"
// - NEVER repeat the same wrong item in multiple options
// - Use different items for each wrong option
// `;
//   }

//   if (questionType === "tap-reveal") {
//     return `
// Type-specific rules for tap-reveal:
// - Include exactly 4 cards
// - Include exactly 2 options
// - Keep cards key order exactly: id, coverEmoji, emoji, title, text
// - Keep options key order exactly: text, isBest, hint/effect
// - Only one option can have isBest: true
// - Each clue should help the child reason toward the best answer
// - The image prompt must show the full scenario or learning situation, not just one object
// - Do not add random prices or thought bubbles
// - Keep wording simple for grades 4 to 6
// - Do not repeat the same spend item from earlier questions if possible
// `;
//   }

//   if (questionType === "budget-builder") {
//     return `
// Type-specific rules for budget-builder:
// - Include 4 to 5 items
// - Keep items key order exactly: id, name, price, emoji, tag
// - correctItemIds must only include ids that exist in items
// - The correct set must fit inside the budget
// - Pick practical needs before extras
// - Make the image prompt match the full scenario or main shopping situation
// - Keep wording simple for grades 4 to 6
// `;
//   }

//   return `
// Type-specific rules for drag-drop:
// - Include 8 to 10 items
// - Keep items key order exactly: id, label, emoji, bucket
// - Every item must clearly belong to need or want
// - Avoid ambiguous items
// - Use correct emojis for each label
// - Make the image prompt match the full sorting topic or scene
// - Keep wording simple for grades 4 to 6
// `;
// }

// function buildQuestionPromptBlock(questionType, sampleQuestion, index) {
//   return `
// Question ${index + 1}
// Required type: ${questionType}

// Use this sample question only as a structural and tone guide:
// ${JSON.stringify(sampleQuestion || {}, null, 2)}

// Output this exact question shape:
// ${getPromptSchema(questionType, index)}

// ${buildTypeSpecificRules(questionType)}
// `;
// }

// function buildFallbackScenarioOptions(question, lessonMemory) {
//   const walletAmount = getWalletAmount(question);
//   const goalItem = detectGoalItem(question) || pickDynamicGoalItem(question, lessonMemory);
//   const amountText = walletAmount != null ? normalizeCurrencyText(walletAmount) : "your money";
//   const [item1, item2] = pickTwoDifferentDynamicSpendItems(question, lessonMemory);

//   return [
//     {
//       text: goalItem
//         ? `Save ${amountText} for the ${goalItem}`
//         : `Save ${amountText} for your goal`,
//       subText: "",
//       emoji: "💰",
//       hint: "",
//       effect: buildScenarioChoiceEffect("save", question, true),
//       isBest: true
//     },
//     {
//       text: `Buy ${item1} after school`,
//       subText: "",
//       emoji: pickScenarioChoiceEmoji(item1, false, 1),
//       hint: buildScenarioChoiceHint(item1, question),
//       effect: buildScenarioChoiceEffect(item1, question, false),
//       isBest: false
//     },
//     {
//       text: `Buy ${item2} after school`,
//       subText: "",
//       emoji: pickScenarioChoiceEmoji(item2, false, 2),
//       hint: buildScenarioChoiceHint(item2, question),
//       effect: buildScenarioChoiceEffect(item2, question, false),
//       isBest: false
//     }
//   ];
// }

// function ensureUniqueScenarioOptions(options, question, lessonMemory) {
//   const seen = new Set();
//   const result = [];

//   for (const option of options) {
//     const key = normalizeItemKey(option.text);

//     if (!key || seen.has(key) || lessonMemory.usedOptionTexts.has(key)) {
//       continue;
//     }

//     seen.add(key);
//     lessonMemory.usedOptionTexts.add(key);
//     result.push(option);
//   }

//   while (result.length < 3) {
//     const fallbackOptions = buildFallbackScenarioOptions(question, lessonMemory);
//     const candidate = fallbackOptions.find((opt) => {
//       const key = normalizeItemKey(opt.text);
//       return key && !seen.has(key) && !lessonMemory.usedOptionTexts.has(key);
//     });

//     if (!candidate) break;

//     const key = normalizeItemKey(candidate.text);
//     seen.add(key);
//     lessonMemory.usedOptionTexts.add(key);
//     result.push(candidate);
//   }

//   return result.slice(0, 3);
// }

// function ensureScenarioChoice(question, index, lessonMemory) {
//   const options = Array.isArray(question.options) ? question.options.slice(0, 3) : [];
//   const fallbackOptions = buildFallbackScenarioOptions(question, lessonMemory);

//   const normalizedOptions = options.map((option, optionIndex) => {
//     const isBest = Boolean(option.isBest);
//     const rawText =
//       option.text ||
//       fallbackOptions[optionIndex]?.text ||
//       `Option ${optionIndex + 1}`;
//     const text = cleanScenarioChoiceOptionText(rawText, question, isBest);

//     return {
//       text,
//       subText: "",
//       emoji: option.emoji || pickScenarioChoiceEmoji(text, isBest, optionIndex),
//       hint: option.hint || "",
//       effect: option.effect || "",
//       isBest
//     };
//   });

//   while (normalizedOptions.length < 3) {
//     const fallback = fallbackOptions[normalizedOptions.length];
//     normalizedOptions.push({ ...fallback });
//   }

//   let uniqueOptions = ensureUniqueScenarioOptions(normalizedOptions, question, lessonMemory);

//   if (uniqueOptions.length < 3) {
//     const extraFallbacks = buildFallbackScenarioOptions(question, lessonMemory);
//     for (const fallback of extraFallbacks) {
//       const key = normalizeItemKey(fallback.text);
//       if (!uniqueOptions.find((opt) => normalizeItemKey(opt.text) === key)) {
//         uniqueOptions.push(fallback);
//       }
//       if (uniqueOptions.length === 3) break;
//     }
//   }

//   let bestIndex = uniqueOptions.findIndex((option) => option.isBest);
//   if (bestIndex === -1) {
//     uniqueOptions[0].isBest = true;
//     bestIndex = 0;
//   } else {
//     uniqueOptions.forEach((option, i) => {
//       option.isBest = i === bestIndex;
//     });
//   }

//   uniqueOptions.forEach((option, i) => {
//     option.text = cleanScenarioChoiceOptionText(option.text, question, option.isBest);
//     option.subText = "";
//     option.emoji = pickScenarioChoiceEmoji(option.text, option.isBest, i);

//     if (!option.isBest && !option.hint) {
//       option.hint = buildScenarioChoiceHint(option.text, question);
//     }

//     if (!option.effect) {
//       option.effect = buildScenarioChoiceEffect(
//         option.text,
//         question,
//         option.isBest
//       );
//     }
//   });

//   return {
//     type: "scenario-choice",
//     scenarioTitle: question.scenarioTitle || `Question ${index + 1}`,
//     scenarioText: question.scenarioText || "",
//     walletAmount:
//       typeof question.walletAmount === "number" ? question.walletAmount : 10,
//     goal: question.goal || "",
//     heroEmoji: question.heroEmoji || "💡",
//     heroCaption: question.heroCaption || "",
//     question: question.question || "",
//     generalHint:
//       question.generalHint ||
//       "Think about which choice helps your goal the most.",
//     questionImagePrompt: buildExactImagePromptFromQuestion(question, lessonMemory),
//     options: uniqueOptions.slice(0, 3)
//   };
// }

// function ensureTapReveal(question, index, lessonMemory) {
//   const cards = Array.isArray(question.cards) ? question.cards.slice(0, 4) : [];
//   const options = Array.isArray(question.options) ? question.options.slice(0, 2) : [];
//   const fallbackOptions = buildTapRevealOptions(question, lessonMemory);

//   const normalizedCards = cards.map((card, cardIndex) => ({
//     id: card.id || `q${index + 1}c${cardIndex + 1}`,
//     coverEmoji: card.coverEmoji || "🃏",
//     emoji: card.emoji || pickCardEmoji(card.title, card.text, cardIndex),
//     title: card.title || `Clue ${cardIndex + 1}`,
//     text: card.text || buildTapRevealClueText(question, cardIndex, lessonMemory)
//   }));

//   while (normalizedCards.length < 4) {
//     const cardIndex = normalizedCards.length;
//     const title = `Clue ${cardIndex + 1}`;
//     const text = buildTapRevealClueText(question, cardIndex, lessonMemory);

//     normalizedCards.push({
//       id: `q${index + 1}c${cardIndex + 1}`,
//       coverEmoji: "🃏",
//       emoji: pickCardEmoji(title, text, cardIndex),
//       title,
//       text
//     });
//   }

//   const normalizedOptions = options.map((option, optionIndex) => ({
//     text: option.text || fallbackOptions[optionIndex].text,
//     isBest: Boolean(option.isBest),
//     hint: option.hint || "",
//     effect: option.effect || ""
//   }));

//   while (normalizedOptions.length < 2) {
//     normalizedOptions.push({ ...fallbackOptions[normalizedOptions.length] });
//   }

//   const bestIndex = normalizedOptions.findIndex((option) => option.isBest);
//   if (bestIndex === -1) {
//     normalizedOptions[0].isBest = true;
//   } else {
//     normalizedOptions.forEach((option, i) => {
//       option.isBest = i === bestIndex;
//     });
//   }

//   normalizedOptions.forEach((option, i) => {
//     const fallback = fallbackOptions[i];
//     if (!option.text || /^option\s\d+$/i.test(option.text.trim())) {
//       option.text = fallback.text;
//     }
//     if (!option.effect) {
//       option.effect = fallback.effect;
//     }
//     if (!option.isBest && !option.hint) {
//       option.hint = fallback.hint;
//     }
//   });

//   return {
//     type: "tap-reveal",
//     scenarioTitle: question.scenarioTitle || `Question ${index + 1}`,
//     scenarioText: question.scenarioText || "",
//     walletAmount:
//       typeof question.walletAmount === "number"
//         ? question.walletAmount
//         : undefined,
//     goal: question.goal || "",
//     heroEmoji: question.heroEmoji || "💡",
//     heroCaption: question.heroCaption || "",
//     question: question.question || "",
//     generalHint:
//       question.generalHint ||
//       "Use the clues to think about the smartest choice.",
//     questionImagePrompt: buildExactImagePromptFromQuestion(question, lessonMemory),
//     cards: normalizedCards,
//     options: normalizedOptions
//   };
// }

// function ensureBudgetBuilder(question, index, lessonMemory) {
//   const items = Array.isArray(question.items) ? question.items.slice(0, 5) : [];

//   const normalizedItems = items.map((item, itemIndex) => ({
//     id: item.id || `q${index + 1}i${itemIndex + 1}`,
//     name: item.name || `Item ${itemIndex + 1}`,
//     price: Number(item.price || 0),
//     emoji: item.emoji || pickItemEmoji(item.name),
//     tag: item.tag || ""
//   }));

//   const validIds = new Set(normalizedItems.map((item) => item.id));
//   let correctItemIds = Array.isArray(question.correctItemIds)
//     ? question.correctItemIds.filter((id) => validIds.has(id))
//     : [];

//   if (correctItemIds.length === 0 && normalizedItems.length > 0) {
//     const sorted = [...normalizedItems].sort((a, b) => a.price - b.price);
//     let running = 0;
//     const budget = typeof question.budget === "number" ? question.budget : 10;
//     correctItemIds = [];

//     for (const item of sorted) {
//       if (running + item.price <= budget) {
//         correctItemIds.push(item.id);
//         running += item.price;
//       }
//     }
//   }

//   return {
//     type: "budget-builder",
//     scenarioTitle: question.scenarioTitle || `Question ${index + 1}`,
//     scenarioText: question.scenarioText || "",
//     budget: typeof question.budget === "number" ? question.budget : 10,
//     goal: question.goal || "",
//     heroEmoji: question.heroEmoji || "💡",
//     heroCaption: question.heroCaption || "",
//     question: question.question || "",
//     generalHint:
//       question.generalHint ||
//       "Choose the items that fit the budget and help the goal.",
//     successMessage:
//       question.successMessage ||
//       "Awesome! You stayed within budget and made a smart plan.",
//     showAnswerTip:
//       typeof question.showAnswerTip === "boolean"
//         ? question.showAnswerTip
//         : true,
//     questionImagePrompt: buildExactImagePromptFromQuestion(question, lessonMemory),
//     items: normalizedItems,
//     correctItemIds
//   };
// }

// function ensureDragDrop(question, index, lessonMemory) {
//   const items = Array.isArray(question.items) ? question.items.slice(0, 10) : [];

//   const normalizedItems = items.map((item, itemIndex) => ({
//     id: item.id || `q${index + 1}i${itemIndex + 1}`,
//     label: item.label || item.name || `Item ${itemIndex + 1}`,
//     emoji: item.emoji || pickItemEmoji(item.label || item.name),
//     bucket: item.bucket === "need" ? "need" : "want"
//   }));

//   return {
//     type: "drag-drop",
//     scenarioTitle: question.scenarioTitle || `Question ${index + 1}`,
//     scenarioText: question.scenarioText || "",
//     heroEmoji: question.heroEmoji || "💡",
//     heroCaption: question.heroCaption || "",
//     question: question.question || "",
//     generalHint:
//       question.generalHint ||
//       "Think about which items are needs and which are wants.",
//     successMessage:
//       question.successMessage || "Amazing! You sorted every item correctly.",
//     questionImagePrompt: buildExactImagePromptFromQuestion(question, lessonMemory),
//     items: normalizedItems
//   };
// }

// function normalizeQuestionByType(question, expectedType, index, lessonMemory) {
//   const type = normalizeQuestionType(expectedType);

//   if (type === "budget-builder") return ensureBudgetBuilder(question, index, lessonMemory);
//   if (type === "tap-reveal") return ensureTapReveal(question, index, lessonMemory);
//   if (type === "drag-drop") return ensureDragDrop(question, index, lessonMemory);
//   return ensureScenarioChoice(question, index, lessonMemory);
// }

// async function generateLessonStructure(payload) {
//   const sampleQuestions = Array.isArray(payload.sampleQuestions)
//     ? payload.sampleQuestions
//     : [];

//   const fallbackType =
//     payload.questionType ||
//     payload.lessonType ||
//     sampleQuestions?.[0]?.type ||
//     "scenario-choice";

//   const questionSequence = buildQuestionSequence(sampleQuestions, fallbackType);
//   const previousVariation = getPreviousLessonVariation(payload);

//   const sequenceDescription = questionSequence
//     .map((type, index) => `${index + 1}. ${type}`)
//     .join("\n");

//   const promptQuestionBlocks = questionSequence
//     .map((type, index) =>
//       buildQuestionPromptBlock(
//         type,
//         sampleQuestions[index] || sampleQuestions[0] || {},
//         index
//       )
//     )
//     .join("\n");

//   const res = await groq.chat.completions.create({
//     model: "llama-3.1-8b-instant",
//     temperature: 0.8,
//     top_p: 0.9,
//     messages: [
//       {
//         role: "system",
//         content: `
// You generate NEW lesson questions for a children's finance education app.

// Return valid JSON only.
// No markdown.
// No explanation.

// The response must be a JSON object in this exact top-level format:
// {
//   "questions": [ ... ]
// }

// Use the provided sampleQuestions array as the strict source of truth for:
// - number of questions
// - order of questions
// - type of each question
// - field names
// - field order
// - tone
// - nesting
// - shape of each question object

// Important:
// - lessonStruct.js is only a template for structure and style.
// - You must generate NEW content, not copy the sample content.
// - You must preserve the exact question type order from sampleQuestions.
// - Do not turn all questions into the same type.
// - If question 1 in sampleQuestions is scenario-choice and question 2 is tap-reveal, then your output must keep that exact order.
// - Make this version noticeably different from earlier versions of the same lesson.
// - Change the scenario, item names, money amounts, goals, option wording, clue wording.
// - Do not repeat the same exact snack, toy, school item, or savings goal across all questions unless the lesson absolutely requires it.
// - If the same lesson is generated again, it must feel like a fresh variation, not a copy.
// - Keep wording simple for grades 4 to 6.
// - Keep text short.
// - For scenario-choice, subText must always be "".
// - Do not include markdown fences.
// - Do not include commentary before or after JSON.

// Required question sequence:
// ${sequenceDescription}

// ${promptQuestionBlocks}

// Variation request id: ${payload.variationId || "none"}

// Previously generated version for this lesson:
// ${JSON.stringify(previousVariation || [], null, 2)}

// Avoid repeating that previous version.
//         `
//       },
//       {
//         role: "user",
//         content: JSON.stringify({
//           title: payload.title,
//           lessonId: payload.lessonId,
//           grade: payload.grade,
//           unit: payload.unit,
//           questionType: payload.questionType,
//           lessonType: payload.lessonType,
//           tips: payload.tips,
//           context: payload.context,
//           sampleQuestions,
//           variationId: payload.variationId || null
//         })
//       }
//     ]
//   });

//   const parsed = safeJsonParse(res.choices[0].message.content);

//   if (!Array.isArray(parsed?.questions) || parsed.questions.length === 0) {
//     throw new Error("Model did not return valid lesson questions JSON.");
//   }

//   const output = [];
//   const total = questionSequence.length;
//   const lessonMemory = createLessonMemory();

//   for (let i = 0; i < total; i += 1) {
//     const expectedType = questionSequence[i];
//     const question = parsed.questions[i] || {};
//     output.push(normalizeQuestionByType(question, expectedType, i, lessonMemory));
//   }

//   rememberLessonVariation(payload, output);
//   return output;
// }

// async function attachQuestionImages(questions) {
//   const output = [];
//   const lessonMemory = createLessonMemory();

//   for (const question of questions) {
//     const nextQuestion = { ...question };
//     const finalPrompt = buildExactImagePromptFromQuestion(question, lessonMemory);

//     if (finalPrompt) {
//       nextQuestion.questionImagePrompt = finalPrompt;
//     }

//     if (finalPrompt) {
//       try {
//         const questionImg = await generateImageBase64(finalPrompt, {
//           width: 1200,
//           height: 500
//         });
//         nextQuestion.images = [{ questionImg }];
//       } catch (error) {
//         console.error("Question image generation failed:", error.message);
//       }
//     }

//     output.push(nextQuestion);
//   }

//   return output;
// }

// app.get("/api/health", (_req, res) => {
//   res.json({ ok: true });
// });

// app.post("/api/generate-lesson", async (req, res) => {
//   try {
//     const payload = req.body || {};

//     if (!payload.title && !payload.lessonId) {
//       return res.status(400).json({ error: "Missing lesson payload." });
//     }

//     payload.variationId =
//       payload.variationId ||
//       `${payload.lessonId || payload.title || "lesson"}-${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2, 8)}`;

//     const structuredQuestions = await generateLessonStructure(payload);
//     const questionsWithImages = await attachQuestionImages(structuredQuestions);

//     return res.json({
//       lessonId: payload.lessonId,
//       title: payload.title,
//       questions: questionsWithImages
//     });
//   } catch (error) {
//     const message = error?.message || "Lesson generation failed.";
//     console.error("Lesson generation failed:", message);

//     if (message.includes("rate_limit_exceeded") || message.includes("429")) {
//       return res.status(429).json({
//         error:
//           "AI lesson generation is temporarily unavailable because the Groq limit was reached."
//       });
//     }

//     return res.status(500).json({
//       error: message
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Lesson generator API running on http://localhost:${PORT}`);
// });
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

function normalizeDragDropBucketValue(rawBucket, bucketConfig, index = 0) {
  const value = String(rawBucket || "").trim().toLowerCase();

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
    "helps-saving",
    "save",
    "saving",
    "good",
    "smart"
  ]);

  const rightAliases = new Set([
    rightId,
    "want",
    "wants",
    "extra",
    "fun",
    "hurt",
    "hurts",
    "hurts-saving",
    "spend",
    "bad",
    "not-saving"
  ]);

  if (leftAliases.has(value)) return leftId;
  if (rightAliases.has(value)) return rightId;

  return index % 2 === 0 ? leftId : rightId;
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

function pickItemEmoji(label) {
  const value = String(label || "").toLowerCase();

  if (containsAny(value, ["blanket"])) return "🛏️";
  if (containsAny(value, ["sandwich"])) return "🥪";
  if (containsAny(value, ["ball", "soccer"])) return "⚽";
  if (containsAny(value, ["basket"])) return "🧺";
  if (containsAny(value, ["fruit", "watermelon"])) return "🍉";
  if (containsAny(value, ["toy car"])) return "🚗";
  if (containsAny(value, ["water bottle"])) return "💧";
  if (containsAny(value, ["notebook"])) return "📓";
  if (containsAny(value, ["pencil"])) return "✏️";
  if (containsAny(value, ["markers"])) return "🖍️";
  if (containsAny(value, ["eraser"])) return "🩹";
  if (containsAny(value, ["glue"])) return "🧴";
  if (containsAny(value, ["crayons"])) return "🖍️";
  if (containsAny(value, ["folder"])) return "📁";
  if (containsAny(value, ["cookie"])) return "🍪";
  if (containsAny(value, ["chips"])) return "🥔";
  if (containsAny(value, ["ice cream"])) return "🍦";
  if (containsAny(value, ["juice"])) return "🧃";
  if (containsAny(value, ["muffin"])) return "🧁";
  if (containsAny(value, ["granola"])) return "🥨";
  if (containsAny(value, ["popcorn"])) return "🍿";
  if (containsAny(value, ["yogurt"])) return "🥣";
  if (containsAny(value, ["book"])) return "📚";
  if (containsAny(value, ["bike", "bicycle"])) return "🚲";
  if (containsAny(value, ["tablet"])) return "📱";
  if (containsAny(value, ["backpack"])) return "🎒";
  if (containsAny(value, ["lunch"])) return "🍽️";
  if (containsAny(value, ["headphones"])) return "🎧";
  if (containsAny(value, ["art kit"])) return "🎨";
  if (containsAny(value, ["lunch box"])) return "🍱";
  if (containsAny(value, ["toy"])) return "🧸";
  if (containsAny(value, ["canvas"])) return "🖼️";
  if (containsAny(value, ["paint"])) return "🎨";
  if (containsAny(value, ["brush"])) return "🖌️";
  if (containsAny(value, ["movie ticket"])) return "🎬";
  if (containsAny(value, ["sticker"])) return "✨";

  return "📦";
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
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();

  if (containsAny(combined, ["art", "paint", "canvas", "project"])) {
    return {
      scenarioTitle: "Art Supply Shopping",
      scenarioText:
        "You have $15. You want to buy supplies for a class project and still save some money.",
      goal: "Save some money for later",
      question: "Choose the best items to buy.",
      generalHint: "Pick needs first and save the rest.",
      successMessage:
        "Great job! You picked the important supplies and still saved some money.",
      budget: 15,
      items: [
        { id: `q${index + 1}i1`, name: "Canvas", price: 5, emoji: "🖼️", tag: "need" },
        { id: `q${index + 1}i2`, name: "Paint Set", price: 7, emoji: "🎨", tag: "need" },
        { id: `q${index + 1}i3`, name: "Brushes", price: 4, emoji: "🖌️", tag: "helpful" },
        { id: `q${index + 1}i4`, name: "Glitter Stickers", price: 3, emoji: "✨", tag: "want" },
        { id: `q${index + 1}i5`, name: "Candy Bar", price: 2, emoji: "🍫", tag: "want" }
      ],
      correctItemIds: [`q${index + 1}i1`, `q${index + 1}i2`]
    };
  }

  return {
    scenarioTitle: "School Supply Shopping",
    scenarioText:
      "You have $15. You want to buy supplies for school and still save some money.",
    goal: "Save some money for later",
    question: "Choose the best items to buy.",
    generalHint: "Pick needs first and save the rest.",
    successMessage:
      "Great job! You picked the important school supplies and still saved some money.",
    budget: 15,
    items: [
      { id: `q${index + 1}i1`, name: "Notebook", price: 4, emoji: "📓", tag: "need" },
      { id: `q${index + 1}i2`, name: "Pencils", price: 2, emoji: "✏️", tag: "need" },
      { id: `q${index + 1}i3`, name: "Markers", price: 3, emoji: "🖍️", tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Sticker Pack", price: 3, emoji: "✨", tag: "want" },
      { id: `q${index + 1}i5`, name: "Toy Keychain", price: 2, emoji: "🧸", tag: "want" }
    ],
    correctItemIds: [`q${index + 1}i1`, `q${index + 1}i2`, `q${index + 1}i3`]
  };
}

function rebalanceBudgetItems(rawItems, question, index) {
  let normalizedItems = (rawItems || []).map((item, itemIndex) => {
    const inferredTag = inferBudgetTagFromItemName(item.name || item.label, question);
    const normalizedTag = normalizeBudgetTag(item.tag) || inferredTag;

    return {
      id: item.id || `q${index + 1}i${itemIndex + 1}`,
      name: sanitizeHintEmojis(item.name || item.label || `Item ${itemIndex + 1}`),
      price: Math.max(0, Number(item.price || 0)),
      emoji: sanitizeHintEmojis(item.emoji || pickItemEmoji(item.name || item.label)),
      tag: normalizedTag
    };
  });

  normalizedItems = ensureUniqueBudgetItems(
    normalizedItems.filter(
      (item) => item.name && Number.isFinite(item.price) && item.price > 0
    )
  );

  const needCount = normalizedItems.filter((item) => item.tag === "need").length;
  const helpfulCount = normalizedItems.filter((item) => item.tag === "helpful").length;
  const wantCount = normalizedItems.filter((item) => item.tag === "want").length;

  const hasEnoughItems = normalizedItems.length >= 4 && normalizedItems.length <= 5;
  const hasReliableMix = needCount >= 1 && helpfulCount >= 1 && wantCount >= 1;

  if (!hasEnoughItems || !hasReliableMix) {
    return buildReliableBudgetFallback(question, index).items;
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

  const allNeedItems = items.filter((item) => item.tag === "need");
  const allNeedIds = new Set(allNeedItems.map((item) => item.id));
  const selectedIds = new Set(ids);

  const coveredAllNeeds =
    allNeedItems.length > 0 &&
    allNeedItems.every((item) => selectedIds.has(item.id));

  const savingGoal = shouldBudgetBuilderLeaveSavings(question);

  const valid =
    total <= budget &&
    leftover >= 0 &&
    wants === 0 &&
    leftover >= savingsTarget &&
    needs >= 1;

  if (!valid) {
    return {
      valid: false,
      score: -1,
      total,
      leftover,
      needs,
      helpful,
      wants,
      coveredAllNeeds
    };
  }

  let score = 0;

  // Highest priority: cover all needs
  if (coveredAllNeeds) {
    score += 10000;
  }

  // Needs matter most
  score += needs * 1000;

  // Helpful items matter only after needs are covered
  if (!savingGoal || coveredAllNeeds) {
    score += helpful * 100;
  }

  // For save-money goals, reward saving more once all needs are covered
  if (savingGoal && coveredAllNeeds) {
    score += leftover * 50;
  } else {
    // For non-saving goals, spending a bit more on helpful items is okay
    score += total;
  }

  return {
    valid: true,
    score,
    total,
    leftover,
    needs,
    helpful,
    wants,
    coveredAllNeeds
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
      (meta.score === bestMeta.score && meta.leftover > bestMeta.leftover)
    ) {
      bestMeta = meta;
      bestIds = ids;
    }
  }

  if (bestIds.length > 0) {
    return bestIds;
  }

  const fallbackNeedIds = validItems
    .filter((item) => item.tag === "need")
    .sort((a, b) => a.price - b.price)
    .reduce(
      (acc, item) => {
        if (acc.total + item.price <= budget) {
          acc.ids.push(item.id);
          acc.total += item.price;
        }
        return acc;
      },
      { ids: [], total: 0 }
    ).ids;

  return fallbackNeedIds;
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
  "heroEmoji": "🛍️",
  "heroCaption": "...",
  "question": "...",
  "generalHint": "...",
  "successMessage": "...",
  "questionImagePrompt": "...",
  "bucketConfig": {
    "left": { "id": "need", "title": "Needs", "subtitle": "Must-have items" },
    "right": { "id": "want", "title": "Wants", "subtitle": "Fun extras" }
  },
  "items": [
    { "id": "q${q}i1", "label": "Water Bottle", "emoji": "💧", "bucket": "need" },
    { "id": "q${q}i2", "label": "Lunch", "emoji": "🥪", "bucket": "need" },
    { "id": "q${q}i3", "label": "Notebook", "emoji": "📓", "bucket": "need" },
    { "id": "q${q}i4", "label": "Pencils", "emoji": "✏️", "bucket": "need" },
    { "id": "q${q}i5", "label": "Backpack", "emoji": "🎒", "bucket": "need" },
    { "id": "q${q}i6", "label": "Glue", "emoji": "🧴", "bucket": "need" },
    { "id": "q${q}i7", "label": "Candy", "emoji": "🍬", "bucket": "want" },
    { "id": "q${q}i8", "label": "Toy Car", "emoji": "🚗", "bucket": "want" },
    { "id": "q${q}i9", "label": "Sticker Pack", "emoji": "✨", "bucket": "want" },
    { "id": "q${q}i10", "label": "Cookie", "emoji": "🍪", "bucket": "want" }
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
- Do not tag every item as helpful
- Do not generate a budget-builder question with no clear best answer
- Do not make all items treats, entertainment, or equally optional choices
- Build a reliable needs-first decision
- correctItemIds must only include ids that exist in items
- The correct set must fit inside the budget
- The correct answer must prioritize items tagged as "need"
- Helpful items can be chosen after needs if they still support the goal
- Wants should not be in the correct answer when a better need/helpful choice exists
- If the scenario says to save money, the correct answer should leave some money unspent when possible
- Do not force spending the full budget
- Do not choose cheaper wants over more important needs
- The goal is smart decision making, not just lowest total price
- If multiple items are tagged as "need", do not make the lesson feel unfair
- Pick practical needs before extras
- Make the image prompt match the full scenario or main shopping situation
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
- Drag-drop questions do NOT always have to be needs vs wants
- The bucket meaning must match the lesson concept
- You may change the scenario concept completely from the sample
- Use lessonStruct.js only as a format and type guide, not a concept lock
- Example valid bucket pairs:
  - Needs / Wants
  - Helps Saving / Hurts Saving
  - Good Choice / Poor Choice
  - School Need / Extra Item
- Every item must clearly belong to one of the two buckets
- Avoid ambiguous items
- Use correct emojis for each label
- Make the image prompt match the full sorting topic or scene
- Keep wording simple for grades 4 to 6
- Keep the two buckets reasonably balanced
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
    correctItemIds = fallback.correctItemIds;
  }

  const finalQuestion = {
    type: "budget-builder",
    scenarioTitle: sanitizeHintEmojis(
      question.scenarioTitle ||
        fallback.scenarioTitle ||
        `Question ${index + 1}`
    ),
    scenarioText: sanitizeHintEmojis(
      question.scenarioText || fallback.scenarioText || ""
    ),
    budget,
    goal: sanitizeHintEmojis(question.goal || fallback.goal || ""),
    heroEmoji: sanitizeHintEmojis(question.heroEmoji || "💡"),
    heroCaption: sanitizeHintEmojis(question.heroCaption || ""),
    question: sanitizeHintEmojis(question.question || fallback.question || ""),
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
function buildFallbackDragDropItems(bucketConfig, index) {
  const leftId = bucketConfig.left.id;
  const rightId = bucketConfig.right.id;

  const leftDefaults = [
    { label: "Water Bottle", emoji: "💧", bucket: leftId },
    { label: "Lunch", emoji: "🥪", bucket: leftId },
    { label: "Notebook", emoji: "📓", bucket: leftId },
    { label: "Pencils", emoji: "✏️", bucket: leftId },
    { label: "Backpack", emoji: "🎒", bucket: leftId },
    { label: "Glue", emoji: "🧴", bucket: leftId }
  ];

  const rightDefaults = [
    { label: "Candy", emoji: "🍬", bucket: rightId },
    { label: "Toy Car", emoji: "🚗", bucket: rightId },
    { label: "Sticker Pack", emoji: "✨", bucket: rightId },
    { label: "Cookie", emoji: "🍪", bucket: rightId },
    { label: "Movie Ticket", emoji: "🎬", bucket: rightId },
    { label: "Ice Cream", emoji: "🍦", bucket: rightId }
  ];

  return [...leftDefaults, ...rightDefaults].map((item, itemIndex) => ({
    id: `q${index + 1}i${itemIndex + 1}`,
    label: item.label,
    emoji: item.emoji,
    bucket: item.bucket
  }));
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

  const rawItems = Array.isArray(question.items) ? question.items : [];

  let normalizedItems = rawItems.map((item, itemIndex) => ({
    id: item.id || `q${index + 1}i${itemIndex + 1}`,
    label: sanitizeHintEmojis(item.label || item.name || `Item ${itemIndex + 1}`),
    emoji: sanitizeHintEmojis(item.emoji || pickItemEmoji(item.label || item.name)),
    bucket: normalizeDragDropBucketValue(item.bucket, bucketConfig, itemIndex)
  }));

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

  if (
    normalizedItems.length < 10 ||
    leftCount < 4 ||
    rightCount < 4
  ) {
    normalizedItems = buildFallbackDragDropItems(bucketConfig, index);
  }

  if (normalizedItems.length > 12) {
    normalizedItems = normalizedItems.slice(0, 12);
  }

  while (normalizedItems.length < 10) {
    const nextIndex = normalizedItems.length;
    const useLeft =
      normalizedItems.filter((item) => item.bucket === bucketConfig.left.id).length <=
      normalizedItems.filter((item) => item.bucket === bucketConfig.right.id).length;

    normalizedItems.push({
      id: `q${index + 1}i${nextIndex + 1}`,
      label: useLeft ? `Need Item ${nextIndex + 1}` : `Want Item ${nextIndex + 1}`,
      emoji: useLeft ? "📦" : "🎁",
      bucket: useLeft ? bucketConfig.left.id : bucketConfig.right.id
    });
  }

  const finalQuestion = {
    type: "drag-drop",
    scenarioTitle: question.scenarioTitle || `Question ${index + 1}`,
    scenarioText: question.scenarioText || "",
    heroEmoji: question.heroEmoji || "💡",
    heroCaption: question.heroCaption || "",
    question: question.question || "",
    generalHint: question.generalHint || "Sort each card into the correct group.",
    successMessage:
      question.successMessage || "Amazing! You sorted every item correctly.",
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