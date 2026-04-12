import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameData from "../../data/game";
import "./SimulatorGame.css";

function SimulatorGame() {
  const navigate = useNavigate();
  const lesson = gameData?.game?.[0];

  const MAX_FUN = 12;

  const rewardGoals = [
  {
    item: lesson?.goal?.item || "Bike",
    cost: lesson?.goal?.cost || 50,
    emoji: "🚲",
  },
  { item: "Helmet", cost: 60, emoji: "⛑️" },
  { item: "Pet Bed", cost: 45, emoji: "🛏️" },
  { item: "Toy Car", cost: 55, emoji: "🚗" },
  { item: "Pet House", cost: 70, emoji: "🏠" },
  { item: "Fancy Collar", cost: 40, emoji: "🦴" },
  { item: "Skateboard", cost: 60, emoji: "🛹" },
  { item: "Kite", cost: 30, emoji: "🪁" },
  { item: "Teddy Bear", cost: 35, emoji: "🧸" },
  { item: "Soccer Ball", cost: 28, emoji: "⚽" },
  { item: "Roller Skates", cost: 55, emoji: "🛼" },
  { item: "Backpack", cost: 32, emoji: "🎒" },
  { item: "Magic Wand", cost: 40, emoji: "🪄" },
  { item: "Toy Train", cost: 48, emoji: "🚂" },
  { item: "Camera", cost: 52, emoji: "📷" },
  { item: "Bean Bag", cost: 46, emoji: "🛋️" },
  { item: "Treasure Chest", cost: 75, emoji: "🗝️" },
  { item: "Robot Toy", cost: 62, emoji: "🤖" },
  { item: "Snow Globe", cost: 42, emoji: "❄️" },
  { item: "Puzzle Box", cost: 27, emoji: "🧩" },
  { item: "Book Stack", cost: 24, emoji: "📚" },
  { item: "Star Trophy", cost: 80, emoji: "🏆" },
];

  const startingMoney = lesson?.startingMoney || 0;
  const startingFun = lesson?.startingFun ?? 6;
  const targetFun = lesson?.targetFun ?? 7;
  const actions = lesson?.actions || [];

  const progressStorageKey = "savingLessonState-single-game-v3";
  const rewardsStorageKey = "savingLessonRewards-single-game";
  const goalIndexStorageKey = "savingLessonGoalIndex-single-game";

  const clampFun = (value) => Math.max(0, Math.min(MAX_FUN, value));

  function getSavedGoalIndex() {
    try {
      const savedIndex = localStorage.getItem(goalIndexStorageKey);
      const parsed = Number(savedIndex);

      if (!Number.isNaN(parsed) && parsed >= 0 && parsed < rewardGoals.length) {
        return parsed;
      }
    } catch (error) {
      console.error("Failed to load goal index:", error);
    }

    return 0;
  }

  const [goalIndex, setGoalIndex] = useState(getSavedGoalIndex);

  const currentGoal = rewardGoals[goalIndex];
  const goal = currentGoal?.item || "Bike";
  const goalCost = currentGoal?.cost || 50;
  const goalEmoji = currentGoal?.emoji || "🎁";

  function getCollectedRewards() {
    try {
      const savedRewards = localStorage.getItem(rewardsStorageKey);
      const parsed = savedRewards ? JSON.parse(savedRewards) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load rewards:", error);
      return [];
    }
  }

  const [collectedRewards, setCollectedRewards] = useState(getCollectedRewards);

  function getActionWeight(action, counts) {
    const used = counts[action.text] ?? 0;
    const baseWeight = action.weight ?? 3;
    return Math.max(0.8, baseWeight - used * 0.6);
  }

  function pickWeightedRandom(pool, counts) {
    if (pool.length === 0) return null;

    const weightedPool = pool.map((action) => ({
      action,
      weight: getActionWeight(action, counts),
    }));

    const totalWeight = weightedPool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const item of weightedPool) {
      random -= item.weight;
      if (random <= 0) {
        return item.action;
      }
    }

    return weightedPool[weightedPool.length - 1].action;
  }

  function getBalancedChoices(counts) {
    const moneyActions = actions.filter(
      (action) =>
        action.saveAmount !== undefined || action.earnAmount !== undefined
    );

    const funActions = actions.filter(
      (action) => action.spendAmount !== undefined
    );

    const chosen = [];

    const moneyPick = pickWeightedRandom(moneyActions, counts);
    if (moneyPick) chosen.push(moneyPick);

    const remainingFun = funActions.filter(
      (action) => !chosen.find((item) => item.text === action.text)
    );

    const funPick = pickWeightedRandom(remainingFun, counts);
    if (funPick) chosen.push(funPick);

    const remainingAll = actions.filter(
      (action) => !chosen.find((item) => item.text === action.text)
    );

    const extraPick = pickWeightedRandom(remainingAll, counts);
    if (extraPick) chosen.push(extraPick);

    while (chosen.length < 3) {
      const leftovers = actions.filter(
        (action) => !chosen.find((item) => item.text === action.text)
      );

      if (leftovers.length === 0) break;

      const nextPick = pickWeightedRandom(leftovers, counts);
      if (!nextPick) break;

      chosen.push(nextPick);
    }

    return chosen;
  }

  function buildFreshGameState() {
    return {
      savedMoney: startingMoney,
      funLevel: startingFun,
      round: 1,
      usedCounts: {},
      currentChoices: getBalancedChoices({}),
      feedback: "Choose one action.",
    };
  }

  function getInitialState() {
    if (!lesson) {
      return {
        savedMoney: 0,
        funLevel: 0,
        round: 1,
        usedCounts: {},
        currentChoices: [],
        feedback: "Simulation game not found.",
      };
    }

    try {
      const savedGame = localStorage.getItem(progressStorageKey);

      if (savedGame) {
        const parsed = JSON.parse(savedGame);

        return {
          savedMoney: parsed.savedMoney ?? startingMoney,
          funLevel: parsed.funLevel ?? startingFun,
          round: parsed.round ?? 1,
          usedCounts: parsed.usedCounts ?? {},
          currentChoices:
            parsed.currentChoices && parsed.currentChoices.length > 0
              ? parsed.currentChoices
              : getBalancedChoices(parsed.usedCounts ?? {}),
          feedback: parsed.feedback || "Choose one action.",
        };
      }
    } catch (error) {
      console.error("Failed to load saved lesson state:", error);
    }

    return buildFreshGameState();
  }

  const initialState = getInitialState();

  const [savedMoney, setSavedMoney] = useState(initialState.savedMoney);
  const [funLevel, setFunLevel] = useState(initialState.funLevel);
  const [feedback, setFeedback] = useState(
    initialState.feedback || "Choose one action."
  );
  const [round, setRound] = useState(initialState.round);
  const [hasChosen, setHasChosen] = useState(false);
  const [selectedActionText, setSelectedActionText] = useState("");
  const [usedCounts, setUsedCounts] = useState(initialState.usedCounts);
  const [currentChoices, setCurrentChoices] = useState(initialState.currentChoices);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!lesson) return;

    try {
      const gameState = {
        savedMoney,
        funLevel,
        round,
        usedCounts,
        currentChoices,
        feedback,
      };

      localStorage.setItem(progressStorageKey, JSON.stringify(gameState));
    } catch (error) {
      console.error("Failed to save lesson state:", error);
    }
  }, [
    lesson,
    savedMoney,
    funLevel,
    round,
    usedCounts,
    currentChoices,
    feedback,
  ]);

  useEffect(() => {
    try {
      localStorage.setItem(goalIndexStorageKey, String(goalIndex));
    } catch (error) {
      console.error("Failed to save goal index:", error);
    }
  }, [goalIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(rewardsStorageKey, JSON.stringify(collectedRewards));
    } catch (error) {
      console.error("Failed to save rewards:", error);
    }
  }, [collectedRewards]);

  if (!lesson) {
    return <h2>Simulation game not found</h2>;
  }

  const moneyProgress = Math.min((savedMoney / goalCost) * 100, 100);
  const funProgress = Math.min((funLevel / MAX_FUN) * 100, 100);
  const funTargetPercent = (targetFun / MAX_FUN) * 100;

  const moneyReached = savedMoney >= goalCost;
  const funReached = funLevel >= targetFun;
  const isFinished = moneyReached && funReached;

  function buildActionMessage(action) {
    let moneyText = "";

    if (action.saveAmount !== undefined) moneyText = `Saved $${action.saveAmount}`;
    if (action.earnAmount !== undefined) moneyText = `Earned $${action.earnAmount}`;
    if (action.spendAmount !== undefined) moneyText = `Spent $${action.spendAmount}`;

    let funText = "";

    if (action.funChange > 0) funText = ` Fun +${action.funChange}`;
    else if (action.funChange < 0) funText = ` Fun ${action.funChange}`;

    return `${moneyText}${funText}`;
  }

  function handleAction(action) {
    if (hasChosen || isFinished || showPopup) return;

    setPendingAction(action);
    setPopupMessage(buildActionMessage(action));
    setShowPopup(true);
  }

  function handlePopupBack() {
    setPendingAction(null);
    setPopupMessage("");
    setShowPopup(false);
  }

  function handlePopupOk() {
    if (!pendingAction) {
      setShowPopup(false);
      return;
    }

    const action = pendingAction;

    let newSaved = savedMoney;
    let newFun = funLevel;

    if (action.saveAmount !== undefined) newSaved += action.saveAmount;
    if (action.earnAmount !== undefined) newSaved += action.earnAmount;

    if (action.spendAmount !== undefined) {
      newSaved -= action.spendAmount;
      if (newSaved < 0) newSaved = 0;
    }

    if (action.funChange !== undefined) {
      newFun = clampFun(newFun + action.funChange);
    }

    setSavedMoney(newSaved);
    setFunLevel(newFun);
    setSelectedActionText(action.text);
    setHasChosen(true);

    setUsedCounts((prev) => ({
      ...prev,
      [action.text]: (prev[action.text] ?? 0) + 1,
    }));

    setFeedback(buildActionMessage(action));

    setPendingAction(null);
    setPopupMessage("");
    setShowPopup(false);
  }

  function nextRound() {
    const updatedCounts = {
      ...usedCounts,
      [selectedActionText]: usedCounts[selectedActionText] ?? 0,
    };

    setRound((prev) => prev + 1);
    setHasChosen(false);
    setSelectedActionText("");
    setFeedback("Choose one action.");
    setCurrentChoices(getBalancedChoices(updatedCounts));
  }

  function saveCurrentRewardIfNeeded() {
  const rewardAlreadyCollected = collectedRewards.some(
    (reward) => reward.item === currentGoal.item
  );

  if (rewardAlreadyCollected) {
    return collectedRewards;
  }

  const updatedRewards = [
    ...collectedRewards,
    {
      item: currentGoal.item,
      cost: currentGoal.cost,
      emoji: currentGoal.emoji,
    },
  ];

  setCollectedRewards(updatedRewards);

  try {
    localStorage.setItem(rewardsStorageKey, JSON.stringify(updatedRewards));
  } catch (error) {
    console.error("Failed to save rewards:", error);
  }

  return updatedRewards;
}

function handleFinish() {
  saveCurrentRewardIfNeeded();

  const nextGoalIndex = (goalIndex + 1) % rewardGoals.length;
  setGoalIndex(nextGoalIndex);

  const freshState = buildFreshGameState();

  setSavedMoney(freshState.savedMoney);
  setFunLevel(freshState.funLevel);
  setRound(freshState.round);
  setUsedCounts(freshState.usedCounts);
  setCurrentChoices(freshState.currentChoices);
  setFeedback(`You earned ${currentGoal.emoji} ${currentGoal.item}! New goal started.`);
  setHasChosen(false);
  setSelectedActionText("");
  setPendingAction(null);
  setPopupMessage("");
  setShowPopup(false);

  try {
    localStorage.setItem(progressStorageKey, JSON.stringify(freshState));
    localStorage.setItem(goalIndexStorageKey, String(nextGoalIndex));
  } catch (error) {
    console.error("Failed to reset game after finish:", error);
  }
}

function getRewardStatus(reward) {
  const isEarned = collectedRewards.some(
    (savedReward) => savedReward.item === reward.item
  );

  return isEarned ? "earned" : "locked";
}

  return (
  <div className="saving-lesson-container">
    <span className="saving-floating-emoji se1">🪙</span>
    <span className="saving-floating-emoji se2">⭐</span>
    <span className="saving-floating-emoji se3">💸</span>
    <span className="saving-floating-emoji se4">🎯</span>
    <span className="saving-floating-emoji se5">🏆</span>
    <span className="saving-floating-emoji se6">💰</span>
    <span className="saving-floating-emoji se7">✨</span>
    <span className="saving-floating-emoji se8">🛍️</span>
    <span className="saving-floating-emoji se9">🪙</span>
    <span className="saving-floating-emoji se10">⭐</span>

    <div className="saving-corner-buttons">
    <button
      className="saving-help-button"
      onClick={() => setShowHelp(true)}
      aria-label="Help"
      title="Help"
    >
      ?
    </button>

    <button
      className="saving-shelf-float-button"
      onClick={() => navigate("/prize-shelf")}
      aria-label="Prize Shelf"
      title="Prize Shelf"
    >
      🏆
    </button>
  </div>

  <div className="saving-layout">
        <aside className="saving-rewards-sidebar">
          <div className="saving-rewards-track-card">
            <h3 className="saving-rewards-track-title">Goals</h3>

            <div className="saving-rewards-track-list">
              {rewardGoals.map((reward, index) => {
                const status = getRewardStatus(reward);
                return (
                  <div
                    key={reward.item}
                    className={`saving-track-item saving-track-item-${status}`}
                  >
                    <div className="saving-track-emoji-wrap">
                      <span className="saving-track-emoji">{reward.emoji}</span>
                      {status === "locked" && (
                        <span className="saving-track-lock">🔒</span>
                      )}
                    </div>

                
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="saving-main-board">
          <div className="saving-goal-box">
  <div className="saving-goal-content">
    <div className="saving-goal-text">
  <h2>
    {goalEmoji} Save for your {goal}
  </h2>
</div>

    <div className="saving-goal-piggy">
      <img
        src="https://pngimg.com/d/piggy_bank_PNG56.png"
        alt="Piggy Bank"
        className="saving-goal-piggy-img"
      />
    </div>
  </div>
</div>

          <div className="meter-section">
            <div className="meter-card">
              <div className="meter-header">
                <span>💰 Money Goal</span>
                <span>
                  ${savedMoney} / ${goalCost}
                </span>
              </div>

              <div className="saving-progress-border">
                <div
                  className="saving-progress-fill"
                  style={{ width: `${moneyProgress}%` }}
                />
              </div>
            </div>
          </div>

        

          <div className="saving-feedback-box">
            <p>{feedback}</p>
          </div>

          {!isFinished && (
            <>
              <p className="saving-round-text">Round {round}</p>

              <div className="saving-actions-grid">
                {currentChoices.map((action, index) => (
                  <button
                    key={`${action.text}-${index}`}
                    className={`saving-action-card ${
                      selectedActionText === action.text ? "saving-selected-card" : ""
                    }`}
                    onClick={() => handleAction(action)}
                    disabled={hasChosen || showPopup}
                  >
                    <img
                      src={action.img}
                      alt={action.text}
                      className="saving-action-img"
                    />

                    <p className="saving-action-title">{action.text}</p>

                    {action.saveAmount !== undefined && (
                      <p className="saving-action-money">
                        Earn +${action.saveAmount}
                      </p>
                    )}

                    {action.earnAmount !== undefined && (
                      <p className="saving-action-money">
                        Earn +${action.earnAmount}
                      </p>
                    )}

                    {action.spendAmount !== undefined && (
                      <p className="saving-action-money">
                        Spend -${action.spendAmount}
                      </p>
                    )}

                    {action.funChange !== undefined && (
                      <p
                        className={`saving-action-fun ${
                          action.funChange > 0 ? "fun-positive" : "fun-negative"
                        }`}
                      >
                        Fun {action.funChange > 0 ? `+${action.funChange}` : action.funChange}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {hasChosen && (
                <button className="saving-finish-btn" onClick={nextRound}>
                  Next Round
                </button>
              )}
            </>
          )}

          {isFinished && (
  <div className="saving-win-overlay">
    <div className="saving-win-modal">
      <div className="saving-win-badge">🎉 Goal Complete</div>
      <h2 className="saving-win-title">
        Congratulations! You completed the goal!
      </h2>

      <p className="saving-win-subtitle">
        You earned {goalEmoji} <strong>{goal}</strong>.
      </p>

      <p className="saving-win-helper">
        Want to see all your collected items? Visit your Prize Shelf.
      </p>

      <div className="saving-win-actions">
        <button
  className="saving-shelf-btn"
  onClick={() => {
    saveCurrentRewardIfNeeded();
    navigate("/prize-shelf");
  }}
>
  View Prize Shelf
</button>

        <button className="saving-finish-btn" onClick={handleFinish}>
          Start Next Goal
        </button>
      </div>
    </div>
  </div>
)}
        </div>

        <aside className="saving-fun-sidebar">
          <div className="saving-fun-card">
            <h3 className="saving-fun-title">Fun Meter</h3>

            <div className="saving-fun-meter-wrap">
              <div className="saving-fun-scale">
                <span>12</span>
                <span>10</span>
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
                <span>0</span>
              </div>

              <div className="saving-fun-track-vertical">
                <div
                  className={`saving-fun-fill-vertical ${
                    funReached ? "fun-good" : "fun-low"
                  }`}
                  style={{ height: `${funProgress}%` }}
                />

                <div
                  className="saving-fun-target-horizontal"
                  style={{ bottom: `${funTargetPercent}%` }}
                />
              </div>
            </div>

            <div className="saving-fun-values">
              <span>Now: {funLevel}/{MAX_FUN}</span>
              <span>Goal: {targetFun}</span>
            </div>
          </div>
        </aside>
      </div>

      {showPopup && (
        <div className="saving-popup-overlay">
          <div className="saving-popup-box">
            <h3 className="saving-popup-title">Warning</h3>
            <p className="saving-popup-text">{popupMessage}</p>

            <div className="saving-popup-actions">
              <button
                className="saving-popup-btn saving-popup-back-btn"
                onClick={handlePopupBack}
              >
                Back
              </button>

              <button
                className="saving-popup-btn"
                onClick={handlePopupOk}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showHelp && (
  <div className="saving-help-overlay">
    <div className="saving-help-modal">
      <div className="saving-help-badge">💡 How to Play</div>
      <h2 className="saving-help-title">How to win the game</h2>

      <div className="saving-help-steps">
        <div className="saving-help-step">
          <span className="saving-help-emoji">💰</span>
          <p>Pick actions that help you save or earn money.</p>
        </div>

        <div className="saving-help-step">
          <span className="saving-help-emoji">🎉</span>
          <p>Some fun choices cost money, but they help your Fun Meter go up.</p>
        </div>

        <div className="saving-help-step">
          <span className="saving-help-emoji">🎯</span>
          <p>Reach the money goal and keep your Fun Meter at the goal line.</p>
        </div>

        <div className="saving-help-step">
          <span className="saving-help-emoji">🏆</span>
          <p>When you win, you unlock a new reward for your Prize Shelf.</p>
        </div>
      </div>

      <button
        className="saving-help-close-btn"
        onClick={() => setShowHelp(false)}
      >
        Got it
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default SimulatorGame;