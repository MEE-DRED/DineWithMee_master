import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, LineChart, Line,
} from "recharts";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  sidebar:  "#0F2318",
  sidebarA: "#1A3424",
  sidebarL: "#2A5038",
  accent:   "#3A7050",
  amber:    "#BF7035",
  bg:       "#EAEAE2",
  card:     "#FFFFFF",
  dark:     "#111820",
  mid:      "#4B5563",
  muted:    "#8A9099",
  border:   "#E0DDD5",
  teal:     "#1A8C68",
  danger:   "#C62828",
  warning:  "#C07010",
  success:  "#1A7A38",
  info:     "#2255A0",
};

// ─── Sidebar Nav ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",     label: "Clinical Portal",      icon: "🏥" },
  { id: "prescriptions", label: "Prescription Queue",   icon: "💊" },
  { id: "inventory",     label: "Inventory",            icon: "📦" },
  { id: "performance",   label: "Performance Insights", icon: "📊" },
  { id: "suppliers",     label: "Supplier Portal",      icon: "🚚" },
  { id: "config",        label: "Pharmacy Config",      icon: "⚙️" },
];

// ─── Shared UI Primitives ────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.card, borderRadius: 12,
      padding: "16px 18px", border: `1px solid ${C.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style,
    }}>
      {children}
    </div>
  );
}

function Badge({ text, type = "default" }) {
  const map = {
    default:  { bg: "#F0EEE8", color: C.mid },
    success:  { bg: "#D4EDDA", color: "#145526" },
    warning:  { bg: "#FEF3C7", color: "#92400E" },
    danger:   { bg: "#FEE2E2", color: "#991B1B" },
    info:     { bg: "#DBEAFE", color: "#1E3A8A" },
    urgent:   { bg: "#FEE2E2", color: "#991B1B" },
    amber:    { bg: "#FEF0E0", color: "#92400E" },
    teal:     { bg: "#CCFBF1", color: "#0F5147" },
    purple:   { bg: "#EDE9FE", color: "#5B21B6" },
  };
  const s = map[type] || map.default;
  return (
    <span style={{
      background: s.bg, color: s.color, padding: "2px 8px",
      borderRadius: 20, fontSize: 10, fontWeight: 700,
      whiteSpace: "nowrap", letterSpacing: ".03em", textTransform: "uppercase",
    }}>{text}</span>
  );
}

function StatChip({ label, value, color = C.teal }) {
  return (
    <Card style={{ textAlign: "center", padding: "14px 12px" }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 5, letterSpacing: ".04em" }}>{label}</div>
    </Card>
  );
}

function SLabel({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 12 }}>{children}</div>;
}

function PageHeader({ title, subtitle, cta, onCta }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontSize: 19, fontWeight: 800, color: C.dark, margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, fontSize: 11, cursor: "pointer", color: C.mid }}>Export</button>
        {cta && (
          <button onClick={onCta} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: C.amber, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
            {cta}
          </button>
        )}
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th style={{ textAlign: "left", padding: "7px 12px", fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", borderBottom: `1px solid ${C.border}` }}>{children}</th>;
}
function Td({ children, bold, color, mono, align }) {
  return <td style={{ padding: "9px 12px", fontSize: 12, fontWeight: bold ? 600 : 400, color: color || C.dark, fontFamily: mono ? "monospace" : "inherit", textAlign: align || "left", verticalAlign: "middle" }}>{children}</td>;
}
function TRow({ children, onClick }) {
  return <tr onClick={onClick} style={{ borderBottom: `1px solid ${C.border}`, cursor: onClick ? "pointer" : "default" }}>{children}</tr>;
}

function ProgressBar({ value, max = 100, color = C.teal }) {
  return (
    <div style={{ height: 5, borderRadius: 3, background: C.border }}>
      <div style={{ height: "100%", borderRadius: 3, background: color, width: `${Math.min((value / max) * 100, 100)}%`, transition: "width .3s" }} />
    </div>
  );
}

function AvatarCircle({ name, color = C.accent, size = 28 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color: "#fff" }}>
      {name[0]}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 36, height: 19, borderRadius: 10,
      background: value ? C.teal : C.border,
      position: "relative", cursor: "pointer", transition: "background .18s", flexShrink: 0,
    }}>
      <div style={{
        width: 15, height: 15, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2, left: value ? 19 : 2,
        transition: "left .18s", boxShadow: "0 1px 3px rgba(0,0,0,.2)",
      }} />
    </div>
  );
}

// ─── New Fulfillment Modal ────────────────────────────────────────────────────
function FulfillmentModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ patient: "", dob: "", rx: "", drug: "", qty: "", insurance: "", bin: "" });
  const inp = { width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, outline: "none", background: "#FAFAF8", boxSizing: "border-box", color: C.dark };
  const lbl = { fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".05em", display: "block", marginBottom: 4 };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.38)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div style={{ background: C.card, borderRadius: 16, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,.22)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>New Fulfillment Entry</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Step {step} of 3</div>
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.muted }}>✕</button>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 0, padding: "0 20px", marginTop: 16 }}>
          {["Patient", "Rx & Drug", "Insurance"].map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: step > i + 1 ? C.success : step === i + 1 ? C.dark : C.border, color: step >= i + 1 ? "#fff" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <div style={{ fontSize: 10, color: step === i + 1 ? C.dark : C.muted, fontWeight: step === i + 1 ? 700 : 400, marginLeft: 6, flexShrink: 0 }}>{s}</div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? C.success : C.border, margin: "0 8px" }} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          {/* Verification Summary panel */}
          <div style={{ background: "#F4FAF7", borderRadius: 10, padding: "12px 14px", marginBottom: 16, border: `1px solid #C8EDD8` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.success, marginBottom: 8 }}>✓ Verification Summary</div>
            {[
              { label: "Patient Identity", status: step >= 1 && form.patient ? "Verified" : "Pending" },
              { label: "Insurance Eligibility", status: step >= 3 && form.insurance ? "Verified" : "Pending" },
              { label: "Drug Interaction Check", status: step >= 2 && form.drug ? "Cleared" : "Pending" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: C.mid }}>{r.label}</span>
                <span style={{ color: r.status === "Pending" ? C.muted : C.success, fontWeight: 600 }}>{r.status}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lbl}>Patient Name *</label><input value={form.patient} onChange={e => setForm(f => ({ ...f, patient: e.target.value }))} placeholder="Full name" style={inp} /></div>
                <div><label style={lbl}>Date of Birth *</label><input type="date" value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} style={inp} /></div>
              </div>
              <div><label style={lbl}>Patient ID / MRN</label><input value={form.rx} onChange={e => setForm(f => ({ ...f, rx: e.target.value }))} placeholder="e.g. MRN-002841" style={inp} /></div>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label style={lbl}>Drug Name *</label><input value={form.drug} onChange={e => setForm(f => ({ ...f, drug: e.target.value }))} placeholder="e.g. Metformin 500mg" style={inp} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lbl}>Quantity</label><input value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} placeholder="e.g. 90 tablets" style={inp} /></div>
                <div><label style={lbl}>Rx Number</label><input value={form.rx} onChange={e => setForm(f => ({ ...f, rx: e.target.value }))} placeholder="e.g. RX-00124" style={inp} /></div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label style={lbl}>Insurance Plan *</label><input value={form.insurance} onChange={e => setForm(f => ({ ...f, insurance: e.target.value }))} placeholder="e.g. BlueCross PPO" style={inp} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lbl}>BIN Number</label><input value={form.bin} onChange={e => setForm(f => ({ ...f, bin: e.target.value }))} placeholder="e.g. 004336" style={inp} /></div>
                <div><label style={lbl}>Group ID</label><input placeholder="e.g. GRP00882" style={inp} /></div>
              </div>
              {/* Compliance documents */}
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Compliance Documents</div>
                {["HIPAA_consent_2024.pdf", "Prior_auth_form_07B.pdf", "Drug_Utilization_Review.pdf"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "#F4FAF7", marginBottom: 6, fontSize: 11 }}>
                    <span style={{ fontSize: 14 }}>📄</span>
                    <span style={{ color: C.mid, flex: 1 }}>{f}</span>
                    <Badge text="Attached" type="success" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", padding: "14px 20px", borderTop: `1px solid ${C.border}` }}>
          {step > 1 && <button onClick={() => setStep(s => s - 1)} style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, fontSize: 12, cursor: "pointer", color: C.mid }}>Back</button>}
          {step < 3
            ? <button onClick={() => setStep(s => s + 1)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: C.dark, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Continue →</button>
            : <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: C.success, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ Submit Entry</button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onFulfillment }) {
  return (
    <aside style={{
      width: 200, background: C.sidebar, color: "#fff",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "fixed", left: 0, top: 0, zIndex: 20,
    }}>
      {/* Logo */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚕️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 12, lineHeight: 1.2 }}>Dine With Mee</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", marginTop: 1, textTransform: "uppercase", letterSpacing: ".06em" }}>Pharmacy</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "8px 6px", overflowY: "auto" }}>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", padding: "8px 10px 4px", textTransform: "uppercase", letterSpacing: ".1em" }}>Navigation</div>
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              width: "100%", padding: "7px 10px", borderRadius: 7,
              border: "none", cursor: "pointer", textAlign: "left", marginBottom: 1,
              background: active === item.id ? C.sidebarA : "transparent",
              color: active === item.id ? "#fff" : "rgba(255,255,255,.5)",
              fontSize: 11, fontWeight: active === item.id ? 600 : 400, transition: "all .12s",
            }}
          >
            <span style={{ fontSize: 13, width: 16, textAlign: "center" }}>{item.icon}</span>
            {item.label}
            {active === item.id && <div style={{ marginLeft: "auto", width: 3, height: 3, borderRadius: "50%", background: C.amber }} />}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <button onClick={onFulfillment} style={{
          width: "100%", padding: "9px 0", borderRadius: 8, border: "none",
          background: C.amber, color: "#fff", fontSize: 11, fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <span>＋</span> New Fulfillment
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.sidebarL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>P</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600 }}>Pharmacist</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)" }}>On Duty</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 1 — CLINICAL PORTAL DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
const dailyData = [
  { day: "Mon", dispensed: 18, pending: 6 },
  { day: "Tue", dispensed: 22, pending: 4 },
  { day: "Wed", dispensed: 15, pending: 8 },
  { day: "Thu", dispensed: 24, pending: 3 },
  { day: "Fri", dispensed: 19, pending: 5 },
  { day: "Sat", dispensed: 12, pending: 2 },
];

const queueItems = [
  { id: "F-0042", name: "Jonathan Taveras", drug: "Lisinopril 10mg",   time: "08:14 AM", status: "Pending",    urgency: "normal"  },
  { id: "F-0043", name: "Daniel J. Miller",  drug: "Metformin 500mg",  time: "09:02 AM", status: "In Progress", urgency: "normal"  },
  { id: "F-0044", name: "Robert Chan",        drug: "Atorvastatin 20mg",time: "09:45 AM", status: "Urgent",     urgency: "urgent"  },
];

function Dashboard({ onFulfillment }) {
  return (
    <div>
      <PageHeader title="Clinical Portal" subtitle="Today's fulfillment overview · July 8, 2026" cta="+ New Fulfillment" onCta={onFulfillment} />

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        <StatChip label="Pending Fulfillments"  value="24"  color={C.amber}   />
        <StatChip label="In Progress"           value="08"  color={C.info}    />
        <StatChip label="Dispensed Today"       value="142" color={C.teal}    />
        <StatChip label="Avg Wait (min)"        value="14.2" color={C.accent} />
      </div>

      {/* Status tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "#E5E3DB", padding: 4, borderRadius: 10, width: "fit-content" }}>
        {["All", "Urgent", "In Progress", "Completed"].map((t, i) => (
          <button key={t} style={{
            padding: "5px 14px", borderRadius: 7, border: "none", cursor: "pointer",
            background: i === 0 ? C.card : "transparent",
            color: i === 0 ? C.dark : C.muted, fontSize: 11, fontWeight: i === 0 ? 600 : 400,
            boxShadow: i === 0 ? "0 1px 3px rgba(0,0,0,.08)" : "none",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        {/* Queue */}
        <Card>
          <SLabel>Pending Fulfillment Queue</SLabel>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><Th>Patient</Th><Th>Medication</Th><Th>Ref #</Th><Th>Time</Th><Th>Status</Th></tr>
            </thead>
            <tbody>
              {queueItems.map(q => (
                <TRow key={q.id}>
                  <Td><div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <AvatarCircle name={q.name} color={q.urgency === "urgent" ? C.danger : C.accent} />
                    <span style={{ fontWeight: 500, fontSize: 12 }}>{q.name}</span>
                  </div></Td>
                  <Td color={C.mid}>{q.drug}</Td>
                  <Td mono color={C.muted}>{q.id}</Td>
                  <Td color={C.muted}>{q.time}</Td>
                  <td style={{ padding: "9px 12px" }}>
                    <Badge text={q.status} type={q.urgency === "urgent" ? "urgent" : q.status === "In Progress" ? "info" : "default"} />
                  </td>
                </TRow>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Daily chart */}
        <Card>
          <SLabel>Daily Count</SLabel>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="day" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="dispensed" fill={C.teal}    radius={[3,3,0,0]} name="Dispensed" />
              <Bar dataKey="pending"   fill={C.amber}   radius={[3,3,0,0]} name="Pending"   />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
            <span style={{ fontSize: 10, color: C.mid, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.teal, display: "inline-block" }} />Dispensed</span>
            <span style={{ fontSize: 10, color: C.mid, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.amber, display: "inline-block" }} />Pending</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 2 — PRESCRIPTION QUEUE
// ═══════════════════════════════════════════════════════════════════════════
const rxOrders = [
  {
    id: "RX-1842", name: "Alexander Thomas",   drug: "Lisinopril 10mg",     qty: "90 tabs",  urgency: "urgent",  provider: "Dr. Keane",  time: "08:05 AM",
    notes: "Patient has reported adverse reaction history — double-check allergy records before dispensing.",
  },
  {
    id: "RX-1843", name: "Dr. Elena Rodriguez", drug: "Atorvastatin 40mg",  qty: "30 caps",  urgency: "normal",  provider: "Self-Rx",    time: "09:10 AM",
    notes: "Refill authorized. Insurance pre-approval confirmed.",
  },
  {
    id: "RX-1844", name: "Alima Dieng",          drug: "Metformin 500mg",    qty: "60 tabs",  urgency: "normal",  provider: "Dr. Osei",   time: "10:22 AM",
    notes: "First fill. Patient counselling required upon pickup.",
  },
  {
    id: "RX-1845", name: "Marcus Hill",           drug: "Sertraline 50mg",    qty: "30 tabs",  urgency: "normal",  provider: "Dr. Walsh",  time: "11:00 AM",
    notes: "Controlled substance — verify DEA license before dispensing.",
  },
];

const recentActivity = [
  { action: "Dispensed RX-1838 to Sarah Okafor",           time: "07:42 AM", type: "success" },
  { action: "Returned RX-1836 — insurance denied",          time: "07:55 AM", type: "danger"  },
  { action: "Compounding request received for RX-1840",     time: "08:30 AM", type: "info"    },
  { action: "Auto-refill triggered for James P. (chronic)", time: "08:58 AM", type: "warning" },
];

function PrescriptionQueue() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? rxOrders : rxOrders.filter(r => r.urgency === filter);
  return (
    <div>
      <PageHeader title="Prescription Queue" subtitle="Active Rx orders awaiting fulfillment" cta="+ Add Order" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        <StatChip label="Dispensing"      value="24"  color={C.teal}    />
        <StatChip label="Dispensed Today" value="12"  color={C.success} />
        <StatChip label="Queue Total"     value="142" color={C.info}    />
        <StatChip label="Urgent"          value="3"   color={C.danger}  />
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[["all","All"],["urgent","Urgent"],["normal","Standard"]].map(([val, lbl]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
            background: filter === val ? C.dark : C.border,
            color: filter === val ? "#fff" : C.mid,
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        {/* Active orders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SLabel>Active Orders ({visible.length})</SLabel>
          {visible.map(rx => (
            <Card key={rx.id} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <AvatarCircle name={rx.name} color={rx.urgency === "urgent" ? C.danger : C.accent} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{rx.name}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>via {rx.provider} · {rx.time}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {rx.urgency === "urgent" && <Badge text="Urgent" type="urgent" />}
                  <span style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>{rx.id}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{rx.drug}</span>
                <span style={{ fontSize: 12, color: C.muted }}>· {rx.qty}</span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4, marginBottom: 10, padding: "6px 8px", background: "#F8F6F2", borderRadius: 6 }}>{rx.notes}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ flex: 1, padding: "6px 0", borderRadius: 7, border: "none", background: C.teal, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Dispense</button>
                <button style={{ flex: 1, padding: "6px 0", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", color: C.mid, fontSize: 11, cursor: "pointer" }}>Hold</button>
                <button style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", color: C.danger, fontSize: 11, cursor: "pointer" }}>✕</button>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent activity */}
        <div>
          <SLabel>Recent Activity</SLabel>
          <Card>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 9, padding: "9px 0", borderBottom: i < recentActivity.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.type === "success" ? C.success : a.type === "danger" ? C.danger : a.type === "info" ? C.info : C.warning, flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: 11, color: C.dark, lineHeight: 1.4 }}>{a.action}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 3 — INVENTORY MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════
const inventoryItems = [
  { name: "Lisinopril 10mg",     sku: "LIS-010", category: "Cardiovascular", stock: 1204, reorder: 200, status: "In Stock",  cost: "$0.18"  },
  { name: "Metformin 500mg",     sku: "MET-500", category: "Diabetes",       stock: 342,  reorder: 150, status: "In Stock",  cost: "$0.12"  },
  { name: "Atorvastatin 20mg",   sku: "ATV-020", category: "Cardiovascular", stock: 45,   reorder: 200, status: "Low Stock", cost: "$0.34"  },
  { name: "Sertraline 50mg",     sku: "SER-050", category: "Psychiatric",    stock: 189,  reorder: 100, status: "In Stock",  cost: "$0.22"  },
  { name: "Amoxicillin 500mg",   sku: "AMX-500", category: "Antibiotic",     stock: 6,    reorder: 300, status: "Critical",  cost: "$0.09"  },
  { name: "Amlodipine 5mg",      sku: "AML-005", category: "Cardiovascular", stock: 512,  reorder: 100, status: "In Stock",  cost: "$0.16"  },
  { name: "Omeprazole 20mg",     sku: "OMP-020", category: "GI",             stock: 0,    reorder: 200, status: "Out",       cost: "$0.28"  },
  { name: "Levothyroxine 50mcg", sku: "LEV-050", category: "Endocrine",      stock: 88,   reorder: 150, status: "Low Stock", cost: "$0.41"  },
];

function InventoryManagement() {
  const [tab, setTab]       = useState("inventory");
  const [search, setSearch] = useState("");
  const filtered = inventoryItems.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase())
  );
  const statusColor = s => s === "In Stock" ? "success" : s === "Low Stock" ? "warning" : s === "Critical" ? "danger" : "default";
  return (
    <div>
      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 18 }}>
        {["inventory", "orders", "reports"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "9px 18px", border: "none", cursor: "pointer", background: "none",
            fontSize: 12, fontWeight: tab === t ? 700 : 400,
            color: tab === t ? C.dark : C.muted,
            borderBottom: tab === t ? `2px solid ${C.dark}` : "2px solid transparent",
            textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      <PageHeader title="Inventory Management" subtitle="Track pharmaceutical stock levels and reorder triggers" cta="+ Place Order" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        <StatChip label="Total SKUs"      value="1,204" color={C.teal}    />
        <StatChip label="Low Stock"       value="12"    color={C.warning} />
        <StatChip label="Orders Pending"  value="45"    color={C.amber}   />
        <StatChip label="Critical / Out"  value="6"     color={C.danger}  />
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SLabel>Stock Register</SLabel>
          <input placeholder="🔍 Search drug or category…" value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 11, outline: "none", width: 210 }} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><Th>Drug Name</Th><Th>SKU</Th><Th>Category</Th><Th>Stock</Th><Th>Reorder Pt.</Th><Th>Unit Cost</Th><Th>Status</Th><Th></Th></tr></thead>
          <tbody>
            {filtered.map((item, i) => (
              <TRow key={i}>
                <Td bold>{item.name}</Td>
                <Td mono color={C.muted}>{item.sku}</Td>
                <Td color={C.mid}>{item.category}</Td>
                <td style={{ padding: "9px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: item.stock === 0 ? C.danger : item.stock < 50 ? C.warning : C.dark, marginBottom: 3 }}>{item.stock.toLocaleString()}</div>
                  <ProgressBar value={item.stock} max={1300} color={item.stock === 0 ? C.danger : item.stock < 50 ? C.warning : C.teal} />
                </td>
                <Td color={C.muted}>{item.reorder}</Td>
                <Td color={C.mid}>{item.cost}</Td>
                <td style={{ padding: "9px 12px" }}><Badge text={item.status} type={statusColor(item.status)} /></td>
                <td style={{ padding: "9px 12px" }}><button style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: "none", fontSize: 10, cursor: "pointer", color: C.mid }}>Reorder</button></td>
              </TRow>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 4 — PERFORMANCE INSIGHTS
// ═══════════════════════════════════════════════════════════════════════════
const weeklyData = [
  { week: "Wk 1", fulfilled: 142, pending: 24, returned: 8  },
  { week: "Wk 2", fulfilled: 168, pending: 18, returned: 5  },
  { week: "Wk 3", fulfilled: 129, pending: 31, returned: 12 },
  { week: "Wk 4", fulfilled: 195, pending: 14, returned: 3  },
];
const highVelocity = [
  { name: "Lisinopril 10mg",   fills: 342, max: 400, delta: "+8%" },
  { name: "Metformin 500mg",   fills: 289, max: 400, delta: "+3%" },
  { name: "Atorvastatin 20mg", fills: 241, max: 400, delta: "+12%" },
  { name: "Sertraline 50mg",   fills: 198, max: 400, delta: "-2%" },
  { name: "Omeprazole 20mg",   fills: 176, max: 400, delta: "+6%" },
];
const procurement = [
  { supplier: "MedSupply Co.",    amount: "$12,480", orders: 18, lead: "2 days",  status: "On Track"   },
  { supplier: "PharmaDist LLC",   amount: "$8,240",  orders: 12, lead: "4 days",  status: "Delayed"    },
  { supplier: "NutriCore Health", amount: "$4,100",  orders: 6,  lead: "1 day",   status: "On Track"   },
  { supplier: "AlliedMed Supply", amount: "$6,750",  orders: 9,  lead: "5 days",  status: "At Risk"    },
];

function PerformanceInsights() {
  return (
    <div>
      <PageHeader title="Performance Insights" subtitle="Fulfillment efficiency, velocity, and procurement analysis" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        <StatChip label="Avg Fill Rate"       value="18.45"    color={C.teal}    />
        <StatChip label="Avg Processing Time" value="14.2 min" color={C.info}    />
        <StatChip label="System Response"     value="9.2s"     color={C.accent}  />
        <StatChip label="Avg Rx Cost"         value="$42.36"   color={C.warning} />
      </div>

      {/* Weekly chart */}
      <Card style={{ marginBottom: 14 }}>
        <SLabel>Weekly Fulfillment Volume</SLabel>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="week" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="fulfilled" fill={C.teal}    radius={[3,3,0,0]} name="Fulfilled" />
            <Bar dataKey="pending"   fill={C.amber}   radius={[3,3,0,0]} name="Pending"   />
            <Bar dataKey="returned"  fill={C.danger}  radius={[3,3,0,0]} name="Returned"  />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* High velocity */}
        <Card>
          <SLabel>High Velocity Supplements</SLabel>
          {highVelocity.map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: C.dark, fontWeight: 500 }}>{item.name}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: C.dark }}>{item.fills}</span>
                  <span style={{ fontSize: 10, color: item.delta.startsWith("-") ? C.danger : C.success, fontWeight: 600 }}>{item.delta}</span>
                </div>
              </div>
              <ProgressBar value={item.fills} max={item.max} color={C.teal} />
            </div>
          ))}
        </Card>

        {/* Procurement cost */}
        <Card>
          <SLabel>Procurement Cost Analysis</SLabel>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><Th>Supplier</Th><Th>Amount</Th><Th>Lead</Th><Th>Status</Th></tr></thead>
            <tbody>
              {procurement.map((p, i) => (
                <TRow key={i}>
                  <Td bold>{p.supplier}</Td>
                  <Td color={C.teal}>{p.amount}</Td>
                  <Td color={C.muted}>{p.lead}</Td>
                  <td style={{ padding: "9px 12px" }}>
                    <Badge text={p.status} type={p.status === "On Track" ? "success" : p.status === "Delayed" ? "warning" : "danger"} />
                  </td>
                </TRow>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 14 }}>
            {[1,2,3].map(n => (
              <button key={n} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${n === 1 ? C.dark : C.border}`, background: n === 1 ? C.dark : "none", color: n === 1 ? "#fff" : C.muted, fontSize: 11, cursor: "pointer" }}>{n}</button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 5 — SUPPLIER PORTAL
// ═══════════════════════════════════════════════════════════════════════════
const supplierOrders = [
  { po: "PO-8841", supplier: "MedSupply Co.",    item: "Lisinopril 10mg",     qty: "5,000 tabs", total: "$900",    eta: "Jul 10", status: "Confirmed" },
  { po: "PO-8842", supplier: "PharmaDist LLC",   item: "Metformin 500mg",     qty: "3,000 tabs", total: "$360",    eta: "Jul 14", status: "Delayed"   },
  { po: "PO-8843", supplier: "NutriCore Health", item: "Omega-3 1000mg",      qty: "500 caps",   total: "$210",    eta: "Jul 9",  status: "Shipped"   },
  { po: "PO-8844", supplier: "AlliedMed Supply", item: "Amoxicillin 500mg",   qty: "8,000 caps", total: "$720",    eta: "Jul 12", status: "Pending"   },
  { po: "PO-8845", supplier: "MedSupply Co.",    item: "Atorvastatin 20mg",   qty: "2,000 tabs", total: "$680",    eta: "Jul 11", status: "Confirmed" },
];

const healthDetails = [
  { label: "Active Supplier Contracts", value: "12", color: C.teal  },
  { label: "POs This Month",            value: "38", color: C.info  },
  { label: "Avg Supplier Lead Time",    value: "3.2 days", color: C.mid },
  { label: "Total Spend MTD",           value: "$42,100",  color: C.accent },
];

function SupplierPortal() {
  const [notifs, setNotifs] = useState({ orderConfirm: true, shipUpdate: true, delayAlert: true, lowStock: false });
  return (
    <div>
      <PageHeader title="Supplier Portal" subtitle="Purchase orders, supplier health, and notification preferences" cta="+ New PO" />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        {/* Left: PO table */}
        <div>
          <SLabel>Supplier Orders</SLabel>
          <Card>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><Th>PO #</Th><Th>Supplier</Th><Th>Item</Th><Th>Qty</Th><Th>Total</Th><Th>ETA</Th><Th>Status</Th></tr></thead>
              <tbody>
                {supplierOrders.map(s => (
                  <TRow key={s.po}>
                    <Td mono color={C.muted}>{s.po}</Td>
                    <Td bold>{s.supplier}</Td>
                    <Td color={C.mid}>{s.item}</Td>
                    <Td color={C.mid}>{s.qty}</Td>
                    <Td bold color={C.teal}>{s.total}</Td>
                    <Td color={C.muted}>{s.eta}</Td>
                    <td style={{ padding: "9px 12px" }}>
                      <Badge text={s.status} type={s.status === "Confirmed" ? "success" : s.status === "Shipped" ? "info" : s.status === "Delayed" ? "warning" : "default"} />
                    </td>
                  </TRow>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SLabel>Supply Health Details</SLabel>
            {healthDetails.map(h => (
              <div key={h.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, color: C.mid }}>{h.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: h.color }}>{h.value}</span>
              </div>
            ))}
          </Card>
          <Card>
            <SLabel>Notification Preferences</SLabel>
            {[
              { key: "orderConfirm", label: "Order Confirmations" },
              { key: "shipUpdate",   label: "Shipping Updates"     },
              { key: "delayAlert",   label: "Delay Alerts"          },
              { key: "lowStock",     label: "Low Stock Triggers"    },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, color: C.mid }}>{n.label}</span>
                <Toggle value={notifs[n.key]} onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 14 }}>
        <StatChip label="Confirmed POs"  value="22"   color={C.success} />
        <StatChip label="Delayed POs"    value="4"    color={C.warning} />
        <StatChip label="Pending POs"    value="12"   color={C.amber}   />
        <StatChip label="Spend vs Budget" value="87%" color={C.info}    />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 6 — PHARMACY CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════
const apiConnections = [
  { name: "DrFirst ePrescribing API",    id: "74a2b",  status: "connected",    lastSync: "2 min ago"  },
  { name: "SureScripts Network",         id: "c91f3",  status: "connected",    lastSync: "14 min ago" },
  { name: "Express Scripts PBM",         id: "Legacy", status: "disconnected", lastSync: "3 days ago" },
  { name: "OptumRx Formulary Check",     id: "opt44",  status: "connected",    lastSync: "1 hr ago"   },
];

const complianceDocs = [
  { name: "HIPAA_Privacy_Notice_2026.pdf",   size: "320 KB", uploaded: "Jan 2, 2026"  },
  { name: "DEA_Registration_Certificate.pdf", size: "141 KB", uploaded: "Mar 15, 2026" },
  { name: "State_Pharmacy_License_2026.pdf", size: "205 KB", uploaded: "Feb 28, 2026" },
];

function PharmacyConfig({ onFulfillment }) {
  const [prefs, setPrefs] = useState({ autoRefill: true, darkMode: false, smsAlerts: true, twoFA: true, devMode: false, auditLog: true });
  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <PageHeader title="Pharmacy Configuration" subtitle="System preferences, API integrations, and compliance" cta="+ New Fulfillment" onCta={onFulfillment} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* System preferences */}
        <Card>
          <SLabel>System Preferences</SLabel>
          {[
            { key: "autoRefill", label: "Auto-Refill Scheduling",    desc: "Trigger refills for chronic Rx 7 days before due"     },
            { key: "darkMode",   label: "Dark Mode Interface",        desc: "Enable dark theme across clinical portal"             },
            { key: "smsAlerts",  label: "SMS Patient Alerts",         desc: "Send pickup and delay notifications via SMS"          },
            { key: "twoFA",      label: "Two-Factor Auth (Staff)",    desc: "Require 2FA for all pharmacist logins"                },
            { key: "devMode",    label: "Developer / Debug Mode",     desc: "Show raw API payloads and system logs"                },
            { key: "auditLog",   label: "Audit Trail Logging",        desc: "Log all dispensing and fulfillment events"            },
          ].map((pref, i, arr) => (
            <div key={pref.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: C.dark }}>{pref.label}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{pref.desc}</div>
              </div>
              <Toggle value={prefs[pref.key]} onChange={() => toggle(pref.key)} />
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* API connections */}
          <Card>
            <SLabel>Connected APIs</SLabel>
            {apiConnections.map((api, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < apiConnections.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: api.status === "connected" ? C.success : C.danger, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: C.dark }}>{api.name}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>Synced {api.lastSync}</div>
                  </div>
                </div>
                <button style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${api.status === "connected" ? C.border : C.teal}`, background: api.status === "connected" ? "none" : "#D4EDDA", fontSize: 10, cursor: "pointer", color: api.status === "connected" ? C.muted : C.success, fontWeight: 600 }}>
                  {api.status === "connected" ? "Manage" : "Connect"}
                </button>
              </div>
            ))}
          </Card>

          {/* Compliance documents */}
          <Card>
            <SLabel>Compliance Documents</SLabel>
            {complianceDocs.map((doc, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 0", borderBottom: i < complianceDocs.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: C.dark }}>{doc.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{doc.size} · Uploaded {doc.uploaded}</div>
                </div>
                <button style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: "none", fontSize: 10, cursor: "pointer", color: C.mid }}>View</button>
              </div>
            ))}
            <button style={{ width: "100%", marginTop: 12, padding: "8px 0", borderRadius: 8, border: `2px dashed ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.muted }}>
              ＋ Upload Document
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
export default function Pharmacist() {
  const [active, setActive]         = useState("dashboard");
  const [showModal, setShowModal]   = useState(false);

  const PAGES = {
    dashboard:     <Dashboard     onFulfillment={() => setShowModal(true)} />,
    prescriptions: <PrescriptionQueue />,
    inventory:     <InventoryManagement />,
    performance:   <PerformanceInsights />,
    suppliers:     <SupplierPortal />,
    config:        <PharmacyConfig onFulfillment={() => setShowModal(true)} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: C.bg }}>
      <Sidebar active={active} setActive={setActive} onFulfillment={() => setShowModal(true)} />
      <main style={{ marginLeft: 200, flex: 1, overflowY: "auto", padding: "22px 26px" }}>
        {PAGES[active]}
      </main>
      {showModal && <FulfillmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}