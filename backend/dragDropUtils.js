import {
  containsAny,
  extractScenarioKeywords,
  pickItemEmoji,
  normalizeSemanticText,
  sanitizeHintEmojis
} from "./helpers.js";

export function itemMatchesScenario(itemLabel, question = {}) {
  const label = normalizeSemanticText(itemLabel);
  const { matched } = extractScenarioKeywords(question);

  const labelGroups = {
    snacks: [
      "sandwich",
      "water bottle",
      "apple",
      "banana",
      "orange",
      "fruit",
      "yogurt",
      "granola",
      "juice",
      "lunch",
      "meal",
      "healthy snack",
      "healthy food",
      "cookie",
      "chips",
      "candy",
      "ice cream",
      "soda"
    ],
    school: [
      "notebook",
      "pencil",
      "folder",
      "glue",
      "eraser",
      "markers",
      "crayons",
      "backpack",
      "ruler",
      "calculator",
      "poster board"
    ],
    art: [
      "canvas",
      "paint",
      "brush",
      "brushes",
      "poster board",
      "glitter",
      "scissors",
      "markers",
      "glue"
    ],
    toys: [
      "toy",
      "toy car",
      "board game",
      "video game",
      "puzzle",
      "building blocks",
      "stuffed animal",
      "action figure",
      "doll",
      "slime"
    ],
    reading: [
      "book",
      "comic",
      "flash cards",
      "notebook",
      "reading light",
      "bookmark"
    ],
    sports: [
      "soccer ball",
      "basketball",
      "helmet",
      "sports bag",
      "sneakers",
      "water bottle",
      "whistle"
    ],
    pets: [
      "pet food",
      "water bowl",
      "leash",
      "collar",
      "pet bed",
      "brush"
    ],
    saving: [
      "coupon",
      "compare prices",
      "shopping list",
      "sale",
      "save money",
      "bring lunch",
      "buy candy",
      "buy toys",
      "spend it all"
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

export function inferDragDropBuckets(question) {
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
      "healthy",
      "healthy choices",
      "meals",
      "meal",
      "lunch",
      "breakfast",
      "dinner",
      "snacks",
      "food",
      "nutrition",
      "treats"
    ])
  ) {
    return {
      left: {
        id: "healthy-choice",
        title: "Healthy Choices",
        subtitle: "Items needed for health"
      },
      right: {
        id: "treat",
        title: "Treats",
        subtitle: "Items that are extra"
      }
    };
  }

  if (
    containsAny(combined, [
      "pet care",
      "pet supplies",
      "dog",
      "cat",
      "pet food",
      "water bowl",
      "leash",
      "collar",
      "pet bed"
    ])
  ) {
    return {
      left: {
        id: "pet-need",
        title: "Essential Supplies",
        subtitle: "Must-haves for pet care"
      },
      right: {
        id: "pet-extra",
        title: "Extra Supplies",
        subtitle: "Fun but not necessary"
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

  if (
    containsAny(combined, [
      "helpful activities",
      "unhelpful activities",
      "activities are helpful",
      "activities are unhelpful",
      "good activities",
      "bad activities"
    ])
  ) {
    return {
      left: {
        id: "helpful-activities",
        title: "Helpful Activities",
        subtitle: "Things that are good for you"
      },
      right: {
        id: "unhelpful-activities",
        title: "Unhelpful Activities",
        subtitle: "Things that waste time"
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

export function isActionLabel(label = "") {
  const value = label.toLowerCase();

  return containsAny(value, [
    "use",
    "buy",
    "save",
    "wait",
    "make",
    "bring",
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

export function buildMinimalEmergencyDragDropItems(bucketConfig, index, question = {}) {
  const { matched } = extractScenarioKeywords(question);
  const combined = `${question?.scenarioTitle || ""} ${question?.scenarioText || ""} ${question?.question || ""}`.toLowerCase();

  let emergencyLeft = ["Water Bottle", "Apple", "Sandwich", "Yogurt", "Banana"];
  let emergencyRight = ["Candy", "Cookie", "Chips", "Ice Cream", "Soda"];

  if (matched.includes("pets")) {
    emergencyLeft = ["Pet Food", "Water Bowl", "Leash", "Collar", "Pet Bed", "Pet Brush"];
    emergencyRight = ["Pet Costume", "Fancy Collar", "Pet Toy", "Treats", "Sticker Pack", "Candy"];
  } else if (
    matched.includes("snacks") ||
    containsAny(combined, [
      "healthy",
      "healthy choices",
      "meals",
      "meal",
      "lunch",
      "breakfast",
      "dinner",
      "snacks",
      "snack",
      "food",
      "nutrition",
      "treats"
    ])
  ) {
    emergencyLeft = ["Water Bottle", "Apple", "Banana", "Yogurt", "Sandwich", "Granola Bar"];
    emergencyRight = ["Candy", "Cookie", "Chips", "Ice Cream", "Soda", "Chocolate Bar"];
  } else if (matched.includes("school")) {
    emergencyLeft = ["Notebook", "Pencils", "Folder", "Glue", "Backpack", "Eraser"];
    emergencyRight = ["Sticker Pack", "Toy Car", "Candy", "Bracelet", "Slime", "Keychain"];
  } else if (matched.includes("art")) {
    emergencyLeft = ["Canvas", "Paint Set", "Brushes", "Markers", "Scissors", "Paper"];
    emergencyRight = ["Glitter", "Sticker Pack", "Candy", "Bracelet", "Toy Car", "Slime"];
  } else if (matched.includes("toys")) {
    emergencyLeft = ["Board Game", "Puzzle", "Building Blocks", "Book", "Craft Kit", "Soccer Ball"];
    emergencyRight = ["Toy Car", "Stuffed Animal", "Slime", "Candy", "Video Game", "Sticker Pack"];
  } else if (matched.includes("sports")) {
    emergencyLeft = ["Soccer Ball", "Water Bottle", "Helmet", "Sneakers", "Sports Bag", "Whistle"];
    emergencyRight = ["Candy", "Sticker Pack", "Toy Car", "Cookie", "Video Game", "Bracelet"];
  } else if (matched.includes("reading")) {
    emergencyLeft = ["Read a Book", "Go to Library", "Read Comics", "Flash Cards", "Audiobook", "Use a Bookmark"];
    emergencyRight = ["Watch TV All Day", "Play Video Games", "Scroll on Phone", "Nap", "Ignore Homework", "Buy Candy"];
  } else if (matched.includes("activities")) {
    emergencyLeft = ["Read a Book", "Play Soccer", "Go Biking", "Do a Puzzle", "Draw and Paint", "Go Swimming"];
    emergencyRight = ["Watch TV All Day", "Play Video Games", "Scroll on Phone", "Eat Snacks All Day", "Sleep", "Ignore Homework"];
  }

  return [
    ...emergencyLeft.map((label, itemIndex) => ({
      id: `q${index + 1}l${itemIndex + 1}`,
      label,
      emoji: pickItemEmoji(label, bucketConfig.left.id, question),
      bucket: bucketConfig.left.id
    })),
    ...emergencyRight.map((label, itemIndex) => ({
      id: `q${index + 1}r${itemIndex + 1}`,
      label,
      emoji: pickItemEmoji(label, bucketConfig.right.id, question),
      bucket: bucketConfig.right.id
    }))
  ];
}

export function normalizeDragDropBucketValue(rawBucket, bucketConfig, itemLabel = "") {
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
    "healthy",
    "healthy-choice",
    "healthy choice",
    "healthy choices",
    "healthy snack",
    "healthy food",
    "helps-saving",
    "good for saving",
    "helpful actions",
    "school-need",
    "pet-need",
    "needed",
    "important",
    "essential",
    "essential supplies",
    "helpful-activities",
    "helpful activities"
  ]);

  const rightAliases = new Set([
    rightId,
    "want",
    "wants",
    "extra",
    "extras",
    "fun",
    "treat",
    "treats",
    "hurt",
    "hurts",
    "not helpful",
    "bad",
    "not-saving",
    "hurts-saving",
    "not good for saving",
    "not helpful actions",
    "school-extra",
    "pet-extra",
    "optional",
    "nonessential",
    "non-essential",
    "extra supplies"
  ]);

  if (leftAliases.has(value)) return leftId;
  if (rightAliases.has(value)) return rightId;

  if (leftId === "healthy-choice" && rightId === "treat") {
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
        "granola",
        "healthy snack",
        "meal"
      ])
    ) {
      return leftId;
    }

    if (
      containsAny(label, [
        "candy",
        "cookie",
        "chips",
        "ice cream",
        "soda",
        "toy",
        "sticker",
        "video game"
      ])
    ) {
      return rightId;
    }
  }

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

  if (leftId === "pet-need" && rightId === "pet-extra") {
    if (
      containsAny(label, [
        "pet food",
        "water bowl",
        "leash",
        "collar",
        "pet bed",
        "brush"
      ])
    ) {
      return leftId;
    }

    if (
      containsAny(label, [
        "toy",
        "candy",
        "video game",
        "bracelet",
        "sticker",
        "slime",
        "cookie",
        "ice cream"
      ])
    ) {
      return rightId;
    }
  }

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
        "scissors",
        "pet food",
        "water bowl",
        "leash",
        "collar",
        "pet bed"
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

export function getDragDropSceneInstruction(question) {
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

  if (
    containsAny(combined, [
      "healthy",
      "healthy choices",
      "meals",
      "meal",
      "lunch",
      "breakfast",
      "dinner",
      "snacks",
      "food",
      "nutrition",
      "treats"
    ])
  ) {
    return "Show a child sorting meal and snack choices, with healthy foods like water, fruit, lunch, and yogurt clearly shown, plus treats like candy or cookies as extras.";
  }

  if (
    containsAny(combined, [
      "pet care",
      "pet supplies",
      "dog",
      "cat",
      "pet food",
      "water bowl",
      "leash",
      "collar"
    ])
  ) {
    return "Show a child sorting pet care supplies, with useful pet items like food, water bowl, leash, collar, and pet bed in a clear pet care setting.";
  }

  return "Show a clear topic scene that matches the sorting activity so the child understands the category situation.";
}

export function buildDragDropQuestionText(bucketConfig) {
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

  if (
    (leftTitle === "Essential Supplies" && rightTitle === "Extra Supplies") ||
    (bucketConfig.left.id === "pet-need" && bucketConfig.right.id === "pet-extra")
  ) {
    return "Drag each item into the correct group: essential pet supplies or extra supplies.";
  }

  if (
    (leftTitle === "Healthy Choices" && rightTitle === "Treats") ||
    (bucketConfig.left.id === "healthy-choice" && bucketConfig.right.id === "treat")
  ) {
    return "Drag each item into the correct group: healthy choices or treats.";
  }

  return "Drag each item into the correct group: needs or wants.";
}

export function buildDragDropHint(bucketConfig) {
  if (bucketConfig.left.id === "helps-saving") {
    return "Think about which actions help you keep money for later.";
  }

  if (bucketConfig.left.id === "school-need") {
    return "Think about which items are really important for school.";
  }

  if (bucketConfig.left.id === "pet-need") {
    return "Think about which items are important for taking care of a pet.";
  }

  if (bucketConfig.left.id === "healthy-choice") {
    return "Think about which items help your body and which ones are just treats.";
  }

  return "Think about which items are needs and which are wants.";
}

export function buildDragDropSuccess(bucketConfig) {
  if (bucketConfig.left.id === "helps-saving") {
    return "Awesome! You sorted the saving actions correctly.";
  }

  if (bucketConfig.left.id === "school-need") {
    return "Awesome! You sorted the school items correctly.";
  }

  if (bucketConfig.left.id === "pet-need") {
    return "Awesome! You sorted the pet care items correctly.";
  }

  if (bucketConfig.left.id === "healthy-choice") {
    return "Awesome! You sorted the healthy choices and treats correctly.";
  }

  return "Amazing! You sorted every item correctly.";
}

export function hasMeaningfulDragDropQuestionText(question = "") {
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

export function ensureDragDrop(question, index) {
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
      const label = sanitizeHintEmojis(item?.label || item?.name || "").trim();
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

  return true;
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

  return {
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
    items: normalizedItems
  };
}