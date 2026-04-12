// import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import { useState, useEffect } from "react";

// import HomePage from './components/HomePage/HomePage';
// import PetShopPage from './components/PetShopPage';
// import PetMascot from './components/PetMascot';
// import GradeSelect from "./components/GradeSelect/GradeSelect";
// import Units from "./components/Units/Units";
// import LessonList from "./components/LessonList/LessonList";
// import Lessons from "./components/Lessons/Lesson";
// import LessonIntro from "./components/LessonIntro/LessonIntro";
// import SimulatorGame from './components/SimulatorGame/SimulatorGame';
// import AssessmentsPage from "./components/Assessments/AssessmentsPage";
// import AssessmentQuiz from "./components/Assessments/AssessmentQuiz";
// import AssessmentResults from "./components/Assessments/AssessmentResults";
// import Investments from "./components/Investments/Investments";

// import { getGradeCookie } from "./cookieUtils";

// function App() {
//   const [grade, setGrade] = useState(getGradeCookie());

//   // Accessibility settings
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("darkMode") === "true";
//   });

//   const [contrastMode, setContrastMode] = useState(() => {
//     return localStorage.getItem("contrastMode") === "true";
//   });

//   const [largeText, setLargeText] = useState(() => {
//     return localStorage.getItem("largeText") === "true";
//   });

//   // Keep grade in sync with cookie
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const current = getGradeCookie();
//       setGrade(current);
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   // Save accessibility settings
//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//     localStorage.setItem("contrastMode", contrastMode);
//     localStorage.setItem("largeText", largeText);
//   }, [darkMode, contrastMode, largeText]);

//   // Apply accessibility classes to body
//   useEffect(() => {
//     document.body.classList.toggle("theme-dark", darkMode);
//     document.body.classList.toggle("theme-contrast", contrastMode);
//     document.body.classList.toggle("text-large", largeText);
//   }, [darkMode, contrastMode, largeText]);

//   return (
//     <Router>
//       <div className="app-shell">
//         <Navbar />

//         <AccessibilityPanel
//           darkMode={darkMode}
//           contrastMode={contrastMode}
//           largeText={largeText}
//           setDarkMode={setDarkMode}
//           setContrastMode={setContrastMode}
//           setLargeText={setLargeText}
//         />

//         <Routes>
//           <Route
//             path="/"
//             element={
//               grade
//                 ? <Navigate to="/dashboard" replace />
//                 : <GradeSelect key={Date.now()} />
//             }
//           />

//           <Route path="/grade" element={<Navigate to="/" replace />} />

//           <Route
//             path="/dashboard"
//             element={grade ? <HomePage /> : <Navigate to="/" replace />}
//           />

//           <Route path="/units/:grade" element={<Units />} />
//           <Route path="/lessons/:grade/:unit" element={<LessonList />} />
//           <Route path="/lessonIntro/:grade/:unit/:lessonId" element={<LessonIntro />} />
//           <Route path="/lesson/lessons/:grade/:unit/:lessonId" element={<Lessons />} />

//           <Route path="/assessments/:grade" element={<AssessmentsPage />} />
//           <Route path="/assessment/:grade/:unit" element={<AssessmentQuiz />} />
//           <Route path="/assessment/:grade/:unit/results" element={<AssessmentResults />} />

//           <Route path="/pet-shop" element={<PetShopPage darkMode={darkMode} />} />
//           <Route path="/investments" element={<Investments />} />
//           <Route path="/simulator" element={<SimulatorGame />} />
//         </Routes>

//         <PetMascotWrapper />
//       </div>
//     </Router>
//   );
// }

// function AccessibilityPanel({
//   darkMode,
//   contrastMode,
//   largeText,
//   setDarkMode,
//   setContrastMode,
//   setLargeText
// }) {
//   return (
//     <div className="accessibility-panel">
//       <div className="accessibility-title">Accessibility</div>

//       <button
//         className={`accessibility-btn ${darkMode ? "active" : ""}`}
//         onClick={() => setDarkMode(!darkMode)}
//         aria-pressed={darkMode}
//       >
//         {darkMode ? "✅" : "🌙"} Dark Mode
//       </button>

//       <button
//         className={`accessibility-btn ${contrastMode ? "active" : ""}`}
//         onClick={() => setContrastMode(!contrastMode)}
//         aria-pressed={contrastMode}
//       >
//         {contrastMode ? "✅" : "🎯"} Contrast Mode
//       </button>

//       {/* <button
//         className={`accessibility-btn ${largeText ? "active" : ""}`}
//         onClick={() => setLargeText(!largeText)}
//         aria-pressed={largeText}
//       >
//         {largeText ? "✅" : "🔎"} Larger Text
//       </button> */}
//     </div>
//   );
// }

// // Wrapper to access useLocation inside Router
// function PetMascotWrapper() {
//   const location = useLocation();

//   let pageType = "";
//   let lessonId = "";
//   let quizId = "";

//   if (location.pathname.includes("/lesson/lessons/")) {
//     pageType = "lesson";
//     const parts = location.pathname.split("/");
//     lessonId = parts[parts.length - 1];
//   } else if (location.pathname.includes("/lessonIntro/")) {
//     pageType = "lesson";
//     const parts = location.pathname.split("/");
//     lessonId = parts[parts.length - 1];
//   } else if (location.pathname.includes("/lessons/")) {
//     pageType = "lesson";
//     const parts = location.pathname.split("/");
//     lessonId = parts[parts.length - 1];
//   } else if (location.pathname.includes("/assessment/") && !location.pathname.includes("/assessments/")) {
//     pageType = "quiz";
//     const parts = location.pathname.split("/");
//     quizId = parts[parts.length - 2];
//   } else if (location.pathname.includes("/pet-shop")) {
//     pageType = "shop";
//   }

//   return (
//     <PetMascot
//       currentPath={location.pathname}
//       pageType={pageType}
//       lessonId={lessonId}
//       quizId={quizId}
//     />
//   );
// }

// export default App;


import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

import HomePage from './components/HomePage/HomePage';
import PetShopPage from './components/PetShopPage';
import PetMascot from './components/PetMascot';
import GradeSelect from "./components/GradeSelect/GradeSelect";
import Units from "./components/Units/Units";
import LessonList from "./components/LessonList/LessonList";
import Lessons from "./components/Lessons/Lesson";
import LessonIntro from "./components/LessonIntro/LessonIntro";
import SimulatorGame from './components/SimulatorGame/SimulatorGame';
import AssessmentsPage from "./components/Assessments/AssessmentsPage";
import AssessmentQuiz from "./components/Assessments/AssessmentQuiz";
import AssessmentResults from "./components/Assessments/AssessmentResults";
import Investments from "./components/Investments/Investments";
import PrizeShelf from "./components/PrizeShelf/PrizeShelf";

import { getGradeCookie } from "./cookieUtils";

function App() {
  const [grade, setGrade] = useState(getGradeCookie());

  // Accessibility settings
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [contrastMode, setContrastMode] = useState(() => {
    return localStorage.getItem("contrastMode") === "true";
  });

  const [largeText, setLargeText] = useState(() => {
    return localStorage.getItem("largeText") === "true";
  });

  // Keep grade in sync with cookie
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getGradeCookie();
      setGrade(current);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Save accessibility settings
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("contrastMode", contrastMode);
    localStorage.setItem("largeText", largeText);
  }, [darkMode, contrastMode, largeText]);

  // Apply accessibility classes to body
  useEffect(() => {
    document.body.classList.toggle("theme-dark", darkMode);
    document.body.classList.toggle("theme-contrast", contrastMode);
    document.body.classList.toggle("text-large", largeText);
  }, [darkMode, contrastMode, largeText]);

  return (
    <Router>
      <div className="app-shell">
        <Navbar />

        <AccessibilityPanel
          darkMode={darkMode}
          contrastMode={contrastMode}
          largeText={largeText}
          setDarkMode={setDarkMode}
          setContrastMode={setContrastMode}
          setLargeText={setLargeText}
        />

        <Routes>
          <Route
            path="/"
            element={
              grade
                ? <Navigate to="/dashboard" replace />
                : <GradeSelect key={Date.now()} />
            }
          />

          <Route path="/grade" element={<Navigate to="/" replace />} />

          <Route
            path="/dashboard"
            element={grade ? <HomePage /> : <Navigate to="/" replace />}
          />

          <Route path="/units/:grade" element={<Units />} />
          <Route path="/lessons/:grade/:unit" element={<LessonList />} />
          <Route path="/lessonIntro/:grade/:unit/:lessonId" element={<LessonIntro />} />
          <Route path="/lesson/lessons/:grade/:unit/:lessonId" element={<Lessons />} />

          <Route path="/assessments/:grade" element={<AssessmentsPage />} />
          <Route path="/assessment/:grade/:unit" element={<AssessmentQuiz />} />
          <Route path="/assessment/:grade/:unit/results" element={<AssessmentResults />} />

          <Route path="/pet-shop" element={<PetShopPage darkMode={darkMode} />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/simulator" element={<SimulatorGame />} />
          <Route path="/simulation/:grade/:gameId" element={<SimulatorGame />} />
          <Route path="/prize-shelf" element={<PrizeShelf />} />
        </Routes>

        <PetMascotWrapper />
      </div>
    </Router>
  );
}

function AccessibilityPanel({
  darkMode,
  contrastMode,
  largeText,
  setDarkMode,
  setContrastMode,
  setLargeText
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="accessibility-wrapper" ref={panelRef}>
      <button
        className="settings-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="accessibility-panel">
          <div className="accessibility-title">Settings</div>

          <button
            className={`accessibility-btn ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-pressed={darkMode}
          >
            {darkMode ? "✅" : "🌙"} Dark Mode
          </button>

          <button
            className={`accessibility-btn ${contrastMode ? "active" : ""}`}
            onClick={() => setContrastMode(!contrastMode)}
            aria-pressed={contrastMode}
          >
            {contrastMode ? "✅" : "🎯"} Contrast Mode
          </button>

          {/* <button
            className={`accessibility-btn ${largeText ? "active" : ""}`}
            onClick={() => setLargeText(!largeText)}
            aria-pressed={largeText}
          >
            {largeText ? "✅" : "🔎"} Larger Text
          </button> */}
        </div>
      )}
    </div>
  );
}

// Wrapper to access useLocation inside Router
function PetMascotWrapper() {
  const location = useLocation();

  let pageType = "";
  let lessonId = "";
  let quizId = "";

  if (location.pathname.includes("/lesson/lessons/")) {
    pageType = "lesson";
    const parts = location.pathname.split("/");
    lessonId = parts[parts.length - 1];
  } else if (location.pathname.includes("/lessonIntro/")) {
    pageType = "lesson";
    const parts = location.pathname.split("/");
    lessonId = parts[parts.length - 1];
  } else if (location.pathname.includes("/lessons/")) {
    pageType = "lesson";
    const parts = location.pathname.split("/");
    lessonId = parts[parts.length - 1];
  } else if (location.pathname.includes("/assessment/") && !location.pathname.includes("/assessments/")) {
    pageType = "quiz";
    const parts = location.pathname.split("/");
    quizId = parts[parts.length - 2];
  } else if (location.pathname.includes("/pet-shop")) {
    pageType = "shop";
  }

  return (
    <PetMascot
      currentPath={location.pathname}
      pageType={pageType}
      lessonId={lessonId}
      quizId={quizId}
    />
  );
}

export default App;