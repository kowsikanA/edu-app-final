import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateLessonStructure } from "./lessonGenerator.js";
import { attachQuestionImages } from "./imageUtils.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    imageGeneration: true
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
