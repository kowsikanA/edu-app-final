import OpenAI from "openai";
import { safeJsonParse, normalizeQuestionType, sanitizeHintEmojis, containsAny } from "./helpers.js";
import { normalizeQuestionByType } from "./questionUtils.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const recentLessonVariations = new Map();

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

function getPromptSchema(questionType, index = 0) {
  const q = index + 1;

  if (questionType === "budget-builder") {
  return `
{
  "type": "budget-builder",
  "scenarioTitle": "Movie Night Planning",
  "scenarioText": "You have $15 to plan a movie night with your family, but you also want to save some money for later.",
  "budget": 15,
  "goal": "Save some money for later",
  "heroEmoji": "🎬",
  "heroCaption": "Pick items that fit the plan and leave savings.",
  "question": "Select the best items to buy.",
  "generalHint": "Choose useful movie night items and leave some money unspent.",
  "successMessage": "Great job! You picked items that fit movie night and still saved money.",
  "showAnswerTip": true,
  "questionImagePrompt": "A child planning movie night at a store with Popcorn, Juice Boxes, Napkins, Candy Bag, and Glow Stick shown clearly on the shelf with prices.",
  "items": [
    { "id": "q${q}i1", "name": "Popcorn", "price": 4, "emoji": "🍿", "tag": "need" },
    { "id": "q${q}i2", "name": "Juice Boxes", "price": 3, "emoji": "🧃", "tag": "helpful" },
    { "id": "q${q}i3", "name": "Napkins", "price": 2, "emoji": "🧻", "tag": "helpful" },
    { "id": "q${q}i4", "name": "Candy Bag", "price": 5, "emoji": "🍬", "tag": "want" },
    { "id": "q${q}i5", "name": "Glow Stick", "price": 4, "emoji": "✨", "tag": "want" }
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

CONSISTENCY RULES:
- scenarioTitle, scenarioText, goal, question, cards, options, and questionImagePrompt must all describe the same situation.
- Do not mix topics between clues and answer options.
- The correct option must be clearly supported by the clue cards.
- The wrong option must be realistic but clearly weaker than the correct option.
- The image prompt must show the full scenario or learning situation, not just one object.

IMAGE RULES:
- Do not add random prices or thought bubbles.
- Do not generate an image prompt for a different setting or topic.

- Keep wording simple for grades 4 to 6.
- Never use ✅ or ❌ in cards, options, clue text, emoji fields, hints, or effects.
- Never use checkmarks or cross marks to hint which option is correct.
- Use neutral clue emojis only, such as 💡 🎯 🧠 💰.
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

CRITICAL CONSISTENCY RULE:
- scenarioTitle, scenarioText, goal, question, items, correctItemIds, and questionImagePrompt MUST all describe the SAME exact situation.
- Do not mix topics.
- Every item must logically belong to the scenario.
- Every item must feel purchasable in the same store, event, or planning situation.
- The image prompt must describe the same location, activity, goal, and exact item names from the items array.

TOPIC MATCHING RULES:
- If the scenario is about movie night or game night, use items like Popcorn, Juice Boxes, Board Game, Movie Ticket, Napkins, Candy Bag.
- If the scenario is about birthday party or party planning, use items like Friendship Card, Gift Bag, Party Cups, Napkins, Balloons, Small Gift, Stickers.
- If the scenario is about art, craft, poster, or project work, use items like Canvas, Paint Set, Brushes, Markers, Paper, Glue.
- If the scenario is about school, use items like Notebook, Pencils, Folder, Lunch, Backpack.
- If the scenario is about pet care, use items like Pet Food, Leash, Water Bowl, Collar, Pet Brush.
- If the scenario is about lunch, snacks, or treats, use food/drink items only.
- Do not use art supplies for movie/game night.
- Do not use movie/game/snack items for art projects.
- Do not use school supplies unless the scenario is actually about school or supplies.

BUDGET QUALITY RULES:
- Do not make the budget high enough to buy almost everything.
- The budget should force a real choice.
- The total cost of all items must be greater than the budget.
- The correct answer should usually select 2 or 3 items only.
- The correct answer must never include all items.
- Never make every selected item correct.
- Never make all needs, helpful items, and wants correct together.
- Create realistic item prices with different amounts.
- Include at least 1 tempting item that should NOT be selected.
- Include at least 1 useful item that supports the goal.
- Include at least 1 want/extra item that does not support the goal as much.
- If the scenario says to save money, the correct total should usually use only 40% to 70% of the budget.
- The wrong combinations should either go over budget, include too many wants, or ignore the goal.

ANSWER RULES:
- Do not create item sets where multiple totally different answers feel equally correct.
- Make one clearly best combination.
- Needs and helpful items should matter more than wants.
- correctItemIds must only include ids that exist in items.
- The correct set must fit inside the budget.
- If the scenario says to save money, the correct answer should leave some money unspent when possible.
- Wants should not be in the correct answer when a better need/helpful choice exists.
- correctItemIds must vary between generated versions.
- Do not always use the same answer pattern like item 1 + item 2 or the first three items.
- Vary correctItemIds positions depending on the scenario.
- Examples of varied patterns:
  - ["q1i1", "q1i3"]
  - ["q1i2", "q1i4"]
  - ["q1i1", "q1i3", "q1i5"]
- Only use ids that match the current question number.

IMAGE RULES:
- questionImagePrompt must include the exact item names from the items array.
- questionImagePrompt must match the same scenario and shopping/planning situation.
- Do not generate an image prompt for a different location or activity.

FINAL SELF-CHECK BEFORE RETURNING JSON:
- Check that every item matches the scenario.
- Check that the total cost of all items is greater than the budget.
- Check that the correct answer does not include all items.
- Check that the correct answer uses 2 or 3 items.
- Check that the correct answer fits within the budget.
- Check that the image prompt matches the same scenario.
- Check that correctItemIds match the intended best answer.
- If anything does not match, fix it before returning JSON.

- Keep wording simple for grades 4 to 6.
- Never use ✅ or ❌ in item names, emojis, tags, hints, or messages.
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

VARIATION RULES:
- Generate a noticeably different version every time.
- Do not repeat the same item labels from the sample question.
- Do not repeat the same bucket theme if a different theme still fits the lesson.
- Vary the scenario, item labels, bucket titles, and examples.
- Do not always use coupon/sale/shopping-list examples.
- Each new generation should feel like a fresh activity.

EMOJI RULES:
- Every item must have an emoji that directly matches its label.
- Do not use the same emoji for many unrelated items.
- Do not use generic emojis like ⭐, 💡, 📦, or 🛍️ unless they truly fit the item.
- The emoji must match the exact label, not just the broad scenario.
- If label is "Pet Food", use a pet/food emoji like 🥣.
- If label is "Water Bowl", use 💧 or 🥣.
- If label is "Leash" or "Collar", use 🦮.
- If label is "Pet Bed", use 🛏️.
- If label is "Pet Brush", use 🪮.
- If label is "Pet Toy", use 🧸.
- For action labels, use action-related emojis:
  - Use a Coupon -> 🏷️
  - Compare Prices -> 🔍
  - Wait for a Sale -> ⏳
  - Make a Shopping List -> 📝
  - Save Part of Your Money -> 💰
  - Spend It All Right Away -> 💸
  - Shop Without a Plan -> 🛒
  - Forget Your Saving Goal -> 🎯
- For food labels, use food-specific emojis like 🍎 🥪 🧃 🍪 🍬 🍿.
- For school labels, use school-specific emojis like 📚 ✏️ 🎒 📁.
- For art labels, use art-specific emojis like 🎨 ✂️ 🖍️ 📋.
- For toy/game labels, use toy/game-specific emojis like 🧸 🎮 🧩 🎲.
- For pet labels, use pet-specific emojis like 🐾 🦴 🦮 🥣.

QUESTION-BUCKET-ITEM MATCH RULE:
- If bucket titles contain "Actions", "Habits", "Helps Saving", "Hurts Saving", "Helpful Actions", or "Unhelpful Actions", then EVERY item label must be an action phrase, not an object.
- Action labels must start with verbs like Use, Save, Wait, Compare, Bring, Make, Plan, Avoid, Spend, Buy, Forget.
- Do not generate pet items, school items, food items, toys, or supplies for action/habit buckets.
- If the generated items are physical objects, the bucket titles must also be object categories like "Pet Needs" and "Pet Extras", not "Helpful Actions".
- If the question asks "Which actions...", then every item must be an action.
- If the question asks "Which items...", then bucket titles and labels may be physical objects.

ACTION VS OBJECT RULES:
- If the sorting is about actions or habits, every label MUST be an action phrase starting with a verb.
- Do NOT generate physical objects for action-based sorting.
- Example action labels: "Use a Coupon", "Wait for a Sale", "Shop Without a Plan".
- If the sorting categories describe actions, habits, or behaviors, every label must be a short action phrase.
- For action-based sorting, do not generate physical objects like notebook, backpack, water bottle, toy car, cookie, pet food, leash, collar, or sticker pack.

SCENARIO CONSISTENCY RULES:
- The item labels must directly relate to the scenarioTitle, scenarioText, bucketConfig, and question.
- Every item must belong to the same exact scenario world as the question.
- Do not mix categories.
- If the scenario is about saving actions, ALL items must be actions or habits, not store objects.
- If the scenario is about pet items, bucket titles must be pet object categories, such as "Pet Needs" and "Pet Extras".
- If the scenario is about snacks or food, ALL items must be food or snack choices.
- If the scenario is about school supplies, ALL items must be school-related items.
- If the scenario is about art or projects, ALL items must be art/project-related items.
- If the scenario is about toys, ALL items must be toy or play choices.
- Do not use a generic school-supplies set unless the scenario is actually about school.
- Do not use snack items unless the scenario is actually about snacks or food.
- Do not use art items unless the scenario is actually about art, craft, or a project.
- Do not use toy items unless the scenario is actually about toys or games.

BUCKET RULES:
- The bucket meaning must match the lesson concept.
- The question sentence must explicitly name the 2 bucket groups.
- Every item must clearly belong to one of the two buckets.
- Keep the two buckets reasonably balanced.
- Each bucket should have at least 4 items.
- Avoid ambiguous items.
- Do not generate placeholder labels like "Item 1".
- Do not generate generic filler labels.
- If bucket titles say "Helpful Actions" and "Unhelpful Actions", labels must be actions only.
- If labels are physical objects, bucket titles must be object categories only.

SAVING ACTION EXAMPLES:
- If the buckets are about helps saving vs hurts saving, generate action labels such as:
  "Use a Coupon", "Wait for a Sale", "Compare Prices", "Make a Shopping List",
  "Bring Lunch From Home", "Save Part of Your Money",
  "Buy Candy at Checkout", "Spend It All Right Away", "Buy Toys First",
  "Shop Without a Plan", "Forget Your Saving Goal", "Buy Extras You Do Not Need".
- If the buckets are about helpful actions vs not helpful actions, generate action labels, not physical objects.
- Do not turn action-based sorting into item-based sorting.

IMAGE RULES:
- The image prompt must match the actual bucket topic and item labels.
- If the buckets are action-based, show a child making money choices, not random pet/store objects.
- If the buckets are object-based, show the exact category of objects from the items.
- The image prompt must not show unrelated items.
- The image prompt must not suggest the correct bucket answers.

STRICT ACTION ENFORCEMENT:
- If the question uses the words "actions", "habits", "choices", "behaviors", "helpful actions", or "unhelpful actions", then EVERY item label MUST be a verb/action phrase.
- NEVER generate physical objects for action-based questions.
- INVALID examples for action buckets:
  "Apple", "Water Bottle", "Sandwich", "Pet Food", "Notebook", "Cookie"
- VALID examples for action buckets:
  "Bring Lunch From Home"
  "Use a Coupon"
  "Compare Prices"
  "Save Part of Your Allowance"
  "Buy Candy Every Day"
  "Spend Money Right Away"
  "Shop Without a Plan"

- If ANY generated item is a physical object, automatically regenerate the entire drag-drop question.
- If bucket titles contain "Helpful Actions" or "Unhelpful Actions", object labels are NOT allowed.
- If the question asks "Which actions...", every item MUST start with a verb.

FINAL SELF-CHECK BEFORE RETURNING JSON:
- Check that each emoji matches its own label.
- Check that bucket titles, question wording, and item labels all match the same category.
- Check that action buckets contain only action labels.
- Check that object buckets contain only object labels.
- Check that each item belongs clearly in one bucket.
- Check that the buckets are balanced.
- Check that the generated version is different from the sample and previous version.
- If anything does not match, fix it before returning JSON.

- Use real kid-friendly labels.
- Keep wording simple for grades 4 to 6.
- Never use ✅ or ❌ in item labels, emojis, hints, or bucket text.

- If bucket titles contain "Actions" or the question asks "Which actions...", verify every item starts with a verb.
- If any item is a physical object during an action-based question, regenerate the full question.
- If action buckets contain objects like food, toys, pet items, or school supplies, regenerate the question.
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

export async function generateLessonStructure(payload) {
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
- Make this version noticeably different from earlier versions of the same lesson, not a copy
- Change the scenario, item names, money amounts, goals, option wording, clue wording
- Do not repeat the same exact snack, toy, school item, or savings goal across all questions unless the lesson absolutely requires it
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
