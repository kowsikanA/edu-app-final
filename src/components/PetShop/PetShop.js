// import React, { useMemo, useState } from "react";
// import "./PetShop.css";
// import { useCoins } from "../../coinUtils";

// const CATEGORIES = [
//   { id: "outfits", label: "Outfits", icon: "👕" },
//   { id: "accessories", label: "Accessories", icon: "🕶️" },
//   { id: "toys", label: "Toys", icon: "🧸" },
//   { id: "food", label: "Food", icon: "🍔" },
//   { id: "boosts", label: "Boosts", icon: "⚡" },
//   { id: "backgrounds", label: "Backgrounds", icon: "🌄" }
// ];

// const ITEMS = [
//   { id: "hoodie", cat: "outfits", name: "Hoodie", price: 80, emoji: "🧥", rarity: "rare" },
//   { id: "cap", cat: "outfits", name: "Cap", price: 40, emoji: "🧢", rarity: "common" },
//   { id: "shades", cat: "accessories", name: "Shades", price: 60, emoji: "🕶️", rarity: "rare" },
//   { id: "bone", cat: "food", name: "Treat", price: 15, emoji: "🦴", rarity: "common" },
//   { id: "burger", cat: "food", name: "Meal", price: 35, emoji: "🍔", rarity: "common" },
//   { id: "rocket", cat: "boosts", name: "Boost", price: 120, emoji: "🚀", rarity: "epic" },
//   { id: "mountain", cat: "backgrounds", name: "Mountains", price: 150, emoji: "🏔️", rarity: "epic" }
// ];

// export default function PetShop() {
//   const [cat, setCat] = useState("outfits");
//   const [coins, setCoins] = useCoins();
//   const [selected, setSelected] = useState(null);

//   const visibleItems = useMemo(
//     () => ITEMS.filter((item) => item.cat === cat),
//     [cat]
//   );

//   const buy = () => {
//     if (!selected) return;
//     if (coins < selected.price) return;
//     setCoins((current) => current - selected.price);
//   };

//   return (
//     <div className="ps-wrap">
//       <div className="ps-top">
//         <div className="ps-player">
//           <div className="ps-avatar">🧒</div>
//           <div className="ps-playerText">
//             <div className="ps-name">Player</div>
//             <div className="ps-sub">Level 2</div>
//           </div>
//         </div>

//         <div className="ps-currencies">
//           <div className="ps-pill">🪙 {coins}</div>
//           <div className="ps-pill ps-pillBlue">💎 20</div>
//         </div>

//         <div className="ps-topBtns">
//           <button className="ps-topBtn">🎯 Missions</button>
//           <button className="ps-topBtn">⚙️ Settings</button>
//         </div>
//       </div>

//       <div className="ps-grid">
//         <aside className="ps-panel">
//           <div className="ps-panelTitle">Shop</div>

//           <div className="ps-catList">
//             {CATEGORIES.slice(0, 3).map((category) => (
//               <button
//                 key={category.id}
//                 className={`ps-catBtn ${cat === category.id ? "active" : ""}`}
//                 onClick={() => setCat(category.id)}
//               >
//                 <span className="ps-catIcon">{category.icon}</span>
//                 <span className="ps-catText">{category.label}</span>
//               </button>
//             ))}
//           </div>

//           <div className="ps-bonus">
//             <div className="ps-bonusTitle">Daily Bonus</div>
//             <button className="ps-claim">Claim 🎁</button>
//             <div className="ps-timer">Next in 02:15:29</div>
//           </div>
//         </aside>

//         <main className="ps-stage">
//           <div className="ps-banner">
//             <div className="ps-bannerTitle">PennyPals Pet Shop</div>
//             <div className="ps-bannerSub">VIP Pet</div>
//           </div>

//           <div className="ps-platform">
//             <div className="ps-glow" />
//             <div className="ps-pet">
//               <div className="ps-petFace">🦊</div>
//               <div className="ps-petTag">Cool Buddy</div>
//             </div>

//             <div className="ps-loot ps-lootLeft">🪙🪙🪙</div>
//             <div className="ps-loot ps-lootRight">💵💵</div>
//           </div>

//           <div className="ps-items">
//             {visibleItems.map((item) => (
//               <button
//                 key={item.id}
//                 className={`ps-item ${selected?.id === item.id ? "selected" : ""} ${item.rarity}`}
//                 onClick={() => setSelected(item)}
//               >
//                 <div className="ps-itemEmoji">{item.emoji}</div>
//                 <div className="ps-itemPrice">🪙 {item.price}</div>
//               </button>
//             ))}
//           </div>

//           <div className="ps-buyBar">
//             <div className="ps-selected">
//               {selected ? (
//                 <>
//                   <span className="ps-bigEmoji">{selected.emoji}</span>
//                   <span className="ps-selectedName">{selected.name}</span>
//                 </>
//               ) : (
//                 <span className="ps-selectedHint">Pick an item ✨</span>
//               )}
//             </div>

//             <button className="ps-buyBtn" onClick={buy} disabled={!selected}>
//               Buy
//             </button>
//           </div>
//         </main>

//         <aside className="ps-panel">
//           <div className="ps-panelTitle">More</div>

//           <div className="ps-catList">
//             {CATEGORIES.slice(3).map((category) => (
//               <button
//                 key={category.id}
//                 className={`ps-catBtn ${cat === category.id ? "active" : ""}`}
//                 onClick={() => setCat(category.id)}
//               >
//                 <span className="ps-catIcon">{category.icon}</span>
//                 <span className="ps-catText">{category.label}</span>
//               </button>
//             ))}
//           </div>

//           <div className="ps-offer">
//             <div className="ps-offerTitle">Special Offer</div>
//             <div className="ps-offerChest">🧰✨</div>
//             <button className="ps-offerBtn">Open</button>
//             <div className="ps-offerNote">Coins only (no real money)</div>
//           </div>
//         </aside>
//       </div>

//       <div className="ps-bottom">
//         <button className="ps-navBtn ps-navPrimary">▶ Play</button>
//         <button className="ps-navBtn">👥 Friends</button>
//         <button className="ps-navBtn active">🛍️ Shop</button>
//         <button className="ps-navBtn">🎒 Inventory</button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import "./PetShop.css";
import { useCoins } from "../../coinUtils";

const PET_STORAGE_KEY = "pennyPalsPetDataSimple";

const DEFAULT_PET = {
  name: "Peanut",
  health: 80,
  water: 75,
  happiness: 85,
  inventory: {
    food: 1,
    waterBottle: 1,
    toy: 1,
  },
  lastUpdated: Date.now(),
};

const SHOP_ITEMS = [
  {
    id: "food",
    name: "Food",
    emoji: "🥕",
    price: 8,
  },
  {
    id: "waterBottle",
    name: "Water",
    emoji: "💧",
    price: 6,
  },
  {
    id: "toy",
    name: "Toy",
    emoji: "🧸",
    price: 10,
  },
];

const clamp = (value) => Math.max(0, Math.min(100, value));

const loadPetData = () => {
  try {
    const saved = localStorage.getItem(PET_STORAGE_KEY);
    if (!saved) return DEFAULT_PET;

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_PET,
      ...parsed,
      inventory: {
        ...DEFAULT_PET.inventory,
        ...(parsed.inventory || {}),
      },
    };
  } catch (error) {
    return DEFAULT_PET;
  }
};

const savePetData = (pet) => {
  localStorage.setItem(PET_STORAGE_KEY, JSON.stringify(pet));
};

const applyPassiveDecay = (pet) => {
  const now = Date.now();
  const lastUpdated = pet.lastUpdated || now;
  const elapsedMinutes = Math.floor((now - lastUpdated) / (1000 * 60));

  if (elapsedMinutes <= 0) {
    return { ...pet, lastUpdated: now };
  }

  const decaySteps = Math.min(elapsedMinutes, 180);

  return {
    ...pet,
    health: clamp(pet.health - decaySteps * 0.12),
    water: clamp(pet.water - decaySteps * 0.18),
    happiness: clamp(pet.happiness - decaySteps * 0.14),
    lastUpdated: now,
  };
};

function PetShop() {
  const [coins, setCoins] = useCoins();
  const [pet, setPet] = useState(() => applyPassiveDecay(loadPetData()));

  useEffect(() => {
    savePetData(pet);
  }, [pet]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPet((currentPet) => ({
        ...currentPet,
        health: clamp(currentPet.health - 1),
        water: clamp(currentPet.water - 2),
        happiness: clamp(currentPet.happiness - 1),
        lastUpdated: Date.now(),
      }));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const mood = useMemo(() => {
    const average = (pet.health + pet.water + pet.happiness) / 3;

    if (average >= 85) return "Super happy! 🌟";
    if (average >= 65) return "Doing great! 😊";
    if (average >= 40) return "Needs a little care 💛";
    return "Needs help! 🥺";
  }, [pet.health, pet.water, pet.happiness]);

  const handleBuyItem = (item) => {
    if (coins < item.price) return;

    setCoins((currentCoins) => currentCoins - item.price);

    setPet((currentPet) => ({
      ...currentPet,
      inventory: {
        ...currentPet.inventory,
        [item.id]: (currentPet.inventory[item.id] || 0) + 1,
      },
      lastUpdated: Date.now(),
    }));
  };

  const handleUseItem = (itemType) => {
    if ((pet.inventory[itemType] || 0) <= 0) return;

    let updates = {};

    if (itemType === "food") {
      updates = {
        health: clamp(pet.health + 14),
      };
    }

    if (itemType === "waterBottle") {
      updates = {
        water: clamp(pet.water + 18),
      };
    }

    if (itemType === "toy") {
      updates = {
        happiness: clamp(pet.happiness + 20),
      };
    }

    setPet((currentPet) => ({
      ...currentPet,
      ...updates,
      inventory: {
        ...currentPet.inventory,
        [itemType]: currentPet.inventory[itemType] - 1,
      },
      lastUpdated: Date.now(),
    }));
  };

  const statCards = [
    { key: "health", label: "Health", emoji: "❤️", value: pet.health },
    { key: "water", label: "Water", emoji: "💧", value: pet.water },
    { key: "happiness", label: "Happy", emoji: "🌈", value: pet.happiness },
  ];

  return (
    <div className="petshop-page">
      <div className="petshop-shell">
        <div className="petshop-header-card">
          <div>
            <h1>Pet Shop</h1>
            <p>Buy items and take care of your pet!</p>
          </div>

          <div className="petshop-coins-pill">
            <span>🪙</span>
            <strong>{coins}</strong>
            <span>Coins</span>
          </div>
        </div>

        <div className="petshop-main-grid">
          <section className="petshop-left-column">
            <div className="pet-main-card">
              <div className="pet-card">
                <div className="pet-avatar-wrap pet-bunny">
                  <div className="pet-avatar">🐰</div>
                </div>

                <div className="pet-main-info">
                  <h2>{pet.name}</h2>
                  <div className="pet-mood-badge">{mood}</div>
                </div>
              </div>

              <div className="pet-stats-section">
                <h3>Pet Bars</h3>

                {statCards.map((stat) => (
                  <div key={stat.key} className="stat-row">
                    <div className="stat-label">
                      <span>{stat.emoji}</span>
                      <span>{stat.label}</span>
                    </div>

                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>

                    <span className="stat-value">{Math.round(stat.value)}%</span>
                  </div>
                ))}
              </div>

              <div className="pet-care-section">

                <div className="pet-care-buttons">
                  <button onClick={() => handleUseItem("food")}>Feed 🥕</button>
                  <button onClick={() => handleUseItem("waterBottle")}>Water 💧</button>
                  <button onClick={() => handleUseItem("toy")}>Play 🧸</button>
                </div>
              </div>
            </div>
          </section>

          <section className="petshop-right-column">
            <div className="pet-inventory-card">
              <h3>Bag</h3>

              <div className="inventory-grid">
                <div className="inventory-item">
                  <span>🥕 Food</span>
                  <strong>{pet.inventory.food}</strong>
                </div>
                <div className="inventory-item">
                  <span>💧 Water</span>
                  <strong>{pet.inventory.waterBottle}</strong>
                </div>
                <div className="inventory-item">
                  <span>🧸 Toy</span>
                  <strong>{pet.inventory.toy}</strong>
                </div>
              </div>
            </div>

            <div className="pet-shop-card">
              <h3>Shop</h3>

              <div className="shop-grid">
                {SHOP_ITEMS.map((item) => (
                  <div key={item.id} className="shop-item-card">
                    <div className="shop-item-simple">
                      <div className="shop-item-name">
                        <span className="shop-emoji">{item.emoji}</span>
                        <span>{item.name}</span>
                      </div>

                      <div className="shop-item-bottom">
                        <span className="shop-price">🪙 {item.price}</span>
                        <button onClick={() => handleBuyItem(item)}>Buy</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PetShop;