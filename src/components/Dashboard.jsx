import { useState } from "react";

const meals = {
  breakfast: {
    name: "Avocado & Poached Egg",
    kcal: 340,
    protein: "18g Protein",
    label: "BREAKFAST",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80",
  },
  lunch: {
    name: "Roasted Harvest Bowl",
    kcal: 520,
    protein: "12g Protein",
    label: "LUNCH",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
};

const weekData = [
  {
    day: "Mon, Oct 14",
    today: true,
    breakfast: { name: "Avocado Toast", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=80&q=80" },
    lunch: { name: "Harvest Bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
    dinner: null,
  },
  {
    day: "Tue, Oct 15",
    breakfast: { name: "Greek Yogurt & Honey" },
    lunch: { name: "Grilled Chicken Salad" },
    dinner: { name: "Lemon Herb Salmon" },
  },
  {
    day: "Wed, Oct 16",
    breakfast: { name: "Oatmeal w/ Berries" },
    lunch: { name: "Lentil Soup" },
    dinner: { name: "Tofu Stir Fry" },
  },
];

const healthStats = [
  { label: "Weight", value: "64.2", unit: "kg", delta: "↘ 0.5kg", deltaColor: "text-green-600" },
  { label: "Heart Rate", value: "72", unit: "bpm", delta: "— Stable", deltaColor: "text-gray-400" },
  { label: "Sleep", value: "7.5", unit: "hrs", delta: "↗ 1.2hrs", deltaColor: "text-green-600" },
  { label: "Energy", value: "High", unit: "", delta: "⚡ Peak State", deltaColor: "text-amber-500" },
];

function MealCard({ meal }) {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col min-w-0">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <span className="text-[10px] font-bold tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full w-fit">
          {meal.label}
        </span>
        <p className="font-bold text-gray-900 text-sm leading-tight">{meal.name}</p>
        <div className="flex gap-2 flex-wrap mt-auto">
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
            {meal.kcal} kcal
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
            {meal.protein}
          </span>
        </div>
      </div>
    </div>
  );
}

function ScheduleDinnerCard() {
  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-[#2d6a4f] hover:bg-green-50 transition-all group">
      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 group-hover:bg-[#2d6a4f] group-hover:border-[#2d6a4f] transition-all shadow-sm">
        <span className="text-gray-400 text-xl group-hover:text-white transition-all">+</span>
      </div>
      <p className="font-semibold text-gray-700 text-sm">Schedule Dinner</p>
      <p className="text-xs text-gray-400 mt-1 text-center px-4">Choose from your meal plan</p>
    </div>
  );
}

function HydrationCard() {
  const [hydration, setHydration] = useState(2100);
  const goal = 3000;
  const percent = Math.min((hydration / goal) * 100, 100);

  return (
    <div className="bg-[#f0f7f4] rounded-2xl p-5 border border-[#d0e8de]">
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-gray-900 text-lg">Hydration</span>
        <span className="text-2xl">💧</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">{(hydration / 1000).toFixed(1)}L / {goal / 1000}L</p>
      <div className="w-full bg-white rounded-full h-3 mb-2 overflow-hidden">
        <div
          className="h-3 rounded-full bg-[#1a4731] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mb-4">
        <span>{Math.round(percent)}% of Daily Goal</span>
        <span>{((goal - hydration) / 1000).toFixed(2).replace(/\.?0+$/, "")}00ml left</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setHydration((h) => Math.min(h + 250, goal))}
          className="flex-1 py-2 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-[#1a4731] hover:text-white hover:border-[#1a4731] transition-all"
        >
          + 250ml
        </button>
        <button
          onClick={() => setHydration((h) => Math.min(h + 500, goal))}
          className="flex-1 py-2 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-[#1a4731] hover:text-white hover:border-[#1a4731] transition-all"
        >
          + 500ml
        </button>
      </div>
    </div>
  );
}

function WeekCard({ day }) {
  const ForkIcon = () => (
    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );

  return (
    <div className={`rounded-2xl border p-4 min-w-[220px] flex-shrink-0 snap-start ${day.today ? "bg-white border-gray-200 shadow-md" : "bg-white border-gray-100"}`}>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-gray-900 text-sm">{day.day}</span>
        {day.today && <span className="text-[#e05a2b] text-xs font-semibold">Today</span>}
      </div>
      <div className="flex flex-col gap-3">
        {/* Breakfast */}
        <div className="flex items-center gap-3">
          {day.breakfast?.img ? (
            <img src={day.breakfast.img} alt="" className="w-9 h-9 rounded-xl object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center"><ForkIcon /></div>
          )}
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Breakfast</p>
            <p className="text-xs font-medium text-gray-800">{day.breakfast?.name}</p>
          </div>
        </div>
        {/* Lunch */}
        <div className="flex items-center gap-3">
          {day.lunch?.img ? (
            <img src={day.lunch.img} alt="" className="w-9 h-9 rounded-xl object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center"><ForkIcon /></div>
          )}
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Lunch</p>
            <p className="text-xs font-medium text-gray-800">{day.lunch?.name}</p>
          </div>
        </div>
        {/* Dinner */}
        <div className="flex items-center gap-3">
          {day.dinner ? (
            <>
              <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center"><ForkIcon /></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Dinner</p>
                <p className="text-xs font-medium text-gray-800">{day.dinner.name}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-9 h-9 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-lg font-light cursor-pointer hover:border-[#2d6a4f] hover:bg-green-50 transition-all">+</div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Dinner</p>
                <p className="text-xs text-gray-400">Plan Dinner</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NutritionDashboard() {
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="min-h-screen bg-[#f7f5f0] font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-[#f7f5f0] px-4 sm:px-8 py-3 flex items-center gap-3 border-b border-gray-200">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100 max-w-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2" /><path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-gray-400 text-sm">Search meals, data...</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <img src="https://i.pravatar.cc/150?img=47" alt="Elena" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
        </div>
      </div>

      <div className="px-4 sm:px-8 py-6 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a4731] leading-tight">Good Morning, Elena</h1>
            <p className="text-gray-500 text-sm mt-1">Your wellness journey is on track today.</p>
          </div>
          <button className="self-start sm:self-auto bg-[#e05a2b] hover:bg-[#c94d22] text-white font-semibold text-sm px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" /><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Plan Your Week
          </button>
        </div>

        {/* Today's Nutrition */}
        <section>
          <h2 className="text-[#2d6a4f] font-bold text-lg mb-4">Today's Nutrition</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {/* Meal cards */}
            <div className="grid grid-cols-2 sm:col-span-2 lg:col-span-2 gap-4" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div className="col-span-1"><MealCard meal={meals.breakfast} /></div>
              <div className="col-span-1"><MealCard meal={meals.lunch} /></div>
              <div className="col-span-1"><ScheduleDinnerCard /></div>
            </div>
            {/* Hydration */}
            <div className="sm:col-span-2 lg:col-span-1">
              <HydrationCard />
            </div>
          </div>
        </section>

        {/* Weekly Meal Schedule */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#2d6a4f] font-bold text-lg">Weekly Meal Schedule</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setWeekOffset((o) => Math.max(o - 1, 0))}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-40"
                disabled={weekOffset === 0}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setWeekOffset((o) => Math.min(o + 1, weekData.length - 1))}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-40"
                disabled={weekOffset >= weekData.length - 1}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {weekData.map((day, i) => (
              <WeekCard key={i} day={day} />
            ))}
          </div>
        </section>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Health at a Glance */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-base">Health at a Glance</h3>
              <button className="text-sm text-gray-500 hover:text-[#1a4731] transition-colors flex items-center gap-1">
                View Trends
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {healthStats.map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="font-bold text-gray-900 text-lg leading-none">
                    {stat.value}<span className="text-xs font-normal text-gray-400 ml-0.5">{stat.unit}</span>
                  </p>
                  <p className={`text-xs ${stat.deltaColor}`}>{stat.delta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Session */}
          <div className="bg-[#1a4731] rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-[#e05a2b] rounded-md flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" /><path d="M8 21h8M12 17v4" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xs text-green-300 uppercase tracking-widest font-semibold">Upcoming Session</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-1">Nutrition Strategy</h3>
              <p className="text-green-300 text-sm mb-5">With Dr. Sarah Chen, PhD</p>
              <div className="bg-white/10 rounded-xl p-3 flex items-center gap-4">
                <div className="bg-white/20 rounded-xl px-3 py-2 text-center min-w-[44px]">
                  <p className="text-[10px] text-green-300 uppercase font-bold">OCT</p>
                  <p className="text-xl font-extrabold leading-none">14</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Today at 4:30 PM</p>
                  <p className="text-xs text-green-300 mt-0.5">Zoom Link Sent to Email</p>
                </div>
                <button className="w-9 h-9 rounded-full bg-[#e05a2b] flex items-center justify-center flex-shrink-0 hover:bg-[#c94d22] transition-all shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-gray-400 text-xs pb-4">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Last updated 2 mins ago
        </div>
      </div>
    </div>
  );
}
