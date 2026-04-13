// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import lessonsData from "../../data/lessons";
// import { addCoins } from "../../coinUtils";
// import "./Lesson.css";

// const LESSON_REWARD = 10;
// const UNIT_REWARD = 30;

// function Lesson() {
//   const { grade, unit, lessonId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const unitLessons = lessonsData[grade]?.[unit] || [];
//   const lesson = unitLessons.find((item) => item.id === Number(lessonId));

//   const initialQuestionFromState = Number.isInteger(location.state?.currentQuestion)
//     ? location.state.currentQuestion
//     : 0;

//   const maxQuestionIndex =
//     lesson && lesson.questions && lesson.questions.length > 0
//       ? lesson.questions.length - 1
//       : 0;

//   const [currentQuestion, setCurrentQuestion] = useState(
//     Math.min(initialQuestionFromState, maxQuestionIndex)
//   );
//   const [feedback, setFeedback] = useState("");
//   const [feedbackType, setFeedbackType] = useState("");
//   const [isStepComplete, setIsStepComplete] = useState(false);
//   const [wrongAttempts, setWrongAttempts] = useState(0);
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

//   const [selectedBudgetItems, setSelectedBudgetItems] = useState([]);
//   const [budgetSubmitted, setBudgetSubmitted] = useState(false);

//   const [revealedCards, setRevealedCards] = useState([]);

//   const [availableItems, setAvailableItems] = useState([]);
//   const [needBucketItems, setNeedBucketItems] = useState([]);
//   const [wantBucketItems, setWantBucketItems] = useState([]);
//   const [draggedItemId, setDraggedItemId] = useState(null);

//   const [showHintPopup, setShowHintPopup] = useState(false);
//   const [hintMessage, setHintMessage] = useState("");
  

//   const currentBudgetTotal = useMemo(() => {
//     return selectedBudgetItems.reduce((sum, item) => sum + item.price, 0);
//   }, [selectedBudgetItems]);

//   useEffect(() => {
//     if (!lesson || !lesson.questions || lesson.questions.length === 0) return;

//     const clampedIndex = Math.min(currentQuestion, lesson.questions.length - 1);
//     if (clampedIndex !== currentQuestion) {
//       setCurrentQuestion(clampedIndex);
//       return;
//     }

//     const q = lesson.questions[clampedIndex];
//     const qType = q.type || lesson.type || "scenario-choice";

//     setFeedback("");
//     setFeedbackType("");
//     setIsStepComplete(false);
//     setWrongAttempts(0);
//     setSelectedOptionIndex(null);

//     setSelectedBudgetItems([]);
//     setBudgetSubmitted(false);

//     setRevealedCards([]);
//     setDraggedItemId(null);

//     setShowHintPopup(false);
//     setHintMessage("");

//     if (qType === "drag-drop") {
//       setAvailableItems(q.items || []);
//       setNeedBucketItems([]);
//       setWantBucketItems([]);
//     } else {
//       setAvailableItems([]);
//       setNeedBucketItems([]);
//       setWantBucketItems([]);
//     }
//   }, [lesson, currentQuestion]);

//   if (!lesson) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Lesson not found</h2>;
//   }

//   if (!lesson.questions || lesson.questions.length === 0) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Lesson not found</h2>;
//   }

//   const q = lesson.questions[currentQuestion];
//   if (!q) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Question not found</h2>;
//   }

//   const questionType = q.type || lesson.type || "scenario-choice";

//   const getDefaultInstruction = () => {
//     if (questionType === "scenario-choice") {
//       return "Tap the best picture.";
//     }

//     if (questionType === "budget-builder") {
//       return "Pick items for your budget.";
//     }

//     if (questionType === "tap-reveal") {
//       return "Tap a clue card first.";
//     }

//     if (questionType === "drag-drop") {
//       return "";
//     }

//     return "Tap a picture to start.";
//   };

//   const progress = ((currentQuestion + 1) / lesson.questions.length) * 100;

//   const getMiniTitle = () => {
//     return q.shortTitle || q.scenarioTitle || lesson.title;
//   };

//   const getMiniText = () => {
//     return q.shortText || q.scenarioText;
//   };

//   const getMiniQuestion = () => {
//     return q.shortQuestion || q.question;
//   };

//   const getOptionLabel = (option) => {
//     return option.shortText || option.text;
//   };

//   const getHintFromLessonData = () => {
//     return (
//       q.hintPopup ||
//       q.generalHint ||
//       lesson.tips ||
//       "Think carefully about the smartest money choice."
//     );
//   };

//   const markLessonComplete = () => {
//     const key = `progress_${grade}_${unit}`;
//     const saved = JSON.parse(localStorage.getItem(key)) || [];

//     if (!saved.includes(Number(lessonId))) {
//       const updated = [...saved, Number(lessonId)];
//       localStorage.setItem(key, JSON.stringify(updated));
//       return updated;
//     }

//     return saved;
//   };

//   const awardLessonCoins = () => {
//     const rewardKey = `coins_awarded_${grade}_${unit}_${lessonId}`;

//     if (!localStorage.getItem(rewardKey)) {
//       addCoins(LESSON_REWARD);
//       localStorage.setItem(rewardKey, "true");
//     }
//   };

//   const awardUnitCoins = (completedLessonCount) => {
//     const totalLessonsInUnit = unitLessons.length;
//     const unitRewardKey = `unit_reward_awarded_${grade}_${unit}`;

//     if (
//       totalLessonsInUnit > 0 &&
//       completedLessonCount === totalLessonsInUnit &&
//       !localStorage.getItem(unitRewardKey)
//     ) {
//       addCoins(UNIT_REWARD);
//       localStorage.setItem(unitRewardKey, "true");
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < lesson.questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       const completedLessons = markLessonComplete();
//       awardLessonCoins();
//       awardUnitCoins(completedLessons.length);
//       navigate(`/lessons/${grade}/${unit}`);
//     }
//   };

//   const handleContext = () => {
//     setHintMessage(getHintFromLessonData());
//     setShowHintPopup(true);
//   };

//   const getFeedbackClass = () => {
//     if (feedbackType === "correct") return "feedback-pill feedback-correct";
//     if (feedbackType === "hint") return "feedback-pill feedback-hint";
//     if (feedbackType === "info") return "feedback-pill feedback-info";
//     return "feedback-pill";
//   };

//   const getFeedbackTitle = () => {
//     if (feedbackType === "correct") return "Awesome!";
//     if (feedbackType === "hint") return "Try again";
//     if (feedbackType === "info") return "Nice!";
//     return "Tip";
//   };

//   const chooseScenarioOption = (option, index) => {
//     setSelectedOptionIndex(index);

//     if (option.isBest) {
//       setFeedback(option.effect || "Awesome! That is the best choice.");
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//       return;
//     }

//     const nextWrongCount = wrongAttempts + 1;
//     setWrongAttempts(nextWrongCount);
//     setIsStepComplete(false);

//     setFeedback(option.hint || q.generalHint || "Not quite. Tap the smarter picture.");
//     setFeedbackType("hint");
//   };

//   const toggleBudgetItem = (item) => {
//     const alreadySelected = selectedBudgetItems.some((picked) => picked.id === item.id);

//     if (alreadySelected) {
//       setSelectedBudgetItems((prev) => prev.filter((picked) => picked.id !== item.id));
//       return;
//     }

//     setSelectedBudgetItems((prev) => [...prev, item]);
//   };

//   const submitBudgetBuilder = () => {
//     const pickedIds = selectedBudgetItems.map((item) => item.id).sort();
//     const correctIds = (q.correctItemIds || []).slice().sort();

//     const sameLength = pickedIds.length === correctIds.length;
//     const sameItems =
//       sameLength && pickedIds.every((id, index) => id === correctIds[index]);
//     const withinBudget = currentBudgetTotal <= (q.budget || 0);

//     setBudgetSubmitted(true);

//     if (sameItems && withinBudget) {
//       setFeedback(q.successMessage || `Awesome! You stayed in $${q.budget}.`);
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//     } else if (!withinBudget) {
//       setFeedback(`Too much! Stay under $${q.budget}.`);
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//     } else {
//       setFeedback(q.generalHint || "Good try! Pick the more important items first.");
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//     }
//   };

//   const toggleRevealCard = (cardId) => {
//     if (revealedCards.includes(cardId)) return;
//     setRevealedCards((prev) => [...prev, cardId]);
//   };

//   const answerTapReveal = (option) => {
//     if (option.isBest) {
//       setFeedback(option.effect || "Nice job! You used the clues.");
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//     } else {
//       setFeedback(option.hint || q.generalHint || "Not yet. Check the clues again.");
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//     }
//   };

//   const handleDragStart = (itemId) => {
//     setDraggedItemId(itemId);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const bucketLabels = q.bucketLabels || {
//     need: "Needs",
//     want: "Wants"
//   };

//   const classifyItem = (item, bucket) => {
//     if (!item) return;

//     const actualBucket = item.bucket || item.type;
//     const label = item.label || item.name || "This item";
//     const isCorrect = actualBucket === bucket;

//     if (!isCorrect) {
//       setFeedback(
//         `${label} goes in ${actualBucket === "need" ? bucketLabels.need : bucketLabels.want}. Try again!`
//       );
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//       return;
//     }

//     setAvailableItems((prev) => prev.filter((entry) => entry.id !== item.id));

//     if (bucket === "need") {
//       setNeedBucketItems((prev) => [...prev, item]);
//     } else {
//       setWantBucketItems((prev) => [...prev, item]);
//     }

//     const remainingCount = availableItems.length - 1;

//     if (remainingCount === 0) {
//       setFeedback("Awesome! You sorted all the items.");
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//     } else {
//       setFeedback(`Nice! ${label} is in the right spot.`);
//       setFeedbackType("info");
//       setIsStepComplete(false);
//     }
//   };

//   const handleDropToBucket = (bucket) => {
//     if (!draggedItemId) return;
//     const draggedItem = availableItems.find((item) => item.id === draggedItemId);
//     classifyItem(draggedItem, bucket);
//     setDraggedItemId(null);
//   };

//   const getContextImages = () => {
//     const imgs = [];
//     if (!lesson.context) return imgs;

//     lesson.context.forEach((entry) => {
//       if (Array.isArray(entry.example_img)) {
//         entry.example_img.forEach((src) => {
//           if (src) imgs.push(src);
//         });
//       }
//     });

//     return imgs;
//   };

//   const getVisualGallery = () => {
//     const visuals = [];

//     if (q.questionImg) {
//       visuals.push({ src: q.questionImg, alt: "lesson visual" });
//     }

//     if (q.images?.length) {
//       q.images.forEach((imgObj, index) => {
//         if (imgObj?.questionImg) {
//           visuals.push({
//             src: imgObj.questionImg,
//             alt: `lesson visual ${index + 1}`
//           });
//         }
//       });
//     }

//     if (q.options?.length) {
//       q.options.forEach((option, index) => {
//         if (option.img) {
//           visuals.push({
//             src: option.img,
//             alt: option.text || `option ${index + 1}`
//           });
//         }
//       });
//     }

//     getContextImages().forEach((src, index) => {
//       visuals.push({
//         src,
//         alt: `context visual ${index + 1}`
//       });
//     });

//     const seen = new Set();
//     return visuals
//       .filter((item) => {
//         if (!item.src || seen.has(item.src)) return false;
//         seen.add(item.src);
//         return true;
//       })
//       .slice(0, 6);
//   };

//   const renderHero = () => {
//     const gallery = getVisualGallery();

//     if (gallery.length > 0) {
//       const mainImage = gallery[0];
//       const extraImages = gallery.slice(1, 5);

//       return (
//         <div className="hero-gallery">
//           <div className="hero-main-image-wrap">
//             <img
//               src={mainImage.src}
//               className="hero-main-image"
//               alt={mainImage.alt}
//             />
//             <div className="hero-badge">✨ Picture clue</div>
//           </div>

//           {extraImages.length > 0 && (
//             <div className="hero-thumb-row">
//               {extraImages.map((item, index) => (
//                 <img
//                   key={`${item.src}-${index}`}
//                   src={item.src}
//                   className="hero-thumb"
//                   alt={item.alt}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="lesson-shell">
//       <div className="lesson-container">
//         <div className="lesson-topbar">
//           <div className="progress-wrap">
//             <div className="lesson-progress-text">
//               <span className="progress-chip">Lesson {lessonId}</span>
//               <span className="progress-chip">
//                 {currentQuestion + 1} / {lesson.questions.length}
//               </span>
//             </div>

//             <div className="progress-bar-border">
//               <div className="progress" style={{ width: `${progress}%` }}></div>
//             </div>
//           </div>
//         </div>

//         {showHintPopup && (
//           <div className="hint-popup">
//             <div className="hint-popup-content">
//               <span className="hint-popup-icon">💡</span>
//               <div className="hint-popup-text">
//                 <strong>Hint:</strong> {hintMessage}
//               </div>
//               <button
//                 className="hint-popup-close"
//                 onClick={() => setShowHintPopup(false)}
//                 aria-label="Close hint"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="questions-container">
//           <div className="left-container">
//             <div className={`scenario-box ${questionType === "budget-builder" ? "scenario-box-budget" : ""}`}>
//               {questionType === "budget-builder" && (
//                 <div className="scenario-top-row">
//                   <div
//                     className={`budget-total-card budget-total-card-inline ${
//                       currentBudgetTotal > (q.budget || 0) ? "over-budget" : ""
//                     }`}
//                   >
//                     <span>Total</span>
//                     <strong>
//                       ${currentBudgetTotal} / ${q.budget}
//                     </strong>
//                   </div>
//                 </div>
//               )}

//               <h3 className="scenario-title">{getMiniTitle()}</h3>

//               {getMiniText() && <p className="scenario-text">{getMiniText()}</p>}

//               {(q.walletAmount !== undefined ||
//                 q.goal ||
//                 (q.budget !== undefined && questionType !== "budget-builder")) && (
//                 <div className="scenario-stats">
//                   {q.walletAmount !== undefined && (
//                     <div className="scenario-pill">
//                       <strong>💰</strong> ${q.walletAmount}
//                     </div>
//                   )}
//                   {q.budget !== undefined && questionType !== "budget-builder" && (
//                     <div className="scenario-pill">
//                       <strong>🛒</strong> ${q.budget}
//                     </div>
//                   )}
//                   {q.goal && (
//                     <div className="scenario-pill">
//                       <strong>🎯</strong> {q.goal}
//                     </div>
//                   )}
//                 </div>
//               )}

//               <h4 className="question-text">{getMiniQuestion()}</h4>
//             </div>

//             {renderHero()}
//           </div>

//           <div className="option-container">
//             {questionType === "scenario-choice" && (
//               <>
//                 {q.options?.map((option, index) => (
//                   <button
//                     className={`option-btn ${selectedOptionIndex === index ? "selected-option" : ""}`}
//                     key={index}
//                     onClick={() => chooseScenarioOption(option, index)}
//                   >
//                     <div className="option-top">
//                       {option.img ? (
//                         <img src={option.img} className="option-img" alt={option.text} />
//                       ) : (
//                         <div className="option-emoji">{option.emoji || "⭐"}</div>
//                       )}
//                     </div>

//                     <div className="option-copy">
//                       <p className="option-txt">{getOptionLabel(option)}</p>
//                     </div>
//                   </button>
//                 ))}
//               </>
//             )}

//             {questionType === "budget-builder" && (
//               <div className="activity-panel">
//                 <div className="budget-grid">
//                   {q.items?.map((item) => {
//                     const isPicked = selectedBudgetItems.some((picked) => picked.id === item.id);

//                     return (
//                       <button
//                         key={item.id}
//                         className={`budget-item-card ${isPicked ? "budget-item-selected" : ""}`}
//                         onClick={() => toggleBudgetItem(item)}
//                       >
//                         <div className="budget-item-emoji">{item.emoji || "🛍️"}</div>
//                         {item.img && (
//                           <img src={item.img} alt={item.name} className="budget-item-img" />
//                         )}
//                         <div className="budget-item-name">{item.name}</div>
//                         <div className="budget-item-price">${item.price}</div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button className="check-btn" onClick={submitBudgetBuilder}>
//                   Check
//                 </button>

//                 {budgetSubmitted && q.showAnswerTip && (
//                   <p className="mini-tip">Pick needs first.</p>
//                 )}
//               </div>
//             )}

//             {questionType === "tap-reveal" && (
//               <div className="activity-panel">
//                 <div className="clue-grid">
//                   {q.cards?.map((card) => {
//                     const isOpen = revealedCards.includes(card.id);

//                     return (
//                       <button
//                         key={card.id}
//                         className={`clue-card ${isOpen ? "clue-card-open" : ""}`}
//                         onClick={() => toggleRevealCard(card.id)}
//                       >
//                         {!isOpen ? (
//                           <>
//                             <div className="clue-cover-emoji">{card.coverEmoji || "🃏"}</div>
//                             <div className="clue-cover-text">Tap for more hints!</div>
//                           </>
//                         ) : (
//                           <>
//                             <div className="clue-open-emoji">{card.emoji || "💡"}</div>
//                             <div className="clue-open-title">{card.title}</div>
//                             <div className="clue-open-text">{card.text}</div>
//                           </>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="tap-answer-grid">
//                   {q.options?.map((option, index) => (
//                     <button
//                       key={index}
//                       className="tap-answer-btn"
//                       onClick={() => answerTapReveal(option)}
//                     >
//                       {getOptionLabel(option)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {questionType === "drag-drop" && (
//               <div className="activity-panel activity-panel-drag">
//                 <div className="drag-layout">
//                   <div className="drag-buckets-panel">
//                     <div className="drag-buckets-title">Drop Zone</div>

//                     <div className="drag-drop-zone-list">
//                       <div
//                         className={`drop-zone need-zone ${draggedItemId ? "drop-zone-ready" : ""}`}
//                         onDragOver={handleDragOver}
//                         onDrop={() => handleDropToBucket("need")}
//                       >
//                         <h4>{bucketLabels.need}</h4>
//                         <p className="drop-zone-mini">Must-have items</p>

//                         <div className="sorted-items">
//                           {needBucketItems.map((item) => (
//                             <div key={item.id} className="sorted-pill">
//                               <span>{item.emoji || "✅"}</span>
//                               <span>{item.label || item.name}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div
//                         className={`drop-zone want-zone ${draggedItemId ? "drop-zone-ready" : ""}`}
//                         onDragOver={handleDragOver}
//                         onDrop={() => handleDropToBucket("want")}
//                       >
//                         <h4>{bucketLabels.want}</h4>
//                         <p className="drop-zone-mini">Fun extras</p>

//                         <div className="sorted-items">
//                           {wantBucketItems.map((item) => (
//                             <div key={item.id} className="sorted-pill">
//                               <span>{item.emoji || "✅"}</span>
//                               <span>{item.label || item.name}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="drag-items-panel">
//                     <div className="drag-items-title">Pick a Picture</div>

//                     <div className="drag-bank">
//                       {availableItems.map((item) => (
//                         <div
//                           key={item.id}
//                           className={`drag-item-card ${draggedItemId === item.id ? "drag-item-active" : ""}`}
//                           draggable
//                           onDragStart={() => handleDragStart(item.id)}
//                         >
//                           <div className="drag-item-glow"></div>

//                           {item.img ? (
//                             <img src={item.img} alt={item.name} className="drag-item-img" />
//                           ) : (
//                             <div className="drag-item-emoji">{item.emoji || "📦"}</div>
//                           )}

//                           <div className="drag-item-label">
//                             {item.label || item.name}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="lesson-sticky-bar">
//         <div className="lesson-sticky-inner">
//           <div className="sticky-feedback-wrap">
//             {feedback ? (
//               <div className={getFeedbackClass()}>
//                 <strong>{getFeedbackTitle()}</strong>
//                 <span>{feedback}</span>
//               </div>
//             ) : getDefaultInstruction() ? (
//               <div className="feedback-pill feedback-empty">
//                 <span>{getDefaultInstruction()}</span>
//               </div>
//             ) : null}
//           </div>

//           <div className="sticky-actions">
//             <button className="context-btn" onClick={handleContext}>
//               Hint
//             </button>

//             <button className="next-btn" onClick={handleNext} disabled={!isStepComplete}>
//               {currentQuestion === lesson.questions.length - 1 ? "Finish" : "Next"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Lesson;




// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import lessonsData from "../../data/lessons";
// import { addCoins } from "../../coinUtils";
// import "./Lesson.css";

// const LESSON_REWARD = 10;
// const UNIT_REWARD = 30;

// function Lesson() {
//   const { grade, unit, lessonId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const unitLessons = lessonsData[grade]?.[unit] || [];
//   const lesson = unitLessons.find((item) => item.id === Number(lessonId));

//   const initialQuestionFromState = Number.isInteger(location.state?.currentQuestion)
//     ? location.state.currentQuestion
//     : 0;

//   const maxQuestionIndex =
//     lesson && lesson.questions && lesson.questions.length > 0
//       ? lesson.questions.length - 1
//       : 0;

//   const [currentQuestion, setCurrentQuestion] = useState(
//     Math.min(initialQuestionFromState, maxQuestionIndex)
//   );
//   const [feedback, setFeedback] = useState("");
//   const [feedbackType, setFeedbackType] = useState("");
//   const [isStepComplete, setIsStepComplete] = useState(false);
//   const [wrongAttempts, setWrongAttempts] = useState(0);
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

//   const [selectedBudgetItems, setSelectedBudgetItems] = useState([]);
//   const [budgetSubmitted, setBudgetSubmitted] = useState(false);

//   const [revealedCards, setRevealedCards] = useState([]);

//   const [availableItems, setAvailableItems] = useState([]);
//   const [needBucketItems, setNeedBucketItems] = useState([]);
//   const [wantBucketItems, setWantBucketItems] = useState([]);
//   const [draggedItemId, setDraggedItemId] = useState(null);

//   const [showHintPopup, setShowHintPopup] = useState(false);
//   const [hintMessage, setHintMessage] = useState("");
//   const [showVideoPopup, setShowVideoPopup] = useState(false);

//   const currentBudgetTotal = useMemo(() => {
//     return selectedBudgetItems.reduce((sum, item) => sum + item.price, 0);
//   }, [selectedBudgetItems]);

//   const getYoutubeEmbedUrl = (url) => {
//     if (!url || typeof url !== "string") return "";

//     const trimmedUrl = url.trim();
//     if (!trimmedUrl) return "";

//     try {
//       const parsed = new URL(trimmedUrl);

//       if (
//         parsed.hostname.includes("youtube.com") ||
//         parsed.hostname.includes("www.youtube.com")
//       ) {
//         const videoId = parsed.searchParams.get("v");
//         if (videoId) {
//           return `https://www.youtube.com/embed/${videoId}`;
//         }

//         if (parsed.pathname.startsWith("/embed/")) {
//           return trimmedUrl;
//         }
//       }

//       if (parsed.hostname.includes("youtu.be")) {
//         const videoId = parsed.pathname.replace("/", "");
//         if (videoId) {
//           return `https://www.youtube.com/embed/${videoId}`;
//         }
//       }

//       return "";
//     } catch (error) {
//       return "";
//     }
//   };

//   const lessonVideoUrl = lesson?.videoUrl || "";
//   const lessonVideoEmbedUrl = getYoutubeEmbedUrl(lessonVideoUrl);
//   const hasLessonVideo = Boolean(lessonVideoEmbedUrl);

//   useEffect(() => {
//     if (!lesson || !lesson.questions || lesson.questions.length === 0) return;

//     const clampedIndex = Math.min(currentQuestion, lesson.questions.length - 1);
//     if (clampedIndex !== currentQuestion) {
//       setCurrentQuestion(clampedIndex);
//       return;
//     }

//     const q = lesson.questions[clampedIndex];
//     const qType = q.type || lesson.type || "scenario-choice";

//     setFeedback("");
//     setFeedbackType("");
//     setIsStepComplete(false);
//     setWrongAttempts(0);
//     setSelectedOptionIndex(null);

//     setSelectedBudgetItems([]);
//     setBudgetSubmitted(false);

//     setRevealedCards([]);
//     setDraggedItemId(null);

//     setShowHintPopup(false);
//     setHintMessage("");
//     setShowVideoPopup(false);

//     if (qType === "drag-drop") {
//       setAvailableItems(q.items || []);
//       setNeedBucketItems([]);
//       setWantBucketItems([]);
//     } else {
//       setAvailableItems([]);
//       setNeedBucketItems([]);
//       setWantBucketItems([]);
//     }
//   }, [lesson, currentQuestion]);

//   if (!lesson) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Lesson not found</h2>;
//   }

//   if (!lesson.questions || lesson.questions.length === 0) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Lesson not found</h2>;
//   }

//   const q = lesson.questions[currentQuestion];
//   if (!q) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Question not found</h2>;
//   }

//   const questionType = q.type || lesson.type || "scenario-choice";

//   const getDefaultInstruction = () => {
//     if (questionType === "scenario-choice") {
//       return "Tap the best picture.";
//     }

//     if (questionType === "budget-builder") {
//       return "Pick items for your budget.";
//     }

//     if (questionType === "tap-reveal") {
//       return "Tap a clue card first.";
//     }

//     if (questionType === "drag-drop") {
//       return "";
//     }

//     return "Tap a picture to start.";
//   };

//   const progress = ((currentQuestion + 1) / lesson.questions.length) * 100;

//   const getMiniTitle = () => {
//     return q.shortTitle || q.scenarioTitle || lesson.title;
//   };

//   const getMiniText = () => {
//     return q.shortText || q.scenarioText;
//   };

//   const getMiniQuestion = () => {
//     return q.shortQuestion || q.question;
//   };

//   const getOptionLabel = (option) => {
//     return option.shortText || option.text;
//   };

//   const getHintFromLessonData = () => {
//     return (
//       q.hintPopup ||
//       q.generalHint ||
//       lesson.tips ||
//       "Think carefully about the smartest money choice."
//     );
//   };

//   const markLessonComplete = () => {
//     const key = `progress_${grade}_${unit}`;
//     const saved = JSON.parse(localStorage.getItem(key)) || [];

//     if (!saved.includes(Number(lessonId))) {
//       const updated = [...saved, Number(lessonId)];
//       localStorage.setItem(key, JSON.stringify(updated));
//       return updated;
//     }

//     return saved;
//   };

//   const awardLessonCoins = () => {
//     const rewardKey = `coins_awarded_${grade}_${unit}_${lessonId}`;

//     if (!localStorage.getItem(rewardKey)) {
//       addCoins(LESSON_REWARD);
//       localStorage.setItem(rewardKey, "true");
//     }
//   };

//   const awardUnitCoins = (completedLessonCount) => {
//     const totalLessonsInUnit = unitLessons.length;
//     const unitRewardKey = `unit_reward_awarded_${grade}_${unit}`;

//     if (
//       totalLessonsInUnit > 0 &&
//       completedLessonCount === totalLessonsInUnit &&
//       !localStorage.getItem(unitRewardKey)
//     ) {
//       addCoins(UNIT_REWARD);
//       localStorage.setItem(unitRewardKey, "true");
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < lesson.questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       const completedLessons = markLessonComplete();
//       awardLessonCoins();
//       awardUnitCoins(completedLessons.length);
//       navigate(`/lessons/${grade}/${unit}`);
//     }
//   };

//   const handleContext = () => {
//     setHintMessage(getHintFromLessonData());
//     setShowHintPopup(true);
//   };

//   const getFeedbackClass = () => {
//     if (feedbackType === "correct") return "feedback-pill feedback-correct";
//     if (feedbackType === "hint") return "feedback-pill feedback-hint";
//     if (feedbackType === "info") return "feedback-pill feedback-info";
//     return "feedback-pill";
//   };

//   const getFeedbackTitle = () => {
//     if (feedbackType === "correct") return "Awesome!";
//     if (feedbackType === "hint") return "Try again";
//     if (feedbackType === "info") return "Nice!";
//     return "Tip";
//   };

//   const chooseScenarioOption = (option, index) => {
//     setSelectedOptionIndex(index);

//     if (option.isBest) {
//       setFeedback(option.effect || "Awesome! That is the best choice.");
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//       return;
//     }

//     const nextWrongCount = wrongAttempts + 1;
//     setWrongAttempts(nextWrongCount);
//     setIsStepComplete(false);

//     setFeedback(option.hint || q.generalHint || "Not quite. Tap the smarter picture.");
//     setFeedbackType("hint");
//   };

//   const toggleBudgetItem = (item) => {
//     const alreadySelected = selectedBudgetItems.some((picked) => picked.id === item.id);

//     if (alreadySelected) {
//       setSelectedBudgetItems((prev) => prev.filter((picked) => picked.id !== item.id));
//       return;
//     }

//     setSelectedBudgetItems((prev) => [...prev, item]);
//   };

//   const submitBudgetBuilder = () => {
//     const pickedIds = selectedBudgetItems.map((item) => item.id).sort();
//     const correctIds = (q.correctItemIds || []).slice().sort();

//     const sameLength = pickedIds.length === correctIds.length;
//     const sameItems =
//       sameLength && pickedIds.every((id, index) => id === correctIds[index]);
//     const withinBudget = currentBudgetTotal <= (q.budget || 0);

//     setBudgetSubmitted(true);

//     if (sameItems && withinBudget) {
//       setFeedback(q.successMessage || `Awesome! You stayed in $${q.budget}.`);
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//     } else if (!withinBudget) {
//       setFeedback(`Too much! Stay under $${q.budget}.`);
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//     } else {
//       setFeedback(q.generalHint || "Good try! Pick the more important items first.");
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//     }
//   };

//   const toggleRevealCard = (cardId) => {
//     if (revealedCards.includes(cardId)) return;
//     setRevealedCards((prev) => [...prev, cardId]);
//   };

//   const answerTapReveal = (option) => {
//     if (option.isBest) {
//       setFeedback(option.effect || "Nice job! You used the clues.");
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//     } else {
//       setFeedback(option.hint || q.generalHint || "Not yet. Check the clues again.");
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//     }
//   };

//   const handleDragStart = (itemId) => {
//     setDraggedItemId(itemId);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const bucketLabels = q.bucketLabels || {
//     need: "Needs",
//     want: "Wants"
//   };

//   const classifyItem = (item, bucket) => {
//     if (!item) return;

//     const actualBucket = item.bucket || item.type;
//     const label = item.label || item.name || "This item";
//     const isCorrect = actualBucket === bucket;

//     if (!isCorrect) {
//       setFeedback(
//         `${label} goes in ${actualBucket === "need" ? bucketLabels.need : bucketLabels.want}. Try again!`
//       );
//       setFeedbackType("hint");
//       setIsStepComplete(false);
//       return;
//     }

//     setAvailableItems((prev) => prev.filter((entry) => entry.id !== item.id));

//     if (bucket === "need") {
//       setNeedBucketItems((prev) => [...prev, item]);
//     } else {
//       setWantBucketItems((prev) => [...prev, item]);
//     }

//     const remainingCount = availableItems.length - 1;

//     if (remainingCount === 0) {
//       setFeedback("Awesome! You sorted all the items.");
//       setFeedbackType("correct");
//       setIsStepComplete(true);
//     } else {
//       setFeedback(`Nice! ${label} is in the right spot.`);
//       setFeedbackType("info");
//       setIsStepComplete(false);
//     }
//   };

//   const handleDropToBucket = (bucket) => {
//     if (!draggedItemId) return;
//     const draggedItem = availableItems.find((item) => item.id === draggedItemId);
//     classifyItem(draggedItem, bucket);
//     setDraggedItemId(null);
//   };

//   const getContextImages = () => {
//     const imgs = [];
//     if (!lesson.context) return imgs;

//     lesson.context.forEach((entry) => {
//       if (Array.isArray(entry.example_img)) {
//         entry.example_img.forEach((src) => {
//           if (src) imgs.push(src);
//         });
//       }
//     });

//     return imgs;
//   };

//   const getVisualGallery = () => {
//     const visuals = [];

//     if (q.questionImg) {
//       visuals.push({ src: q.questionImg, alt: "lesson visual" });
//     }

//     if (q.images?.length) {
//       q.images.forEach((imgObj, index) => {
//         if (imgObj?.questionImg) {
//           visuals.push({
//             src: imgObj.questionImg,
//             alt: `lesson visual ${index + 1}`
//           });
//         }
//       });
//     }

//     if (q.options?.length) {
//       q.options.forEach((option, index) => {
//         if (option.img) {
//           visuals.push({
//             src: option.img,
//             alt: option.text || `option ${index + 1}`
//           });
//         }
//       });
//     }

//     getContextImages().forEach((src, index) => {
//       visuals.push({
//         src,
//         alt: `context visual ${index + 1}`
//       });
//     });

//     const seen = new Set();
//     return visuals
//       .filter((item) => {
//         if (!item.src || seen.has(item.src)) return false;
//         seen.add(item.src);
//         return true;
//       })
//       .slice(0, 6);
//   };

//   const renderHero = () => {
//     const gallery = getVisualGallery();

//     if (gallery.length > 0) {
//       const mainImage = gallery[0];
//       const extraImages = gallery.slice(1, 5);

//       return (
//         <div className="hero-gallery">
//           <div className="hero-main-image-wrap">
//             <img
//               src={mainImage.src}
//               className="hero-main-image"
//               alt={mainImage.alt}
//             />
//             <div className="hero-badge">✨ Picture clue</div>
//           </div>

//           {extraImages.length > 0 && (
//             <div className="hero-thumb-row">
//               {extraImages.map((item, index) => (
//                 <img
//                   key={`${item.src}-${index}`}
//                   src={item.src}
//                   className="hero-thumb"
//                   alt={item.alt}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="lesson-shell">
//       <div className="lesson-container">
//         <div className="lesson-topbar">
//           <div className="progress-wrap">
//             <div className="lesson-progress-text">
//               <span className="progress-chip">Lesson {lessonId}</span>
//               <span className="progress-chip">
//                 {currentQuestion + 1} / {lesson.questions.length}
//               </span>
//             </div>

//             <div className="progress-bar-border">
//               <div className="progress" style={{ width: `${progress}%` }}></div>
//             </div>
//           </div>
//         </div>

//         {showHintPopup && (
//           <div className="hint-popup">
//             <div className="hint-popup-content">
//               <span className="hint-popup-icon">💡</span>
//               <div className="hint-popup-text">
//                 <strong>Hint:</strong> {hintMessage}
//               </div>
//               <button
//                 className="hint-popup-close"
//                 onClick={() => setShowHintPopup(false)}
//                 aria-label="Close hint"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}

//         {showVideoPopup && hasLessonVideo && (
//           <div
//             className="video-popup-overlay"
//             onClick={() => setShowVideoPopup(false)}
//           >
//             <div
//               className="video-popup-content"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="video-popup-close"
//                 onClick={() => setShowVideoPopup(false)}
//                 aria-label="Close video"
//                 type="button"
//               >
//                 ×
//               </button>

//               <div className="video-popup-frame-wrap">
//                 <iframe
//                   className="video-popup-frame"
//                   src={lessonVideoEmbedUrl}
//                   title={`${lesson.title} video`}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="questions-container">
//           <div className="left-container">
//             <div className={`scenario-box ${questionType === "budget-builder" ? "scenario-box-budget" : ""}`}>
//               {questionType === "budget-builder" && (
//                 <div className="scenario-top-row">
//                   <div
//                     className={`budget-total-card budget-total-card-inline ${
//                       currentBudgetTotal > (q.budget || 0) ? "over-budget" : ""
//                     }`}
//                   >
//                     <span>Total</span>
//                     <strong>
//                       ${currentBudgetTotal} / ${q.budget}
//                     </strong>
//                   </div>
//                 </div>
//               )}

//               <h3 className="scenario-title">{getMiniTitle()}</h3>

//               {getMiniText() && <p className="scenario-text">{getMiniText()}</p>}

//               {(q.walletAmount !== undefined ||
//                 q.goal ||
//                 (q.budget !== undefined && questionType !== "budget-builder")) && (
//                 <div className="scenario-stats">
//                   {q.walletAmount !== undefined && (
//                     <div className="scenario-pill">
//                       <strong>💰</strong> ${q.walletAmount}
//                     </div>
//                   )}
//                   {q.budget !== undefined && questionType !== "budget-builder" && (
//                     <div className="scenario-pill">
//                       <strong>🛒</strong> ${q.budget}
//                     </div>
//                   )}
//                   {q.goal && (
//                     <div className="scenario-pill">
//                       <strong>🎯</strong> {q.goal}
//                     </div>
//                   )}
//                 </div>
//               )}

//               <h4 className="question-text">{getMiniQuestion()}</h4>
//             </div>

//             {renderHero()}
//           </div>

//           <div className="option-container">
//             {questionType === "scenario-choice" && (
//               <>
//                 {q.options?.map((option, index) => (
//                   <button
//                     className={`option-btn ${selectedOptionIndex === index ? "selected-option" : ""}`}
//                     key={index}
//                     onClick={() => chooseScenarioOption(option, index)}
//                   >
//                     <div className="option-top">
//                       {option.img ? (
//                         <img src={option.img} className="option-img" alt={option.text} />
//                       ) : (
//                         <div className="option-emoji">{option.emoji || "⭐"}</div>
//                       )}
//                     </div>

//                     <div className="option-copy">
//                       <p className="option-txt">{getOptionLabel(option)}</p>
//                     </div>
//                   </button>
//                 ))}
//               </>
//             )}

//             {questionType === "budget-builder" && (
//               <div className="activity-panel">
//                 <div className="budget-grid">
//                   {q.items?.map((item) => {
//                     const isPicked = selectedBudgetItems.some((picked) => picked.id === item.id);

//                     return (
//                       <button
//                         key={item.id}
//                         className={`budget-item-card ${isPicked ? "budget-item-selected" : ""}`}
//                         onClick={() => toggleBudgetItem(item)}
//                       >
//                         <div className="budget-item-emoji">{item.emoji || "🛍️"}</div>
//                         {item.img && (
//                           <img src={item.img} alt={item.name} className="budget-item-img" />
//                         )}
//                         <div className="budget-item-name">{item.name}</div>
//                         <div className="budget-item-price">${item.price}</div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button className="check-btn" onClick={submitBudgetBuilder}>
//                   Check
//                 </button>

//                 {budgetSubmitted && q.showAnswerTip && (
//                   <p className="mini-tip">Pick needs first.</p>
//                 )}
//               </div>
//             )}

//             {questionType === "tap-reveal" && (
//               <div className="activity-panel">
//                 <div className="clue-grid">
//                   {q.cards?.map((card) => {
//                     const isOpen = revealedCards.includes(card.id);

//                     return (
//                       <button
//                         key={card.id}
//                         className={`clue-card ${isOpen ? "clue-card-open" : ""}`}
//                         onClick={() => toggleRevealCard(card.id)}
//                       >
//                         {!isOpen ? (
//                           <>
//                             <div className="clue-cover-emoji">{card.coverEmoji || "🃏"}</div>
//                             <div className="clue-cover-text">Tap for more hints!</div>
//                           </>
//                         ) : (
//                           <>
//                             <div className="clue-open-emoji">{card.emoji || "💡"}</div>
//                             <div className="clue-open-title">{card.title}</div>
//                             <div className="clue-open-text">{card.text}</div>
//                           </>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="tap-answer-grid">
//                   {q.options?.map((option, index) => (
//                     <button
//                       key={index}
//                       className="tap-answer-btn"
//                       onClick={() => answerTapReveal(option)}
//                     >
//                       {getOptionLabel(option)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {questionType === "drag-drop" && (
//               <div className="activity-panel activity-panel-drag">
//                 <div className="drag-layout">
//                   <div className="drag-buckets-panel">
//                     <div className="drag-buckets-title">Drop Zone</div>

//                     <div className="drag-drop-zone-list">
//                       <div
//                         className={`drop-zone need-zone ${draggedItemId ? "drop-zone-ready" : ""}`}
//                         onDragOver={handleDragOver}
//                         onDrop={() => handleDropToBucket("need")}
//                       >
//                         <h4>{bucketLabels.need}</h4>
//                         <p className="drop-zone-mini">Must-have items</p>

//                         <div className="sorted-items">
//                           {needBucketItems.map((item) => (
//                             <div key={item.id} className="sorted-pill">
//                               <span>{item.emoji || "✅"}</span>
//                               <span>{item.label || item.name}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div
//                         className={`drop-zone want-zone ${draggedItemId ? "drop-zone-ready" : ""}`}
//                         onDragOver={handleDragOver}
//                         onDrop={() => handleDropToBucket("want")}
//                       >
//                         <h4>{bucketLabels.want}</h4>
//                         <p className="drop-zone-mini">Fun extras</p>

//                         <div className="sorted-items">
//                           {wantBucketItems.map((item) => (
//                             <div key={item.id} className="sorted-pill">
//                               <span>{item.emoji || "✅"}</span>
//                               <span>{item.label || item.name}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="drag-items-panel">
//                     <div className="drag-items-title">Pick a Picture</div>

//                     <div className="drag-bank">
//                       {availableItems.map((item) => (
//                         <div
//                           key={item.id}
//                           className={`drag-item-card ${draggedItemId === item.id ? "drag-item-active" : ""}`}
//                           draggable
//                           onDragStart={() => handleDragStart(item.id)}
//                         >
//                           <div className="drag-item-glow"></div>

//                           {item.img ? (
//                             <img src={item.img} alt={item.name} className="drag-item-img" />
//                           ) : (
//                             <div className="drag-item-emoji">{item.emoji || "📦"}</div>
//                           )}

//                           <div className="drag-item-label">
//                             {item.label || item.name}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="lesson-sticky-bar">
//         <div className="lesson-sticky-inner">
//           <div className="sticky-feedback-wrap">
//             {feedback ? (
//               <div className={getFeedbackClass()}>
//                 <strong>{getFeedbackTitle()}</strong>
//                 <span>{feedback}</span>
//               </div>
//             ) : getDefaultInstruction() ? (
//               <div className="feedback-pill feedback-empty">
//                 <span>{getDefaultInstruction()}</span>
//               </div>
//             ) : null}
//           </div>

//           <div className="sticky-actions">
//             <button className="context-btn" onClick={handleContext}>
//               Hint
//             </button>

//             {hasLessonVideo && (
//               <button
//                 className="video-btn"
//                 onClick={() => setShowVideoPopup(true)}
//                 type="button"
//               >
//                 Watch Video
//               </button>
//             )}

//             <button className="next-btn" onClick={handleNext} disabled={!isStepComplete}>
//               {currentQuestion === lesson.questions.length - 1 ? "Finish" : "Next"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Lesson;
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import lessonsData from "../../data/lessons";
import { addCoins } from "../../coinUtils";
import "./Lesson.css";

const LESSON_API_URL =
  process.env.REACT_APP_LESSON_API_URL || "http://localhost:4000/api/generate-lesson";

const LESSON_REWARD = 10;
const UNIT_REWARD = 30;

function buildLessonGenerationPayload(lesson, grade, unit, lessonId) {
  const sampleQuestions = (lesson?.questions || []).map((question) => ({
    type: question.type || "scenario-choice",
    scenarioTitle: question.scenarioTitle || "",
    scenarioText: question.scenarioText || "",
    question: question.question || "",
    generalHint: question.generalHint || "",
    walletAmount: question.walletAmount,
    goal: question.goal,
    budget: question.budget,
    heroEmoji: question.heroEmoji || "",
    heroCaption: question.heroCaption || "",
    successMessage: question.successMessage || "",
    showAnswerTip: question.showAnswerTip,
    options: (question.options || []).map((option) => ({
      text: option.text || "",
      subText: option.subText || "",
      emoji: option.emoji || "",
      isBest: Boolean(option.isBest),
      hint: option.hint || "",
      effect: option.effect || "",
    })),
    cards: (question.cards || []).map((card) => ({
      id: card.id || "",
      coverEmoji: card.coverEmoji || "",
      emoji: card.emoji || "",
      title: card.title || "",
      text: card.text || "",
    })),
    items: (question.items || []).map((item) => ({
      id: item.id || "",
      name: item.name || "",
      label: item.label || "",
      bucket: item.bucket || "",
      type: item.type || "",
      price: item.price,
      emoji: item.emoji || "",
      tag: item.tag || "",
    })),
    correctItemIds: question.correctItemIds || [],
    bucketConfig: question.bucketConfig || null,
  }));

  return {
    grade,
    unit,
    lessonId,
    title: lesson?.title || "",
    questionType:
      lesson?.questions?.[0]?.type ||
      lesson?.type ||
      lesson?.lessonType ||
      "scenario-choice",
    tips: lesson?.tips || "",
    context: (lesson?.context || []).map((entry) => ({
      term: entry.term || "",
      definition: entry.definition || "",
    })),
    sampleQuestions,
    variationId: `${lessonId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
}

async function fetchGeneratedLessonQuestions(lesson, grade, unit, lessonId) {
  const response = await fetch(LESSON_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    body: JSON.stringify(buildLessonGenerationPayload(lesson, grade, unit, lessonId)),
  });

  if (!response.ok) {
    throw new Error(`Lesson API error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data?.questions) || data.questions.length === 0) {
    throw new Error("Lesson API returned no questions");
  }

  return data.questions;
}

function Lesson() {
  const { grade, unit, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const unitLessons = lessonsData[grade]?.[unit] || [];
  const lesson = unitLessons.find((item) => item.id === Number(lessonId));

  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const activeQuestions = useMemo(() => {
    return generatedQuestions?.length
      ? generatedQuestions
      : lesson?.questions || [];
  }, [generatedQuestions, lesson]);

  const initialQuestionFromState = Number.isInteger(location.state?.currentQuestion)
    ? location.state.currentQuestion
    : 0;

  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionFromState);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const [selectedBudgetItems, setSelectedBudgetItems] = useState([]);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);

  const [revealedCards, setRevealedCards] = useState([]);

  const [availableItems, setAvailableItems] = useState([]);
  const [leftBucketItems, setLeftBucketItems] = useState([]);
  const [rightBucketItems, setRightBucketItems] = useState([]);
  const [draggedItemId, setDraggedItemId] = useState(null);

  const [showHintPopup, setShowHintPopup] = useState(false);
  const [hintMessage, setHintMessage] = useState("");
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const currentBudgetTotal = useMemo(() => {
    return selectedBudgetItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  }, [selectedBudgetItems]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url || typeof url !== "string") return "";

    const trimmedUrl = url.trim();
    if (!trimmedUrl) return "";

    try {
      const parsed = new URL(trimmedUrl);

      if (
        parsed.hostname.includes("youtube.com") ||
        parsed.hostname.includes("www.youtube.com")
      ) {
        const videoId = parsed.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (parsed.pathname.startsWith("/embed/")) {
          return trimmedUrl;
        }
      }

      if (parsed.hostname.includes("youtu.be")) {
        const videoId = parsed.pathname.replace("/", "");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return "";
    } catch (error) {
      return "";
    }
  };

  const lessonVideoUrl = lesson?.videoUrl || "";
  const lessonVideoEmbedUrl = getYoutubeEmbedUrl(lessonVideoUrl);
  const hasLessonVideo = Boolean(lessonVideoEmbedUrl);

  useEffect(() => {
    let isMounted = true;

    async function loadGeneratedQuestions() {
      if (!lesson) return;

      setIsGeneratingQuestions(true);
      setGenerationError("");
      setGeneratedQuestions(null);

      try {
        const questions = await fetchGeneratedLessonQuestions(lesson, grade, unit, lessonId);

        if (isMounted) {
          setGeneratedQuestions(questions);
          setCurrentQuestion(0);
        }
      } catch (error) {
        console.error("Failed to generate lesson questions:", error);

        if (isMounted) {
          setGenerationError(
            "Could not load fresh AI questions, so the saved lesson is shown instead."
          );
          setGeneratedQuestions(null);
          setCurrentQuestion(
            Math.min(
              initialQuestionFromState,
              Math.max((lesson?.questions?.length || 1) - 1, 0)
            )
          );
        }
      } finally {
        if (isMounted) {
          setIsGeneratingQuestions(false);
        }
      }
    }

    loadGeneratedQuestions();

    return () => {
      isMounted = false;
    };
  }, [lesson, grade, unit, lessonId, initialQuestionFromState]);

  useEffect(() => {
    if (!lesson || activeQuestions.length === 0) return;

    const clampedIndex = Math.min(currentQuestion, activeQuestions.length - 1);

    if (clampedIndex !== currentQuestion) {
      setCurrentQuestion(clampedIndex);
      return;
    }

    const q = activeQuestions[clampedIndex];
    const qType = q.type || lesson.type || "scenario-choice";

    setFeedback("");
    setFeedbackType("");
    setIsStepComplete(false);
    setWrongAttempts(0);
    setSelectedOptionIndex(null);

    setSelectedBudgetItems([]);
    setBudgetSubmitted(false);

    setRevealedCards([]);
    setDraggedItemId(null);

    setShowHintPopup(false);
    setHintMessage("");
    setShowVideoPopup(false);

    if (qType === "drag-drop") {
      setAvailableItems(q.items || []);
      setLeftBucketItems([]);
      setRightBucketItems([]);
    } else {
      setAvailableItems([]);
      setLeftBucketItems([]);
      setRightBucketItems([]);
    }
  }, [lesson, currentQuestion, activeQuestions]);

  if (!lesson) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Lesson not found</h2>;
  }

  if (isGeneratingQuestions) {
    return (
      <div className="lesson-loading-screen">
        <div className="lesson-loading-card">
          <div className="lesson-loading-spinner"></div>
          <h2>PennyPals is building your lesson!</h2>
          <p>Please wait while we make fun money questions and picture cards for you.</p>
        </div>
      </div>
    );
  }

  if (activeQuestions.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Question not found
      </h2>
    );
  }

  const q = activeQuestions[currentQuestion];

  if (!q) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Question not found</h2>;
  }

  const questionType = q.type || lesson.type || "scenario-choice";

  const bucketConfig = q.bucketConfig || {
    left: {
      id: "need",
      title: "Needs",
      subtitle: "Must-have items",
    },
    right: {
      id: "want",
      title: "Wants",
      subtitle: "Fun extras",
    },
  };

  const LEFT_BUCKET = bucketConfig.left.id;
  const RIGHT_BUCKET = bucketConfig.right.id;

  const getDefaultInstruction = () => {
    if (questionType === "scenario-choice") {
      return "Tap the best picture.";
    }

    if (questionType === "budget-builder") {
      return "Pick items for your budget.";
    }

    if (questionType === "tap-reveal") {
      return "Tap a clue card first.";
    }

    if (questionType === "drag-drop") {
      return "";
    }

    return "Tap a picture to start.";
  };

  const progress =
    activeQuestions.length > 0
      ? ((currentQuestion + 1) / activeQuestions.length) * 100
      : 0;

  const getMiniTitle = () => {
    return q.shortTitle || q.scenarioTitle || lesson.title;
  };

  const getMiniText = () => {
    return q.shortText || q.scenarioText;
  };

  const getMiniQuestion = () => {
    return q.shortQuestion || q.question;
  };

  const getOptionLabel = (option) => {
    return option.shortText || option.text;
  };

  const getHintFromLessonData = () => {
    return (
      q.hintPopup ||
      q.generalHint ||
      lesson.tips ||
      "Think carefully about the smartest money choice."
    );
  };

  const markLessonComplete = () => {
    const key = `progress_${grade}_${unit}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];

    if (!saved.includes(Number(lessonId))) {
      const updated = [...saved, Number(lessonId)];
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    }

    return saved;
  };

  const awardLessonCoins = () => {
  const rewardKey = `coins_awarded_${grade}_${unit}_${lessonId}`;

  if (!localStorage.getItem(rewardKey)) {
    addCoins(LESSON_REWARD);
    localStorage.setItem(rewardKey, "true");
  }
};

  const awardUnitCoins = (completedLessonCount) => {
    const totalLessonsInUnit = unitLessons.length;
    const unitRewardKey = `unit_reward_awarded_${grade}_${unit}`;

    if (
      totalLessonsInUnit > 0 &&
      completedLessonCount === totalLessonsInUnit &&
      !localStorage.getItem(unitRewardKey)
    ) {
      addCoins(UNIT_REWARD);
      localStorage.setItem(unitRewardKey, "true");
    }
  };

  const handleNext = () => {
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const completedLessons = markLessonComplete();
      awardLessonCoins();
      awardUnitCoins(completedLessons.length);
      navigate(`/lessons/${grade}/${unit}`);
    }
  };

  const handleContext = () => {
    setHintMessage(getHintFromLessonData());
    setShowHintPopup(true);
  };

  const getFeedbackClass = () => {
    if (feedbackType === "correct") return "feedback-pill feedback-correct";
    if (feedbackType === "hint") return "feedback-pill feedback-hint";
    if (feedbackType === "info") return "feedback-pill feedback-info";
    return "feedback-pill";
  };

  const getFeedbackTitle = () => {
    if (feedbackType === "correct") return "Awesome!";
    if (feedbackType === "hint") return "Try again";
    if (feedbackType === "info") return "Nice!";
    return "Tip";
  };

  const chooseScenarioOption = (option, index) => {
    setSelectedOptionIndex(index);

    if (option.isBest) {
      setFeedback(option.effect || "Awesome! That is the best choice.");
      setFeedbackType("correct");
      setIsStepComplete(true);
      return;
    }

    const nextWrongCount = wrongAttempts + 1;
    setWrongAttempts(nextWrongCount);
    setIsStepComplete(false);

    setFeedback(option.hint || q.generalHint || "Not quite. Tap the smarter picture.");
    setFeedbackType("hint");
  };

  const toggleBudgetItem = (item) => {
    const alreadySelected = selectedBudgetItems.some((picked) => picked.id === item.id);

    if (alreadySelected) {
      setSelectedBudgetItems((prev) => prev.filter((picked) => picked.id !== item.id));
      return;
    }

    setSelectedBudgetItems((prev) => [...prev, item]);
  };

  const submitBudgetBuilder = () => {
    const pickedIds = selectedBudgetItems.map((item) => item.id).sort();
    const correctIds = (q.correctItemIds || []).slice().sort();

    const sameLength = pickedIds.length === correctIds.length;
    const sameItems =
      sameLength && pickedIds.every((id, index) => id === correctIds[index]);
    const withinBudget = currentBudgetTotal <= Number(q.budget || 0);

    setBudgetSubmitted(true);

    if (sameItems && withinBudget) {
      setFeedback(q.successMessage || `Awesome! You stayed in $${q.budget}.`);
      setFeedbackType("correct");
      setIsStepComplete(true);
    } else if (!withinBudget) {
      setFeedback(`Too much! Stay under $${q.budget}.`);
      setFeedbackType("hint");
      setIsStepComplete(false);
    } else {
      setFeedback(q.generalHint || "Good try! Pick the more important items first.");
      setFeedbackType("hint");
      setIsStepComplete(false);
    }
  };

  const toggleRevealCard = (cardId) => {
    if (revealedCards.includes(cardId)) return;
    setRevealedCards((prev) => [...prev, cardId]);
  };

  const answerTapReveal = (option) => {
    if (option.isBest) {
      setFeedback(option.effect || "Nice job! You used the clues.");
      setFeedbackType("correct");
      setIsStepComplete(true);
    } else {
      setFeedback(option.hint || q.generalHint || "Not yet. Check the clues again.");
      setFeedbackType("hint");
      setIsStepComplete(false);
    }
  };

  const handleDragStart = (itemId) => {
    setDraggedItemId(itemId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const classifyItem = (item, bucket) => {
    if (!item) return;

    const actualBucket = item.bucket;
    const label = item.label || item.name || "This item";
    const isCorrect = actualBucket === bucket;

    if (!isCorrect) {
      const correctBucket =
        actualBucket === LEFT_BUCKET
          ? bucketConfig.left.title
          : bucketConfig.right.title;

      setFeedback(`${label} belongs in ${correctBucket}. Try again!`);
      setFeedbackType("hint");
      setIsStepComplete(false);
      return;
    }

    setAvailableItems((prev) => prev.filter((entry) => entry.id !== item.id));

    if (bucket === LEFT_BUCKET) {
      setLeftBucketItems((prev) => [...prev, item]);
    } else {
      setRightBucketItems((prev) => [...prev, item]);
    }

    const remainingCount = availableItems.length - 1;

    if (remainingCount === 0) {
      setFeedback(q.successMessage || "Awesome! You sorted all the items.");
      setFeedbackType("correct");
      setIsStepComplete(true);
    } else {
      setFeedback(`Nice! ${label} is in the right spot.`);
      setFeedbackType("info");
      setIsStepComplete(false);
    }
  };

  const handleDropToBucket = (bucket) => {
    if (!draggedItemId) return;
    const draggedItem = availableItems.find((item) => item.id === draggedItemId);
    classifyItem(draggedItem, bucket);
    setDraggedItemId(null);
  };

  const getContextImages = () => {
    const imgs = [];
    if (!lesson.context) return imgs;

    lesson.context.forEach((entry) => {
      if (Array.isArray(entry.example_img)) {
        entry.example_img.forEach((src) => {
          if (src) imgs.push(src);
        });
      }
    });

    return imgs;
  };

  const getVisualGallery = () => {
    const visuals = [];

    if (q.questionImg) {
      visuals.push({ src: q.questionImg, alt: "lesson visual" });
    }

    if (q.images?.length) {
      q.images.forEach((imgObj, index) => {
        if (imgObj?.questionImg) {
          visuals.push({
            src: imgObj.questionImg,
            alt: `lesson visual ${index + 1}`,
          });
        }
      });
    }

    if (q.options?.length) {
      q.options.forEach((option, index) => {
        if (option.img) {
          visuals.push({
            src: option.img,
            alt: option.text || `option ${index + 1}`,
          });
        }
      });
    }

    getContextImages().forEach((src, index) => {
      visuals.push({
        src,
        alt: `context visual ${index + 1}`,
      });
    });

    const seen = new Set();
    return visuals
      .filter((item) => {
        if (!item.src || seen.has(item.src)) return false;
        seen.add(item.src);
        return true;
      })
      .slice(0, 6);
  };

  const renderHero = () => {
    const gallery = getVisualGallery();

    if (gallery.length > 0) {
      const mainImage = gallery[0];
      const extraImages = gallery.slice(1, 5);

      return (
        <div className="hero-gallery">
          <div className="hero-main-image-wrap">
            <img
              src={mainImage.src}
              className="hero-main-image"
              alt={mainImage.alt}
            />
            <div className="hero-badge">✨ Picture clue</div>
          </div>

          {extraImages.length > 0 && (
            <div className="hero-thumb-row">
              {extraImages.map((item, index) => (
                <img
                  key={`${item.src}-${index}`}
                  src={item.src}
                  className="hero-thumb"
                  alt={item.alt}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (q.heroEmoji || q.heroCaption) {
      return (
        <div className="hero-gallery hero-gallery-fallback">
          <div className="hero-fallback-emoji">{q.heroEmoji || "💡"}</div>
          <div className="hero-fallback-caption">
            {q.heroCaption || lesson.title}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="lesson-shell">
      <div className="lesson-container">
        {generationError && (
          <div
            className="feedback-pill feedback-hint"
            style={{ marginBottom: "14px" }}
          >
            <span>{generationError}</span>
          </div>
        )}

        <div className="lesson-topbar">
          <div className="progress-wrap">
            <div className="lesson-progress-text">
              <span className="progress-chip">Lesson {lessonId}</span>
              <span className="progress-chip">
                {currentQuestion + 1} / {activeQuestions.length}
              </span>
            </div>

            <div className="progress-bar-border">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {showHintPopup && (
          <div className="hint-popup">
            <div className="hint-popup-content">
              <span className="hint-popup-icon">💡</span>
              <div className="hint-popup-text">
                <strong>Hint:</strong> {hintMessage}
              </div>
              <button
                className="hint-popup-close"
                onClick={() => setShowHintPopup(false)}
                aria-label="Close hint"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {showVideoPopup && hasLessonVideo && (
          <div
            className="video-popup-overlay"
            onClick={() => setShowVideoPopup(false)}
          >
            <div
              className="video-popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="video-popup-close"
                onClick={() => setShowVideoPopup(false)}
                aria-label="Close video"
                type="button"
              >
                ×
              </button>

              <div className="video-popup-frame-wrap">
                <iframe
                  className="video-popup-frame"
                  src={lessonVideoEmbedUrl}
                  title={`${lesson.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        <div className="questions-container">
          <div className="left-container">
            <div className={`scenario-box ${questionType === "budget-builder" ? "scenario-box-budget" : ""}`}>
              {questionType === "budget-builder" && (
                <div className="scenario-top-row">
                  <div
                    className={`budget-total-card budget-total-card-inline ${
                      currentBudgetTotal > Number(q.budget || 0) ? "over-budget" : ""
                    }`}
                  >
                    <span>Total</span>
                    <strong>
                      ${currentBudgetTotal} / ${q.budget}
                    </strong>
                  </div>
                </div>
              )}

              <h3 className="scenario-title">{getMiniTitle()}</h3>

              {getMiniText() && <p className="scenario-text">{getMiniText()}</p>}

              {(q.walletAmount !== undefined ||
                q.goal ||
                (q.budget !== undefined && questionType !== "budget-builder")) && (
                <div className="scenario-stats">
                  {q.walletAmount !== undefined && (
                    <div className="scenario-pill">
                      <strong>💰</strong> ${q.walletAmount}
                    </div>
                  )}
                  {q.budget !== undefined && questionType !== "budget-builder" && (
                    <div className="scenario-pill">
                      <strong>🛒</strong> ${q.budget}
                    </div>
                  )}
                  {q.goal && (
                    <div className="scenario-pill">
                      <strong>🎯</strong> {q.goal}
                    </div>
                  )}
                </div>
              )}

              <h4 className="question-text">{getMiniQuestion()}</h4>
            </div>

            {renderHero()}
          </div>

          <div className="option-container">
            {questionType === "scenario-choice" && (
              <>
                {q.options?.map((option, index) => (
                  <button
                    className={`option-btn ${selectedOptionIndex === index ? "selected-option" : ""}`}
                    key={index}
                    onClick={() => chooseScenarioOption(option, index)}
                  >
                    <div className="option-top">
                      {option.img ? (
                        <img src={option.img} className="option-img" alt={option.text} />
                      ) : (
                        <div className="option-emoji">{option.emoji || "⭐"}</div>
                      )}
                    </div>

                    <div className="option-copy">
                      <p className="option-txt">{getOptionLabel(option)}</p>
                    </div>
                  </button>
                ))}
              </>
            )}

            {questionType === "budget-builder" && (
              <div className="activity-panel">
                <div className="budget-grid">
                  {q.items?.map((item) => {
                    const isPicked = selectedBudgetItems.some((picked) => picked.id === item.id);

                    return (
                      <button
                        key={item.id}
                        className={`budget-item-card ${isPicked ? "budget-item-selected" : ""}`}
                        onClick={() => toggleBudgetItem(item)}
                      >
                        <div className="budget-item-emoji">{item.emoji || "🛍️"}</div>
                        {item.img && (
                          <img src={item.img} alt={item.name} className="budget-item-img" />
                        )}
                        <div className="budget-item-name">{item.name}</div>
                        <div className="budget-item-price">${item.price}</div>
                        {item.tag ? <div className="budget-item-tag">{item.tag}</div> : null}
                      </button>
                    );
                  })}
                </div>

                <button className="check-btn" onClick={submitBudgetBuilder}>
                  Check
                </button>

                {budgetSubmitted && q.showAnswerTip && (
                  <p className="mini-tip">Pick needs first.</p>
                )}
              </div>
            )}

            {questionType === "tap-reveal" && (
              <div className="activity-panel">
                <div className="clue-grid">
                  {q.cards?.map((card) => {
                    const isOpen = revealedCards.includes(card.id);

                    return (
                      <button
                        key={card.id}
                        className={`clue-card ${isOpen ? "clue-card-open" : ""}`}
                        onClick={() => toggleRevealCard(card.id)}
                      >
                        {!isOpen ? (
                          <>
                            <div className="clue-cover-emoji">{card.coverEmoji || "🃏"}</div>
                            <div className="clue-cover-text">Tap for more hints!</div>
                          </>
                        ) : (
                          <>
                            <div className="clue-open-emoji">{card.emoji || "💡"}</div>
                            <div className="clue-open-title">{card.title}</div>
                            <div className="clue-open-text">{card.text}</div>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="tap-answer-grid">
                  {q.options?.map((option, index) => (
                    <button
                      key={index}
                      className="tap-answer-btn"
                      onClick={() => answerTapReveal(option)}
                    >
                      {getOptionLabel(option)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {questionType === "drag-drop" && (
              <div className="activity-panel activity-panel-drag">
                <div className="drag-layout">
                  <div className="drag-buckets-panel">
                    <div className="drag-buckets-title">Drop Zone</div>

                    <div className="drag-drop-zone-list">
                      <div
                        className={`drop-zone need-zone ${draggedItemId ? "drop-zone-ready" : ""}`}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDropToBucket(LEFT_BUCKET)}
                      >
                        <h4>{bucketConfig.left.title}</h4>
                        <p className="drop-zone-mini">{bucketConfig.left.subtitle}</p>

                        <div className="sorted-items">
                          {leftBucketItems.map((item) => (
                            <div key={item.id} className="sorted-pill">
                              <span>{item.emoji || "✅"}</span>
                              <span>{item.label || item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`drop-zone want-zone ${draggedItemId ? "drop-zone-ready" : ""}`}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDropToBucket(RIGHT_BUCKET)}
                      >
                        <h4>{bucketConfig.right.title}</h4>
                        <p className="drop-zone-mini">{bucketConfig.right.subtitle}</p>

                        <div className="sorted-items">
                          {rightBucketItems.map((item) => (
                            <div key={item.id} className="sorted-pill">
                              <span>{item.emoji || "✅"}</span>
                              <span>{item.label || item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="drag-items-panel">
                    <div className="drag-items-title">Pick a Picture</div>

                    <div className="drag-bank">
                      {availableItems.map((item) => (
                        <div
                          key={item.id}
                          className={`drag-item-card ${draggedItemId === item.id ? "drag-item-active" : ""}`}
                          draggable
                          onDragStart={() => handleDragStart(item.id)}
                        >
                          <div className="drag-item-glow"></div>

                          {item.img ? (
                            <img src={item.img} alt={item.name} className="drag-item-img" />
                          ) : (
                            <div className="drag-item-emoji">{item.emoji || "📦"}</div>
                          )}

                          <div className="drag-item-label">
                            {item.label || item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lesson-sticky-bar">
        <div className="lesson-sticky-inner">
          <div className="sticky-feedback-wrap">
            {feedback ? (
              <div className={getFeedbackClass()}>
                <strong>{getFeedbackTitle()}</strong>
                <span>{feedback}</span>
              </div>
            ) : getDefaultInstruction() ? (
              <div className="feedback-pill feedback-empty">
                <span>{getDefaultInstruction()}</span>
              </div>
            ) : null}
          </div>

          <div className="sticky-actions">
            <button className="context-btn" onClick={handleContext}>
              Hint
            </button>

            {hasLessonVideo && (
              <button
                className="video-btn"
                onClick={() => setShowVideoPopup(true)}
                type="button"
              >
                Watch Video
              </button>
            )}

            <button className="next-btn" onClick={handleNext} disabled={!isStepComplete}>
              {currentQuestion === activeQuestions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;