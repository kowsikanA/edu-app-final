import React, { useEffect, useMemo, useState } from "react";
import { useCoins } from "../../coinUtils";
import "./Investments.css";

const INVESTMENTS_STORAGE_KEY = "pennypalsInvestmentsState_v1";
const GOAL_AMOUNT = 300;
const INVEST_AMOUNT = 20;

const defaultState = {
  weekCount: 1,
  helperMessage: "Pick a place for your coins!",
  portfolio: {
    savingsNest: 0,
    petBakery: 0,
    toyRocketLab: 0,
  },
  weeklyResults: [
    { name: "Welcome!", value: "+0", mood: "neutral", emoji: "🌟" },
  ],
};

function Investments() {
  const [coins, setCoins] = useCoins();
  const [hasLoaded, setHasLoaded] = useState(false);

  const [weekCount, setWeekCount] = useState(defaultState.weekCount);
  const [helperMessage, setHelperMessage] = useState(defaultState.helperMessage);
  const [portfolio, setPortfolio] = useState(defaultState.portfolio);
  const [weeklyResults, setWeeklyResults] = useState(defaultState.weeklyResults);

  const investments = [
    {
      id: "savingsNest",
      name: "Nest",
      emoji: "🪺",
      mood: "Calm",
      risk: "Safe",
      colorClass: "safe-card",
      tip: "Slow and steady!",
    },
    {
      id: "petBakery",
      name: "Bakery",
      emoji: "🧁",
      mood: "Bouncy",
      risk: "Mix",
      colorClass: "mix-card",
      tip: "Some up, some down!",
    },
    {
      id: "toyRocketLab",
      name: "Rocket",
      emoji: "🚀",
      mood: "Wild",
      risk: "Risky",
      colorClass: "risky-card",
      tip: "Big jumps can happen!",
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(INVESTMENTS_STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setWeekCount(
          typeof parsed.weekCount === "number"
            ? parsed.weekCount
            : defaultState.weekCount
        );

        setHelperMessage(
          parsed.helperMessage || defaultState.helperMessage
        );

        setPortfolio({
          savingsNest: Number(parsed?.portfolio?.savingsNest || 0),
          petBakery: Number(parsed?.portfolio?.petBakery || 0),
          toyRocketLab: Number(parsed?.portfolio?.toyRocketLab || 0),
        });

        setWeeklyResults(
          Array.isArray(parsed.weeklyResults) && parsed.weeklyResults.length > 0
            ? parsed.weeklyResults
            : defaultState.weeklyResults
        );
      } catch (error) {
        console.error("Could not load investment progress:", error);
      }
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    const stateToSave = {
      weekCount,
      helperMessage,
      portfolio,
      weeklyResults,
    };

    localStorage.setItem(
      INVESTMENTS_STORAGE_KEY,
      JSON.stringify(stateToSave)
    );
  }, [hasLoaded, weekCount, helperMessage, portfolio, weeklyResults]);

  const investedCoins =
    portfolio.savingsNest + portfolio.petBakery + portfolio.toyRocketLab;

  const goalProgress = investedCoins;
  const progressPercent = Math.min((goalProgress / GOAL_AMOUNT) * 100, 100);
  const coinsNeeded = Math.max(GOAL_AMOUNT - goalProgress, 0);

  const starsFilled = useMemo(() => {
    if (goalProgress >= 300) return 5;
    if (goalProgress >= 240) return 4;
    if (goalProgress >= 180) return 3;
    if (goalProgress >= 120) return 2;
    if (goalProgress >= 60) return 1;
    return 0;
  }, [goalProgress]);

  const rank = useMemo(() => {
    if (goalProgress >= 300) return "Dream Builder";
    if (goalProgress >= 220) return "Coin Champ";
    if (goalProgress >= 150) return "Smart Saver";
    return "Starter";
  }, [goalProgress]);

  const investCoins = (investmentId, investmentName, tip) => {
    if (coins < INVEST_AMOUNT) {
      setHelperMessage("Not enough coins!");
      return;
    }

    setCoins((prev) => prev - INVEST_AMOUNT);

    setPortfolio((prev) => ({
      ...prev,
      [investmentId]: prev[investmentId] + INVEST_AMOUNT,
    }));

    setHelperMessage(`${investmentName} time! ${tip}`);
  };

  const getWeeklyReturn = (investmentId) => {
    if (investmentId === "savingsNest") {
      const outcomes = [5, 6, 8, 10];
      return outcomes[Math.floor(Math.random() * outcomes.length)];
    }

    if (investmentId === "petBakery") {
      const outcomes = [15, 10, 5, 0, -5];
      return outcomes[Math.floor(Math.random() * outcomes.length)];
    }

    if (investmentId === "toyRocketLab") {
      const outcomes = [30, 20, 10, -10, -15];
      return outcomes[Math.floor(Math.random() * outcomes.length)];
    }

    return 0;
  };

  const advanceWeek = () => {
    const activeInvestments = investments.filter((item) => portfolio[item.id] > 0);

    if (activeInvestments.length === 0) {
      setHelperMessage("Pick a card first!");
      setWeeklyResults([
        { name: "Oops", value: "+0", mood: "neutral", emoji: "👀" },
      ]);
      return;
    }

    const updatedPortfolio = { ...portfolio };

    const newResults = activeInvestments.map((item) => {
      const result = getWeeklyReturn(item.id);
      const nextValue = Math.max(updatedPortfolio[item.id] + result, 0);
      updatedPortfolio[item.id] = nextValue;

      return {
        name: item.name,
        value: result >= 0 ? `+${result}` : `${result}`,
        mood: result > 0 ? "good" : result < 0 ? "bad" : "neutral",
        emoji: item.emoji,
      };
    });

    setPortfolio(updatedPortfolio);
    setWeeklyResults(newResults);
    setWeekCount((prev) => prev + 1);

    const totalAfterWeek =
      updatedPortfolio.savingsNest +
      updatedPortfolio.petBakery +
      updatedPortfolio.toyRocketLab;

    const totalChange = newResults.reduce((sum, item) => {
      return sum + Number(item.value);
    }, 0);

    if (totalAfterWeek >= GOAL_AMOUNT) {
      setHelperMessage("You built the dream home!");
    } else if (totalChange > 0) {
      setHelperMessage("Your coins grew!");
    } else if (totalChange < 0) {
      setHelperMessage("Some weeks wobble!");
    } else {
      setHelperMessage("This week stayed the same!");
    }
  };

  return (
    <div className="invest-page">
      <div className="invest-shell">
        <div className="invest-top-banner">
          <div className="banner-left">
            <div className="banner-badge">Week {weekCount}</div>
            <h1>Pet Coin Garden</h1>
            <p className="banner-subtitle">Grow coins. Build dreams.</p>
          </div>
        </div>

        <div className="goal-card">
          <div className="goal-visual">
            <div className="pet-home">🏡</div>
            <div className="pet-row">🐶 🐱 🐰</div>
          </div>

          <div className="goal-info">
            <div className="goal-title-row">
              <h2>Dream Pet Home</h2>
              <span className="goal-rank">{rank}</span>
            </div>

            <div className="star-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= starsFilled ? "star filled" : "star"}
                >
                  ⭐
                </span>
              ))}
            </div>

            <div className="goal-progress-text">
              <span>{goalProgress} / {GOAL_AMOUNT}</span>
              <span>{coinsNeeded} left</span>
            </div>

            <div className="goal-progress-bar">
              <div
                className="goal-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="goal-mini-stats">
              <div className="mini-stat">
                <span className="mini-icon">📦</span>
                <span>{investedCoins} invested</span>
              </div>
            </div>
          </div>

          <div className="mascot-box">
            <div className="mascot-face">🐶</div>
            <div className="mascot-speech">{helperMessage}</div>
          </div>
        </div>

        <div className="invest-section-label">Choose a coin place</div>

        <div className="invest-cards-area">
          {investments.map((item) => (
            <div key={item.id} className={`investment-card ${item.colorClass}`}>
              <div className="investment-scene">
                <div className="investment-emoji">{item.emoji}</div>
              </div>

              <div className="investment-name">{item.name}</div>

              <div className="investment-tags">
                <span className="tag-pill">{item.risk}</span>
                <span className="tag-pill">{item.mood}</span>
              </div>

              <div className="investment-coins">🪙 {portfolio[item.id]}</div>

              <button
                className="invest-btn"
                onClick={() => investCoins(item.id, item.name, item.tip)}
              >
                +20
              </button>
            </div>
          ))}
        </div>

        <div className="week-action-card">
          <div className="week-action-left">
            <div className="action-emoji">⏭️</div>
            <div>
              <h3>Next Week</h3>
              <p>See what happened!</p>
            </div>
          </div>

          <button className="advance-btn" onClick={advanceWeek}>
            Go
          </button>
        </div>

        <div className="results-panel">
          <div className="results-header">
            <h3>This Week</h3>
            <span className="results-small">Tiny wins and wobbles</span>
          </div>

          <div className="results-grid">
            {weeklyResults.map((item, index) => (
              <div key={index} className={`result-card ${item.mood}`}>
                <div className="result-emoji">{item.emoji}</div>
                <div className="result-name">{item.name}</div>
                <div className="result-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Investments;