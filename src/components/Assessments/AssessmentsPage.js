import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import assessmentsData from "../../data/assessments";
import lessonsData from "../../data/lessons";
import "./Assessments.css";

function AssessmentsPage() {
  const { grade } = useParams();
  const navigate = useNavigate();

  const gradeKey = grade?.startsWith("grade") ? grade : `grade${grade}`;
  const gradeLabel = gradeKey.replace("grade", "");

  const gradeAssessments = assessmentsData[gradeKey];

  if (!gradeAssessments) {
    return (
      <div className="assessment-container">
        <h1 className="assessment-title">Assessments</h1>
        <p className="assessment-subtitle">No assessments found for Grade {grade}.</p>
      </div>
    );
  }

  const units = Object.keys(gradeAssessments);
  const unitMeta = {
    unit1: { title: "Needs vs Wants", subtitle: "", emoji: "🧠" },
    unit2: { title: "Smart Shopping", subtitle: "", emoji: "🛒" },
    unit3: { title: "Saving Goals", subtitle: "", emoji: "🎯" },
    unit4: { title: "Money Moves", subtitle: "", emoji: "💼" },
    unit5: { title: "Money Adventure", subtitle: "", emoji: "⭐" },
    unit6: { title: "Bonus Quest", subtitle: "", emoji: "🚀" }
  };

  return (
    <div className="assessment-container">
      <div className="assessments-floating" aria-hidden="true">
        <span className="assessments-float assessments-u1">💰</span>
        <span className="assessments-float assessments-u2">🎁</span>
        <span className="assessments-float assessments-u3">💎</span>
        <span className="assessments-float assessments-u4">⭐</span>
        <span className="assessments-float assessments-u5">🪙</span>
        <span className="assessments-float assessments-u6">💸</span>
        <span className="assessments-float assessments-u7">📚</span>
        <span className="assessments-float assessments-u8">✨</span>
        <span className="assessments-float assessments-u9">🎯</span>
        <span className="assessments-float assessments-u10">💵</span>
      </div>

      <div className="assessment-hero playful">
        <div>
          <div className="assessment-badge">Grade {gradeLabel}</div>
          <h1 className="assessment-title">Money Missions 🎮</h1>
          <p className="assessment-subtitle">Finish lessons → unlock quizzes → earn coins</p>
        </div>
      </div>

      <div className="assessment-layout minimal">
        <div className="assessment-left">
          {units.map((unit) => {
            const meta = unitMeta[unit] || { title: gradeAssessments[unit].title, subtitle: "", emoji: "✅" };
            const lessons = lessonsData[gradeKey]?.[unit] || [];
            const progressKey = `progress_${gradeKey}_${unit}`;
            const completedLessons = JSON.parse(localStorage.getItem(progressKey)) || [];
            const progressPercent = lessons.length
              ? Math.round((completedLessons.length / lessons.length) * 100)
              : 0;
            const isLocked = lessons.length > 0 && completedLessons.length < lessons.length;
            const rewardText = "+20 coins";
            const unitLabel = `Unit ${unit.replace("unit", "")}`;

            return (
              <button
                key={unit}
                className={`assessment-level-card ${isLocked ? "locked" : ""}`}
                onClick={() => {
                  if (isLocked) {
                    navigate(`/lessons/${gradeKey}/${unit}`);
                    return;
                  }
                  navigate(`/assessment/${grade}/${unit}`);
                }}
              >
                <div className="assessment-level-head">
                  <div className="assessment-level-icon">{meta.emoji}</div>
                  <div>
                    <div className="assessment-level-title">{unitLabel}</div>
                    <div className="assessment-level-sub">{meta.title}</div>
                  </div>
                  <div className="assessment-level-reward">{rewardText}</div>
                </div>
                {isLocked ? (
                  <div className="assessment-level-actions">
                    <span className="assessment-level-lock">🔒 Finish lesson first</span>
                  </div>
                ) : null}
                <div className="assessment-level-progress">
                  <div className="assessment-level-progress-bar" style={{ width: `${progressPercent}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default AssessmentsPage;
