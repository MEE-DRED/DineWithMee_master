import { useState, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════ */
const API_BASE = "https://new-dine-with-mee-backend.onrender.com/api/v1";
const MEALS_ENDPOINT = `${API_BASE}/meals`;

/* ═══════════════════════════════════════════════
   ICON PRIMITIVE
═══════════════════════════════════════════════ */
const Ic = ({ d, size = 18, className = "", sw = 1.8, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

/* ═══════════════════════════════════════════════
   ICON PATHS
═══════════════════════════════════════════════ */
const P = {
  grid:       ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  users:      ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
  providers:  ["M9 11l3 3L22 4","M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
  layers:     ["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  analytics:  "M22 12h-4l-3 9L9 3l-3 9H2",
  gear:       ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  help:       ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],
  logout:     ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
  fork:       ["M8 3v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3","M10 8v13","M16 3l-1 7h2l-1 7"],
  plus:       "M12 5v14M5 12h14",
  x:          "M18 6L6 18M6 6l12 12",
  check:      "M20 6L9 17l-5-5",
  upload:     ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  image:      ["M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z","M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z","M21 15l-5-5L5 21"],
  alert:      ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  trash:      ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  edit:       ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  hamburger:  "M3 12h18M3 6h18M3 18h18",
  leaf:       "M2 22 16 8M16.5 2C10 2 6 6 6 12c0 3 1.5 5.5 4 7 .5-4.5 3-8.5 6.5-11",
  fire:       "M12 2c0 0-5 6-5 10a5 5 0 0 0 10 0c0-4-5-10-5-10z",
  tag:        ["M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z","M7 7h.01"],
  info:       ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 8h.01","M12 12v4"],
  refresh:    ["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"],
  eye:        ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  clock:      ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
  server:     ["M2 2h20v8H2zM2 14h20v8H2z","M6 6h.01M6 18h.01"],
  meals:      ["M18 8h1a4 4 0 0 1 0 8h-1","M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z","M6 1v3M10 1v3M14 1v3"],
};

/* ═══════════════════════════════════════════════
   NAV DATA
═══════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "overview",  label: "Overview",           icon: P.grid },
  { id: "meals",     label: "Meal Management",    icon: P.meals },
  { id: "users",     label: "User Management",    icon: P.users },
  { id: "providers", label: "Provider Management",icon: P.providers },
  { id: "analytics", label: "Analytics",          icon: P.analytics },
  { id: "settings",  label: "Settings",           icon: P.gear },
];

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const MEAL_CATEGORIES = [
  "Breakfast", "Lunch", "Dinner", "Snack", "Dessert",
  "Salad", "Soup", "Smoothie", "Beverage", "Other",
];

const DIET_TAGS = [
  "Vegan","Vegetarian","Gluten-Free","Dairy-Free","Keto",
  "Paleo","High-Protein","Low-Carb","Low-Fat","Halal","Kosher","Nut-Free",
];

const DIFFICULTY = ["Easy","Medium","Hard"];

const EMPTY_FORM = {
  name: "", category: "", description: "", calories: "",
  protein: "", carbs: "", fat: "", fiber: "", sugar: "",
  servingSize: "", servingUnit: "g", prepTime: "", cookTime: "",
  difficulty: "Easy", ingredients: "", instructions: "",
  dietaryTags: [], imageUrl: "", isAvailable: true, price: "",
};

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function cls(...args) { return args.filter(Boolean).join(" "); }

/* ═══════════════════════════════════════════════
   FIELD COMPONENTS
═══════════════════════════════════════════════ */
function Label({ children, required }) {
  return (
    <label className="block text-xs font-bold text-[#1a2e2a] uppercase tracking-wide mb-1.5">
      {children}{required && <span className="text-[#c96a4f] ml-0.5">*</span>}
    </label>
  );
}

function Input({ label, required, error, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <input
        className={cls(
          "w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1a2e2a] bg-white",
          "focus:outline-none focus:ring-2 transition placeholder:text-gray-300",
          error ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a]"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function Textarea({ label, required, error, className = "", rows = 3, ...props }) {
  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <textarea
        rows={rows}
        className={cls(
          "w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1a2e2a] bg-white resize-y",
          "focus:outline-none focus:ring-2 transition placeholder:text-gray-300",
          error ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a]"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function Select({ label, required, error, className = "", children, ...props }) {
  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <select
        className={cls(
          "w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1a2e2a] bg-white",
          "focus:outline-none focus:ring-2 transition appearance-none cursor-pointer",
          error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a]"
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function SectionCard({ title, subtitle, icon, iconBg = "bg-[#f0ede8]", iconColor = "text-[#c96a4f]", children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Ic d={icon} size={17} className={iconColor} />
        </div>
        <div>
          <h3 className="font-extrabold text-[#1a2e2a] text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="px-5 sm:px-6 py-5">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TOAST SYSTEM
═══════════════════════════════════════════════ */
function ToastStack({ toasts, dismiss }) {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-2 pointer-events-none max-w-sm w-full sm:w-auto">
      {toasts.map(t => (
        <div key={t.id}
          className={cls(
            "flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-xl pointer-events-auto animate-slideUp text-white",
            t.type === "error" ? "bg-red-600" : t.type === "warn" ? "bg-amber-500" : "bg-[#1a2e2a]"
          )}>
          <Ic d={t.type === "error" ? P.x : t.type === "warn" ? P.alert : P.check} size={16} sw={2.5}
            className={t.type === "error" ? "text-red-200 mt-0.5 flex-shrink-0" : t.type === "warn" ? "text-amber-100 mt-0.5 flex-shrink-0" : "text-emerald-400 mt-0.5 flex-shrink-0"} />
          <p className="text-sm font-semibold flex-1 leading-snug">{t.msg}</p>
          <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100 flex-shrink-0 mt-0.5">
            <Ic d={P.x} size={13} sw={2} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MEAL CARD (posted meals preview)
═══════════════════════════════════════════════ */
function MealCard({ meal, onView, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    await new Promise(r => setTimeout(r, 400));
    onDelete(meal._localId);
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden animate-fadeIn">
      {/* Image / placeholder */}
      <div className="relative h-36 bg-[#f5f3ef] flex items-center justify-center overflow-hidden">
        {meal.imageUrl ? (
          <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" onError={e => { e.target.style.display="none"; }} />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Ic d={P.fork} size={32} className="text-gray-200" />
            <span className="text-xs text-gray-300 font-medium">No image</span>
          </div>
        )}
        {/* availability badge */}
        <span className={cls(
          "absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full",
          meal.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
        )}>
          {meal.isAvailable ? "Available" : "Unavailable"}
        </span>
        {/* category */}
        <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-[#1a2e2a]/80 text-white px-2 py-0.5 rounded-full">
          {meal.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h4 className="font-extrabold text-[#1a2e2a] text-sm leading-tight truncate">{meal.name}</h4>
        {meal.description && (
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{meal.description}</p>
        )}
        {/* Macro chips */}
        <div className="flex gap-1.5 flex-wrap mt-auto pt-1">
          {meal.calories && <span className="text-[9px] font-bold bg-[#fdf0ec] text-[#c96a4f] px-2 py-0.5 rounded-full">{meal.calories} kcal</span>}
          {meal.protein  && <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">P:{meal.protein}g</span>}
          {meal.carbs    && <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">C:{meal.carbs}g</span>}
          {meal.fat      && <span className="text-[9px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">F:{meal.fat}g</span>}
        </div>
        {/* Diet tags */}
        {meal.dietaryTags?.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {meal.dietaryTags.slice(0, 3).map(t => (
              <span key={t} className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{t}</span>
            ))}
            {meal.dietaryTags.length > 3 && (
              <span className="text-[9px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">+{meal.dietaryTags.length - 3}</span>
            )}
          </div>
        )}
        {/* Actions */}
        <div className="flex gap-2 mt-2 pt-3 border-t border-gray-100">
          <button onClick={() => onView(meal)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1a2e2a] border border-gray-200 py-2 rounded-xl hover:border-[#1a2e2a] hover:bg-gray-50 transition-all active:scale-[.97]">
            <Ic d={P.eye} size={12} /> View
          </button>
          <button onClick={handleDelete} disabled={deleting}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-red-500 border border-red-100 py-2 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all active:scale-[.97] disabled:opacity-50">
            {deleting ? <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> : <Ic d={P.trash} size={12} />}
            {deleting ? "..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MEAL DETAIL MODAL
═══════════════════════════════════════════════ */
function MealDetailModal({ meal, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl flex items-center justify-between px-6 py-4 border-b border-gray-100 z-10">
          <h3 className="font-extrabold text-[#1a2e2a] text-lg">{meal.name}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
            <Ic d={P.x} size={16} className="text-gray-400" sw={2} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          {/* Image */}
          {meal.imageUrl && (
            <img src={meal.imageUrl} alt={meal.name} className="w-full h-48 object-cover rounded-2xl" />
          )}
          {/* Meta badges */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold bg-[#1a2e2a] text-white px-3 py-1 rounded-full">{meal.category}</span>
            {meal.difficulty && <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{meal.difficulty}</span>}
            <span className={cls("text-xs font-bold px-3 py-1 rounded-full", meal.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-400")}>
              {meal.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
          {meal.description && <p className="text-gray-500 text-sm leading-relaxed">{meal.description}</p>}
          {/* Nutrition */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Nutrition Facts</p>
            <div className="grid grid-cols-4 gap-2">
              {[["Calories",meal.calories,"kcal","[#c96a4f]"],["Protein",meal.protein,"g","blue-600"],["Carbs",meal.carbs,"g","amber-600"],["Fat",meal.fat,"g","purple-600"]].map(([k,v,u,c]) => v ? (
                <div key={k} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className={`text-base font-extrabold text-${c}`}>{v}<span className="text-xs ml-0.5">{u}</span></p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{k}</p>
                </div>
              ) : null)}
            </div>
          </div>
          {/* Serving */}
          {(meal.servingSize || meal.prepTime || meal.cookTime) && (
            <div className="flex gap-4 flex-wrap">
              {meal.servingSize && <div><p className="text-[10px] text-gray-400">Serving</p><p className="text-sm font-bold text-[#1a2e2a]">{meal.servingSize}{meal.servingUnit}</p></div>}
              {meal.prepTime    && <div><p className="text-[10px] text-gray-400">Prep Time</p><p className="text-sm font-bold text-[#1a2e2a]">{meal.prepTime} min</p></div>}
              {meal.cookTime    && <div><p className="text-[10px] text-gray-400">Cook Time</p><p className="text-sm font-bold text-[#1a2e2a]">{meal.cookTime} min</p></div>}
              {meal.price       && <div><p className="text-[10px] text-gray-400">Price</p><p className="text-sm font-bold text-[#1a2e2a]">${meal.price}</p></div>}
            </div>
          )}
          {/* Diet tags */}
          {meal.dietaryTags?.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Dietary Tags</p>
              <div className="flex gap-1.5 flex-wrap">
                {meal.dietaryTags.map(t => <span key={t} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">{t}</span>)}
              </div>
            </div>
          )}
          {/* Ingredients */}
          {meal.ingredients && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Ingredients</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{meal.ingredients}</p>
            </div>
          )}
          {/* Instructions */}
          {meal.instructions && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Instructions</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{meal.instructions}</p>
            </div>
          )}
          {/* API Response */}
          {meal._apiResponse && (
            <div className="bg-[#f5f3ef] rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">API Response</p>
              <pre className="text-[10px] text-gray-500 overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
                {JSON.stringify(meal._apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function AdminMealManagement() {
  const [activeNav,    setActiveNav]    = useState("meals");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [errors,       setErrors]       = useState({});
  const [submitting,   setSubmitting]   = useState(false);
  const [postedMeals,  setPostedMeals]  = useState([]);
  const [viewMeal,     setViewMeal]     = useState(null);
  const [activeTab,    setActiveTab]    = useState("form"); // "form" | "posted"
  const [serverStatus, setServerStatus] = useState("unknown"); // "unknown"|"online"|"offline"|"waking"
  const [rawResponse,  setRawResponse]  = useState(null);
  const [showRaw,      setShowRaw]      = useState(false);

  const formTopRef = useRef(null);
  const toastId    = useRef(0);
  const [toasts,   setToasts] = useState([]);

  const addToast = useCallback((msg, type = "success") => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000);
  }, []);
  const dismissToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  /* ─── Form change ─── */
  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const toggleTag = (tag) => {
    setForm(f => ({
      ...f,
      dietaryTags: f.dietaryTags.includes(tag)
        ? f.dietaryTags.filter(t => t !== tag)
        : [...f.dietaryTags, tag],
    }));
  };

  /* ─── Validation ─── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = "Meal name is required";
    if (!form.category)        e.category = "Category is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.calories)        e.calories = "Calories are required";
    else if (isNaN(+form.calories) || +form.calories < 0) e.calories = "Must be a valid number";
    if (form.protein  && isNaN(+form.protein))  e.protein  = "Must be a number";
    if (form.carbs    && isNaN(+form.carbs))    e.carbs    = "Must be a number";
    if (form.fat      && isNaN(+form.fat))      e.fat      = "Must be a number";
    if (form.price    && isNaN(+form.price))    e.price    = "Must be a number";
    if (form.prepTime && isNaN(+form.prepTime)) e.prepTime = "Must be a number";
    if (form.cookTime && isNaN(+form.cookTime)) e.cookTime = "Must be a number";
    if (!form.ingredients.trim()) e.ingredients = "Ingredients are required";
    return e;
  };

  /* ─── Build payload ─── */
  const buildPayload = () => {
    const payload = {
      name:        form.name.trim(),
      category:    form.category,
      description: form.description.trim(),
      nutritionInfo: {
        calories: Number(form.calories),
        ...(form.protein  && { protein:  Number(form.protein)  }),
        ...(form.carbs    && { carbs:    Number(form.carbs)    }),
        ...(form.fat      && { fat:      Number(form.fat)      }),
        ...(form.fiber    && { fiber:    Number(form.fiber)    }),
        ...(form.sugar    && { sugar:    Number(form.sugar)    }),
      },
      ...(form.servingSize && { servingSize: `${form.servingSize}${form.servingUnit}` }),
      ...(form.prepTime    && { prepTime:    Number(form.prepTime)    }),
      ...(form.cookTime    && { cookTime:    Number(form.cookTime)    }),
      ...(form.difficulty  && { difficulty:  form.difficulty  }),
      ...(form.ingredients && { ingredients: form.ingredients.split("\n").map(s => s.trim()).filter(Boolean) }),
      ...(form.instructions && { instructions: form.instructions.trim() }),
      ...(form.dietaryTags.length && { dietaryTags: form.dietaryTags }),
      ...(form.imageUrl    && { imageUrl:    form.imageUrl.trim()    }),
      isAvailable: form.isAvailable,
      ...(form.price       && { price:       Number(form.price)      }),
    };
    return payload;
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      addToast(`Please fix ${Object.keys(errs).length} field(s) before submitting`, "error");
      return;
    }

    setSubmitting(true);
    setRawResponse(null);
    setServerStatus("waking");

    const payload = buildPayload();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(MEALS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setServerStatus("online");

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { raw: text };
      }

      setRawResponse({ status: res.status, statusText: res.statusText, data });

      if (res.ok) {
        // Success
        const newMeal = {
          ...form,
          _localId: Date.now(),
          _apiResponse: data,
          _postedAt: new Date().toLocaleTimeString(),
        };
        setPostedMeals(prev => [newMeal, ...prev]);
        setForm(EMPTY_FORM);
        setErrors({});
        addToast(`✓ "${form.name}" posted successfully!`);
        setActiveTab("posted");
      } else {
        // HTTP error
        const msg = data?.message || data?.error || data?.raw || `Server error ${res.status}`;
        addToast(`API Error ${res.status}: ${msg}`, "error");
      }
    } catch (err) {
      setServerStatus("offline");
      if (err.name === "AbortError") {
        addToast("Request timed out (30s). The server may be starting up — try again in a moment.", "error");
      } else {
        addToast(`Network error: ${err.message}`, "error");
      }
      setRawResponse({ error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Clear all form fields?")) {
      setForm(EMPTY_FORM);
      setErrors({});
      setRawResponse(null);
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteLocal = (localId) => {
    setPostedMeals(prev => prev.filter(m => m._localId !== localId));
    addToast("Meal removed from local preview", "warn");
  };

  /* ─── Server status badge ─── */
  const statusConfig = {
    unknown: { color: "bg-gray-400",   text: "Status Unknown"  },
    waking:  { color: "bg-amber-400 animate-pulse", text: "Server Waking…" },
    online:  { color: "bg-emerald-500", text: "API Online"      },
    offline: { color: "bg-red-500",    text: "API Offline"      },
  };
  const { color: dotColor, text: dotText } = statusConfig[serverStatus];

  /* ═══════ RENDER ═══════ */
  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans flex">
      <style>{`
        @keyframes slideUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse2   { 0%,100%{opacity:1;} 50%{opacity:.5;} }
        .animate-slideUp  { animation: slideUp .2s  ease forwards; }
        .animate-fadeIn   { animation: fadeIn  .15s ease forwards; }
        .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#d1c9c0; border-radius:4px; }
      `}</style>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#f5f3ef] border-b border-gray-200 shadow-sm">
        <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-xl hover:bg-white transition-colors">
          <Ic d={P.hamburger} size={20} className="text-[#1a2e2a]" />
        </button>
        <span className="font-extrabold text-[#1a2e2a] text-sm">Dine With Me · Admin</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border-2 border-white shadow" />
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/25 z-30 lg:hidden animate-fadeIn" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ════════════════════════════════
          SIDEBAR
      ════════════════════════════════ */}
      <aside className={cls(
        "fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-[#f5f3ef] border-r border-gray-200",
        "flex flex-col pt-8 pb-6 px-5 transition-transform duration-300 flex-shrink-0",
        sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      )}>
        <button onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white">
          <Ic d={P.x} size={18} className="text-gray-400" />
        </button>

        {/* Logo */}
        <div className="mb-1">
          <h1 className="text-3xl font-extrabold text-[#1a2e2a] leading-[1.05] tracking-tight">Dine With<br/>Me</h1>
        </div>
        <p className="text-sm text-gray-400 font-medium mb-8">Admin Console</p>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = activeNav === item.id;
            return (
              <button key={item.id}
                onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                className={cls(
                  "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[.98]",
                  active ? "bg-white text-[#1a2e2a] shadow-sm" : "text-gray-500 hover:text-[#1a2e2a] hover:bg-white/60"
                )}>
                {active && <span className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 w-1 h-6 rounded-full bg-[#1a2e2a]" />}
                <Ic d={item.icon} size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 pt-4 space-y-1 mt-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#1a2e2a] hover:bg-white/60 transition-all">
            <Ic d={P.help} size={17} /> Help Center
          </button>
          <button onClick={() => addToast("You've been logged out", "warn")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#c96a4f] hover:bg-red-50 transition-all active:scale-[.98]">
            <Ic d={P.logout} size={17} /> Log Out
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════
          MAIN
      ════════════════════════════════ */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 min-w-0">

        {/* ── Desktop top bar ── */}
        <div className="hidden lg:flex items-center justify-between gap-4 px-8 py-4 sticky top-0 bg-[#f5f3ef]/95 backdrop-blur-sm z-20 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a2e2a] tracking-tight">Meal Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">Post and manage meals in the Dine With Me database</p>
          </div>
          <div className="flex items-center gap-3">
            {/* API status */}
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
              <span className={cls("w-2 h-2 rounded-full flex-shrink-0", dotColor)} />
              <span className="text-xs font-bold text-gray-500">{dotText}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="text-right leading-tight">
                <p className="text-sm font-bold text-[#1a2e2a]">Admin User</p>
                <p className="text-[11px] text-gray-400">System Architect</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border-2 border-white shadow flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 pb-24">

          {/* ── Page header ── */}
          <div className="mb-6" ref={formTopRef}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e2a] tracking-tight">Add New Meal</h2>
                <p className="text-gray-400 text-sm mt-1.5">
                  Fill in the details below to post a meal to{" "}
                  <code className="text-xs bg-[#e8f0ef] text-[#1a2e2a] px-1.5 py-0.5 rounded font-mono">
                    POST /api/v1/meals
                  </code>
                </p>
              </div>
              {/* API status mobile */}
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm lg:hidden">
                <span className={cls("w-2 h-2 rounded-full flex-shrink-0", dotColor)} />
                <span className="text-xs font-bold text-gray-500">{dotText}</span>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center gap-2 mt-5 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit shadow-sm">
              {[
                { id: "form",   label: "Post Meal",    icon: P.plus },
                { id: "posted", label: `Posted (${postedMeals.length})`, icon: P.meals },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={cls(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                    activeTab === tab.id ? "bg-[#1a2e2a] text-white shadow-sm" : "text-gray-400 hover:text-[#1a2e2a]"
                  )}>
                  <Ic d={tab.icon} size={15} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ════════ FORM TAB ════════ */}
          {activeTab === "form" && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">

                {/* ── Left: Main fields ── */}
                <div className="space-y-5">

                  {/* Basic Info */}
                  <SectionCard title="Basic Information" subtitle="Name, category, and description" icon={P.fork} iconBg="bg-[#f0ede8]" iconColor="text-[#c96a4f]">
                    <div className="space-y-4">
                      <Input label="Meal Name" required
                        placeholder="e.g. Grilled Salmon Bowl"
                        value={form.name}
                        onChange={e => setField("name", e.target.value)}
                        error={errors.name}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select label="Category" required
                          value={form.category}
                          onChange={e => setField("category", e.target.value)}
                          error={errors.category}>
                          <option value="">Select category…</option>
                          {MEAL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </Select>
                        <Select label="Difficulty"
                          value={form.difficulty}
                          onChange={e => setField("difficulty", e.target.value)}>
                          {DIFFICULTY.map(d => <option key={d}>{d}</option>)}
                        </Select>
                      </div>
                      <Textarea label="Description" required rows={3}
                        placeholder="Describe this meal — ingredients highlight, taste profile, dietary benefits…"
                        value={form.description}
                        onChange={e => setField("description", e.target.value)}
                        error={errors.description}
                      />
                    </div>
                  </SectionCard>

                  {/* Nutrition */}
                  <SectionCard title="Nutrition Information" subtitle="Per serving macros and micros" icon={P.fire} iconBg="bg-orange-50" iconColor="text-orange-500">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <Input label="Calories (kcal)" required type="number" min="0"
                        placeholder="e.g. 450"
                        value={form.calories}
                        onChange={e => setField("calories", e.target.value)}
                        error={errors.calories}
                      />
                      <Input label="Protein (g)" type="number" min="0" step="0.1"
                        placeholder="e.g. 35"
                        value={form.protein}
                        onChange={e => setField("protein", e.target.value)}
                        error={errors.protein}
                      />
                      <Input label="Carbs (g)" type="number" min="0" step="0.1"
                        placeholder="e.g. 52"
                        value={form.carbs}
                        onChange={e => setField("carbs", e.target.value)}
                        error={errors.carbs}
                      />
                      <Input label="Fat (g)" type="number" min="0" step="0.1"
                        placeholder="e.g. 18"
                        value={form.fat}
                        onChange={e => setField("fat", e.target.value)}
                        error={errors.fat}
                      />
                      <Input label="Fiber (g)" type="number" min="0" step="0.1"
                        placeholder="e.g. 6"
                        value={form.fiber}
                        onChange={e => setField("fiber", e.target.value)}
                      />
                      <Input label="Sugar (g)" type="number" min="0" step="0.1"
                        placeholder="e.g. 8"
                        value={form.sugar}
                        onChange={e => setField("sugar", e.target.value)}
                      />
                    </div>
                  </SectionCard>

                  {/* Ingredients & Instructions */}
                  <SectionCard title="Recipe Details" subtitle="Ingredients list and cooking steps" icon={P.leaf} iconBg="bg-emerald-50" iconColor="text-emerald-600">
                    <div className="space-y-4">
                      <Textarea label="Ingredients" required rows={5}
                        placeholder={"One ingredient per line:\n- 200g salmon fillet\n- 1 cup brown rice\n- 2 tbsp olive oil"}
                        value={form.ingredients}
                        onChange={e => setField("ingredients", e.target.value)}
                        error={errors.ingredients}
                      />
                      <Textarea label="Instructions" rows={5}
                        placeholder={"Step-by-step cooking instructions:\n1. Preheat grill to medium-high…\n2. Season salmon with salt…"}
                        value={form.instructions}
                        onChange={e => setField("instructions", e.target.value)}
                      />
                    </div>
                  </SectionCard>
                </div>

                {/* ── Right: Meta ── */}
                <div className="space-y-5">

                  {/* Serving & Time */}
                  <SectionCard title="Serving & Timing" icon={P.clock} iconBg="bg-blue-50" iconColor="text-blue-500">
                    <div className="space-y-4">
                      <div>
                        <Label>Serving Size</Label>
                        <div className="flex gap-2">
                          <input type="number" min="0" placeholder="100"
                            value={form.servingSize}
                            onChange={e => setField("servingSize", e.target.value)}
                            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a2e2a] focus:outline-none focus:ring-2 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a] transition placeholder:text-gray-300"
                          />
                          <select value={form.servingUnit} onChange={e => setField("servingUnit", e.target.value)}
                            className="w-20 px-2 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a2e2a] focus:outline-none focus:ring-2 focus:ring-[#1a2e2a]/15 focus:border-[#1a2e2a] transition bg-white">
                            {["g","ml","oz","cup","tbsp","tsp","piece"].map(u => <option key={u}>{u}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input label="Prep Time (min)" type="number" min="0" placeholder="15"
                          value={form.prepTime} onChange={e => setField("prepTime", e.target.value)} error={errors.prepTime} />
                        <Input label="Cook Time (min)" type="number" min="0" placeholder="20"
                          value={form.cookTime} onChange={e => setField("cookTime", e.target.value)} error={errors.cookTime} />
                      </div>
                    </div>
                  </SectionCard>

                  {/* Dietary Tags */}
                  <SectionCard title="Dietary Tags" subtitle="Select all that apply" icon={P.tag} iconBg="bg-violet-50" iconColor="text-violet-500">
                    <div className="flex flex-wrap gap-2">
                      {DIET_TAGS.map(tag => {
                        const active = form.dietaryTags.includes(tag);
                        return (
                          <button key={tag} type="button" onClick={() => toggleTag(tag)}
                            className={cls(
                              "px-3 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95",
                              active ? "bg-[#1a2e2a] text-white border-[#1a2e2a] shadow-sm" : "bg-white text-gray-500 border-gray-200 hover:border-[#1a2e2a] hover:text-[#1a2e2a]"
                            )}>
                            {active && <span className="mr-1">✓</span>}{tag}
                          </button>
                        );
                      })}
                    </div>
                    {form.dietaryTags.length > 0 && (
                      <p className="text-xs text-gray-400 mt-3 font-medium">{form.dietaryTags.length} tag{form.dietaryTags.length > 1 ? "s" : ""} selected</p>
                    )}
                  </SectionCard>

                  {/* Image & Price */}
                  <SectionCard title="Media & Pricing" icon={P.image} iconBg="bg-pink-50" iconColor="text-pink-500">
                    <div className="space-y-4">
                      <Input label="Image URL" type="url"
                        placeholder="https://example.com/meal.jpg"
                        value={form.imageUrl} onChange={e => setField("imageUrl", e.target.value)}
                      />
                      {form.imageUrl && (
                        <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover"
                            onError={e => { e.target.style.display="none"; }} />
                        </div>
                      )}
                      <Input label="Price ($)" type="number" min="0" step="0.01"
                        placeholder="12.99"
                        value={form.price} onChange={e => setField("price", e.target.value)} error={errors.price}
                      />
                    </div>
                  </SectionCard>

                  {/* Availability toggle */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-extrabold text-[#1a2e2a] text-sm">Available to Users</p>
                      <p className="text-xs text-gray-400 mt-0.5">Toggle whether this meal is visible in the app</p>
                    </div>
                    <button type="button" onClick={() => setField("isAvailable", !form.isAvailable)}
                      className={cls(
                        "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e2a] focus:ring-offset-2",
                        form.isAvailable ? "bg-[#1a2e2a]" : "bg-gray-200"
                      )}>
                      <span className={cls(
                        "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300",
                        form.isAvailable ? "translate-x-5" : "translate-x-0"
                      )} />
                    </button>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex flex-col gap-3">
                    <button type="submit" disabled={submitting}
                      className="w-full flex items-center justify-center gap-2.5 bg-[#c96a4f] hover:bg-[#b85a40] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-2xl text-sm transition-all active:scale-[.98] shadow-lg">
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Posting to API…
                        </>
                      ) : (
                        <>
                          <Ic d={P.upload} size={18} sw={2.5} />
                          Post Meal to Database
                        </>
                      )}
                    </button>
                    <button type="button" onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-500 hover:text-[#1a2e2a] hover:border-[#1a2e2a] font-bold py-3 rounded-2xl text-sm transition-all active:scale-[.98]">
                      <Ic d={P.refresh} size={15} /> Clear Form
                    </button>
                  </div>
                </div>
              </div>

              {/* ── API Response panel ── */}
              {rawResponse && (
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Ic d={P.server} size={16} className="text-gray-400" />
                      <p className="font-bold text-[#1a2e2a] text-sm">API Response</p>
                      {rawResponse.status && (
                        <span className={cls(
                          "text-xs font-bold px-2 py-0.5 rounded-full",
                          rawResponse.status >= 200 && rawResponse.status < 300 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                        )}>
                          {rawResponse.status} {rawResponse.statusText}
                        </span>
                      )}
                    </div>
                    <button onClick={() => setShowRaw(v => !v)} className="text-xs font-bold text-[#c96a4f] hover:underline">
                      {showRaw ? "Hide" : "Show"} Raw
                    </button>
                  </div>
                  {showRaw && (
                    <pre className="px-5 py-4 text-[11px] text-gray-500 overflow-x-auto leading-relaxed max-h-64 bg-[#f5f3ef] whitespace-pre-wrap break-all">
                      {JSON.stringify(rawResponse, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </form>
          )}

          {/* ════════ POSTED MEALS TAB ════════ */}
          {activeTab === "posted" && (
            <div>
              {postedMeals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-5">
                    <Ic d={P.meals} size={36} className="text-gray-200" />
                  </div>
                  <h3 className="font-extrabold text-[#1a2e2a] text-lg">No meals posted yet</h3>
                  <p className="text-gray-400 text-sm mt-2 max-w-xs">Use the Post Meal form to add meals to the database. They'll appear here after a successful API response.</p>
                  <button onClick={() => setActiveTab("form")}
                    className="mt-6 flex items-center gap-2 bg-[#c96a4f] hover:bg-[#b85a40] text-white font-bold py-3 px-6 rounded-xl transition-colors active:scale-[.98]">
                    <Ic d={P.plus} size={16} sw={2.5} /> Post Your First Meal
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm font-bold text-gray-400">{postedMeals.length} meal{postedMeals.length !== 1 ? "s" : ""} posted this session</p>
                    <button onClick={() => setActiveTab("form")}
                      className="flex items-center gap-2 bg-[#c96a4f] hover:bg-[#b85a40] text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-colors active:scale-[.98]">
                      <Ic d={P.plus} size={14} sw={2.5} /> Add Another
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {postedMeals.map(meal => (
                      <MealCard key={meal._localId} meal={meal}
                        onView={setViewMeal}
                        onDelete={handleDeleteLocal}
                      />
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

      {/* ════ TOAST ════ */}
      <ToastStack toasts={toasts} dismiss={dismissToast} />
    </div>
  );
}