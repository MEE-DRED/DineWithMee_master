import { useState } from "react";

// ─── Complete Mock Data Matching Image ──────────────────────────────────────
export const EXTENDED_MEALS = [
  {
    id: 101,
    name: "Miso-Glazed Salmon Bowl",
    kcal: 420,
    protein: 32,
    price: "$18.50",
    badges: [{ label: "Heart Healthy", type: "green" }],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
  {
    id: 102,
    name: "Herbivore's Feast",
    kcal: 310,
    protein: 14,
    price: "$14.95",
    badges: [
      { label: "Vegan", type: "green" },
      { label: "Low Carb", type: "gray" }
    ],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },
  {
    id: 103,
    name: "Zesty Lemon Grain Bowl",
    kcal: 540,
    protein: 42,
    price: "$19.25",
    badges: [{ label: "Muscle Gain", type: "dark-green" }],
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80",
  },
  {
    id: 104,
    name: "Golden Tofu Zenith",
    kcal: 380,
    protein: 22,
    price: "$16.75",
    badges: [
      { label: "Plant-Based", type: "dark-green" },
      { label: "Keto Friendly", type: "gray" }
    ],
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
  },
  {
    id: 105,
    name: "Cauliflower Pesto Pizza",
    kcal: 490,
    protein: 28,
    price: "$21.00",
    badges: [{ label: "Keto", type: "dark-green" }],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  },
  {
    id: 106,
    name: "Berry Zen Recovery Bowl",
    kcal: 280,
    protein: 12,
    price: "$12.50",
    badges: [
      { label: "Recovery", type: "dark-green" },
      { label: "Antioxidant Rich", type: "gray" }
    ],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
  },
];

// Badge Style Resolver
const getBadgeStyle = (type) => {
  switch (type) {
    case "green":
      return "bg-[#1e4620] text-[#e8f5e9]";
    case "dark-green":
      return "bg-[#112211] text-[#f4fbf4]";
    case "gray":
    default:
      return "bg-[#f1ebe1] text-[#4a453e] border border-[#dcd6cb]";
  }
};

export default function ExtendedMenu() {
  const [favorites, setFavorites] = useState({});
  const [addedPlans, setAddedPlans] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlan = (id) => {
    setAddedPlans(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {EXTENDED_MEALS.map((meal) => (
        <div 
          key={meal.id} 
          className="bg-[#fbf9f4] rounded-3xl overflow-hidden border border-[#eae2d5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
        >
          {/* Card Image Header Container */}
          <div className="relative h-64 w-full bg-[#ede6db] overflow-hidden">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            {/* Tag Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[85%]">
              {meal.badges.map((b, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${getBadgeStyle(b.type)}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Card Details Body */}
          <div className="p-6 flex flex-col flex-grow bg-[#fbf9f4]">
            <div className="flex justify-between items-start gap-2 mb-3">
              <h2 className="text-2xl font-bold text-[#14261c] tracking-tight leading-snug">
                {meal.name}
              </h2>
              {/* Heart Button */}
              <button 
                onClick={() => toggleFavorite(meal.id)}
                className="text-[#14261c] hover:scale-110 transition-transform pt-1 shrink-0"
                aria-label="Add to favorites"
              >
                <svg
                  className="w-6 h-6"
                  fill={favorites[meal.id] ? "#c4583a" : "none"}
                  stroke={favorites[meal.id] ? "#c4583a" : "currentColor"}
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Macros Nutritional Metrics row */}
            <div className="flex items-center gap-4 text-sm font-medium text-[#657367] mb-6">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#8b9e8f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{meal.kcal} kcal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#8b9e8f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>{meal.protein}g Protein</span>
              </div>
            </div>

            {/* Bottom pricing action panel */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#ede7dc]">
              <span className="text-2xl font-extrabold text-[#14261c]">
                {meal.price}
              </span>
              <button
                onClick={() => togglePlan(meal.id)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm ${
                  addedPlans[meal.id]
                    ? "bg-[#14261c] text-white"
                    : "bg-[#e58667] hover:bg-[#d47253] text-white"
                }`}
              >
                {addedPlans[meal.id] ? "Added!" : "Add to Plan"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}