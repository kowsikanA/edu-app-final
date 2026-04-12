import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import lessonsData from "../../data/lessons";
import "./LessonList.css";

function LessonList() {
  const { grade, unit } = useParams();
  const navigate = useNavigate();

  const lessons = lessonsData[grade][unit];

  if (!lessons) {
    return <h2>Lessons not found</h2>;
  }

  const progressKey = `progress_${grade}_${unit}`;
  const completedLessons =
    JSON.parse(localStorage.getItem(progressKey)) || [];

  const progressPercent =
    (completedLessons.length / lessons.length) * 100;

  const gradeLabel = grade.startsWith("grade")
    ? grade.replace("grade", "")
    : grade;

  const isComplete =
    lessons.length > 0 &&
    completedLessons.length === lessons.length;

  const unitIcons = {
    savings: ["💰", "🏦", "🪙", "💵"],
    spending: ["🛍️", "🎮", "🍕", "🎁"],
    earning: ["💼", "🧑‍💻", "📈", "💸"],
    investing: ["📊", "📈", "💹", "🚀"],
    banking: ["🏦", "💳", "📱", "💰"],
    default: ["⭐", "✨", "🎯", "📚"]
  };

  const icons = unitIcons[unit.toLowerCase()] || unitIcons.default;

  return (
    <section className="lesson-page-simple">
      <div className="lesson-header">
        <div className="lesson-badge">Grade {gradeLabel}</div>
        <h1>{unit.toUpperCase()}</h1>
        <p>Tap a lesson to start 🚀</p>
      </div>

      <div className="lesson-progress-simple">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="progress-text">
          {Math.round(progressPercent)}% Complete
        </div>
      </div>

      <div className="lesson-stack">
        {lessons.map((lesson, index) => {
          const done = completedLessons.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() =>
                navigate(`/lessonIntro/${grade}/${unit}/${lesson.id}`)
              }
              className={`lesson-card-simple ${done ? "done" : ""}`}
            >
              <div className="lesson-reward-badge">🪙 +10</div>

              <div className="lesson-left">
                <div className="lesson-icon">
                  {icons[index % icons.length]}
                </div>

                <div className="lesson-title">
                  {lesson.title}
                </div>
              </div>

              <div className="lesson-status">
                {done ? "✅ Done" : "Start"}
              </div>
            </button>
          );
        })}
      </div>

      {isComplete && (
        <div className="lesson-complete-box">
          🎉 Unit Complete!

          <button
            onClick={() =>
              navigate(`/assessment/${grade}/${unit}`)
            }
            className="start-quiz-btn"
          >
            Take Quiz 🚀
          </button>
        </div>
      )}
    </section>
  );
}

export default LessonList;