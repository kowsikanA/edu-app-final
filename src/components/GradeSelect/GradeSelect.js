import React from "react";
import { useNavigate } from "react-router-dom";
import "./GradeSelect.css";

function GradeSelect() {
  const navigate = useNavigate();

  const saveGradeAndContinue = (grade) => {
    document.cookie = `userGrade=${grade}; path=/; max-age=${60 * 60 * 24 * 30}`;
    navigate("/dashboard");
  };

  return (
    <section className="grade-select-page">
      <div className="float circle f1"></div>
      <div className="float circle f2"></div>
      <div className="float circle f3"></div>
      <div className="float circle f4"></div>
      <div className="float circle f5"></div>

      <div className="float dollar d1">💰</div>
      <div className="float dollar d2">💵</div>
      <div className="float dollar d3">💲</div>
      <div className="float dollar d4">💸</div>

      <div className="content-layer">
        <div className="grade-card">
          <h1>🐻 PennyPals 🐻</h1>

          <p className="grade-question">Pick your grade! 🎮</p>

          <div className="grade-buttons">
            <button
              className="grade-btn grade-btn-4"
              onClick={() => saveGradeAndContinue("4")}
            >
              🎒 Grade 4
            </button>

            <button
              className="grade-btn grade-btn-disabled"
              disabled
              aria-disabled="true"
              title="Work in progress"
            >
              <span>📚 Grade 5</span>
              <span className="wip-badge">Work in Progress</span>
            </button>

            <button
              className="grade-btn grade-btn-disabled"
              disabled
              aria-disabled="true"
              title="Work in progress"
            >
              <span>🚀 Grade 6</span>
              <span className="wip-badge">Work in Progress</span>
            </button>
          </div>

          <p className="grade-note">
            Grade 4 is ready to play. Grade 5 and Grade 6 are coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GradeSelect;