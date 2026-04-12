import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./PrizeShelf.css";

function PrizeShelf() {
  const navigate = useNavigate();
  const rewardsStorageKey = "savingLessonRewards-single-game";

  const collectedRewards = useMemo(() => {
    try {
      const savedRewards = localStorage.getItem(rewardsStorageKey);
      const parsed = savedRewards ? JSON.parse(savedRewards) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load rewards:", error);
      return [];
    }
  }, []);

  const topShelf = collectedRewards.slice(0, 4);
  const middleShelf = collectedRewards.slice(4, 8);
  const bottomShelf = collectedRewards.slice(8, 12);

  return (
  <div className="prize-shelf-page">
    <span className="prize-floating-emoji pe1">🪙</span>
    <span className="prize-floating-emoji pe2">⭐</span>
    <span className="prize-floating-emoji pe3">💸</span>
    <span className="prize-floating-emoji pe4">🎯</span>
    <span className="prize-floating-emoji pe5">🏆</span>
    <span className="prize-floating-emoji pe6">💰</span>
    <span className="prize-floating-emoji pe7">✨</span>
    <span className="prize-floating-emoji pe8">🛍️</span>
    <span className="prize-floating-emoji pe9">🪙</span>
    <span className="prize-floating-emoji pe10">⭐</span>

    <div className="prize-shelf-shell">
        <div className="prize-shelf-header">
          <h1>Prize Shelf</h1>
          <p>Your collected rewards live here.</p>

          <button
            className="prize-back-btn"
            onClick={() => navigate("/simulator")}
          >
            Back to Game
          </button>
        </div>

        <div className="clean-shelf-board">
          <div className="clean-shelf-row">
            {topShelf.map((reward) => (
              <div key={reward.item} className="clean-prize-card">
                <div className="clean-prize-emoji">{reward.emoji}</div>
                <div className="clean-prize-name">{reward.item}</div>
              </div>
            ))}
          </div>

          <div className="clean-shelf-plank" />

          <div className="clean-shelf-row">
            {middleShelf.map((reward) => (
              <div key={reward.item} className="clean-prize-card">
                <div className="clean-prize-emoji">{reward.emoji}</div>
                <div className="clean-prize-name">{reward.item}</div>
              </div>
            ))}
          </div>

          <div className="clean-shelf-plank" />

          <div className="clean-shelf-row">
            {bottomShelf.map((reward) => (
              <div key={reward.item} className="clean-prize-card">
                <div className="clean-prize-emoji">{reward.emoji}</div>
                <div className="clean-prize-name">{reward.item}</div>
              </div>
            ))}
          </div>

          <div className="clean-shelf-plank" />
        </div>

        {collectedRewards.length === 0 && (
          <div className="empty-shelf-note">
            No prizes yet. Play the investment game to earn your first reward.
          </div>
        )}
      </div>
    </div>
  );
}

export default PrizeShelf;