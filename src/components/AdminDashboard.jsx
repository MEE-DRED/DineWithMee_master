// import { useState, useRef } from "react";

// /* ═══════════════════════════════════════════
//    ICON PRIMITIVE
// ═══════════════════════════════════════════ */
// const Ic = ({ d, size = 18, className = "", sw = 1.8, fill = "none" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
//     stroke="currentColor" strokeWidth={sw}
//     strokeLinecap="round" strokeLinejoin="round" className={className}>
//     {[].concat(d).map((p, i) => <path key={i} d={p} />)}
//   </svg>
// );

// /* ═══════════════════════════════════════════
//    ICON PATHS
// ═══════════════════════════════════════════ */
// const P = {
//   grid:       ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
//   users:      ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
//   providers:  ["M9 11l3 3L22 4","M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
//   layers:     ["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
//   analytics:  "M22 12h-4l-3 9L9 3l-3 9H2",
//   gear:       ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
//   help:       ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],
//   logout:     ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
//   search:     ["M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z","M21 21l-4.35-4.35"],
//   bell:       ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"],
//   rss:        ["M4 11a9 9 0 0 1 9 9","M4 4a16 16 0 0 1 16 16","M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"],
//   shieldCheck:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M9 12l2 2 4-4"],
//   cloud:      ["M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"],
//   cpu:        ["M9 9h6v6H9z","M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3","M4 4h16v16H4z"],
//   tag:        ["M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z","M7 7h.01"],
//   trendUp:    ["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"],
//   arrowRight: "M5 12h14M12 5l7 7-7 7",
//   plus:       "M12 5v14M5 12h14",
//   clockHist:  ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 8v4l3 3"],
//   shieldAlert:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M12 8v4","M12 16h.01"],
//   userPlus:   ["M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M19 8v6","M22 11h-6"],
//   database:   ["M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3z","M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5","M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"],
//   hamburger:  "M3 12h18M3 6h18M3 18h18",
//   x:          "M18 6L6 18M6 6l12 12",
//   check:      "M20 6L9 17l-5-5",
//   rocket:     ["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z","M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z","M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0","M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"],
// };

// /* ═══════════════════════════════════════════
//    NAV DATA
// ═══════════════════════════════════════════ */
// const NAV_ITEMS = [
//   { id: "overview",  label: "Overview",          icon: P.grid },
//   { id: "users",     label: "User Management",   icon: P.users },
//   { id: "providers", label: "Provider Management",icon: P.providers },
//   { id: "system",    label: "System Components", icon: P.layers },
//   { id: "analytics", label: "Analytics",          icon: P.analytics },
//   { id: "settings",  label: "Settings",           icon: P.gear },
// ];

// /* Platform growth chart data (90 days, weekly buckets) */
// const GROWTH_DATA = {
//   "7": [
//     { label: "Mon", value: 62 }, { label: "Tue", value: 71 }, { label: "Wed", value: 85 },
//     { label: "Thu", value: 78 }, { label: "Fri", value: 96 }, { label: "Sat", value: 70 },
//     { label: "Sun", value: 88 },
//   ],
//   "30": [
//     { label: "W1", value: 58 }, { label: "W2", value: 67 }, { label: "W3", value: 74 },
//     { label: "W4", value: 82 }, { label: "W5", value: 91 }, { label: "W6", value: 76 },
//     { label: "W7", value: 96 }, { label: "W8", value: 84 },
//   ],
// };

// const ACTIVITY_LOG = [
//   {
//     id: 1, icon: P.clockHist, iconBg: "bg-gray-100", iconColor: "text-gray-500",
//     title: "API Policy Update",
//     desc: "Global rate limit adjusted to 5000req/min for Premium tier.",
//     actor: "Admin_AlexM", time: "2 mins ago", tag: "INFRASTRUCTURE", tagColor: "bg-gray-100 text-gray-500",
//   },
//   {
//     id: 2, icon: P.shieldAlert, iconBg: "bg-red-50", iconColor: "text-red-500",
//     title: "Security Alert Resolved",
//     desc: "Potential SQL injection attempt blocked by WAF at Edge-Node-04.",
//     actor: "System Auth", time: "14 mins ago", tag: "SECURITY", tagColor: "bg-red-50 text-red-500",
//   },
//   {
//     id: 3, icon: P.userPlus, iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
//     title: "New Provider Onboarded",
//     desc: "Dr. Sarah Jenkins (Nutritionist) joined the platform.",
//     actor: "Verified", time: "45 mins ago", tag: "USERS", tagColor: "bg-gray-100 text-gray-500",
//   },
//   {
//     id: 4, icon: P.database, iconBg: "bg-gray-100", iconColor: "text-gray-500",
//     title: "Database Backup Completed",
//     desc: "Snapshot DW-DB-2023-10-24-0400 stored successfully in S3-East.",
//     actor: "Auto-Task", time: "4 hrs ago", tag: "MAINTENANCE", tagColor: "bg-gray-100 text-gray-500",
//   },
// ];

// /* ═══════════════════════════════════════════
//    TOAST
// ═══════════════════════════════════════════ */
// function Toast({ toasts, dismiss }) {
//   return (
//     <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
//       {toasts.map(t => (
//         <div key={t.id}
//           className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl pointer-events-auto animate-slideUp
//             ${t.type === "error" ? "bg-red-600" : t.type === "warn" ? "bg-amber-500" : "bg-[#1a2e2a]"} text-white max-w-sm`}>
//           <Ic d={t.type === "error" ? P.x : t.type === "warn" ? P.shieldAlert : P.check} size={16} sw={2.5}
//             className={t.type === "error" ? "text-red-200" : t.type === "warn" ? "text-amber-100" : "text-emerald-400"} />
//           <p className="text-sm font-semibold flex-1">{t.msg}</p>
//           <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100 flex-shrink-0">
//             <Ic d={P.x} size={13} sw={2} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    DEPLOY MODAL
// ═══════════════════════════════════════════ */
// function DeployModal({ onConfirm, onCancel, loading }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fadeIn" onClick={!loading ? onCancel : undefined}>
//       <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-slideUp" onClick={e => e.stopPropagation()}>
//         <div className="w-12 h-12 rounded-2xl bg-[#f0ede8] flex items-center justify-center mb-4">
//           <Ic d={P.rocket} size={22} className="text-[#c96a4f]" />
//         </div>
//         <h3 className="font-extrabold text-[#1a2e2a] text-lg mb-2">Deploy Update?</h3>
//         <p className="text-gray-400 text-sm leading-relaxed mb-6">
//           This will push the latest build to all production pods (124 active). Estimated rollout time: 3-5 minutes.
//         </p>
//         <div className="flex gap-3">
//           <button onClick={onCancel} disabled={loading}
//             className="flex-1 border border-gray-200 text-[#1a2e2a] font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm disabled:opacity-50">
//             Cancel
//           </button>
//           <button onClick={onConfirm} disabled={loading}
//             className="flex-1 flex items-center justify-center gap-2 bg-[#1a2e2a] hover:bg-[#243d38] text-white font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-70">
//             {loading ? (
//               <>
//                 <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                 </svg>
//                 Deploying…
//               </>
//             ) : "Confirm Deploy"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    BAR CHART (Platform Growth)
// ═══════════════════════════════════════════ */
// function GrowthChart({ data, activeIndex, onBarClick }) {
//   const max = Math.max(...data.map(d => d.value));
//   return (
//     <div className="flex items-end gap-2 sm:gap-3 h-44 sm:h-52 w-full px-1">
//       {data.map((d, i) => {
//         const isActive = i === activeIndex;
//         const hPct = (d.value / max) * 100;
//         return (
//           <button key={d.label} onClick={() => onBarClick(i)}
//             className="flex flex-col items-center gap-2 flex-1 group h-full justify-end">
//             <div className="relative w-full h-full flex items-end justify-center">
//               <div
//                 className={`w-full rounded-t-lg transition-all duration-500 ${
//                   isActive ? "bg-[#1a2e2a]" : "bg-[#d8d4cc] group-hover:bg-[#a8a195]"
//                 }`}
//                 style={{ height: `${hPct}%` }}
//               />
//             </div>
//             <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#1a2e2a]" : "text-gray-400"}`}>
//               {d.label}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    PROVIDER GAUGE (donut)
// ═══════════════════════════════════════════ */
// function ProviderGauge({ active, total }) {
//   const pct = active / total;
//   const r = 46, cx = 56, cy = 56;
//   const circ = 2 * Math.PI * r;
//   const dash = pct * circ;
//   return (
//     <div className="relative flex items-center justify-center flex-shrink-0">
//       <svg width={112} height={112}>
//         <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d5dedb" strokeWidth="9" />
//         <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2e2a" strokeWidth="9"
//           strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
//           transform={`rotate(-90 ${cx} ${cy})`}
//           style={{ transition: "stroke-dasharray 1s ease" }}
//         />
//       </svg>
//       <div className="absolute text-center">
//         <p className="text-2xl font-extrabold text-[#1a2e2a] leading-none">{active}</p>
//         <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Active</p>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════ */
// export default function AdminConsole() {
//   const [activeNav,   setActiveNav]   = useState("overview");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchQ,      setSearchQ]      = useState("");
//   const [growthRange,  setGrowthRange]  = useState("30");
//   const [activeBar,    setActiveBar]    = useState(GROWTH_DATA["30"].length - 1);
//   const [notifOpen,    setNotifOpen]    = useState(false);
//   const [deployModal,  setDeployModal]  = useState(false);
//   const [deploying,    setDeploying]    = useState(false);
//   const [activityLog,  setActivityLog]  = useState(ACTIVITY_LOG);
//   const [pendingApps,  setPendingApps]  = useState(38);
//   const [registeredProv, setRegisteredProv] = useState(520);
//   const [activeProv,   setActiveProv]   = useState(482);

//   const toastId = useRef(0);
//   const [toasts, setToasts] = useState([]);
//   const addToast = (msg, type = "success") => {
//     const id = ++toastId.current;
//     setToasts(t => [...t, { id, msg, type }]);
//     setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
//   };
//   const dismissToast = (id) => setToasts(t => t.filter(x => x.id !== id));

//   const notifications = [
//     { id: 1, text: "CPU usage spiked to 82% on Edge-Node-04", time: "3 min ago", unread: true },
//     { id: 2, text: "New provider application: Dr. Maria Lopez", time: "20 min ago", unread: true },
//     { id: 3, text: "Weekly system report is ready", time: "2 hrs ago", unread: false },
//   ];
//   const unreadCount = notifications.filter(n => n.unread).length;

//   const handleDeploy = async () => {
//     setDeploying(true);
//     await new Promise(r => setTimeout(r, 1800));
//     setDeploying(false);
//     setDeployModal(false);
//     addToast("Update deployed successfully to 124 pods");
//     setActivityLog(prev => [{
//       id: Date.now(), icon: P.rocket, iconBg: "bg-[#f0ede8]", iconColor: "text-[#c96a4f]",
//       title: "Production Deploy Completed",
//       desc: "Build v2.14.0 rolled out across all active pods.",
//       actor: "Admin_User", time: "Just now", tag: "INFRASTRUCTURE", tagColor: "bg-gray-100 text-gray-500",
//     }, ...prev]);
//   };

//   const handleReviewApplications = () => {
//     addToast(`Opening ${pendingApps} pending provider applications…`);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQ.trim()) addToast(`Searching for "${searchQ}"…`);
//   };

//   const growthData = GROWTH_DATA[growthRange];
//   const totalUsers = 85291;
//   const activeNow  = 1204;
//   const churnRate  = "1.2%";

//   return (
//     <div className="min-h-screen bg-[#f5f3ef] font-sans flex">
//       <style>{`
//         @keyframes slideUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
//         @keyframes slideDown{ from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
//         @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
//         .animate-slideUp   { animation: slideUp   .2s  ease forwards; }
//         .animate-slideDown { animation: slideDown .18s ease forwards; }
//         .animate-fadeIn    { animation: fadeIn    .15s ease forwards; }
//         ::-webkit-scrollbar { width:4px; }
//         ::-webkit-scrollbar-track { background:transparent; }
//         ::-webkit-scrollbar-thumb { background:#d1c9c0; border-radius:4px; }
//       `}</style>

//       {/* ════════════════════════════════
//           MOBILE TOP BAR
//       ════════════════════════════════ */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#f5f3ef] border-b border-gray-200">
//         <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-xl hover:bg-white transition-colors">
//           <Ic d={P.hamburger} size={20} className="text-[#1a2e2a]" />
//         </button>
//         <span className="font-extrabold text-[#1a2e2a] text-sm">Dine With Me · Admin</span>
//         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border-2 border-white shadow" />
//       </div>

//       {/* Sidebar overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black/25 z-30 lg:hidden animate-fadeIn" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* ════════════════════════════════
//           SIDEBAR
//       ════════════════════════════════ */}
//       <aside className={`
//         fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-[#f5f3ef] border-r border-gray-200
//         flex flex-col pt-8 pb-6 px-5 transition-transform duration-300 flex-shrink-0
//         ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
//       `}>
//         {/* Mobile close */}
//         <button onClick={() => setSidebarOpen(false)}
//           className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white">
//           <Ic d={P.x} size={18} className="text-gray-400" />
//         </button>

//         {/* Logo */}
//         <div className="mb-1">
//           <h1 className="text-3xl font-extrabold text-[#1a2e2a] leading-[1.05] tracking-tight">Dine With<br/>Me</h1>
//         </div>
//         <p className="text-sm text-gray-400 font-medium mb-8">Admin Console</p>

//         {/* Nav */}
//         <nav className="flex-1 space-y-1">
//           {NAV_ITEMS.map(item => {
//             const active = activeNav === item.id;
//             return (
//               <button key={item.id}
//                 onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
//                 className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[.98] ${
//                   active ? "bg-white text-[#1a2e2a] shadow-sm" : "text-gray-500 hover:text-[#1a2e2a] hover:bg-white/60"
//                 }`}>
//                 {active && <span className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 w-1 h-6 rounded-full bg-[#1a2e2a]" />}
//                 <Ic d={item.icon} size={17} />
//                 {item.label}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Bottom */}
//         <div className="border-t border-gray-200 pt-4 space-y-1">
//           <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#1a2e2a] hover:bg-white/60 transition-all">
//             <Ic d={P.help} size={17} /> Help Center
//           </button>
//           <button onClick={() => addToast("You've been logged out", "warn")}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#c96a4f] hover:bg-red-50 transition-all active:scale-[.98]">
//             <Ic d={P.logout} size={17} /> Log Out
//           </button>
//         </div>
//       </aside>

//       {/* ════════════════════════════════
//           MAIN CONTENT
//       ════════════════════════════════ */}
//       <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 min-w-0">

//         {/* ── Top bar (desktop) ── */}
//         <div className="hidden lg:flex items-center justify-between gap-4 px-8 py-5 sticky top-0 bg-[#f5f3ef]/95 backdrop-blur-sm z-20 border-b border-transparent">
//           {/* Search */}
//           <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
//             <Ic d={P.search} size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)}
//               placeholder="Search system logs, users, or providers…"
//               className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a2e2a]/15 placeholder:text-gray-400 transition"
//             />
//           </form>

//           {/* Right icons + deploy */}
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <div className="relative">
//               <button onClick={() => setNotifOpen(v => !v)}
//                 className="relative p-2.5 rounded-full hover:bg-white transition-colors">
//                 <Ic d={P.bell} size={18} className="text-[#1a2e2a]" />
//                 {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
//               </button>
//               {notifOpen && (
//                 <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slideDown">
//                   <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//                     <p className="font-extrabold text-[#1a2e2a] text-sm">Notifications</p>
//                     <button onClick={() => setNotifOpen(false)} className="w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center">
//                       <Ic d={P.x} size={13} className="text-gray-400" sw={2} />
//                     </button>
//                   </div>
//                   <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
//                     {notifications.map(n => (
//                       <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${n.unread ? "bg-[#fdf8f6]" : ""}`}>
//                         <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? "bg-red-500" : "bg-transparent"}`} />
//                         <div className="flex-1">
//                           <p className={`text-xs leading-snug ${n.unread ? "font-semibold text-[#1a2e2a]" : "text-gray-400"}`}>{n.text}</p>
//                           <p className="text-[10px] text-gray-300 mt-0.5">{n.time}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <button onClick={() => addToast("Live system feed opened")} className="p-2.5 rounded-full hover:bg-white transition-colors">
//               <Ic d={P.rss} size={18} className="text-[#1a2e2a]" />
//             </button>
//             <button onClick={() => addToast("Security center opened")} className="p-2.5 rounded-full hover:bg-white transition-colors">
//               <Ic d={P.shieldCheck} size={18} className="text-[#1a2e2a]" />
//             </button>
//             <button onClick={() => setDeployModal(true)}
//               className="bg-[#1a2e2a] hover:bg-[#243d38] text-white text-sm font-bold px-5 py-2.5 rounded-2xl transition-colors shadow-md active:scale-[.98] whitespace-nowrap">
//               Deploy Update
//             </button>
//             <div className="flex items-center gap-2.5 pl-1">
//               <div className="text-right leading-tight hidden xl:block">
//                 <p className="text-sm font-bold text-[#1a2e2a]">Admin User</p>
//                 <p className="text-[11px] text-gray-400">System Architect</p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border-2 border-white shadow flex-shrink-0 cursor-pointer hover:scale-105 transition-transform" />
//             </div>
//           </div>
//         </div>

//         {/* ── Page content ── */}
//         <div className="px-4 sm:px-6 lg:px-8 pb-10 pt-4 lg:pt-2">

//           {/* Title */}
//           <div className="mb-6">
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e2a] tracking-tight">System Overview</h1>
//             <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
//               Real-time performance metrics and infrastructure health for the Dine With Me ecosystem.
//             </p>
//           </div>

//           {/* ── Top 3 cards ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

//             {/* Core API Performance */}
//             <div className="sm:col-span-1 bg-[#1a2e2a] rounded-2xl p-5 sm:p-6 text-white flex flex-col">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
//                   <Ic d={P.cloud} size={17} className="text-white" />
//                 </div>
//                 <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-full">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> OPERATIONAL
//                 </span>
//               </div>
//               <h2 className="font-extrabold text-lg mb-1.5">Core API Performance</h2>
//               <p className="text-[#a8bdb8] text-xs leading-relaxed mb-5 flex-1">
//                 All endpoints performing within sub-100ms latency targets across all regions.
//               </p>
//               <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
//                 {[["Avg. Latency","42ms"],["Uptime (30d)","99.98%"],["Active Pods","124"]].map(([k,v]) => (
//                   <div key={k}>
//                     <p className="text-[10px] text-[#a8bdb8] mb-1">{k}</p>
//                     <p className="font-extrabold text-base">{v}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CPU Usage */}
//             <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col">
//               <div className="flex items-center justify-between mb-5">
//                 <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
//                   <Ic d={P.cpu} size={16} className="text-gray-500" />
//                 </div>
//                 <span className="text-xs font-bold text-gray-400">CPU Usage</span>
//               </div>
//               <div className="flex items-end gap-1.5 h-16 mb-4 flex-1">
//                 {[35, 45, 50, 62, 80, 68, 55].map((v, i) => (
//                   <div key={i} className="flex-1 rounded-t-md transition-all duration-700"
//                     style={{ height: `${v}%`, backgroundColor: i === 4 ? "#1a2e2a" : "#e5e1d8" }} />
//                 ))}
//               </div>
//               <p className="text-3xl font-extrabold text-[#1a2e2a]">68%</p>
//               <p className="text-xs text-emerald-600 font-semibold mt-1">+12% vs last hr</p>
//             </div>

//             {/* Subscribers */}
//             <div className="bg-[#fbe3da] rounded-2xl p-5 sm:p-6 flex flex-col">
//               <div className="flex items-center justify-between mb-5">
//                 <div className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center">
//                   <Ic d={P.tag} size={16} className="text-[#c96a4f]" />
//                 </div>
//                 <span className="text-xs font-bold text-[#9c5a44]">Subscribers</span>
//               </div>
//               <div className="flex-1 flex flex-col justify-end">
//                 <p className="text-4xl font-extrabold text-[#5c2f20]">14.2k</p>
//                 <p className="text-xs text-[#9c5a44] font-semibold mt-2 flex items-center gap-1">
//                   <Ic d={P.trendUp} size={13} /> 8.4% growth this month
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ── Platform Growth + Nutrition Providers ── */}
//           <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 mb-5">

//             {/* Platform Growth */}
//             <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
//               <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
//                 <div>
//                   <h2 className="font-extrabold text-[#1a2e2a] text-lg">Platform Growth</h2>
//                   <p className="text-gray-400 text-sm mt-1">Active users and provider acquisition over the last 90 days.</p>
//                 </div>
//                 <div className="flex items-center gap-2 bg-[#f5f3ef] p-1 rounded-full">
//                   {["7","30"].map(range => (
//                     <button key={range} onClick={() => { setGrowthRange(range); setActiveBar(GROWTH_DATA[range].length - 1); }}
//                       className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
//                         growthRange === range ? "bg-white text-[#1a2e2a] shadow-sm" : "text-gray-400 hover:text-[#1a2e2a]"
//                       }`}>
//                       {range} Days
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <GrowthChart data={growthData} activeIndex={activeBar} onBarClick={setActiveBar} />

//               <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
//                 <div>
//                   <p className="text-xs text-gray-400 font-medium mb-1">Total Users</p>
//                   <p className="text-xl font-extrabold text-[#1a2e2a]">{totalUsers.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400 font-medium mb-1">Active Now</p>
//                   <p className="text-xl font-extrabold text-[#1a2e2a]">{activeNow.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400 font-medium mb-1">Churn Rate</p>
//                   <p className="text-xl font-extrabold text-[#1a2e2a]">{churnRate}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Nutrition Providers */}
//             <div className="bg-[#dfe6e3] rounded-2xl p-5 sm:p-6 flex flex-col">
//               <h2 className="font-extrabold text-[#1a2e2a] text-lg mb-1">Nutrition Providers</h2>
//               <p className="text-gray-500 text-sm mb-6">Verified health specialists on platform.</p>

//               <div className="flex items-center gap-5 mb-6">
//                 <ProviderGauge active={activeProv} total={registeredProv} />
//                 <div className="space-y-2.5">
//                   <div className="flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-[#1a2e2a]" />
//                     <span className="text-xs text-gray-500">Registered</span>
//                     <span className="text-sm font-extrabold text-[#1a2e2a]">{registeredProv}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-[#9fb0ab]" />
//                     <span className="text-xs text-gray-500">Pending</span>
//                     <span className="text-sm font-extrabold text-[#1a2e2a]">{pendingApps}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 mt-auto">
//                 <button onClick={handleReviewApplications}
//                   className="flex-1 bg-white text-[#1a2e2a] font-bold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm active:scale-[.98]">
//                   Review New Applications
//                 </button>
//                 <button onClick={() => addToast("Opening new provider form…")}
//                   className="w-12 h-12 flex-shrink-0 bg-[#7a3326] hover:bg-[#642a1f] text-white rounded-xl flex items-center justify-center transition-colors shadow-md active:scale-95">
//                   <Ic d={P.plus} size={18} sw={2.5} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ── System-Wide Activity Log ── */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//             <div className="flex items-center justify-between gap-4 px-5 sm:px-6 pt-5 sm:pt-6 pb-4">
//               <div>
//                 <h2 className="font-extrabold text-[#1a2e2a] text-lg">System-Wide Activity Log</h2>
//                 <p className="text-gray-400 text-sm mt-1">Live feed of administrative changes and system events.</p>
//               </div>
//               <button onClick={() => addToast("Opening full activity history…")}
//                 className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#1a2e2a] hover:text-[#c96a4f] transition-colors flex-shrink-0">
//                 View Full History <Ic d={P.arrowRight} size={14} />
//               </button>
//             </div>

//             <div className="divide-y divide-gray-100">
//               {activityLog.map(log => (
//                 <div key={log.id} className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
//                   <div className={`w-10 h-10 rounded-xl ${log.iconBg} flex items-center justify-center flex-shrink-0`}>
//                     <Ic d={log.icon} size={16} className={log.iconColor} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex flex-wrap items-start justify-between gap-2">
//                       <p className="font-bold text-[#1a2e2a] text-sm">{log.title}</p>
//                       <span className="text-xs text-gray-400 flex-shrink-0">{log.time}</span>
//                     </div>
//                     <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{log.desc}</p>
//                     <div className="flex items-center gap-2 mt-2 flex-wrap">
//                       <span className="text-[11px] text-gray-400 flex items-center gap-1">
//                         <Ic d={P.users} size={11} /> {log.actor}
//                       </span>
//                       <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${log.tagColor}`}>
//                         {log.tag}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Mobile view-all */}
//             <div className="sm:hidden px-5 py-4 border-t border-gray-100">
//               <button onClick={() => addToast("Opening full activity history…")}
//                 className="w-full flex items-center justify-center gap-1.5 text-sm font-bold text-[#1a2e2a] hover:text-[#c96a4f] transition-colors">
//                 View Full History <Ic d={P.arrowRight} size={14} />
//               </button>
//             </div>
//           </div>

//         </div>
//       </main>

//       {/* ════════════════════════════════
//           MODALS & TOASTS
//       ════════════════════════════════ */}
//       {deployModal && (
//         <DeployModal
//           loading={deploying}
//           onConfirm={handleDeploy}
//           onCancel={() => !deploying && setDeployModal(false)}
//         />
//       )}
//       <Toast toasts={toasts} dismiss={dismissToast} />
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ═══════════════════════════════════════════
   ICON PRIMITIVE
═══════════════════════════════════════════ */
const Ic = ({ d, size = 18, className = "", sw = 1.8, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

/* ═══════════════════════════════════════════
   ICON PATHS
═══════════════════════════════════════════ */
const P = {
  grid:       ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  users:      ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
  trending:   ["m23 6-9.5 9.5-5-5L1 18","M17 6h6v6"],
  database:   ["M12 22c5.523 0 10-2.239 10-5V7c0-2.761-4.477-5-10-5S2 4.239 2 7v10c0 2.761 4.477 5 10 5z","M2 7c0 2.761 4.477 5 10 5s10-2.239 10-5","M2 12c0 2.761 4.477 5 10 5s10-2.239 10-5"],
  shield:     ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  terminal:   ["m4 17 6-6-6-6","M12 19h8"],
  bell:       ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z","M13.73 21a2 2 0 0 1-3.46 0"],
  power:      ["M18.36 6.64a9 9 0 1 1-12.73 0","M12 2v10"],
  search:     ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","m21 21-4.35-4.35"],
  plus:       ["M12 5v14","M5 12h14"],
  arrowRight: ["M5 12h14","m12 5 7 7-7 7"],
  refresh:    ["M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"],
  alert:      ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  check:      ["M20 6 9 17l-5-5"],
  x:          ["M18 6 6 18","M6 6l12 12"]
};

/* ═══════════════════════════════════════════
   MOCK SEED DATA
═══════════════════════════════════════════ */
const INITIAL_METRICS = [
  { id: "users",    label: "Active Clinicians", value: "142",    delta: "+12% this cycle", icon: P.users,    c: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { id: "volume",   label: "Total Registrants", value: "3,841",  delta: "+406 new today",  icon: P.database, c: "text-blue-600 bg-blue-50 border-blue-100" },
  { id: "efficacy", label: "Server Efficiency", value: "99.94%", delta: "Optimal Latency",  icon: P.trending, c: "text-purple-600 bg-purple-50 border-purple-100" },
  { id: "security", label: "Threat Mitigations",value: "0",      delta: "All Systems Safe",icon: P.shield,   c: "text-amber-600 bg-amber-50 border-amber-100" }
];

const INITIAL_LOGS = [
  { id: 1, action: "API Secret Key Rotation", desc: "Automated standard cryptographic renewal succeeded.", actor: "SYSTEM_DAEMON", tag: "SECURITY", tagColor: "bg-purple-100 text-purple-700", time: "Just Now" },
  { id: 2, action: "Clinician Access Verification", desc: "Dr. Evelyn Reed approved for advanced platform access tier.", actor: "Admin_Alpha", tag: "ACCESS", tagColor: "bg-blue-100 text-blue-700", time: "4m ago" },
  { id: 3, action: "Database Index Rebuild", desc: "Optimized response timelines across active transactional nodes.", actor: "DB_OPTIMIZER", tag: "DATABASE", tagColor: "bg-amber-100 text-amber-700", time: "18m ago" },
  { id: 4, action: "Security Baseline Override Rejected", desc: "Unauthorized attempts to bypass API throttle protocols blocked.", actor: "FIREWALL_WAN", tag: "CRITICAL", tagColor: "bg-red-100 text-red-700", time: "1h ago" }
];

const BACKEND_SERVICES = [
  { id: "auth", name: "Authentication Core Gateway", endpoint: "/api/v1/auth", status: "ONLINE", version: "v1.4.2-prod" },
  { id: "meals", name: "Clinical Meal Plan Pipeline", endpoint: "/api/v1/meals", status: "ONLINE", version: "v2.1.0-beta" },
  { id: "users", name: "User Encrypted Object Vector", endpoint: "/api/v1/users", status: "ONLINE", version: "v1.1.9-prod" }
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [services, setServices] = useState(BACKEND_SERVICES);
  const [toasts, setToasts] = useState([]);
  const [deployModal, setDeployModal] = useState(false);
  const [deploying, setDeploying] = useState(false);

  // Notifications handler helper
  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleRefreshSystem = () => {
    addToast("Re-indexing transactional data streams...", "info");
    setMetrics(prev => prev.map(m => m.id === "efficacy" ? { ...m, value: (99.9 + Math.random() * 0.09).toFixed(2) + "%" } : m));
  };

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployModal(false);
      addToast("Production pipeline deployment completed (Build #492-AX)");
      setLogs(prev => [
        {
          id: Date.now(),
          action: "Production Re-deployment Complete",
          desc: "Flushed edge caches and distributed active cluster nodes.",
          actor: "Admin_Alpha",
          tag: "DEPLOY",
          tagColor: "bg-emerald-100 text-emerald-700",
          time: "Just Now"
        },
        ...prev
      ]);
    }, 2500);
  };

  // Menu Definition
  const sidebarMenu = [
    { label: "Overview Hub", icon: P.grid, path: "/admin", active: location.pathname === "/admin" },
    { label: "Meal Management", icon: P.plus, path: "/adminmealmgr", active: location.pathname === "/adminmealmgr" },
    { label: "Platform Settings", icon: P.terminal, path: "#", active: false }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 font-sans selection:bg-[#1a2e2a] selection:text-white">
      
      {/* ════════════════════════════════
          SIDEBAR NAVIGATION
      ════════════════════════════════ */}
      <aside className="w-64 bg-[#111f1c] text-gray-300 flex flex-col fixed inset-y-0 left-0 z-20 border-r border-gray-900 shadow-xl hidden md:flex">
        {/* Brand Banner */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-900 bg-[#0c1614]">
          <div className="w-9 h-9 bg-[#c96a4f] rounded-xl flex items-center justify-center font-black text-white tracking-tighter text-sm shadow-md">
            DW
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-tight leading-tight">System Terminal</p>
            <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Dine With Mee</p>
          </div>
        </div>

        {/* Dynamic Nav items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {sidebarMenu.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item.path.startsWith("/")) {
                  navigate(item.path);
                } else {
                  addToast(`Accessing localized component layer: ${item.label}`, "info");
                }
              }}
              className={`w-full flex items-center gap-3 px-4 h-11 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 group ${
                item.active 
                  ? "bg-[#c96a4f] text-white shadow-md shadow-[#c96a4f]/10" 
                  : "hover:bg-[#182b27] text-gray-400 hover:text-white"
              }`}
            >
              <Ic d={item.icon} size={16} className={item.active ? "text-white" : "text-gray-500 group-hover:text-gray-300"} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Session context anchor */}
        <div className="p-4 border-t border-gray-950 bg-[#0c1614] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-black text-white">
              A
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white">Admin_Alpha</p>
              <p className="text-[10px] text-gray-500 font-medium">Root Infrastructure</p>
            </div>
          </div>
          <button onClick={() => navigate("/")} 
            className="w-8 h-8 rounded-lg hover:bg-red-950/40 border border-transparent hover:border-red-900/50 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors">
            <Ic d={P.power} size={15} sw={2} />
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════
          MAIN CONTENT VIEWPORT
      ════════════════════════════════ */}
      <main className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Top Header Grid */}
        <header className="h-20 bg-white border-b border-gray-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-white/95">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-black text-gray-900 tracking-tight hidden sm:block">Core Architectural Registry</h1>
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <Ic d={P.search} size={14} />
              </span>
              <input type="text" placeholder="Global structural search..." 
                className="w-full h-10 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#c96a4f] focus:bg-white transition-all placeholder-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleRefreshSystem}
              className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 bg-white hover:bg-gray-50 transition-colors active:scale-95" title="Force Refresh Stream">
              <Ic d={P.refresh} size={15} />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />
            <button onClick={() => setDeployModal(true)}
              className="h-10 bg-[#1a2e2a] hover:bg-[#12211e] text-white font-bold text-xs tracking-wide px-4 rounded-xl flex items-center gap-2 transition-all active:scale-[.98] shadow-sm">
              <Ic d={P.plus} size={13} sw={2.5} /> Deploy Infrastructure
            </button>
          </div>
        </header>

        {/* Sub-viewport Area */}
        <div className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          
          {/* 4-Column Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-sm/5 flex items-center justify-between group hover:border-gray-300 transition-all">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 tracking-wide">{m.label}</p>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none pt-1">{m.value}</h3>
                  <p className="text-[10px] font-bold text-gray-400 pt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full inline-block" /> {m.delta}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${m.c}`}>
                  <Ic d={m.icon} size={20} />
                </div>
              </div>
            ))}
          </div>

          {/* Core Content Layout Double-Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left side: Microservice Status Tracker */}
            <div className="bg-white border border-gray-200/70 rounded-2xl shadow-sm/5 lg:col-span-1 flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Node Cluster Diagnostics</h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 3 / 3 Healthy
                </span>
              </div>
              
              <div className="p-5 space-y-4 flex-1">
                {services.map(srv => (
                  <div key={srv.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/30 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-gray-900 tracking-tight">{srv.name}</p>
                      <span className="text-[10px] font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {srv.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400 font-medium">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono text-[10px]">{srv.endpoint}</code>
                      <span>{srv.version}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Audit Trail Activity Logs */}
            <div className="bg-white border border-gray-200/70 rounded-2xl shadow-sm/5 lg:col-span-2 flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">System Transaction Logs</h3>
                <span className="text-[11px] font-bold text-[#c96a4f] cursor-pointer hover:underline" onClick={() => setLogs(INITIAL_LOGS)}>
                  Clear Filters
                </span>
              </div>
              
              <div className="divide-y divide-gray-100 overflow-y-auto max-h-[420px] flex-1">
                {logs.map((log) => (
                  <div key={log.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                    <div className="space-y-1 max-w-xl">
                      <h4 className="text-xs font-black text-gray-900 tracking-tight">{log.action}</h4>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed">{log.desc}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Ic d={P.users} size={11} /> {log.actor}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${log.tagColor}`}>
                          {log.tag}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap pt-0.5">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ════════════════════════════════
          MODALS & TOASTS
      ════════════════════════════════ */}
      {deployModal && (
        <DeployModal
          loading={deploying}
          onConfirm={handleDeploy}
          onCancel={() => !deploying && setDeployModal(false)}
        />
      )}

      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none max-w-xs w-full">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto p-4 bg-gray-900 border border-gray-800 rounded-xl shadow-xl text-white text-xs font-bold flex items-center gap-3 animate-slideIn">
            <span className={t.type === "info" ? "text-blue-400" : "text-emerald-400"} >●</span>
            <p className="flex-1 leading-normal">{t.msg}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

function DeployModal({ loading, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 border border-amber-100 mx-auto">
          <Ic d={P.alert} size={22} />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-base font-black text-gray-900 tracking-tight">Production Baseline Re-deployment</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            This action flushes live infrastructure state caches and triggers structural node component hydration on Render servers.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 h-11 border border-gray-200 rounded-xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40">
            Abort Action
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 h-11 bg-[#c96a4f] hover:bg-[#b85a40] text-white font-bold text-xs tracking-wide rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Hydrating Nodes...
              </>
            ) : (
              "Confirm & Re-deploy"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}