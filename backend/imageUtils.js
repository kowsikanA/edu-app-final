import axios from "axios";
import {
  cleanSceneText,
  buildObjectListForPrompt,
  normalizeQuestionType,
  sanitizeHintEmojis,
  detectScenarioLocation,
  getWalletAmount,
  getGoalPrice,
  detectGoalItem,
  normalizeCurrencyText
} from "./helpers.js";
import { getDragDropSceneInstruction } from "./dragDropUtils.js";

const STYLE_BOOST =
  "minimal flat 2d cartoon illustration, children's educational app style, simple clean shapes, smooth outlines, bright vibrant colours, uncluttered background, easy to understand, vector-style, no realism";

const ANATOMY_GUARD =
  "correct anatomy, one head, two arms, two hands, two legs, natural pose, no extra limbs, no duplicated body parts, no distorted face";

const QUESTION_IMAGE_TIMEOUT_MS = 45000;
const QUESTION_IMAGE_CONCURRENCY = 3;

export function buildLocationInstruction(question) {
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

export function buildScenarioFacts(question) {
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

export function buildUniversalScenePrompt(question) {
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
    "Only include numbers directly relevant to the question.",
    "Do not add random prices or unrelated numbers.",
    "Do not add random thought bubbles.",
    "Do not add labels with incorrect text.",
    "Avoid floating objects on a blank background.",
    "Avoid infographic style.",
    "Show the exact decision situation as one complete moment.",
    "Full subject visible.",
    "Fit entire scene in frame.",
    "Wide horizontal composition.",
    "Centered composition.",
    "Plain soft background.",
    "Educational illustration.",
    "Kid friendly.",
    "Avoid extra unrelated objects.",
    "No misleading or swapped price tags."
  ];

  return parts.filter(Boolean).join(" ");
}

export function buildFinalImagePrompt(rawPrompt) {
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

export async function generateImageBase64(prompt, options = {}) {
  if (!process.env.HUGGINGFACE_API_KEY) {
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
      timeout: 45000,
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
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

export function buildExactImagePromptFromQuestion(question) {
  const customPrompt = cleanSceneText(question?.questionImagePrompt || "");
  const universalPrompt = buildUniversalScenePrompt(question);

  if (customPrompt) {
    return `${universalPrompt} Custom prompt guidance: ${customPrompt}`;
  }

  return universalPrompt;
}

export async function attachQuestionImages(questions) {
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
