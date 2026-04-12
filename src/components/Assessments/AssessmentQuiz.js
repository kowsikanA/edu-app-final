import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import assessmentsData from "../../data/assessments";
import lessonsData from "../../data/lessons";
import "./Assessments.css";

function AssessmentQuiz() {
  const { grade, unit } = useParams();
  const navigate = useNavigate();

  const gradeKey = grade?.startsWith("grade") ? grade : `grade${grade}`;
  const assessment = assessmentsData[gradeKey]?.[unit];
  const lessons = lessonsData[gradeKey]?.[unit] || [];
  const progressKey = `progress_${gradeKey}_${unit}`;
  const completedLessons = JSON.parse(localStorage.getItem(progressKey)) || [];
  const isUnitComplete = lessons.length === 0 || completedLessons.length === lessons.length;

  const questions = useMemo(() => {
    const base = assessment?.questions ? [...assessment.questions] : [];
    for (let i = base.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    return base;
  }, [assessment]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(Array(questions.length).fill(false));
  const [availableItems, setAvailableItems] = useState([]);
  const [needsItems, setNeedsItems] = useState([]);
  const [wantsItems, setWantsItems] = useState([]);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [matchingSelections, setMatchingSelections] = useState([]);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(Array(questions.length).fill(false));
    setAvailableItems([]);
    setNeedsItems([]);
    setWantsItems([]);
    setDraggedItemId(null);
    setMatchingSelections([]);
  }, [questions]);

  const question = questions[currentIndex];
  const selectedIndex = answers[currentIndex];
  const isSubmitted = submitted[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const questionType = question?.type || "multiple-choice";
  const questionTypeLabel =
    questionType === "true-false"
      ? "True / False"
      : questionType === "drag-sort"
        ? "Drag & Drop"
        : questionType === "matching"
          ? "Matching"
        : "Multiple Choice";
  const bucketLabels = question?.bucketLabels || { need: "Needs", want: "Wants" };
  const emojiForLabel = (label) => {
    const text = String(label || "").toLowerCase();
    const matchers = [
      { keys: ["water", "juice"], emoji: "💧" },
      { keys: ["candy", "snack", "popcorn"], emoji: "🍬" },
      { keys: ["toy", "game", "arcade"], emoji: "🧸" },
      { keys: ["sticker", "sticker chart"], emoji: "✨" },
      { keys: ["notebook", "paper"], emoji: "📓" },
      { keys: ["pencil", "markers", "art supplies"], emoji: "✏️" },
      { keys: ["jacket", "coat"], emoji: "🧥" },
      { keys: ["shoes", "sneakers"], emoji: "👟" },
      { keys: ["backpack", "bag"], emoji: "🎒" },
      { keys: ["lunch", "breakfast"], emoji: "🍱" },
      { keys: ["movie", "night"], emoji: "🎬" },
      { keys: ["glow", "sparkles", "glitter"], emoji: "✨" },
      { keys: ["bottle"], emoji: "🍼" },
      { keys: ["napkins", "tape"], emoji: "🧻" },
      { keys: ["dog", "chores", "work"], emoji: "🐶" },
      { keys: ["jar", "donate", "share"], emoji: "🤝" },
      { keys: ["save", "saving", "budget", "compare", "price"], emoji: "💰" },
      { keys: ["goal", "tracker", "plan"], emoji: "🎯" },
      { keys: ["spend", "buy"], emoji: "🛍️" },
      { keys: ["emergency", "broken"], emoji: "🩹" },
      { keys: ["celebrate", "treat"], emoji: "🎉" },
      { keys: ["true"], emoji: "✅" },
      { keys: ["false"], emoji: "❌" }
    ];

    const matched = matchers.find((entry) => entry.keys.some((key) => text.includes(key)));
    return matched ? matched.emoji : "💡";
  };
  const normalizedOptions = (question?.options || []).map((option) => {
    if (typeof option === "string") {
      return { label: option, subtitle: "", emoji: emojiForLabel(option) };
    }
    return {
      label: option.label ?? "",
      subtitle: option.subtitle ?? "",
      emoji: option.emoji ?? emojiForLabel(option.label)
    };
  });

  useEffect(() => {
    if (questionType !== "drag-sort") return;
    const rawItems = question?.items || [];
    const normalizedItems = rawItems.map((item, index) => ({
      id: item.id ?? `${currentIndex}-${index}`,
      label: item.label ?? item.name ?? "Item",
      emoji: item.emoji ?? "📦",
      bucket: item.bucket ?? item.type ?? "need"
    }));

    setAvailableItems(normalizedItems);
    setNeedsItems([]);
    setWantsItems([]);
    setDraggedItemId(null);
  }, [questionType, question, currentIndex]);

  useEffect(() => {
    if (questionType !== "matching") return;
    const pairs = question?.matches || [];
    setMatchingSelections(Array(pairs.length).fill(""));
  }, [questionType, question]);

  const matchingPairs = questionType === "matching" ? question?.matches || [] : [];
  const matchingOptions = useMemo(() => {
    if (questionType !== "matching") return [];
    const options = question?.matchOptions?.length
      ? question.matchOptions
      : (question?.matches || []).map((pair) => pair.right);
    return Array.from(new Set(options));
  }, [questionType, question]);

  if (!assessment) {
    return (
      <div className="assessment-container">
        <h1 className="assessment-title">Assessment</h1>
        <p className="assessment-subtitle">Quiz not found.</p>
        <button
          className="assessment-action"
          onClick={() => navigate(`/assessments/${grade}`)}
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  if (!isUnitComplete) {
    return (
      <div className="assessment-container">
        <h1 className="assessment-title">Unit Locked</h1>
        <p className="assessment-subtitle">Finish all lessons to unlock this quiz.</p>
        <button
          className="assessment-action primary"
          onClick={() => navigate(`/lessons/${gradeKey}/${unit}`)}
        >
          Go to Lessons
        </button>
      </div>
    );
  }

  const selectAnswer = (index) => {
    if (isSubmitted) return;
    const updated = [...answers];
    updated[currentIndex] = index;
    setAnswers(updated);
  };

  const submitAnswer = () => {
    if ((questionType === "multiple-choice" || questionType === "true-false") && selectedIndex === null) {
      return;
    }

    if (questionType === "drag-sort") {
      const allPlaced = availableItems.length === 0;
      if (!allPlaced) return;
      const allCorrect = [...needsItems, ...wantsItems].every((item) => {
        return item.bucket === (needsItems.includes(item) ? "need" : "want");
      });

      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = allCorrect ? 1 : 0;
      setAnswers(updatedAnswers);
    }

    if (questionType === "matching") {
      const pairs = question?.matches || [];
      if (matchingSelections.length !== pairs.length) return;
      if (matchingSelections.some((value) => !value)) return;
      const allCorrect = matchingSelections.every((value, index) => value === pairs[index].right);
      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = allCorrect ? 1 : 0;
      setAnswers(updatedAnswers);
    }

    const updated = [...submitted];
    updated[currentIndex] = true;
    setSubmitted(updated);
  };

  const handleDragStart = (itemId) => {
    if (isSubmitted) return;
    setDraggedItemId(itemId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const moveItemToBucket = (item, bucket) => {
    if (!item) return;
    setAvailableItems((prev) => prev.filter((entry) => entry.id !== item.id));
    setNeedsItems((prev) => prev.filter((entry) => entry.id !== item.id));
    setWantsItems((prev) => prev.filter((entry) => entry.id !== item.id));

    if (bucket === "need") {
      setNeedsItems((prev) => [...prev, item]);
    } else {
      setWantsItems((prev) => [...prev, item]);
    }
  };

  const returnItemToBank = (item) => {
    if (isSubmitted) return;
    setNeedsItems((prev) => prev.filter((entry) => entry.id !== item.id));
    setWantsItems((prev) => prev.filter((entry) => entry.id !== item.id));
    setAvailableItems((prev) => [...prev, item]);
  };

  const handleDropToBucket = (bucket) => {
    if (!draggedItemId) return;
    const draggedItem =
      availableItems.find((item) => item.id === draggedItemId) ||
      needsItems.find((item) => item.id === draggedItemId) ||
      wantsItems.find((item) => item.id === draggedItemId);
    moveItemToBucket(draggedItem, bucket);
    setDraggedItemId(null);
  };

  const handleMatchingChange = (index, value) => {
    if (isSubmitted) return;
    setMatchingSelections((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const isDragSubmitDisabled = questionType === "drag-sort" && availableItems.length > 0;
  const isMatchingSubmitDisabled =
    questionType === "matching" &&
    (matchingSelections.length === 0 || matchingSelections.some((value) => !value));
  const isSubmitDisabled =
    questionType === "drag-sort"
      ? isDragSubmitDisabled
      : questionType === "matching"
        ? isMatchingSubmitDisabled
      : selectedIndex === null;

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitQuiz = () => {
    navigate(`/assessment/${grade}/${unit}/results`, {
      state: { answers, questionOrder: questions.map((item) => item.id) }
    });
  };

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h1 className="assessment-title">{assessment.title}</h1>
        <div className="assessment-subtitle">Question {currentIndex + 1} of {questions.length}</div>
        <div className="assessment-pet" aria-live="polite">
          <span className="assessment-pet-icon" aria-hidden="true">🐶</span>
          <span className="assessment-pet-bubble">Let’s earn coins!</span>
        </div>
      </div>

      <div className="assessment-progress">
        <div className="assessment-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="assessment-question-card">
        <div className="assessment-question-header">
          <div className="assessment-question">{question.question}</div>
          <div className="assessment-type">{questionTypeLabel}</div>
        </div>
        {questionType === "drag-sort" ? (
          <div className="assessment-drag-panel">
            <div className="assessment-drag-bank">
              {availableItems.map((item) => (
                <div
                  key={item.id}
                  className="assessment-drag-item"
                  draggable={!isSubmitted}
                  onDragStart={() => handleDragStart(item.id)}
                >
                  <span className="assessment-drag-emoji">{item.emoji}</span>
                  <span className="assessment-drag-label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="assessment-drag-zones">
              <div
                className="assessment-drop-zone"
                onDragOver={handleDragOver}
                onDrop={() => handleDropToBucket("need")}
              >
                <div className="assessment-drop-title">{bucketLabels.need}</div>
                <div className="assessment-drop-items">
                  {needsItems.map((item) => (
                    <div
                      key={item.id}
                      className={`assessment-drop-item ${
                        isSubmitted
                          ? item.bucket === "need"
                            ? "correct"
                            : "incorrect"
                          : ""
                      }`}
                      draggable={!isSubmitted}
                      onDragStart={() => handleDragStart(item.id)}
                      onClick={() => returnItemToBank(item)}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="assessment-drop-zone"
                onDragOver={handleDragOver}
                onDrop={() => handleDropToBucket("want")}
              >
                <div className="assessment-drop-title">{bucketLabels.want}</div>
                <div className="assessment-drop-items">
                  {wantsItems.map((item) => (
                    <div
                      key={item.id}
                      className={`assessment-drop-item ${
                        isSubmitted
                          ? item.bucket === "want"
                            ? "correct"
                            : "incorrect"
                          : ""
                      }`}
                      draggable={!isSubmitted}
                      onDragStart={() => handleDragStart(item.id)}
                      onClick={() => returnItemToBank(item)}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : questionType === "matching" ? (
          <div className="assessment-matching">
            {matchingPairs.map((pair, index) => {
              const selection = matchingSelections[index] || "";
              const isCorrect = isSubmitted && selection === pair.right;
              const isIncorrect = isSubmitted && selection && selection !== pair.right;
              return (
                <div
                  key={`${pair.left}-${index}`}
                  className={`assessment-matching-row ${isCorrect ? "correct" : ""} ${
                    isIncorrect ? "incorrect" : ""
                  }`}
                >
                  <div className="assessment-matching-left">{pair.left}</div>
                  <select
                    className="assessment-matching-select"
                    value={selection}
                    onChange={(event) => handleMatchingChange(index, event.target.value)}
                    disabled={isSubmitted}
                  >
                    <option value="">Match to...</option>
                    {matchingOptions.map((option) => (
                      <option key={`${pair.left}-${option}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="assessment-options">
            {normalizedOptions.map((option, index) => (
              (() => {
                const isCorrect = isSubmitted && index === question.answerIndex;
                const isWrong =
                  isSubmitted && selectedIndex === index && index !== question.answerIndex;
                const classes = ["assessment-option", `tone-${index % 4}`];
                if (selectedIndex === index) classes.push("selected");
                if (isCorrect) classes.push("correct", "animate-correct");
                if (isWrong) classes.push("incorrect", "animate-shake");

                return (
              <button
                key={`${option.label}-${index}`}
                className={classes.join(" ")}
                onClick={() => selectAnswer(index)}
              >
                <div className="assessment-option-emoji">{option.emoji}</div>
                <div className="assessment-option-label">{option.label}</div>
                {option.subtitle ? (
                  <div className="assessment-option-subtitle">{option.subtitle}</div>
                ) : null}
              </button>
                );
              })()
            ))}
          </div>
        )}
      </div>

      {isSubmitted && (
        <div className="assessment-feedback animate-feedback">
          <div className="assessment-feedback-title">
            {selectedIndex === question.answerIndex ? "Nice job!" : "Good try!"}
          </div>
          <div className="assessment-feedback-text">{question.feedback}</div>
        </div>
      )}

      <div className="assessment-actions">
        <button
          className="assessment-action"
          onClick={goPrev}
          disabled={currentIndex === 0 || isSubmitted}
        >
          Back
        </button>

        {!isSubmitted ? (
          <button
            className="assessment-action primary"
            onClick={submitAnswer}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        ) : currentIndex < questions.length - 1 ? (
          <button className="assessment-action primary" onClick={goNext}>
            Next
          </button>
        ) : (
          <button className="assessment-action primary" onClick={submitQuiz}>
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default AssessmentQuiz;
