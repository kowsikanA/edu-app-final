import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import assessmentsData from "../../data/assessments";
import { addCoins } from "../../coinUtils";
import "./Assessments.css";

function AssessmentResults() {
  const { grade, unit } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const gradeKey = grade?.startsWith("grade") ? grade : `grade${grade}`;
  const assessment = assessmentsData[gradeKey]?.[unit];
  const answers = useMemo(() => location.state?.answers || [], [location.state]);
  const questionOrder = useMemo(() => location.state?.questionOrder || [], [location.state]);

  const results = useMemo(() => {
    if (!assessment) return [];
    const questionById = new Map(
      assessment.questions.map((question) => [question.id, question])
    );
    const orderedQuestions = questionOrder.length
      ? questionOrder.map((id) => questionById.get(id)).filter(Boolean)
      : assessment.questions;

    return orderedQuestions.map((question, index) => {
      const userIndex = answers[index];
      const isCorrect = userIndex === question.answerIndex;
      return { question, userIndex, isCorrect };
    });
  }, [assessment, answers, questionOrder]);

  const getOptionLabel = (option) => {
    if (typeof option === "string") return option;
    if (option && typeof option === "object") return option.label ?? "";
    return "";
  };

  const getResultSummary = (result) => {
    if (result.question.type === "drag-sort") {
      return result.userIndex === 1 ? "All placements correct" : "Some placements need fixing";
    }
    if (result.question.type === "matching") {
      return result.userIndex === 1 ? "All matches correct" : "Some matches are incorrect";
    }
    if (result.userIndex === null || result.userIndex === undefined) {
      return "No answer";
    }
    return getOptionLabel(result.question.options[result.userIndex]);
  };

  const getCorrectAnswer = (result) => {
    if (result.question.type === "drag-sort") {
      return "Needs and wants sorted correctly";
    }
    if (result.question.type === "matching") {
      return "Matches are correct";
    }
    return getOptionLabel(result.question.options[result.question.answerIndex]);
  };

  useEffect(() => {
    if (!assessment) return;
    if (!Array.isArray(answers) || answers.length === 0) return;

    const score = results.filter((result) => result.isCorrect).length;
    const total = results.length;
    const historyKey = `assessment_${gradeKey}_${unit}`;
    const raw = localStorage.getItem(historyKey);
    let history = [];
    if (raw) {
      try {
        history = JSON.parse(raw);
      } catch {
        history = [];
      }
    }

    history.push({
      score,
      total,
      when: new Date().toISOString()
    });

    localStorage.setItem(historyKey, JSON.stringify(history.slice(-10)));
    const reward = score === total ? 20 : score >= 3 ? 10 : 0;
    if (reward > 0) {
      const rewardKey = `reward_${gradeKey}_${unit}_${questionOrder.join("-")}_${answers.join("_")}`;
      if (!sessionStorage.getItem(rewardKey)) {
        sessionStorage.setItem(rewardKey, "1");
        addCoins(reward);
      }
    }
  }, [assessment, answers, gradeKey, unit, results, questionOrder]);

  if (!assessment) {
    return (
      <div className="assessment-container">
        <h1 className="assessment-title">Results</h1>
        <p className="assessment-subtitle">Results not available.</p>
        <button
          className="assessment-action"
          onClick={() => navigate(`/assessments/${grade}`)}
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  const score = results.filter((result) => result.isCorrect).length;
  const total = results.length;
  const percent = total ? Math.round((score / total) * 100) : 0;
  const scoreText = score >= 4 ? "Great job!" : score >= 3 ? "Nice work!" : "Keep practicing!";
  const scoreEmoji = score >= 4 ? "🌟" : score >= 3 ? "👏" : "💪";
  const isPerfect = score === total && total > 0;
  const reward = score === total ? 20 : score >= 3 ? 10 : 0;
  const rewardMessage = reward > 0 ? `You earned +${reward} coins!` : "Keep going to earn more coins!";
  const petMessage = reward > 0
    ? "Your pet loves smart choices!"
    : "Your pet gets stronger with practice.";
  const historyKey = `assessment_${gradeKey}_${unit}`;
  const historyRaw = localStorage.getItem(historyKey);
  let history = [];
  if (historyRaw) {
    try {
      history = JSON.parse(historyRaw);
    } catch {
      history = [];
    }
  }
  const recent = history.slice(-3).reverse();
  const units = Object.keys(assessmentsData[gradeKey] || {});
  const currentIndex = units.indexOf(unit);
  const nextUnit = currentIndex >= 0 ? units[currentIndex + 1] : null;

  return (
    <div className={`assessment-container ${isPerfect ? "confetti-on" : ""}`}>
      <div className="result-reward-banner">
        <div>
          <div className="result-reward-title">{rewardMessage}</div>
          <div className="result-reward-sub">{petMessage}</div>
        </div>
        <button
          className="temp-disable" title="Pet shop is work in progress"
          
        >
          ❌ Visit Pet Shop
        </button>
      </div>

      <div className="result-simple">
        <div className="result-emoji">{scoreEmoji}</div>
        <div className="result-title">Quiz Results</div>
        <div className="result-subtitle">{scoreText}</div>
        {reward > 0 && (
          <div className="result-reward">+{reward} coins</div>
        )}
        <div className="result-score-main">{score} / {total}</div>
        <div className="result-score-sub">{percent}% correct</div>
        <div className="result-bar">
          <div className="result-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {recent.length > 0 && (
        <div className="result-history">
          <div className="result-history-title">Recent scores</div>
          <div className="result-history-list">
            {recent.map((item, index) => (
              <div className="result-history-item" key={`${item.when}-${index}`}>
                {item.score} / {item.total}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="assessment-results">
        {results.map((result, index) => (
          <div
            key={result.question.id}
            className={`assessment-result-card ${result.isCorrect ? "correct" : "wrong"}`}
          >
            <div className="assessment-result-title">
              Q{index + 1}. {result.question.question}
            </div>
            <div className="assessment-result-row">
              Your answer: {getResultSummary(result)}
            </div>
            <div className="assessment-result-row">
              Correct answer: {getCorrectAnswer(result)}
            </div>
            <div className="assessment-result-feedback">{result.question.feedback}</div>
          </div>
        ))}
      </div>

      <div className="assessment-actions">
        <button
          className="assessment-action"
          onClick={() => navigate(`/assessments/${grade}`)}
        >
          Back to Assessments
        </button>
        {nextUnit && (
          <button
            className="assessment-action"
            onClick={() => navigate(`/assessment/${grade}/${nextUnit}`)}
          >
            Next Quiz
          </button>
        )}
        <button
          className="assessment-action primary"
          onClick={() => navigate(`/assessment/${grade}/${unit}`)}
        >
          Retry Quiz
        </button>
      </div>
    </div>
  );
}

export default AssessmentResults;
