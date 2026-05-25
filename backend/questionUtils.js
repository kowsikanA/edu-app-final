import {
  sanitizeHintEmojis,
  containsAny,
  normalizeQuestionType,
  cleanSceneText,
  getWalletAmount,
  getGoalPrice,
  detectGoalItem,
  normalizeCurrencyText,
  extractAllMoneyAmounts
} from "./helpers.js";
import {
  rebalanceBudgetItems,
  buildReliableBudgetFallback,
  chooseBestBudgetBuilderCorrectIds,
  summarizeBudgetSelectionScore,
  getBudgetSavingsTarget,
  shouldBudgetBuilderLeaveSavings,
  buildBudgetBuilderHint,
  buildBudgetBuilderSuccessMessage
} from "./budgetUtils.js";
import { ensureDragDrop } from "./dragDropUtils.js";
import { buildExactImagePromptFromQuestion } from "./imageUtils.js";

export function cleanScenarioChoiceOptionText(text, question, isBest) {
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

export function buildScenarioChoiceHint(text, question) {
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

export function buildScenarioChoiceEffect(text, question, isBest) {
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

export function pickScenarioChoiceEmoji(text, isBest, index) {
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

  if (
    containsAny(value, [
      "save",
      "savings",
      "saving",
      "money left",
      "keep the money",
      "put all of it into savings",
      "bank"
    ])
  ) {
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
  if (containsAny(value, ["toy", "stuffed bear", "doll"])) return "🧸";
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

export function buildTapRevealClueText(question, clueIndex) {
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

export function buildTapRevealOptions(question) {
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

export function ensureUniqueScenarioOptions(options) {
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

export function ensureScenarioChoice(question, index) {
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
    heroCaption: sanitizeHintEmojis(question.heroCaption || "💡"),
    question: sanitizeHintEmojis(question.question || ""),
    generalHint:
      sanitizeHintEmojis(question.generalHint) ||
      "Think about which choice helps your goal the most.",
    options: uniqueOptions.slice(0, 3)
  };

  finalQuestion.questionImagePrompt = buildExactImagePromptFromQuestion(finalQuestion);
  return finalQuestion;
}

export function ensureTapReveal(question, index) {
  const cards = Array.isArray(question.cards) ? question.cards.slice(0, 4) : [];
  const options = Array.isArray(question.options) ? question.options.slice(0, 2) : [];
  const fallbackOptions = buildTapRevealOptions(question);

  const normalizedCards = cards.map((card, cardIndex) => ({
    id: card.id || `q${index + 1}c${cardIndex + 1}`,
    coverEmoji: sanitizeHintEmojis(card.coverEmoji || "🃏"),
emoji: sanitizeHintEmojis(
  card.emoji ||
    pickScenarioChoiceEmoji(
      `${card.title || ""} ${card.text || ""}`,
      false,
      cardIndex
    )
),    title: sanitizeHintEmojis(card.title || `Clue ${cardIndex + 1}`),
    text: sanitizeHintEmojis(card.text || buildTapRevealClueText(question, cardIndex))
  }));

  while (normalizedCards.length < 4) {
    const cardIndex = normalizedCards.length;
    const title = `Clue ${cardIndex + 1}`;
    const text = buildTapRevealClueText(question, cardIndex);

    normalizedCards.push({
      id: `q${index + 1}c${cardIndex + 1}`,
      coverEmoji: "🃏",
emoji: sanitizeHintEmojis(
  pickScenarioChoiceEmoji(
    `${title} ${text}`,
    false,
    cardIndex
  )
),      title: sanitizeHintEmojis(title),
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
    heroCaption: sanitizeHintEmojis(question.heroCaption || "💡"),
    question: sanitizeHintEmojis(question.question || ""),
    generalHint:
      sanitizeHintEmojis(question.generalHint) ||
      "Use the clues to think about the smartest choice.",
    cards: normalizedCards,
    options: normalizedOptions
  };

  finalQuestion.questionImagePrompt = buildExactImagePromptFromQuestion(finalQuestion);
  return finalQuestion;
}

export function ensureBudgetBuilder(question, index) {
  const fallback = buildReliableBudgetFallback(question, index);

  let normalizedItems = rebalanceBudgetItems(
    Array.isArray(question.items) ? question.items.slice(0, 5) : [],
    question,
    index
  );

  if (normalizedItems.length < 4 || normalizedItems.length > 5) {
    normalizedItems = fallback.items;
  }

  const hasUsableItems =
    normalizedItems.length >= 4 &&
    normalizedItems.length <= 5 &&
    normalizedItems.every(
      (item) =>
        item.name &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        ["need", "helpful", "want"].includes(item.tag)
    );

  if (!hasUsableItems) {
    normalizedItems = fallback.items;
  }

  let budget = Number(question.budget);
  if (!Number.isFinite(budget) || budget <= 0) {
    budget = Number(fallback.budget);
  }

  const itemIds = new Set(
    normalizedItems.map((item) => String(item.id).trim())
  );

  let correctItemIds = Array.isArray(question.correctItemIds)
    ? question.correctItemIds
        .map((id) => String(id).trim())
        .filter((id) => itemIds.has(id))
    : [];

  if (correctItemIds.length === 0) {
    const savingsTarget = getBudgetSavingsTarget(question, budget);

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
    heroCaption: sanitizeHintEmojis(question.heroCaption || "💡"),
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

  finalQuestion.questionImagePrompt = buildExactImagePromptFromQuestion(finalQuestion);
  return finalQuestion;
}

export function normalizeQuestionByType(question, expectedType, index) {
  const type = normalizeQuestionType(expectedType);

  if (type === "budget-builder") return ensureBudgetBuilder(question, index);
  if (type === "tap-reveal") return ensureTapReveal(question, index);
  if (type === "drag-drop") return ensureDragDrop(question, index);
  return ensureScenarioChoice(question, index);
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

