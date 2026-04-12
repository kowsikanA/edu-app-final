// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getGradeCookie } from "../../cookieUtils";
// import { useCoins } from "../../coinUtils";
// import "./HomePage.css";

// function HomePage() {
//   const navigate = useNavigate();
//   const [grade, setGrade] = useState(undefined);
//   const [coins] = useCoins();

//   useEffect(() => {
//     const savedGrade = getGradeCookie();
//     setGrade(savedGrade || null);
//   }, []);

//   useEffect(() => {
//     if (grade === null) {
//       navigate("/", { replace: true });
//     }
//   }, [grade, navigate]);

//   const changeGrade = () => {
//     document.cookie = "userGrade=; path=/; max-age=0";
//     navigate("/", { replace: true, state: { reset: true } });
//   };

//   if (grade === undefined) {
//     return null;
//   }

//   return (
//     <div className="home-shell">
//       <div className="floating-emoji e1">💰</div>
//       <div className="floating-emoji e2">🎁</div>
//       <div className="floating-emoji e3">💎</div>

//       <div className="floating-emoji e4">⭐</div>
//       <div className="floating-emoji e5">💵</div>

//       <div className="floating-emoji e6">💸</div>
//       <div className="floating-emoji e7">🪙</div>
//       <div className="floating-emoji e8">⭐</div>

//       <div className="floating-emoji e9">💰</div>
//       <div className="floating-emoji e10">🎁</div>

//       <div className="floating-emoji e11">💰</div>
//       <div className="floating-emoji e12">💎</div>

//       <div className="floating-emoji e13">⭐</div>
//       <div className="floating-emoji e14">🪙</div>
//       <div className="floating-emoji e15">💸</div>

//       <div className="top-bar">
//         <h2>Hi there! 👋</h2>
//         <p>Let’s earn some coins today! 💰</p>

//         <button className="change-grade-btn" onClick={changeGrade}>
//           🔄 Change Grade
//         </button>
//       </div>

//       <div className="pet-area">
//         <div className="pet-placeholder">🐶</div>
//       </div>

//       <div className="coins-display">🪙 {coins}</div>

//       <div className="action-grid">
//         <button
//           className="action-btn blue"
//           onClick={() => navigate(`/units/${grade}`)}
//         >
//           <span>📚</span>
//           <span>Lessons</span>
//         </button>

//         <button
//           className="action-btn green"
//           onClick={() => navigate(`/assessments/${grade}`)}
//         >
//           <span>💯</span>
//           <span>Test</span>
//         </button>

//         <button
//           className="action-btn action-btn-disabled"
//           disabled
//           aria-disabled="true"
//           title="Work in progress"
//         >
//           <span>🎁</span>
//           <span>Pet Shop</span>
//           <span className="coming-soon-badge">Work in Progress</span>
//         </button>

//         <button
//           className="action-btn action-btn-disabled"
//           disabled
//           aria-disabled="true"
//           title="Work in progress"
//         >
//           <span>📈</span>
//           <span>Invest</span>
//           <span className="coming-soon-badge">Work in Progress</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HomePage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGradeCookie } from "../../cookieUtils";
import { useCoins } from "../../coinUtils";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [grade, setGrade] = useState(undefined);
  const [coins] = useCoins();

  // 🔥 Load grade from cookie on mount
  useEffect(() => {
    const savedGrade = getGradeCookie();
    setGrade(savedGrade || null);
  }, []);

  // 🔥 Handle loading state
  if (grade === undefined) {
    return null;
  }

  // 🔥 CRITICAL: handle missing grade properly
  if (grade === null) {
    navigate("/", { replace: true });
    return null;
  }

  // 🔥 Change grade handler (FIXED)
  const changeGrade = () => {
  document.cookie = "userGrade=; path=/; max-age=0";

  // 🔥 HARD RESET (fixes EVERYTHING)
  window.location.replace("/");
};

  return (
    <div className="home-shell">
      <div className="floating-emoji e1">💰</div>
      <div className="floating-emoji e2">🎁</div>
      <div className="floating-emoji e3">💎</div>

      <div className="floating-emoji e4">⭐</div>
      <div className="floating-emoji e5">💵</div>

      <div className="floating-emoji e6">💸</div>
      <div className="floating-emoji e7">🪙</div>
      <div className="floating-emoji e8">⭐</div>

      <div className="floating-emoji e9">💰</div>
      <div className="floating-emoji e10">🎁</div>

      <div className="floating-emoji e11">💰</div>
      <div className="floating-emoji e12">💎</div>

      <div className="floating-emoji e13">⭐</div>
      <div className="floating-emoji e14">🪙</div>
      <div className="floating-emoji e15">💸</div>

      <div className="top-bar">
        <h2>Hi there! 👋</h2>
        <p>Let’s earn some coins today! 💰</p>

        <button className="change-grade-btn" onClick={changeGrade}>
          🔄 Change Grade
        </button>
      </div>

      <div className="pet-area">
        <div className="pet-placeholder">🐶</div>
      </div>

      <div className="coins-display">🪙 {coins}</div>

      <div className="action-grid">
        <button
          className="action-btn blue"
          onClick={() => navigate(`/units/${grade}`)}
        >
          <span>📚</span>
          <span>Lessons</span>
        </button>

        <button
          className="action-btn green"
          onClick={() => navigate(`/assessments/${grade}`)}
        >
          <span>💯</span>
          <span>Test</span>
        </button>

        <button
          className="action-btn pink"
          onClick={() => navigate(`/pet-shop`)}
          aria-disabled="true"
        >
          <span>🎁</span>
          <span>Pet Shop</span>
          {/* <span className="coming-soon-badge">Work in Progress</span> */}
        </button>

<button
  className="action-btn yellow"
  // onClick={() => navigate("/investments")}
  onClick={() => navigate(`/simulator`)}
>
  <span>📈</span>
  <span>Invest</span>
</button>
      </div>
    </div>
  );
}

export default HomePage;