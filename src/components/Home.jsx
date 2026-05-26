// import { useState } from "react";
// import Mealcard from './Mealcard.jsx';

// // ─── Data ───────────────────────────────────────────────────────────────────

// const MEALS = [
//   {
//     id: 1,
//     name: "Miso-Glazed Salmon Bowl",
//     description: "Roasted garden greens, black sesame, and ginger-infused wild  rice.",
//     kcal: 420,
//     protein: 34,
//     carbs: 12,
//     fat: 28,
//     price: "12,000 Rwf",
//     tags: ["Chef's Pick", "Keto"],
//     badge: "Low Glycemic",
//     badgeColor: "green",
//     featured: true,
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
//   },
//   {
//     id: 2,
//     name: "Herbivore's Feast",
//     description: "Mediterranean quinoa with house-made hummus.",
//     kcal: 310,
//     tags: ["GF"],
//     badge: "Low Glycemic",
//     badgeColor: "green",
//     featured: true,
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
//   },
//   {
//     id: 3,
//     name: "Balsamic Chicken",
//     description: "Tender grilled breast with glazed seasonal sprouts.",
//     kcal: 540,
//     tags: ["High Protein"],
//     badge: "Muscle Recovery",
//     badgeColor: "orange",
//     image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=600&q=80",
//   },
//   {
//     id: 4,
//     name: "Zen Garden Sushi",
//     description: "Plant-based signature rolls with wasabi-lime cream.",
//     kcal: 380,
//     tags: ["Vegan"],
//     badge: "Brain Health",
//     badgeColor: "blue",
//     image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
//   },
//   {
//     id: 5,
//     name: "Chimichurri Steak",
//     description: "Grass-fed beef with roasted keto-friendly root veg.",
//     kcal: 620,
//     tags: ["Keto"],
//     badge: "Metabolic Boost",
//     badgeColor: "red",
//     image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
//   },
// ];

// const BADGE_COLORS = {
//   green: "text-emerald-600 before:bg-emerald-500",
//   orange: "text-orange-500 before:bg-orange-400",
//   blue: "text-blue-500 before:bg-blue-400",
//   red: "text-rose-500 before:bg-rose-400",
// };

// const TAG_STYLES = {
//   "Chef's Pick": "bg-[#2d4a3e] text-white",
//   Keto: "bg-[#c4583a] text-white",
//   GF: "bg-[#2d4a3e] text-white",
//   Vegan: "bg-[#2d4a3e] text-white",
//   "High Protein": "bg-[#2d4a3e] text-white",
// };

// // ─── Navbar ──────────────────────────────────────────────────────────────────

// function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 bg-[#f5f0e8]/90 backdrop-blur-md border-b border-[#e8e0d0]">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-[#2d4a3e] flex items-center justify-center">
//             <span className="text-white text-xs font-bold">DM</span>
//           </div>
//           <span className="font-semibold text-[#1a2e25] text-sm hidden sm:block">
//             Dine with Mee
//           </span>
//         </div>

//         {/* Nav links */}
//         <div className="flex items-center gap-6 text-sm font-medium text-[#4a5568]">
//           <a href="#" className="hover:text-[#1a2e25] transition-colors hidden sm:block">Dashboard</a>
//           <a href="#" className="text-[#1a2e25] border-b-2 border-[#1a2e25] pb-0.5">Meal Plans</a>
//           <a href="#" className="hover:text-[#1a2e25] transition-colors hidden sm:block">Health Stats</a>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-3 text-[#4a5568]">
//           <button className="hover:text-[#1a2e25] transition-colors p-1">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
//             </svg>
//           </button>
//           <button className="hover:text-[#1a2e25] transition-colors p-1">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//           </button>
//           <div className="w-7 h-7 rounded-full bg-[#c4583a] flex items-center justify-center text-white text-xs font-bold">
//             U
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // ─── Sidebar / Filters ───────────────────────────────────────────────────────

// function Sidebar({ filters, setFilters, calRange, setCalRange, chefFilters, setChefFilters }) {
//   const dietary = ["Vegan", "Keto Friendly", "Gluten Free"];
//   const chefs = ["Mediterranean", "Plant-Based", "High Protein"];

//   return (
//     <aside className="w-full lg:w-52 shrink-0">
//       {/* Dietary Needs */}
//       <div className="mb-6">
//         <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2e25] mb-3">
//           Dietary Needs
//         </h3>
//         <div className="flex flex-col gap-2">
//           {dietary.map((d) => (
//             <label key={d} className="flex items-center gap-2.5 cursor-pointer group">
//               <div
//                 onClick={() =>
//                   setFilters((prev) =>
//                     prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
//                   )
//                 }
//                 className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
//                   filters.includes(d)
//                     ? "bg-[#1a2e25] border-[#1a2e25]"
//                     : "border-[#b0a898] group-hover:border-[#1a2e25]"
//                 }`}
//               >
//                 {filters.includes(d) && (
//                   <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                   </svg>
//                 )}
//               </div>
//               <span className="text-sm text-[#4a5568]">{d}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Chef Specialties */}
//       <div className="mb-6">
//         <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2e25] mb-3">
//           Chef Specialties
//         </h3>
//         <div className="flex flex-wrap gap-2">
//           {chefs.map((c) => (
//             <button
//               key={c}
//               onClick={() =>
//                 setChefFilters((prev) =>
//                   prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
//                 )
//               }
//               className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
//                 chefFilters.includes(c)
//                   ? "bg-[#1a2e25] text-white border-[#1a2e25]"
//                   : "bg-transparent text-[#4a5568] border-[#c8bfb0] hover:border-[#1a2e25]"
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Calorie Range */}
//       <div>
//         <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2e25] mb-3">
//           Calorie Range
//         </h3>
//         <input
//           type="range"
//           min={300}
//           max={900}
//           value={calRange}
//           onChange={(e) => setCalRange(Number(e.target.value))}
//           className="w-full accent-[#1a2e25] cursor-pointer"
//         />
//         <div className="flex justify-between text-xs text-[#8a7f74] mt-1">
//           <span>300 kcal</span>
//           <span>900+ kcal</span>
//         </div>
//       </div>
//     </aside>
//   );
// }

// // ─── Badge ───────────────────────────────────────────────────────────────────

// function Badge({ text, color }) {
//   const colorMap = {
//     green: "text-emerald-600",
//     orange: "text-orange-500",
//     blue: "text-blue-500",
//     red: "text-rose-500",
//   };
//   const dotMap = {
//     green: "bg-emerald-500",
//     orange: "bg-orange-400",
//     blue: "bg-blue-400",
//     red: "bg-rose-400",
//   };
//   return (
//     <span className={`flex items-center gap-1.5 text-xs font-medium ${colorMap[color]}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${dotMap[color]}`} />
//       {text}
//     </span>
//   );
// }

// // ─── Tag Chip ─────────────────────────────────────────────────────────────────

// function TagChip({ tag }) {
//   return (
//     <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${TAG_STYLES[tag] || "bg-[#2d4a3e] text-white"}`}>
//       {tag}
//     </span>
//   );
// }

// // ─── Featured Meal Card ──────────────────────────────────────────────────────

// function FeaturedMealCard({ meal }) {
//   const [added, setAdded] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ede8df] flex flex-col">
//       <div className="relative h-52 sm:h-64 overflow-hidden">
//         <img
//           src={meal.image}
//           alt={meal.name}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//         />
//         <div className="absolute top-3 left-3 flex gap-1.5">
//           {meal.tags.map((t) => <TagChip key={t} tag={t} />)}
//         </div>
//       </div>

//       <div className="p-4 flex flex-col gap-3 flex-1">
//         <div className="flex items-start justify-between gap-2">
//           <h2 className="text-lg font-bold text-[#1a2e25] leading-tight">{meal.name}</h2>
//           <div className="text-right shrink-0">
//             <span className="text-2xl font-bold text-[#1a2e25]">{meal.kcal}</span>
//             <span className="text-xs text-[#8a7f74] block -mt-0.5">kcal</span>
//           </div>
//         </div>

//         <p className="text-sm text-[#6b7280]">{meal.description}</p>

//         {meal.protein && (
//           <div className="flex gap-5 pt-1">
//             {[["Protein", `${meal.protein}g`], ["Carbs", `${meal.carbs}g`], ["Fat", `${meal.fat}g`]].map(
//               ([label, val]) => (
//                 <div key={label}>
//                   <p className="text-xs text-[#9ca3af]">{label}</p>
//                   <p className="text-sm font-bold text-[#1a2e25]">{val}</p>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//         <div className="flex items-center justify-between mt-auto pt-2">
//           <span className="text-lg font-bold text-[#c4583a]">{meal.price}</span>
//           <button
//             onClick={() => setAdded(!added)}
//             className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
//               added
//                 ? "bg-[#2d4a3e] text-white"
//                 : "bg-[#c4583a] text-white hover:bg-[#a83e28]"
//             }`}
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={added ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
//             </svg>
//             {added ? "Added!" : "Add to Plan"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Small Featured Card (side) ───────────────────────────────────────────────

// function SideFeaturedCard({ meal }) {
//   const [added, setAdded] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ede8df] flex flex-col">
//       <div className="relative h-40 overflow-hidden">
//         <img
//           src={meal.image}
//           alt={meal.name}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//         />
//         <div className="absolute top-3 left-3 flex gap-1.5">
//           {meal.tags.map((t) => <TagChip key={t} tag={t} />)}
//         </div>
//       </div>
//       <div className="p-3 flex flex-col gap-2 flex-1">
//         <h3 className="text-base font-bold text-[#1a2e25] leading-snug">{meal.name}</h3>
//         <p className="text-xs text-[#6b7280]">{meal.description}</p>
//         <div className="flex items-center justify-between mt-auto pt-1">
//           <div>
//             <span className="text-sm font-bold text-[#1a2e25]">{meal.kcal} kcal</span>
//             {meal.badge && (
//               <div className="mt-0.5">
//                 <Badge text={meal.badge} color={meal.badgeColor} />
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           onClick={() => setAdded(!added)}
//           className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-xs font-semibold border transition-all ${
//             added
//               ? "bg-[#2d4a3e] text-white border-[#2d4a3e]"
//               : "bg-transparent text-[#1a2e25] border-[#1a2e25] hover:bg-[#1a2e25] hover:text-white"
//           }`}
//         >
//           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={added ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
//           </svg>
//           {added ? "Added!" : "Add to Plan"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Regular Meal Card ────────────────────────────────────────────────────────

// function MealCard({ meal }) {
//   const [added, setAdded] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ede8df] flex flex-col hover:shadow-md transition-shadow">
//       <div className="relative h-44 overflow-hidden">
//         <img
//           src={meal.image}
//           alt={meal.name}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//         />
//         <div className="absolute top-3 left-3 flex gap-1.5">
//           {meal.tags.map((t) => <TagChip key={t} tag={t} />)}
//         </div>
//       </div>
//       <div className="p-4 flex flex-col gap-2 flex-1">
//         <h3 className="text-base font-bold text-[#1a2e25]">{meal.name}</h3>
//         <p className="text-xs text-[#6b7280] leading-relaxed">{meal.description}</p>
//         <div className="flex items-center justify-between mt-1">
//           <span className="text-sm font-bold text-[#1a2e25]">{meal.kcal} kcal</span>
//           {meal.badge && <Badge text={meal.badge} color={meal.badgeColor} />}
//         </div>
//         <button
//           onClick={() => setAdded(!added)}
//           className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-xs font-semibold border mt-1 transition-all ${
//             added
//               ? "bg-[#2d4a3e] text-white border-[#2d4a3e]"
//               : "bg-transparent text-[#1a2e25] border-[#1a2e25] hover:bg-[#1a2e25] hover:text-white"
//           }`}
//         >
//           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={added ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
//           </svg>
//           {added ? "Added!" : "Add to Plan"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Active Filter Chip ───────────────────────────────────────────────────────

// function ActiveFilterChip({ label, onRemove }) {
//   return (
//     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a2e25] text-white text-xs font-medium">
//       {label}
//       <button onClick={onRemove} className="hover:opacity-70 transition-opacity">
//         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//     </span>
//   );
// }

// // ─── Toolbar (sort + active filters) ─────────────────────────────────────────

// function Toolbar({ activeFilters, onRemoveFilter, sortBy, setSortBy }) {
//   return (
//     <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
//       <div className="flex flex-wrap gap-2">
//         {activeFilters.map((f) => (
//           <ActiveFilterChip key={f} label={f} onRemove={() => onRemoveFilter(f)} />
//         ))}
//       </div>
//       <div className="flex items-center gap-2 text-sm text-[#4a5568] ml-auto">
//         <span className="font-medium">Sort by:</span>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="font-semibold text-[#1a2e25] bg-transparent border-none outline-none cursor-pointer"
//         >
//           <option>Popularity</option>
//           <option>Calories: Low</option>
//           <option>Calories: High</option>
//           <option>Price</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// // ─── FAB ──────────────────────────────────────────────────────────────────────

// function FAB() {
//   return (
//     <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#c4583a] text-white shadow-lg flex items-center justify-center hover:bg-[#a83e28] transition-colors z-50">
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//     </button>
//   );
// }

// // ─── App ──────────────────────────────────────────────────────────────────────

// export default function App() {
//   const [filters, setFilters] = useState(["Keto Friendly"]);
//   const [chefFilters, setChefFilters] = useState([]);
//   const [calRange, setCalRange] = useState(900);
//   const [sortBy, setSortBy] = useState("Popularity");

//   const featured = MEALS.filter((m) => m.featured);
//   const featuredMain = featured[0];
//   const featuredSide = featured.slice(1);
//   const gridMeals = MEALS.filter((m) => !m.featured);

//   const allActiveFilters = filters;

//   const removeFilter = (f) => setFilters((prev) => prev.filter((x) => x !== f));

//   return (
//     <div className="min-h-screen bg-[#f5f0e8] font-sans">
//       <Navbar />

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
//         {/* Page Header */}
//         <header className="mb-8">
//           <h1 className="text-4xl sm:text-5xl font-black text-[#1a2e25] tracking-tight mb-2">
//             Our Menu
//           </h1>
//           <p className="text-[#6b7280] text-sm sm:text-base max-w-sm">
//             Discover chef-crafted meals tailored to your metabolic health and culinary preferences.
//           </p>
//         </header>

//         {/* Main layout: sidebar + content */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <Sidebar
//             filters={filters}
//             setFilters={setFilters}
//             calRange={calRange}
//             setCalRange={setCalRange}
//             chefFilters={chefFilters}
//             setChefFilters={setChefFilters}
//           />

//           {/* Content */}
//           <div className="flex-1 min-w-0">
//             <Toolbar
//               activeFilters={allActiveFilters}
//               onRemoveFilter={removeFilter}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//             />

//             {/* Featured row: big card + side card */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div className="md:col-span-2">
//                 {featuredMain && <FeaturedMealCard meal={featuredMain} />}
//               </div>
//               <div className="flex flex-col gap-4">
//                 {featuredSide.map((m) => (
//                   <SideFeaturedCard key={m.id} meal={m} />
//                 ))}
//               </div>
//             </div>

//             {/* Grid row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               {gridMeals.map((m) => (
//                 <MealCard key={m.id} meal={m} />
//               ))}
//             </div>

//             {/* View More */}
//             <div className="flex justify-center">
//               <button
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#c8bfb0] text-sm font-medium text-[#4a5568] hover:border-[#1a2e25] hover:text-[#1a2e25] transition-all bg-white"
//               >
//                 <span>View More Meals</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//             </div>

//             {/* Render extra meals here */}
//             <div className="mt-6 ">
//               {/* Mealcard is a different UI (restaurant app). Keep it only if you really want it on this page */}
//               <Mealcard />
//             </div>
//           </div>
//         </div>
//       </main>

//       <FAB />
//     </div>
//   );
// }


import { useState } from "react";
import Mealcard from './Mealcard.jsx';

// ─── Data ───────────────────────────────────────────────────────────────────

const MEALS = [
  {
    id: 1,
    name: "Miso-Glazed Salmon Bowl",
    description: "Roasted garden greens, black sesame, and ginger-infused wild  rice.",
    kcal: 420,
    protein: 34,
    carbs: 12,
    fat: 28,
    price: "12,000 Rwf",
    tags: ["Chef's Pick", "Keto"],
    badge: "Low Glycemic",
    badgeColor: "green",
    featured: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
  {
    id: 2,
    name: "Herbivore's Feast",
    description: "Mediterranean quinoa with house-made hummus.",
    kcal: 310,
    tags: ["GF"],
    badge: "Low Glycemic",
    badgeColor: "green",
    featured: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: 3,
    name: "Balsamic Chicken",
    description: "Tender grilled breast with glazed seasonal sprouts.",
    kcal: 540,
    tags: ["High Protein"],
    badge: "Muscle Recovery",
    badgeColor: "orange",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=600&q=80",
  },
  {
    id: 4,
    name: "Zen Garden Sushi",
    description: "Plant-based signature rolls with wasabi-lime cream.",
    kcal: 380,
    tags: ["Vegan"],
    badge: "Brain Health",
    badgeColor: "blue",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
  },
  {
    id: 5,
    name: "Chimichurri Steak",
    description: "Grass-fed beef with roasted keto-friendly root veg.",
    kcal: 620,
    tags: ["Keto"],
    badge: "Metabolic Boost",
    badgeColor: "red",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
  },
];

const BADGE_COLORS = {
  green: "text-emerald-600 before:bg-emerald-500",
  orange: "text-orange-500 before:bg-orange-400",
  blue: "text-blue-500 before:bg-blue-400",
  red: "text-rose-500 before:bg-rose-400",
};

const TAG_STYLES = {
  "Chef's Pick": "bg-[#2d4a3e] text-white",
  Keto: "bg-[#c4583a] text-white",
  GF: "bg-[#2d4a3e] text-white",
  Vegan: "bg-[#2d4a3e] text-white",
  "High Protein": "bg-[#2d4a3e] text-white",
};

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#f5f0e8]/90 backdrop-blur-md border-b border-[#e8e0d0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2d4a3e] flex items-center justify-center">
            <span className="text-white text-xs font-bold">DM</span>
          </div>
          <span className="font-semibold text-[#1a2e25] text-sm hidden sm:block">
            Dine with Mee
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-medium text-[#4a5568]">
          <a href="#" className="hover:text-[#1a2e25] transition-colors hidden sm:block">Dashboard</a>
          <a href="#" className="text-[#1a2e25] border-b-2 border-[#1a2e25] pb-0.5">Meal Plans</a>
          <a href="#" className="hover:text-[#1a2e25] transition-colors hidden sm:block">Health Stats</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 text-[#4a5568]">
          <button className="hover:text-[#1a2e25] transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
          <button className="hover:text-[#1a2e25] transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="w-7 h-7 rounded-full bg-[#c4583a] flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Sidebar / Filters ───────────────────────────────────────────────────────

function Sidebar({ filters, setFilters, calRange, setCalRange, chefFilters, setChefFilters }) {
  const dietary = ["Vegan", "Keto Friendly", "Gluten Free"];
  const chefs = ["Mediterranean", "Plant-Based", "High Protein"];

  return (
    <aside className="w-full lg:w-52 shrink-0">
      {/* Dietary Needs */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2e25] mb-3">
          Dietary Needs
        </h3>
        <div className="flex flex-col gap-2">
          {dietary.map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() =>
                  setFilters((prev) =>
                    prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                  )
                }
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                  filters.includes(d)
                    ? "bg-[#1a2e25] border-[#1a2e25]"
                    : "border-[#b0a898] group-hover:border-[#1a2e25]"
                }`}
              >
                {filters.includes(d) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#4a5568]">{d}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Chef Specialties */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2e25] mb-3">
          Chef Specialties
        </h3>
        <div className="flex flex-wrap gap-2">
          {chefs.map((c) => (
            <button
              key={c}
              onClick={() =>
                setChefFilters((prev) =>
                  prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                )
              }
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                chefFilters.includes(c)
                  ? "bg-[#1a2e25] text-white border-[#1a2e25]"
                  : "bg-transparent text-[#4a5568] border-[#c8bfb0] hover:border-[#1a2e25]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Calorie Range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2e25] mb-3">
          Calorie Range
        </h3>
        <input
          type="range"
          min={300}
          max={900}
          value={calRange}
          onChange={(e) => setCalRange(Number(e.target.value))}
          className="w-full accent-[#1a2e25] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[#8a7f74] mt-1">
          <span>300 kcal</span>
          <span>900+ kcal</span>
        </div>
      </div>
    </aside>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

function Badge({ text, color }) {
  const colorMap = {
    green: "text-emerald-600",
    orange: "text-orange-500",
    blue: "text-blue-500",
    red: "text-rose-500",
  };
  const dotMap = {
    green: "bg-emerald-500",
    orange: "bg-orange-400",
    blue: "bg-blue-400",
    red: "bg-rose-400",
  };
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${colorMap[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotMap[color]}`} />
      {text}
    </span>
  );
}

// ─── Tag Chip ─────────────────────────────────────────────────────────────────

function TagChip({ tag }) {
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${TAG_STYLES[tag] || "bg-[#2d4a3e] text-white"}`}>
      {tag}
    </span>
  );
}

// ─── Featured Meal Card ──────────────────────────────────────────────────────

function FeaturedMealCard({ meal }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ede8df] flex flex-col">
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {meal.tags.map((t) => <TagChip key={t} tag={t} />)}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold text-[#1a2e25] leading-tight">{meal.name}</h2>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-[#1a2e25]">{meal.kcal}</span>
            <span className="text-xs text-[#8a7f74] block -mt-0.5">kcal</span>
          </div>
        </div>

        <p className="text-sm text-[#6b7280]">{meal.description}</p>

        {meal.protein && (
          <div className="flex gap-5 pt-1">
            {[["Protein", `${meal.protein}g`], ["Carbs", `${meal.carbs}g`], ["Fat", `${meal.fat}g`]].map(
              ([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-[#9ca3af]">{label}</p>
                  <p className="text-sm font-bold text-[#1a2e25]">{val}</p>
                </div>
              )
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-[#c4583a]">{meal.price}</span>
          <button
            onClick={() => setAdded(!added)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              added
                ? "bg-[#2d4a3e] text-white"
                : "bg-[#c4583a] text-white hover:bg-[#a83e28]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={added ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
            </svg>
            {added ? "Added!" : "Add to Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Small Featured Card (side) ───────────────────────────────────────────────

function SideFeaturedCard({ meal }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ede8df] flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {meal.tags.map((t) => <TagChip key={t} tag={t} />)}
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-bold text-[#1a2e25] leading-snug">{meal.name}</h3>
        <p className="text-xs text-[#6b7280]">{meal.description}</p>
        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="text-sm font-bold text-[#1a2e25]">{meal.kcal} kcal</span>
            {meal.badge && (
              <div className="mt-0.5">
                <Badge text={meal.badge} color={meal.badgeColor} />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setAdded(!added)}
          className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-xs font-semibold border transition-all ${
            added
              ? "bg-[#2d4a3e] text-white border-[#2d4a3e]"
              : "bg-transparent text-[#1a2e25] border-[#1a2e25] hover:bg-[#1a2e25] hover:text-white"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={added ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
          </svg>
          {added ? "Added!" : "Add to Plan"}
        </button>
      </div>
    </div>
  );
}

// ─── Regular Meal Card ────────────────────────────────────────────────────────

function MealCard({ meal }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ede8df] flex flex-col hover:shadow-md transition-shadow">
      <div className="relative h-44 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {meal.tags.map((t) => <TagChip key={t} tag={t} />)}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-bold text-[#1a2e25]">{meal.name}</h3>
        <p className="text-xs text-[#6b7280] leading-relaxed">{meal.description}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-[#1a2e25]">{meal.kcal} kcal</span>
          {meal.badge && <Badge text={meal.badge} color={meal.badgeColor} />}
        </div>
        <button
          onClick={() => setAdded(!added)}
          className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-xs font-semibold border mt-1 transition-all ${
            added
              ? "bg-[#2d4a3e] text-white border-[#2d4a3e]"
              : "bg-transparent text-[#1a2e25] border-[#1a2e25] hover:bg-[#1a2e25] hover:text-white"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={added ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
          </svg>
          {added ? "Added!" : "Add to Plan"}
        </button>
      </div>
    </div>
  );
}

// ─── Active Filter Chip ───────────────────────────────────────────────────────

function ActiveFilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a2e25] text-white text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:opacity-70 transition-opacity">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

// ─── Toolbar (sort + active filters) ─────────────────────────────────────────

function Toolbar({ activeFilters, onRemoveFilter, sortBy, setSortBy }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((f) => (
          <ActiveFilterChip key={f} label={f} onRemove={() => onRemoveFilter(f)} />
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm text-[#4a5568] ml-auto">
        <span className="font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="font-semibold text-[#1a2e25] bg-transparent border-none outline-none cursor-pointer"
        >
          <option>Popularity</option>
          <option>Calories: Low</option>
          <option>Calories: High</option>
          <option>Price</option>
        </select>
      </div>
    </div>
  );
}

// ─── FAB ──────────────────────────────────────────────────────────────────────

function FAB() {
  return (
    <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#c4583a] text-white shadow-lg flex items-center justify-center hover:bg-[#a83e28] transition-colors z-50">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </button>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [filters, setFilters] = useState(["Keto Friendly"]);
  const [chefFilters, setChefFilters] = useState([]);
  const [calRange, setCalRange] = useState(900);
  const [sortBy, setSortBy] = useState("Popularity");
  
  // 1. Setup a new state variable to control the visibility of the Mealcard component
  const [showMore, setShowMore] = useState(false);

  const featured = MEALS.filter((m) => m.featured);
  const featuredMain = featured[0];
  const featuredSide = featured.slice(1);
  const gridMeals = MEALS.filter((m) => !m.featured);

  const allActiveFilters = filters;

  const removeFilter = (f) => setFilters((prev) => prev.filter((x) => x !== f));

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-[#1a2e25] tracking-tight mb-2">
            Our Menu
          </h1>
          <p className="text-[#6b7280] text-sm sm:text-base max-w-sm">
            Discover chef-crafted meals tailored to your metabolic health and culinary preferences.
          </p>
        </header>

        {/* Main layout: sidebar + content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            calRange={calRange}
            setCalRange={setCalRange}
            chefFilters={chefFilters}
            setChefFilters={setChefFilters}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Toolbar
              activeFilters={allActiveFilters}
              onRemoveFilter={removeFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Featured row: big card + side card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                {featuredMain && <FeaturedMealCard meal={featuredMain} />}
              </div>
              <div className="flex flex-col gap-4">
                {featuredSide.map((m) => (
                  <SideFeaturedCard key={m.id} meal={m} />
                ))}
              </div>
            </div>

            {/* Grid row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {gridMeals.map((m) => (
                <MealCard key={m.id} meal={m} />
              ))}
            </div>

            {/* View More */}
            <div className="flex justify-center">
              {/* 2. Added onClick handler, changed text and added rotation effect to the svg arrow conditionally based on showMore status */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#c8bfb0] text-sm font-medium text-[#4a5568] hover:border-[#1a2e25] hover:text-[#1a2e25] transition-all bg-white"
              >
                <span>{showMore ? "View Less Meals" : "View More Meals"}</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* 3. Conditionally render extra meals container based on showMore state */}
            {showMore && (
              <div className="mt-6">
                {/* Mealcard is a different UI (restaurant app). Keep it only if you really want it on this page */}
                <Mealcard />
              </div>
            )}
          </div>
        </div>
      </main>

      <FAB />
    </div>
  );
}