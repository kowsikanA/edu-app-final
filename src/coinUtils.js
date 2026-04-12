import { useEffect, useState } from "react";

const PRIMARY_COINS_KEY = "pennypalsCoins";
const LEGACY_COINS_KEY = "coins";
const DEFAULT_COINS = 0;

export const readCoins = () => {
  const primaryRaw = localStorage.getItem(PRIMARY_COINS_KEY);
  const legacyRaw = localStorage.getItem(LEGACY_COINS_KEY);

  const raw = primaryRaw ?? legacyRaw ?? DEFAULT_COINS;
  const parsed = Number(raw);

  return Number.isNaN(parsed) ? DEFAULT_COINS : parsed;
};

export const writeCoins = (value) => {
  const safeValue = Math.max(0, Number(value) || 0);

  localStorage.setItem(PRIMARY_COINS_KEY, String(safeValue));
  localStorage.setItem(LEGACY_COINS_KEY, String(safeValue));
  window.dispatchEvent(new Event("coins-updated"));
};

export const addCoins = (delta) => {
  const current = readCoins();
  const next = Math.max(0, current + delta);
  writeCoins(next);
  return next;
};

export const useCoins = () => {
  const [coins, setCoinsState] = useState(readCoins());

  useEffect(() => {
    const handleStorage = (event) => {
      if (
        event.key &&
        event.key !== PRIMARY_COINS_KEY &&
        event.key !== LEGACY_COINS_KEY
      ) {
        return;
      }

      setCoinsState(readCoins());
    };

    const handleCoinsUpdated = () => {
      setCoinsState(readCoins());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("coins-updated", handleCoinsUpdated);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("coins-updated", handleCoinsUpdated);
    };
  }, []);

  const setCoins = (value) => {
    const next = typeof value === "function" ? value(readCoins()) : value;
    if (Number.isNaN(next)) return;

    writeCoins(next);
    setCoinsState(next);
  };

  return [coins, setCoins];
};