import { useState, useEffect, useRef, useCallback } from "react";
import { getPetTips, getRandomTip } from "../data/petTips";

const IDLE_TIMEOUT = 45000; // 45 seconds before mascot speaks
const STUCK_TIMEOUT = 30000; // 30 seconds before showing help tip

const MOODS = {
  happy: {
    emoji: "🐰",
    bubble: "bg-green-100 border-green-300",
    text: "text-green-700",
    glow: "shadow-green-200",
    label: "Happy!",
  },
  hungry: {
    emoji: "😿",
    bubble: "bg-orange-100 border-orange-300",
    text: "text-orange-700",
    glow: "shadow-orange-200",
    label: "Hungry!",
  },
  thirsty: {
    emoji: "😮",
    bubble: "bg-blue-100 border-blue-300",
    text: "text-blue-700",
    glow: "shadow-blue-200",
    label: "Thirsty!",
  },
  sad: {
    emoji: "😢",
    bubble: "bg-purple-100 border-purple-300",
    text: "text-purple-700",
    glow: "shadow-purple-200",
    label: "Needs care!",
  },
};

const MESSAGES = {
  idle: [
    "Still there? You got this! 💪",
    "Take your time — I believe in you! ⭐",
    "Need a hint? Just keep reading! 📖",
    "You're doing amazing, keep going! 🚀",
  ],
  happy: [
    "I'm so happy today! 🌟",
    "Thanks for taking care of me! 💛",
    "You're the best! Let's learn! 📚",
  ],
  hungry: [
    "I'm a little hungry… 🥕",
    "Visit the Pet Shop to feed me! 🛒",
    "Food = happy pet! 😊",
  ],
  thirsty: [
    "I'm thirsty! Buy me some water? 💧",
    "Don't forget to water me! 🫧",
  ],
  sad: [
    "I need some love! Visit the Pet Shop! 🏪",
    "Please take care of me! 🙏",
  ],
  celebrate: [
    "YESSS! You did it!! 🎉🎊",
    "WOW! Amazing work! ⭐⭐⭐",
    "You're a money genius! 🧠💰",
    "Coins earned! So proud of you! 🥇",
  ],
  lessons: [
    "Learning is fun! Keep going! 📖",
    "You're getting smarter every second! 🧠",
    "Finish this lesson to earn coins! 💰",
  ],
  assessments: [
    "You've got this! Trust yourself! 💪",
    "Read the question carefully! 🔍",
    "I know you know this! 🌟",
  ],
  shop: [
    "Ooh, buy me a toy! 🧸",
    "I love the Pet Shop! 🛒",
    "Spend your coins wisely! 💡",
  ],
};

function getPetMood(stats) {
  if (!stats) return "happy";
  if (stats.health < 30 || stats.happiness < 30) return "sad";
  if (stats.water < 30) return "thirsty";
  if (stats.health < 50) return "hungry";
  return "happy";
}

function getPageMessage(pathname, mood) {
  if (pathname.includes("lesson")) return randomFrom(MESSAGES.lessons);
  if (pathname.includes("assessment") || pathname.includes("quiz"))
    return randomFrom(MESSAGES.assessments);
  if (pathname.includes("shop")) return randomFrom(MESSAGES.shop);
  return randomFrom(MESSAGES[mood] || MESSAGES.happy);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PetMascot({ currentPath = "", pageType = "", lessonId = "", quizId = "" }) {
  const [petStats, setPetStats] = useState(null);
  const [petName, setPetName] = useState("Peanut");
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [stuckTip, setStuckTip] = useState(null);
  const [showStuckTip, setShowStuckTip] = useState(false);
  const idleTimer = useRef(null);
  const messageTimeout = useRef(null);
  const stuckTimer = useRef(null);
  // Load pet data from localStorage
  const loadPetData = useCallback(() => {
    try {
      const saved = localStorage.getItem("pennyPals_pet");
      if (saved) {
        const data = JSON.parse(saved);
        setPetStats(data.stats);
        setPetName(data.name || "Peanut");
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    loadPetData();
    // Poll every 10s for stat updates
    const interval = setInterval(loadPetData, 10000);
    return () => clearInterval(interval);
  }, [loadPetData]);

  // Determine mood
  const mood = getPetMood(petStats);
  const moodConfig = MOODS[mood];

  // Show a timed message bubble
  const showMsg = useCallback(
    (msg, duration = 4000) => {
      setMessage(msg);
      setShowMessage(true);
      setIsWiggling(true);
      clearTimeout(messageTimeout.current);
      messageTimeout.current = setTimeout(() => {
        setShowMessage(false);
        setIsWiggling(false);
      }, duration);
    },
    []
  );

  // Show a stuck/help tip
  const showTipForStuck = useCallback(() => {
    const tips = getPetTips(pageType, lessonId, quizId);
    const tip = getRandomTip(tips);
    setStuckTip(tip);
    setShowStuckTip(true);
    setIsWiggling(true);
  }, [pageType, lessonId, quizId]);

  // Idle detection - general encouragement after 45s
  // Stuck detection (on lessons/quizzes)
  const resetStuckTimer = useCallback(() => {
    clearTimeout(stuckTimer.current);

    // Only trigger stuck tips on lesson/quiz pages
    if (pageType === "lesson" || pageType === "quiz") {
      stuckTimer.current = setTimeout(() => {
        showTipForStuck();
      }, STUCK_TIMEOUT);
    }
  }, [pageType, showTipForStuck]);

  // Setup activity tracking for stuck detection
  useEffect(() => {
    const handleActivity = () => {
      resetStuckTimer();
      // Also reset idle timer on any activity
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        showMsg(randomFrom(MESSAGES.idle), 5000);
      }, IDLE_TIMEOUT);
    };

    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);
    resetStuckTimer();
    // Start idle timer on mount
    idleTimer.current = setTimeout(() => {
      showMsg(randomFrom(MESSAGES.idle), 5000);
    }, IDLE_TIMEOUT);

    return () => {
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearTimeout(stuckTimer.current);
      clearTimeout(idleTimer.current);
    };
  }, [resetStuckTimer, showMsg]);

  // Page-change greeting
  useEffect(() => {
    const msg = getPageMessage(currentPath, mood);
    setTimeout(() => showMsg(msg, 3500), 800);
  }, [currentPath, mood, showMsg]);

  // Celebrate event listener
  useEffect(() => {
    const handleCelebrate = () => {
      showMsg(randomFrom(MESSAGES.celebrate), 5000);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 1500);
    };
    window.addEventListener("pennypals:celebrate", handleCelebrate);
    return () =>
      window.removeEventListener("pennypals:celebrate", handleCelebrate);
  }, [showMsg]);

  // Click the pet to say something (or get help if on lesson/quiz)
  const handlePetClick = () => {
    // On lesson/quiz pages, clicking pet shows a help tip
    if (pageType === "lesson" || pageType === "quiz") {
      showTipForStuck();
    } else {
      showMsg(getPageMessage(currentPath, mood), 4000);
    }
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-20px) scale(1.15); }
          60% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.7) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .mascot-float { animation: float 3s ease-in-out infinite; }
        .mascot-wiggle { animation: wiggle 0.4s ease-in-out 3; }
        .mascot-bounce { animation: bounce 0.6s ease-in-out; }
        .msg-pop { animation: popIn 0.25s ease-out; }
        .mascot-pulse {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "8px",
          pointerEvents: "none",
        }}
      >
        {/* Message Bubble + Stuck Tip */}
        {(showMessage && message && !isMinimized) || (showStuckTip && stuckTip && !isMinimized) ? (
          <div
            className={`msg-pop ${moodConfig.bubble} ${moodConfig.text}`}
            style={{
              pointerEvents: "auto",
              maxWidth: "220px",
              padding: "12px 16px",
              borderRadius: "16px 16px 4px 16px",
              border: "1.5px solid",
              fontSize: "13px",
              fontWeight: "600",
              lineHeight: "1.5",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              cursor: "pointer",
              userSelect: "none",
              background:
                showStuckTip && stuckTip
                  ? "linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)"
                  : moodConfig.bubble,
              borderColor:
                showStuckTip && stuckTip ? "#FCA5A5" : "currentColor",
              color: showStuckTip && stuckTip ? "#92400E" : "currentColor",
            }}
            onClick={() => {
              setShowMessage(false);
              setShowStuckTip(false);
            }}
          >
            {showStuckTip && stuckTip ? (
              <>
                <div style={{ marginBottom: "4px" }}>💡 Got stuck? Here's a tip:</div>
                <div style={{ fontSize: "12px", fontStyle: "italic" }}>
                  {stuckTip}
                </div>
              </>
            ) : (
              message
            )}
            <div
              style={{
                fontSize: "10px",
                marginTop: "6px",
                opacity: 0.6,
                fontWeight: 400,
              }}
            >
              tap to close
            </div>
          </div>
        ) : null}

        {/* Pet Avatar */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
            {!isMinimized && (
            <button
              onClick={() => setIsMinimized(true)}
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid #e5e7eb",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                padding: 0,
              }}
              title="Minimize pet"
            >
              −
            </button>
          )}

          {/* The Pet */}
          <div
            className={
              isWiggling
                ? "mascot-wiggle"
                : isBouncing
                ? "mascot-bounce"
                : "mascot-float"
            }
            onClick={isMinimized ? () => setIsMinimized(false) : handlePetClick}
            style={{
              cursor: "pointer",
              position: "relative",
              userSelect: "none",
            }}
          >
            {/* Glow ring */}
            {!isMinimized && (
              <div
                style={{
                  position: "absolute",
                  inset: "-6px",
                  borderRadius: "50%",
                  background:
                    mood === "happy"
                      ? "rgba(134,239,172,0.3)"
                      : mood === "thirsty"
                      ? "rgba(147,197,253,0.3)"
                      : mood === "hungry"
                      ? "rgba(253,186,116,0.3)"
                      : "rgba(216,180,254,0.3)",
                  filter: "blur(6px)",
                }}
              />
            )}

            {/* Avatar circle */}
            <div
              style={{
                width: isMinimized ? "60px" : "100px",
                height: isMinimized ? "60px" : "100px",
                borderRadius: "50%",
                background: "white",
                border: `3px solid ${
                  mood === "happy"
                    ? "#86efac"
                    : mood === "thirsty"
                    ? "#93c5fd"
                    : mood === "hungry"
                    ? "#fdba74"
                    : "#d8b4fe"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMinimized ? "32px" : "56px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                position: "relative",
              }}
            >
              {moodConfig.emoji}

              {/* Mood badge */}
              {!isMinimized && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    right: "-2px",
                    background: "white",
                    border: "2px solid #f3f4f6",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {mood === "happy"
                    ? "😊"
                    : mood === "thirsty"
                    ? "💧"
                    : mood === "hungry"
                    ? "🍎"
                    : "💜"}
                </div>
              )}
            </div>

            {/* Pet name + status */}
            {!isMinimized && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "8px",
                  background: "white",
                  borderRadius: "14px",
                  padding: "4px 14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  {petName}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color:
                      mood === "happy"
                        ? "#16a34a"
                        : mood === "thirsty"
                        ? "#2563eb"
                        : mood === "hungry"
                        ? "#ea580c"
                        : "#9333ea",
                    fontWeight: "600",
                  }}
                >
                  {moodConfig.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Helper: dispatch celebrate event from anywhere in your app
// Usage: import { celebratePet } from './PetMascot'
export function celebratePet() {
  window.dispatchEvent(new CustomEvent("pennypals:celebrate"));
}
