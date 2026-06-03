

// import { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

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
//   { id: "dashboard",     label: "Dashboard",     icon: "Home",     path: "/dashboard"    },
//   { id: "meals",         label: "Meal Plans",    icon: "Fork",     path: "/meals"        },
//   { id: "healthStats",   label: "Health Stats",  icon: "Calendar", path: "/healthprofile" },
//   { id: "consultations", label: "Consultations", icon: "Chart",    path: "/consultations" },
//   { id: "orders",        label: "Orders",        icon: "Heart",    path: "/orders"       },
//   { id: "subscriptions", label: "Subscriptions", icon: "Monitor",  path: "/subscriptions" },
//   { id: "profile",       label: "Settings",      icon: "User",     path: "/security"     },
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
// function Sidebar({ collapsed, setCollapsed }) {
//   const location = useLocation();

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
//           const active = location.pathname === item.path || (item.id === "dashboard" && location.pathname === "/");
//           return (
//             <Link key={item.id} to={item.path}
//               title={collapsed ? item.label : ""}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
//                 ${active
//                   ? "bg-white/15 text-white shadow-inner"
//                   : "text-white/60 hover:bg-white/10 hover:text-white"}
//                 ${collapsed ? "justify-center" : ""}`}>
//               <span className="flex-shrink-0"><IconComp /></span>
//               {!collapsed && <span>{item.label}</span>}
//               {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Bottom */}
//       <div className="border-t border-white/10 px-2 py-4 space-y-1">
//         <Link to="/security" title={collapsed ? "Settings" : ""}
//           className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
//           <Icon.Settings />
//           {!collapsed && <span>Settings</span>}
//         </Link>
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
// function MobileDrawer({ onClose }) {
//   const location = useLocation();

//   return (
//     <div className="fixed inset-0 z-50 flex" style={{ animation: "fadeIn 0.15s ease" }}>
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
//       <aside className="relative w-64 bg-[#1a4731] text-white flex flex-col min-h-screen" style={{ animation: "slideRight 0.2s ease" }}>
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
//             const active = location.pathname === item.path || (item.id === "dashboard" && location.pathname === "/");
//             return (
//               <Link key={item.id} to={item.path} onClick={onClose}
//                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
//                 <IconComp />
//                 <span>{item.label}</span>
//                 {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>
//     </div>
//   );
// }

// // ─── Main Component ────────────────────────────────────────────────────────────
// export default function NutritionDashboard() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);

//   return (
//     <div className="flex bg-[#f4f7f5] text-gray-800 min-h-screen antialiased">
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:block">
//         <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//       </div>

//       {/* Mobile Sidebar Drawer */}
//       {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

//       {/* Main Layout Area */}
//       <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
//         {/* Top Header Row */}
//         <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800 p-1.5 rounded-xl hover:bg-gray-100 transition-all">
//               <Icon.Menu />
//             </button>
//             <div>
//               <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome back, Elena</h1>
//               <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">Here's your nutritional summary for today.</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-4">
//             <button onClick={() => setShowSearch(true)} className="flex items-center gap-2 text-left bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-40 sm:w-56 text-gray-400 hover:bg-gray-100 hover:border-gray-200 transition-all group">
//               <Icon.Search />
//               <span className="text-xs font-medium group-hover:text-gray-500 transition-colors">Search...</span>
//             </button>

//             <div className="relative">
//               <button onClick={() => setShowNotif(!showNotif)} className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all relative">
//                 <Icon.Bell />
//                 <span className="absolute top-2.5 right-3 w-2 h-2 bg-[#e05a2b] rounded-full" />
//               </button>
//               {showNotif && <NotifPanel onClose={() => setShowNotif(false)} />}
//             </div>
//           </div>
//         </header>

//         {/* Content Body */}
//         <main className="flex-1 p-4 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
//           {/* Primary Row Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Macro Balance & Target Metrics Cards */}
//             <div className="lg:col-span-2 bg-gradient-to-br from-[#1a4731] to-[#123323] text-white rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
//               <div className="flex-1 space-y-4 text-center md:text-left">
//                 <span className="text-[10px] font-bold bg-white/10 tracking-widest text-green-300 px-3 py-1.5 rounded-full uppercase">Today's Overview</span>
//                 <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">You've hit 68% of your caloric blueprint!</h2>
//                 <p className="text-sm text-white/70 max-w-sm leading-relaxed">Excellent alignment across protein and fiber goals. Keep up this momentum for dinner.</p>
//                 <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
//                   <div className="bg-white/10 px-4 py-2 rounded-xl text-center min-w-[80px]">
//                     <p className="text-xs text-white/50 font-medium">Remaining</p>
//                     <p className="text-lg font-bold mt-0.5">580 <span className="text-xs font-normal opacity-70">kcal</span></p>
//                   </div>
//                   <div className="bg-white/10 px-4 py-2 rounded-xl text-center min-w-[80px]">
//                     <p className="text-xs text-white/50 font-medium">Burned</p>
//                     <p className="text-lg font-bold mt-0.5 text-amber-400">420 <span className="text-xs font-normal opacity-70">kcal</span></p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-center gap-3 flex-shrink-0">
//                 <div className="relative w-28 h-28 flex items-center justify-center bg-white/5 rounded-2xl p-2 border border-white/10">
//                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                     <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
//                     <circle cx="50" cy="50" r="40" fill="none" stroke="#e05a2b" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 68) / 100} strokeLinecap="round" className="transition-all duration-1000" />
//                   </svg>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-2xl font-black">68%</span>
//                     <span className="text-[9px] text-white/50 tracking-wider font-bold uppercase">Caloric</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Micro Hydration Card tracking tracker */}
//             <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Hydration Track</p>
//                   <h3 className="text-2xl font-black text-gray-900 mt-1">1,600 <span className="text-sm font-medium text-gray-400">/ 2,500 ml</span></h3>
//                 </div>
//                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg">💧</div>
//               </div>
//               <div className="my-6 relative bg-blue-50 h-3 rounded-full overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: "64%" }} />
//               </div>
//               <div className="flex gap-2">
//                 <button className="flex-1 bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
//                   <Icon.Plus /> 250ml
//                 </button>
//                 <button className="flex-1 bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
//                   <Icon.Plus /> 500ml
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Secondary Data Grid layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Meal Planner Overview Column */}
//             <div className="lg:col-span-2 space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-bold text-gray-900 tracking-tight">Today's Logged Meals</h3>
//                 <Link to="/meals" className="text-xs text-[#2d6a4f] hover:underline font-semibold flex items-center gap-1">
//                   View Full Meal Plan <Icon.ChevRight />
//                 </Link>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {Object.entries(mealData).map(([key, meal]) => (
//                   <div key={key} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center hover:shadow-md transition-all group">
//                     <img src={meal.img} alt={meal.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-102 transition-all" />
//                     <div className="min-w-0 flex-1">
//                       <span className="text-[9px] font-bold text-[#e05a2b] tracking-wider uppercase block">{meal.label}</span>
//                       <h4 className="font-bold text-sm text-gray-800 mt-0.5 truncate">{meal.name}</h4>
//                       <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
//                         <span>🔥 {meal.kcal} kcal</span>
//                         <span className="text-gray-200">•</span>
//                         <span>{meal.protein}</span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Health Indicators Sidebar block summary */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-bold text-gray-900 tracking-tight">Biometrics Summary</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {healthStats.map((stat, idx) => (
//                   <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
//                     <p className="text-xs font-semibold text-gray-400">{stat.label}</p>
//                     <div className="mt-2">
//                       <h4 className="text-xl font-black text-gray-900 leading-none">{stat.value} <span className="text-xs font-normal text-gray-400">{stat.unit}</span></h4>
//                       <p className={`text-[10px] font-bold mt-1.5 ${stat.color}`}>{stat.delta}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const API_BASE_URL = "https://new-dine-with-mee-backend.onrender.com";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" strokeWidth="2" />
      <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Bell: () => (
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

const navItems = [
  { id: "dashboard",     label: "Dashboard",     icon: "Home",     path: "/dashboard"    },
  { id: "meals",         label: "Meal Plans",    icon: "Fork",     path: "/meals"        },
  { id: "healthStats",   label: "Health Stats",  icon: "Calendar", path: "/healthprofile" },
  { id: "consultations", label: "Consultations", icon: "Chart",    path: "/consultations" },
  { id: "orders",        label: "Orders",        icon: "Heart",    path: "/orders"       },
  { id: "subscriptions", label: "Subscriptions", icon: "Monitor",  path: "/subscriptions" },
  { id: "profile",       label: "Settings",      icon: "User",     path: "/security"     },
];

const searchSuggestions = [
  "Avocado & Poached Egg", "Roasted Harvest Bowl", "Greek Yogurt & Honey",
  "Grilled Chicken Salad", "Lemon Herb Salmon", "Oatmeal w/ Berries",
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
      </div>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

// ─── Notifications Panel ──────────────────────────────────────────────────────
function NotifPanel({ onClose, notifications, setNotifications }) {
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = async () => {
    try {
      setNotifications(prev => prev.map(x => ({ ...x, unread: false })));
      await fetch(`${API_BASE_URL}/api/notifications/read-all`, { method: "PUT" });
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      setNotifications(prev => prev.map(x => x.id === id ? { ...x, unread: false } : x));
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, { method: "PUT" });
    } catch (err) {
      console.error("Error updating notification status:", err);
    }
  };

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
        <button onClick={markAllRead} className="text-xs text-[#2d6a4f] hover:underline font-medium">Mark all read</button>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
        {notifications.length === 0 ? (
          <p className="text-center text-xs text-gray-400 py-6">No recent notifications</p>
        ) : (
          notifications.map(n => (
            <div key={n.id} onClick={() => markAsRead(n.id)}
              className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors ${n.unread ? "bg-[#f0f7f4] hover:bg-[#e0f0e8]" : "hover:bg-gray-50"}`}>
              <span className="text-xl mt-0.5 flex-shrink-0">{n.icon || "🔔"}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${n.unread ? "text-[#1a4731]" : "text-gray-700"}`}>{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{n.body}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-[#e05a2b] flex-shrink-0 mt-1.5" />}
            </div>
          ))
        )}
      </div>
      <button onClick={onClose} className="w-full text-center text-xs text-gray-400 hover:text-[#1a4731] py-2.5 border-t border-gray-50 transition-colors">
        Close
      </button>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, setCollapsed, userData }) {
  const location = useLocation();

  return (
    <aside className={`flex flex-col bg-[#1a4731] text-white transition-all duration-300 ease-in-out flex-shrink-0
      ${collapsed ? "w-16" : "w-56"} min-h-screen`}>
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-xl bg-[#e05a2b] flex items-center justify-center flex-shrink-0">
          <Icon.Drop />
        </div>
        {!collapsed && <span className="font-extrabold text-base tracking-tight">NutriTrack</span>}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(item => {
          const IconComp = Icon[item.icon];
          const active = location.pathname === item.path || (item.id === "dashboard" && location.pathname === "/");
          return (
            <Link key={item.id} to={item.path}
              title={collapsed ? item.label : ""}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${active ? "bg-white/15 text-white shadow-inner" : "text-white/60 hover:bg-white/10 hover:text-white"}
                ${collapsed ? "justify-center" : ""}`}>
              <span className="flex-shrink-0"><IconComp /></span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e05a2b]" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-2 py-4 space-y-1">
        <Link to="/security" title={collapsed ? "Settings" : ""}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
          <Icon.Settings />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button onClick={() => setCollapsed(c => !c)} title={collapsed ? "Expand" : "Collapse"}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}>
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
            <Icon.ChevLeft />
          </span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>

      {!collapsed && userData && (
        <div className="px-4 pb-5">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
            <img src={userData.avatar || "https://i.pravatar.cc/150?img=47"} alt={userData.name} className="w-8 h-8 rounded-full object-cover border-2 border-white/30" />
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">{userData.name || "User"}</p>
              <p className="text-[10px] text-white/50 truncate">{userData.planTier || "Standard Plan"}</p>
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

  // API Driven States
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: "Elena Martinez", avatar: "", planTier: "Premium Plan" });
  const [caloricSummary, setCaloricSummary] = useState({ percent: 68, remaining: 580, burned: 420 });
  const [hydration, setHydration] = useState({ current: 1600, target: 2500 });
  const [meals, setMeals] = useState({});
  const [biometrics, setBiometrics] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch all initial data from Render backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Summary & User Overview Data
        const summaryRes = await fetch(`${API_BASE_URL}/api/user/summary`);
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          setUserData(summaryData.user || userData);
          setCaloricSummary(summaryData.calories || caloricSummary);
        }

        // 2. Fetch Water Tracking Data
        const hydrationRes = await fetch(`${API_BASE_URL}/api/hydration`);
        if (hydrationRes.ok) {
          const hydData = await hydrationRes.json();
          setHydration({ current: hydData.current, target: hydData.target });
        }

        // 3. Fetch Logged Meals Data
        const mealsRes = await fetch(`${API_BASE_URL}/api/meals/today`);
        if (mealsRes.ok) {
          const mealsData = await mealsRes.json();
          setMeals(mealsData);
        } else {
          // Fallback if endpoint structure differs
          setMeals({
            breakfast: { label: "BREAKFAST", name: "Avocado & Poached Egg", kcal: 340, protein: "18g Protein", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80" },
            lunch: { label: "LUNCH", name: "Roasted Harvest Bowl", kcal: 520, protein: "12g Protein", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" }
          });
        }

        // 4. Fetch Biometrics 
        const bioRes = await fetch(`${API_BASE_URL}/api/biometrics`);
        if (bioRes.ok) {
          const bioData = await bioRes.json();
          setBiometrics(bioData);
        } else {
          setBiometrics([
            { label: "Weight", value: "64.2", unit: "kg", delta: "↘ 0.5kg", color: "text-emerald-600" },
            { label: "Heart Rate", value: "72", unit: "bpm", delta: "— Stable", color: "text-gray-400" },
            { label: "Sleep", value: "7.5", unit: "hrs", delta: "↗ 1.2hrs", color: "text-emerald-600" },
            { label: "Energy", value: "High", unit: "", delta: "⚡ Peak State", color: "text-amber-500" },
          ]);
        }

        // 5. Fetch Active Alert System Notifications
        const notifRes = await fetch(`${API_BASE_URL}/api/notifications`);
        if (notifRes.ok) {
          const notifData = await notifRes.json();
          setNotifications(notifData);
        } else {
          setNotifications([
            { id: 1, title: "Session reminder", body: "Nutrition Strategy with Dr. Sarah Chen at 4:30 PM", time: "10 min ago", unread: true, icon: "📅" },
            { id: 2, title: "Hydration goal", body: "You're 900ml away from your daily water goal!", time: "1 hr ago", unread: true, icon: "💧" }
          ]);
        }

      } catch (error) {
        console.error("Error connecting to server runtime environment components:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Update Hydration Logic (POST/PUT action item to server)
  const addHydrationValue = async (amount) => {
    const updatedAmount = Math.min(hydration.current + amount, hydration.target);
    
    // Optimistic UI calculation response wrapper
    setHydration(prev => ({ ...prev, current: updatedAmount }));

    try {
      await fetch(`${API_BASE_URL}/api/hydration/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });
    } catch (err) {
      console.error("Backend failed synchronization validation step on amount step adjustments:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f5]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-[#1a4731] rounded-full" />
          <p className="text-sm font-semibold text-gray-500">Loading your profile updates...</p>
        </div>
      </div>
    );
  }

  const hasUnreadNotifications = notifications.some(n => n.unread);

  return (
    <div className="flex bg-[#f4f7f5] text-gray-800 min-h-screen antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} userData={userData} />
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
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome back, {userData.name.split(" ")[0]}</h1>
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
                {hasUnreadNotifications && <span className="absolute top-2.5 right-3 w-2 h-2 bg-[#e05a2b] rounded-full" />}
              </button>
              {showNotif && <NotifPanel onClose={() => setShowNotif(false)} notifications={notifications} setNotifications={setNotifications} />}
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
                <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">You've hit {caloricSummary.percent}% of your caloric blueprint!</h2>
                <p className="text-sm text-white/70 max-w-sm leading-relaxed">Excellent alignment across protein and fiber goals. Keep up this momentum for dinner.</p>
                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-center min-w-[80px]">
                    <p className="text-xs text-white/50 font-medium">Remaining</p>
                    <p className="text-lg font-bold mt-0.5">{caloricSummary.remaining} <span className="text-xs font-normal opacity-70">kcal</span></p>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-center min-w-[80px]">
                    <p className="text-xs text-white/50 font-medium">Burned</p>
                    <p className="text-lg font-bold mt-0.5 text-amber-400">{caloricSummary.burned} <span className="text-xs font-normal opacity-70">kcal</span></p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="relative w-28 h-28 flex items-center justify-center bg-white/5 rounded-2xl p-2 border border-white/10">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e05a2b" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * caloricSummary.percent) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">{caloricSummary.percent}%</span>
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
                  <h3 className="text-2xl font-black text-gray-900 mt-1">{hydration.current.toLocaleString()} <span className="text-sm font-medium text-gray-400">/ {hydration.target.toLocaleString()} ml</span></h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg">💧</div>
              </div>
              <div className="my-6 relative bg-blue-50 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((hydration.current / hydration.target) * 100, 100)}%` }} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => addHydrationValue(250)} className="flex-1 bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
                  <Icon.Plus /> 250ml
                </button>
                <button onClick={() => addHydrationValue(500)} className="flex-1 bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
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
                {Object.keys(meals).length === 0 ? (
                  <p className="text-sm text-gray-400">No meals logged for today yet.</p>
                ) : (
                  Object.entries(meals).map(([key, meal]) => (
                    <div key={key} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center hover:shadow-md transition-all group">
                      <img src={meal.img || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=150"} alt={meal.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-102 transition-all" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-bold text-[#e05a2b] tracking-wider uppercase block">{meal.label || key}</span>
                        <h4 className="font-bold text-sm text-gray-800 mt-0.5 truncate">{meal.name}</h4>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                          <span>🔥 {meal.kcal} kcal</span>
                          <span className="text-gray-200">•</span>
                          <span>{meal.protein}</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Health Indicators Sidebar block summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Biometrics Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                {biometrics.map((stat, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                    <p className="text-xs font-semibold text-gray-400">{stat.label}</p>
                    <div className="mt-2">
                      <h4 className="text-xl font-black text-gray-900 leading-none">{stat.value} <span className="text-xs font-normal text-gray-400">{stat.unit}</span></h4>
                      <p className={`text-[10px] font-bold mt-1.5 ${stat.color || "text-gray-400"}`}>{stat.delta}</p>
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