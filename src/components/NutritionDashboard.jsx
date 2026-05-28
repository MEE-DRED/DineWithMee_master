// import { useState, useRef, useEffect } from "react";

// // ─── Icons ────────────────────────────────────────────────────────────────────
// const Icon = {
//   Search: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="11" cy="11" r="8" strokeWidth="2" />
//       <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   ),
//   Bell: ({ hasAlert }) => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//         d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//     </svg>
//   ),
//   Home: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//     </svg>
//   ),
//   Fork: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
//         d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
//     </svg>
//   ),
//   Calendar: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
//       <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   ),
//   Chart: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//     </svg>
//   ),
//   User: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   ),
//   Settings: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   ),
//   Heart: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//     </svg>
//   ),
//   X: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//     </svg>
//   ),
//   ChevRight: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//     </svg>
//   ),
//   ChevLeft: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//     </svg>
//   ),
//   Clock: () => (
//     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="12" cy="12" r="10" strokeWidth="2" />
//       <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   ),
//   Menu: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
//   ),
//   Drop: () => (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
//     </svg>
//   ),
//   Plus: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//     </svg>
//   ),
//   Monitor: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
//       <path d="M8 21h8M12 17v4" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   ),
// };

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const navItems = [
//   { id: "dashboard", label: "Dashboard", icon: "Home" },
//   { id: "meals", label: "Meal Plans", icon: "Fork" },
//   { id: "schedule", label: "Schedule", icon: "Calendar" },
//   { id: "analytics", label: "Analytics", icon: "Chart" },
//   { id: "health", label: "Health", icon: "Heart" },
//   { id: "profile", label: "Profile", icon: "User" },
// ];

// const searchSuggestions = [
//   "Avocado & Poached Egg", "Roasted Harvest Bowl", "Greek Yogurt & Honey",
//   "Grilled Chicken Salad", "Lemon Herb Salmon", "Oatmeal w/ Berries",
//   "Nutrition Strategy", "Hydration Goals", "Weekly Meal Plan", "Health Analytics",
// ];

// const notifications = [
//   { id: 1, title: "Session reminder", body: "Nutrition Strategy with Dr. Sarah Chen at 4:30 PM", time: "10 min ago", unread: true, icon: "📅" },
//   { id: 2, title: "Hydration goal", body: "You're 900ml away from your daily water goal!", time: "1 hr ago", unread: true, icon: "💧" },
//   { id: 3, title: "Meal logged", body: "Lunch logged: Roasted Harvest Bowl — 520 kcal", time: "2 hrs ago", unread: false, icon: "✅" },
//   { id: 4, title: "Weekly plan ready", body: "Your meal plan for next week is ready to review.", time: "Yesterday", unread: false, icon: "📋" },
// ];

// const mealData = {
//   breakfast: {
//     label: "BREAKFAST", name: "Avocado & Poached Egg", kcal: 340, protein: "18g Protein",
//     img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80",
//   },
//   lunch: {
//     label: "LUNCH", name: "Roasted Harvest Bowl", kcal: 520, protein: "12g Protein",
//     img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
//   },
// };

// const weekData = [
//   {
//     day: "Mon, Oct 14", today: true,
//     breakfast: { name: "Avocado Toast", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=80&q=80" },
//     lunch: { name: "Harvest Bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
//     dinner: null,
//   },
//   {
//     day: "Tue, Oct 15",
//     breakfast: { name: "Greek Yogurt & Honey" }, lunch: { name: "Grilled Chicken Salad" }, dinner: { name: "Lemon Herb Salmon" },
//   },
//   {
//     day: "Wed, Oct 16",
//     breakfast: { name: "Oatmeal w/ Berries" }, lunch: { name: "Lentil Soup" }, dinner: { name: "Tofu Stir Fry" },
//   },
//   {
//     day: "Thu, Oct 17",
//     breakfast: { name: "Smoothie Bowl" }, lunch: { name: "Quinoa Salad" }, dinner: { name: "Baked Cod" },
//   },
//   {
//     day: "Fri, Oct 18",
//     breakfast: { name: "Chia Pudding" }, lunch: { name: "Turkey Wrap" }, dinner: { name: "Veggie Stir Fry" },
//   },
// ];

// const healthStats = [
//   { label: "Weight", value: "64.2", unit: "kg", delta: "↘ 0.5kg", color: "text-emerald-600" },
//   { label: "Heart Rate", value: "72", unit: "bpm", delta: "— Stable", color: "text-gray-400" },
//   { label: "Sleep", value: "7.5", unit: "hrs", delta: "↗ 1.2hrs", color: "text-emerald-600" },
//   { label: "Energy", value: "High", unit: "", delta: "⚡ Peak State", color: "text-amber-500" },
// ];

// // ─── Search Modal ─────────────────────────────────────────────────────────────
// function SearchModal({ onClose }) {
//   const [query, setQuery] = useState("");
//   const inputRef = useRef(null);
//   useEffect(() => { inputRef.current?.focus(); }, []);

//   const filtered = query.length > 0
//     ? searchSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
//     : searchSuggestions;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
//       style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
//       onClick={onClose}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
//         onClick={e => e.stopPropagation()}
//         style={{ animation: "slideDown 0.2s ease" }}>
//         <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
//           <Icon.Search />
//           <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
//             placeholder="Search meals, data, sessions..."
//             className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400" />
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100">
//             <Icon.X />
//           </button>
//         </div>
//         <div className="max-h-72 overflow-y-auto">
//           {filtered.length === 0 ? (
//             <p className="text-center text-gray-400 text-sm py-8">No results for "{query}"</p>
//           ) : (
//             filtered.map((s, i) => (
//               <button key={i} onClick={() => { alert(`Navigating to: ${s}`); onClose(); }}
//                 className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f0f7f4] transition-colors text-left group">
//                 <span className="text-gray-300 group-hover:text-[#2d6a4f] transition-colors"><Icon.Search /></span>
//                 <span className="text-sm text-gray-700 group-hover:text-[#1a4731] font-medium transition-colors">{s}</span>
//               </button>
//             ))
//           )}
//         </div>
//         <div className="px-4 py-2 border-t border-gray-50 flex gap-2">
//           {["Meals", "Sessions", "Health"].map(tag => (
//             <button key={tag} onClick={() => setQuery(tag)}
//               className="text-xs bg-gray-100 hover:bg-[#1a4731] hover:text-white text-gray-600 px-3 py-1 rounded-full transition-all">
//               {tag}
//             </button>
//           ))}
//         </div>
//       </div>
//       <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }`}</style>
//     </div>
//   );
// }

// // ─── Notifications Panel ──────────────────────────────────────────────────────
// function NotifPanel({ onClose }) {
//   const [notifs, setNotifs] = useState(notifications);
//   const unreadCount = notifs.filter(n => n.unread).length;

//   return (
//     <div className="absolute right-0 top-12 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
//       style={{ animation: "slideDown 0.18s ease" }}>
//       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//         <div>
//           <span className="font-bold text-gray-900 text-sm">Notifications</span>
//           {unreadCount > 0 && (
//             <span className="ml-2 text-[10px] font-bold bg-[#e05a2b] text-white rounded-full px-1.5 py-0.5">{unreadCount}</span>
//           )}
//         </div>
//         <button onClick={() => setNotifs(n => n.map(x => ({ ...x, unread: false })))}
//           className="text-xs text-[#2d6a4f] hover:underline font-medium">Mark all read</button>
//       </div>
//       <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
//         {notifs.map(n => (
//           <div key={n.id} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
//             className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors ${n.unread ? "bg-[#f0f7f4] hover:bg-[#e0f0e8]" : "hover:bg-gray-50"}`}>
//             <span className="text-xl mt-0.5 flex-shrink-0">{n.icon}</span>
//             <div className="flex-1 min-w-0">
//               <p className={`text-xs font-bold truncate ${n.unread ? "text-[#1a4731]" : "text-gray-700"}`}>{n.title}</p>
//               <p className="text-xs text-gray-500 mt-0.5 leading-snug">{n.body}</p>
//               <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
//             </div>
//             {n.unread && <span className="w-2 h-2 rounded-full bg-[#e05a2b] flex-shrink-0 mt-1.5" />}
//           </div>
//         ))}
//       </div>
//       <button onClick={onClose} className="w-full text-center text-xs text-gray-400 hover:text-[#1a4731] py-2.5 border-t border-gray-50 transition-colors">
//         Close
//       </button>
//     </div>
//   );
// }

// // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function Sidebar({ activeNav, setActiveNav, collapsed, setCollapsed }) {
//   return (
//     <aside className={`flex flex-col bg-[#1a4731] text-white transition-all duration-300 ease-in-out flex-shrink-0
//       ${collapsed ? "w-16" : "w-56"} min-h-screen`}>
//       {/* Logo */}
//       <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
//         <div className="w-8 h-8 rounded-xl bg-[#e05a2b] flex items-center justify-center flex-shrink-0">
//           <Icon.Drop />
//         </div>
//         {!collapsed && <span className="font-extrabold text-base tracking-tight">NutriTrack</span>}
//       </div>

//       {/* Nav items */}
//       <nav className="flex-1 py-4 space-y-1 px-2">
//         {navItems.map(item => {
//           const IconComp = Icon[item.icon];
//           const active = activeNav === item.id;
//           return (
//             <button key={item.id} onClick={() => setActiveNav(item.id)}
//               title={collapsed ? item.label : ""}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
//                 ${active
//                   ? "bg-white/15 text-white shadow-inner"
//                   : "text-white/60 hover:bg-white/10 hover:text-white"}
//                 ${collapsed ? "justify-center" : ""}`}>
//               <span className="flex-shrink-0"><IconComp /></span>
//               {!collapsed && <span>{item.label}</span>}
//               {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Bottom */}
//       <div className="border-t border-white/10 px-2 py-4 space-y-1">
//         <button title={collapsed ? "Settings" : ""}
//           className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
//           <Icon.Settings />
//           {!collapsed && <span>Settings</span>}
//         </button>
//         <button onClick={() => setCollapsed(c => !c)} title={collapsed ? "Expand" : "Collapse"}
//           className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
//           <span className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
//             <Icon.ChevLeft />
//           </span>
//           {!collapsed && <span>Collapse</span>}
//         </button>
//       </div>

//       {/* Avatar (expanded only) */}
//       {!collapsed && (
//         <div className="px-4 pb-5">
//           <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
//             <img src="https://i.pravatar.cc/150?img=47" alt="Elena" className="w-8 h-8 rounded-full object-cover border-2 border-white/30" />
//             <div className="min-w-0">
//               <p className="text-xs font-bold truncate">Elena Martinez</p>
//               <p className="text-[10px] text-white/50 truncate">Premium Plan</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// }

// // ─── Mobile Drawer ────────────────────────────────────────────────────────────
// function MobileDrawer({ activeNav, setActiveNav, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex" style={{ animation: "fadeIn 0.15s ease" }}>
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
//       <aside className="relative w-64 bg-[#1a4731] text-white flex flex-col min-h-screen"
//         style={{ animation: "slideRight 0.2s ease" }}>
//         <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-xl bg-[#e05a2b] flex items-center justify-center">
//               <Icon.Drop />
//             </div>
//             <span className="font-extrabold text-base">NutriTrack</span>
//           </div>
//           <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all">
//             <Icon.X />
//           </button>
//         </div>
//         <nav className="flex-1 py-4 space-y-1 px-2">
//           {navItems.map(item => {
//             const IconComp = Icon[item.icon];
//             const active = activeNav === item.id;
//             return (
//               <button key={item.id} onClick={() => { setActiveNav(item.id); onClose(); }}
//                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
//                   ${active ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
//                 <IconComp />
//                 <span>{item.label}</span>
//                 {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
//               </button>
//             );
//           })}
//         </nav>
//         <div className="px-4 pb-5 border-t border-white/10 pt-4">
//           <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
//             <img src="https://i.pravatar.cc/150?img=47" alt="Elena" className="w-8 h-8 rounded-full object-cover border-2 border-white/30" />
//             <div>
//               <p className="text-xs font-bold">Elena Martinez</p>
//               <p className="text-[10px] text-white/50">Premium Plan</p>
//             </div>
//           </div>
//         </div>
//       </aside>
//       <style>{`
//         @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
//         @keyframes slideRight { from { transform:translateX(-100%); } to { transform:translateX(0); } }
//       `}</style>
//     </div>
//   );
// }

// // ─── Meal Card ─────────────────────────────────────────────────────────────────
// function MealCard({ meal, onClick }) {
//   return (
//     <div onClick={onClick}
//       className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer
//         hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]">
//       <div className="aspect-[4/3] overflow-hidden bg-gray-100">
//         <img src={meal.img} alt={meal.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
//       </div>
//       <div className="p-3 flex flex-col gap-2">
//         <span className="text-[10px] font-bold tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full w-fit">
//           {meal.label}
//         </span>
//         <p className="font-bold text-gray-900 text-sm leading-tight">{meal.name}</p>
//         <div className="flex gap-2 flex-wrap">
//           <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">{meal.kcal} kcal</span>
//           <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">{meal.protein}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Meal Detail Modal ────────────────────────────────────────────────────────
// function MealDetailModal({ meal, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
//       style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
//       onClick={onClose}>
//       <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm shadow-2xl"
//         onClick={e => e.stopPropagation()}
//         style={{ animation: "slideDown 0.2s ease" }}>
//         <div className="aspect-video overflow-hidden">
//           <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
//         </div>
//         <div className="p-5">
//           <span className="text-[10px] font-bold tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{meal.label}</span>
//           <h3 className="font-extrabold text-xl text-gray-900 mt-2">{meal.name}</h3>
//           <div className="flex gap-3 mt-3">
//             <div className="flex-1 bg-[#f0f7f4] rounded-xl p-3 text-center">
//               <p className="text-lg font-bold text-[#1a4731]">{meal.kcal}</p>
//               <p className="text-xs text-gray-500">Calories</p>
//             </div>
//             <div className="flex-1 bg-[#f0f7f4] rounded-xl p-3 text-center">
//               <p className="text-lg font-bold text-[#1a4731]">{meal.protein}</p>
//               <p className="text-xs text-gray-500">Protein</p>
//             </div>
//             <div className="flex-1 bg-[#f0f7f4] rounded-xl p-3 text-center">
//               <p className="text-lg font-bold text-[#1a4731]">32g</p>
//               <p className="text-xs text-gray-500">Carbs</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="mt-4 w-full py-3 rounded-2xl bg-[#1a4731] text-white font-bold text-sm hover:bg-[#2d6a4f] transition-all active:scale-[0.98]">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Hydration Card ───────────────────────────────────────────────────────────
// function HydrationCard() {
//   const [ml, setMl] = useState(2100);
//   const goal = 3000;
//   const pct = Math.min((ml / goal) * 100, 100);
//   const add = (amt) => setMl(h => Math.min(h + amt, goal));

//   return (
//     <div className="bg-[#f0f7f4] rounded-2xl p-5 border border-[#d0e8de] h-full">
//       <div className="flex items-center justify-between mb-1">
//         <span className="font-bold text-gray-900 text-lg">Hydration</span>
//         <span className="text-[#2d6a4f]"><Icon.Drop /></span>
//       </div>
//       <p className="text-gray-500 text-sm mb-4">{(ml / 1000).toFixed(1)}L / {goal / 1000}L</p>
//       <div className="w-full bg-white rounded-full h-3 mb-1.5 overflow-hidden shadow-inner">
//         <div className="h-3 rounded-full bg-[#1a4731] transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
//       </div>
//       <div className="flex justify-between text-xs text-gray-400 mb-4">
//         <span>{Math.round(pct)}% of Daily Goal</span>
//         <span>{((goal - ml) / 1000).toFixed(1).replace(/\.0$/, "")}L left</span>
//       </div>
//       <div className="flex gap-2">
//         {[250, 500].map(amt => (
//           <button key={amt} onClick={() => add(amt)}
//             className="flex-1 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700
//               hover:bg-[#1a4731] hover:text-white hover:border-[#1a4731] active:scale-95 transition-all duration-150 shadow-sm">
//             + {amt}ml
//           </button>
//         ))}
//       </div>
//       {ml >= goal && (
//         <p className="mt-3 text-xs text-center text-emerald-600 font-semibold animate-pulse">🎉 Daily goal reached!</p>
//       )}
//     </div>
//   );
// }

// // ─── Week Card ────────────────────────────────────────────────────────────────
// function WeekCard({ day }) {
//   const ForkIcon = () => (
//     <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
//         d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
//     </svg>
//   );

//   const Row = ({ label, item }) => (
//     <div className="flex items-center gap-3">
//       {item?.img
//         ? <img src={item.img} alt="" className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
//         : <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0"><ForkIcon /></div>
//       }
//       <div className="min-w-0">
//         <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{label}</p>
//         <p className="text-xs font-medium text-gray-800 truncate">{item ? item.name : <span className="text-gray-300 italic">Plan Dinner</span>}</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`rounded-2xl border p-4 w-56 flex-shrink-0 snap-start transition-all hover:shadow-md cursor-pointer
//       ${day.today ? "bg-white border-gray-200 shadow-md ring-1 ring-[#2d6a4f]/20" : "bg-white border-gray-100 hover:border-gray-200"}`}>
//       <div className="flex justify-between items-center mb-4">
//         <span className="font-bold text-gray-900 text-sm">{day.day}</span>
//         {day.today && <span className="text-[#e05a2b] text-xs font-bold">Today</span>}
//       </div>
//       <div className="flex flex-col gap-3">
//         <Row label="Breakfast" item={day.breakfast} />
//         <Row label="Lunch" item={day.lunch} />
//         <Row label="Dinner" item={day.dinner} />
//       </div>
//     </div>
//   );
// }

// // ─── Plan Week Modal ──────────────────────────────────────────────────────────
// function PlanWeekModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
//       style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
//       onClick={onClose}>
//       <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
//         onClick={e => e.stopPropagation()}
//         style={{ animation: "slideDown 0.2s ease" }}>
//         <div className="bg-[#1a4731] px-6 py-5 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-extrabold text-xl">Plan Your Week</h3>
//               <p className="text-green-300 text-sm mt-0.5">Oct 14 – Oct 20, 2024</p>
//             </div>
//             <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-all">
//               <Icon.X />
//             </button>
//           </div>
//         </div>
//         <div className="p-5 space-y-3">
//           {weekData.map((d, i) => (
//             <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-[#2d6a4f] hover:bg-[#f0f7f4] cursor-pointer
//               ${d.today ? "border-[#2d6a4f] bg-[#f0f7f4]" : "border-gray-100"}`}>
//               <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0
//                 ${d.today ? "bg-[#e05a2b] text-white" : "bg-gray-100 text-gray-500"}`}>
//                 {d.day.split(" ")[0].slice(0, 2)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs font-bold text-gray-700">{d.day}</p>
//                 <p className="text-[10px] text-gray-400 truncate">{d.breakfast?.name} · {d.lunch?.name}</p>
//               </div>
//               {d.today && <span className="text-[10px] font-bold text-[#e05a2b] flex-shrink-0">Today</span>}
//             </div>
//           ))}
//           <button onClick={onClose}
//             className="w-full py-3 rounded-2xl bg-[#e05a2b] text-white font-bold text-sm mt-2 hover:bg-[#c94d22] transition-all active:scale-[0.98]">
//             Save Week Plan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Dashboard ───────────────────────────────────────────────────────────
// export default function NutritionDashboard() {
//   const [activeNav, setActiveNav] = useState("dashboard");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [planWeekOpen, setPlanWeekOpen] = useState(false);
//   const unreadCount = notifications.filter(n => n.unread).length;
//   const notifRef = useRef(null);

//   // Close notif panel on outside click
//   useEffect(() => {
//     if (!notifOpen) return;
//     const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [notifOpen]);

//   // Keyboard shortcut: Cmd/Ctrl+K for search
//   useEffect(() => {
//     const handler = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); } };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-[#f7f5f0] font-sans">

//       {/* Desktop Sidebar */}
//       <div className="hidden lg:flex">
//         <Sidebar activeNav={activeNav} setActiveNav={setActiveNav}
//           collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
//       </div>

//       {/* Mobile Drawer */}
//       {mobileDrawerOpen && (
//         <MobileDrawer activeNav={activeNav} setActiveNav={setActiveNav}
//           onClose={() => setMobileDrawerOpen(false)} />
//       )}

//       {/* Modals */}
//       {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
//       {selectedMeal && <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}
//       {planWeekOpen && <PlanWeekModal onClose={() => setPlanWeekOpen(false)} />}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col min-w-0">

//         {/* Top Bar */}
//         <header className="sticky top-0 z-20 bg-[#f7f5f0]/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3">
//           <div className="flex items-center gap-3 max-w-5xl mx-auto">

//             {/* Mobile menu button */}
//             <button onClick={() => setMobileDrawerOpen(true)}
//               className="lg:hidden w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all active:scale-95">
//               <Icon.Menu />
//             </button>

//             {/* Search bar */}
//             <button onClick={() => setSearchOpen(true)}
//               className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100
//                 hover:border-[#2d6a4f] hover:shadow-md transition-all max-w-sm text-left group">
//               <span className="text-gray-400 group-hover:text-[#2d6a4f] transition-colors"><Icon.Search /></span>
//               <span className="text-gray-400 text-sm group-hover:text-gray-600 transition-colors">Search meals, data...</span>
//               <span className="ml-auto text-[10px] text-gray-300 bg-gray-50 border border-gray-100 rounded-md px-1.5 py-0.5 hidden sm:block">⌘K</span>
//             </button>

//             {/* Right actions */}
//             <div className="ml-auto flex items-center gap-2">

//               {/* Bell */}
//               <div className="relative" ref={notifRef}>
//                 <button onClick={() => setNotifOpen(o => !o)}
//                   className={`relative w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm transition-all active:scale-95
//                     ${notifOpen ? "bg-[#1a4731] text-white border-[#1a4731]" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"}`}>
//                   <Icon.Bell />
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e05a2b] text-white text-[9px] font-bold flex items-center justify-center">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//                 {notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}
//               </div>

//               {/* Avatar */}
//               <button className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95">
//                 <img src="https://i.pravatar.cc/150?img=47" alt="Elena" className="w-full h-full object-cover" />
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Page body */}
//         <main className="flex-1 px-4 sm:px-6 py-6 max-w-5xl mx-auto w-full space-y-8">

//           {/* Hero */}
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a4731] leading-tight tracking-tight">
//                 Good Morning, Elena
//               </h1>
//               <p className="text-gray-500 text-sm mt-1">Your wellness journey is on track today.</p>
//             </div>
//             <button onClick={() => setPlanWeekOpen(true)}
//               className="self-start sm:self-auto bg-[#e05a2b] hover:bg-[#c94d22] active:scale-95 text-white font-semibold text-sm
//                 px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-150 whitespace-nowrap">
//               <Icon.Calendar />
//               Plan Your Week
//             </button>
//           </div>

//           {/* Today's Nutrition */}
//           <section>
//             <h2 className="text-[#2d6a4f] font-bold text-lg mb-4">Today's Nutrition</h2>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//               {/* 3 meal cards */}
//               <div className="lg:col-span-2 grid grid-cols-3 gap-4">
//                 <MealCard meal={mealData.breakfast} onClick={() => setSelectedMeal(mealData.breakfast)} />
//                 <MealCard meal={mealData.lunch} onClick={() => setSelectedMeal(mealData.lunch)} />
//                 {/* Schedule Dinner */}
//                 <div onClick={() => setPlanWeekOpen(true)}
//                   className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center
//                     min-h-[160px] cursor-pointer hover:border-[#2d6a4f] hover:bg-[#f0f7f4] transition-all group active:scale-[0.97]">
//                   <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3
//                     group-hover:bg-[#1a4731] group-hover:border-[#1a4731] transition-all shadow-sm">
//                     <span className="text-gray-400 group-hover:text-white transition-all"><Icon.Plus /></span>
//                   </div>
//                   <p className="font-semibold text-gray-700 text-xs text-center">Schedule Dinner</p>
//                   <p className="text-[10px] text-gray-400 mt-1 text-center px-2">Choose from your meal plan</p>
//                 </div>
//               </div>
//               {/* Hydration */}
//               <HydrationCard />
//             </div>
//           </section>

//           {/* Weekly Schedule */}
//           <section>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-[#2d6a4f] font-bold text-lg">Weekly Meal Schedule</h2>
//               <div className="flex gap-2">
//                 {[{ dir: "left", icon: <Icon.ChevLeft /> }, { dir: "right", icon: <Icon.ChevRight /> }].map(({ dir, icon }) => (
//                   <button key={dir}
//                     onClick={() => {
//                       const el = document.getElementById("week-scroll");
//                       el.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
//                     }}
//                     className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center
//                       hover:bg-[#1a4731] hover:text-white hover:border-[#1a4731] transition-all active:scale-95 shadow-sm">
//                     {icon}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div id="week-scroll"
//               className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
//               style={{ scrollbarWidth: "none" }}>
//               {weekData.map((day, i) => <WeekCard key={i} day={day} />)}
//             </div>
//           </section>

//           {/* Bottom row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             {/* Health at a Glance */}
//             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
//               <div className="flex items-center justify-between mb-5">
//                 <h3 className="font-bold text-gray-900 text-base">Health at a Glance</h3>
//                 <button className="text-sm text-gray-500 hover:text-[#1a4731] transition-colors flex items-center gap-1 hover:gap-2 font-medium">
//                   View Trends <Icon.ChevRight />
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 {healthStats.map((s, i) => (
//                   <div key={i}
//                     className="bg-gray-50 hover:bg-[#f0f7f4] rounded-xl p-3 flex flex-col gap-0.5 cursor-pointer transition-all hover:shadow-sm group">
//                     <p className="text-xs text-gray-400">{s.label}</p>
//                     <p className="font-extrabold text-gray-900 text-xl leading-none group-hover:text-[#1a4731] transition-colors">
//                       {s.value}<span className="text-xs font-normal text-gray-400 ml-0.5">{s.unit}</span>
//                     </p>
//                     <p className={`text-xs mt-0.5 ${s.color}`}>{s.delta}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Upcoming Session */}
//             <div className="bg-[#1a4731] rounded-2xl p-5 text-white relative overflow-hidden">
//               <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
//               <div className="absolute -bottom-12 -left-6 w-32 h-32 rounded-full bg-white/5" />
//               <div className="relative z-10">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-5 h-5 bg-[#e05a2b] rounded-md flex items-center justify-center">
//                     <Icon.Monitor />
//                   </div>
//                   <span className="text-xs text-green-300 uppercase tracking-widest font-bold">Upcoming Session</span>
//                 </div>
//                 <h3 className="text-2xl font-extrabold">Nutrition Strategy</h3>
//                 <p className="text-green-300 text-sm mt-0.5 mb-5">With Dr. Sarah Chen, PhD</p>
//                 <div className="bg-white/10 hover:bg-white/15 transition-all rounded-xl p-3 flex items-center gap-4 cursor-pointer group">
//                   <div className="bg-white/20 rounded-xl px-3 py-2 text-center min-w-[44px]">
//                     <p className="text-[10px] text-green-300 uppercase font-bold">OCT</p>
//                     <p className="text-xl font-extrabold leading-none">14</p>
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-sm">Today at 4:30 PM</p>
//                     <p className="text-xs text-green-300 mt-0.5">Zoom Link Sent to Email</p>
//                   </div>
//                   <button onClick={() => alert("Opening Zoom session...")}
//                     className="w-9 h-9 rounded-full bg-[#e05a2b] flex items-center justify-center flex-shrink-0
//                       hover:bg-[#c94d22] active:scale-95 transition-all shadow-lg">
//                     <Icon.ChevRight />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center gap-2 text-gray-400 text-xs pb-4">
//             <Icon.Clock />
//             <span>Last updated 2 mins ago</span>
//           </div>
//         </main>
//       </div>

//       <style>{`
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         * { box-sizing: border-box; }
//         ::-webkit-scrollbar { display: none; }
//       `}</style>
//     </div>
//   );
// }




import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" strokeWidth="2" />
      <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Bell: ({ hasAlert }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Fork: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
        d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevLeft: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Drop: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Monitor: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
      <path d="M8 21h8M12 17v4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "Home", path: "/dashboard" },
  { id: "meals", label: "Meal Plans", icon: "Fork", path: "/meals" },
  { id: "schedule", label: "Schedule", icon: "Calendar", path: "/dashboard" },
  { id: "analytics", label: "Analytics", icon: "Chart", path: "/dashboard" },
  { id: "health", label: "Health", icon: "Heart", path: "/dashboard" },
  { id: "profile", label: "Profile", icon: "User", path: "/dashboard" },
];

const searchSuggestions = [
  "Avocado & Poached Egg", "Roasted Harvest Bowl", "Greek Yogurt & Honey",
  "Grilled Chicken Salad", "Lemon Herb Salmon", "Oatmeal w/ Berries",
  "Nutrition Strategy", "Hydration Goals", "Weekly Meal Plan", "Health Analytics",
];

const notifications = [
  { id: 1, title: "Session reminder", body: "Nutrition Strategy with Dr. Sarah Chen at 4:30 PM", time: "10 min ago", unread: true, icon: "📅" },
  { id: 2, title: "Hydration goal", body: "You're 900ml away from your daily water goal!", time: "1 hr ago", unread: true, icon: "💧" },
  { id: 3, title: "Meal logged", body: "Lunch logged: Roasted Harvest Bowl — 520 kcal", time: "2 hrs ago", unread: false, icon: "✅" },
  { id: 4, title: "Weekly plan ready", body: "Your meal plan for next week is ready to review.", time: "Yesterday", unread: false, icon: "📋" },
];

const mealData = {
  breakfast: {
    label: "BREAKFAST", name: "Avocado & Poached Egg", kcal: 340, protein: "18g Protein",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80",
  },
  lunch: {
    label: "LUNCH", name: "Roasted Harvest Bowl", kcal: 520, protein: "12g Protein",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
};

const weekData = [
  {
    day: "Mon, Oct 14", today: true,
    breakfast: { name: "Avocado Toast", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=80&q=80" },
    lunch: { name: "Harvest Bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
    dinner: null,
  },
  {
    day: "Tue, Oct 15",
    breakfast: { name: "Greek Yogurt & Honey" }, lunch: { name: "Grilled Chicken Salad" }, dinner: { name: "Lemon Herb Salmon" },
  },
  {
    day: "Wed, Oct 16",
    breakfast: { name: "Oatmeal w/ Berries" }, lunch: { name: "Lentil Soup" }, dinner: { name: "Tofu Stir Fry" },
  },
  {
    day: "Thu, Oct 17",
    breakfast: { name: "Smoothie Bowl" }, lunch: { name: "Quinoa Salad" }, dinner: { name: "Baked Cod" },
  },
  {
    day: "Fri, Oct 18",
    breakfast: { name: "Chia Pudding" }, lunch: { name: "Turkey Wrap" }, dinner: { name: "Veggie Stir Fry" },
  },
];

const healthStats = [
  { label: "Weight", value: "64.2", unit: "kg", delta: "↘ 0.5kg", color: "text-emerald-600" },
  { label: "Heart Rate", value: "72", unit: "bpm", delta: "— Stable", color: "text-gray-400" },
  { label: "Sleep", value: "7.5", unit: "hrs", delta: "↗ 1.2hrs", color: "text-emerald-600" },
  { label: "Energy", value: "High", unit: "", delta: "⚡ Peak State", color: "text-amber-500" },
];

// ─── Search Modal ─────────────────────────────────────────────────────────────
function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const filtered = query.length > 0
    ? searchSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : searchSuggestions;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: "slideDown 0.2s ease" }}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Icon.Search />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search meals, data, sessions..."
            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400" />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <Icon.X />
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">No results for "{query}"</p>
          ) : (
            filtered.map((s, i) => (
              <button key={i} onClick={() => { alert(`Navigating to: ${s}`); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f0f7f4] transition-colors text-left group">
                <span className="text-gray-300 group-hover:text-[#2d6a4f] transition-colors"><Icon.Search /></span>
                <span className="text-sm text-gray-700 group-hover:text-[#1a4731] font-medium transition-colors">{s}</span>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t border-gray-50 flex gap-2">
          {["Meals", "Sessions", "Health"].map(tag => (
            <button key={tag} onClick={() => setQuery(tag)}
              className="text-xs bg-gray-100 hover:bg-[#1a4731] hover:text-white text-gray-600 px-3 py-1 rounded-full transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

// ─── Notifications Panel ──────────────────────────────────────────────────────
function NotifPanel({ onClose }) {
  const [notifs, setNotifs] = useState(notifications);
  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <div className="absolute right-0 top-12 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
      style={{ animation: "slideDown 0.18s ease" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <span className="font-bold text-gray-900 text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="ml-2 text-[10px] font-bold bg-[#e05a2b] text-white rounded-full px-1.5 py-0.5">{unreadCount}</span>
          )}
        </div>
        <button onClick={() => setNotifs(n => n.map(x => ({ ...x, unread: false })))}
          className="text-xs text-[#2d6a4f] hover:underline font-medium">Mark all read</button>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
        {notifs.map(n => (
          <div key={n.id} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
            className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors ${n.unread ? "bg-[#f0f7f4] hover:bg-[#e0f0e8]" : "hover:bg-gray-50"}`}>
            <span className="text-xl mt-0.5 flex-shrink-0">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold truncate ${n.unread ? "text-[#1a4731]" : "text-gray-700"}`}>{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{n.body}</p>
              <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
            </div>
            {n.unread && <span className="w-2 h-2 rounded-full bg-[#e05a2b] flex-shrink-0 mt-1.5" />}
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full text-center text-xs text-gray-400 hover:text-[#1a4731] py-2.5 border-t border-gray-50 transition-colors">
        Close
      </button>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
    <aside className={`flex flex-col bg-[#1a4731] text-white transition-all duration-300 ease-in-out flex-shrink-0
      ${collapsed ? "w-16" : "w-56"} min-h-screen`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-xl bg-[#e05a2b] flex items-center justify-center flex-shrink-0">
          <Icon.Drop />
        </div>
        {!collapsed && <span className="font-extrabold text-base tracking-tight">NutriTrack</span>}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(item => {
          const IconComp = Icon[item.icon];
          const active = location.pathname === item.path || (item.id === "dashboard" && location.pathname === "/");
          return (
            <Link key={item.id} to={item.path}
              title={collapsed ? item.label : ""}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${active
                  ? "bg-white/15 text-white shadow-inner"
                  : "text-white/60 hover:bg-white/10 hover:text-white"}
                ${collapsed ? "justify-center" : ""}`}>
              <span className="flex-shrink-0"><IconComp /></span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 px-2 py-4 space-y-1">
        <button title={collapsed ? "Settings" : ""}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
          <Icon.Settings />
          {!collapsed && <span>Settings</span>}
        </button>
        <button onClick={() => setCollapsed(c => !c)} title={collapsed ? "Expand" : "Collapse"}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
            <Icon.ChevLeft />
          </span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>

      {/* Avatar (expanded only) */}
      {!collapsed && (
        <div className="px-4 pb-5">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
            <img src="https://i.pravatar.cc/150?img=47" alt="Elena" className="w-8 h-8 rounded-full object-cover border-2 border-white/30" />
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">Elena Martinez</p>
              <p className="text-[10px] text-white/50 truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ onClose }) {
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-50 flex" style={{ animation: "fadeIn 0.15s ease" }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <aside className="relative w-64 bg-[#1a4731] text-white flex flex-col min-h-screen" style={{ animation: "slideRight 0.2s ease" }}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e05a2b] flex items-center justify-center">
              <Icon.Drop />
            </div>
            <span className="font-extrabold text-base">NutriTrack</span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all">
            <Icon.X />
          </button>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(item => {
            const IconComp = Icon[item.icon];
            const active = location.pathname === item.path || (item.id === "dashboard" && location.pathname === "/");
            return (
              <Link key={item.id} to={item.path} onClick={onClose}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
                <IconComp />
                <span>{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function NutritionDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="flex bg-[#f4f7f5] text-gray-800 min-h-screen antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Row */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800 p-1.5 rounded-xl hover:bg-gray-100 transition-all">
              <Icon.Menu />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome back, Elena</h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">Here's your nutritional summary for today.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setShowSearch(true)} className="flex items-center gap-2 text-left bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-40 sm:w-56 text-gray-400 hover:bg-gray-100 hover:border-gray-200 transition-all group">
              <Icon.Search />
              <span className="text-xs font-medium group-hover:text-gray-500 transition-colors">Search...</span>
            </button>

            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all relative">
                <Icon.Bell />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-[#e05a2b] rounded-full" />
              </button>
              {showNotif && <NotifPanel onClose={() => setShowNotif(false)} />}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Primary Row Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Macro Balance & Target Metrics Cards */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a4731] to-[#123323] text-white rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="flex-1 space-y-4 text-center md:text-left">
                <span className="text-[10px] font-bold bg-white/10 tracking-widest text-green-300 px-3 py-1.5 rounded-full uppercase">Today's Overview</span>
                <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">You've hit 68% of your caloric blueprint!</h2>
                <p className="text-sm text-white/70 max-w-sm leading-relaxed">Excellent alignment across protein and fiber goals. Keep up this momentum for dinner.</p>
                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-center min-w-[80px]">
                    <p className="text-xs text-white/50 font-medium">Remaining</p>
                    <p className="text-lg font-bold mt-0.5">580 <span className="text-xs font-normal opacity-70">kcal</span></p>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-center min-w-[80px]">
                    <p className="text-xs text-white/50 font-medium">Burned</p>
                    <p className="text-lg font-bold mt-0.5 text-amber-400">420 <span className="text-xs font-normal opacity-70">kcal</span></p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="relative w-28 h-28 flex items-center justify-center bg-white/5 rounded-2xl p-2 border border-white/10">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e05a2b" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 68) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">68%</span>
                    <span className="text-[9px] text-white/50 tracking-wider font-bold uppercase">Caloric</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Hydration Card tracking tracker */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Hydration Track</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">1,600 <span className="text-sm font-medium text-gray-400">/ 2,500 ml</span></h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg">💧</div>
              </div>
              <div className="my-6 relative bg-blue-50 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: "64%" }} />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
                  <Icon.Plus /> 250ml
                </button>
                <button className="flex-1 bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
                  <Icon.Plus /> 500ml
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Data Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Meal Planner Overview Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Today's Logged Meals</h3>
                <Link to="/meals" className="text-xs text-[#2d6a4f] hover:underline font-semibold flex items-center gap-1">
                  View Full Meal Plan <Icon.ChevRight />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(mealData).map(([key, meal]) => (
                  <div key={key} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center hover:shadow-md transition-all group">
                    <img src={meal.img} alt={meal.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-102 transition-all" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-[#e05a2b] tracking-wider uppercase block">{meal.label}</span>
                      <h4 className="font-bold text-sm text-gray-800 mt-0.5 truncate">{meal.name}</h4>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                        <span>🔥 {meal.kcal} kcal</span>
                        <span className="text-gray-200">•</span>
                        <span>{meal.protein}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Health Indicators Sidebar block summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Biometrics Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                {healthStats.map((stat, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                    <p className="text-xs font-semibold text-gray-400">{stat.label}</p>
                    <div className="mt-2">
                      <h4 className="text-xl font-black text-gray-900 leading-none">{stat.value} <span className="text-xs font-normal text-gray-400">{stat.unit}</span></h4>
                      <p className={`text-[10px] font-bold mt-1.5 ${stat.color}`}>{stat.delta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </div>
  );
}