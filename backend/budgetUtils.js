import {
  containsAny,
  extractScenarioKeywords,
  pickItemEmoji,
  sanitizeHintEmojis
} from "./helpers.js";

export function normalizeBudgetTag(tag) {
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

export function inferBudgetTagFromItemName(name, question = {}) {
  const value = String(name || "").toLowerCase();
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();

  const isPartySnackQuestion = containsAny(combined, [
    "party",
    "birthday",
    "treats",
    "snack budget",
    "snacks to share",
    "healthy snacks to share",
    "pick snacks for a party"
  ]);

  if (isPartySnackQuestion) {
    if (
      containsAny(value, [
        "juice",
        "juice box",
        "juice boxes",
        "water bottle",
        "fruit",
        "apple",
        "apple slices",
        "banana",
        "orange",
        "yogurt"
      ])
    ) {
      return "need";
    }

    if (
      containsAny(value, [
        "sandwich",
        "granola",
        "granola bar",
        "crackers",
        "trail mix",
        "popcorn",
        "cupcake",
        "cupcakes",
        "muffin",
        "muffins"
      ])
    ) {
      return "helpful";
    }

    if (
      containsAny(value, [
        "candy",
        "cookie",
        "cookies",
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
      "pet food",
      "water bowl",
      "leash",
      "collar",
      "pet bed"
    ])
  ) {
    return "need";
  }

  if (
    containsAny(value, [
      "pet brush",
      "brush",
      "treats",
      "pet shampoo"
    ])
  ) {
    return "helpful";
  }

  if (
    containsAny(value, [
      "pet toy",
      "fancy collar",
      "costume"
    ])
  ) {
    return "want";
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

  if (containsAny(combined, ["gift", "gifts", "present", "birthday", "friends"])) {
    return "want";
  }

  if (containsAny(combined, ["project", "school", "class", "supplies", "art"])) {
    return "helpful";
  }

  return "helpful";
}

export function shouldBudgetBuilderLeaveSavings(question) {
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

export function getBudgetSavingsTarget(question, budget) {
  if (!Number.isFinite(budget) || budget <= 0) return 0;
  if (!shouldBudgetBuilderLeaveSavings(question)) return 0;

  if (budget <= 5) return 1;
  if (budget <= 10) return 1;
  return 2;
}

export function getBudgetTagPriority(tag) {
  const normalized = normalizeBudgetTag(tag);
  if (normalized === "need") return 3;
  if (normalized === "helpful") return 2;
  return 0;
}

export function ensureUniqueBudgetItems(items) {
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

function pickFromPool(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function buildReliableBudgetFallback(question, index) {
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
    containsAny(combined, [
      "gift",
      "gifts",
      "present",
      "birthday",
      "friends"
    ])
  ) {
    items = [
      { id: `q${index + 1}i1`, name: "Friendship Card", price: 3, tag: "helpful" },
      { id: `q${index + 1}i2`, name: "Small Gift", price: 5, tag: "want" },
      { id: `q${index + 1}i3`, name: "Gift Bag", price: 2, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Sticker Sheet", price: 2, tag: "want" },
      { id: `q${index + 1}i5`, name: "Toy Keychain", price: 4, tag: "want" }
    ];
  } else if (
    matched.includes("pets") ||
    containsAny(combined, [
      "pet",
      "pet care",
      "pet supplies",
      "pet's needs",
      "dog",
      "cat",
      "pet food",
      "water bowl",
      "leash",
      "collar",
      "pet bed"
    ])
  ) {
    items = [
      { id: `q${index + 1}i1`, name: "Pet Food", price: 8, tag: "need" },
      { id: `q${index + 1}i2`, name: "Water Bowl", price: 4, tag: "need" },
      { id: `q${index + 1}i3`, name: "Leash", price: 5, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Pet Toy", price: 3, tag: "want" },
      { id: `q${index + 1}i5`, name: "Fancy Collar", price: 6, tag: "want" }
    ];
  } else if (
    matched.includes("snacks") ||
    containsAny(combined, [
      "party",
      "birthday party",
      "birthday party treats",
      "party treats",
      "snacks to share",
      "healthy snacks to share"
    ])
  ) {
    const needPool = [
      { name: "Juice Boxes", price: 4, tag: "need" },
      { name: "Fruit Cups", price: 5, tag: "need" },
      { name: "Water Bottles", price: 3, tag: "need" }
    ];

    const helpfulPool = [
      { name: "Popcorn Bag", price: 3, tag: "helpful" },
      { name: "Mini Muffins", price: 4, tag: "helpful" },
      { name: "Crackers", price: 3, tag: "helpful" }
    ];

    const wantPool = [
      { name: "Cupcakes", price: 5, tag: "want" },
      { name: "Party Candy", price: 2, tag: "want" },
      { name: "Chocolate Cookies", price: 4, tag: "want" }
    ];

    const selected = [
      ...pickFromPool(needPool, 2),
      ...pickFromPool(helpfulPool, 1),
      ...pickFromPool(wantPool, 2)
    ];

    items = selected.map((item, itemIndex) => ({
      id: `q${index + 1}i${itemIndex + 1}`,
      ...item
    }));
  } else if (matched.includes("art")) {
    items = [
      { id: `q${index + 1}i1`, name: "Canvas", price: 5, tag: "need" },
      { id: `q${index + 1}i2`, name: "Paint Set", price: 7, tag: "need" },
      { id: `q${index + 1}i3`, name: "Brushes", price: 4, tag: "helpful" },
      { id: `q${index + 1}i4`, name: "Glitter", price: 3, tag: "want" },
      { id: `q${index + 1}i5`, name: "Sticker Pack", price: 2, tag: "want" }
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
      { id: `q${index + 1}i4`, name: "Sticker Pack", price: 2, tag: "want" },
      { id: `q${index + 1}i5`, name: "Candy", price: 2, tag: "want" }
    ];
  } else if (matched.includes("reading")) {
    items = [
      { id: `q${index + 1}i1`, name: "Book", price: 6, tag: "need" },
      { id: `q${index + 1}i2`, name: "Notebook", price: 3, tag: "need" },
      { id: `q${index + 1}i3`, name: "Bookmark", price: 2, tag: "helpful" },
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

export function rebalanceBudgetItems(rawItems, question, index) {
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();

  const itemMatchesBudgetScenario = (name) => {
    const value = String(name || "").toLowerCase();

    const isMovieOrGame =
      containsAny(combined, ["movie", "game night", "family night"]);
    const isArt =
      containsAny(combined, ["art", "craft", "poster", "project", "paint"]);
    const isSchool =
      containsAny(combined, ["school", "class", "backpack", "notebook"]);
    const isPet =
      containsAny(combined, ["pet", "dog", "cat"]);
    const isFood =
      containsAny(combined, ["snack", "lunch", "food", "treat", "party"]);

    if (isMovieOrGame) {
      return containsAny(value, [
        "popcorn",
        "juice",
        "drink",
        "napkin",
        "candy",
        "board game",
        "movie",
        "ticket",
        "snack"
      ]);
    }

    if (isArt) {
      return containsAny(value, [
        "canvas",
        "paint",
        "brush",
        "marker",
        "paper",
        "glue",
        "scissors",
        "poster"
      ]);
    }

    if (isSchool) {
      return containsAny(value, [
        "notebook",
        "pencil",
        "folder",
        "lunch",
        "backpack",
        "eraser",
        "ruler"
      ]);
    }

    if (isPet) {
      return containsAny(value, [
        "pet",
        "food",
        "leash",
        "collar",
        "water bowl",
        "brush",
        "toy"
      ]);
    }

    if (isFood) {
      return containsAny(value, [
        "sandwich",
        "fruit",
        "juice",
        "water",
        "yogurt",
        "granola",
        "cookie",
        "chips",
        "candy",
        "popcorn"
      ]);
    }

    return true;
  };

  let normalizedItems = (rawItems || [])
    .map((item, itemIndex) => {
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
    })
    .filter((item) => itemMatchesBudgetScenario(item.name));

  normalizedItems = ensureUniqueBudgetItems(
    normalizedItems.filter(
      (item) => item.name && Number.isFinite(item.price) && item.price > 0
    )
  );

  const needCount = normalizedItems.filter((item) => item.tag === "need").length;
  const helpfulCount = normalizedItems.filter((item) => item.tag === "helpful").length;
  const wantCount = normalizedItems.filter((item) => item.tag === "want").length;

  const hasEnoughItems = normalizedItems.length >= 4 && normalizedItems.length <= 5;

  const isGiftScenario = containsAny(combined, [
    "gift",
    "gifts",
    "present",
    "birthday",
    "friends"
  ]);

  const savingScenario = shouldBudgetBuilderLeaveSavings(question);

  const hasReliableMix = isGiftScenario
    ? wantCount >= 2
    : savingScenario
      ? needCount + helpfulCount >= 2
      : needCount + helpfulCount >= 1;

  if (!hasEnoughItems || !hasReliableMix) {
    return [];
  }

  return normalizedItems.slice(0, 5);
}

export function summarizeBudgetSelectionScore(items, budget, savingsTarget, ids, question = {}) {
  const selected = items.filter((item) => ids.includes(item.id));
  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const leftover = budget - total;

  const needs = selected.filter((item) => item.tag === "need").length;
  const helpful = selected.filter((item) => item.tag === "helpful").length;
  const wants = selected.filter((item) => item.tag === "want").length;

  const combinedText = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.goal || ""} ${question?.question || ""}`.toLowerCase();

  const savingGoal = shouldBudgetBuilderLeaveSavings(question);

  const wantsAllowed = containsAny(combinedText, [
    "small treat",
    "one treat",
    "one summer treat",
    "summer treat",
    "treat yourself",
    "buy one treat",
    "buy a treat",
    "enjoying a treat"
  ]);

  const allowsMultipleWants = containsAny(combinedText, [
    "party",
    "birthday",
    "gift",
    "gifts",
    "present",
    "celebrate",
    "celebration",
    "fun day",
    "movie night",
    "friends"
  ]);

  if (total > budget || leftover < 0) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (savingGoal && leftover < savingsTarget) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (wantsAllowed && wants !== 1) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (!wantsAllowed && !allowsMultipleWants && needs === 0 && helpful === 0) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  if (!wantsAllowed && !allowsMultipleWants && wants > 1) {
    return { valid: false, score: -1, total, leftover, needs, helpful, wants };
  }

  let score = 0;

  if (wantsAllowed) {
    score += wants * 1000;
    score += leftover * 80;
    score -= needs * 50;
    score -= helpful * 30;
  } else if (allowsMultipleWants) {
    score += wants * 500;
    score += helpful * 250;
    score += needs * 150;

    if (savingGoal) {
      score += leftover * 50;
    }
  } else {
    score += needs * 1000;
    score += helpful * 300;
    score -= wants * 700;

    if (savingGoal) {
      score += leftover * 40;
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

export function chooseBestBudgetBuilderCorrectIds(items, budget, savingsTarget = 0, question = {}) {
  const validItems = items.filter(
    (item) =>
      item &&
      item.id &&
      Number.isFinite(item.price) &&
      item.price > 0 &&
      ["need", "helpful", "want"].includes(item.tag)
  );

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

  return bestIds;
}

export function buildBudgetBuilderHint(question) {
  if (shouldBudgetBuilderLeaveSavings(question)) {
    return "Pick the items that fit the goal and still leave money saved.";
  }
  return "Pick the items that best match the goal.";
}

export function buildBudgetBuilderSuccessMessage(question) {
  if (shouldBudgetBuilderLeaveSavings(question)) {
    return "Great job! You picked items that fit the goal and still saved some money.";
  }
  return "Great job! You picked the best items for the goal.";
}