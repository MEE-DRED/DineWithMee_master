// import { useState, useEffect } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, BarChart, Bar, Legend,
// } from "recharts";

// // ─── Dine with Mee API config ────────────────────────────────────────────────
// // Live backend — see https://new-dine-with-mee-backend-z7it.onrender.com/api-docs
// const API_BASE = "https://new-dine-with-mee-backend-z7it.onrender.com/api/v1";

// // "Meal Plans" + "Meals" routes here are Admin/Nutritionist-only and need a
// // Bearer token. Adjust this key if your login flow stores the token elsewhere.
// const AUTH_TOKEN_KEY = "authToken";
// function getAuthToken() {
//   try { return localStorage.getItem(AUTH_TOKEN_KEY) || ""; } catch { return ""; }
// }

// async function apiRequest(path, { method = "GET", body } = {}) {
//   const token = getAuthToken();
//   const headers = { "Content-Type": "application/json" };
//   if (token) headers["Authorization"] = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   let data = null;
//   try { data = await res.json(); } catch { /* some 204s have no body */ }

//   if (!res.ok) {
//     const msg = data?.message || data?.error || `Request failed (${res.status})`;
//     throw new Error(msg);
//   }
//   return data;
// }

// // Normalizes whatever shape the backend wraps a list/object in.
// function extractList(data, key) {
//   if (Array.isArray(data)) return data;
//   if (key && Array.isArray(data?.[key])) return data[key];
//   if (Array.isArray(data?.data)) return data.data;
//   if (key && Array.isArray(data?.data?.[key])) return data.data[key];
//   return [];
// }
// function extractObj(data, key) {
//   return (key && data?.[key]) || data?.data || data || null;
// }

// // ─── Design Tokens ───────────────────────────────────────────────────────────
// const C = {
//   sidebar:  "#172517",
//   sidebarA: "#233122",
//   accent:   "#D96F45",
//   teal:     "#2A9E82",
//   bg:       "#F1EDE5",
//   card:     "#FFFFFF",
//   dark:     "#1A1A1A",
//   mid:      "#4B5563",
//   muted:    "#8E939C",
//   border:   "#E4DDD5",
//   success:  "#1E7845",
//   warning:  "#B87010",
//   danger:   "#B82020",
//   info:     "#1A52A0",
//   sage:     "#346644",
//   lavender: "#6856A6",
// };

// const NAV = [
//   { id: "patients",      label: "Patients",       icon: "👤" },
//   { id: "consultations", label: "Consultations",  icon: "📅" },
//   { id: "meals",         label: "Meal Approvals", icon: "🥗" },
//   { id: "analytics",     label: "Analytics",      icon: "📊" },
// ];

// // ─── Shared UI ────────────────────────────────────────────────────────────────
// function Card({ children, style = {} }) {
//   return (
//     <div style={{ background: C.card, borderRadius: 12, padding: "16px 18px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,.05)", ...style }}>
//       {children}
//     </div>
//   );
// }

// function Tag({ text, type = "default" }) {
//   const map = {
//     default:  { bg: "#F0EDE8", color: C.mid },
//     success:  { bg: "#D2EDD9", color: "#145528" },
//     warning:  { bg: "#FEF3C7", color: "#92400E" },
//     danger:   { bg: "#FDDADA", color: "#991B1B" },
//     info:     { bg: "#DBEAFE", color: "#1E3A8A" },
//     teal:     { bg: "#CCFBF1", color: "#0F5147" },
//     sage:     { bg: "#D4EAD8", color: "#224D2C" },
//     orange:   { bg: "#FEE8D8", color: "#9A3B13" },
//     lavender: { bg: "#EDE9FE", color: "#4C3F90" },
//     urgent:   { bg: "#FDDADA", color: "#991B1B" },
//   };
//   const s = map[type] || map.default;
//   return (
//     <span style={{ background: s.bg, color: s.color, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: ".03em" }}>
//       {text}
//     </span>
//   );
// }

// function Pill({ children, active, onClick }) {
//   return (
//     <button onClick={onClick} style={{
//       padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
//       background: active ? C.dark : C.border, color: active ? "#fff" : C.muted, transition: "all .12s",
//     }}>{children}</button>
//   );
// }

// function Lbl({ children }) {
//   return <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 12 }}>{children}</div>;
// }

// function PageHeader({ title, sub, actions }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
//       <div>
//         <div style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>{title}</div>
//         {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{sub}</div>}
//       </div>
//       <div style={{ display: "flex", gap: 8 }}>{actions}</div>
//     </div>
//   );
// }

// function Avatar({ name, size = 28, color = C.teal }) {
//   return (
//     <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
//       {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
//     </div>
//   );
// }

// function Btn({ children, variant = "primary", onClick, style = {} }) {
//   const styles = {
//     primary:  { background: C.accent,   color: "#fff",  border: "none" },
//     secondary:{ background: C.card,     color: C.mid,   border: `1px solid ${C.border}` },
//     teal:     { background: C.teal,     color: "#fff",  border: "none" },
//     ghost:    { background: "transparent", color: C.mid, border: `1px solid ${C.border}` },
//     sage:     { background: C.sage,     color: "#fff",  border: "none" },
//   };
//   return (
//     <button onClick={onClick} style={{
//       padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
//       ...styles[variant], ...style,
//     }}>{children}</button>
//   );
// }

// // Food visual placeholder
// function FoodThumb({ emoji, bg, size = 80 }) {
//   return (
//     <div style={{ width: size, height: size, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.45, flexShrink: 0 }}>
//       {emoji}
//     </div>
//   );
// }

// // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function Sidebar({ active, setActive }) {
//   return (
//     <aside style={{
//       width: 192, background: C.sidebar, display: "flex", flexDirection: "column",
//       height: "100vh", position: "fixed", left: 0, top: 0, zIndex: 20,
//     }}>
//       <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <div style={{ width: 28, height: 28, borderRadius: 7, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🥗</div>
//           <div>
//             <div style={{ fontWeight: 800, fontSize: 11, color: "#fff", lineHeight: 1.2 }}>Dine With Mee</div>
//             <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Clinical</div>
//           </div>
//         </div>
//       </div>
//       <nav style={{ flex: 1, padding: "8px 6px" }}>
//         {NAV.map(item => (
//           <button key={item.id} onClick={() => setActive(item.id)} style={{
//             display: "flex", alignItems: "center", gap: 8, width: "100%",
//             padding: "7px 10px", borderRadius: 7, border: "none", cursor: "pointer",
//             textAlign: "left", marginBottom: 1,
//             background: active === item.id ? C.sidebarA : "transparent",
//             color: active === item.id ? "#fff" : "rgba(255,255,255,.5)",
//             fontSize: 11, fontWeight: active === item.id ? 600 : 400, transition: "all .12s",
//           }}>
//             <span style={{ fontSize: 13, width: 16 }}>{item.icon}</span>
//             {item.label}
//           </button>
//         ))}
//       </nav>
//       <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
//         {[{ icon: "⚙️", label: "Settings" }, { icon: "💬", label: "Support" }].map(b => (
//           <button key={b.label} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,.4)", fontSize: 11, marginBottom: 1 }}>
//             <span style={{ fontSize: 12 }}>{b.icon}</span>{b.label}
//           </button>
//         ))}
//         <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", marginTop: 4, borderTop: "1px solid rgba(255,255,255,.06)" }}>
//           <Avatar name="Elena Rossi" size={26} color={C.accent} />
//           <div><div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>Dr. Elena Rossi</div><div style={{ fontSize: 9, color: "rgba(255,255,255,.35)" }}>Clinical Nutritionist</div></div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════
// //  PAGE 1 — PATIENTS  (list → patient detail)
// // ═══════════════════════════════════════════════════════════════════════════
// const patientList = [
//   { id: 1, name: "Julianne Moore",   age: 42, condition: "Type 2 Diabetes Management",  status: "Active",   risk: "low",    lastSeen: "Today 9:15",   diet: "Low Carb" },
//   { id: 2, name: "Marcus Chan",      age: 36, condition: "Weight Management",            status: "Approved", risk: "medium", lastSeen: "Yesterday",    diet: "High Protein" },
//   { id: 3, name: "Linda Thompson",   age: 51, condition: "Post-Op Recovery Diet",        status: "Pending",  risk: "low",    lastSeen: "2 days ago",   diet: "Low Sodium" },
//   { id: 4, name: "David Greene",     age: 29, condition: "Sports Performance Nutrition", status: "Approved", risk: "low",    lastSeen: "3 days ago",   diet: "High Protein" },
//   { id: 5, name: "Sarah Jackson",    age: 44, condition: "Chronic Inflammation & Diet", status: "Active",   risk: "high",   lastSeen: "Today 9:15",   diet: "Anti-Inflammatory" },
//   { id: 6, name: "Emily Thorne",     age: 38, condition: "PCOS Nutrition Management",   status: "Active",   risk: "medium", lastSeen: "Yesterday",    diet: "Low GI" },
// ];

// const glucoseData = [
//   { day: "Mon", avg: 102, target: 98 }, { day: "Tue", avg: 95, target: 98 },
//   { day: "Wed", avg: 108, target: 98 }, { day: "Thu", avg: 92, target: 98 },
//   { day: "Fri", avg: 99, target: 98 },  { day: "Sat", avg: 96, target: 98 },
//   { day: "Sun", avg: 94, target: 98 },
// ];

// const clinicalNotes = [
//   { date: "Today 10:12",   title: "Review of Julianne Metrics", body: "Weight loss 2.3kg. Blood sugar stabilisation observed last 7 days. Recommend sticking to…" },
//   { date: "Oct 9 2024",    title: "Monthly Consultation",       body: "Discussed emotional eating triggers. Set action items for meal prep work week…" },
//   { date: "Aug 14 2024",   title: "Initial Onboarding",         body: "Patient goals captured. Sustainable calorie deficit without fatigue…" },
// ];

// const mealPlan = [
//   { emoji: "🥑", bg: "#D8ECC8", name: "Avocado & Poached Egg",  tags: ["Diabetic", "Low Carb"],    cals: 420 },
//   { emoji: "🌾", bg: "#F5E8C2", name: "Quinoa Power Bowl",       tags: ["Diabetic", "High Protein"],cals: 510 },
//   { emoji: "🫐", bg: "#E8D8EC", name: "Berry Greek Yogurt",      tags: ["Diabetic", "Probiotic"],   cals: 290 },
//   { emoji: "🐟", bg: "#F0D8C0", name: "Wild Seared Salmon",      tags: ["Diabetic", "Omega-3"],     cals: 480 },
// ];

// const avColors = [C.teal, C.accent, C.sage, C.lavender, "#C07010", C.info];

// function PatientDetail({ patient, onBack }) {
//   return (
//     <div>
//       {/* Patient header */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <button onClick={onBack} style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, fontSize: 11, cursor: "pointer", color: C.muted }}>← Back</button>
//           <Avatar name={patient.name} size={44} color={C.accent} />
//           <div>
//             <div style={{ fontSize: 16, fontWeight: 800, color: C.dark }}>{patient.name}</div>
//             <div style={{ fontSize: 11, color: C.muted }}>{patient.age} yrs · {patient.condition} · Patient since 2022</div>
//           </div>
//           <Tag text={patient.status} type={patient.status === "Active" ? "teal" : patient.status === "Approved" ? "success" : "warning"} />
//         </div>
//         <div style={{ display: "flex", gap: 8 }}>
//           <Btn variant="secondary">✉ Message Patient</Btn>
//           <Btn variant="accent" style={{ background: C.accent, color: "#fff" }}>＋ Open New Plan</Btn>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
//         <div>
//           {/* Health stats */}
//           <Card style={{ marginBottom: 14 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//               <Lbl>Health Stats</Lbl>
//               <span style={{ fontSize: 10, color: C.muted }}>Last 30 days</span>
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
//               {[
//                 { label: "BMI Index",        value: "24.2",  sub: "Normal",   color: C.teal    },
//                 { label: "Avg Blood Glucose",value: "98",    sub: "mg/dL",    color: C.sage    },
//                 { label: "Blood Pressure",   value: "82",    sub: "OPTIMAL",  color: C.info    },
//                 { label: "Sleep Score",      value: "8.2",   sub: "OPTIMAL",  color: C.lavender},
//               ].map(stat => (
//                 <div key={stat.label} style={{ padding: "12px", background: C.bg, borderRadius: 10, textAlign: "center" }}>
//                   <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
//                   <div style={{ fontSize: 9, fontWeight: 700, color: stat.color, textTransform: "uppercase", letterSpacing: ".06em", marginTop: 3 }}>{stat.sub}</div>
//                   <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//             {/* Glucose trend chart */}
//             <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 10 }}>Blood Sugar Trends</div>
//             <ResponsiveContainer width="100%" height={130}>
//               <LineChart data={glucoseData} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
//                 <XAxis dataKey="day" tick={{ fontSize: 9 }} />
//                 <YAxis tick={{ fontSize: 9 }} domain={[80, 120]} />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="avg"    stroke={C.teal}   strokeWidth={2} dot={{ r: 3 }} name="This Avg"    />
//                 <Line type="monotone" dataKey="target" stroke={C.border} strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Target" />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>

//           {/* Current meal plan */}
//           <Card>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//               <div>
//                 <Lbl>Current Meal Plan</Lbl>
//                 <div style={{ fontSize: 10, color: C.muted, marginTop: -8, marginBottom: 8 }}>Phase 2: Metabolic Optimization</div>
//               </div>
//               <Tag text="Approved" type="success" />
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
//               {mealPlan.map((m, i) => (
//                 <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
//                   <div style={{ background: m.bg, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{m.emoji}</div>
//                   <div style={{ padding: "8px 10px" }}>
//                     <div style={{ fontSize: 11, fontWeight: 600, color: C.dark, marginBottom: 4, lineHeight: 1.3 }}>{m.name}</div>
//                     <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 4 }}>
//                       {m.tags.map(t => <Tag key={t} text={t} type="sage" />)}
//                     </div>
//                     <div style={{ fontSize: 10, color: C.muted }}>{m.cals} kcal</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* Right: Clinical notes */}
//         <Card style={{ alignSelf: "start" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//             <Lbl>Clinical Notes</Lbl>
//             <button style={{ fontSize: 18, border: "none", background: "none", cursor: "pointer", color: C.muted }}>⊕</button>
//           </div>
//           {clinicalNotes.map((note, i) => (
//             <div key={i} style={{ padding: "12px 0", borderBottom: i < clinicalNotes.length - 1 ? `1px solid ${C.border}` : "none" }}>
//               <div style={{ fontSize: 9, color: C.muted, marginBottom: 3, textTransform: "uppercase", letterSpacing: ".06em" }}>{note.date}</div>
//               <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 5 }}>{note.title}</div>
//               <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{note.body}</div>
//             </div>
//           ))}
//           <button style={{ width: "100%", marginTop: 12, padding: "7px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.muted }}>View All Notes</button>
//         </Card>
//       </div>
//     </div>
//   );
// }

// function Patients() {
//   const [selected, setSelected] = useState(null);
//   const [search, setSearch] = useState("");
//   if (selected) return <PatientDetail patient={selected} onBack={() => setSelected(null)} />;
//   const filtered = patientList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div>
//       <PageHeader
//         title="Patients"
//         sub="124 active patients · 18 pending approvals"
//         actions={[
//           <input key="s" placeholder="🔍 Search patients…" value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 11, outline: "none", width: 200 }} />,
//           <Btn key="n" variant="teal">＋ New Consultation</Btn>,
//         ]}
//       />
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
//         {filtered.map((p, i) => (
//           <Card key={p.id} style={{ cursor: "pointer", transition: "box-shadow .15s" }} onClick={() => setSelected(p)}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
//               <Avatar name={p.name} size={38} color={avColors[i % avColors.length]} />
//               <div>
//                 <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{p.name}</div>
//                 <div style={{ fontSize: 10, color: C.muted }}>{p.age} yrs · Last seen {p.lastSeen}</div>
//               </div>
//             </div>
//             <div style={{ fontSize: 11, color: C.mid, marginBottom: 10, lineHeight: 1.4 }}>{p.condition}</div>
//             <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
//               <Tag text={p.diet} type="sage" />
//               <Tag text={p.status} type={p.status === "Active" ? "teal" : p.status === "Approved" ? "success" : "warning"} />
//               {p.risk === "high" && <Tag text="High Risk" type="urgent" />}
//             </div>
//             <button onClick={e => { e.stopPropagation(); setSelected(p); }} style={{ width: "100%", padding: "6px 0", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.mid, fontWeight: 600 }}>View Profile →</button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════
// //  PAGE 2 — CONSULTATIONS
// // ═══════════════════════════════════════════════════════════════════════════
// const sessions = [
//   { time: "10:00", end: "10:45", patient: "Julianne Mitchell", phase: "Chronic Inflammation & Diet", type: "Live Video",           tag: "Priority Patient", color: C.accent,   emoji: "🎥" },
//   { time: "10:35", end: "11:10", patient: "Arthur Morgan",     phase: "Post-Op Recovery Diet",       type: "Session",              tag: "Session 4/12",     color: C.teal,     emoji: "📋" },
//   { time: "11:00", end: "11:30", patient: "Emily Thorne",      phase: "PCOS Nutrition",              type: "Initial Consultation", tag: "New Patient",      color: C.sage,     emoji: "🌱" },
//   { time: "11:45", end: "12:15", patient: "James Wilson",      phase: "Low Profile Recovery Diet",   type: "Session",              tag: "Session 2/8",      color: C.lavender, emoji: "📋" },
// ];

// const weeklyPerf = [
//   { day: "Mon", sessions: 6 }, { day: "Tue", sessions: 8 },
//   { day: "Wed", sessions: 5 }, { day: "Thu", sessions: 9 },
//   { day: "Fri", sessions: 6 }, { day: "Sat", sessions: 2 },
// ];

// function Consultations() {
//   const [view, setView]           = useState("daily");
//   const [activeSession, setActiveSession] = useState(sessions[0]);
//   const [notes, setNotes]          = useState("");
//   const [symptoms, setSymptoms]    = useState("");
//   const [serverSessions, setServerSessions] = useState([]);
//   const [loadingSessions, setLoadingSessions] = useState(true);
//   const [sessionError, setSessionError] = useState("");
//   const [finalizing, setFinalizing] = useState(false);
//   const [toasts, setToasts] = useState([]);

//   const addToast = (msg, type = "success") => {
//     const id = Date.now() + Math.random();
//     setToasts(prev => [...prev, { id, msg, type }]);
//     setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
//   };

//   // Best-effort mapping from a server consultation record into this page's
//   // session-card shape. Adjust the fallbacks below if your schema differs.
//   const palette      = [C.accent, C.teal, C.sage, C.lavender];
//   const emojiPalette = ["🎥", "📋", "🌱", "📋"];
//   const normalizeSession = (c, idx) => {
//     const start = c.scheduledAt || c.startTime || c.date;
//     let time = "—", end = "";
//     if (start) {
//       const d = new Date(start);
//       if (!isNaN(d)) {
//         time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//         if (c.endTime) {
//           const ed = new Date(c.endTime);
//           if (!isNaN(ed)) end = ed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//         }
//       }
//     }
//     return {
//       id: c._id || c.id,
//       _fromServer: true,
//       time, end,
//       patient: c.patientName || c.patient?.name || c.user?.name || "Patient",
//       phase: c.phase || c.focus || c.reason || c.type || "Consultation",
//       type: c.consultationType || c.type || "Session",
//       tag: c.isNewPatient ? "New Patient" : c.priority === "high" ? "Priority Patient" : `Status: ${c.status || "scheduled"}`,
//       color: palette[idx % palette.length],
//       emoji: emojiPalette[idx % emojiPalette.length],
//       status: c.status || "scheduled",
//     };
//   };

//   // GET /api/v1/consultations/upcoming
//   const fetchSessions = async () => {
//     setLoadingSessions(true);
//     setSessionError("");
//     try {
//       const data = await apiRequest("/consultations/upcoming");
//       const list = extractList(data, "consultations").map(normalizeSession);
//       setServerSessions(list);
//       if (list.length) setActiveSession(list[0]);
//     } catch (err) {
//       setSessionError(err.message || "Could not reach the consultations API.");
//     } finally {
//       setLoadingSessions(false);
//     }
//   };
//   useEffect(() => { fetchSessions(); }, []);

//   const displaySessions = serverSessions.length ? serverSessions : sessions;

//   // POST /api/v1/consultations/{id}/review  +  PATCH /api/v1/consultations/{id}/status
//   const finalize = async () => {
//     if (!activeSession) return;
//     if (!activeSession._fromServer) {
//       addToast("Saved locally (sample session — not synced to server).", "info");
//       return;
//     }
//     setFinalizing(true);
//     try {
//       await apiRequest(`/consultations/${activeSession.id}/review`, { method: "POST", body: { notes, symptoms } });
//       await apiRequest(`/consultations/${activeSession.id}/status`, { method: "PATCH", body: { status: "completed" } });
//       addToast("Consultation finalized and saved.");
//       setNotes(""); setSymptoms("");
//       fetchSessions();
//     } catch (err) {
//       addToast(err.message || "Could not save — server unavailable.", "error");
//     } finally {
//       setFinalizing(false);
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <PageHeader
//         title="Clinical Management"
//         sub="Manage your clinical sessions and patient progress"
//         actions={[
//           <div key="tabs" style={{ display: "flex", background: "#E8E4DC", padding: 3, borderRadius: 8 }}>
//             {["daily", "weekly"].map(v => (
//               <button key={v} onClick={() => setView(v)} style={{
//                 padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
//                 background: view === v ? C.card : "transparent",
//                 color: view === v ? C.dark : C.muted, fontSize: 11, fontWeight: view === v ? 600 : 400,
//                 textTransform: "capitalize",
//               }}>{v}</button>
//             ))}
//           </div>,
//           <button key="r" onClick={fetchSessions} title="Refresh from server" style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", color: C.mid, fontSize: 13 }}>⟳</button>,
//           <Btn key="n" variant="teal">＋ New Consultation</Btn>,
//         ]}
//       />

//       {sessionError && (
//         <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FDDADA", border: `1px solid ${C.danger}33`, color: "#991B1B", fontSize: 11, marginBottom: 14 }}>
//           {sessionError} — showing sample sessions below.
//         </div>
//       )}

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
//         <div>
//           {/* Date header */}
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
//             <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", fontSize: 12, color: C.muted }}>‹</button>
//             <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Today, October 24</div>
//             <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", fontSize: 12, color: C.muted }}>›</button>
//             <Tag text={loadingSessions ? "Loading…" : `${displaySessions.length} sessions today`} type="info" />
//           </div>

//           {/* Session cards */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {displaySessions.map((s, i) => (
//               <div key={s.id || i} onClick={() => setActiveSession(s)} style={{
//                 background: C.card, borderRadius: 12, padding: "14px 16px",
//                 border: `1px solid ${activeSession === s ? s.color : C.border}`,
//                 cursor: "pointer", transition: "border .12s",
//                 boxShadow: activeSession === s ? `0 0 0 2px ${s.color}22` : "none",
//               }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                   <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
//                     <div style={{ textAlign: "center", minWidth: 44 }}>
//                       <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{s.time}</div>
//                       <div style={{ fontSize: 9, color: C.muted }}>– {s.end}</div>
//                     </div>
//                     <div style={{ width: 1, background: s.color, alignSelf: "stretch", marginRight: 4, borderRadius: 2 }} />
//                     <div>
//                       <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{s.patient}</div>
//                       <div style={{ fontSize: 11, color: C.mid, marginBottom: 6 }}>Phase: {s.phase}</div>
//                       <div style={{ display: "flex", gap: 6 }}>
//                         <Tag text={s.type} type={s.type === "Live Video" ? "orange" : s.type === "Initial Consultation" ? "sage" : "info"} />
//                         <Tag text={s.tag} type={s.tag === "Priority Patient" ? "urgent" : "default"} />
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: 6 }}>
//                     <button style={{ padding: "5px 10px", borderRadius: 7, border: "none", background: s.color, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
//                       {s.emoji} {s.type === "Live Video" ? "Join" : "Start"}
//                     </button>
//                     <button style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", fontSize: 10, cursor: "pointer", color: C.muted }}>Quick Record</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Weekly performance — sample chart (no confirmed /consultations/stats shape to map yet) */}
//           <Card style={{ marginTop: 14 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//               <Lbl>Weekly Performance</Lbl>
//               <div style={{ display: "flex", gap: 16 }}>
//                 <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: C.teal }}>24</div><div style={{ fontSize: 9, color: C.muted }}>Sessions</div></div>
//                 <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>30</div><div style={{ fontSize: 9, color: C.muted }}>Total Sessions</div></div>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={100}>
//               <BarChart data={weeklyPerf} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
//                 <XAxis dataKey="day" tick={{ fontSize: 9 }} />
//                 <YAxis tick={{ fontSize: 9 }} />
//                 <Tooltip />
//                 <Bar dataKey="sessions" fill={C.teal} radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//             <div style={{ marginTop: 12, padding: "12px 14px", background: "#F0FDF4", borderRadius: 10, border: `1px solid #A7F3D0`, display: "flex", gap: 12, alignItems: "center" }}>
//               <Avatar name="Julianne Moore" size={32} color={C.teal} />
//               <div>
//                 <div style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>Patient Highlight · Julianne Moore</div>
//                 <div style={{ fontSize: 10, color: C.mid, marginTop: 2, lineHeight: 1.4 }}>Feeling significantly more energetic since we adjusted the magnesium supplementation protocol. ⭐⭐⭐⭐⭐</div>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Active clinical workspace */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           <Card style={{ background: C.sidebar, border: "none" }}>
//             <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: 14 }}>
//               <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>⚡ Active Clinical Workspace</div>
//               <span style={{ fontSize: 9, background: "#D2EDD9", color: "#145528", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>Active Session</span>
//             </div>
//             {activeSession && (
//               <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginBottom: 12, padding: "8px 10px", background: "rgba(255,255,255,.06)", borderRadius: 8 }}>
//                 <div style={{ fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: 2 }}>{activeSession.patient}</div>
//                 {activeSession.phase}
//               </div>
//             )}
//             <div style={{ marginBottom: 12 }}>
//               <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Symptom Tracking</div>
//               <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} placeholder="Enter patient-reported symptoms…" rows={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 11, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
//             </div>
//             <div style={{ marginBottom: 12 }}>
//               <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Immediate Recommendations</div>
//               <textarea placeholder="List action items for the patient…" rows={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 11, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
//             </div>
//             <div style={{ marginBottom: 14 }}>
//               <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Detailed Clinical Assessment</div>
//               <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Patient reporting improved sleep quality following magnesium supplementation. Digestive symptom clusters continue to last month…" rows={4} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 11, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
//             </div>
//             <button onClick={finalize} disabled={finalizing} style={{ width: "100%", padding: "9px 0", borderRadius: 9, border: "none", background: C.accent, color: "#fff", fontSize: 12, fontWeight: 700, cursor: finalizing ? "not-allowed" : "pointer", opacity: finalizing ? .7 : 1 }}>
//               {finalizing ? "Saving…" : "✓ Complete & Finalize"}
//             </button>
//           </Card>
//         </div>
//       </div>

//       {/* Toasts */}
//       <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", maxWidth: 300 }}>
//         {toasts.map(t => (
//           <div key={t.id} style={{
//             padding: "10px 14px", borderRadius: 9, fontWeight: 600, fontSize: 11,
//             pointerEvents: "auto", boxShadow: "0 4px 20px rgba(0,0,0,.2)",
//             background: t.type === "error" ? C.danger : t.type === "info" ? C.sidebar : C.success,
//             color: "#fff",
//           }}>{t.msg}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════
// //  PAGE 3 — MEAL APPROVALS
// // ═══════════════════════════════════════════════════════════════════════════
// const urgentApprovals = [
//   {
//     id: 1, name: "Julianne Smith", plan: "Low Glycemic Plan",
//     emoji: "🥗", bg: "#D8ECC8",
//     macros: { carbs: "120g", protein: "360g", fiber: "90g" },
//     micros: { vitC: "300mg", zinc: "Zinc", iron: "18mg" },
//     tags: ["Diabetic", "Low GI"],
//   },
//   {
//     id: 2, name: "Marcus Van", plan: "High Micronutrient Focus",
//     emoji: "🥑", bg: "#F0D8C0",
//     macros: { carbs: "160g", protein: "285g", fiber: "70g" },
//     micros: { vitC: "400mg", zinc: "15mg", iron: "22mg" },
//     tags: ["Anti-Inflammatory", "High Protein"],
//   },
// ];

// const standardApprovals = [
//   { id: 3,  name: "Alice Ling",       plan: "Weight Management",          sub: "Intermittent Fasting, 16:8",                tags: ["Low Cal"],           days: 4 },
//   { id: 4,  name: "Roberto Garcia",   plan: "Renal Health",               sub: "Low Phosphorus, Controlled Protein (0.8g/kg)",tags: ["Low Protein"],       days: 2 },
//   { id: 5,  name: "Sarah Kim",        plan: "PCOS Nutrition",             sub: "Cycle Syncing Nutrition",                   tags: ["Hormone Support"],   days: 1 },
//   { id: 6,  name: "Daniel Osei",      plan: "Post-Surgery Recovery",      sub: "High Protein, Soft Foods Phase",            tags: ["High Protein"],      days: 3 },
//   { id: 7,  name: "Yuna Tanaka",      plan: "Sports Performance",         sub: "Periodized Carb Loading",                   tags: ["High Carb"],         days: 5 },
// ];

// function MealApprovals() {
//   const [priorityFilter, setPriority] = useState("All");
//   const [approved, setApproved]       = useState(new Set());
//   const [rejected, setRejected]       = useState(new Set());
//   const [serverPlans, setServerPlans] = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [loadError, setLoadError]     = useState("");
//   const [toasts, setToasts]           = useState([]);

//   const addToast = (msg, type = "success") => {
//     const id = Date.now() + Math.random();
//     setToasts(prev => [...prev, { id, msg, type }]);
//     setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
//   };

//   // Best-effort mapping from a server meal-plan record into the shape this
//   // page's cards expect. Field names (title/status/tags/macros/…) vary by
//   // backend — adjust the fallbacks below if your schema differs.
//   const emojiPalette = ["🥗", "🥑", "🍲", "🥦", "🍱", "🐟"];
//   const bgPalette    = ["#D8ECC8", "#F0D8C0", "#E8D8EC", "#F5E8C2", "#D8E8EC", "#ECD8D8"];
//   const normalizePlan = (mp, idx) => {
//     const status = (mp.status || "pending").toLowerCase();
//     const days = mp.dueInDays ?? (mp.dueDate ? Math.max(0, Math.ceil((new Date(mp.dueDate) - Date.now()) / 86400000)) : null);
//     return {
//       id: mp._id || mp.id,
//       _fromServer: true,
//       name: mp.patientName || mp.user?.name || mp.patient?.name || mp.userName || "Unnamed Patient",
//       plan: mp.title || mp.name || mp.planName || mp.type || "Meal Plan",
//       sub: mp.description || mp.notes || mp.goal || "",
//       emoji: emojiPalette[idx % emojiPalette.length],
//       bg: bgPalette[idx % bgPalette.length],
//       macros: mp.macros || mp.nutrition?.macros || {},
//       micros: mp.micros || mp.nutrition?.micros || {},
//       tags: Array.isArray(mp.tags) ? mp.tags : Array.isArray(mp.dietaryTags) ? mp.dietaryTags : [],
//       days,
//       urgent: mp.priority === "high" || mp.urgent === true || status === "urgent",
//       status,
//     };
//   };

//   // GET /api/v1/meal-plans — Admin/Nutritionist only
//   const fetchPlans = async () => {
//     setLoading(true);
//     setLoadError("");
//     try {
//       const data = await apiRequest("/meal-plans");
//       const list = extractList(data, "mealPlans");
//       const pending = list.filter(mp => {
//         const s = (mp.status || "pending").toLowerCase();
//         return !mp.status || ["pending", "submitted", "awaiting_review", "in_review"].includes(s);
//       });
//       setServerPlans(pending.map(normalizePlan));
//     } catch (err) {
//       setLoadError(err.message || "Could not reach the meal-plans API.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => { fetchPlans(); }, []);

//   // Fall back to the sample lists only if the server returned nothing (offline / no pending plans yet).
//   const urgentList   = serverPlans.length ? serverPlans.filter(p => p.urgent)  : urgentApprovals;
//   const standardList = serverPlans.length ? serverPlans.filter(p => !p.urgent) : standardApprovals;

//   // PATCH /api/v1/meal-plans/{id} — Admin/Nutritionist only
//   const approve = async a => {
//     setApproved(s => new Set([...s, a.id]));
//     setRejected(s => { const n = new Set(s); n.delete(a.id); return n; });
//     if (!a._fromServer) return;
//     try {
//       await apiRequest(`/meal-plans/${a.id}`, { method: "PATCH", body: { status: "approved" } });
//       addToast(`${a.name}'s plan approved.`);
//     } catch (err) {
//       addToast(err.message || "Approve failed — server unavailable.", "error");
//     }
//   };
//   const reject = async a => {
//     setRejected(s => new Set([...s, a.id]));
//     setApproved(s => { const n = new Set(s); n.delete(a.id); return n; });
//     if (!a._fromServer) return;
//     try {
//       await apiRequest(`/meal-plans/${a.id}`, { method: "PATCH", body: { status: "rejected" } });
//       addToast(`${a.name}'s plan declined.`, "info");
//     } catch (err) {
//       addToast(err.message || "Decline failed — server unavailable.", "error");
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <PageHeader
//         title="Meal Approval Queue"
//         sub="Review and finalize pending meal and food plans for your patients"
//         actions={[
//           <div key="f" style={{ display: "flex", gap: 6 }}>
//             {["All", "Urgent", "Standard"].map(f => <Pill key={f} active={priorityFilter === f} onClick={() => setPriority(f)}>{f}</Pill>)}
//           </div>,
//           <button key="r" onClick={fetchPlans} title="Refresh from server" style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", color: C.mid, fontSize: 13 }}>⟳</button>,
//         ]}
//       />

//       {loadError && (
//         <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FDDADA", border: `1px solid ${C.danger}33`, color: "#991B1B", fontSize: 11, marginBottom: 16 }}>
//           {loadError} — showing sample data below.
//         </div>
//       )}
//       {loading && (
//         <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>Loading pending plans from server…</div>
//       )}

//       {/* Urgent */}
//       {priorityFilter !== "Standard" && (
//         <div style={{ marginBottom: 20 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//             <Lbl>Urgent Requests</Lbl>
//             <Tag text={`${urgentList.length} Pending`} type="urgent" />
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             {urgentList.map(a => (
//               <Card key={a.id} style={{ border: approved.has(a.id) ? `1px solid ${C.success}` : rejected.has(a.id) ? `1px solid ${C.danger}` : `1px solid ${C.border}` }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
//                   <div>
//                     <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{a.name}</div>
//                     <Tag text={a.plan} type="orange" />
//                   </div>
//                   {approved.has(a.id) && <Tag text="Approved" type="success" />}
//                   {rejected.has(a.id) && <Tag text="Declined" type="danger" />}
//                 </div>
//                 <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
//                   <div style={{ background: a.bg, borderRadius: 10, height: 80, width: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>{a.emoji}</div>
//                   <div>
//                     {Object.keys(a.macros).length > 0 ? (
//                       <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//                         {Object.entries(a.macros).map(([k, v]) => (
//                           <div key={k} style={{ textAlign: "center" }}>
//                             <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{v}</div>
//                             <div style={{ fontSize: 9, color: C.muted, textTransform: "capitalize" }}>{k === "vitC" ? "Vit C" : k}</div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div style={{ fontSize: 10, color: C.muted, fontStyle: "italic", marginBottom: 8 }}>No macro breakdown available</div>
//                     )}
//                     {Object.keys(a.micros).length > 0 && (
//                       <div style={{ display: "flex", gap: 8 }}>
//                         {Object.entries(a.micros).map(([k, v]) => (
//                           <div key={k} style={{ textAlign: "center" }}>
//                             <div style={{ fontSize: 12, fontWeight: 700, color: C.mid }}>{v}</div>
//                             <div style={{ fontSize: 9, color: C.muted, textTransform: "capitalize" }}>{k === "vitC" ? "Vit C" : k}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
//                   {a.tags.map(t => <Tag key={t} text={t} type="sage" />)}
//                 </div>
//                 <div style={{ display: "flex", gap: 6 }}>
//                   <button onClick={() => approve(a)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", background: approved.has(a.id) ? C.success : C.teal, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
//                     {approved.has(a.id) ? "✓ Approved" : "Approve"}
//                   </button>
//                   <button style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.mid }}>Edit Plan</button>
//                   <button onClick={() => reject(a)} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${rejected.has(a.id) ? C.danger : C.border}`, background: rejected.has(a.id) ? "#FDDADA" : "none", fontSize: 12, cursor: "pointer", color: C.danger }}>✕</button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Standard */}
//       {priorityFilter !== "Urgent" && (
//         <div>
//           <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//             <Lbl>Standard Requests</Lbl>
//             <Tag text={`${standardList.length} Pending`} type="info" />
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {standardList.map((a, i) => (
//               <Card key={a.id} style={{ border: approved.has(a.id) ? `1px solid ${C.success}` : rejected.has(a.id) ? `1px solid ${C.danger}` : `1px solid ${C.border}` }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                   <Avatar name={a.name} size={36} color={avColors[i % avColors.length]} />
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{a.name}</div>
//                     <div style={{ fontSize: 11, fontWeight: 600, color: C.mid }}>{a.plan}</div>
//                     <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{a.sub}</div>
//                   </div>
//                   <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
//                     {a.tags.map(t => <Tag key={t} text={t} type="lavender" />)}
//                     {a.days != null && <Tag text={`Due in ${a.days}d`} type={a.days <= 2 ? "warning" : "default"} />}
//                   </div>
//                   <div style={{ display: "flex", gap: 5 }}>
//                     <button onClick={() => approve(a)} style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: approved.has(a.id) ? C.success : C.teal, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
//                       {approved.has(a.id) ? "✓" : "Approve"}
//                     </button>
//                     <button onClick={() => reject(a)} style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${rejected.has(a.id) ? C.danger : C.border}`, background: rejected.has(a.id) ? "#FDDADA" : "none", fontSize: 10, cursor: "pointer", color: C.danger }}>Decline</button>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Toasts */}
//       <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", maxWidth: 300 }}>
//         {toasts.map(t => (
//           <div key={t.id} style={{
//             padding: "10px 14px", borderRadius: 9, fontWeight: 600, fontSize: 11,
//             pointerEvents: "auto", boxShadow: "0 4px 20px rgba(0,0,0,.2)",
//             background: t.type === "error" ? C.danger : t.type === "info" ? C.sidebar : C.success,
//             color: "#fff",
//           }}>{t.msg}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════
// //  PAGE 4 — ANALYTICS
// // ═══════════════════════════════════════════════════════════════════════════
// const glucoseTrend = [
//   { month: "May", avg: 108 }, { month: "Jun", avg: 104 },
//   { month: "Jul", avg: 100 }, { month: "Aug", avg: 99  },
//   { month: "Sep", avg: 97  }, { month: "Oct", avg: 95  },
// ];
// const outcomesData = [
//   { range: "65-70", improved: 14 }, { range: "71-80", improved: 22 },
//   { range: "81-90", improved: 31 }, { range: "91-100", improved: 18 },
//   { range: "101+",  improved: 8  },
// ];

// function Analytics() {
//   return (
//     <div>
//       <PageHeader title="Analytics" sub="Patient outcomes, trends, and practice performance" />
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
//         {[
//           { label: "Avg BMI Reduction",   value: "−1.8",  sub: "Last 90 days", color: C.teal   },
//           { label: "Glucose Improvement", value: "−13%",  sub: "Avg across cohort", color: C.sage },
//           { label: "Plan Adherence",      value: "78%",   sub: "Patient reported", color: C.accent },
//           { label: "Consults This Month", value: "94",    sub: "vs 81 last month", color: C.info  },
//         ].map(s => (
//           <Card key={s.label} style={{ textAlign: "center" }}>
//             <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
//             <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>{s.label}</div>
//             <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontStyle: "italic" }}>{s.sub}</div>
//           </Card>
//         ))}
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//         <Card>
//           <Lbl>Average Glucose Trend — All Patients</Lbl>
//           <ResponsiveContainer width="100%" height={180}>
//             <LineChart data={glucoseTrend}>
//               <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
//               <XAxis dataKey="month" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} domain={[90, 115]} />
//               <Tooltip />
//               <Line type="monotone" dataKey="avg" stroke={C.teal} strokeWidth={2.5} dot={{ r: 4, fill: C.teal }} name="Avg Glucose" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//         <Card>
//           <Lbl>Patient Outcomes by Age Range</Lbl>
//           <ResponsiveContainer width="100%" height={180}>
//             <BarChart data={outcomesData}>
//               <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
//               <XAxis dataKey="range" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} />
//               <Tooltip />
//               <Bar dataKey="improved" fill={C.accent} radius={[4, 4, 0, 0]} name="Improved" />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 14 }}>
//         {[
//           { label: "Most Effective Plan",     value: "Low Glycemic + IF",        sub: "72% patient success rate",    type: "success" },
//           { label: "Most Common Condition",   value: "Type 2 Diabetes",          sub: "38% of active patient base",   type: "warning" },
//           { label: "Highest Adherence Diet",  value: "Mediterranean Protocol",   sub: "4.6 / 5 patient satisfaction", type: "info"    },
//         ].map(i => (
//           <Card key={i.label}>
//             <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".06em" }}>{i.label}</div>
//             <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{i.value}</div>
//             <Tag text={i.sub} type={i.type} />
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════
// //  ROOT APP
// // ═══════════════════════════════════════════════════════════════════════════
// export default function ClinicalNutritionist() {
//   const [active, setActive] = useState("patients");
//   const PAGES = {
//     patients:      <Patients />,
//     consultations: <Consultations />,
//     meals:         <MealApprovals />,
//     analytics:     <Analytics />,
//   };
//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: C.bg }}>
//       <Sidebar active={active} setActive={setActive} />
//       <main style={{ marginLeft: 192, flex: 1, overflowY: "auto", padding: "22px 26px" }}>
//         {PAGES[active]}
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";

// ─── Dine with Mee API config ────────────────────────────────────────────────
// Live backend — see https://new-dine-with-mee-backend-z7it.onrender.com/api-docs
const API_BASE = "https://new-dine-with-mee-backend-z7it.onrender.com/api/v1";

// "Meal Plans" + "Meals" + "Health Profiles / Health Assessments / Health
// Progress" routes here are Admin/Nutritionist-only and need a Bearer token.
// Adjust this key if your login flow stores the token elsewhere.
const AUTH_TOKEN_KEY = "authToken";
function getAuthToken() {
  try { return localStorage.getItem(AUTH_TOKEN_KEY) || ""; } catch { return ""; }
}

// Shared axios instance for this file. Every call in this component
// (including the Health Profiles / Health Assessments / Health Progress
// routes added below) goes through this instance so the Bearer token and
// base URL stay consistent.
const axiosClient = axios.create({ baseURL: API_BASE });
axiosClient.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

async function apiRequest(path, { method = "GET", body } = {}) {
  try {
    const res = await axiosClient.request({ url: path, method, data: body });
    return res.data;
  } catch (err) {
    const res = err.response;
    const msg = res?.data?.message || res?.data?.error || err.message || `Request failed${res ? ` (${res.status})` : ""}`;
    throw new Error(msg);
  }
}

// Normalizes whatever shape the backend wraps a list/object in.
function extractList(data, key) {
  if (Array.isArray(data)) return data;
  if (key && Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  if (key && Array.isArray(data?.data?.[key])) return data.data[key];
  return [];
}
function extractObj(data, key) {
  return (key && data?.[key]) || data?.data || data || null;
}

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  sidebar:  "#172517",
  sidebarA: "#233122",
  accent:   "#D96F45",
  teal:     "#2A9E82",
  bg:       "#F1EDE5",
  card:     "#FFFFFF",
  dark:     "#1A1A1A",
  mid:      "#4B5563",
  muted:    "#8E939C",
  border:   "#E4DDD5",
  success:  "#1E7845",
  warning:  "#B87010",
  danger:   "#B82020",
  info:     "#1A52A0",
  sage:     "#346644",
  lavender: "#6856A6",
};

const NAV = [
  { id: "patients",      label: "Patients",       icon: "👤" },
  { id: "consultations", label: "Consultations",  icon: "📅" },
  { id: "meals",         label: "Meal Approvals", icon: "🥗" },
  { id: "analytics",     label: "Analytics",      icon: "📊" },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.card, borderRadius: 12, padding: "16px 18px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,.05)", ...style }}>
      {children}
    </div>
  );
}

function Tag({ text, type = "default" }) {
  const map = {
    default:  { bg: "#F0EDE8", color: C.mid },
    success:  { bg: "#D2EDD9", color: "#145528" },
    warning:  { bg: "#FEF3C7", color: "#92400E" },
    danger:   { bg: "#FDDADA", color: "#991B1B" },
    info:     { bg: "#DBEAFE", color: "#1E3A8A" },
    teal:     { bg: "#CCFBF1", color: "#0F5147" },
    sage:     { bg: "#D4EAD8", color: "#224D2C" },
    orange:   { bg: "#FEE8D8", color: "#9A3B13" },
    lavender: { bg: "#EDE9FE", color: "#4C3F90" },
    urgent:   { bg: "#FDDADA", color: "#991B1B" },
  };
  const s = map[type] || map.default;
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: ".03em" }}>
      {text}
    </span>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
      background: active ? C.dark : C.border, color: active ? "#fff" : C.muted, transition: "all .12s",
    }}>{children}</button>
  );
}

function Lbl({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 12 }}>{children}</div>;
}

function PageHeader({ title, sub, actions }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>{actions}</div>
    </div>
  );
}

function Avatar({ name, size = 28, color = C.teal }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
      {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, style = {} }) {
  const styles = {
    primary:  { background: C.accent,   color: "#fff",  border: "none" },
    secondary:{ background: C.card,     color: C.mid,   border: `1px solid ${C.border}` },
    teal:     { background: C.teal,     color: "#fff",  border: "none" },
    ghost:    { background: "transparent", color: C.mid, border: `1px solid ${C.border}` },
    sage:     { background: C.sage,     color: "#fff",  border: "none" },
  };
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
      ...styles[variant], ...style,
    }}>{children}</button>
  );
}

// Food visual placeholder
function FoodThumb({ emoji, bg, size = 80 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.45, flexShrink: 0 }}>
      {emoji}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 192, background: C.sidebar, display: "flex", flexDirection: "column",
      height: "100vh", position: "fixed", left: 0, top: 0, zIndex: 20,
    }}>
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🥗</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 11, color: "#fff", lineHeight: 1.2 }}>Dine With Mee</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Clinical</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "8px 6px" }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
            padding: "7px 10px", borderRadius: 7, border: "none", cursor: "pointer",
            textAlign: "left", marginBottom: 1,
            background: active === item.id ? C.sidebarA : "transparent",
            color: active === item.id ? "#fff" : "rgba(255,255,255,.5)",
            fontSize: 11, fontWeight: active === item.id ? 600 : 400, transition: "all .12s",
          }}>
            <span style={{ fontSize: 13, width: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        {[{ icon: "⚙️", label: "Settings" }, { icon: "💬", label: "Support" }].map(b => (
          <button key={b.label} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,.4)", fontSize: 11, marginBottom: 1 }}>
            <span style={{ fontSize: 12 }}>{b.icon}</span>{b.label}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", marginTop: 4, borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <Avatar name="Elena Rossi" size={26} color={C.accent} />
          <div><div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>Dr. Elena Rossi</div><div style={{ fontSize: 9, color: "rgba(255,255,255,.35)" }}>Clinical Nutritionist</div></div>
        </div>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 1 — PATIENTS  (list → patient detail)
// ═══════════════════════════════════════════════════════════════════════════
// NOTE: `userId` below should be the patient's real backend user _id (as
// returned by GET /api/v1/users or GET /api/v1/health-profiles). These are
// placeholders — wire them up to whatever id your patient list / search
// actually loads from the server once that endpoint is connected.
const patientList = [
  { id: 1, userId: "1", name: "Julianne Moore",   age: 42, condition: "Type 2 Diabetes Management",  status: "Active",   risk: "low",    lastSeen: "Today 9:15",   diet: "Low Carb" },
  { id: 2, userId: "2", name: "Marcus Chan",      age: 36, condition: "Weight Management",            status: "Approved", risk: "medium", lastSeen: "Yesterday",    diet: "High Protein" },
  { id: 3, userId: "3", name: "Linda Thompson",   age: 51, condition: "Post-Op Recovery Diet",        status: "Pending",  risk: "low",    lastSeen: "2 days ago",   diet: "Low Sodium" },
  { id: 4, userId: "4", name: "David Greene",     age: 29, condition: "Sports Performance Nutrition", status: "Approved", risk: "low",    lastSeen: "3 days ago",   diet: "High Protein" },
  { id: 5, userId: "5", name: "Sarah Jackson",    age: 44, condition: "Chronic Inflammation & Diet", status: "Active",   risk: "high",   lastSeen: "Today 9:15",   diet: "Anti-Inflammatory" },
  { id: 6, userId: "6", name: "Emily Thorne",     age: 38, condition: "PCOS Nutrition Management",   status: "Active",   risk: "medium", lastSeen: "Yesterday",    diet: "Low GI" },
];

const glucoseData = [
  { day: "Mon", avg: 102, target: 98 }, { day: "Tue", avg: 95, target: 98 },
  { day: "Wed", avg: 108, target: 98 }, { day: "Thu", avg: 92, target: 98 },
  { day: "Fri", avg: 99, target: 98 },  { day: "Sat", avg: 96, target: 98 },
  { day: "Sun", avg: 94, target: 98 },
];

const clinicalNotes = [
  { date: "Today 10:12",   title: "Review of Julianne Metrics", body: "Weight loss 2.3kg. Blood sugar stabilisation observed last 7 days. Recommend sticking to…" },
  { date: "Oct 9 2024",    title: "Monthly Consultation",       body: "Discussed emotional eating triggers. Set action items for meal prep work week…" },
  { date: "Aug 14 2024",   title: "Initial Onboarding",         body: "Patient goals captured. Sustainable calorie deficit without fatigue…" },
];

const mealPlan = [
  { emoji: "🥑", bg: "#D8ECC8", name: "Avocado & Poached Egg",  tags: ["Diabetic", "Low Carb"],    cals: 420 },
  { emoji: "🌾", bg: "#F5E8C2", name: "Quinoa Power Bowl",       tags: ["Diabetic", "High Protein"],cals: 510 },
  { emoji: "🫐", bg: "#E8D8EC", name: "Berry Greek Yogurt",      tags: ["Diabetic", "Probiotic"],   cals: 290 },
  { emoji: "🐟", bg: "#F0D8C0", name: "Wild Seared Salmon",      tags: ["Diabetic", "Omega-3"],     cals: 480 },
];

const avColors = [C.teal, C.accent, C.sage, C.lavender, "#C07010", C.info];

// ─── Health data helpers (Health Profiles / Health Assessments / Health Progress) ───
// Best-effort normalization: field names are guessed from common shapes and
// fall back gracefully. Adjust the fallbacks below once you confirm the
// exact response schemas from the Swagger docs.
function normalizeHealthProfile(hp) {
  if (!hp) return null;
  return {
    id: hp._id || hp.id,
    bmi: hp.bmi ?? hp.bodyMetrics?.bmi ?? null,
    bmiCategory: hp.bmiCategory || hp.bodyMetrics?.bmiCategory || "",
    weight: hp.weight ?? hp.bodyMetrics?.weight ?? null,
    height: hp.height ?? hp.bodyMetrics?.height ?? null,
    bloodPressure: hp.bloodPressure || hp.vitals?.bloodPressure || null,
    allergies: hp.allergies || hp.dietaryRestrictions?.allergies || [],
    conditions: hp.medicalConditions || hp.conditions || [],
    goals: hp.nutritionalGoals || hp.goals || null,
  };
}
function normalizeAssessment(a) {
  if (!a) return null;
  return {
    id: a._id || a.id,
    date: a.createdAt || a.date || a.assessmentDate,
    sleepScore: a.sleepScore ?? a.lifestyle?.sleepScore ?? null,
    riskLevel: a.riskLevel || a.riskCategory || "",
    summary: a.summary || a.notes || "",
  };
}
function normalizeProgressLog(p) {
  return {
    id: p._id || p.id,
    date: p.date || p.loggedAt || p.createdAt,
    glucose: p.glucose ?? p.metrics?.glucose ?? p.bloodGlucose ?? null,
    weight: p.weight ?? p.metrics?.weight ?? null,
  };
}

function PatientDetail({ patient, onBack }) {
  const [healthProfile, setHealthProfile] = useState(null);
  const [assessment, setAssessment]       = useState(null);
  const [progressLogs, setProgressLogs]   = useState([]);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthError, setHealthError]     = useState("");

  // Pull this patient's Health Profile, latest Health Assessment, and Health
  // Progress history — Admin/Nutritionist-only routes keyed by userId:
  //   GET /health-profiles/user/{userId}
  //   GET /health-assessments/user/{userId}
  //   GET /health-progress/user/{userId}
  useEffect(() => {
    let cancelled = false;
    const userId = patient.userId || patient.id;
    async function loadHealthData() {
      setHealthLoading(true);
      setHealthError("");
      try {
        const [profileRes, assessmentsRes, progressRes] = await Promise.allSettled([
          apiRequest(`/health-profiles/user/${userId}`),
          apiRequest(`/health-assessments/user/${userId}`),
          apiRequest(`/health-progress/user/${userId}`),
        ]);
        if (cancelled) return;

        if (profileRes.status === "fulfilled") {
          setHealthProfile(normalizeHealthProfile(extractObj(profileRes.value, "healthProfile")));
        } else {
          setHealthProfile(null);
        }

        if (assessmentsRes.status === "fulfilled") {
          const list = extractList(assessmentsRes.value, "assessments").map(normalizeAssessment);
          list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
          setAssessment(list[0] || null);
        } else {
          setAssessment(null);
        }

        if (progressRes.status === "fulfilled") {
          const list = extractList(progressRes.value, "progressLogs").map(normalizeProgressLog);
          setProgressLogs(list);
        } else {
          setProgressLogs([]);
        }

        if ([profileRes, assessmentsRes, progressRes].every(r => r.status === "rejected")) {
          setHealthError("Could not reach the health data API — showing sample data below.");
        }
      } finally {
        if (!cancelled) setHealthLoading(false);
      }
    }
    loadHealthData();
    return () => { cancelled = true; };
  }, [patient.userId, patient.id]);

  // Build the glucose-trend chart from real progress logs when available,
  // falling back to the sample glucoseData otherwise.
  const glucoseChartData = progressLogs.length
    ? progressLogs
        .filter(p => p.glucose != null)
        .map(p => ({
          day: p.date ? new Date(p.date).toLocaleDateString([], { weekday: "short" }) : "—",
          avg: p.glucose,
          target: 98,
        }))
    : glucoseData;

  const statTiles = [
    {
      label: "BMI Index",
      value: healthProfile?.bmi != null ? String(healthProfile.bmi) : "24.2",
      sub: healthProfile?.bmiCategory || "Normal",
      color: C.teal,
    },
    {
      label: "Avg Blood Glucose",
      value: progressLogs.length && glucoseChartData.length
        ? String(Math.round(glucoseChartData.reduce((s, d) => s + (d.avg || 0), 0) / glucoseChartData.length))
        : "98",
      sub: "mg/dL",
      color: C.sage,
    },
    {
      label: "Blood Pressure",
      value: healthProfile?.bloodPressure || "82",
      sub: healthProfile?.bloodPressure ? "" : "OPTIMAL",
      color: C.info,
    },
    {
      label: "Sleep Score",
      value: assessment?.sleepScore != null ? String(assessment.sleepScore) : "8.2",
      sub: assessment?.riskLevel || "OPTIMAL",
      color: C.lavender,
    },
  ];

  return (
    <div>
      {/* Patient header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, fontSize: 11, cursor: "pointer", color: C.muted }}>← Back</button>
          <Avatar name={patient.name} size={44} color={C.accent} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.dark }}>{patient.name}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{patient.age} yrs · {patient.condition} · Patient since 2022</div>
          </div>
          <Tag text={patient.status} type={patient.status === "Active" ? "teal" : patient.status === "Approved" ? "success" : "warning"} />
          {healthProfile?.allergies?.length > 0 && <Tag text={`⚠ Allergies: ${healthProfile.allergies.join(", ")}`} type="danger" />}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary">✉ Message Patient</Btn>
          <Btn variant="accent" style={{ background: C.accent, color: "#fff" }}>＋ Open New Plan</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
        <div>
          {/* Health stats — GET /health-profiles/user/{userId}, /health-assessments/user/{userId}, /health-progress/user/{userId} */}
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <Lbl>Health Stats</Lbl>
              <span style={{ fontSize: 10, color: C.muted }}>
                {healthLoading ? "Loading…" : healthProfile ? "Live data" : "Last 30 days"}
              </span>
            </div>
            {healthError && (
              <div style={{ padding: "8px 10px", borderRadius: 8, background: "#FDDADA", color: "#991B1B", fontSize: 10, marginBottom: 12 }}>
                {healthError}
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
              {statTiles.map(stat => (
                <div key={stat.label} style={{ padding: "12px", background: C.bg, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  {stat.sub && <div style={{ fontSize: 9, fontWeight: 700, color: stat.color, textTransform: "uppercase", letterSpacing: ".06em", marginTop: 3 }}>{stat.sub}</div>}
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Glucose trend chart — from GET /health-progress/user/{userId} when available */}
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 10 }}>Blood Sugar Trends</div>
            <ResponsiveContainer width="100%" height={130}>
              <LineChart data={glucoseChartData} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} domain={[80, 120]} />
                <Tooltip />
                <Line type="monotone" dataKey="avg"    stroke={C.teal}   strokeWidth={2} dot={{ r: 3 }} name="This Avg"    />
                <Line type="monotone" dataKey="target" stroke={C.border} strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Current meal plan */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <Lbl>Current Meal Plan</Lbl>
                <div style={{ fontSize: 10, color: C.muted, marginTop: -8, marginBottom: 8 }}>Phase 2: Metabolic Optimization</div>
              </div>
              <Tag text="Approved" type="success" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {mealPlan.map((m, i) => (
                <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ background: m.bg, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{m.emoji}</div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.dark, marginBottom: 4, lineHeight: 1.3 }}>{m.name}</div>
                    <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 4 }}>
                      {m.tags.map(t => <Tag key={t} text={t} type="sage" />)}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>{m.cals} kcal</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Clinical notes */}
        <Card style={{ alignSelf: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Lbl>Clinical Notes</Lbl>
            <button style={{ fontSize: 18, border: "none", background: "none", cursor: "pointer", color: C.muted }}>⊕</button>
          </div>
          {clinicalNotes.map((note, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: i < clinicalNotes.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontSize: 9, color: C.muted, marginBottom: 3, textTransform: "uppercase", letterSpacing: ".06em" }}>{note.date}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 5 }}>{note.title}</div>
              <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{note.body}</div>
            </div>
          ))}
          <button style={{ width: "100%", marginTop: 12, padding: "7px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.muted }}>View All Notes</button>
        </Card>
      </div>
    </div>
  );
}

function Patients() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  if (selected) return <PatientDetail patient={selected} onBack={() => setSelected(null)} />;
  const filtered = patientList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <PageHeader
        title="Patients"
        sub="124 active patients · 18 pending approvals"
        actions={[
          <input key="s" placeholder="🔍 Search patients…" value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 11, outline: "none", width: 200 }} />,
          <Btn key="n" variant="teal">＋ New Consultation</Btn>,
        ]}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {filtered.map((p, i) => (
          <Card key={p.id} style={{ cursor: "pointer", transition: "box-shadow .15s" }} onClick={() => setSelected(p)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Avatar name={p.name} size={38} color={avColors[i % avColors.length]} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{p.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{p.age} yrs · Last seen {p.lastSeen}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: C.mid, marginBottom: 10, lineHeight: 1.4 }}>{p.condition}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              <Tag text={p.diet} type="sage" />
              <Tag text={p.status} type={p.status === "Active" ? "teal" : p.status === "Approved" ? "success" : "warning"} />
              {p.risk === "high" && <Tag text="High Risk" type="urgent" />}
            </div>
            <button onClick={e => { e.stopPropagation(); setSelected(p); }} style={{ width: "100%", padding: "6px 0", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.mid, fontWeight: 600 }}>View Profile →</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 2 — CONSULTATIONS
// ═══════════════════════════════════════════════════════════════════════════
const sessions = [
  { time: "10:00", end: "10:45", patient: "Julianne Mitchell", phase: "Chronic Inflammation & Diet", type: "Live Video",           tag: "Priority Patient", color: C.accent,   emoji: "🎥" },
  { time: "10:35", end: "11:10", patient: "Arthur Morgan",     phase: "Post-Op Recovery Diet",       type: "Session",              tag: "Session 4/12",     color: C.teal,     emoji: "📋" },
  { time: "11:00", end: "11:30", patient: "Emily Thorne",      phase: "PCOS Nutrition",              type: "Initial Consultation", tag: "New Patient",      color: C.sage,     emoji: "🌱" },
  { time: "11:45", end: "12:15", patient: "James Wilson",      phase: "Low Profile Recovery Diet",   type: "Session",              tag: "Session 2/8",      color: C.lavender, emoji: "📋" },
];

const weeklyPerf = [
  { day: "Mon", sessions: 6 }, { day: "Tue", sessions: 8 },
  { day: "Wed", sessions: 5 }, { day: "Thu", sessions: 9 },
  { day: "Fri", sessions: 6 }, { day: "Sat", sessions: 2 },
];

function Consultations() {
  const [view, setView]           = useState("daily");
  const [activeSession, setActiveSession] = useState(sessions[0]);
  const [notes, setNotes]          = useState("");
  const [symptoms, setSymptoms]    = useState("");
  const [serverSessions, setServerSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const [finalizing, setFinalizing] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // Best-effort mapping from a server consultation record into this page's
  // session-card shape. Adjust the fallbacks below if your schema differs.
  const palette      = [C.accent, C.teal, C.sage, C.lavender];
  const emojiPalette = ["🎥", "📋", "🌱", "📋"];
  const normalizeSession = (c, idx) => {
    const start = c.scheduledAt || c.startTime || c.date;
    let time = "—", end = "";
    if (start) {
      const d = new Date(start);
      if (!isNaN(d)) {
        time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (c.endTime) {
          const ed = new Date(c.endTime);
          if (!isNaN(ed)) end = ed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
      }
    }
    return {
      id: c._id || c.id,
      _fromServer: true,
      time, end,
      patient: c.patientName || c.patient?.name || c.user?.name || "Patient",
      phase: c.phase || c.focus || c.reason || c.type || "Consultation",
      type: c.consultationType || c.type || "Session",
      tag: c.isNewPatient ? "New Patient" : c.priority === "high" ? "Priority Patient" : `Status: ${c.status || "scheduled"}`,
      color: palette[idx % palette.length],
      emoji: emojiPalette[idx % emojiPalette.length],
      status: c.status || "scheduled",
    };
  };

  // GET /api/v1/consultations/upcoming
  const fetchSessions = async () => {
    setLoadingSessions(true);
    setSessionError("");
    try {
      const data = await apiRequest("/consultations/upcoming");
      const list = extractList(data, "consultations").map(normalizeSession);
      setServerSessions(list);
      if (list.length) setActiveSession(list[0]);
    } catch (err) {
      setSessionError(err.message || "Could not reach the consultations API.");
    } finally {
      setLoadingSessions(false);
    }
  };
  useEffect(() => { fetchSessions(); }, []);

  const displaySessions = serverSessions.length ? serverSessions : sessions;

  // POST /api/v1/consultations/{id}/review  +  PATCH /api/v1/consultations/{id}/status
  const finalize = async () => {
    if (!activeSession) return;
    if (!activeSession._fromServer) {
      addToast("Saved locally (sample session — not synced to server).", "info");
      return;
    }
    setFinalizing(true);
    try {
      await apiRequest(`/consultations/${activeSession.id}/review`, { method: "POST", body: { notes, symptoms } });
      await apiRequest(`/consultations/${activeSession.id}/status`, { method: "PATCH", body: { status: "completed" } });
      addToast("Consultation finalized and saved.");
      setNotes(""); setSymptoms("");
      fetchSessions();
    } catch (err) {
      addToast(err.message || "Could not save — server unavailable.", "error");
    } finally {
      setFinalizing(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <PageHeader
        title="Clinical Management"
        sub="Manage your clinical sessions and patient progress"
        actions={[
          <div key="tabs" style={{ display: "flex", background: "#E8E4DC", padding: 3, borderRadius: 8 }}>
            {["daily", "weekly"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                background: view === v ? C.card : "transparent",
                color: view === v ? C.dark : C.muted, fontSize: 11, fontWeight: view === v ? 600 : 400,
                textTransform: "capitalize",
              }}>{v}</button>
            ))}
          </div>,
          <button key="r" onClick={fetchSessions} title="Refresh from server" style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", color: C.mid, fontSize: 13 }}>⟳</button>,
          <Btn key="n" variant="teal">＋ New Consultation</Btn>,
        ]}
      />

      {sessionError && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FDDADA", border: `1px solid ${C.danger}33`, color: "#991B1B", fontSize: 11, marginBottom: 14 }}>
          {sessionError} — showing sample sessions below.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
        <div>
          {/* Date header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", fontSize: 12, color: C.muted }}>‹</button>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Today, October 24</div>
            <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", fontSize: 12, color: C.muted }}>›</button>
            <Tag text={loadingSessions ? "Loading…" : `${displaySessions.length} sessions today`} type="info" />
          </div>

          {/* Session cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {displaySessions.map((s, i) => (
              <div key={s.id || i} onClick={() => setActiveSession(s)} style={{
                background: C.card, borderRadius: 12, padding: "14px 16px",
                border: `1px solid ${activeSession === s ? s.color : C.border}`,
                cursor: "pointer", transition: "border .12s",
                boxShadow: activeSession === s ? `0 0 0 2px ${s.color}22` : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ textAlign: "center", minWidth: 44 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{s.time}</div>
                      <div style={{ fontSize: 9, color: C.muted }}>– {s.end}</div>
                    </div>
                    <div style={{ width: 1, background: s.color, alignSelf: "stretch", marginRight: 4, borderRadius: 2 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{s.patient}</div>
                      <div style={{ fontSize: 11, color: C.mid, marginBottom: 6 }}>Phase: {s.phase}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Tag text={s.type} type={s.type === "Live Video" ? "orange" : s.type === "Initial Consultation" ? "sage" : "info"} />
                        <Tag text={s.tag} type={s.tag === "Priority Patient" ? "urgent" : "default"} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "5px 10px", borderRadius: 7, border: "none", background: s.color, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
                      {s.emoji} {s.type === "Live Video" ? "Join" : "Start"}
                    </button>
                    <button style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", fontSize: 10, cursor: "pointer", color: C.muted }}>Quick Record</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly performance — sample chart (no confirmed /consultations/stats shape to map yet) */}
          <Card style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <Lbl>Weekly Performance</Lbl>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: C.teal }}>24</div><div style={{ fontSize: 9, color: C.muted }}>Sessions</div></div>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>30</div><div style={{ fontSize: 9, color: C.muted }}>Total Sessions</div></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={weeklyPerf} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="sessions" fill={C.teal} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 12, padding: "12px 14px", background: "#F0FDF4", borderRadius: 10, border: `1px solid #A7F3D0`, display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar name="Julianne Moore" size={32} color={C.teal} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>Patient Highlight · Julianne Moore</div>
                <div style={{ fontSize: 10, color: C.mid, marginTop: 2, lineHeight: 1.4 }}>Feeling significantly more energetic since we adjusted the magnesium supplementation protocol. ⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active clinical workspace */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ background: C.sidebar, border: "none" }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>⚡ Active Clinical Workspace</div>
              <span style={{ fontSize: 9, background: "#D2EDD9", color: "#145528", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>Active Session</span>
            </div>
            {activeSession && (
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginBottom: 12, padding: "8px 10px", background: "rgba(255,255,255,.06)", borderRadius: 8 }}>
                <div style={{ fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: 2 }}>{activeSession.patient}</div>
                {activeSession.phase}
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Symptom Tracking</div>
              <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} placeholder="Enter patient-reported symptoms…" rows={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 11, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Immediate Recommendations</div>
              <textarea placeholder="List action items for the patient…" rows={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 11, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Detailed Clinical Assessment</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Patient reporting improved sleep quality following magnesium supplementation. Digestive symptom clusters continue to last month…" rows={4} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 11, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
            </div>
            <button onClick={finalize} disabled={finalizing} style={{ width: "100%", padding: "9px 0", borderRadius: 9, border: "none", background: C.accent, color: "#fff", fontSize: 12, fontWeight: 700, cursor: finalizing ? "not-allowed" : "pointer", opacity: finalizing ? .7 : 1 }}>
              {finalizing ? "Saving…" : "✓ Complete & Finalize"}
            </button>
          </Card>
        </div>
      </div>

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", maxWidth: 300 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: "10px 14px", borderRadius: 9, fontWeight: 600, fontSize: 11,
            pointerEvents: "auto", boxShadow: "0 4px 20px rgba(0,0,0,.2)",
            background: t.type === "error" ? C.danger : t.type === "info" ? C.sidebar : C.success,
            color: "#fff",
          }}>{t.msg}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 3 — MEAL APPROVALS
// ═══════════════════════════════════════════════════════════════════════════
const urgentApprovals = [
  {
    id: 1, name: "Julianne Smith", plan: "Low Glycemic Plan",
    emoji: "🥗", bg: "#D8ECC8",
    macros: { carbs: "120g", protein: "360g", fiber: "90g" },
    micros: { vitC: "300mg", zinc: "Zinc", iron: "18mg" },
    tags: ["Diabetic", "Low GI"],
  },
  {
    id: 2, name: "Marcus Van", plan: "High Micronutrient Focus",
    emoji: "🥑", bg: "#F0D8C0",
    macros: { carbs: "160g", protein: "285g", fiber: "70g" },
    micros: { vitC: "400mg", zinc: "15mg", iron: "22mg" },
    tags: ["Anti-Inflammatory", "High Protein"],
  },
];

const standardApprovals = [
  { id: 3,  name: "Alice Ling",       plan: "Weight Management",          sub: "Intermittent Fasting, 16:8",                tags: ["Low Cal"],           days: 4 },
  { id: 4,  name: "Roberto Garcia",   plan: "Renal Health",               sub: "Low Phosphorus, Controlled Protein (0.8g/kg)",tags: ["Low Protein"],       days: 2 },
  { id: 5,  name: "Sarah Kim",        plan: "PCOS Nutrition",             sub: "Cycle Syncing Nutrition",                   tags: ["Hormone Support"],   days: 1 },
  { id: 6,  name: "Daniel Osei",      plan: "Post-Surgery Recovery",      sub: "High Protein, Soft Foods Phase",            tags: ["High Protein"],      days: 3 },
  { id: 7,  name: "Yuna Tanaka",      plan: "Sports Performance",         sub: "Periodized Carb Loading",                   tags: ["High Carb"],         days: 5 },
];

function MealApprovals() {
  const [priorityFilter, setPriority] = useState("All");
  const [approved, setApproved]       = useState(new Set());
  const [rejected, setRejected]       = useState(new Set());
  const [serverPlans, setServerPlans] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [loadError, setLoadError]     = useState("");
  const [toasts, setToasts]           = useState([]);

  const addToast = (msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // Best-effort mapping from a server meal-plan record into the shape this
  // page's cards expect. Field names (title/status/tags/macros/…) vary by
  // backend — adjust the fallbacks below if your schema differs.
  const emojiPalette = ["🥗", "🥑", "🍲", "🥦", "🍱", "🐟"];
  const bgPalette    = ["#D8ECC8", "#F0D8C0", "#E8D8EC", "#F5E8C2", "#D8E8EC", "#ECD8D8"];
  const normalizePlan = (mp, idx) => {
    const status = (mp.status || "pending").toLowerCase();
    const days = mp.dueInDays ?? (mp.dueDate ? Math.max(0, Math.ceil((new Date(mp.dueDate) - Date.now()) / 86400000)) : null);
    return {
      id: mp._id || mp.id,
      _fromServer: true,
      name: mp.patientName || mp.user?.name || mp.patient?.name || mp.userName || "Unnamed Patient",
      plan: mp.title || mp.name || mp.planName || mp.type || "Meal Plan",
      sub: mp.description || mp.notes || mp.goal || "",
      emoji: emojiPalette[idx % emojiPalette.length],
      bg: bgPalette[idx % bgPalette.length],
      macros: mp.macros || mp.nutrition?.macros || {},
      micros: mp.micros || mp.nutrition?.micros || {},
      tags: Array.isArray(mp.tags) ? mp.tags : Array.isArray(mp.dietaryTags) ? mp.dietaryTags : [],
      days,
      urgent: mp.priority === "high" || mp.urgent === true || status === "urgent",
      status,
    };
  };

  // GET /api/v1/meal-plans — Admin/Nutritionist only
  const fetchPlans = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await apiRequest("/meal-plans");
      const list = extractList(data, "mealPlans");
      const pending = list.filter(mp => {
        const s = (mp.status || "pending").toLowerCase();
        return !mp.status || ["pending", "submitted", "awaiting_review", "in_review"].includes(s);
      });
      setServerPlans(pending.map(normalizePlan));
    } catch (err) {
      setLoadError(err.message || "Could not reach the meal-plans API.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchPlans(); }, []);

  // Fall back to the sample lists only if the server returned nothing (offline / no pending plans yet).
  const urgentList   = serverPlans.length ? serverPlans.filter(p => p.urgent)  : urgentApprovals;
  const standardList = serverPlans.length ? serverPlans.filter(p => !p.urgent) : standardApprovals;

  // PATCH /api/v1/meal-plans/{id} — Admin/Nutritionist only
  const approve = async a => {
    setApproved(s => new Set([...s, a.id]));
    setRejected(s => { const n = new Set(s); n.delete(a.id); return n; });
    if (!a._fromServer) return;
    try {
      await apiRequest(`/meal-plans/${a.id}`, { method: "PATCH", body: { status: "approved" } });
      addToast(`${a.name}'s plan approved.`);
    } catch (err) {
      addToast(err.message || "Approve failed — server unavailable.", "error");
    }
  };
  const reject = async a => {
    setRejected(s => new Set([...s, a.id]));
    setApproved(s => { const n = new Set(s); n.delete(a.id); return n; });
    if (!a._fromServer) return;
    try {
      await apiRequest(`/meal-plans/${a.id}`, { method: "PATCH", body: { status: "rejected" } });
      addToast(`${a.name}'s plan declined.`, "info");
    } catch (err) {
      addToast(err.message || "Decline failed — server unavailable.", "error");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <PageHeader
        title="Meal Approval Queue"
        sub="Review and finalize pending meal and food plans for your patients"
        actions={[
          <div key="f" style={{ display: "flex", gap: 6 }}>
            {["All", "Urgent", "Standard"].map(f => <Pill key={f} active={priorityFilter === f} onClick={() => setPriority(f)}>{f}</Pill>)}
          </div>,
          <button key="r" onClick={fetchPlans} title="Refresh from server" style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", color: C.mid, fontSize: 13 }}>⟳</button>,
        ]}
      />

      {loadError && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FDDADA", border: `1px solid ${C.danger}33`, color: "#991B1B", fontSize: 11, marginBottom: 16 }}>
          {loadError} — showing sample data below.
        </div>
      )}
      {loading && (
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>Loading pending plans from server…</div>
      )}

      {/* Urgent */}
      {priorityFilter !== "Standard" && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Lbl>Urgent Requests</Lbl>
            <Tag text={`${urgentList.length} Pending`} type="urgent" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {urgentList.map(a => (
              <Card key={a.id} style={{ border: approved.has(a.id) ? `1px solid ${C.success}` : rejected.has(a.id) ? `1px solid ${C.danger}` : `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{a.name}</div>
                    <Tag text={a.plan} type="orange" />
                  </div>
                  {approved.has(a.id) && <Tag text="Approved" type="success" />}
                  {rejected.has(a.id) && <Tag text="Declined" type="danger" />}
                </div>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ background: a.bg, borderRadius: 10, height: 80, width: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>{a.emoji}</div>
                  <div>
                    {Object.keys(a.macros).length > 0 ? (
                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        {Object.entries(a.macros).map(([k, v]) => (
                          <div key={k} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{v}</div>
                            <div style={{ fontSize: 9, color: C.muted, textTransform: "capitalize" }}>{k === "vitC" ? "Vit C" : k}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 10, color: C.muted, fontStyle: "italic", marginBottom: 8 }}>No macro breakdown available</div>
                    )}
                    {Object.keys(a.micros).length > 0 && (
                      <div style={{ display: "flex", gap: 8 }}>
                        {Object.entries(a.micros).map(([k, v]) => (
                          <div key={k} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.mid }}>{v}</div>
                            <div style={{ fontSize: 9, color: C.muted, textTransform: "capitalize" }}>{k === "vitC" ? "Vit C" : k}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {a.tags.map(t => <Tag key={t} text={t} type="sage" />)}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => approve(a)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", background: approved.has(a.id) ? C.success : C.teal, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    {approved.has(a.id) ? "✓ Approved" : "Approve"}
                  </button>
                  <button style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.mid }}>Edit Plan</button>
                  <button onClick={() => reject(a)} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${rejected.has(a.id) ? C.danger : C.border}`, background: rejected.has(a.id) ? "#FDDADA" : "none", fontSize: 12, cursor: "pointer", color: C.danger }}>✕</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Standard */}
      {priorityFilter !== "Urgent" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Lbl>Standard Requests</Lbl>
            <Tag text={`${standardList.length} Pending`} type="info" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {standardList.map((a, i) => (
              <Card key={a.id} style={{ border: approved.has(a.id) ? `1px solid ${C.success}` : rejected.has(a.id) ? `1px solid ${C.danger}` : `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar name={a.name} size={36} color={avColors[i % avColors.length]} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{a.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.mid }}>{a.plan}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{a.sub}</div>
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {a.tags.map(t => <Tag key={t} text={t} type="lavender" />)}
                    {a.days != null && <Tag text={`Due in ${a.days}d`} type={a.days <= 2 ? "warning" : "default"} />}
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button onClick={() => approve(a)} style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: approved.has(a.id) ? C.success : C.teal, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
                      {approved.has(a.id) ? "✓" : "Approve"}
                    </button>
                    <button onClick={() => reject(a)} style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${rejected.has(a.id) ? C.danger : C.border}`, background: rejected.has(a.id) ? "#FDDADA" : "none", fontSize: 10, cursor: "pointer", color: C.danger }}>Decline</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", maxWidth: 300 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: "10px 14px", borderRadius: 9, fontWeight: 600, fontSize: 11,
            pointerEvents: "auto", boxShadow: "0 4px 20px rgba(0,0,0,.2)",
            background: t.type === "error" ? C.danger : t.type === "info" ? C.sidebar : C.success,
            color: "#fff",
          }}>{t.msg}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 4 — ANALYTICS
// ═══════════════════════════════════════════════════════════════════════════
const glucoseTrend = [
  { month: "May", avg: 108 }, { month: "Jun", avg: 104 },
  { month: "Jul", avg: 100 }, { month: "Aug", avg: 99  },
  { month: "Sep", avg: 97  }, { month: "Oct", avg: 95  },
];
const outcomesData = [
  { range: "65-70", improved: 14 }, { range: "71-80", improved: 22 },
  { range: "81-90", improved: 31 }, { range: "91-100", improved: 18 },
  { range: "101+",  improved: 8  },
];

// Best-effort normalization for GET /health-profiles/analytics/distribution.
// Expected to return some kind of bucketed distribution (e.g. by age range,
// BMI category, or condition) — adjust the field-name fallbacks below once
// you've confirmed the exact response shape in the Swagger docs.
function normalizeDistribution(data) {
  const raw = extractList(data, "distribution");
  if (!raw.length) return [];
  return raw.map(d => ({
    range: d.range || d.bucket || d.label || d.ageRange || d._id || "—",
    improved: d.count ?? d.total ?? d.value ?? d.improved ?? 0,
  }));
}

function Analytics() {
  const [distribution, setDistribution] = useState([]);
  const [distLoading, setDistLoading]   = useState(true);
  const [distError, setDistError]       = useState("");

  // GET /health-profiles/analytics/distribution — Admin only
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setDistLoading(true);
      setDistError("");
      try {
        const data = await apiRequest("/health-profiles/analytics/distribution");
        if (!cancelled) setDistribution(normalizeDistribution(data));
      } catch (err) {
        if (!cancelled) setDistError(err.message || "Could not reach health-profile analytics.");
      } finally {
        if (!cancelled) setDistLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const outcomesChartData = distribution.length ? distribution : outcomesData;

  return (
    <div>
      <PageHeader title="Analytics" sub="Patient outcomes, trends, and practice performance" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Avg BMI Reduction",   value: "−1.8",  sub: "Last 90 days", color: C.teal   },
          { label: "Glucose Improvement", value: "−13%",  sub: "Avg across cohort", color: C.sage },
          { label: "Plan Adherence",      value: "78%",   sub: "Patient reported", color: C.accent },
          { label: "Consults This Month", value: "94",    sub: "vs 81 last month", color: C.info  },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>{s.label}</div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontStyle: "italic" }}>{s.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <Lbl>Average Glucose Trend — All Patients</Lbl>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={glucoseTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[90, 115]} />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke={C.teal} strokeWidth={2.5} dot={{ r: 4, fill: C.teal }} name="Avg Glucose" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Lbl>Patient Health Profile Distribution</Lbl>
            <span style={{ fontSize: 9, color: C.muted }}>{distLoading ? "Loading…" : distribution.length ? "Live data" : "Sample data"}</span>
          </div>
          {distError && <div style={{ fontSize: 9, color: C.danger, marginBottom: 8 }}>{distError}</div>}
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={outcomesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="range" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="improved" fill={C.accent} radius={[4, 4, 0, 0]} name="Improved" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 14 }}>
        {[
          { label: "Most Effective Plan",     value: "Low Glycemic + IF",        sub: "72% patient success rate",    type: "success" },
          { label: "Most Common Condition",   value: "Type 2 Diabetes",          sub: "38% of active patient base",   type: "warning" },
          { label: "Highest Adherence Diet",  value: "Mediterranean Protocol",   sub: "4.6 / 5 patient satisfaction", type: "info"    },
        ].map(i => (
          <Card key={i.label}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".06em" }}>{i.label}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{i.value}</div>
            <Tag text={i.sub} type={i.type} />
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
export default function ClinicalNutritionist() {
  const [active, setActive] = useState("patients");
  const PAGES = {
    patients:      <Patients />,
    consultations: <Consultations />,
    meals:         <MealApprovals />,
    analytics:     <Analytics />,
  };
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: C.bg }}>
      <Sidebar active={active} setActive={setActive} />
      <main style={{ marginLeft: 192, flex: 1, overflowY: "auto", padding: "22px 26px" }}>
        {PAGES[active]}
      </main>
    </div>
  );
}