// src/api.js
const BASE_URL = "https://new-dine-with-mee-backend.onrender.com";

// Generalized request helper handling parsing, headers, and fallback state consistency
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to execute request on endpoint: ${endpoint}`, error);
    throw error;
  }
}

export const api = {
  // Nutrition & Dashboard Core Stats
  getDashboardStats: () => request("/api/dashboard/stats").catch(() => fallbackStats),
  getRecentMeals: () => request("/api/meals/recent").catch(() => fallbackMeals),
  
  // Meal Plans Module
  getMealPlans: () => request("/api/meals/plans").catch(() => fallbackMealPlans),
  swapMealItem: (mealId, details) => request(`/api/meals/swap/${mealId}`, {
    method: "POST",
    body: JSON.stringify(details)
  }),

  // Health Profiles Module
  getHealthProfile: () => request("/api/health/profile").catch(() => fallbackHealthProfile),
  updateRegimen: (regimenData) => request("/api/health/regimen", {
    method: "POST",
    body: JSON.stringify(regimenData)
  }),

  // Orders / Pharmacy Pipeline
  getOrders: () => request("/api/orders").catch(() => fallbackOrders),
  placeOrder: (orderData) => request("/api/orders", {
    method: "POST",
    body: JSON.stringify(orderData)
  }),

  // Consultations & Booking
  getConsultations: () => request("/api/consultations").catch(() => fallbackConsultations),
  bookSlot: (slotId) => request("/api/consultations/book", {
    method: "POST",
    body: JSON.stringify({ slotId })
  })
};

// ── Fallback Mocks to maintain functional stability during live cold-starts ──
const fallbackStats = [
  { label: "Caloric Targets", value: "1,840", unit: "kcal", delta: "420 left today", color: "text-emerald-600" },
  { label: "Protein Consumption", value: "112", unit: "g", delta: "28g remaining", color: "text-emerald-600" },
  { label: "Hydration Intake", value: "2.4", unit: "L", delta: "0.6L behind target", color: "text-amber-500" },
  { label: "Active Energy Burn", value: "480", unit: "kcal", delta: "120% over baseline", color: "text-emerald-600" }
];

const fallbackMeals = [
  { id: 1, name: "Miso-Glazed Salmon Bowl", kcal: 420, protein: "34g Protein", time: "Today, 1:15 PM", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
  { id: 2, name: "Avocado & Flax Toast", kcal: 310, protein: "12g Protein", time: "Today, 8:30 AM", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" }
];

const fallbackMealPlans = [
  { tag: "BREAKFAST", tagIcon: "fork", title: "Spiced Almond Oats", desc: "Rolled oats infused with cinnamon, organic almond butter, and clean vegan proteins.", stars: 2, swapLabel: "Swap Breakfast" },
  { tag: "LUNCH", tagIcon: "grid", title: "Mediterranean Quinoa Bowl", desc: "Crisp garden greens, toasted kalamata olives, house hummus, and extra virgin olive dressing.", stars: 1, swapLabel: "Swap Lunch" }
];

const fallbackHealthProfile = {
  bloodGlucose: { current: 104, min: 70, max: 140, status: "Optimal Range", dash: 110, circ: 251.2 },
  bloodPressure: { systolic: 118, diastolic: 76, status: "Normal" },
  regimen: [
    { name: "Omega-3 Fish Oil", dosage: "1000mg", schedule: "With Breakfast", category: "Supplement" },
    { name: "Vitamin D3 + K2", dosage: "5000 IU", schedule: "With Breakfast", category: "Supplement" }
  ]
};

const fallbackOrders = [
  { id: "OR-9482", items: "Blood Glucose Test Strips x50", total: "$29.40", status: "In Transit", eta: "Expected Jan 20" }
];

const fallbackConsultations = {
  slots: ["9:00 AM - 9:30 AM", "11:00 AM - 11:30 AM", "2:30 PM - 3:00 PM"]
};