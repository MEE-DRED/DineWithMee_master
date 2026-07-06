// import { useState, useRef, useCallback } from "react";

// /* ═══════════════════════════════════════════════
//    CONFIG
// ═══════════════════════════════════════════════ */
// const API_BASE = "https://new-dine-with-mee-backend.onrender.com/api/v1";
// const MEALS_ENDPOINT = `${API_BASE}/meals`;

// /* ═══════════════════════════════════════════════
//    ICON PRIMITIVE
// ═══════════════════════════════════════════════ */
// const Ic = ({ d, size = 18, className = "", sw = 1.8, fill = "none" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
//     stroke="currentColor" strokeWidth={sw}
//     strokeLinecap="round" strokeLinejoin="round" className={className}>
//     {[].concat(d).map((p, i) => <path key={i} d={p} />)}
//   </svg>
// );

// /* ═══════════════════════════════════════════════
//    ICON PATHS
// ═══════════════════════════════════════════════ */
// const P = {
//   grid:       ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
//   users:      ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
//   providers:  ["M9 11l3 3L22 4","M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
//   layers:     ["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
//   analytics:  "M22 12h-4l-3 9L9 3l-3 9H2",
//   gear:       ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
//   help:       ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],
//   logout:     ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
//   fork:       ["M8 3v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3","M10 8v13","M16 3l-1 7h2l-1 7"],
//   plus:       "M12 5v14M5 12h14",
//   x:          "M18 6L6 18M6 6l12 12",
//   check:      "M20 6L9 17l-5-5",
//   upload:     ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
//   image:      ["M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z","M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z","M21 15l-5-5L5 21"],
//   alert:      ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
//   trash:      ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
//   edit:       ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
//   hamburger:  "M3 12h18M3 6h18M3 18h18",
//   leaf:       "M2 22 16 8M16.5 2C10 2 6 6 6 12c0 3 1.5 5.5 4 7 .5-4.5 3-8.5 6.5-11",
//   fire:       "M12 2c0 0-5 6-5 10a5 5 0 0 0 10 0c0-4-5-10-5-10z",
//   tag:        ["M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z","M7 7h.01"],
//   info:       ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 8h.01","M12 12v4"],
//   refresh:    ["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"],
//   eye:        ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
//   clock:      ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
//   server:     ["M2 2h20v8H2zM2 14h20v8H2z","M6 6h.01M6 18h.01"],
//   meals:      ["M18 8h1a4 4 0 0 1 0 8h-1","M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z","M6 1v3M10 1v3M14 1v3"],
// };

// /* ═══════════════════════════════════════════════
//    NAV DATA
// ═══════════════════════════════════════════════ */
// const NAV_ITEMS = [
//   { id: "overview",  label: "Overview",           icon: P.grid },
//   { id: "meals",     label: "Meal Management",    icon: P.meals },
//   { id: "users",     label: "User Management",    icon: P.users },
//   { id: "providers", label: "Provider Management",icon: P.providers },
//   { id: "analytics", label: "Analytics",          icon: P.analytics },
//   { id: "settings",  label: "Settings",           icon: P.gear },
// ];

// /* ═══════════════════════════════════════════════
//    CONSTANTS
// ═══════════════════════════════════════════════ */
// const MEAL_CATEGORIES = [
//   "Breakfast", "Lunch", "Dinner", "Snack", "Dessert",
//   "Salad", "Soup", "Smoothie", "Beverage", "Other",
// ];

// const DIET_TAGS = [
//   "Vegan","Vegetarian","Gluten-Free","Dairy-Free","Keto",
//   "Paleo","High-Protein","Low-Carb","Low-Fat","Halal","Kosher","Nut-Free",
// ];

// const DIFFICULTY = ["Easy","Medium","Hard"];

// const EMPTY_FORM = {
//   name: "", category: "", description: "", calories: "",
//   protein: "", carbs: "", fat: "", fiber: "", sugar: "",
//   servingSize: "", servingUnit: "g", prepTime: "", cookTime: "",
//   difficulty: "Easy", ingredients: "", instructions: "",
//   dietaryTags: [], imageUrl: "", isAvailable: true, price: "",
// };

// /* ═══════════════════════════════════════════════
//    HELPERS
// ═══════════════════════════════════════════════ */
// function cls(...args) { return args.filter(Boolean).join(" "); }

// /* ═══════════════════════════════════════════════
//    FIELD COMPONENTS
// ═══════════════════════════════════════════════ */
// function Label({ children, required }) {
//   return (
//     <label className="block text-xs font-bold text-[#1a2e2a] uppercase tracking-wide mb-1.5">
//       {children}{required && <span className="text-[#c96a4f] ml-0.5">*</span>}
//     </label>
//   );
// }

// function Input({ label, required, error, className = "", ...props }) {
//   return (
//     <div className={className}>
//       {label && <Label required={required}>{label}</Label>}
//       <input
//         className={cls(
//           "w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1a2e2a] bg-white",
//           "focus:outline-none focus:ring-2 transition placeholder:text-gray-300",
//           error ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a]"
//         )}
//         {...props}
//       />
//       {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
//     </div>
//   );
// }

// function Textarea({ label, required, error, className = "", rows = 3, ...props }) {
//   return (
//     <div className={className}>
//       {label && <Label required={required}>{label}</Label>}
//       <textarea
//         rows={rows}
//         className={cls(
//           "w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1a2e2a] bg-white resize-y",
//           "focus:outline-none focus:ring-2 transition placeholder:text-gray-300",
//           error ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a]"
//         )}
//         {...props}
//       />
//       {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
//     </div>
//   );
// }

// function Select({ label, required, error, className = "", children, ...props }) {
//   return (
//     <div className={className}>
//       {label && <Label required={required}>{label}</Label>}
//       <select
//         className={cls(
//           "w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1a2e2a] bg-white",
//           "focus:outline-none focus:ring-2 transition appearance-none cursor-pointer",
//           error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a]"
//         )}
//         {...props}
//       >
//         {children}
//       </select>
//       {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
//     </div>
//   );
// }

// function SectionCard({ title, subtitle, icon, iconBg = "bg-[#f0ede8]", iconColor = "text-[#c96a4f]", children }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//       <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-3">
//         <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
//           <Ic d={icon} size={17} className={iconColor} />
//         </div>
//         <div>
//           <h3 className="font-extrabold text-[#1a2e2a] text-sm">{title}</h3>
//           {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
//         </div>
//       </div>
//       <div className="px-5 sm:px-6 py-5">{children}</div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════
//    TOAST SYSTEM
// ═══════════════════════════════════════════════ */
// function ToastStack({ toasts, dismiss }) {
//   return (
//     <div className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-2 pointer-events-none max-w-sm w-full sm:w-auto">
//       {toasts.map(t => (
//         <div key={t.id}
//           className={cls(
//             "flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-xl pointer-events-auto animate-slideUp text-white",
//             t.type === "error" ? "bg-red-600" : t.type === "warn" ? "bg-amber-500" : "bg-[#1a2e2a]"
//           )}>
//           <Ic d={t.type === "error" ? P.x : t.type === "warn" ? P.alert : P.check} size={16} sw={2.5}
//             className={t.type === "error" ? "text-red-200 mt-0.5 flex-shrink-0" : t.type === "warn" ? "text-amber-100 mt-0.5 flex-shrink-0" : "text-emerald-400 mt-0.5 flex-shrink-0"} />
//           <p className="text-sm font-semibold flex-1 leading-snug">{t.msg}</p>
//           <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100 flex-shrink-0 mt-0.5">
//             <Ic d={P.x} size={13} sw={2} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════
//    MEAL CARD (posted meals preview)
// ═══════════════════════════════════════════════ */
// function MealCard({ meal, onView, onDelete }) {
//   const [deleting, setDeleting] = useState(false);
//   const handleDelete = async () => {
//     setDeleting(true);
//     await new Promise(r => setTimeout(r, 400));
//     onDelete(meal._localId);
//   };
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden animate-fadeIn">
//       {/* Image / placeholder */}
//       <div className="relative h-36 bg-[#f5f3ef] flex items-center justify-center overflow-hidden">
//         {meal.imageUrl ? (
//           <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" onError={e => { e.target.style.display="none"; }} />
//         ) : (
//           <div className="flex flex-col items-center gap-2">
//             <Ic d={P.fork} size={32} className="text-gray-200" />
//             <span className="text-xs text-gray-300 font-medium">No image</span>
//           </div>
//         )}
//         {/* availability badge */}
//         <span className={cls(
//           "absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full",
//           meal.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
//         )}>
//           {meal.isAvailable ? "Available" : "Unavailable"}
//         </span>
//         {/* category */}
//         <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-[#1a2e2a]/80 text-white px-2 py-0.5 rounded-full">
//           {meal.category}
//         </span>
//       </div>
//       <div className="p-4 flex flex-col flex-1 gap-2">
//         <h4 className="font-extrabold text-[#1a2e2a] text-sm leading-tight truncate">{meal.name}</h4>
//         {meal.description && (
//           <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{meal.description}</p>
//         )}
//         {/* Macro chips */}
//         <div className="flex gap-1.5 flex-wrap mt-auto pt-1">
//           {meal.calories && <span className="text-[9px] font-bold bg-[#fdf0ec] text-[#c96a4f] px-2 py-0.5 rounded-full">{meal.calories} kcal</span>}
//           {meal.protein  && <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">P:{meal.protein}g</span>}
//           {meal.carbs    && <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">C:{meal.carbs}g</span>}
//           {meal.fat      && <span className="text-[9px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">F:{meal.fat}g</span>}
//         </div>
//         {/* Diet tags */}
//         {meal.dietaryTags?.length > 0 && (
//           <div className="flex gap-1 flex-wrap">
//             {meal.dietaryTags.slice(0, 3).map(t => (
//               <span key={t} className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{t}</span>
//             ))}
//             {meal.dietaryTags.length > 3 && (
//               <span className="text-[9px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">+{meal.dietaryTags.length - 3}</span>
//             )}
//           </div>
//         )}
//         {/* Actions */}
//         <div className="flex gap-2 mt-2 pt-3 border-t border-gray-100">
//           <button onClick={() => onView(meal)}
//             className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1a2e2a] border border-gray-200 py-2 rounded-xl hover:border-[#1a2e2a] hover:bg-gray-50 transition-all active:scale-[.97]">
//             <Ic d={P.eye} size={12} /> View
//           </button>
//           <button onClick={handleDelete} disabled={deleting}
//             className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-red-500 border border-red-100 py-2 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all active:scale-[.97] disabled:opacity-50">
//             {deleting ? <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> : <Ic d={P.trash} size={12} />}
//             {deleting ? "..." : "Remove"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════
//    MEAL DETAIL MODAL
// ═══════════════════════════════════════════════ */
// function MealDetailModal({ meal, onClose }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
//       <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" onClick={e => e.stopPropagation()}>
//         {/* Header */}
//         <div className="sticky top-0 bg-white rounded-t-3xl flex items-center justify-between px-6 py-4 border-b border-gray-100 z-10">
//           <h3 className="font-extrabold text-[#1a2e2a] text-lg">{meal.name}</h3>
//           <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
//             <Ic d={P.x} size={16} className="text-gray-400" sw={2} />
//           </button>
//         </div>
//         <div className="px-6 py-5 space-y-5">
//           {/* Image */}
//           {meal.imageUrl && (
//             <img src={meal.imageUrl} alt={meal.name} className="w-full h-48 object-cover rounded-2xl" />
//           )}
//           {/* Meta badges */}
//           <div className="flex flex-wrap gap-2">
//             <span className="text-xs font-bold bg-[#1a2e2a] text-white px-3 py-1 rounded-full">{meal.category}</span>
//             {meal.difficulty && <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{meal.difficulty}</span>}
//             <span className={cls("text-xs font-bold px-3 py-1 rounded-full", meal.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-400")}>
//               {meal.isAvailable ? "Available" : "Unavailable"}
//             </span>
//           </div>
//           {meal.description && <p className="text-gray-500 text-sm leading-relaxed">{meal.description}</p>}
//           {/* Nutrition */}
//           <div>
//             <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Nutrition Facts</p>
//             <div className="grid grid-cols-4 gap-2">
//               {[["Calories",meal.calories,"kcal","[#c96a4f]"],["Protein",meal.protein,"g","blue-600"],["Carbs",meal.carbs,"g","amber-600"],["Fat",meal.fat,"g","purple-600"]].map(([k,v,u,c]) => v ? (
//                 <div key={k} className="bg-gray-50 rounded-xl p-3 text-center">
//                   <p className={`text-base font-extrabold text-${c}`}>{v}<span className="text-xs ml-0.5">{u}</span></p>
//                   <p className="text-[10px] text-gray-400 mt-0.5">{k}</p>
//                 </div>
//               ) : null)}
//             </div>
//           </div>
//           {/* Serving */}
//           {(meal.servingSize || meal.prepTime || meal.cookTime) && (
//             <div className="flex gap-4 flex-wrap">
//               {meal.servingSize && <div><p className="text-[10px] text-gray-400">Serving</p><p className="text-sm font-bold text-[#1a2e2a]">{meal.servingSize}{meal.servingUnit}</p></div>}
//               {meal.prepTime    && <div><p className="text-[10px] text-gray-400">Prep Time</p><p className="text-sm font-bold text-[#1a2e2a]">{meal.prepTime} min</p></div>}
//               {meal.cookTime    && <div><p className="text-[10px] text-gray-400">Cook Time</p><p className="text-sm font-bold text-[#1a2e2a]">{meal.cookTime} min</p></div>}
//               {meal.price       && <div><p className="text-[10px] text-gray-400">Price</p><p className="text-sm font-bold text-[#1a2e2a]">${meal.price}</p></div>}
//             </div>
//           )}
//           {/* Diet tags */}
//           {meal.dietaryTags?.length > 0 && (
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Dietary Tags</p>
//               <div className="flex gap-1.5 flex-wrap">
//                 {meal.dietaryTags.map(t => <span key={t} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">{t}</span>)}
//               </div>
//             </div>
//           )}
//           {/* Ingredients */}
//           {meal.ingredients && (
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Ingredients</p>
//               <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{meal.ingredients}</p>
//             </div>
//           )}
//           {/* Instructions */}
//           {meal.instructions && (
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Instructions</p>
//               <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{meal.instructions}</p>
//             </div>
//           )}
//           {/* API Response */}
//           {meal._apiResponse && (
//             <div className="bg-[#f5f3ef] rounded-xl p-4">
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">API Response</p>
//               <pre className="text-[10px] text-gray-500 overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
//                 {JSON.stringify(meal._apiResponse, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════ */
// export default function AdminMealManagement() {
//   const [activeNav,    setActiveNav]    = useState("meals");
//   const [sidebarOpen,  setSidebarOpen]  = useState(false);
//   const [form,         setForm]         = useState(EMPTY_FORM);
//   const [errors,       setErrors]       = useState({});
//   const [submitting,   setSubmitting]   = useState(false);
//   const [postedMeals,  setPostedMeals]  = useState([]);
//   const [viewMeal,     setViewMeal]     = useState(null);
//   const [activeTab,    setActiveTab]    = useState("form"); // "form" | "posted"
//   const [serverStatus, setServerStatus] = useState("unknown"); // "unknown"|"online"|"offline"|"waking"
//   const [rawResponse,  setRawResponse]  = useState(null);
//   const [showRaw,      setShowRaw]      = useState(false);

//   const formTopRef = useRef(null);
//   const toastId    = useRef(0);
//   const [toasts,   setToasts] = useState([]);

//   const addToast = useCallback((msg, type = "success") => {
//     const id = ++toastId.current;
//     setToasts(t => [...t, { id, msg, type }]);
//     setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000);
//   }, []);
//   const dismissToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

//   /* ─── Form change ─── */
//   const setField = (key, val) => {
//     setForm(f => ({ ...f, [key]: val }));
//     if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
//   };

//   const toggleTag = (tag) => {
//     setForm(f => ({
//       ...f,
//       dietaryTags: f.dietaryTags.includes(tag)
//         ? f.dietaryTags.filter(t => t !== tag)
//         : [...f.dietaryTags, tag],
//     }));
//   };

//   /* ─── Validation ─── */
//   const validate = () => {
//     const e = {};
//     if (!form.name.trim())     e.name     = "Meal name is required";
//     if (!form.category)        e.category = "Category is required";
//     if (!form.description.trim()) e.description = "Description is required";
//     if (!form.calories)        e.calories = "Calories are required";
//     else if (isNaN(+form.calories) || +form.calories < 0) e.calories = "Must be a valid number";
//     if (form.protein && isNaN(+form.protein)) e.protein = "Must be a number";
//     if (form.carbs && isNaN(+form.carbs))     e.carbs   = "Must be a number";
//     if (form.fat && isNaN(+form.fat))         e.fat     = "Must be a number";
//     if (form.price && isNaN(+form.price))     e.price   = "Must be a number";
//     if (form.prepTime && isNaN(+form.prepTime)) e.prepTime = "Must be a number";
//     if (form.cookTime && isNaN(+form.cookTime)) e.cookTime = "Must be a number";
//     return e;
//   };

import { useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ═══════════════════════════════════════════════
   ICON PRIMITIVES & VECTOR PATH DEFINITIONS
═══════════════════════════════════════════════ */
const Ic = ({ d, size = 18, className = "", sw = 1.8, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {[].concat(d).map((path, idx) => <path key={idx} d={path} />)}
  </svg>
);

const P = {
  grid: ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  terminal: ["M4 17l6-6-6-6M12 19h8"],
  plus: ["M12 5v14","M5 12h14"],
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","m17 8-5-5-5 5","M12 3v12"],
  trash: ["M3 6h18","M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6","M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  x: ["M18 6 6 18","M6 6l12 12"],
  power: ["M18.36 6.64a9 9 0 1 1-12.73 0","M12 2v10"]
};

/* ═══════════════════════════════════════════════
   CONFIG (API Integration Layer)
═══════════════════════════════════════════════ */
const MEALS_ENDPOINT = "https://new-dine-with-mee-backend.onrender.com/api/v1/meals";

/* ═══════════════════════════════════════════════
   MAIN MODULE COMPONENT
═══════════════════════════════════════════════ */
export default function AdminMealManager() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Sidebar Elements
  const sidebarMenu = [
    { label: "Overview Hub", icon: P.grid, path: "/admin", active: location.pathname === "/admin" },
    { label: "Meal Management", icon: P.plus, path: "/adminmealmgr", active: location.pathname === "/adminmealmgr" },
    { label: "Platform Settings", icon: P.terminal, path: "#", active: false }
  ];

  // UI Tabs Control: "list" | "form"
  const [activeTab, setActiveTab] = useState("list");
  const [submitting, setSubmitting] = useState(false);
  const [viewMeal, setViewMeal] = useState(null);
  const [postedMeals, setPostedMeals] = useState([]);

  // Toast stack notifications infrastructure
  const [toasts, setToasts] = useState([]);
  const toastSeq = useRef(0);
  const addToast = (msg, type = "success") => {
    const id = ++toastSeq.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  };

  // Controlled Form Registration State Schema
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Breakfast",
    kcal: "",
    protein: "",
    carbs: "",
    fats: "",
    ingredients: "",
    instructions: "",
    tags: "",
    imageFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Pack into modern multi-part payload layout structures
      const multiData = new FormData();
      multiData.append("name", formData.name);
      multiData.append("category", formData.category);
      multiData.append("kcal", formData.kcal);
      multiData.append("protein", formData.protein);
      multiData.append("carbs", formData.carbs);
      multiData.append("fats", formData.fats);
      multiData.append("ingredients", formData.ingredients);
      multiData.append("instructions", formData.instructions);
      multiData.append("tags", formData.tags);
      if (formData.imageFile) {
        multiData.append("image", formData.imageFile);
      }

      // 2. Transmit to remote Render endpoint server cluster
      const res = await fetch(MEALS_ENDPOINT, {
        method: "POST",
        body: multiData
        // Note: Headers context Content-Type omitted purposefully to allow browser bound multi-part boundary flags
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed execution code logic on database storage transaction layer.");
      }

      addToast("Successfully created and pushed therapeutic recipe schema.");
      const localRecord = {
        ...formData,
        _localId: Date.now(),
        serverRecord: data.meal || null
      };
      setPostedMeals(prev => [localRecord, ...prev]);

      // Reset standard field mappings safely
      setFormData({
        name: "",
        category: "Breakfast",
        kcal: "",
        protein: "",
        carbs: "",
        fats: "",
        ingredients: "",
        instructions: "",
        tags: "",
        imageFile: null
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setActiveTab("list");

    } catch (err) {
      console.error("Meal Registration caught error: Generating Local Fallback Mock Object", err);

      // Standalone simulation fallback execution mapping
      const localMockRecord = {
        ...formData,
        _localId: Date.now(),
        mocked: true,
        ingredients: formData.ingredients.split(",").map(i => i.trim()).filter(Boolean),
        instructions: formData.instructions.split("\n").map(i => i.trim()).filter(Boolean),
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
      };

      setPostedMeals(prev => [localMockRecord, ...prev]);
      addToast("Meal stored locally in application workflow context memory layer.", "info");

      // Clear values back out smoothly
      setFormData({
        name: "",
        category: "Breakfast",
        kcal: "",
        protein: "",
        carbs: "",
        fats: "",
        ingredients: "",
        instructions: "",
        tags: "",
        imageFile: null
      });
      setActiveTab("list");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLocal = (localId) => {
    setPostedMeals(prev => prev.filter(m => m._localId !== localId));
    addToast("Flushed transient meal component successfully.", "info");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 font-sans selection:bg-[#1a2e2a] selection:text-white">
      {/* ════════════════════════════════ SIDEBAR NAVIGATION ════════════════════════════════ */}
      <aside className="w-64 bg-[#0d1614] hidden md:flex flex-col text-gray-400 fixed h-full border-r border-stone-900/40 z-30">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-stone-900/40">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c96a4f] to-[#e0856c] flex items-center justify-center text-white shadow-md shadow-orange-950/20">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-wide uppercase">DineWithMee</h2>
            <p className="text-[10px] text-emerald-500 font-bold tracking-wider uppercase">Enterprise Control</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarMenu.map((item, idx) => (
            <button key={idx} onClick={() => item.path !== "#" && navigate(item.path)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${item.active ? "bg-[#1a2e2a] text-white shadow-inner" : "hover:bg-stone-900/30 hover:text-gray-200"}`}>
              <Ic d={item.icon} size={16} sw={item.active ? 2.2 : 1.8} className={item.active ? "text-[#c96a4f]" : "text-gray-500"} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-900/40 flex items-center justify-between bg-stone-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-black text-white"> A </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white">Admin_Alpha</p>
              <p className="text-[10px] text-gray-500 font-medium">Root Infrastructure</p>
            </div>
          </div>
          <button onClick={() => navigate("/")} className="w-8 h-8 rounded-lg hover:bg-red-950/40 border border-transparent hover:border-red-900/50 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors">
            <Ic d={P.power} size={15} sw={2} />
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════ MAIN VIEWPORT WORKSPACE ════════════════════════════════ */}
      <main className="flex-1 md:pl-64 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-gray-900 tracking-tight">Clinical Meal Pipeline Management</h1>
            <p className="text-xs text-gray-400 font-medium hidden sm:block">Construct and populate macro balances into live therapeutic ingestion engines</p>
          </div>

          {/* Tab Sub Toggle Switch */}
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button onClick={() => setActiveTab("list")} className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${activeTab === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
              Active Posts
            </button>
            <button onClick={() => setActiveTab("form")} className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${activeTab === "form" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
              Post Component
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "form" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fadeIn">
              {/* Submission Registration Form Element */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900 tracking-tight">Component Identity Mapping Structure</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Assigned values serialize into globally unique identifier trees</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wide font-black text-gray-500">Meal Component Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g., Avocado Salmon Keto Bowl" className="w-full h-11 px-4 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#c96a4f] bg-gray-50/40" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wide font-black text-gray-500">Macro Classification Bin</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full h-11 px-4 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#c96a4f] bg-white cursor-pointer appearance-none">
                      {["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Other"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wide text-orange-700">Calories (kcal)</label>
                    <input type="text" name="kcal" required value={formData.kcal} onChange={handleInputChange} placeholder="420" className="w-full h-11 px-4 border border-orange-200 rounded-xl font-medium focus:outline-none focus:border-orange-500 bg-orange-50/10" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wide text-emerald-700">Protein (g)</label>
                    <input type="text" name="protein" required value={formData.protein} onChange={handleInputChange} placeholder="32g" className="w-full h-11 px-4 border border-emerald-200 rounded-xl font-medium focus:outline-none focus:border-emerald-500 bg-emerald-50/10" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wide text-blue-700">Carbohydrates (g)</label>
                    <input type="text" name="carbs" required value={formData.carbs} onChange={handleInputChange} placeholder="12g" className="w-full h-11 px-4 border border-blue-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 bg-blue-50/10" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wide text-purple-700">Lipid Fats (g)</label>
                    <input type="text" name="fats" required value={formData.fats} onChange={handleInputChange} placeholder="18g" className="w-full h-11 px-4 border border-purple-200 rounded-xl font-medium focus:outline-none focus:border-purple-500 bg-purple-50/10" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wide">Ingredient List Definition <span className="text-gray-400 font-normal">(Comma-delimited mapping context)</span></label>
                  <textarea name="ingredients" required value={formData.ingredients} onChange={handleInputChange} placeholder="2 Eggs, 50g Almond Flour, 1 Whole Hass Avocado, Sea Salt" rows="2" className="w-full p-4 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#c96a4f] bg-gray-50/40 resize-none leading-relaxed" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wide">Preparation Directives <span className="text-gray-400 font-normal">(Line-separated breakdown structures)</span></label>
                  <textarea name="instructions" required value={formData.instructions} onChange={handleInputChange} placeholder="Step 1: Whisk eggs thoroughly inside a clean isolation bowl.&#10;Step 2: Fold base mixture cleanly over non-stick skillet lines." rows="3" className="w-full p-4 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#c96a4f] bg-gray-50/40 resize-none leading-relaxed" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wide">Metadata Classification Filtering Tags <span className="text-gray-400 font-normal">(Comma-delimited)</span></label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Keto, Gluten-Free, High-Protein" className="w-full h-11 px-4 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#c96a4f] bg-gray-50/40" />
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] uppercase tracking-wide font-black text-gray-500 mb-2">Static Asset Image Representation File Upload</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-[#c96a4f]/50 transition-colors bg-gray-50/30 flex flex-col items-center justify-center text-center cursor-pointer relative">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    <Ic d={P.upload} size={24} className="text-gray-400 mb-2" />
                    <p className="text-xs font-bold text-gray-700">{formData.imageFile ? formData.imageFile.name : "Drop file hook attachment here or click browser mount interface"}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">PNG, JPG formats up to 8MB max allocation buffer</p>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="w-full h-12 bg-[#1a2e2a] hover:bg-[#12211e] text-white font-bold rounded-xl transition-all active:scale-[.99] flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md disabled:opacity-60 disabled:pointer-events-none">
                  {submitting ? (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  ) : <Ic d={P.plus} size={15} sw={2.5} />}
                  {submitting ? "Writing memory nodes..." : "Deploy Meal Configuration Schema File"}
                </button>
              </form>

              {/* Reactive Local Simulation Preview Box */}
              <div className="bg-[#1a2e2a] rounded-3xl p-6 text-white shadow-xl space-y-6 sticky top-28 hidden lg:block border border-emerald-950">
                <div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-black tracking-widest uppercase px-2 py-0.5 rounded-md border border-emerald-500/30">Compiler Mirror</span>
                  <h3 className="text-base font-black tracking-tight mt-2.5">Dynamic Serialization Matrix</h3>
                  <p className="text-xs text-stone-400 leading-normal mt-0.5">Realtime execution telemetry translation visualizer layer framework.</p>
                </div>

                <div className="border border-stone-800 bg-stone-950/40 rounded-2xl p-4 space-y-3 font-mono text-[11px] text-stone-300 overflow-hidden">
                  <p><span className="text-emerald-500">payload_context</span> = {"{"}</p>
                  <p className="pl-4"><span className="text-amber-500">"name"</span>: "{formData.name || "Undefined"}",</p>
                  <p className="pl-4"><span className="text-amber-500">"category"</span>: "{formData.category}",</p>
                  <p className="pl-4"><span className="text-amber-500">"nutrition"</span>: {"{"} kcal: {formData.kcal || 0}, p: "{formData.protein || "0g"}" {"}"},</p>
                  <p className="pl-4"><span className="text-amber-500">"assets"</span>: {"{"} file_attached: {formData.imageFile ? "true" : "false"} {"}"}</p>
                  <p>{"}"};</p>
                </div>

                <div className="pt-2 border-t border-stone-800/60 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-400">Target Server Core Gateway</h4>
                  <div className="flex items-center gap-3 bg-stone-950/30 border border-stone-800 rounded-xl p-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm" />
                    <div className="text-[11px] font-mono text-stone-300 tracking-tight break-all">
                      POST: .../api/v1/meals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE POSTS INSTANCE ALLOCATION SCREEN DISPLAY INTERFACE */
            <div className="animate-fadeIn">
              {postedMeals.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-3xl flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <h3 className="font-black text-gray-900 text-sm tracking-tight">No active deployment profiles compiled</h3>
                  <p className="text-xs text-gray-400 max-w-xs mt-1.5 font-medium leading-relaxed">Structural components deployed from this terminal instance allocation interface layer compile directly into global lists dynamically.</p>
                  <button onClick={() => setActiveTab("form")} className="mt-5 inline-flex items-center gap-2 bg-[#1a2e2a] hover:bg-[#12211e] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm">
                    <Ic d={P.plus} size={16} sw={2.5} /> Post Your First Meal
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm font-bold text-gray-400">{postedMeals.length} meal{postedMeals.length !== 1 ? "s" : ""} posted this session</p>
                    <button onClick={() => setActiveTab("form")} className="flex items-center gap-2 bg-[#c96a4f] hover:bg-[#b85a40] text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-colors active:scale-[.98]">
                      <Ic d={P.plus} size={14} sw={2.5} /> Add Another
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {postedMeals.map(meal => (
                      <MealCard key={meal._localId} meal={meal} onView={setViewMeal} onDelete={handleDeleteLocal} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ════ MEAL DETAIL MODAL ════ */}
      {viewMeal && <MealDetailModal meal={viewMeal} onClose={() => setViewMeal(null)} />}

      {/* Toast alert layers absolute container stack mapping context */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map(t => (
          <div key={t.id} className={`p-4 rounded-xl text-white font-bold text-xs tracking-wide pointer-events-auto shadow-xl flex items-center justify-between border animate-slideUp ${t.type === "error" ? "bg-red-600 border-red-700" : t.type === "info" ? "bg-blue-950 text-blue-300 border-blue-900" : "bg-[#1a2e2a] border-emerald-950"}`}>
            <p>{t.msg}</p>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="opacity-50 hover:opacity-100 ml-3">
              <Ic d={P.x} size={12} sw={2.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CARD INTERNAL UI MODULE COMPONENTS
═══════════════════════════════════════════════ */
function MealCard({ meal, onView, onDelete }) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-52 relative">
      {meal.mocked && (
        <span className="absolute top-3 right-3 bg-blue-500/10 text-blue-600 border border-blue-200 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md">
          Simulation Cache Fallback
        </span>
      )}
      <div className="space-y-1">
        <span className="text-[10px] font-black tracking-wider uppercase text-[#c96a4f]">{meal.category}</span>
        <h4 className="text-sm font-black text-gray-900 tracking-tight leading-snug line-clamp-1">{meal.name}</h4>
        <div className="flex gap-2 text-[10px] font-mono text-gray-400 pt-1">
          <span>KCAL: {meal.kcal || "0"}</span>
          <span>P: {meal.protein || "0g"}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
        <button onClick={() => onView(meal)} className="flex-1 h-9 bg-gray-100 hover:bg-gray-200/80 transition-colors rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 text-gray-700">
          <Ic d={P.eye} size={13} /> View Metrics
        </button>
        <button onClick={() => onDelete(meal._localId)} className="w-9 h-9 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all rounded-lg flex items-center justify-center">
          <Ic d={P.trash} size={13} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MODAL SUB-BLOCK ═══════════════════════════════════════════════ */
function MealDetailModal({ meal, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto relative space-y-5">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 border border-gray-100 bg-white hover:bg-gray-50 transition-colors rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900">
          <Ic d={P.x} size={14} sw={2.5} />
        </button>

        <div>
          <span className="text-[10px] bg-stone-100 text-stone-500 font-black uppercase tracking-wider px-2 py-0.5 rounded border border-stone-200">{meal.category}</span>
          <h3 className="text-lg font-black text-gray-900 tracking-tight mt-2">{meal.name}</h3>
        </div>

        <div className="grid grid-cols-4 gap-2 border-y border-gray-100 py-4 text-center">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Calories</p>
            <p className="text-sm font-black text-orange-700 pt-0.5">{meal.kcal || 0}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Protein</p>
            <p className="text-sm font-black text-emerald-700 pt-0.5">{meal.protein}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Carbohydrate</p>
            <p className="text-sm font-black text-blue-700 pt-0.5">{meal.carbs}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Lipid Fat</p>
            <p className="text-sm font-black text-purple-700 pt-0.5">{meal.fats}</p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <h4 className="font-black text-gray-900 tracking-tight uppercase tracking-wider text-[11px] text-stone-400">Ingredient Mapping Elements</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 font-medium leading-relaxed pl-1">
            {meal.ingredients?.map?.((ing, idx) => <li key={idx}>{ing}</li>) || <li className="italic text-gray-400">None parsed</li>}
          </ul>
        </div>

        <div className="space-y-2 text-xs">
          <h4 className="font-black text-gray-900 tracking-tight uppercase tracking-wider text-[11px] text-stone-400">Preparation Directives Matrix</h4>
          <ol className="space-y-2 text-gray-600 font-medium leading-relaxed pl-1">
            {meal.instructions?.map?.((ins, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-black text-stone-400">{idx + 1}.</span>
                <span>{ins}</span>
              </li>
            )) || <li className="italic text-gray-400">None parsed</li>}
          </ol>
        </div>
      </div>
    </div>
  );
}