// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DragandDropLesson.css";

function DragandDropLesson({ lesson, grade, unit, lessonId }) {
  const navigate = useNavigate();

  const currentQuestion = useMemo(() => {
    return lesson?.questions?.[0];
  }, [lesson]);

  const [availableItems, setAvailableItems] = useState(currentQuestion?.items || []);
  const [needsItems, setNeedsItems] = useState([]);
  const [wantsItems, setWantsItems] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);

  if (!lesson || !currentQuestion) {
    return <h2>Lesson not found</h2>;
  }

  const totalItems = currentQuestion.items.length;
  const sortedCount = needsItems.length + wantsItems.length;
  const progress = (sortedCount / totalItems) * 100;

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFromAvailable = (itemId) => {
    setAvailableItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleDrop = (category) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.type === category;

    if (!isCorrect) {
      setFeedback(
        `Try again 💡 Think about whether ${draggedItem.name} is something you must have or just something nice to have.`
      );
      setDraggedItem(null);
      return;
    }

    if (category === "need") {
      setNeedsItems((prev) => [...prev, draggedItem]);
    } else {
      setWantsItems((prev) => [...prev, draggedItem]);
    }

    removeFromAvailable(draggedItem.id);
    setFeedback(
      `Nice job! ${draggedItem.name} belongs in ${category === "need" ? "Needs" : "Wants"} ✅`
    );
    setDraggedItem(null);
  };

  const markLessonComplete = () => {
    const key = `progress_${grade}_${unit}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];

    if (!saved.includes(Number(lessonId))) {
      const updated = [...saved, Number(lessonId)];
      localStorage.setItem(key, JSON.stringify(updated));
    }
  };

  const handleFinish = () => {
    markLessonComplete();
    navigate(`/lessons/${grade}/${unit}`);
  };

  return (
    <div className="drag-lesson-container">
      <div className="progress-bar-border">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="lesson-title">
        Lesson {lessonId} - {lesson.title}
      </p>

      <div className="drag-scenario-box">
        {currentQuestion.scenarioTitle && (
          <h3 className="drag-scenario-title">{currentQuestion.scenarioTitle}</h3>
        )}
        {currentQuestion.scenarioText && (
          <p className="drag-scenario-text">{currentQuestion.scenarioText}</p>
        )}
      </div>

      {currentQuestion.images?.[0]?.questionImg && (
        <img
          src={currentQuestion.images[0].questionImg}
          alt="sorting lesson"
          className="drag-main-image"
        />
      )}

      <h3 className="drag-prompt">{currentQuestion.question}</h3>

      <div className="drop-zones">
        <div
          className="drop-zone needs-zone"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("need")}
        >
          <h3>Needs</h3>
          <div className="dropped-items">
            {needsItems.map((item) => (
              <div key={item.id} className="dropped-card">
                <img src={item.img} alt={item.name} className="drop-item-img" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="drop-zone wants-zone"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("want")}
        >
          <h3>Wants</h3>
          <div className="dropped-items">
            {wantsItems.map((item) => (
              <div key={item.id} className="dropped-card">
                <img src={item.img} alt={item.name} className="drop-item-img" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="drag-items-bank">
        {availableItems.map((item) => (
          <div
            key={item.id}
            className="drag-item-card"
            draggable
            onDragStart={() => handleDragStart(item)}
          >
            <img src={item.img} alt={item.name} className="drag-item-img" />
            <p className="drag-item-name">{item.name}</p>
          </div>
        ))}
      </div>

      {feedback && (
        <div
          className="drag-feedback-box"
          style={{
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            color: "#78350f"
          }}
        >
          {feedback}
        </div>
      )}

      <button
        className="finish-btn"
        onClick={handleFinish}
        disabled={sortedCount !== totalItems}
      >
        Finish
      </button>
    </div>
  );
}

export default DragandDropLesson;