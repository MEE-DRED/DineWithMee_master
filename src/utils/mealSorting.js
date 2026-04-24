export const sortMeals = (meals, sortBy) => {
  const sorted = [...meals];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'calories-low':
      return sorted.sort((a, b) => a.nutrition.calories - b.nutrition.calories);
    case 'calories-high':
      return sorted.sort((a, b) => b.nutrition.calories - a.nutrition.calories);
    case 'protein-high':
      return sorted.sort((a, b) => b.nutrition.protein - a.nutrition.protein);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sorted; // Keep original order (featured)
  }
};
