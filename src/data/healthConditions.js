export const healthConditions = [
  {
    id: "sickle-cell",
    title: "Sickle Cell Support",
    preview: "Build blood-supportive habits with hydration, iron-folate meals, and anti-inflammatory food patterns.",
    clinicalFocus: "Sickle cell disease can reduce oxygen delivery and increase fatigue episodes, making nutrient density and hydration essential.",
    nutritionPriorities: [
      "Hydration throughout the day",
      "Iron and folate-rich foods from greens and legumes",
      "Protein support for recovery and energy resilience"
    ],
    links: [
      { text: "View supportive meals", href: "/marketplace" },
      { text: "Use goal filter", href: "/#health-goals" }
    ]
  },
  {
    id: "hypertension",
    title: "Hypertension Support",
    preview: "Lower dietary sodium burden while preserving flavor through whole-food African patterns.",
    clinicalFocus: "Persistent elevated blood pressure increases long-term cardiovascular and kidney risk.",
    nutritionPriorities: [
      "Reduce processed salty foods and hidden sodium",
      "Increase vegetables, legumes, and potassium-rich ingredients",
      "Prefer grilled, boiled, or lightly sauteed meals"
    ],
    links: [
      { text: "Explore heart-friendly meals", href: "/marketplace" },
      { text: "Read evidence summary", href: "/research" }
    ]
  },
  {
    id: "diabetes",
    title: "Diabetes Care",
    preview: "Stabilize glucose with high-fiber meals, protein pairing, and improved carbohydrate quality.",
    clinicalFocus: "Diabetes management improves with consistent, lower glycemic meal structure and better portion quality.",
    nutritionPriorities: [
      "Prioritize legumes, vegetables, and whole-grain options",
      "Combine carbohydrates with protein or healthy fat",
      "Use steady meal timing to reduce sharp glucose swings"
    ],
    links: [
      { text: "Find diabetes meals", href: "/marketplace" },
      { text: "Apply diabetes filter", href: "/#health-goals" }
    ]
  },
  {
    id: "obesity",
    title: "Weight Management",
    preview: "Build satiety and reduce excess calories through macro-balanced African meal planning.",
    clinicalFocus: "Weight gain risk is often tied to low satiety food patterns and inconsistent meal quality.",
    nutritionPriorities: [
      "Increase fiber and protein to improve fullness",
      "Reduce sugar-dense drinks and ultra-processed snacks",
      "Keep meal rhythm predictable and hydration consistent"
    ],
    links: [
      { text: "Browse weight-supportive meals", href: "/marketplace" },
      { text: "See behavior evidence", href: "/research" }
    ]
  }
];

export const trimesters = [
  {
    id: 1,
    title: "First Trimester (Weeks 1-12)",
    nutritionalNeeds: [
      "Folate for neural tube support",
      "Iron for blood volume preparation",
      "Protein to support early tissue formation"
    ],
    foodSources: "Leafy greens, beans, eggs, fish, fortified grains, avocado, and citrus-rich fruits.",
    guidance: "Prioritize smaller, frequent meals to manage nausea and maintain energy stability through the day.",
    recommendedMeals: ["Moi Moi", "Efo Riro", "Molokhia"]
  },
  {
    id: 2,
    title: "Second Trimester (Weeks 13-26)",
    nutritionalNeeds: [
      "Increased iron and protein for rapid growth",
      "Calcium-supportive foods for bone development",
      "Fiber for digestive comfort"
    ],
    foodSources: "Lean meats, legumes, milk or fortified alternatives, nuts, whole grains, and colorful vegetables.",
    guidance: "Build balanced plates with protein, vegetables, and quality carbs while monitoring hydration and satiety.",
    recommendedMeals: ["Ndole", "Brochettes", "Afang Soup"]
  },
  {
    id: 3,
    title: "Third Trimester (Weeks 27-40)",
    nutritionalNeeds: [
      "Protein and iron to support late-stage growth",
      "Energy-dense but nutrient-rich meal choices",
      "Hydration and anti-inflammatory food support"
    ],
    foodSources: "Fish, poultry, legumes, whole grains, leafy greens, fruit, and omega-supportive oils and seeds.",
    guidance: "Use digestible meals, avoid long fasting windows, and plan iron-rich combinations with vitamin C sources.",
    recommendedMeals: ["Injera and Doro Wat", "Tagine", "Isombe"]
  }
];
