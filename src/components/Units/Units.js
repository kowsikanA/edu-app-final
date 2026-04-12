// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import lessonsData from "../../data/lessons";
// import "./Units.css";

// function Units() {
//   const { grade } = useParams();
//   const navigate = useNavigate();

//   const gradeKey = `grade${grade}`;
//   const gradeLabel = grade?.startsWith("grade") ? grade.replace("grade", "") : grade;
//   const units = lessonsData[gradeKey];

//   if (!units) {
//     return (
//       <div style={{ padding: "40px" }}>
//         <h2>Grade not found</h2>
//         <button onClick={() => navigate("/")}>Go Back</button>
//       </div>
//     );
//   }

//   const unitKeys = Object.keys(units);
//   const unitSummaries = unitKeys.map((unitKey) => {
//     const totalLessons = units[unitKey].length;
//     const progressKey = `progress_${gradeKey}_${unitKey}`;
//     const completedLessons = JSON.parse(localStorage.getItem(progressKey)) || [];
//     const progressPercent = totalLessons
//       ? Math.round((completedLessons.length / totalLessons) * 100)
//       : 0;
//     return {
//       unitKey,
//       totalLessons,
//       completedLessons: completedLessons.length,
//       progressPercent
//     };
//   });

//   const nextUnit = unitSummaries.find((item) => item.progressPercent < 100) || unitSummaries[0];
//   const totalLessons = unitSummaries.reduce((sum, item) => sum + item.totalLessons, 0);
//   const totalCompleted = unitSummaries.reduce((sum, item) => sum + item.completedLessons, 0);
//   const overallPercent = totalLessons ? Math.round((totalCompleted / totalLessons) * 100) : 0;
//   const unitIcons = {savings: "💰", spending: "🛍️", earning: "💵", investing: "📈", banking: "🏦", default: "⭐"};

//   return (
//     <section className="units-page">
//       <div className="units-top">
//         <div className="units-hero">
//           <div>
//             <div className="units-badge">Grade {gradeLabel}</div>
//             <h1>Choose a Unit</h1>
//             <p>Pick a unit and start learning!</p>
//           </div>
//         </div>

//         <aside className="units-side">
//           {nextUnit && (
//             <div className="units-side-card accent">
//               <div className="units-side-title">Next Up</div>
//               <div className="units-side-main">{nextUnit.unitKey.toUpperCase()}</div>
//               <div className="units-side-sub">
//                 {nextUnit.completedLessons}/{nextUnit.totalLessons} lessons completed
//               </div>
//               <div className="units-side-progress">
//                 <div
//                   className="units-side-progress-bar"
//                   style={{ width: `${nextUnit.progressPercent}%` }}
//                 />
//               </div>
//               <button
//                 className="units-side-button"
//                 onClick={() => navigate(`/lessons/${gradeKey}/${nextUnit.unitKey}`)}
//               >
//                 Continue Unit
//               </button>
//             </div>
//           )}

//           <div className="units-side-card">
//             <div className="units-side-title">Overall Progress</div>
//             <div className="units-side-main">{overallPercent}%</div>
//             <div className="units-side-sub">
//               {totalCompleted}/{totalLessons} lessons completed
//             </div>
//             <div className="units-side-progress">
//               <div className="units-side-progress-bar" style={{ width: `${overallPercent}%` }} />
//             </div>
//             <div className="units-tip">Tip: Compare prices before you buy.</div>
//           </div>
//         </aside>
//       </div>

//       <div className="unit-grid">
//         {unitSummaries.map((summary) => (
//           <button
//             key={summary.unitKey}
//             className="unit-card"
//             onClick={() => navigate(`/lessons/${gradeKey}/${summary.unitKey}`)}
//           >
//             <div className="unit-card-head">
//               <div className="unit-title">{summary.unitKey.toUpperCase()}</div>
//               <div className="unit-progress-pill">{summary.progressPercent}%</div>
//             </div>

//             <div className="unit-meta">
//               {summary.completedLessons}/{summary.totalLessons} lessons completed
//             </div>

//             <div className="unit-progress">
//               <div className="unit-progress-bar" style={{ width: `${summary.progressPercent}%` }} />
//             </div>

//             <div className="unit-footer">
//               <span>Continue</span>
//               <span>→</span>
//             </div>
//           </button>
//         ))}
//       </div>

//       <div className="units-floating">
//   <span className="float u1">💰</span>
//   <span className="float u2">⭐</span>
//   <span className="float u3">💎</span>
//   <span className="float u4">🪙</span>
//   <span className="float u5">🎁</span>
// </div>
//     </section>
//   );
// }

// export default Units;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import lessonsData from "../../data/lessons";
import "./Units.css";

function Units() {
  const { grade } = useParams();
  const navigate = useNavigate();

  const gradeKey = `grade${grade}`;
  const gradeLabel = grade?.startsWith("grade")
    ? grade.replace("grade", "")
    : grade;

  const units = lessonsData[gradeKey];

  if (!units) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Grade not found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const unitKeys = Object.keys(units).filter(
    (key) => key.toLowerCase() !== "game"
  );

  const unitSummaries = unitKeys.map((unitKey) => {
    const totalLessons = units[unitKey].length;
    const progressKey = `progress_${gradeKey}_${unitKey}`;
    const completedLessons =
      JSON.parse(localStorage.getItem(progressKey)) || [];

    const progressPercent = totalLessons
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

    return {
      unitKey,
      progressPercent
    };
  });

  return (
    <section className="units-page">
      <div className="units-header">
        <div className="units-badge">Grade {gradeLabel}</div>
        <h1>Pick a Unit 📖</h1>
        <p>Choose where you want to start!</p>
      </div>

      <div className="units-floating">
        <span className="units-float units-u1">💰</span>
        <span className="units-float units-u2">⭐</span>
        <span className="units-float units-u3">💎</span>
        <span className="units-float units-u4">🪙</span>
        <span className="units-float units-u5">🎁</span>

        <span className="units-float units-u6">📚</span>
        <span className="units-float units-u7">🧠</span>
        <span className="units-float units-u8">✨</span>
        <span className="units-float units-u9">🏆</span>
        <span className="units-float units-u10">💸</span>
      </div>

      <div className="unit-grid">
        {unitSummaries.map((summary, index) => (
          <button
            key={summary.unitKey}
            className="unit-card"
            onClick={() => navigate(`/lessons/${gradeKey}/${summary.unitKey}`)}
          >
            <div className="unit-number">{index + 1}</div>

            <div className="unit-reward-badge">🪙 +30</div>

            <div className="unit-title">
              {summary.unitKey.split(/(?=\d)/).join(" ").toUpperCase()}
            </div>

            <div className="unit-progress">
              <div
                className="unit-progress-bar"
                style={{ width: `${summary.progressPercent}%` }}
              />
            </div>

            <div className="unit-percent">{summary.progressPercent}%</div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Units;

// .units-page {
//   min-height: 100vh;
//   padding: 32px clamp(20px, 6vw, 64px) 60px;
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   color: var(--ink-900);
//   position: relative;
// }

// .units-page::before,
// .units-page::after {
//   content: "";
//   position: absolute;
//   width: 320px;
//   height: 320px;
//   border-radius: 50%;
//   filter: blur(0);
//   opacity: 0.28;
//   z-index: 0;
// }

// .units-page::before {
//   top: -80px;
//   right: 6%;
//   background: radial-gradient(circle, #ffd166 0%, transparent 70%);
// }

// .units-page::after {
//   bottom: -100px;
//   left: 4%;
//   background: radial-gradient(circle, #9dd6ff 0%, transparent 70%);
// }

// .units-page > * {
//   position: relative;
//   z-index: 1;
// }

// .units-top {
//   display: grid;
//   grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.7fr);
//   gap: 18px;
//   align-items: stretch;
// }

// .units-hero {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background: var(--panel-strong);
//   border-radius: 24px;
//   padding: 24px 28px;
//   box-shadow: var(--shadow-soft);
//   border: 1px solid rgba(0, 0, 0, 0.08);
// }

// .units-hero h1 {
//   margin: 0;
//   font-size: clamp(28px, 3vw, 36px);
//   font-family: var(--title-font);
// }

// .units-hero p {
//   margin: 6px 0 0;
//   color: var(--ink-700);
// }

// .units-badge {
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   background: var(--accent-warm);
//   padding: 6px 14px;
//   border-radius: 999px;
//   font-weight: 700;
//   margin-bottom: 10px;
// }

// .units-side {
//   display: grid;
//   gap: 14px;
// }

// .units-side-card {
//   background: #ffffff;
//   border-radius: 20px;
//   padding: 18px;
//   border: 1px solid rgba(0, 0, 0, 0.08);
//   box-shadow: 0 12px 20px rgba(15, 23, 42, 0.08);
//   display: grid;
//   gap: 8px;
// }

// .units-side-card.accent {
//   background: linear-gradient(135deg, #fff6d5, #ffffff);
// }

// .units-side-title {
//   font-size: 13px;
//   text-transform: uppercase;
//   letter-spacing: 0.8px;
//   color: var(--ink-600);
//   font-weight: 700;
// }

// .units-side-main {
//   font-size: 20px;
//   font-weight: 800;
// }

// .units-side-sub {
//   color: var(--ink-600);
//   font-size: 13px;
// }

// .units-side-progress {
//   height: 10px;
//   background: #e5e7eb;
//   border-radius: 999px;
//   overflow: hidden;
// }

// .units-side-progress-bar {
//   height: 100%;
//   background: linear-gradient(120deg, #a78bfa, #60a5fa);
//   border-radius: 999px;
// }

// .units-side-button {
//   border: none;
//   border-radius: 14px;
//   padding: 10px 14px;
//   font-weight: 700;
//   background: var(--accent-strong);
//   color: #0b1220;
//   cursor: pointer;
// }

// .units-tip {
//   font-size: 13px;
//   color: #6b5b3e;
//   background: #fff4c7;
//   padding: 8px 10px;
//   border-radius: 12px;
// }

// .unit-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//   gap: 18px;
// }

// /* .unit-card {
//   background: #ffffff;
//   border: 1px solid rgba(0, 0, 0, 0.08);
//   border-radius: 20px;
//   padding: 18px 20px;
//   text-align: left;
//   box-shadow: 0 12px 20px rgba(15, 23, 42, 0.08);
//   cursor: pointer;
//   transition: transform 0.15s ease, box-shadow 0.2s ease;
// } */

// .unit-card {
//   background: #ffffff;
//   border-radius: 22px;
//   padding: 20px;
//   text-align: left;

//   border: none;
//   box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);

//   cursor: pointer;
//   transition: transform 0.2s ease, box-shadow 0.2s ease;

//   position: relative;
//   overflow: hidden;
// }

// /* .unit-card:hover {
//   transform: translateY(-3px);
//   box-shadow: 0 18px 26px rgba(15, 23, 42, 0.12);
// } */

// .unit-card:hover {
//   transform: scale(1.05) rotate(-1deg);
//   box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
// }

// .unit-card-head {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 8px;
// }

// .unit-title {
//   font-size: 18px;
//   font-weight: 800;
// }

// .unit-progress-pill {
//   background: #eef2ff;
//   color: #4338ca;
//   font-weight: 800;
//   padding: 4px 10px;
//   border-radius: 999px;
//   font-size: 12px;
// }

// .unit-meta {
//   color: var(--ink-600);
//   font-size: 13px;
//   margin-bottom: 12px;
// }

// .unit-progress {
//   height: 10px;
//   border-radius: 999px;
//   background: #e5e7eb;
//   overflow: hidden;
// }

// .unit-progress-bar {
//   height: 100%;
//   background: linear-gradient(120deg, #a78bfa, #60a5fa);
//   border-radius: 999px;
// }

// .unit-footer {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 14px;
//   font-weight: 700;
//   color: var(--ink-700);
// }

// .unit-title {
//   font-size: 18px;
//   font-weight: 800;
//   display: flex;
//   align-items: center;
//   gap: 10px;
// }

// .unit-emoji {
//   font-size: 28px;
// }

// .units-floating {
//   position: absolute;
//   inset: 0;
//   pointer-events: none;
//   z-index: 0;
// }

// .float {
//   position: absolute;
//   font-size: 28px;
//   opacity: 0.15;
//   animation: floatUnit 6s ease-in-out infinite;
// }

// /* positions */
// .u1 { top: 15%; left: 10%; }
// .u2 { top: 25%; right: 12%; }
// .u3 { bottom: 20%; left: 15%; }
// .u4 { bottom: 15%; right: 10%; }
// .u5 { top: 50%; left: 50%; }

// /* animation */
// @keyframes floatUnit {
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-20px); }
//   100% { transform: translateY(0px); }
// }

// @media (max-width: 980px) {
//   .units-top {
//     grid-template-columns: 1fr;
//   }
// }

