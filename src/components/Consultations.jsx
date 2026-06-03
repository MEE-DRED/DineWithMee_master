// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// // ─── Tiny SVG Icon helper ────────────────────────────────────────────────────
// const Icon = ({ d, size = 18, className = "", fill = "none" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
//     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d={d} />
//   </svg>
// );

// const ICONS = {
//   dashboard:   "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
//   meal:        "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
//   health:      "M22 12h-4l-3 9L9 3l-3 9H2",
//   consult:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
//   orders:      "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
//   settings:    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
//   bell:        "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
//   search:      "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
//   plus:        "M12 5v14M5 12h14",
//   calendar:    "M3 4h18v18H3z M16 2v4M8 2v4M3 10h18",
//   location:    "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
//   video:       "M23 7l-7 5 7 5V7z M1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2z",
//   monitor:     "M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z M8 21h8M12 17v4",
//   arrowRight:  "M5 12h14M12 5l7 7-7 7",
//   chevLeft:    "M15 18l-6-6 6-6",
//   chevRight:   "M9 18l6-6-6-6",
//   file:        "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
//   scan:        "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2 M7 12h10",
//   hamburger:   "M3 12h18M3 6h18M3 18h18",
// };

// // ─── Calendar helpers ─────────────────────────────────────────────────────────
// const DAYS_HEADER = ["M", "T", "W", "T", "F", "S", "S"];
// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// function buildCalendar(year, month) {
//   // month is 0-indexed
//   const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   // offset so Monday=0
//   const offset = (firstDay + 6) % 7;
//   const cells = [];
//   for (let i = 0; i < offset; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(d);
//   return cells;
// }

// const TIME_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const navItems = [
//   { label: "Dashboard",     icon: ICONS.dashboard, path: "/dashboard"     },
//   { label: "Meal Plans",    icon: ICONS.meal,      path: "/meals"         },
//   { label: "Health Stats",  icon: ICONS.health,    path: "/healthprofile" },
//   { label: "Consultations", icon: ICONS.consult,   path: "/consultations" },
//   { label: "Orders",        icon: ICONS.orders,    path: "/orders"        },
//   { label: "Settings",      icon: ICONS.settings,  path: "/security"      },
// ];

// const history = [
//   { title: "Bi-Weekly Progress Review",  sub: "with Dr. Elena Thorne • Oct 10, 2023", icon: ICONS.file },
//   { title: "Initial Intake Assessment",  sub: "with Marcus Vance • Sep 25, 2023",     icon: ICONS.scan },
// ];

// // ─── Avatar placeholder ───────────────────────────────────────────────────────
// function Avatar({ initials, bg = "bg-[#c96a4f]", size = "w-12 h-12", text = "text-base" }) {
//   return (
//     <div className={`${size} ${bg} rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white ${text}`}>
//       {initials}
//     </div>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────
// export default function Consultations() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   // Calendar state — October 2023
//   const [calYear, setCalYear]   = useState(2023);
//   const [calMonth, setCalMonth] = useState(9); // October = index 9
//   const [selectedDay, setSelectedDay]   = useState(24);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [booked, setBooked] = useState(false);

//   const cells = buildCalendar(calYear, calMonth);

//   const prevMonth = () => {
//     if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
//     else setCalMonth(m => m - 1);
//     setSelectedDay(null); setSelectedSlot(null);
//   };
//   const nextMonth = () => {
//     if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
//     else setCalMonth(m => m + 1);
//     setSelectedDay(null); setSelectedSlot(null);
//   };

//   const handleBook = () => {
//     if (!selectedSlot) return;
//     setBooked(true);
//     setTimeout(() => setBooked(false), 2500);
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f3ef] flex flex-col font-sans">

//       {/* ── Mobile top bar ── */}
//       <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
//         <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//           <Icon d={ICONS.hamburger} size={20} className="text-[#1a2e2a]" />
//         </button>
//         <div className="flex items-center gap-2">
//           <div className="w-7 h-7 rounded-full bg-[#c96a4f] flex items-center justify-center">
//             <span className="text-white text-xs font-bold">D</span>
//           </div>
//           <span className="font-bold text-[#1a2e2a] text-sm">Dine with Mee</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Icon d={ICONS.bell} size={18} className="text-[#1a2e2a]" />
//           <Avatar initials="M" bg="bg-amber-300" size="w-7 h-7" text="text-xs" />
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden">

//         {/* ── Sidebar ── */}
//         <aside className={`
//           fixed lg:relative inset-y-0 left-0 z-30 w-56 bg-white flex flex-col pt-6 pb-4
//           shadow-xl lg:shadow-none transition-transform duration-300
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

//           <nav className="flex-1 px-3 space-y-0.5">
//             {navItems.map(item => {
//               const active = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.label}
//                   to={item.path}
//                   onClick={() => setSidebarOpen(false)}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                     active
//                       ? "bg-[#1a2e2a] text-white font-semibold shadow"
//                       : "text-gray-400 hover:text-[#1a2e2a] hover:bg-gray-50"
//                   }`}
//                 >
//                   <Icon d={item.icon} size={16} />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="px-3 mt-4">
//             <button className="w-full bg-[#1a2e2a] hover:bg-[#243d38] text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
//               <Icon d={ICONS.plus} size={15} />
//               New Meal Plan
//             </button>
//           </div>
//         </aside>

//         {/* Sidebar overlay */}
//         {sidebarOpen && (
//           <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
//         )}

//         {/* ── Main ── */}
//         <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

//           {/* Top bar desktop */}
//           <div className="hidden lg:flex items-center justify-between mb-8">
//             <h1 className="text-2xl font-extrabold text-[#1a2e2a] tracking-tight">Consultations</h1>
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Icon d={ICONS.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search appointments…"
//                   className="pl-9 pr-4 py-2 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 w-56 placeholder:text-gray-400"
//                 />
//               </div>
//               <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition">
//                 <Icon d={ICONS.bell} size={16} className="text-[#1a2e2a]" />
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c96a4f] rounded-full" />
//               </button>
//               <Avatar initials="M" bg="bg-amber-300" size="w-9 h-9" text="text-sm" />
//             </div>
//           </div>

//           {/* Mobile title */}
//           <h1 className="lg:hidden text-xl font-extrabold text-[#1a2e2a] mb-5">Consultations</h1>

//           {/* ── Two-column layout ── */}
//           <div className="flex flex-col xl:flex-row gap-6">

//             {/* ── LEFT column ── */}
//             <div className="flex-1 min-w-0">

//               {/* Upcoming Sessions */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-extrabold text-[#1a2e2a]">Upcoming Sessions</h2>
//                   <span className="bg-[#e8f5f0] text-[#3a7d5a] text-xs font-bold px-3 py-1 rounded-full">2 Scheduled</span>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Card 1 — Dr. Elena Thorne */}
//                   <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
//                     <span className="absolute top-4 right-4 bg-[#e8f5f0] text-[#3a7d5a] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">Today, 4:00 PM</span>
//                     <div className="flex items-center gap-3 mb-4">
//                       <Avatar initials="ET" bg="bg-[#c4a882]" size="w-12 h-12" text="text-sm" />
//                       <div>
//                         <p className="font-extrabold text-[#1a2e2a] text-base leading-tight">Dr. Elena Thorne</p>
//                         <p className="text-gray-400 text-xs mt-0.5">Senior Clinical Dietitian</p>
//                       </div>
//                     </div>
//                     <div className="space-y-2 mb-5">
//                       <div className="flex items-center gap-2 text-gray-500 text-xs">
//                         <Icon d={ICONS.calendar} size={13} className="flex-shrink-0" />
//                         Oct 24, 2023 • 45 min
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-500 text-xs">
//                         <Icon d={ICONS.monitor} size={13} className="flex-shrink-0" />
//                         Virtual Health Suite
//                       </div>
//                     </div>
//                     <button className="w-full bg-[#c96a4f] hover:bg-[#b85a40] text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
//                       <Icon d={ICONS.video} size={15} />
//                       Join Session
//                     </button>
//                   </div>

//                   {/* Card 2 — Marcus Vance */}
//                   <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
//                     <div>
//                       <div className="flex items-center gap-3 mb-4">
//                         <Avatar initials="MV" bg="bg-[#7aaa8e]" size="w-12 h-12" text="text-sm" />
//                         <div>
//                           <p className="font-extrabold text-[#1a2e2a] text-base leading-tight">Marcus Vance</p>
//                           <p className="text-gray-400 text-xs mt-0.5">Sports Nutrition Specialist</p>
//                         </div>
//                       </div>
//                       <div className="space-y-2 mb-6">
//                         <div className="flex items-center gap-2 text-gray-500 text-xs">
//                           <Icon d={ICONS.calendar} size={13} className="flex-shrink-0" />
//                           Oct 28, 2023 • 30 min
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-500 text-xs">
//                           <Icon d={ICONS.location} size={13} className="flex-shrink-0" />
//                           Downtown Wellness Hub
//                         </div>
//                       </div>
//                     </div>
//                     <button className="w-full bg-transparent border border-gray-200 hover:border-[#1a2e2a] text-[#1a2e2a] font-bold text-sm py-3 rounded-xl transition-colors">
//                       Reschedule
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Consultation History */}
//               <div>
//                 <h2 className="text-lg font-extrabold text-[#1a2e2a] mb-4">Consultation History</h2>
//                 <div className="space-y-3">
//                   {history.map((h) => (
//                     <div key={h.title} className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
//                       <div className="w-11 h-11 rounded-xl bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
//                         <Icon d={h.icon} size={17} className="text-[#c96a4f]" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-[#1a2e2a] text-sm truncate">{h.title}</p>
//                         <p className="text-gray-400 text-xs mt-0.5">{h.sub}</p>
//                       </div>
//                       <span className="hidden sm:inline-flex bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">Approved</span>
//                       <button className="flex items-center gap-1 text-[#1a2e2a] font-bold text-xs whitespace-nowrap hover:text-[#c96a4f] transition-colors flex-shrink-0">
//                         View Notes <Icon d={ICONS.arrowRight} size={13} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* ── RIGHT column ── */}
//             <div className="w-full xl:w-80 flex-shrink-0 space-y-4">

//               {/* Schedule New — Calendar */}
//               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-base font-extrabold text-[#1a2e2a]">Schedule New</h2>
//                   <div className="flex items-center gap-1">
//                     <button onClick={prevMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
//                       <Icon d={ICONS.chevLeft} size={14} className="text-[#1a2e2a]" />
//                     </button>
//                     <button onClick={nextMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
//                       <Icon d={ICONS.chevRight} size={14} className="text-[#1a2e2a]" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Month + year */}
//                 <p className="text-center text-xs font-bold text-[#1a2e2a] mb-3 tracking-wide">
//                   {MONTHS[calMonth]} {calYear}
//                 </p>

//                 {/* Day headers */}
//                 <div className="grid grid-cols-7 mb-1">
//                   {DAYS_HEADER.map((d, i) => (
//                     <div key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
//                   ))}
//                 </div>

//                 {/* Day cells */}
//                 <div className="grid grid-cols-7 gap-y-0.5">
//                   {cells.map((day, i) => (
//                     <button
//                       key={i}
//                       disabled={!day}
//                       onClick={() => { if (day) { setSelectedDay(day); setSelectedSlot(null); }}}
//                       className={`
//                         h-8 w-full rounded-full text-xs font-semibold transition-all
//                         ${!day ? "invisible" : ""}
//                         ${day === selectedDay
//                           ? "bg-[#1a2e2a] text-white shadow"
//                           : "text-[#1a2e2a] hover:bg-[#f0ede8]"
//                         }
//                       `}
//                     >
//                       {day}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Time slots */}
//                 <div className="mt-4">
//                   <p className="text-xs font-bold text-[#1a2e2a] mb-2.5">
//                     Available Slots {selectedDay ? `(${MONTHS[calMonth].slice(0,3)} ${selectedDay})` : ""}
//                   </p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {TIME_SLOTS.map(slot => (
//                       <button
//                         key={slot}
//                         onClick={() => setSelectedSlot(slot)}
//                         className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
//                           selectedSlot === slot
//                             ? "bg-[#1a2e2a] text-white border-[#1a2e2a] shadow"
//                             : "bg-white text-[#1a2e2a] border-gray-200 hover:border-[#1a2e2a]"
//                         }`}
//                       >
//                         {slot}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Confirm */}
//                 <button
//                   onClick={handleBook}
//                   disabled={!selectedSlot}
//                   className={`mt-4 w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
//                     booked
//                       ? "bg-emerald-500 text-white"
//                       : selectedSlot
//                         ? "bg-[#1a2e2a] hover:bg-[#243d38] text-white shadow-md"
//                         : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   {booked ? "✓ Booking Confirmed!" : "Confirm Booking"}
//                 </button>
//               </div>

//               {/* Need specialised help? */}
//               <div className="bg-[#1a2e2a] rounded-2xl p-5 text-white">
//                 <p className="font-extrabold text-base mb-2">Need specialized help?</p>
//                 <p className="text-[#a8bdb8] text-xs leading-relaxed mb-5">
//                   Our network of elite clinical nutritionists are ready to design your perfect path.
//                 </p>
//                 <div className="flex items-center gap-2 mb-5">
//                   {/* Stacked avatars */}
//                   <div className="flex -space-x-2">
//                     <Avatar initials="A" bg="bg-[#c4a882]" size="w-8 h-8" text="text-xs" />
//                     <Avatar initials="B" bg="bg-[#7aaa8e]" size="w-8 h-8" text="text-xs" />
//                   </div>
//                   <span className="w-8 h-8 rounded-full bg-[#c96a4f] flex items-center justify-center text-[10px] font-bold">+12</span>
//                 </div>
//                 <button className="w-full bg-white text-[#1a2e2a] font-bold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors">
//                   Browse Experts
//                 </button>
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

// ─── Tiny SVG Icon helper ────────────────────────────────────────────────────
const Icon = ({ d, size = 18, className = "", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const ICONS = {
  dashboard:   "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  meal:        "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  health:      "M22 12h-4l-3 9L9 3l-3 9H2",
  consult:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  orders:      "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  settings:    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  bell:        "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  search:      "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
  plus:        "M12 5v14M5 12h14",
  calendar:    "M3 4h18v18H3z M16 2v4M8 2v4M3 10h18",
  location:    "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  video:       "M23 7l-7 5 7 5V7z M1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2z",
  monitor:     "M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z M8 21h8M12 17v4",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  chevLeft:    "M15 18l-6-6 6-6",
  chevRight:   "M9 18l6-6-6-6",
  file:        "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  scan:        "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2 M7 12h10",
  hamburger:   "M3 12h18M3 6h18M3 18h18",
};

const DAYS_HEADER = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const TIME_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];
const BACKEND_URL = "https://new-dine-with-mee-backend.onrender.com";

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function Avatar({ initials, bg = "bg-[#c96a4f]", size = "w-12 h-12", text = "text-base" }) {
  return (
    <div className={`${size} ${bg} rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white ${text}`}>
      {initials}
    </div>
  );
}

export default function Consultations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const [calYear, setCalYear]   = useState(2023);
  const [calMonth, setCalMonth] = useState(9); 
  const [selectedDay, setSelectedDay]   = useState(24);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  
  // Dynamic API Data States
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [historyNotes, setHistoryNotes] = useState([]);

  const cells = buildCalendar(calYear, calMonth);

  // Fetch data on mount
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/consultations/sessions`)
      .then(res => res.json())
      .then(data => setUpcomingSessions(data))
      .catch(err => console.error("Error pulling scheduled sessions:", err));

    fetch(`${BACKEND_URL}/api/consultations/history`)
      .then(res => res.json())
      .then(data => setHistoryNotes(data))
      .catch(err => console.error("Error pulling history files:", err));
  }, []);

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelectedDay(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelectedDay(null); setSelectedSlot(null);
  };

  const handleBook = () => {
    if (!selectedSlot) return;

    const sessionPayload = {
      year: calYear,
      month: MONTHS[calMonth],
      day: selectedDay,
      time: selectedSlot
    };

    fetch(`${BACKEND_URL}/api/consultations/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionPayload)
    })
    .then(res => {
      if (res.ok) {
        setBooked(true);
        setTimeout(() => setBooked(false), 2500);
      }
    })
    .catch(err => console.error("Booking post runtime error:", err));
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex flex-col font-sans">
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Icon d={ICONS.hamburger} size={20} className="text-[#1a2e2a]" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#c96a4f] flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="font-bold text-[#1a2e2a] text-sm">Dine with Mee</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon d={ICONS.bell} size={18} className="text-[#1a2e2a]" />
          <Avatar initials="M" bg="bg-amber-300" size="w-7 h-7" text="text-xs" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-30 w-56 bg-white flex flex-col pt-6 pb-4
          shadow-xl lg:shadow-none transition-transform duration-300
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
              { label: "Dashboard",     icon: ICONS.dashboard, path: "/dashboard"     },
              { label: "Meal Plans",    icon: ICONS.meal,      path: "/meals"         },
              { label: "Health Stats",  icon: ICONS.health,    path: "/healthprofile" },
              { label: "Consultations", icon: ICONS.consult,   path: "/consultations" },
              { label: "Orders",        icon: ICONS.orders,    path: "/orders"        },
              { label: "Settings",      icon: ICONS.settings,  path: "/security"      },
            ].map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#1a2e2a] text-white font-semibold shadow"
                      : "text-gray-400 hover:text-[#1a2e2a] hover:bg-gray-50"
                  }`}
                >
                  <Icon d={item.icon} size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 mt-4">
            <button className="w-full bg-[#1a2e2a] hover:bg-[#243d38] text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
              <Icon d={ICONS.plus} size={15} />
              New Meal Plan
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="hidden lg:flex items-center justify-between mb-8">
            <h1 className="text-2xl font-extrabold text-[#1a2e2a] tracking-tight">Consultations</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon d={ICONS.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments…"
                  className="pl-9 pr-4 py-2 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 w-56 placeholder:text-gray-400"
                />
              </div>
              <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition">
                <Icon d={ICONS.bell} size={16} className="text-[#1a2e2a]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c96a4f] rounded-full" />
              </button>
              <Avatar initials="M" bg="bg-amber-300" size="w-9 h-9" text="text-sm" />
            </div>
          </div>

          <h1 className="lg:hidden text-xl font-extrabold text-[#1a2e2a] mb-5">Consultations</h1>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-[#1a2e2a]">Upcoming Sessions</h2>
                  <span className="bg-[#e8f5f0] text-[#3a7d5a] text-xs font-bold px-3 py-1 rounded-full">
                    {upcomingSessions.length} Scheduled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={session.id || index} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
                      {session.badgeText && (
                        <span className="absolute top-4 right-4 bg-[#e8f5f0] text-[#3a7d5a] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                          {session.badgeText}
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar initials={session.initials} bg={session.avatarBg || "bg-[#c4a882]"} size="w-12 h-12" text="text-sm" />
                          <div>
                            <p className="font-extrabold text-[#1a2e2a] text-base leading-tight">{session.doctorName}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{session.specialty}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-5">
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Icon d={ICONS.calendar} size={13} className="flex-shrink-0" />
                            {session.dateLabel}
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Icon d={session.type === "virtual" ? ICONS.monitor : ICONS.location} size={13} className="flex-shrink-0" />
                            {session.locationLabel}
                          </div>
                        </div>
                      </div>
                      {session.type === "virtual" ? (
                        <button className="w-full bg-[#c96a4f] hover:bg-[#b85a40] text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
                          <Icon d={ICONS.video} size={15} /> Join Session
                        </button>
                      ) : (
                        <button className="w-full bg-transparent border border-gray-200 hover:border-[#1a2e2a] text-[#1a2e2a] font-bold text-sm py-3 rounded-xl transition-colors">
                          Reschedule
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#1a2e2a] mb-4">Consultation History</h2>
                <div className="space-y-3">
                  {historyNotes.map((h, i) => (
                    <div key={h.title || i} className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-11 h-11 rounded-xl bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
                        <Icon d={ICONS[h.iconType] || ICONS.file} size={17} className="text-[#c96a4f]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1a2e2a] text-sm truncate">{h.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{h.sub}</p>
                      </div>
                      <span className="hidden sm:inline-flex bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">Approved</span>
                      <button className="flex items-center gap-1 text-[#1a2e2a] font-bold text-xs whitespace-nowrap hover:text-[#c96a4f] transition-colors flex-shrink-0">
                        View Notes <Icon d={ICONS.arrowRight} size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full xl:w-80 flex-shrink-0 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-[#1a2e2a]">Schedule New</h2>
                  <div className="flex items-center gap-1">
                    <button onClick={prevMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                      <Icon d={ICONS.chevLeft} size={14} className="text-[#1a2e2a]" />
                    </button>
                    <button onClick={nextMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                      <Icon d={ICONS.chevRight} size={14} className="text-[#1a2e2a]" />
                    </button>
                  </div>
                </div>

                <p className="text-center text-xs font-bold text-[#1a2e2a] mb-3 tracking-wide">
                  {MONTHS[calMonth]} {calYear}
                </p>

                <div className="grid grid-cols-7 mb-1">
                  {DAYS_HEADER.map((d, i) => (
                    <div key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-0.5">
                  {cells.map((day, i) => (
                    <button
                      key={i}
                      disabled={!day}
                      onClick={() => { if (day) { setSelectedDay(day); setSelectedSlot(null); }}}
                      className={`
                        h-8 w-full rounded-full text-xs font-semibold transition-all
                        ${!day ? "invisible" : ""}
                        ${day === selectedDay
                          ? "bg-[#1a2e2a] text-white shadow"
                          : "text-[#1a2e2a] hover:bg-[#f0ede8]"
                        }
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-bold text-[#1a2e2a] mb-2.5">
                    Available Slots {selectedDay ? `(${MONTHS[calMonth].slice(0,3)} ${selectedDay})` : ""}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSlot === slot
                            ? "bg-[#1a2e2a] text-white border-[#1a2e2a] shadow"
                            : "bg-white text-[#1a2e2a] border-gray-200 hover:border-[#1a2e2a]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  disabled={!selectedSlot}
                  className={`mt-4 w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                    booked
                      ? "bg-emerald-500 text-white"
                      : selectedSlot
                        ? "bg-[#1a2e2a] hover:bg-[#243d38] text-white shadow-md"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {booked ? "✓ Booking Confirmed!" : "Confirm Booking"}
                </button>
              </div>

              <div className="bg-[#1a2e2a] rounded-2xl p-5 text-white">
                <p className="font-extrabold text-base mb-2">Need specialized help?</p>
                <p className="text-[#a8bdb8] text-xs leading-relaxed mb-5">
                  Our network of elite clinical nutritionists are ready to design your perfect path.
                </p>
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex -space-x-2">
                    <Avatar initials="A" bg="bg-[#c4a882]" size="w-8 h-8" text="text-xs" />
                    <Avatar initials="B" bg="bg-[#7aaa8e]" size="w-8 h-8" text="text-xs" />
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#c96a4f] flex items-center justify-center text-[10px] font-bold">+12</span>
                </div>
                <button className="w-full bg-white text-[#1a2e2a] font-bold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Browse Experts
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}