// import { useState } from "react";

// // ─── Icons (inline SVG to avoid import issues) ───────────────────────────────
// const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.75, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
//     strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d={d} />
//   </svg>
// );

// const Icons = {
//   grid:       "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
//   fork:       "M6 2v6m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 4v10M18 2a5 5 0 0 1 0 10v10",
//   chart:      "M22 12h-4l-3 9L9 3l-3 9H2",
//   calendar:   "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
//   bag:        "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
//   gear:       "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
//   plus:       "M12 5v14M5 12h14",
//   search:     "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
//   bell:       "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
//   heart:      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
//   swap:       "M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4",
//   chevLeft:   "M15 18l-6-6 6-6",
//   chevRight:  "M9 18l6-6-6-6",
//   cart:       "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
//   zap:        "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
//   menu:       "M3 12h18M3 6h18M3 18h18",
//   x:          "M18 6 6 18M6 6l12 12",
// };

// // ─── Circular Progress ────────────────────────────────────────────────────────
// const CircularProgress = ({ pct }) => {
//   const r = 42, circ = 2 * Math.PI * r;
//   const offset = circ - (pct / 100) * circ;
//   return (
//     <div className="relative flex items-center justify-center" style={{ width: 110, height: 110, flexShrink: 0 }}>
//       <svg width="110" height="110" viewBox="0 0 110 110" className="absolute inset-0">
//         <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" />
//         <circle cx="55" cy="55" r={r} fill="none" stroke="#E8693A" strokeWidth="9"
//           strokeDasharray={circ} strokeDashoffset={offset}
//           strokeLinecap="round"
//           transform="rotate(-90 55 55)"
//           style={{ transition: "stroke-dashoffset 1s ease" }}
//         />
//       </svg>
//       <div className="relative text-center">
//         <div className="text-white font-black text-2xl leading-none">{pct}%</div>
//         <div className="text-white/60 text-[10px] font-semibold tracking-widest mt-0.5">DAILY GOAL</div>
//       </div>
//     </div>
//   );
// };

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const NAV = [
//   { icon: "grid",     label: "Dashboard" },
//   { icon: "fork",     label: "Meal Plans", active: true },
//   { icon: "chart",    label: "Health Stats" },
//   { icon: "calendar", label: "Consultations" },
//   { icon: "bag",      label: "Orders" },
//   { icon: "gear",     label: "Settings" },
// ];

// const SWAPS = [
//   {
//     tag: "LOWER CARB", tagIcon: "zap",
//     title: "Zucchini Noodle Stir-fry",
//     desc: "Swap standard noodles for spiralized zucchini to reduce carb load by 65%.",
//     swapLabel: "Swap Lunch", stars: 2,
//   },
//   {
//     tag: "HEART HEALTHY", tagIcon: "heart",
//     title: "Avocado Tofu Scramble",
//     desc: "Substitute eggs with turmeric-spiced tofu and healthy avocado fats.",
//     swapLabel: "Swap Breakfast", stars: 1,
//   },
//   {
//     tag: "BRAIN FOOD", tagIcon: "zap",
//     title: "Walnut & Apple Salad",
//     desc: "Add Omega-3 rich walnuts and fresh fiber for sustained cognitive focus.",
//     swapLabel: "Swap Snack", stars: 1,
//   },
// ];

// // ─── Sub-components ───────────────────────────────────────────────────────────
// const Tag = ({ children }) => (
//   <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
//     {children}
//   </span>
// );

// const MealBadge = ({ label, dark }) => (
//   <span className={`absolute top-3 left-3 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full
//     ${dark ? "bg-[#1E3D30] text-white" : "bg-white/90 text-[#1A1A1A]"}`}>
//     {label}
//   </span>
// );

// // Small meal card (breakfast / dinner layout)
// const SmallMealCard = ({ badge, img, title, desc, tags, btnLabel, icon }) => (
//   <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
//     <div className="relative h-44 overflow-hidden">
//       <img src={img} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
//       <MealBadge label={badge} />
//     </div>
//     <div className="p-5 flex flex-col flex-1">
//       <h3 className="font-black text-[#1A1A1A] text-lg mb-1">{title}</h3>
//       <p className="text-gray-400 text-sm mb-3 leading-relaxed">{desc}</p>
//       <div className="flex gap-2 mb-4">
//         {tags.map(t => <Tag key={t}>{t}</Tag>)}
//       </div>
//       <div className="flex items-center gap-3 mt-auto">
//         <button className="flex-1 bg-[#1E3D30] text-white text-sm font-bold py-3 rounded-xl
//           hover:bg-[#162e23] active:scale-95 transition-all duration-150">
//           {btnLabel}
//         </button>
//         <button className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center
//           hover:bg-gray-50 active:scale-95 transition-all">
//           <Icon d={Icons[icon]} size={16} className="text-gray-500" />
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // ─── Main Component ────────────────────────────────────────────────────────────
// export default function DineWithMee() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-[#F4EFE6]" style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,400&display=swap');
//         * { box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: #d1c9bc; border-radius: 99px; }
//       `}</style>

//       {/* ── Sidebar ── */}
//       <>
//         {/* Backdrop */}
//         {sidebarOpen && (
//           <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
//             onClick={() => setSidebarOpen(false)} />
//         )}

//         <aside className={`
//           fixed top-0 left-0 h-full z-40 w-56 bg-white flex flex-col py-7 px-4 shadow-xl
//           transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
//         `}>
//           {/* Logo */}
//           <div className="flex items-center gap-3 px-2 mb-10">
//             <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 bg-[#1E3D30] flex items-center justify-center text-2xl">
//               🍃
//             </div>
//             <div className="leading-tight">
//               <span className="block text-[#1E3D30] font-black text-base">Dine</span>
//               <span className="block text-[#1E3D30] font-black text-base -mt-0.5">with Mee</span>
//             </div>
//             {/* Close on mobile */}
//             <button className="ml-auto lg:hidden p-1 rounded-lg hover:bg-gray-100"
//               onClick={() => setSidebarOpen(false)}>
//               <Icon d={Icons.x} size={16} />
//             </button>
//           </div>

//           {/* Nav items */}
//           <nav className="flex-1 space-y-1">
//             {NAV.map(({ icon, label, active }) => (
//               <button key={label}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150
//                   ${active
//                     ? "bg-[#1E3D30] text-white shadow-md shadow-green-900/20"
//                     : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
//                   }`}>
//                 <Icon d={Icons[icon]} size={17}
//                   className={active ? "text-white" : "text-gray-400"} />
//                 {label}
//               </button>
//             ))}
//           </nav>

//           {/* New Meal Plan */}
//           <button className="mt-6 w-full flex items-center justify-center gap-2 bg-[#1E3D30]
//             text-white rounded-2xl py-3.5 text-sm font-bold hover:bg-[#162e23]
//             active:scale-95 transition-all duration-150 shadow-md shadow-green-900/20">
//             <Icon d={Icons.plus} size={16} />
//             New Meal Plan
//           </button>
//         </aside>
//       </>

//       {/* ── Main ── */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//         {/* Top bar */}
//         <header className="sticky top-0 z-20 bg-[#F4EFE6]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
//           {/* Hamburger */}
//           <button className="lg:hidden p-2.5 rounded-xl bg-white shadow-sm hover:shadow"
//             onClick={() => setSidebarOpen(true)}>
//             <Icon d={Icons.menu} size={18} className="text-gray-600" />
//           </button>

//           {/* Search */}
//           <div className="flex-1 max-w-xs relative">
//             <Icon d={Icons.search} size={15}
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input type="text" placeholder="Search nutrition database..."
//               className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full text-sm text-gray-600
//                 placeholder-gray-400 outline-none shadow-sm border border-white
//                 focus:border-[#1E3D30]/20 focus:shadow-md transition-all" />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow">
//               <Icon d={Icons.bell} size={18} className="text-gray-600" />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-[#E8693A] rounded-full ring-2 ring-white" />
//             </button>
//             <img src="https://i.pravatar.cc/80?img=12" alt="Avatar"
//               className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-24">

//           {/* Page title */}
//           <div className="mb-7 pt-2">
//             <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight mb-1.5">
//               Today's Menu
//             </h1>
//             <p className="text-gray-400 text-sm sm:text-base max-w-lg">
//               Your personalized nutritional journey for{" "}
//               <span className="text-gray-600 font-medium">October 24th</span>, curated for{" "}
//               <span className="text-[#1E3D30] font-bold">Weight Management</span>.
//             </p>
//           </div>

//           {/* ── Meal Grid ── */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

//             {/* Breakfast – col 1 */}
//             <div className="md:col-span-1">
//               <SmallMealCard
//                 badge="BREAKFAST"
//                 img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"
//                 title="Berry Power Bowl"
//                 desc="Antioxidant-rich base with activated nuts."
//                 tags={["420 kcal", "12g Protein"]}
//                 btnLabel="Order Now"
//                 icon="swap"
//               />
//             </div>

//             {/* Lunch (Featured) – col 2–3 */}
//             <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm
//               flex flex-col sm:flex-row">
//               {/* Image */}
//               <div className="relative sm:w-1/2 h-52 sm:h-auto overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&q=80"
//                   alt="Grilled Salmon"
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />
//                 <MealBadge label="LUNCH · RECOMMENDED" dark />
//               </div>
//               {/* Details */}
//               <div className="p-5 sm:p-6 flex flex-col justify-between sm:w-1/2">
//                 <div>
//                   <h3 className="font-black text-[#1A1A1A] text-2xl sm:text-3xl leading-tight mb-2">
//                     Grilled Salmon & Kale
//                   </h3>
//                   <p className="text-gray-400 text-sm leading-relaxed mb-5">
//                     Miso-glazed sustainable salmon with a massaged kale salad and lemon-tahini dressing.
//                   </p>
//                   {/* Macros */}
//                   <div className="grid grid-cols-3 gap-2 mb-6">
//                     {[["CARBS", "14g"], ["PROTEIN", "38g"], ["FAT", "22g"]].map(([label, val]) => (
//                       <div key={label} className="bg-[#F4EFE6] rounded-xl py-3 text-center">
//                         <div className="text-gray-400 text-[10px] font-bold tracking-widest mb-1">{label}</div>
//                         <div className="font-black text-[#1A1A1A] text-lg">{val}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button className="flex-1 bg-[#E8693A] text-white text-sm font-bold py-3 rounded-xl
//                     hover:bg-[#d45e31] active:scale-95 transition-all duration-150 shadow-md shadow-orange-300/30">
//                     Confirm Meal Choice
//                   </button>
//                   <button className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center
//                     hover:bg-red-50 hover:border-red-200 group active:scale-95 transition-all">
//                     <Icon d={Icons.heart} size={16}
//                       className="text-gray-400 group-hover:text-red-400 transition-colors" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Dinner – col 1 */}
//             <div className="md:col-span-1">
//               <SmallMealCard
//                 badge="DINNER"
//                 img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
//                 title="Zen Buddha Bowl"
//                 desc="Plant-based protein with roasted chickpeas."
//                 tags={["510 kcal", "18g Protein"]}
//                 btnLabel="Order Now"
//                 icon="swap"
//               />
//             </div>

//             {/* Daily Goal – col 2–3 */}
//             <div className="md:col-span-2 bg-[#1E3D30] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
//               <CircularProgress pct={70} />
//               <div className="flex-1 text-center sm:text-left">
//                 <h3 className="text-white font-black text-2xl mb-2">Almost at your goal!</h3>
//                 <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
//                   You've reached 1,450 kcal of your 2,100 kcal daily target.
//                   Your dinner will bring you perfectly into your maintenance range.
//                 </p>
//                 <div className="flex gap-3 justify-center sm:justify-start">
//                   {[["Fiber", "28g / 35g"], ["Sugar", "12g / 25g"]].map(([label, val]) => (
//                     <div key={label} className="bg-white/10 rounded-xl px-4 py-3">
//                       <div className="text-white/50 text-xs font-semibold mb-0.5">{label}</div>
//                       <div className="text-white font-black text-sm">{val}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── AI Swaps ── */}
//           <div>
//             <div className="flex items-start justify-between mb-5">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
//                   AI Swaps For Your Goal
//                 </h2>
//                 <p className="text-gray-400 text-sm mt-1">
//                   Based on your{" "}
//                   <span className="text-gray-600">"Energy Focus"</span> health setting
//                 </p>
//               </div>
//               <div className="flex gap-2 pt-1">
//                 {["chevLeft", "chevRight"].map(ic => (
//                   <button key={ic}
//                     className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center
//                       hover:shadow hover:border-gray-300 active:scale-95 transition-all">
//                     <Icon d={Icons[ic]} size={15} className="text-gray-600" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {SWAPS.map((card) => (
//                 <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm
//                   hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
//                   {/* Tag + Icon */}
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-8 h-8 rounded-xl bg-[#1E3D30]/10 flex items-center justify-center">
//                       <Icon d={Icons[card.tagIcon]} size={14} className="text-[#1E3D30]" />
//                     </div>
//                     <span className="bg-[#1E3D30] text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full">
//                       {card.tag}
//                     </span>
//                   </div>

//                   <h4 className="font-black text-[#1A1A1A] text-lg leading-tight mb-2">{card.title}</h4>
//                   <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.desc}</p>

//                   {/* Swap button */}
//                   <button className="flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]
//                     hover:text-[#1E3D30] transition-colors">
//                     {Array.from({ length: card.stars }).map((_, i) => (
//                       <span key={i} className="text-[#E8693A] text-base">★</span>
//                     ))}
//                     {card.stars < 2 && <span className="text-gray-300 text-base">★</span>}
//                     <span className="ml-0.5">{card.swapLabel}</span>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Floating Cart */}
//       <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#1E3D30] text-white rounded-2xl
//         flex items-center justify-center shadow-xl shadow-green-900/30
//         hover:bg-[#162e23] hover:scale-110 active:scale-95 transition-all duration-200 z-50">
//         <Icon d={Icons.cart} size={22} />
//       </button>
//     </div>
//   );
// }




import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Icons (inline SVG to avoid import issues) ───────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.75, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={fill} 
    stroke={stroke}
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d={d} />
  </svg>
);

const Icons = {
  grid:       "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  fork:       "M6 2v6m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 4v10M18 2a5 5 0 0 1 0 10v10",
  chart:      "M22 12h-4l-3 9L9 3l-3 9H2",
  calendar:   "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  bag:        "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  gear:       "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  plus:       "M12 5v14M5 12h14",
  search:     "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  bell:       "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  heart:      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  swap:       "M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4",
  chevLeft:   "M15 18l-6-6 6-6",
  chevRight:  "M9 18l6-6-6-6",
  cart:       "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  zap:        "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  menu:       "M3 12h18M3 6h18M3 18h18",
  x:          "M18 6 6 18M6 6l12 12",
};

// ─── Circular Progress ────────────────────────────────────────────────────────
const CircularProgress = ({ pct }) => {
  const r = 42, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: 110, height: 110, flexShrink: 0 }}>
      <svg width="110" height="110" viewBox="0 0 110 110" className="absolute inset-0">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" />
        <circle cx="55" cy="55" r={r} fill="none" stroke="#E8693A" strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="relative text-center">
        <div className="text-white font-black text-2xl leading-none">{pct}%</div>
        <div className="text-white/60 text-[10px] font-semibold tracking-widest mt-0.5">DAILY GOAL</div>
      </div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV = [
  { icon: "grid",     label: "Dashboard",     path: "/dashboard"     },
  { icon: "fork",     label: "Meal Plans",    path: "/meals"         },
  { icon: "chart",    label: "Health Stats",  path: "/healthprofile" },
  { icon: "calendar", label: "Consultations", path: "/consultations" },
  { icon: "bag",      label: "Orders",        path: "/orders"        },
  { icon: "gear",     label: "Settings",      path: "/security"      },
];

const SWAPS = [
  {
    tag: "LOWER CARB", tagIcon: "zap",
    title: "Zucchini Noodle Stir-fry",
    desc: "Swap standard noodles for spiralized zucchini to reduce carb load by 65%.",
    swapLabel: "Swap Lunch", stars: 2,
  },
  {
    tag: "HEART HEALTHY", tagIcon: "heart",
    title: "Avocado Tofu Scramble",
    desc: "Substitute eggs with turmeric-spiced tofu and healthy avocado fats.",
    swapLabel: "Swap Breakfast", stars: 1,
  },
  {
    tag: "BRAIN FOOD", tagIcon: "zap",
    title: "Walnut & Apple Salad",
    desc: "Add Omega-3 rich walnuts and fresh fiber for sustained cognitive focus.",
    swapLabel: "Swap Snack", stars: 1,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const Tag = ({ children }) => (
  <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
    {children}
  </span>
);

const MealBadge = ({ label, dark }) => (
  <span className={`absolute top-3 left-3 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full
    ${dark ? "bg-[#1E3D30] text-white" : "bg-white/90 text-[#1A1A1A]"}`}>
    {label}
  </span>
);

const SmallMealCard = ({ badge, img, title, desc, tags, btnLabel, icon }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
    <div className="relative h-44 overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      <MealBadge label={badge} />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-black text-[#1A1A1A] text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-3 leading-relaxed">{desc}</p>
      <div className="flex gap-2 mb-4">
        {tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <button className="flex-1 bg-[#1E3D30] text-white text-sm font-bold py-3 rounded-xl
          hover:bg-[#162e23] active:scale-95 transition-all duration-150">
          {btnLabel}
        </button>
        <button className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center
          hover:bg-gray-50 active:scale-95 transition-all">
          <Icon d={Icons[icon]} size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function DineWithMee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F4EFE6]" style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1c9bc; border-radius: 99px; }
      `}</style>

      {/* ── Sidebar ── */}
      <>
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`
          fixed top-0 left-0 h-full z-40 w-56 bg-white flex flex-col py-7 px-4 shadow-xl
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
        `}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 bg-[#1E3D30] flex items-center justify-center text-2xl">
              🍃
            </div>
            <div className="leading-tight">
              <span className="block text-[#1E3D30] font-black text-base">Dine</span>
              <span className="block text-[#E8693A] font-medium text-xs tracking-wider">WITH MEE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            {NAV.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.label} to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all duration-200
                    ${active 
                      ? "bg-[#1E3D30] text-white shadow-md shadow-green-900/10" 
                      : "text-gray-400 hover:bg-gray-50 hover:text-[#1A1A1A]"}`}
                >
                  <Icon d={Icons[item.icon]} className={active ? "text-[#E8693A]" : "text-gray-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile section */}
          <div className="border-t border-gray-100 pt-5 mt-5 flex items-center gap-3 px-2">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" 
              alt="Elena" className="w-10 h-10 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-[#1A1A1A] truncate leading-tight">Elena M.</h4>
              <p className="text-xs text-gray-400 truncate mt-0.5">Premium Plan</p>
            </div>
          </div>
        </aside>
      </>

      {/* ── Main Canvas Area ── */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Header toolbar */}
        <header className="px-4 lg:px-10 py-5 flex items-center justify-between bg-[#F4EFE6]/80 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-11 h-11 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-sm text-gray-600">
              <Icon d={Icons.menu} size={20} />
            </button>
            <div>
              <h1 className="font-black text-[#1A1A1A] text-xl lg:text-2xl tracking-tight">Weekly Meal Plan</h1>
              <p className="text-gray-400 text-xs font-semibold mt-0.5 tracking-wide uppercase hidden sm:block">OCTOBER 14 – OCTOBER 20</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-11 h-11 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Icon d={Icons.search} size={16} />
            </button>
            <button className="w-11 h-11 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors relative">
              <Icon d={Icons.bell} size={16} />
              <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-[#E8693A] rounded-full" />
            </button>
          </div>
        </header>

        {/* Content View Grid */}
        <main className="px-4 lg:px-10 pb-12 grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-[1400px] w-full mx-auto">
          <div className="xl:col-span-2 space-y-8">
            {/* Primary featured large plate card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 group">
              <div className="relative h-64 md:h-auto md:col-span-5 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" 
                  alt="Harvest Bowl" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />
                <MealBadge label="LUNCH (TODAY)" dark />
              </div>
              <div className="p-6 lg:p-8 md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-3">
                    <Tag>520 KCAL</Tag>
                    <Tag>LOW GLYCEMIC</Tag>
                  </div>
                  <h2 className="font-black text-[#1A1A1A] text-2xl mb-2 tracking-tight">Roasted Harvest Quinoa Bowl</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    A vibrant combination of organic tri-color quinoa, maple-roasted butternut squash, massaged curly kale, and a creamy lemon-tahini dressing drizzle.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                  <button className="bg-[#1E3D30] text-white text-sm font-bold px-6 py-3.5 rounded-xl
                    hover:bg-[#162e23] active:scale-95 transition-all duration-150 shadow-sm">
                    View Complete Recipe
                  </button>
                  <button className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A] hover:text-[#E8693A] transition-colors py-2">
                    <Icon d={Icons.swap} size={15} className="text-[#E8693A]" /> Alternative Swaps Available
                  </button>
                </div>
              </div>
            </div>

            {/* Split layout columns for complementary meals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SmallMealCard 
                badge="BREAKFAST"
                img="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80"
                title="Avocado Toast & Egg"
                desc="Thick sourdough slice topped with crushed Haas avocado, sea salt microgreens, and two perfectly soft-poached eggs."
                tags={["340 KCAL", "HIGH PROTEIN"]}
                btnLabel="Log Breakfast"
                icon="plus"
              />
              <SmallMealCard 
                badge="DINNER"
                img="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80"
                title="Lemon Herb Salmon"
                desc="Wild-caught Atlantic salmon fillet pan-seared in ghee, served alongside garlic asparagus rods and parsnip mash."
                tags={["460 KCAL", "OMEGA 3"]}
                btnLabel="Prepare Dinner"
                icon="plus"
              />
            </div>
          </div>

          {/* Right contextual tracking blueprint sidebar info panel */}
          <div className="space-y-8">
            {/* Daily dynamic macro progression targets widget summary */}
            <div className="bg-[#1E3D30] rounded-3xl p-6 lg:p-8 text-white shadow-xl flex items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-[#E8693A] block uppercase">Macros Blueprint</span>
                <h3 className="font-black text-xl tracking-tight leading-none">Caloric Target Status</h3>
                <p className="text-white/60 text-xs leading-relaxed max-w-[160px]">You are 1,320 kcal deep into your 1,900 daily limit blueprint setup.</p>
              </div>
              <CircularProgress pct={68} />
            </div>

            {/* Micro Alternative Smart Swaps layout items list block */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm space-y-5">
              <h3 className="font-black text-[#1A1A1A] text-lg tracking-tight">Smart Swap Alternatives</h3>
              <div className="divide-y divide-gray-100 space-y-4">
                {SWAPS.map((card, idx) => (
                  <div key={idx} className={`pt-4 first:pt-0 flex flex-col items-start`}>
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-6 h-6 rounded-lg bg-[#F4EFE6] flex items-center justify-center">
                        <Icon d={Icons[card.tagIcon]} size={12} className="text-[#1E3D30]" />
                      </div>
                      <span className="bg-[#1E3D30] text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full">
                        {card.tag}
                      </span>
                    </div>

                    <h4 className="font-black text-[#1A1A1A] text-md leading-tight mb-1">{card.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-3">{card.desc}</p>

                    <button className="flex items-center gap-1 text-xs font-bold text-[#1A1A1A] hover:text-[#1E3D30] transition-colors">
                      {Array.from({ length: card.stars }).map((_, i) => (
                        <span key={i} className="text-[#E8693A] text-sm">★</span>
                      ))}
                      {card.stars < 2 && <span className="text-gray-300 text-sm">★</span>}
                      <span className="ml-1">{card.swapLabel}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}