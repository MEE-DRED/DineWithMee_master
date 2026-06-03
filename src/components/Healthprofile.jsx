

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// // ─── Icons ───────────────────────────────────────────────────────────────────
// const Icon = ({ d, size = 20, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d={d} />
//   </svg>
// );

// const icons = {
//   dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
//   meal: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
//   health: "M22 12h-4l-3 9L9 3l-3 9H2",
//   consult: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
//   orders: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
//   settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
//   bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
//   search: "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
//   plus: "M12 5v14M5 12h14",
//   run: "M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0 M5.5 14.5l2-4 3.5 2 2-4.5 M17 8l-2 4-3-1.5-2.5 5.5M7 19l2-4.5",
//   check: "M20 6L9 17l-5-5",
//   file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
//   pill: "M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7.5 M12 6v12 M8 12h8",
//   supplement: "M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z M12 6v6l4 2",
//   external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
//   store: "M3 3h18 M3 3l2 14h14l2-14 M9 17v4 M15 17v4 M9 21h6",
// };

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const weightData = [
//   { month: "AUG", value: 68 },
//   { month: "SEP", value: 72 },
//   { month: "OCT", value: 69 },
//   { month: "NOV", value: 70 },
//   { month: "DEC", value: 66 },
//   { month: "JAN", value: 76 },
// ];

// const glucoseData = [4, 7, 5, 9, 6, 4, 7, 5, 8];

// const navItems = [
//   { label: "Dashboard",     icon: icons.dashboard, path: "/dashboard"     },
//   { label: "Meal Plans",    icon: icons.meal,      path: "/meals"         },
//   { label: "Health Stats",  icon: icons.health,    path: "/healthprofile" },
//   { label: "Consultations", icon: icons.consult,   path: "/consultations" },
//   { label: "Orders",        icon: icons.orders,    path: "/orders"        },
//   { label: "Settings",      icon: icons.settings,  path: "/security"      },
// ];

// const goals = [
//   { label: "Achieve resting HR below 65bpm", done: true },
//   { label: "Maintain < 5.7% HbA1c", done: false },
//   { label: "Daily hydration target (3L)", done: false },
// ];

// const documents = [
//   { title: "Bi-Annual Blood Panel Results", author: "Dr. Helena Vance • Jan 12, 2024", status: "Approved", icon: icons.file },
//   { title: "Nutritional Assessment Report", author: "Chef-Nutritionist Marcus • Dec 28, 2023", status: "Approved", icon: icons.file },
//   { title: "Cardiology Clearance", author: "Pending Sync from Clinic", status: "Pending", icon: icons.file },
// ];

// const medications = [
//   { name: "Metformin ER", dose: "500mg • Once Daily with Meal", note: "Refill due in 4 days", noteColor: "text-red-400", tag: "PHARMACY SYNC", icon: icons.pill },
//   { name: "Vitamin D3 + K2", dose: "5000 IU • Twice Weekly", note: "Stocked", noteColor: "text-[#3a7d5a]", tag: "SUPPLEMENT", icon: icons.supplement },
// ];

// const supplements = [
//   { name: "Omega-3 Fish Oil", dose: "1000mg • Morning", note: "Auto-ship enabled", noteColor: "text-gray-400", tag: "SUPPLEMENT", icon: icons.supplement },
// ];

// // ─── Sub-components ──────────────────────────────────────────────────────────
// function WeightChart() {
//   const max = Math.max(...weightData.map((d) => d.value));
//   return (
//     <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-40 w-full">
//       {weightData.map((d, i) => {
//         const isLast = i === weightData.length - 1;
//         const heightPct = (d.value / max) * 100;
//         return (
//           <div key={d.month} className="flex flex-col items-center gap-1 flex-1">
//             <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${heightPct}%`, backgroundColor: isLast ? "#1a2e2a" : "#d6d3cb" }} />
//             <span className={`text-[10px] sm:text-xs font-semibold tracking-wide ${isLast ? "text-[#1a2e2a]" : "text-gray-400"}`}>{d.month}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function GlucoseChart() {
//   const max = Math.max(...glucoseData);
//   return (
//     <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-24 w-full">
//       {glucoseData.map((v, i) => {
//         const isHighlight = i === 4;
//         const h = (v / max) * 100;
//         return (
//           <div key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, backgroundColor: isHighlight ? "#e07b6a" : "#f2c4bc", opacity: isHighlight ? 1 : 0.75 }} />
//         );
//       })}
//     </div>
//   );
// }

// function CircleProgress({ pct, size = 64 }) {
//   const r = (size - 8) / 2;
//   const circ = 2 * Math.PI * r;
//   const dash = (pct / 100) * circ;
//   return (
//     <svg width={size} height={size} className="-rotate-90">
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a2e2a" strokeWidth="5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
//       <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="rotate-90" fill="#1a2e2a" fontSize="13" fontWeight="700" transform={`rotate(90, ${size / 2}, ${size / 2})`}>{pct}%</text>
//     </svg>
//   );
// }

// function MedCard({ item }) {
//   const tagColor = item.tag === "PHARMACY SYNC" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700";
//   return (
//     <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-2">
//       <div className="flex items-center justify-between">
//         <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${tagColor}`}>{item.tag}</span>
//         <Icon d={item.icon} size={16} className="text-gray-300" />
//       </div>
//       <p className="font-bold text-[#1a2e2a] text-sm leading-tight">{item.name}</p>
//       <p className="text-gray-400 text-xs">{item.dose}</p>
//       <div className="flex items-center gap-1.5">
//         <span className={`w-2 h-2 rounded-full inline-block ${item.noteColor === "text-red-400" ? "bg-red-400" : item.noteColor === "text-[#3a7d5a]" ? "bg-emerald-500" : "bg-gray-300"}`} />
//         <span className={`text-xs ${item.noteColor}`}>{item.note}</span>
//       </div>
//     </div>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────
// export default function HealthProfile() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div className="min-h-screen bg-[#f5f3ef] font-sans flex flex-col">
//       {/* ── Mobile top bar ── */}
//       <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40">
//         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//           <div className="w-5 flex flex-col gap-1">
//             <span className={`h-0.5 bg-[#1a2e2a] rounded transition-all ${sidebarOpen ? "rotate-45 translate-y-1.5" : ""}`} />
//             <span className={`h-0.5 bg-[#1a2e2a] rounded transition-all ${sidebarOpen ? "opacity-0" : ""}`} />
//             <span className={`h-0.5 bg-[#1a2e2a] rounded transition-all ${sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
//           </div>
//         </button>
//         <div className="flex items-center gap-1.5">
//           <div className="w-7 h-7 rounded-full bg-[#c96a4f] flex items-center justify-center">
//             <span className="text-white text-xs font-bold">D</span>
//           </div>
//           <span className="font-bold text-[#1a2e2a] text-sm">Dine with Mee</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Icon d={icons.bell} size={18} className="text-[#1a2e2a]" />
//           <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
//             <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400" />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* ── Sidebar ── */}
//         <aside className={`
//           fixed lg:relative z-30 inset-y-0 left-0 w-56 bg-white flex flex-col pt-6 pb-4 transition-transform duration-300 shadow-xl lg:shadow-none
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//         `}>
//           {/* Logo */}
//           <div className="hidden lg:flex items-center gap-2 px-5 mb-8">
//             <div className="w-9 h-9 rounded-xl bg-[#c96a4f] flex items-center justify-center shadow-md">
//               <span className="text-white font-extrabold text-sm">D</span>
//             </div>
//             <div className="leading-tight">
//               <p className="font-extrabold text-[#1a2e2a] text-sm">Dine with Mee</p>
//               <p className="text-[10px] text-gray-400">Eating Things Strong</p>
//             </div>
//           </div>

//           {/* Nav */}
//           <nav className="flex-1 px-3 space-y-0.5">
//             {navItems.map((item) => {
//               const active = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.label}
//                   to={item.path}
//                   onClick={() => setSidebarOpen(false)}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                     active
//                       ? "bg-[#f0ede8] text-[#1a2e2a] font-semibold"
//                       : "text-gray-400 hover:text-[#1a2e2a] hover:bg-gray-50"
//                   }`}
//                 >
//                   <Icon d={item.icon} size={17} />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* New Meal Plan CTA */}
//           <div className="px-3 mt-4">
//             <button className="w-full bg-[#c96a4f] hover:bg-[#b85a40] text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
//               <Icon d={icons.plus} size={16} />
//               New Meal Plan
//             </button>
//           </div>
//         </aside>

//         {/* Overlay for mobile sidebar */}
//         {sidebarOpen && (
//           <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
//         )}

//         {/* ── Main content ── */}
//         <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
//           {/* Top bar (desktop) */}
//           <div className="hidden lg:flex items-center justify-between mb-8">
//             <div className="flex-1 max-w-sm">
//               <div className="relative">
//                 <Icon d={icons.search} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input type="text" placeholder="Search health records…" className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 transition placeholder:text-gray-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-3 ml-4">
//               <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition">
//                 <Icon d={icons.bell} size={17} className="text-[#1a2e2a]" />
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c96a4f] rounded-full" />
//               </button>
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-white shadow" />
//             </div>
//           </div>

//           {/* Header */}
//           <div className="mb-6">
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e2a] tracking-tight">Personal Health Profile</h1>
//             <p className="text-gray-400 text-sm mt-1 leading-relaxed">A longitudinal overview of your wellness metrics, clinical records,<br className="hidden sm:block" /> and pharmacological regimen synced in real-time.</p>
//           </div>

//           {/* Search bar mobile */}
//           <div className="lg:hidden mb-4">
//             <div className="relative">
//               <Icon d={icons.search} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input type="text" placeholder="Search health records…" className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 transition placeholder:text-gray-400" />
//             </div>
//           </div>

//           {/* ── Row 1: Weight + Goals ── */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//             {/* Body Weight */}
//             <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between mb-1">
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Metric</p>
//                   <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a2e2a]">Body Weight</h2>
//                 </div>
//                 <span className="flex items-center gap-1.5 bg-[#f0ede8] text-[#1a2e2a] text-xs font-semibold px-3 py-1.5 rounded-full">
//                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 4l4 4 6-6" stroke="#c96a4f" strokeWidth="1.5" strokeLinecap="round" /></svg>
//                   -2.4 kg (30d)
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <WeightChart />
//               </div>
//             </div>

//             {/* Quarterly Goals */}
//             <div className="bg-[#c96a4f] rounded-2xl p-5 sm:p-6 text-white flex flex-col justify-between">
//               <div>
//                 <h2 className="text-lg sm:text-xl font-extrabold mb-4">Quarterly Goals</h2>
//                 <ul className="space-y-3">
//                   {goals.map((g) => (
//                     <li key={g.label} className="flex items-start gap-3">
//                       <span className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${g.done ? "bg-white border-white" : "border-white/60"}`}>
//                         {g.done && <Icon d={icons.check} size={11} className="text-[#c96a4f]" />}
//                       </span>
//                       <span className={`text-sm leading-snug ${g.done ? "line-through opacity-70" : "opacity-90"}`}>{g.label}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <button className="mt-6 w-full bg-white text-[#c96a4f] font-bold text-sm py-2.5 rounded-xl hover:bg-orange-50 transition-colors">
//                 Update Goals
//               </button>
//             </div>
//           </div>

//           {/* ── Row 2: Blood Glucose + Daily Activity ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//             {/* Blood Glucose */}
//             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-lg font-extrabold text-[#1a2e2a]">Blood Glucose</h2>
//                 <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">In Range (92%)</span>
//               </div>
//               <GlucoseChart />
//               <p className="text-gray-400 text-xs mt-3 font-medium">Average: <span className="text-[#1a2e2a] font-bold">94 mg/dL</span></p>
//             </div>

//             {/* Daily Activity */}
//             <div className="bg-[#e8f0ef] rounded-2xl p-5 shadow-sm border border-[#d4e4e2]">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-extrabold text-[#1a2e2a]">Daily Activity</h2>
//                 <Icon d={icons.run} size={20} className="text-[#1a2e2a]" />
//               </div>
//               <div className="flex items-center gap-5">
//                 <CircleProgress pct={75} size={72} />
//                 <div>
//                   <p className="text-3xl sm:text-4xl font-extrabold text-[#1a2e2a] leading-none">8,421</p>
//                   <p className="text-gray-500 text-xs sm:text-sm mt-1">Steps today / 12,000 goal</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Row 3: Clinical Docs + Active Regimen ── */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             {/* Clinical Documents */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-lg font-extrabold text-[#1a2e2a]">Clinical Documents</h2>
//                 <button className="flex items-center gap-1 text-xs font-semibold text-[#c96a4f] hover:underline">
//                   View Archive <Icon d={icons.external} size={12} />
//                 </button>
//               </div>
//               <div className="space-y-2.5">
//                 {documents.map((doc) => (
//                   <div key={doc.title} className={`bg-white rounded-2xl px-4 py-3.5 flex items-center gap-4 shadow-sm border border-gray-100 ${doc.status === "Pending" ? "opacity-70" : ""}`}>
//                     <div className="w-10 h-10 rounded-xl bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
//                       <Icon d={doc.icon} size={16} className="text-[#c96a4f]" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-[#1a2e2a] text-sm truncate">{doc.title}</p>
//                       <p className="text-gray-400 text-xs mt-0.5">{doc.author}</p>
//                     </div>
//                     <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
//                       doc.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
//                     }`}>{doc.status}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Active Regimen */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-lg font-extrabold text-[#1a2e2a]">Active Regimen</h2>
//                 <button className="flex items-center gap-1 text-xs font-semibold text-[#c96a4f] hover:underline">
//                   Manage Pharmacy <Icon d={icons.store} size={12} />
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-2.5">
//                 {[...medications, ...supplements].map((item) => (
//                   <MedCard key={item.name} item={item} />
//                 ))}
//                 {/* Add Manual Entry */}
//                 <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#c96a4f] hover:bg-[#fff8f6] transition-colors min-h-[100px]">
//                   <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
//                     <Icon d={icons.plus} size={14} className="text-gray-400" />
//                   </div>
//                   <p className="text-xs font-semibold text-gray-400">Add Manual Entry</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  meal: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  health: "M22 12h-4l-3 9L9 3l-3 9H2",
  consult: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  orders: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  search: "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
  plus: "M12 5v14M5 12h14",
  run: "M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0 M5.5 14.5l2-4 3.5 2 2-4.5 M17 8l-2 4-3-1.5-2.5 5.5M7 19l2-4.5",
  check: "M20 6L9 17l-5-5",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  pill: "M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7.5 M12 6v12 M8 12h8",
  supplement: "M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z M12 6v6l4 2",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
  store: "M3 3h18 M3 3l2 14h14l2-14 M9 17v4 M15 17v4 M9 21h6",
};

const BACKEND_URL = "https://new-dine-with-mee-backend.onrender.com";

// ─── Sub-components ──────────────────────────────────────────────────────────
function WeightChart({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-40 w-full">
      {data.map((d, i) => {
        const isLast = i === data.length - 1;
        const heightPct = (d.value / max) * 100;
        return (
          <div key={d.month} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${heightPct}%`, backgroundColor: isLast ? "#1a2e2a" : "#d6d3cb" }} />
            <span className={`text-[10px] sm:text-xs font-semibold tracking-wide ${isLast ? "text-[#1a2e2a]" : "text-gray-400"}`}>{d.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function GlucoseChart({ data = [] }) {
  if (data.length === 0) return null;
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-24 w-full">
      {data.map((v, i) => {
        const isHighlight = i === 4;
        const h = (v / max) * 100;
        return (
          <div key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, backgroundColor: isHighlight ? "#e07b6a" : "#f2c4bc", opacity: isHighlight ? 1 : 0.75 }} />
        );
      })}
    </div>
  );
}

function CircleProgress({ pct, size = 64 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a2e2a" strokeWidth="5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="rotate-90" fill="#1a2e2a" fontSize="13" fontWeight="700" transform={`rotate(90, ${size / 2}, ${size / 2})`}>{pct}%</text>
    </svg>
  );
}

function MedCard({ item }) {
  const tagColor = item.tag === "PHARMACY SYNC" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700";
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${tagColor}`}>{item.tag}</span>
        <Icon d={icons[item.iconType] || icons.pill} size={16} className="text-gray-300" />
      </div>
      <p className="font-bold text-[#1a2e2a] text-sm leading-tight">{item.name}</p>
      <p className="text-gray-400 text-xs">{item.dose}</p>
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full inline-block ${item.noteColor === "text-red-400" ? "bg-red-400" : item.noteColor === "text-[#3a7d5a]" ? "bg-emerald-500" : "bg-gray-300"}`} />
        <span className={`text-xs ${item.noteColor}`}>{item.note}</span>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HealthProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Unified health state loaded asynchronously from backend
  const [healthMetrics, setHealthMetrics] = useState({
    weightData: [],
    glucoseData: [],
    goals: [],
    documents: [],
    regimen: []
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/health/profile`)
      .then(res => res.json())
      .then(data => setHealthMetrics(data))
      .catch(err => console.error("Could not verify health profile metrics:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans flex flex-col">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-5 flex flex-col gap-1">
            <span className={`h-0.5 bg-[#1a2e2a] rounded transition-all ${sidebarOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`h-0.5 bg-[#1a2e2a] rounded transition-all ${sidebarOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-[#1a2e2a] rounded transition-all ${sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-[#c96a4f] flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="font-bold text-[#1a2e2a] text-sm">Dine with Mee</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon d={icons.bell} size={18} className="text-[#1a2e2a]" />
          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`
          fixed lg:relative z-30 inset-y-0 left-0 w-56 bg-white flex flex-col pt-6 pb-4 transition-transform duration-300 shadow-xl lg:shadow-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="hidden lg:flex items-center gap-2 px-5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#c96a4f] flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-sm">D</span>
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-[#1a2e2a] text-sm">Dine with Mee</p>
              <p className="text-[10px] text-gray-400">Eating Things Strong</p>
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-0.5">
            {[
              { label: "Dashboard",     icon: icons.dashboard, path: "/dashboard"     },
              { label: "Meal Plans",    icon: icons.meal,      path: "/meals"         },
              { label: "Health Stats",  icon: icons.health,    path: "/healthprofile" },
              { label: "Consultations", icon: icons.consult,   path: "/consultations" },
              { label: "Orders",        icon: icons.orders,    path: "/orders"        },
              { label: "Settings",      icon: icons.settings,  path: "/security"      },
            ].map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#f0ede8] text-[#1a2e2a] font-semibold"
                      : "text-gray-400 hover:text-[#1a2e2a] hover:bg-gray-50"
                  }`}
                >
                  <Icon d={item.icon} size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 mt-4">
            <button className="w-full bg-[#c96a4f] hover:bg-[#b85a40] text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
              <Icon d={icons.plus} size={16} />
              New Meal Plan
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Icon d={icons.search} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search health records…" className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 transition placeholder:text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition">
                <Icon d={icons.bell} size={17} className="text-[#1a2e2a]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c96a4f] rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-white shadow" />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e2a] tracking-tight">Personal Health Profile</h1>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed">A longitudinal overview of your wellness metrics, clinical records,<br className="hidden sm:block" /> and pharmacological regimen synced in real-time.</p>
          </div>

          <div className="lg:hidden mb-4">
            <div className="relative">
              <Icon d={icons.search} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search health records…" className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 transition placeholder:text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Metric</p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a2e2a]">Body Weight</h2>
                </div>
                <span className="flex items-center gap-1.5 bg-[#f0ede8] text-[#1a2e2a] text-xs font-semibold px-3 py-1.5 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 4l4 4 6-6" stroke="#c96a4f" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  -2.4 kg (30d)
                </span>
              </div>
              <div className="mt-4">
                <WeightChart data={healthMetrics.weightData} />
              </div>
            </div>

            <div className="bg-[#c96a4f] rounded-2xl p-5 sm:p-6 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold mb-4">Quarterly Goals</h2>
                <ul className="space-y-3">
                  {healthMetrics.goals.map((g, i) => (
                    <li key={g.label || i} className="flex items-start gap-3">
                      <span className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${g.done ? "bg-white border-white" : "border-white/60"}`}>
                        {g.done && <Icon d={icons.check} size={11} className="text-[#c96a4f]" />}
                      </span>
                      <span className={`text-sm leading-snug ${g.done ? "line-through opacity-70" : "opacity-90"}`}>{g.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-6 w-full bg-white text-[#c96a4f] font-bold text-sm py-2.5 rounded-xl hover:bg-orange-50 transition-colors">
                Update Goals
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-extrabold text-[#1a2e2a]">Blood Glucose</h2>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">In Range (92%)</span>
              </div>
              <GlucoseChart data={healthMetrics.glucoseData} />
              <p className="text-gray-400 text-xs mt-3 font-medium">Average: <span className="text-[#1a2e2a] font-bold">94 mg/dL</span></p>
            </div>

            <div className="bg-[#e8f0ef] rounded-2xl p-5 shadow-sm border border-[#d4e4e2]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-[#1a2e2a]">Daily Activity</h2>
                <Icon d={icons.run} size={20} className="text-[#1a2e2a]" />
              </div>
              <div className="flex items-center gap-5">
                <CircleProgress pct={75} size={72} />
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#1a2e2a] leading-none">8,421</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Steps today / 12,000 goal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-extrabold text-[#1a2e2a]">Clinical Documents</h2>
                <button className="flex items-center gap-1 text-xs font-semibold text-[#c96a4f] hover:underline">
                  View Archive <Icon d={icons.external} size={12} />
                </button>
              </div>
              <div className="space-y-2.5">
                {healthMetrics.documents.map((doc, i) => (
                  <div key={doc.title || i} className={`bg-white rounded-2xl px-4 py-3.5 flex items-center gap-4 shadow-sm border border-gray-100 ${doc.status === "Pending" ? "opacity-70" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
                      <Icon d={icons[doc.iconType] || icons.file} size={16} className="text-[#c96a4f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1a2e2a] text-sm truncate">{doc.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{doc.author}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      doc.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
                    }`}>{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-extrabold text-[#1a2e2a]">Active Regimen</h2>
                <button className="flex items-center gap-1 text-xs font-semibold text-[#c96a4f] hover:underline">
                  Manage Pharmacy <Icon d={icons.store} size={12} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {healthMetrics.regimen.map((item, i) => (
                  <MedCard key={item.name || i} item={item} />
                ))}
                <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#c96a4f] hover:bg-[#fff8f6] transition-colors min-h-[100px]">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <Icon d={icons.plus} size={14} className="text-gray-400" />
                  </div>
                  <p className="text-xs font-semibold text-gray-400">Add Manual Entry</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

