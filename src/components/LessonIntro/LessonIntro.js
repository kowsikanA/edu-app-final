import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import lessonsData from "../../data/lessons";
import "./LessonIntro.css";

function LessonIntro() {
  const { grade, unit, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const savedQuestion = location.state?.currentQuestion ?? 0;
  const unitLesson = lessonsData[grade]?.[unit];

  if (!unitLesson) return <h2>Unit not found</h2>;

  const lesson = unitLesson.find((l) => l.id === Number(lessonId));
  if (!lesson) return <h2>Lesson not found</h2>;

  const startLesson = () => {
    navigate(`/lesson/lessons/${grade}/${unit}/${lessonId}`, {
      state: { currentQuestion: savedQuestion }
    });
  };

  return (
    <div className="intro-page">

      {/* HEADER */}
      <div className="intro-header">
        <div className="intro-badge">Lesson {lessonId}</div>
        <h1>{lesson.title}</h1>
      </div>

      {/* 🎯 WHAT YOU'LL LEARN (NO DROPDOWN) */}
      <div className="learn-box">
        <div className="learn-title">🎯 What you'll learn</div>

        {(lesson.context || []).map((item, index) => (
          <div key={index} className="learn-item">

            {/* TERM */}
            <div className="learn-term">
              {item.term}
            </div>

            {/* ALWAYS VISIBLE DEFINITION */}
            <div className="learn-content">
              {item.definition}
            </div>

          </div>
        ))}
      </div>

      {/* TIP */}
      {lesson.tips && (
        <div className="intro-tip">
          💡 {lesson.tips}
        </div>
      )}

      {/* BUTTON */}
      <button onClick={startLesson} className="intro-btn">
        {savedQuestion > 0 ? "Continue 🚀" : "Start Lesson 🚀"}
      </button>
    </div>
  );
}

export default LessonIntro;