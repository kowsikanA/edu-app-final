import { useState, useEffect, useCallback } from "react";
import { useCoins } from "../coinUtils";

const SHOP_ITEMS = [
  {
    id: "food",
    name: "Yummy Food",
    emoji: "🥕",
    cost: 8,
    stat: "health",
    boost: 15,
    color: "#FF8C42",
    bg: "#FFF4EE",
    border: "#FFD0B0",
    description: "Fills up health!",
  },
  {
    id: "water",
    name: "Fresh Water",
    emoji: "💧",
    cost: 6,
    stat: "water",
    boost: 20,
    color: "#4EA8DE",
    bg: "#EEF7FF",
    border: "#B8DEFF",
    description: "Quenches thirst!",
  },
  {
    id: "toy",
    name: "Fun Toy",
    emoji: "🧸",
    cost: 10,
    stat: "happiness",
    boost: 25,
    color: "#9B72CF",
    bg: "#F5F0FF",
    border: "#D9C7F5",
    description: "Boosts happiness!",
  },
];

const PET_EMOJI = {
  happy: "🐰",
  hungry: "😿",
  thirsty: "😮",
  sad: "😢",
};

const CARE_ACTIONS = [
  {
    id: "feed",
    label: "Feed",
    emoji: "🥕",
    item: "food",
    stat: "health",
    boost: 15,
    color: "#FF8C42",
    bg: "#FFF4EE",
  },
  {
    id: "water",
    label: "Water",
    emoji: "💧",
    item: "water",
    stat: "water",
    boost: 20,
    color: "#4EA8DE",
    bg: "#EEF7FF",
  },
  {
    id: "play",
    label: "Play",
    emoji: "🎾",
    item: "toy",
    stat: "happiness",
    boost: 25,
    color: "#9B72CF",
    bg: "#F5F0FF",
  },
];

function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

function getMood(stats) {
  if (stats.health < 30 || stats.happiness < 30) return "sad";
  if (stats.water < 30) return "thirsty";
  if (stats.health < 50) return "hungry";
  return "happy";
}

function getStatusText(mood) {
  const map = {
    happy: "Doing great! 😊",
    hungry: "A bit hungry… 🥕",
    thirsty: "Getting thirsty! 💧",
    sad: "Needs some love! 💜",
  };
  return map[mood];
}

function loadState() {
  try {
    const raw = localStorage.getItem("pennyPals_pet");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch {}
  return {
    name: "Peanut",
    stats: { health: 81, water: 68, happiness: 87 },
    bag: { food: 0, water: 0, toy: 0 },
    lastCareAt: 0,
  };
}

function saveState(state) {
  localStorage.setItem("pennyPals_pet", JSON.stringify(state));
}

function StatBar({ label, emoji, value, color, darkMode }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: "600",
            color: darkMode ? "#F8FAFC" : "#374151",
          }}
        >
          {emoji} {label}
        </span>
        <span style={{ fontSize: "15px", fontWeight: "700", color }}>
          {`${Math.round(value)}%`}
        </span>
      </div>
      <div
        style={{
          height: "12px",
          background: darkMode ? "rgba(255,255,255,0.12)" : "#F3F4F6",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: "999px",
            transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}

function Toast({ msg, onDone, darkMode }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [msg, onDone]);

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        background: darkMode ? "#0F172A" : "#1F2937",
        color: "white",
        padding: "12px 24px",
        borderRadius: "999px",
        fontSize: "14px",
        fontWeight: "600",
        zIndex: 1000,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        animation: "fadeSlide 0.25s ease",
        whiteSpace: "nowrap",
      }}
    >
      {msg}
    </div>
  );
}

export default function PetShopPage({ darkMode = false }) {
  const [petState, setPetState] = useState(loadState);
  const [coins, setCoins] = useCoins();
  const [toast, setToast] = useState(null);
  const [buying, setBuying] = useState(null);
  const [caring, setCaring] = useState(null);

  const mood = getMood(petState.stats);
  const petEmoji = PET_EMOJI[mood];
  // const darkMode =
  //   typeof document !== "undefined" &&
  //   document.body.classList.contains("theme-dark");

  const pageBackground = darkMode
    ? "linear-gradient(135deg, #22344d 0%, #1e3551 50%, #1b2f48 100%)"
    : "linear-gradient(135deg, #FFF9F0 0%, #F0F7FF 50%, #F5F0FF 100%)";

  const cardBackground = darkMode ? "rgba(30, 41, 59, 0.94)" : "white";
  const cardBorder = darkMode
    ? "1px solid rgba(148,163,184,0.24)"
    : "1px solid rgba(0,0,0,0.05)";
  const mainText = darkMode ? "#F8FAFC" : "#1F2937";
  const softText = darkMode ? "#D6E3F1" : "#6B7280";
  const darkShadow = darkMode
    ? "0 10px 24px rgba(0,0,0,0.22)"
    : "0 4px 20px rgba(0,0,0,0.07)";

  // Stat decay
  useEffect(() => {
    const interval = setInterval(() => {
      setPetState((prev) => {
        const now = Date.now();
        const lastCareAt = prev.lastCareAt || 0;

        if (now - lastCareAt < 2 * 60 * 1000) {
          return prev;
        }

        const updated = {
          ...prev,
          stats: {
            health: clamp(prev.stats.health - 0.25),
            water: clamp(prev.stats.water - 0.35),
            happiness: clamp(prev.stats.happiness - 0.2),
          },
        };
        saveState(updated);
        return updated;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => setToast(msg);

  const handleBuy = useCallback(
    (item) => {
      if (coins < item.cost) return;
      setBuying(item.id);
      setTimeout(() => {
        setCoins((prev) => prev - item.cost);
        setPetState((prev) => {
          const updated = {
            ...prev,
            bag: {
              ...prev.bag,
              [item.id]: (prev.bag[item.id] || 0) + 1,
            },
          };
          saveState(updated);
          return updated;
        });
        showToast(`Got ${item.emoji} ${item.name}!`);
        setBuying(null);
      }, 400);
    },
    [coins, setCoins]
  );

  const handleCare = useCallback(
    (action) => {
      if ((petState.bag[action.item] || 0) <= 0) return;
      setCaring(action.id);
      setTimeout(() => {
        setPetState((prev) => {
          const updated = {
            ...prev,
            bag: {
              ...prev.bag,
              [action.item]: prev.bag[action.item] - 1,
            },
            stats: {
              ...prev.stats,
              [action.stat]: clamp(prev.stats[action.stat] + action.boost),
            },
            lastCareAt: Date.now(),
          };
          saveState(updated);
          return updated;
        });
        showToast(`${action.label} successful! 🎉`);
        setCaring(null);
      }, 300);
    },
    [petState.bag]
  );

  return (
    <>
      <style>{`
        @keyframes fadeSlide { from { opacity:0; transform: translateX(-50%) translateY(-12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
        @keyframes petBounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-12px)} 70%{transform:translateY(-4px)} }
        @keyframes petWiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-10deg)} 75%{transform:rotate(10deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .pet-float { animation: float 3s ease-in-out infinite; }
        .pet-wiggle { animation: petWiggle 0.4s ease-in-out 3; }
        .btn-care:hover { filter: brightness(0.98); transform: scale(1.03); }
        .btn-care:active { transform: scale(0.97); }
        .btn-buy:hover { filter: brightness(0.97); }
        .btn-buy:active { transform: scale(0.97); }
        .shop-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
      `}</style>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} darkMode={darkMode} />}

      <div
        style={{
          minHeight: "100vh",
          background: pageBackground,
          padding: "32px 16px",
          fontFamily: "'Nunito', 'Segoe UI', sans-serif",
          zoom: "1.15",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: mainText,
                margin: 0,
              }}
            >
              🏪 Pet Shop
            </h1>
            <p style={{ color: softText, margin: "4px 0 0", fontSize: "20px" }}>
              Buy items and take care of your pet!
            </p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
              borderRadius: "999px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
            }}
          >
            <span style={{ fontSize: "20px" }}>🪙</span>
            <span style={{ fontSize: "20px", fontWeight: "800", color: "white" }}>
              {coins}
            </span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Coins
            </span>
          </div>
        </div>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: cardBackground,
              borderRadius: "24px",
              padding: "28px",
              boxShadow: darkShadow,
              border: cardBorder,
              gridColumn: "1",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                className={caring ? "pet-wiggle" : "pet-float"}
                style={{
                  display: "flex",
                  background:
                    mood === "happy"
                      ? "linear-gradient(135deg, #D1FAE5, #A7F3D0)"
                      : mood === "thirsty"
                      ? "linear-gradient(135deg, #DBEAFE, #BFDBFE)"
                      : mood === "hungry"
                      ? "linear-gradient(135deg, #FEF3C7, #FDE68A)"
                      : "linear-gradient(135deg, #EDE9FE, #DDD6FE)",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  fontSize: "52px",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
                }}
              >
                {petEmoji}
              </div>

              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "800",
                  color: mainText,
                }}
              >
                {petState.name}
              </div>

              <div
                style={{
                  display: "inline-block",
                  marginTop: "6px",
                  background:
                    mood === "happy"
                      ? "#D1FAE5"
                      : mood === "thirsty"
                      ? "#DBEAFE"
                      : mood === "hungry"
                      ? "#FEF3C7"
                      : "#EDE9FE",
                  color:
                    mood === "happy"
                      ? "#065F46"
                      : mood === "thirsty"
                      ? "#1E40AF"
                      : mood === "hungry"
                      ? "#92400E"
                      : "#5B21B6",
                  padding: "4px 14px",
                  borderRadius: "999px",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                {getStatusText(mood)}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: mainText,
                  marginBottom: "16px",
                  margin: "0 0 16px",
                }}
              >
                Pet Stats
              </h3>

              <StatBar
                label="Health"
                emoji="❤️"
                value={petState.stats.health}
                color="#EF4444"
                darkMode={darkMode}
              />
              <StatBar
                label="Water"
                emoji="💧"
                value={petState.stats.water}
                color="#3B82F6"
                darkMode={darkMode}
              />
              <StatBar
                label="Happy"
                emoji="🌈"
                value={petState.stats.happiness}
                color="#8B5CF6"
                darkMode={darkMode}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {CARE_ACTIONS.map((action) => {
                const hasItem = (petState.bag[action.item] || 0) > 0;
                return (
                  <button
                    key={action.id}
                    className="btn-care"
                    onClick={() => handleCare(action)}
                    disabled={!hasItem || caring === action.id}
                    style={{
                      background: hasItem
                        ? darkMode
                          ? `${action.color}22`
                          : action.bg
                        : darkMode
                        ? "rgba(255,255,255,0.06)"
                        : "#F3F4F6",
                      color: hasItem ? action.color : darkMode ? "#94A3B8" : "#9CA3AF",
                      border: `1.5px solid ${
                        hasItem ? action.color : darkMode ? "rgba(255,255,255,0.12)" : "#E5E7EB"
                      }`,
                      borderRadius: "14px",
                      padding: "12px",
                      fontSize: "17px",
                      fontWeight: "700",
                      cursor: hasItem && caring !== action.id ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div>{action.emoji}</div>
                    <div style={{ marginTop: "2px" }}>{action.label}</div>
                    <div style={{ fontSize: "14px", marginTop: "2px", opacity: 0.7 }}>
                      {petState.bag[action.item] || 0}/1
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                background: cardBackground,
                borderRadius: "24px",
                padding: "24px",
                boxShadow: darkShadow,
                border: cardBorder,
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: mainText,
                  margin: "0 0 16px",
                }}
              >
                🎒 My Bag
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                }}
              >
                {SHOP_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: darkMode ? `${item.color}18` : item.bg,
                      borderRadius: "14px",
                      padding: "12px 8px",
                      textAlign: "center",
                      border: `1.5px solid ${darkMode ? `${item.color}88` : item.border}`,
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{item.emoji}</div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: darkMode ? "#E2E8F0" : "#6B7280",
                        marginTop: "2px",
                      }}
                    >
                      {item.name.split(" ")[0]}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: item.color,
                        lineHeight: 1,
                        marginTop: "2px",
                      }}
                    >
                      {petState.bag[item.id] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: cardBackground,
                borderRadius: "24px",
                padding: "24px",
                boxShadow: darkShadow,
                border: cardBorder,
                flex: 1,
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: mainText,
                  margin: "0 0 16px",
                }}
              >
                🛒 Shop
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {SHOP_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="shop-card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: darkMode ? `${item.color}18` : item.bg,
                      borderRadius: "16px",
                      padding: "14px 16px",
                      border: `1.5px solid ${darkMode ? `${item.color}88` : item.border}`,
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginRight: "14px" }}>
                      {item.emoji}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "800",
                          color: mainText,
                        }}
                      >
                        {item.name}
                      </div>

                      <div
                        style={{
                          fontSize: "15px",
                          color: item.color,
                          fontWeight: "600",
                        }}
                      >
                        {item.description}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "4px",
                        }}
                      >
                        <span style={{ fontSize: "15px" }}>🪙</span>
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: "800",
                            color: "#F59E0B",
                          }}
                        >
                          {item.cost}
                        </span>
                        <span
                          style={{
                            fontSize: "15px",
                            color: darkMode ? "#CBD5E1" : "#9CA3AF",
                            marginLeft: "2px",
                          }}
                        >
                          coins
                        </span>
                      </div>
                    </div>

                    <button
                      className="btn-buy"
                      onClick={() => handleBuy(item)}
                      disabled={coins < item.cost || buying === item.id}
                      style={{
                        background:
                          coins >= item.cost
                            ? `linear-gradient(135deg, ${item.color}, ${item.color}CC)`
                            : darkMode
                            ? "rgba(255,255,255,0.08)"
                            : "#E5E7EB",
                        color: coins >= item.cost ? "white" : darkMode ? "#94A3B8" : "#9CA3AF",
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 18px",
                        fontSize: "14px",
                        fontWeight: "800",
                        cursor:
                          coins >= item.cost && buying !== item.id
                            ? "pointer"
                            : "not-allowed",
                        transition: "all 0.2s ease",
                        boxShadow:
                          coins >= item.cost
                            ? `0 4px 12px ${item.color}40`
                            : "none",
                        minWidth: "64px",
                      }}
                    >
                      {buying === item.id ? "..." : "Buy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}