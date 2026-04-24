// ============================================
// DINE WITH MEE — Unified app.js
// Includes data + UI logic for home and marketplace
// ============================================

const MEALS = [
  { id: 'm1', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Jollof Rice', desc: 'Spiced tomato rice cooked with peppers, onions, and served with protein.', image: 'https://www.allrecipes.com/thmb/EJn9SMTzr4QRkdiWdi3ZBgC0Clw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/7499757JollofriceChefJohn4x3-d601da10d7e845d1ad4c8656a5b87ed4.jpg', ingredients: ['Rice', 'Tomatoes', 'Red pepper', 'Onions', 'Vegetable oil', 'Chicken'], nutrition: { calories: 550, protein: 22, carbs: 75, fats: 18 }, ingredientNutrition: ['Tomatoes -> Vitamin C (boosts immunity)', 'Rice -> Carbs (energy)', 'Chicken -> Protein (muscle repair)'], healthTags: ['Heart-healthy', 'Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm2', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Efo Riro', desc: 'Spinach-based vegetable soup rich in flavor.', image: 'https://lowcarbafrica.com/wp-content/uploads/2019/08/Efo-Riro-IG-1.jpg', ingredients: ['Spinach', 'Palm oil', 'Beef', 'Pepper', 'Onions'], nutrition: { calories: 450, protein: 25, carbs: 20, fats: 28 }, ingredientNutrition: ['Spinach -> Iron (prevents anaemia)', 'Beef -> Protein + Iron', 'Palm oil -> Vitamin A'], healthTags: ['High Iron', 'Pregnancy-friendly'], price: 4200, currency: 'RWF', tag: '' },
  { id: 'm3', region: 'West Africa', country: 'Ghana', emoji: '🇬🇭', name: 'Waakye', desc: 'Rice and beans cooked with millet leaves.', image: 'https://eatwellabi.com/wp-content/uploads/2021/09/Waakye-13.jpg', ingredients: ['Rice', 'Beans', 'Millet leaves', 'Oil'], nutrition: { calories: 520, protein: 18, carbs: 80, fats: 12 }, ingredientNutrition: ['Beans -> Protein + Fiber', 'Rice -> Energy', 'Millet leaves -> Antioxidants'], healthTags: ['Diabetes-friendly', 'High Fiber'], price: 4300, currency: 'RWF', tag: '' },
  { id: 'm4', region: 'East Africa', country: 'Rwanda', emoji: '🇷🇼', name: 'Agatogo', desc: 'Plantain stew with vegetables and meat.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLi3yCJhUcnQOm5AKPO1Wx7028S3fqvtjSkQ&s', ingredients: ['Plantain', 'Tomatoes', 'Onions', 'Beef'], nutrition: { calories: 480, protein: 20, carbs: 65, fats: 15 }, ingredientNutrition: ['Plantain -> Potassium (heart health)', 'Beef -> Protein', 'Tomatoes -> Antioxidants'], healthTags: ['Heart-healthy'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm5', region: 'East Africa', country: 'Kenya', emoji: '🇰🇪', name: 'Ugali & Sukuma Wiki', desc: 'Maize meal with sauteed kale.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHw4pF7SZjJGv9XK1LWSOT24Ga5L2GTuFmQ&s', ingredients: ['Maize flour', 'Kale', 'Onions', 'Oil'], nutrition: { calories: 400, protein: 12, carbs: 70, fats: 10 }, ingredientNutrition: ['Kale -> Iron + Calcium', 'Maize -> Energy'], healthTags: ['High Iron', 'Weight-loss friendly'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm6', region: 'East Africa', country: 'Ethiopia', emoji: '🇪🇹', name: 'Injera & Doro Wat', desc: 'Fermented flatbread served with spicy chicken stew.', image: 'https://images.prismic.io/jewishfoodsociety/42fe0a0b-f641-4567-8ac2-ec3785baf226_Doro_Wat_178.jpg?auto=compress,format', ingredients: ['Teff flour', 'Chicken', 'Spices'], nutrition: { calories: 600, protein: 30, carbs: 70, fats: 20 }, ingredientNutrition: ['Teff -> Iron', 'Chicken -> Protein'], healthTags: ['High Iron'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm7', region: 'Southern Africa', country: 'South Africa', emoji: '🇿🇦', name: 'Bunny Chow', desc: 'Bread filled with curry.', image: 'https://thecinnamonjar.com/wp-content/uploads/2024/07/bunny-chow-3-of-3-500x500.jpg', ingredients: ['Bread', 'Beans', 'Curry spices'], nutrition: { calories: 650, protein: 20, carbs: 85, fats: 22 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm8', region: 'North Africa', country: 'Egypt', emoji: '🇪🇬', name: 'Koshari', desc: 'Rice, lentils, pasta mix with tomato sauce.', image: 'https://www.chocolatesandchai.com/wp-content/uploads/2023/02/Egyptian-Koshari-Featured.jpg', ingredients: ['Rice', 'Lentils', 'Pasta', 'Tomatoes'], nutrition: { calories: 580, protein: 22, carbs: 90, fats: 12 }, ingredientNutrition: [], healthTags: ['High Fiber', 'Diabetes-friendly'], price: 4200, currency: 'RWF', tag: '' },
  { id: 'm9', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Moi Moi', desc: 'Steamed bean pudding.', image: 'https://www.mydiasporakitchen.com/wp-content/uploads/2019/06/savingpng-19.png', ingredients: ['Beans', 'Pepper', 'Oil'], nutrition: { calories: 300, protein: 18, carbs: 30, fats: 12 }, ingredientNutrition: [], healthTags: ['Pregnancy-friendly', 'High Protein'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm10', region: 'West Africa', country: 'Ghana', emoji: '🇬🇭', name: 'Banku & Tilapia', desc: 'Fermented corn dough with grilled fish.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpTjAulBCOP7lxAvEDA1Ziv_DVvKm5dLUqJQ&s', ingredients: ['Corn dough', 'Tilapia'], nutrition: { calories: 520, protein: 28, carbs: 60, fats: 15 }, ingredientNutrition: [], healthTags: ['Heart-healthy'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm11', region: 'East Africa', country: 'Rwanda', emoji: '🇷🇼', name: 'Isombe', desc: 'Cassava leaves cooked with peanut paste.', image: 'https://wvusstatic.com/www/uploads/2018/07/D400-1666-02-copy.jpg', ingredients: ['Cassava leaves', 'Peanuts'], nutrition: { calories: 430, protein: 18, carbs: 35, fats: 22 }, ingredientNutrition: [], healthTags: ['High Iron'], price: 3800, currency: 'RWF', tag: '' },
  { id: 'm12', region: 'East Africa', country: 'Kenya', emoji: '🇰🇪', name: 'Nyama Choma', desc: 'Grilled meat.', image: 'https://foreignfork.com/wp-content/uploads/2023/08/NyamaChoma-FEATURE.jpg', ingredients: ['Goat meat', 'Spices'], nutrition: { calories: 600, protein: 35, carbs: 5, fats: 40 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm13', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Egusi Soup', desc: 'Melon seed soup with vegetables.', image: 'https://weeatatlast.com/wp-content/uploads/2024/01/egusi-soup-with-chicken-recipe-500x500.jpg', ingredients: ['Egusi', 'Spinach', 'Meat'], nutrition: { calories: 550, protein: 28, carbs: 20, fats: 35 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm14', region: 'East Africa', country: 'Ethiopia', emoji: '🇪🇹', name: 'Shiro', desc: 'Chickpea stew.', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Taita_and_shiro.jpg', ingredients: ['Chickpeas', 'Spices'], nutrition: { calories: 400, protein: 20, carbs: 50, fats: 12 }, ingredientNutrition: [], healthTags: ['Diabetes-friendly'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm15', region: 'North Africa', country: 'Morocco', emoji: '🇲🇦', name: 'Tagine', desc: 'Slow-cooked stew with meat and vegetables.', image: 'https://theplantbasedschool.com/wp-content/uploads/2025/02/Tagine-recipe-4-1.jpg', ingredients: ['Chicken', 'Vegetables', 'Spices'], nutrition: { calories: 500, protein: 30, carbs: 40, fats: 20 }, ingredientNutrition: [], healthTags: ['Heart-healthy'], price: 4800, currency: 'RWF', tag: '' },
  { id: 'm16', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Pepper Soup', desc: 'Light spicy broth.', image: 'https://allnigerianfoods.com/wp-content/uploads/pepper-soup-recipe-500x500.jpg', ingredients: ['Fish', 'Spices'], nutrition: { calories: 250, protein: 25, carbs: 5, fats: 10 }, ingredientNutrition: [], healthTags: ['Weight-loss friendly'], price: 3200, currency: 'RWF', tag: '' },
  { id: 'm17', region: 'West Africa', country: 'Ghana', emoji: '🇬🇭', name: 'Fufu & Light Soup', desc: 'Cassava dough with soup.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTq5CC3YjVubAv8fluUSHmqGmqEM6zCZbtmA&s', ingredients: ['Cassava', 'Tomatoes', 'Fish'], nutrition: { calories: 600, protein: 25, carbs: 85, fats: 15 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm18', region: 'East Africa', country: 'Kenya', emoji: '🇰🇪', name: 'Pilau', desc: 'Spiced rice dish.', image: 'https://cheflolaskitchen.com/wp-content/uploads/2025/07/East-African-Pilau-Kenyan-pilau.jpg', ingredients: ['Rice', 'Beef', 'Spices', 'Onions'], nutrition: { calories: 550, protein: 20, carbs: 75, fats: 18 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 4200, currency: 'RWF', tag: '' },
  { id: 'm19', region: 'Southern Africa', country: 'South Africa', emoji: '🇿🇦', name: 'Pap & Chakalaka', desc: 'Smooth maize porridge served with a spicy vegetable relish.', image: 'https://www.royco.co.za/cdn-cgi/image/width=1360,height=583,f=auto,quality=90/sites/g/files/fnmzdf1866/files/2025-01/Easy%20Chakalaka_Pap%20%26%20Wors.png', ingredients: ['Maize meal', 'Tomatoes', 'Onions', 'Beans', 'Carrots', 'Chili', 'Oil'], nutrition: { calories: 480, protein: 14, carbs: 75, fats: 12 }, ingredientNutrition: ['Maize -> Carbohydrates (energy source)', 'Beans -> Fiber + Protein (blood sugar control)', 'Carrots -> Vitamin A (immune support)', 'Tomatoes -> Antioxidants'], healthTags: ['High Fiber', 'Diabetes-friendly'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm20', region: 'North Africa', country: 'Egypt', emoji: '🇪🇬', name: 'Ful Medames', desc: 'Slow-cooked fava beans seasoned with olive oil, garlic, and lemon.', image: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MKIW7MTJRAI6ZE4Q5LRED5GIWE.jpg&w=1100', ingredients: ['Fava beans', 'Olive oil', 'Garlic', 'Lemon'], nutrition: { calories: 420, protein: 20, carbs: 55, fats: 14 }, ingredientNutrition: ['Fava beans -> Fiber (blood sugar regulation)', 'Olive oil -> Healthy fats (heart health)', 'Garlic -> Immunity support'], healthTags: ['Diabetes-friendly', 'Heart-healthy'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm21', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Okra Soup', desc: 'A rich slimy vegetable soup known for digestive and blood sugar benefits.', image: 'https://img-global.cpcdn.com/recipes/9f42c9ce2d01ba12/680x781cq80/excutive-spicy-okra-soup-recipe-main-photo.jpg', ingredients: ['Okra', 'Palm oil', 'Fish', 'Pepper', 'Onions'], nutrition: { calories: 420, protein: 22, carbs: 25, fats: 24 }, ingredientNutrition: ['Okra -> Soluble fiber (controls blood sugar)', 'Fish -> Protein + Omega-3 (heart health)', 'Palm oil -> Vitamin A'], healthTags: ['High Fiber', 'Diabetes-friendly'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm22', region: 'West Africa', country: 'Ghana', emoji: '🇬🇭', name: 'Kenkey', desc: 'Fermented corn dough often served with fish and spicy pepper sauce.', image: 'https://media-cdn.tripadvisor.com/media/photo-s/2b/50/33/c1/authentic-ghanaian-local.jpg', ingredients: ['Corn dough', 'Fish', 'Pepper sauce'], nutrition: { calories: 500, protein: 24, carbs: 65, fats: 14 }, ingredientNutrition: ['Corn -> Energy (carbohydrates)', 'Fish -> Protein + Omega-3', 'Fermentation -> Gut health'], healthTags: ['Energy-rich', 'Heart-healthy'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm23', region: 'East Africa', country: 'Rwanda', emoji: '🇷🇼', name: 'Brochettes', desc: 'Grilled skewered meat, widely enjoyed as street food in Rwanda.', image: 'https://www.grutto.com/storage/recipes/fr/BBQ%20inspiration/website.jpg', ingredients: ['Beef', 'Onions', 'Spices'], nutrition: { calories: 550, protein: 35, carbs: 5, fats: 38 }, ingredientNutrition: ['Beef -> Iron (prevents anaemia)', 'Onions -> Antioxidants'], healthTags: ['High Protein', 'High Iron'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm24', region: 'East Africa', country: 'Ethiopia', emoji: '🇪🇹', name: 'Kitfo', desc: 'Minced raw beef mixed with spices and clarified butter.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTOrkZiWpdZ72SVh87eQSkXctDEzrZRSC_g&s', ingredients: ['Beef', 'Butter', 'Spices'], nutrition: { calories: 600, protein: 40, carbs: 2, fats: 45 }, ingredientNutrition: ['Beef -> Iron (supports red blood cells)', 'Butter -> Healthy fats (energy)'], healthTags: ['High Iron', 'High Protein'], price: 5500, currency: 'RWF', tag: '' },
  { id: 'm25', region: 'North Africa', country: 'Morocco', emoji: '🇲🇦', name: 'Couscous', desc: 'Steamed semolina grains served with vegetables and meat.', image: 'https://www.errenskitchen.com/wp-content/uploads/2018/08/couscous-c.jpg', ingredients: ['Semolina', 'Carrots', 'Zucchini', 'Chickpeas', 'Chicken'], nutrition: { calories: 520, protein: 25, carbs: 70, fats: 15 }, ingredientNutrition: ['Chickpeas -> Protein + Fiber', 'Vegetables -> Vitamins + antioxidants', 'Chicken -> Lean protein'], healthTags: ['Heart-healthy', 'Balanced diet'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm26', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Banga Soup', desc: 'A rich palm fruit soup popular in southern Nigeria.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYA0OEIYYnib_d52el9YK42H5sgm5OSXCV5w&s', ingredients: ['Palm fruit extract', 'Fish', 'Spices'], nutrition: { calories: 480, protein: 25, carbs: 18, fats: 32 }, ingredientNutrition: ['Palm fruit -> Vitamin A (eye health)', 'Fish -> Omega-3 (heart health)'], healthTags: ['High Iron', 'Heart-healthy'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm27', region: 'East Africa', country: 'Kenya', emoji: '🇰🇪', name: 'Githeri', desc: 'A nutritious mix of boiled maize and beans.', image: 'https://www.africanbites.com/wp-content/uploads/2024/09/Githeri-1-scaled-e1726066907466-500x375.jpg', ingredients: ['Maize', 'Beans'], nutrition: { calories: 450, protein: 20, carbs: 65, fats: 10 }, ingredientNutrition: ['Beans -> Fiber (blood sugar control)', 'Maize -> Energy'], healthTags: ['Diabetes-friendly', 'High Fiber'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm28', region: 'Southern Africa', country: 'South Africa', emoji: '🇿🇦', name: 'Boerewors', desc: 'Traditional South African sausage made from beef and spices.', image: 'https://www.unileverfoodsolutions.co.za/dam/global-ufs/mcos/SOUTH-AFRICA/calcmenu/recipes/ZA-recipes/red-meats-&-red-meat-dishes/boerewors-and-chakalaka-rolls/main-header.jpg', ingredients: ['Beef', 'Spices'], nutrition: { calories: 650, protein: 30, carbs: 3, fats: 50 }, ingredientNutrition: ['Beef -> Protein + Iron'], healthTags: ['High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm29', region: 'North Africa', country: 'Egypt', emoji: '🇪🇬', name: 'Molokhia', desc: 'A leafy green stew cooked with garlic and broth.', image: 'https://www.simplyleb.com/wp-content/uploads/Molokhia-17.jpg', ingredients: ['Molokhia leaves', 'Garlic', 'Chicken broth'], nutrition: { calories: 400, protein: 22, carbs: 20, fats: 18 }, ingredientNutrition: ['Molokhia -> Iron + Calcium', 'Garlic -> Immunity boost'], healthTags: ['High Iron', 'Pregnancy-friendly'], price: 3800, currency: 'RWF', tag: '' },
  { id: 'm30', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Ofada Rice & Sauce', desc: 'Local Nigerian rice served with spicy pepper sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdVhBVsYXmbMOrXPTNf2_xw1vqgfBTX4Mag&s', ingredients: ['Ofada rice', 'Palm oil', 'Pepper', 'Assorted meat'], nutrition: { calories: 580, protein: 20, carbs: 75, fats: 22 }, ingredientNutrition: ['Rice -> Energy', 'Pepper -> Metabolism boost', 'Meat -> Protein'], healthTags: ['Energy-rich', 'High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm31', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Okra Soup (Classic)', desc: 'Slimy vegetable soup rich in fiber and micronutrients.', image: 'https://img-global.cpcdn.com/recipes/9f42c9ce2d01ba12/680x781cq80/excutive-spicy-okra-soup-recipe-main-photo.jpg', ingredients: ['Okra', 'Palm oil', 'Fish', 'Pepper', 'Onions'], nutrition: { calories: 420, protein: 22, carbs: 25, fats: 24 }, ingredientNutrition: ['Okra -> Fiber (aids digestion, regulates blood sugar)', 'Fish -> Protein + Omega-3', 'Palm oil -> Vitamin A'], healthTags: ['High Fiber', 'Diabetes-friendly'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm32', region: 'West Africa', country: 'Ghana', emoji: '🇬🇭', name: 'Kenkey & Fish', desc: 'Fermented corn dough served with grilled fish.', image: 'https://media-cdn.tripadvisor.com/media/photo-s/2b/50/33/c1/authentic-ghanaian-local.jpg', ingredients: ['Corn dough', 'Fish', 'Pepper sauce'], nutrition: { calories: 500, protein: 25, carbs: 65, fats: 14 }, ingredientNutrition: ['Corn -> Energy', 'Fish -> Protein + Heart health'], healthTags: ['Heart-healthy'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm33', region: 'East Africa', country: 'Rwanda', emoji: '🇷🇼', name: 'Brochettes (Street)', desc: 'Grilled meat skewers popular across Rwanda.', image: 'https://www.grutto.com/storage/recipes/fr/BBQ%20inspiration/website.jpg', ingredients: ['Beef', 'Onions', 'Spices'], nutrition: { calories: 550, protein: 35, carbs: 5, fats: 38 }, ingredientNutrition: ['Beef -> Iron + Protein', 'Onions -> Antioxidants'], healthTags: ['High Protein', 'High Iron'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm34', region: 'East Africa', country: 'Ethiopia', emoji: '🇪🇹', name: 'Kitfo (Traditional)', desc: 'Minced raw beef with spices and butter.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTOrkZiWpdZ72SVh87eQSkXctDEzrZRSC_g&s', ingredients: ['Beef', 'Butter', 'Spices'], nutrition: { calories: 600, protein: 40, carbs: 2, fats: 45 }, ingredientNutrition: ['Beef -> Iron (prevents anaemia)', 'Butter -> Healthy fats'], healthTags: ['High Iron'], price: 5500, currency: 'RWF', tag: '' },
  { id: 'm35', region: 'North Africa', country: 'Morocco', emoji: '🇲🇦', name: 'Couscous (Steamed)', desc: 'Steamed semolina served with vegetables and meat.', image: 'https://www.errenskitchen.com/wp-content/uploads/2018/08/couscous-c.jpg', ingredients: ['Semolina', 'Vegetables', 'Chicken'], nutrition: { calories: 520, protein: 25, carbs: 70, fats: 15 }, ingredientNutrition: ['Vegetables -> Vitamins', 'Chicken -> Protein'], healthTags: ['Heart-healthy'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm36', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Banga Soup (Palm Fruit)', desc: 'Palm fruit soup rich in flavor.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYA0OEIYYnib_d52el9YK42H5sgm5OSXCV5w&s', ingredients: ['Palm fruit', 'Fish', 'Spices'], nutrition: { calories: 480, protein: 25, carbs: 18, fats: 32 }, ingredientNutrition: ['Palm fruit -> Vitamin A', 'Fish -> Omega-3'], healthTags: ['High Iron'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm37', region: 'East Africa', country: 'Kenya', emoji: '🇰🇪', name: 'Githeri (Maize & Beans)', desc: 'Maize and beans mix.', image: 'https://www.africanbites.com/wp-content/uploads/2024/09/Githeri-1-scaled-e1726066907466-500x375.jpg', ingredients: ['Maize', 'Beans'], nutrition: { calories: 450, protein: 20, carbs: 65, fats: 10 }, ingredientNutrition: ['Beans -> Fiber + Protein', 'Maize -> Energy'], healthTags: ['Diabetes-friendly'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm38', region: 'Southern Africa', country: 'South Africa', emoji: '🇿🇦', name: 'Boerewors (Traditional)', desc: 'Traditional sausage.', image: 'https://www.unileverfoodsolutions.co.za/dam/global-ufs/mcos/SOUTH-AFRICA/calcmenu/recipes/ZA-recipes/red-meats-&-red-meat-dishes/boerewors-and-chakalaka-rolls/main-header.jpg', ingredients: ['Beef', 'Spices'], nutrition: { calories: 650, protein: 30, carbs: 3, fats: 50 }, ingredientNutrition: ['Beef -> Protein + Iron'], healthTags: ['High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm39', region: 'North Africa', country: 'Egypt', emoji: '🇪🇬', name: 'Molokhia (Leafy Green Stew)', desc: 'Leafy green stew.', image: 'https://www.simplyleb.com/wp-content/uploads/Molokhia-17.jpg', ingredients: ['Molokhia leaves', 'Garlic', 'Chicken'], nutrition: { calories: 400, protein: 22, carbs: 20, fats: 18 }, ingredientNutrition: ['Leaves -> Iron', 'Garlic -> Immunity'], healthTags: ['High Iron'], price: 3800, currency: 'RWF', tag: '' },
  { id: 'm40', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Ofada Rice & Sauce (Local)', desc: 'Local rice with spicy sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdVhBVsYXmbMOrXPTNf2_xw1vqgfBTX4Mag&s', ingredients: ['Ofada rice', 'Pepper', 'Oil'], nutrition: { calories: 580, protein: 18, carbs: 75, fats: 22 }, ingredientNutrition: ['Rice -> Energy', 'Pepper -> Metabolism'], healthTags: ['Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm41', region: 'East Africa', country: 'Uganda', emoji: '🇺🇬', name: 'Matoke', desc: 'Steamed green plantains cooked with vegetables and optional meat.', image: 'https://healthiersteps.com/wp-content/uploads/2018/01/matoke-overlay-2.jpg', ingredients: ['Green plantain', 'Tomatoes', 'Onions', 'Leafy vegetables', 'Beef'], nutrition: { calories: 480, protein: 15, carbs: 70, fats: 12 }, ingredientNutrition: ['Plantain -> Potassium (supports heart function)', 'Vegetables -> Vitamins (immune support)', 'Beef -> Protein + Iron'], healthTags: ['Heart-healthy', 'Pregnancy-friendly'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm42', region: 'East Africa', country: 'Tanzania', emoji: '🇹🇿', name: 'Zanzibar Pilau', desc: 'A fragrant spiced rice dish cooked with meat and aromatic spices.', image: 'https://piquantpost.com/cdn/shop/articles/HgyvLcmICGQOjfkwA5lKQ_4a8b9519-06a5-428f-a073-f0bdc0f7b7f3_800x.jpg?v=1606230813', ingredients: ['Rice', 'Beef/chicken', 'Cloves', 'Cinnamon', 'Cumin', 'Onions'], nutrition: { calories: 560, protein: 22, carbs: 75, fats: 18 }, ingredientNutrition: ['Spices -> Anti-inflammatory', 'Meat -> Protein', 'Rice -> Energy'], healthTags: ['Energy-rich', 'Heart-healthy'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm43', region: 'West Africa', country: 'Senegal', emoji: '🇸🇳', name: 'Thieboudienne', desc: 'Rice cooked with fish and vegetables.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHkMDPJLpAK_ncJWc16tpJcl1ZSzCo07Pgg&s', ingredients: ['Rice', 'Fish', 'Carrots', 'Cabbage', 'Tomatoes'], nutrition: { calories: 600, protein: 30, carbs: 80, fats: 18 }, ingredientNutrition: ['Fish -> Omega-3 (heart health)', 'Vegetables -> Fiber + vitamins'], healthTags: ['Heart-healthy', 'Balanced diet'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm44', region: 'Central Africa', country: 'Cameroon', emoji: '🇨🇲', name: 'Ndole', desc: 'A rich stew made with bitterleaf, peanuts, and meat or fish.', image: 'https://constancemagazine.com/wp-content/uploads/2019/11/Ndole.jpg', ingredients: ['Bitterleaf', 'Peanuts', 'Beef/fish', 'Onions'], nutrition: { calories: 520, protein: 28, carbs: 25, fats: 30 }, ingredientNutrition: ['Bitterleaf -> Iron (anaemia prevention)', 'Peanuts -> Healthy fats + protein'], healthTags: ['High Iron', 'Pregnancy-friendly'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm45', region: 'West Africa', country: "Cote d'Ivoire", emoji: '🇨🇮', name: 'Attieke & Fish', desc: 'Fermented cassava couscous served with grilled fish.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4nO5tvhL6XCggn_s93tpqkMZQAmnPXIkCg&s', ingredients: ['Cassava', 'Fish', 'Onions', 'Tomatoes'], nutrition: { calories: 500, protein: 25, carbs: 65, fats: 15 }, ingredientNutrition: ['Cassava -> Energy', 'Fish -> Omega-3'], healthTags: ['Heart-healthy'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm46', region: 'West Africa', country: 'Mali', emoji: '🇲🇱', name: 'Maafe', desc: 'A peanut-based stew with meat and vegetables.', image: 'https://static01.nyt.com/images/2022/11/02/dining/26komolaferex-maafe/merlin_215042799_bc2aa535-f2b8-4897-aa66-e8e48813a953-threeByTwoMediumAt2X.jpg', ingredients: ['Peanuts', 'Beef/chicken', 'Tomatoes', 'Onions'], nutrition: { calories: 600, protein: 28, carbs: 40, fats: 35 }, ingredientNutrition: ['Peanuts -> Protein + healthy fats', 'Meat -> Muscle repair'], healthTags: ['High Protein', 'Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm47', region: 'Southern Africa', country: 'Zambia', emoji: '🇿🇲', name: 'Nshima', desc: 'Thick maize porridge served with vegetables or meat.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBYClPKbG1i6JsRBefI3B-OizbPc-rtCMtQ&s', ingredients: ['Maize flour', 'Vegetables', 'Meat'], nutrition: { calories: 450, protein: 14, carbs: 75, fats: 10 }, ingredientNutrition: ['Maize -> Energy', 'Vegetables -> Fiber'], healthTags: ['Energy-rich'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm48', region: 'Southern Africa', country: 'Botswana', emoji: '🇧🇼', name: 'Seswaa', desc: 'Slow-cooked shredded beef traditionally served with maize meal.', image: 'https://theafrikanstore.com/cdn/shop/articles/seswaa-beef-_botswana_800x.webp?v=1692641721', ingredients: ['Beef', 'Salt', 'Onions'], nutrition: { calories: 550, protein: 35, carbs: 5, fats: 38 }, ingredientNutrition: ['Beef -> Iron + Protein'], healthTags: ['High Protein', 'High Iron'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm49', region: 'Southern Africa', country: 'Namibia', emoji: '🇳🇦', name: 'Kapana', desc: 'Street-style grilled meat served with spicy seasoning.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWPsHvpIf6B3z-IKR0fU4aKQo0S-bgE7Fvtw&s', ingredients: ['Beef', 'Spices', 'Chili'], nutrition: { calories: 500, protein: 32, carbs: 5, fats: 35 }, ingredientNutrition: ['Beef -> Protein', 'Chili -> Boosts metabolism'], healthTags: ['High Protein'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm50', region: 'East Africa', country: 'Sudan', emoji: '🇸🇩', name: 'Ful Sudanese', desc: 'A variation of stewed fava beans served with oil and spices.', image: 'https://travelandmunchies.com/wp-content/uploads/2022/12/IMG_6002-scaled.jpg', ingredients: ['Fava beans', 'Oil', 'Garlic'], nutrition: { calories: 400, protein: 18, carbs: 50, fats: 12 }, ingredientNutrition: ['Beans -> Fiber (blood sugar control)'], healthTags: ['Diabetes-friendly'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm51', region: 'North Africa', country: 'Algeria', emoji: '🇩🇿', name: 'Chakchouka', desc: 'Tomato and pepper stew with eggs.', image: 'https://www.allrecipes.com/thmb/6X6yMwmWIOxytR_P74lFSMRTimk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/213717-Chakchouka-DDMFS-4x3-1373-6721f79ac68347d28df5e8e44cdab25d.jpg', ingredients: ['Tomatoes', 'Peppers', 'Eggs', 'Onions'], nutrition: { calories: 350, protein: 18, carbs: 25, fats: 18 }, ingredientNutrition: ['Eggs -> Protein', 'Tomatoes -> Antioxidants'], healthTags: ['Heart-healthy'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm52', region: 'North Africa', country: 'Tunisia', emoji: '🇹🇳', name: 'Brik', desc: 'Crispy pastry filled with egg and tuna.', image: 'https://sodelicious.recipes/wp-content/uploads/2018/07/14-11-2017-R3-chefs-var2-Tunisian-Brik-e1534248004535.jpg', ingredients: ['Pastry', 'Egg', 'Tuna'], nutrition: { calories: 450, protein: 20, carbs: 35, fats: 25 }, ingredientNutrition: ['Tuna -> Omega-3', 'Egg -> Protein'], healthTags: ['Energy-rich'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm53', region: 'Southern Africa', country: 'Madagascar', emoji: '🇲🇬', name: 'Romazava', desc: 'A traditional Malagasy meat and leafy greens stew.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pgCwhqTDpKsHvgzmaPPm1PVEqXTG4uV9cQ&s', ingredients: ['Beef', 'Leafy greens', 'Onions'], nutrition: { calories: 420, protein: 26, carbs: 20, fats: 22 }, ingredientNutrition: ['Greens -> Iron', 'Beef -> Protein'], healthTags: ['High Iron'], price: 3800, currency: 'RWF', tag: '' },
  { id: 'm54', region: 'Southern Africa', country: 'Mozambique', emoji: '🇲🇿', name: 'Piri Piri Chicken', desc: 'Grilled chicken marinated in spicy chili sauce.', image: 'https://thebigmansworld.com/wp-content/uploads/2024/09/peri-peri-chicken-recipe-500x500.jpg', ingredients: ['Chicken', 'Chili', 'Garlic'], nutrition: { calories: 550, protein: 35, carbs: 5, fats: 38 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm55', region: 'Southern Africa', country: 'Angola', emoji: '🇦🇴', name: 'Muamba de Galinha', desc: 'Chicken stew cooked in palm oil with vegetables.', image: 'https://cdn.shopify.com/s/files/1/0745/8095/1353/files/moamba-de-galinha-www.conexaolusofona.org_480x480.jpg?v=1696884558', ingredients: ['Chicken', 'Palm oil', 'Okra'], nutrition: { calories: 600, protein: 30, carbs: 20, fats: 40 }, ingredientNutrition: [], healthTags: ['High Iron'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm56', region: 'East Africa', country: 'Eritrea', emoji: '🇪🇷', name: 'Zigni', desc: 'Spicy beef stew served with flatbread.', image: 'https://img.taste.com.au/AqLrxrHr/taste/2017/03/spicychickenzignicurry-122972-1.jpg', ingredients: ['Beef', 'Spices', 'Onions'], nutrition: { calories: 580, protein: 32, carbs: 30, fats: 32 }, ingredientNutrition: [], healthTags: ['High Iron'], price: 4800, currency: 'RWF', tag: '' },
  { id: 'm57', region: 'West Africa', country: 'Sierra Leone', emoji: '🇸🇱', name: 'Groundnut Soup', desc: 'Peanut-based soup with meat or fish.', image: 'https://cdn.guardian.ng/wp-content/uploads/2020/09/Groundnut-Soup.-Photo-The-Kitchen-Muse-e1599948546462.jpg', ingredients: ['Peanuts', 'Meat', 'Tomatoes'], nutrition: { calories: 600, protein: 30, carbs: 35, fats: 40 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm58', region: 'West Africa', country: 'Liberia', emoji: '🇱🇷', name: 'Palava Sauce', desc: 'Leafy vegetable stew with palm oil and protein.', image: 'https://cdn.ghanaweb.com/imagelib/pics/635/63512531.jpg', ingredients: ['Leaves', 'Palm oil', 'Fish'], nutrition: { calories: 500, protein: 25, carbs: 25, fats: 30 }, ingredientNutrition: [], healthTags: ['High Iron'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm59', region: 'West Africa', country: 'Gambia', emoji: '🇬🇲', name: 'Benachin', desc: 'One-pot rice dish with vegetables and meat.', image: 'https://img.chefkoch-cdn.de/rezepte/4296311711218065/bilder/1547989/crop-960x540/traditioneller-gambianischer-benachin.jpg', ingredients: ['Rice', 'Vegetables', 'Meat'], nutrition: { calories: 550, protein: 25, carbs: 75, fats: 18 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm60', region: 'Central Africa', country: 'DR Congo', emoji: '🇨🇩', name: 'Moambe Chicken', desc: 'Chicken cooked in palm nut sauce.', image: 'https://www.nutritionforme.org/wp-content/uploads/2024/02/N4ME-Images2-33.png', ingredients: ['Chicken', 'Palm nut sauce'], nutrition: { calories: 600, protein: 30, carbs: 20, fats: 40 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm61', region: 'Central Africa', country: 'Gabon', emoji: '🇬🇦', name: 'Nyembwe Chicken', desc: 'Chicken cooked in rich palm butter sauce.', image: 'https://www.196flavors.com/wp-content/uploads/2012/12/poulet-nyembwe-chicken-moambe-1-FP.jpg', ingredients: ['Chicken', 'Palm butter'], nutrition: { calories: 620, protein: 32, carbs: 18, fats: 42 }, ingredientNutrition: [], healthTags: ['High Iron'], price: 5200, currency: 'RWF', tag: '' },
  { id: 'm62', region: 'North Africa', country: 'Libya', emoji: '🇱🇾', name: 'Bazin', desc: 'Barley dough served with meat sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkZCAu11n5PonPEB1G2ornnxW_mJOryoCIIQ&s', ingredients: ['Barley', 'Meat', 'Tomato sauce'], nutrition: { calories: 500, protein: 22, carbs: 65, fats: 15 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 3800, currency: 'RWF', tag: '' },
  { id: 'm63', region: 'North Africa', country: 'Mauritania', emoji: '🇲🇷', name: 'Mechoui', desc: 'Slow-roasted lamb dish.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm28gelzowRUdapjNZHsAi97CHYPBA9tpXbQ&s', ingredients: ['Lamb', 'Spices'], nutrition: { calories: 650, protein: 40, carbs: 5, fats: 50 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 5500, currency: 'RWF', tag: '' },
  { id: 'm64', region: 'North Africa', country: 'Egypt', emoji: '🇪🇬', name: 'Hawawshi', desc: 'Stuffed bread with spiced minced meat.', image: 'https://tarasmulticulturaltable.com/wp-content/uploads/2021/09/Hawawshi-Egyptian-Meat-Stuffed-Bread-3-of-3.jpg', ingredients: ['Bread', 'Minced meat'], nutrition: { calories: 550, protein: 25, carbs: 60, fats: 22 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm65', region: 'Southern Africa', country: 'Zimbabwe', emoji: '🇿🇼', name: 'Sadza & Stew', desc: 'Maize meal served with meat or vegetable stew.', image: 'https://thumbs.dreamstime.com/b/delicious-plate-zimbabwean-sadza-served-beef-stew-saut%C3%A9ed-greens-warm-earthy-tones-featuring-hearty-serving-369861350.jpg', ingredients: ['Maize', 'Beef', 'Vegetables'], nutrition: { calories: 480, protein: 20, carbs: 70, fats: 12 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm66', region: 'Southern Africa', country: 'Lesotho', emoji: '🇱🇸', name: 'Motoho', desc: 'Fermented sorghum porridge.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDs8ax2jvWkijgMvzaq3Cu4C3_Y6z7vXtUg&s', ingredients: ['Sorghum'], nutrition: { calories: 350, protein: 10, carbs: 60, fats: 5 }, ingredientNutrition: ['Sorghum -> Gut health + fiber'], healthTags: ['Digestive-friendly'], price: 2500, currency: 'RWF', tag: '' },
  { id: 'm67', region: 'Southern Africa', country: 'Eswatini', emoji: '🇸🇿', name: 'Sishwala', desc: 'Maize porridge served with meat.', image: 'https://takrecipe.com/wp-content/uploads/2025/03/eswatini-sishwala.webp', ingredients: ['Maize', 'Meat'], nutrition: { calories: 450, protein: 18, carbs: 70, fats: 10 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm68', region: 'West Africa', country: 'Togo', emoji: '🇹🇬', name: 'Akume', desc: 'Fermented maize dough served with soup.', image: 'https://shopafricausa.com/cdn/shop/articles/82291247116770c21f29f6bac7a88c52_1478x.png?v=1693823151', ingredients: ['Maize', 'Soup'], nutrition: { calories: 430, protein: 15, carbs: 70, fats: 8 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 3000, currency: 'RWF', tag: '' },
  { id: 'm69', region: 'West Africa', country: 'Benin', emoji: '🇧🇯', name: 'Amiwo', desc: 'Spiced maize dish cooked in tomato sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-owBiDbFLrzknSJ7-ZjNADrvA7J7i4aiQQQ&s', ingredients: ['Maize', 'Tomatoes', 'Spices'], nutrition: { calories: 500, protein: 18, carbs: 75, fats: 15 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm70', region: 'West Africa', country: 'Niger', emoji: '🇳🇪', name: 'Dambou', desc: 'Couscous-like dish made from millet or wheat.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatQwOF4yho4-Jm0onSPqdap2rEciZQIrSmg&s', ingredients: ['Millet', 'Vegetables'], nutrition: { calories: 480, protein: 16, carbs: 70, fats: 12 }, ingredientNutrition: ['Millet -> Fiber (digestive health)'], healthTags: ['High Fiber'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm71', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Fried Rice', desc: 'A flavorful rice dish stir-fried with vegetables, spices, and protein, widely enjoyed across West Africa.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFofyoX4PTMn-is_oYuPPdCGg0_sjfpBEUw&s', ingredients: ['Rice', 'Carrots', 'Green peas', 'Sweet corn', 'Green beans', 'Liver/chicken', 'Onions', 'Oil', 'Spices'], nutrition: { calories: 550, protein: 22, carbs: 65, fats: 18 }, ingredientNutrition: ['Rice -> Carbohydrates (energy)', 'Carrots -> Vitamin A (eye health)', 'Green peas -> Plant protein + fiber', 'Liver -> Iron (prevents anemia)', 'Green beans -> Fiber (digestion)'], healthTags: ['Energy-rich', 'High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm72', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Coconut Rice', desc: 'Rice cooked in rich coconut milk, giving a creamy texture and tropical flavor.', image: 'https://cheflolaskitchen.com/wp-content/uploads/2015/10/Coconut-Rice-6-1-scaled.jpg', ingredients: ['Rice', 'Coconut milk', 'Onions', 'Spices', 'Oil', 'Fish/chicken'], nutrition: { calories: 600, protein: 18, carbs: 70, fats: 22 }, ingredientNutrition: ['Coconut milk -> Healthy fats (energy, brain function)', 'Rice -> Carbohydrates', 'Fish -> Omega-3 (heart health)'], healthTags: ['Energy-rich', 'Heart-healthy'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm73', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Asun (Spicy Goat Meat)', desc: 'Grilled goat meat tossed in spicy pepper sauce, a Nigerian delicacy.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjS4FnsUJmChu58UiD9QQmiHS1zPQ51uQmw&s', ingredients: ['Goat meat', 'Pepper', 'Onions', 'Spices', 'Oil'], nutrition: { calories: 500, protein: 35, carbs: 5, fats: 30 }, ingredientNutrition: ['Goat meat -> Protein + Iron', 'Pepper -> Vitamin C (immunity)', 'Onions -> Antioxidants'], healthTags: ['High Protein', 'Low Carb'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm74', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Isi Ewu', desc: 'Traditional Igbo delicacy made from goat head cooked in rich palm oil sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5UrIMveZ8S45gG_1aDbBzcDgDUXmNSclJzg&s', ingredients: ['Goat head', 'Palm oil', 'Utazi leaves', 'Spices'], nutrition: { calories: 650, protein: 30, carbs: 8, fats: 45 }, ingredientNutrition: ['Goat meat -> Protein + Iron', 'Palm oil -> Vitamin E (antioxidant)', 'Utazi -> Digestive support'], healthTags: ['High Protein', 'High Iron'], price: 5500, currency: 'RWF', tag: '' },
  { id: 'm75', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Beans Pottage', desc: 'Slow-cooked beans in a rich, savory sauce.', image: 'https://i0.wp.com/www.1qfoodplatter.com/wp-content/uploads/2012/10/Beans-Pottage-herby.jpg?ssl=1', ingredients: ['Beans', 'Palm oil', 'Onions', 'Pepper', 'Spices'], nutrition: { calories: 500, protein: 22, carbs: 65, fats: 15 }, ingredientNutrition: ['Beans -> Protein + Fiber (diabetes control)', 'Palm oil -> Healthy fats'], healthTags: ['Diabetes-friendly', 'High Fiber'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm76', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Yam Pottage (Asaro)', desc: 'Soft yam cooked in a rich tomato and pepper sauce.', image: 'https://cdn.guardian.ng/wp-content/uploads/2020/03/Yam-Pottage.-Photo-My-diaspora-kitchen.jpeg', ingredients: ['Yam', 'Palm oil', 'Tomatoes', 'Pepper', 'Fish/meat'], nutrition: { calories: 550, protein: 20, carbs: 70, fats: 18 }, ingredientNutrition: ['Yam -> Energy + Fiber', 'Fish -> Protein + Omega-3', 'Tomatoes -> Antioxidants'], healthTags: ['Energy-rich', 'Heart-healthy'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm77', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Plantain Pottage', desc: 'Ripe plantain cooked in a savory, slightly sweet sauce.', image: 'https://www.mydiasporakitchen.com/wp-content/uploads/2025/06/unripe-Plantain-porridge-0-500x500.jpeg', ingredients: ['Plantain', 'Palm oil', 'Vegetables', 'Spices'], nutrition: { calories: 520, protein: 15, carbs: 75, fats: 14 }, ingredientNutrition: ['Plantain -> Potassium (heart health)', 'Vegetables -> Vitamins'], healthTags: ['Heart-healthy', 'Energy-rich'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm78', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Potato Pottage', desc: 'Comfort dish made with soft potatoes in a spiced sauce.', image: 'https://www.foodnify.com/wp-content/uploads/2024/09/potato-porridges.jpg', ingredients: ['Potatoes', 'Oil', 'Vegetables', 'Spices'], nutrition: { calories: 480, protein: 12, carbs: 70, fats: 14 }, ingredientNutrition: ['Potatoes -> Carbs + Potassium', 'Vegetables -> Fiber + Vitamins'], healthTags: ['Energy-rich'], price: 3800, currency: 'RWF', tag: '' },
  { id: 'm79', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Beef Curry Sauce', desc: 'Rich, spiced beef sauce served with rice or sides.', image: 'https://fussfreeflavours.com/wp-content/uploads/2021/09/slow-cooker-beef-curry-featured.jpg', ingredients: ['Beef', 'Curry', 'Onions', 'Garlic', 'Oil'], nutrition: { calories: 600, protein: 35, carbs: 10, fats: 40 }, ingredientNutrition: ['Beef -> Protein + Iron', 'Garlic -> Immune support'], healthTags: ['High Protein', 'High Iron'], price: 5000, currency: 'RWF', tag: '' },
  { id: 'm80', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Stew (Tomato Stew)', desc: 'Classic African tomato-based sauce served with rice or swallow.', image: 'https://assets.bonappetit.com/photos/5db77fe7b9cf6400088fe7e1/1:1/w_2560%2Cc_limit/HLY-Oba-Ata-16x9.jpg', ingredients: ['Tomatoes', 'Pepper', 'Onions', 'Oil', 'Meat/fish'], nutrition: { calories: 450, protein: 20, carbs: 15, fats: 30 }, ingredientNutrition: ['Tomatoes -> Lycopene (heart health)', 'Fish -> Omega-3'], healthTags: ['Heart-healthy'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm81', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Native Pasta', desc: 'Local-style pasta cooked with African spices and sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0iepR6pMTOHZNgtzQyfp3xlBAYMlXu5DKKA&s', ingredients: ['Pasta', 'Tomatoes', 'Spices', 'Vegetables', 'Meat'], nutrition: { calories: 550, protein: 20, carbs: 70, fats: 18 }, ingredientNutrition: [], healthTags: ['Energy-rich'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm82', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Abacha (African Salad)', desc: 'Cassava-based salad mixed with palm oil, spices, and protein.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVDWpU5OlDPXTyqM3Z2VlInjsWpjeksTi8Q&s', ingredients: ['Cassava flakes', 'Palm oil', 'Fish', 'Ugba'], nutrition: { calories: 500, protein: 18, carbs: 60, fats: 20 }, ingredientNutrition: [], healthTags: ['High Fiber'], price: 4000, currency: 'RWF', tag: '' },
  { id: 'm83', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Ofe Nsala (White Soup)', desc: 'Light, spicy soup made with yam thickener and meat/fish.', image: 'https://foodtwiststores.com/wp-content/uploads/2025/09/White-soup-Ofe-Nsala-beef.jpg', ingredients: ['Yam', 'Fish/meat', 'Spices'], nutrition: { calories: 480, protein: 28, carbs: 30, fats: 20 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm84', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Ogbono Soup', desc: 'Thick soup made from ogbono seeds, rich and flavorful.', image: 'https://shopafricausa.com/cdn/shop/articles/ogbono_788x.jpg?v=1566349969', ingredients: ['Ogbono seeds', 'Meat', 'Palm oil'], nutrition: { calories: 600, protein: 25, carbs: 15, fats: 45 }, ingredientNutrition: [], healthTags: ['High Iron'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm85', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Afang Soup', desc: 'Vegetable soup made with afang and waterleaf.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmM6rQ6DLYzb_lRvC426Z_7GXV_RPytdy-Lg&s', ingredients: ['Afang leaves', 'Waterleaf', 'Meat', 'Fish'], nutrition: { calories: 500, protein: 30, carbs: 20, fats: 30 }, ingredientNutrition: [], healthTags: ['High Iron', 'Low Carb'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm86', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Roasted Plantain & BBQ Fish', desc: 'Grilled plantain served with smoky fish.', image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/1a/69/d9/grill-fish-with-fried.jpg', ingredients: ['Plantain', 'Fish', 'Spices'], nutrition: { calories: 520, protein: 30, carbs: 50, fats: 18 }, ingredientNutrition: [], healthTags: ['Heart-healthy'], price: 4500, currency: 'RWF', tag: '' },
  { id: 'm87', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Akara', desc: 'Deep-fried bean cakes, crispy outside and soft inside.', image: 'https://proveg.org/ng/wp-content/uploads/sites/4/2024/04/Akara-scaled-1.jpg', ingredients: ['Beans', 'Onions', 'Oil'], nutrition: { calories: 400, protein: 18, carbs: 35, fats: 20 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 2500, currency: 'RWF', tag: '' },
  { id: 'm88', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Amala & Ewedu', desc: 'Yam flour swallow served with jute leaf soup.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZVmQc_gNYpwzNP4D2T5or1QdsDsD9gWKew&s', ingredients: ['Yam flour', 'Ewedu leaves', 'Stew'], nutrition: { calories: 500, protein: 20, carbs: 70, fats: 15 }, ingredientNutrition: [], healthTags: ['High Fiber'], price: 3500, currency: 'RWF', tag: '' },
  { id: 'm89', region: 'West Africa', country: 'Nigeria', emoji: '🇳🇬', name: 'Nkwobi', desc: 'Spicy cow foot delicacy in palm oil sauce.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFYFt8uXqOSLQgVFUyx0Zc_RZgGDWtT8Y5pA&s', ingredients: ['Cow foot', 'Palm oil', 'Spices'], nutrition: { calories: 650, protein: 28, carbs: 10, fats: 50 }, ingredientNutrition: [], healthTags: ['High Protein'], price: 5000, currency: 'RWF', tag: '' },
];

const INGREDIENTS = [
  { id: 'i1', region: 'West Africa', name: 'Uda / Negro Pepper', desc: 'Aromatic West African spice for soups, stews, and postpartum dishes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA1x9szHQ2glQGbqHx7Ftv9hp6qpR9_lJOPg&s', price: 4.99, emoji: '🌶️' },
  { id: 'i2', region: 'West Africa', name: 'Red Palm Oil (500ml)', desc: 'Unrefined palm oil rich in carotenoids and vitamin E. Signature flavour.', image: 'https://www.palmoilextractionmachine.com/uploads/allimg/140818/1-140QQ54J2Z6.jpg', price: 7.50, emoji: '🫙' },
  { id: 'i3', region: 'West Africa', name: 'Locust Beans (Iru)', desc: 'Fermented locust beans — umami seasoning for soups and sauces.', image: 'https://mile12african.ca/cdn/shop/files/image-500x500_89.png?v=1715465419&width=600', price: 3.99, emoji: '🫘' },
  { id: 'i4', region: 'East Africa', name: 'Berbere Spice Blend', desc: 'Ethiopian spice mix with chili, fenugreek, korarima, and rue.', image: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/10b476bac0784728a60eae5de9f45a54/BFV40270_4DIYSpiceBlends-FB1080SQ.jpg?resize=1200:*', price: 6.50, emoji: '🌿' },
  { id: 'i5', region: 'East Africa', name: 'Ugali Maize Flour (1kg)', desc: 'Finely milled white maize flour for authentic ugali and sadza.', image: 'https://m.media-amazon.com/images/I/81oj6Nlda7L._AC_UF894,1000_QL80_.jpg', price: 5.00, emoji: '🌾' },
  { id: 'i6', region: 'North Africa', name: 'Harissa Paste (200g)', desc: 'Tunisian hot chili paste with coriander, caraway, garlic, and olive oil.', image: 'https://s.lightorangebean.com/media/20240914142652/Homemade-Spicy-Harissa-Paste_done.png', price: 5.99, emoji: '🌶️' },
  { id: 'i7', region: 'Southern Africa', name: 'Chakalaka Relish', desc: 'Spicy bean and vegetable relish. Perfect with braai or pap.', image: 'https://sibamtongana.com/wp-content/uploads/2023/02/sibas-secret-chakalaka.jpg', price: 4.50, emoji: '🫙' },
  { id: 'i8', region: 'Central Africa', name: 'Mbongo Spice', desc: 'Cameroonian black spice from burnt bark — deep, smoky, unique.', image: 'https://m.media-amazon.com/images/I/81jzgDcB0oL._AC_UF894,1000_QL80_.jpg', price: 5.75, emoji: '🖤' },
];

const CHEFS = [
  { id: 'ch1', name: 'Chef Amara Diallo', country: '🇸🇳 Senegal', specialty: 'West African Coastal Cuisine', meals: ['Thieboudienne', 'Yassa Poulet', 'Mafé'], bio: 'Award-winning chef from Dakar with 12 years bringing Senegali flavours to the world.', emoji: '👨🏾‍🍳', rating: 4.9, reviews: 312 },
  { id: 'ch2', name: 'Chef Ngozi Okafor', country: '🇳🇬 Nigeria', specialty: 'Nigerian Homestyle & Festive', meals: ['Egusi Soup', 'Jollof Rice', 'Ogbono Soup'], bio: 'Lagos-born culinary artist and food science graduate championing nutritious African cooking.', emoji: '👩🏾‍🍳', rating: 4.8, reviews: 278 },
  { id: 'ch3', name: 'Chef Tadesse Bekele', country: '🇪🇹 Ethiopia', specialty: 'Ethiopian & Eritrean', meals: ['Doro Wat', 'Tibs', 'Kitfo'], bio: 'From Addis Ababa, Tadesse specialises in injera and ancient Ethiopian spice traditions.', emoji: '👨🏿‍🍳', rating: 4.9, reviews: 194 },
  { id: 'ch4', name: 'Chef Fatima El-Amin', country: '🇲🇦 Morocco', specialty: 'North African & Maghrebi', meals: ['Lamb Tagine', 'Couscous Royale', 'Pastilla'], bio: 'Marrakech-trained chef with a modern twist on traditional Moroccan slow cooking.', emoji: '👩🏽‍🍳', rating: 4.7, reviews: 241 },
  { id: 'ch5', name: 'Chef Bongani Dlamini', country: '🇿🇦 South Africa', specialty: 'Southern African Braai & Fusion', meals: ['Braai Platter', 'Bobotie', 'Bunny Chow'], bio: 'Cape Town chef fusing Zulu tradition with contemporary African fine dining.', emoji: '👨🏾‍🍳', rating: 4.8, reviews: 167 },
  { id: 'ch6', name: 'Chef Marie-Claire Mballa', country: '🇨🇲 Cameroon', specialty: 'Central African & Francophone', meals: ['Poulet DG', 'Ndolé', 'Okok'], bio: 'Yaoundé native and cookbook author preserving endangered Central African recipes.', emoji: '👩🏿‍🍳', rating: 4.9, reviews: 203 },
];

const TESTIMONIALS = [
  { text: "Dine with Mee changed how my family eats. We now get authentic Ghanaian meals delivered with full nutrition info. Life-changing!", name: 'Abena Mensah', role: 'Mother of 3 · Accra', emoji: '🇬🇭', stars: 5 },
  { text: "As a nutritionist, I recommend this platform constantly. The telenutrition sessions are professional and the meal data is excellent.", name: 'Dr. Kofi Asante', role: 'Clinical Nutritionist · London', emoji: '👨🏾‍⚕️', stars: 5 },
  { text: "I discovered ingredients I had not seen since leaving Senegal. The marketplace is a goldmine for the diaspora!", name: 'Mariama Bah', role: 'Chef & Entrepreneur · Paris', emoji: '🇫🇷', stars: 5 },
];

const HEALTH_GOAL_TAGS = {
  diabetes: ['Diabetes-friendly', 'High Fiber', 'Low Carb'],
  maternal: ['Pregnancy-friendly', 'High Iron', 'High Protein'],
  hbp: ['Heart-healthy', 'Low Carb', 'High Fiber'],
  weight: ['Weight-loss friendly', 'Low Carb', 'High Fiber'],
  sickle: ['High Iron', 'High Protein', 'Heart-healthy'],
  general: ['Balanced diet', 'Heart-healthy', 'High Fiber', 'High Protein'],
};

const HEALTH_GOAL_LABELS = {
  all: 'All Health Goals',
  diabetes: 'Manage Diabetes',
  maternal: 'Support Pregnancy & Maternal Health',
  hbp: 'Reduce Blood Pressure (HBP)',
  weight: 'Weight Loss / Obesity',
  sickle: 'Sickle Cell Support',
  general: 'General Healthy Eating',
};

const HEALTH_TAG_BENEFITS = {
  'Diabetes-friendly': 'supports blood sugar control',
  'Pregnancy-friendly': 'supports maternal and fetal nourishment',
  'Heart-healthy': 'supports cardiovascular wellness',
  'Weight-loss friendly': 'supports satiety with better calorie balance',
  'High Iron': 'helps reduce iron-deficiency risk',
  'High Fiber': 'improves digestion and metabolic balance',
  'High Protein': 'supports muscle maintenance and recovery',
  'Low Carb': 'helps lower glycemic load',
  'Balanced diet': 'provides balanced macro and micronutrients',
  'Energy-rich': 'provides sustained daily energy',
};

const RWF_PER_USD = 1400;

function toRwf(amount, currency = 'RWF') {
  const numericAmount = Number(amount || 0);
  if (!Number.isFinite(numericAmount)) return 0;
  if (currency === 'USD') return Math.round(numericAmount * RWF_PER_USD);
  return Math.round(numericAmount);
}

function getMealHealthScore(meal) {
  const nutrition = meal.nutrition || {};
  const calories = Number(nutrition.calories || 0);
  const protein = Number(nutrition.protein || 0);
  const fats = Number(nutrition.fats || 0);
  const tags = meal.healthTags || [];

  let score = 55;
  score += Math.min(20, protein * 0.6);
  score -= Math.max(0, (calories - 500) * 0.05);
  score -= Math.max(0, (fats - 25) * 0.6);

  if (tags.includes('Diabetes-friendly')) score += 8;
  if (tags.includes('Heart-healthy')) score += 8;
  if (tags.includes('High Fiber')) score += 6;
  if (tags.includes('High Protein')) score += 5;
  if (tags.includes('Weight-loss friendly')) score += 7;

  score = Math.round(Math.max(25, Math.min(95, score)));

  if (score >= 72) {
    return { score, label: 'Very Healthy', className: 'health-score-very' };
  }
  if (score >= 50) {
    return { score, label: 'Moderate', className: 'health-score-moderate' };
  }
  return { score, label: 'Indulgent', className: 'health-score-indulgent' };
}

function getMealBenefitText(meal) {
  const tags = meal.healthTags || [];
  const reasons = tags
    .map(tag => HEALTH_TAG_BENEFITS[tag])
    .filter(Boolean)
    .slice(0, 2);

  if (reasons.length === 0) {
    if (Number(meal.nutrition?.protein || 0) >= 25) {
      return 'Protein-rich option that supports fullness and body recovery.';
    }
    return 'Built with nutrient-dense ingredients for everyday healthy eating.';
  }

  if (reasons.length === 1) {
    return `This meal ${reasons[0]}.`;
  }

  return `This meal ${reasons[0]} and ${reasons[1]}.`;
}

function formatPrice(amount, currency = 'RWF') {
  return `${toRwf(amount, currency).toLocaleString()} RWF`;
}

const Favorites = {
  get() {
    try {
      const data = JSON.parse(localStorage.getItem('dwm_favorites') || '[]');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
  clear() {
    localStorage.removeItem('dwm_favorites');
  },
  save(ids) {
    localStorage.setItem('dwm_favorites', JSON.stringify(ids));
  },
  has(id) {
    return Favorites.get().includes(id);
  },
  toggle(id) {
    const set = new Set(Favorites.get());
    if (set.has(id)) {
      set.delete(id);
      Favorites.save([...set]);
      return false;
    }
    set.add(id);
    Favorites.save([...set]);
    return true;
  }
};

function updateFavoritesToggleState() {
  const btn = document.getElementById('meal-favorites-toggle');
  if (!btn) return;

  const count = Favorites.get().length;
  btn.classList.toggle('active', favoritesOnly);
  btn.textContent = favoritesOnly
    ? `Showing Favorites (${count})`
    : `Show Favorites Only (${count})`;
}

function toggleFavoriteMeal(mealId) {
  const saved = Favorites.toggle(mealId);
  showToast(saved ? 'Meal saved to favorites ♥' : 'Meal removed from favorites');
  updateFavoritesToggleState();
  renderMarketplaceMeals();
}

// ── Cart System ──────────────────────────────
const Cart = {
  get() {
    let parsedItems;
    try {
      parsedItems = JSON.parse(localStorage.getItem('dwm_cart') || '[]');
    } catch {
      parsedItems = [];
    }

    if (!Array.isArray(parsedItems)) return [];

    return parsedItems.map(item => ({
      ...item,
      price: toRwf(item.price, item.currency || 'RWF'),
      currency: 'RWF',
      qty: Math.max(1, Number(item.qty || 1)),
    }));
  },
  save(items) {
    const normalizedItems = (Array.isArray(items) ? items : []).map(item => ({
      ...item,
      price: toRwf(item.price, item.currency || 'RWF'),
      currency: 'RWF',
      qty: Math.max(1, Number(item.qty || 1)),
    }));

    localStorage.setItem('dwm_cart', JSON.stringify(normalizedItems));
    Cart.updateCount();
  },
  add(item) {
    const normalizedItem = {
      ...item,
      price: toRwf(item.price, item.currency || 'RWF'),
      currency: 'RWF',
    };

    const items = Cart.get();
    const existing = items.find(i => i.id === normalizedItem.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...normalizedItem, qty: 1 });
    }
    Cart.save(items);
    showToast(`${normalizedItem.name} added to cart`);
  },
  remove(id) {
    const items = Cart.get().filter(i => i.id !== id);
    Cart.save(items);
    Cart.renderSidebar();
  },
  changeQty(id, delta) {
    const items = Cart.get();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) return Cart.remove(id);
    }
    Cart.save(items);
    Cart.renderSidebar();
  },
  total(currency = 'RWF') {
    return Cart.get()
      .filter(i => (i.currency || 'RWF') === currency)
      .reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  totals() {
    const totalRwf = Cart.total('RWF');
    return { RWF: totalRwf };
  },
  count() {
    return Cart.get().reduce((sum, i) => sum + i.qty, 0);
  },
  updateCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const c = Cart.count();
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });

    const totalEl = document.getElementById('cart-total-amount');
    if (totalEl) {
      totalEl.textContent = formatPrice(Cart.total('RWF'), 'RWF');
    }
  },
  renderSidebar() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    const items = Cart.get();

    if (items.length === 0) {
      container.innerHTML = `<div class="cart-empty">
        <span class="emoji">🍽️</span>
        Your cart is empty.<br>Explore our marketplace!
      </div>`;
      const totalEmpty = document.getElementById('cart-total-amount');
      if (totalEmpty) totalEmpty.textContent = formatPrice(0, 'RWF');
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji || '🍲'}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty, item.currency || 'RWF')}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="Cart.changeQty('${item.id}', -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="Cart.changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join('');

    const total = document.getElementById('cart-total-amount');
    if (total) {
      total.textContent = formatPrice(Cart.total('RWF'), 'RWF');
    }
  }
};

const CHECKOUT_DELIVERY_FEE_RWF = 1500;

function ensureCheckoutModal() {
  if (document.getElementById('checkout-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'checkout-modal';
  modal.className = 'checkout-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="checkout-overlay" data-checkout-close></div>
    <div class="checkout-panel" role="dialog" aria-modal="true" aria-label="Checkout">
      <button class="checkout-close" type="button" data-checkout-close>×</button>

      <div class="checkout-header">
        <h3>Checkout</h3>
        <p>Review order summary, add delivery details, and choose payment.</p>
      </div>

      <div class="checkout-layout">
        <section class="checkout-summary-block">
          <h4>Order Summary</h4>
          <div id="checkout-items" class="checkout-items"></div>

          <div class="checkout-totals">
            <div class="checkout-total-row"><span>Subtotal</span><strong id="checkout-subtotal">0 RWF</strong></div>
            <div class="checkout-total-row"><span>Delivery Fee</span><strong id="checkout-delivery-fee">0 RWF</strong></div>
            <div class="checkout-total-row grand"><span>Total</span><strong id="checkout-total">0 RWF</strong></div>
          </div>
        </section>

        <section class="checkout-form-block">
          <form id="checkout-form" class="checkout-form">
            <h4>Delivery Details</h4>
            <div class="checkout-fields-grid">
              <div class="form-group">
                <label for="checkout-country">Country</label>
                <input id="checkout-country" name="country" type="text" placeholder="e.g. Rwanda" required />
              </div>
              <div class="form-group">
                <label for="checkout-area">Area</label>
                <input id="checkout-area" name="area" type="text" placeholder="e.g. Kicukiro" required />
              </div>
            </div>

            <div class="form-group">
              <label for="checkout-address">Street Address</label>
              <input id="checkout-address" name="address" type="text" placeholder="Street and building" required />
            </div>

            <div class="form-group">
              <label for="checkout-phone">Phone Number</label>
              <input id="checkout-phone" name="phone" type="tel" placeholder="e.g. +2507XXXXXXXX" required />
            </div>

            <div class="form-group">
              <label for="checkout-order-note">Order Note</label>
              <textarea id="checkout-order-note" name="order-note" rows="3" placeholder="Add meal or delivery notes (optional)"></textarea>
            </div>

            <h4>Payment Option</h4>
            <div class="payment-options-grid" id="payment-options-grid">
              <label class="payment-option active">
                <input type="radio" name="payment-method" value="Card" checked />
                <span>Card</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment-method" value="MTN Mobile Money" />
                <span>MTN Mobile Money</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment-method" value="Airtel Money" />
                <span>Airtel Money</span>
              </label>
            </div>

            <button type="submit" class="btn-primary btn-full">Place Order</button>
          </form>
        </section>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelectorAll('[data-checkout-close]').forEach(el => {
    el.addEventListener('click', closeCheckoutModal);
  });

  const paymentGrid = modal.querySelector('#payment-options-grid');
  const syncPaymentActiveState = () => {
    if (!paymentGrid) return;
    paymentGrid.querySelectorAll('.payment-option').forEach(option => {
      const input = option.querySelector('input[type="radio"]');
      option.classList.toggle('active', Boolean(input?.checked));
    });
  };

  paymentGrid?.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', syncPaymentActiveState);
  });

  const checkoutForm = modal.querySelector('#checkout-form');
  checkoutForm?.addEventListener('submit', event => {
    event.preventDefault();

    if (Cart.count() === 0) {
      showToast('Your cart is empty. Add meals before checkout.');
      return;
    }

    const country = document.getElementById('checkout-country');
    const area = document.getElementById('checkout-area');
    const address = document.getElementById('checkout-address');
    const phone = document.getElementById('checkout-phone');
    const orderNote = document.getElementById('checkout-order-note');
    const paymentMethod = checkoutForm.querySelector('input[name="payment-method"]:checked');

    if (!country?.value.trim() || !area?.value.trim() || !address?.value.trim() || !phone?.value.trim()) {
      showToast('Please complete all delivery details.');
      return;
    }

    if (!paymentMethod) {
      showToast('Please choose a payment method.');
      return;
    }

    const noteSuffix = orderNote?.value.trim() ? ' Order note saved.' : '';
    showToast(`Order placed successfully via ${paymentMethod.value}.${noteSuffix}`);
    Cart.save([]);
    Cart.renderSidebar();
    renderCheckoutSummary();
    checkoutForm.reset();
    const defaultPayment = checkoutForm.querySelector('input[name="payment-method"][value="Card"]');
    if (defaultPayment) defaultPayment.checked = true;
    syncPaymentActiveState();
    closeCheckoutModal();
  });

  document.addEventListener('keydown', event => {
    const isOpen = modal.classList.contains('open');
    if (!isOpen) return;
    if (event.key === 'Escape') closeCheckoutModal();
  });
}

function renderCheckoutSummary() {
  const itemsWrap = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const deliveryEl = document.getElementById('checkout-delivery-fee');
  const totalEl = document.getElementById('checkout-total');
  if (!itemsWrap || !subtotalEl || !deliveryEl || !totalEl) return;

  const items = Cart.get();
  if (!items.length) {
    itemsWrap.innerHTML = '<div class="checkout-empty">No meals selected yet.</div>';
    subtotalEl.textContent = formatPrice(0, 'RWF');
    deliveryEl.textContent = formatPrice(0, 'RWF');
    totalEl.textContent = formatPrice(0, 'RWF');
    return;
  }

  itemsWrap.innerHTML = items.map(item => `
    <div class="checkout-item-row">
      <div class="checkout-item-main">
        <span class="checkout-item-name">${item.name}</span>
        <span class="checkout-item-price">${formatPrice(item.price, 'RWF')}</span>
      </div>
      <div class="checkout-qty-controls">
        <button type="button" class="checkout-qty-btn" onclick="updateCheckoutItemQty('${item.id}', -1)">-</button>
        <span class="checkout-qty-value">${item.qty}</span>
        <button type="button" class="checkout-qty-btn" onclick="updateCheckoutItemQty('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = items.length ? CHECKOUT_DELIVERY_FEE_RWF : 0;
  const total = subtotal + deliveryFee;

  subtotalEl.textContent = formatPrice(subtotal, 'RWF');
  deliveryEl.textContent = formatPrice(deliveryFee, 'RWF');
  totalEl.textContent = formatPrice(total, 'RWF');
}

function updateCheckoutItemQty(itemId, delta) {
  Cart.changeQty(itemId, delta);
  renderCheckoutSummary();
}

function openCheckoutModal() {
  ensureCheckoutModal();
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  renderCheckoutSummary();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initCheckoutSystem() {
  ensureCheckoutModal();

  document.querySelectorAll('.cart-footer .btn-primary.btn-full').forEach(button => {
    button.removeAttribute('onclick');
    button.addEventListener('click', event => {
      event.preventDefault();
      openCheckoutModal();
    });
  });
}

// ── Toast ─────────────────────────────────────
function showToast(msg, duration = 3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function handleMealImageError(imgEl) {
  if (!imgEl) return;
  const fallback = imgEl.nextElementSibling;
  if (fallback) {
    fallback.style.display = 'flex';
  }
  imgEl.style.display = 'none';
}

// ── Render Helpers ────────────────────────────
function renderMealCards(meals, containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const showDetails = options.showDetails === true;
  const favoriteIds = new Set(Favorites.get());

  container.innerHTML = meals.map(meal => {
    const score = getMealHealthScore(meal);
    const tagHTML = meal.tag
      ? `<span style="position:absolute;top:14px;left:14px;background:var(--gold);color:var(--green-deep);font-size:10px;font-weight:700;padding:4px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.06em">${meal.tag}</span>`
      : '';
    const scoreHTML = showDetails
      ? `<span class="health-score-badge ${score.className}" title="Health score ${score.score}/100">${score.label}</span>`
      : '';
    const regionLabel = meal.country ? `${meal.region} · ${meal.country}` : meal.region;
    const nutritionHTML = showDetails && meal.nutrition
      ? `<div class="meal-nutrition">🔥 ${meal.nutrition.calories} kcal · P ${meal.nutrition.protein}g · C ${meal.nutrition.carbs}g · F ${meal.nutrition.fats}g</div>`
      : '';
    const whyMealGoodHTML = showDetails
      ? `<div class="meal-health-why"><strong>Why this meal is good for you:</strong> ${getMealBenefitText(meal)}</div>`
      : '';
    const ingredientHTML = showDetails && Array.isArray(meal.ingredients) && meal.ingredients.length
      ? `<div class="meal-ingredients"><strong>Ingredients:</strong> ${meal.ingredients.slice(0, 5).join(', ')}${meal.ingredients.length > 5 ? ', ...' : ''}</div>`
      : '';
    const healthTagsHTML = showDetails && Array.isArray(meal.healthTags) && meal.healthTags.length
      ? `<div class="meal-health-tags">${meal.healthTags.slice(0, 3).map(tag => `<span class="meal-health-tag">${tag}</span>`).join('')}</div>`
      : '';
    const ingredientNutritionHTML = showDetails && Array.isArray(meal.ingredientNutrition) && meal.ingredientNutrition.length
      ? `<div class="meal-ingredient-nutrition">${meal.ingredientNutrition[0]}</div>`
      : '';
    const isFavorite = favoriteIds.has(meal.id);
    const mealMediaHTML = meal.image
      ? `
        <div class="meal-media">
          <img class="meal-img" src="${meal.image}" alt="${meal.name}" loading="lazy" referrerpolicy="no-referrer" onerror="handleMealImageError(this)">
          <div class="meal-img-placeholder meal-img-fallback" style="display:none">${meal.emoji}</div>
          ${tagHTML}
          ${scoreHTML}
        </div>
      `
      : `
        <div class="meal-img-placeholder" style="position:relative">
          ${meal.emoji}
          ${tagHTML}
          ${scoreHTML}
        </div>
      `;

    return `
      <div class="meal-card" data-region="${meal.region}">
        ${mealMediaHTML}
        <div class="meal-body">
          <div class="meal-region">${regionLabel}</div>
          <h3>${meal.name}</h3>
          <p>${meal.desc}</p>
          ${whyMealGoodHTML}
          ${nutritionHTML}
          ${ingredientHTML}
          ${ingredientNutritionHTML}
          ${healthTagsHTML}
          <div class="meal-footer">
            <span class="meal-price">${formatPrice(meal.price, meal.currency || 'USD')}</span>
            <div class="meal-card-actions">
              ${showDetails ? `<button class="btn-view-details" onclick="openMealDetail('${meal.id}')">Details</button>` : ''}
              ${showDetails ? `<button class="btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavoriteMeal('${meal.id}')" aria-label="${isFavorite ? 'Remove from favorites' : 'Save meal'}">${isFavorite ? '♥' : '♡'}</button>` : ''}
              <button class="btn-add-cart" onclick='Cart.add(${JSON.stringify({ id: meal.id, name: meal.name, price: meal.price, emoji: meal.emoji, currency: meal.currency || 'USD' })})'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderIngredientCards(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="meal-card">
      ${item.image
        ? `
          <div class="meal-media">
            <img class="meal-img" src="${item.image}" alt="${item.name}" loading="lazy" referrerpolicy="no-referrer" onerror="handleMealImageError(this)">
            <div class="meal-img-placeholder meal-img-fallback" style="display:none">${item.emoji}</div>
          </div>
        `
        : `<div class="meal-img-placeholder">${item.emoji}</div>`
      }
      <div class="meal-body">
        <div class="meal-region">${item.region}</div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="meal-footer">
          <span class="meal-price">${formatPrice(item.price, 'USD')}</span>
          <button class="btn-add-cart" onclick='Cart.add(${JSON.stringify({ id: item.id, name: item.name, price: item.price, emoji: item.emoji, currency: 'USD' })})'>
            + Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderChefCards(chefs, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = chefs.map(chef => `
    <div class="chef-mini-card">
      <div class="chef-avatar">${chef.emoji}</div>
      <h4>${chef.name}</h4>
      <div class="country">${chef.country}</div>
      <p>${chef.specialty}</p>
      <div style="margin-top:8px;font-size:12px;color:var(--gold);">
        ★ ${chef.rating} <span style="color:var(--text-light)">(${chef.reviews} reviews)</span>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="stars">${'★'.repeat(t.stars)}</div>
      <p>"${t.text}"</p>
      <div class="testimonial-author">
        <div class="t-avatar">${t.emoji}</div>
        <div class="t-info">
          <div class="name">${t.name}</div>
          <div class="role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function openMealDetail(mealId) {
  const meal = MEALS.find(m => m.id === mealId);
  if (!meal) return;

  const existing = document.getElementById('meal-modal');
  if (existing) existing.remove();

  const healthTagsHTML = (meal.healthTags || [])
    .map(tag => `<span class="health-tag-pill">${tag}</span>`)
    .join('');

  const ingredientFacts = meal.ingredientNutrition || [];
  const ingredientsHTML = (meal.ingredients || []).map(ingredient => {
    const fact = ingredientFacts.find(f => f.toLowerCase().startsWith(ingredient.toLowerCase()));
    const benefit = fact ? fact.replace(/^.*?->\s*/, '') : 'Nutrient-dense traditional ingredient.';
    return `
      <div class="detail-ingredient">
        <div class="ing-header">
          <span class="ing-emoji">🥗</span>
          <span class="ing-name">${ingredient}</span>
        </div>
        <p class="ing-benefit">💡 ${benefit}</p>
      </div>
    `;
  }).join('');

  const n = meal.nutrition || {};
  const heroMediaHTML = meal.image
    ? `
      <div class="modal-photo-wrap">
        <img class="modal-photo" src="${meal.image}" alt="${meal.name}" loading="lazy" referrerpolicy="no-referrer" onerror="handleMealImageError(this)">
        <div class="modal-emoji modal-photo-fallback" style="display:none">${meal.emoji}</div>
      </div>
    `
    : `<div class="modal-emoji">${meal.emoji}</div>`;
  const modal = document.createElement('div');
  modal.id = 'meal-modal';
  modal.innerHTML = `
    <div class="modal-overlay" id="meal-modal-overlay"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${meal.name} nutrition details">
      <button class="modal-close" id="meal-modal-close">✕</button>

      <div class="modal-hero">
        ${heroMediaHTML}
        <div class="modal-hero-info">
          <div class="modal-region">${meal.region} · ${meal.country || 'Africa'}</div>
          <h2 class="modal-title">${meal.name}</h2>
          <p class="modal-desc">${meal.desc}</p>
          <div class="modal-meta">
            <span>🧾 ${(meal.ingredients || []).length} ingredients</span>
            <span class="modal-price">${formatPrice(meal.price, meal.currency || 'USD')}</span>
          </div>
        </div>
      </div>

      <div class="modal-body">
        <section class="modal-section">
          <h3 class="modal-section-title">🏷️ Health Profile</h3>
          <div class="health-tags-row">${healthTagsHTML || '<span class="health-tag-pill">Balanced Meal</span>'}</div>
        </section>

        <section class="modal-section">
          <h3 class="modal-section-title">📊 Nutrition Summary</h3>
          <div class="macro-grid">
            <div class="macro-card" style="border-color:#e74c3c20;background:#e74c3c08">
              <div class="macro-val" style="color:#e74c3c">${n.calories ?? '--'}</div>
              <div class="macro-lbl">Calories</div>
            </div>
            <div class="macro-card" style="border-color:#145A3E20;background:#145A3E08">
              <div class="macro-val" style="color:#145A3E">${n.protein ?? '--'}g</div>
              <div class="macro-lbl">Protein</div>
            </div>
            <div class="macro-card" style="border-color:#f39c1220;background:#f39c1208">
              <div class="macro-val" style="color:#f39c12">${n.carbs ?? '--'}g</div>
              <div class="macro-lbl">Carbs</div>
            </div>
            <div class="macro-card" style="border-color:#C9973A20;background:#C9973A08">
              <div class="macro-val" style="color:#C9973A">${n.fats ?? '--'}g</div>
              <div class="macro-lbl">Fats</div>
            </div>
          </div>
        </section>

        <section class="modal-section">
          <h3 class="modal-section-title">🌿 Ingredient Nutrition Breakdown</h3>
          <div class="ingredients-detail">${ingredientsHTML}</div>
        </section>

        <div class="modal-footer">
          <div class="modal-price-big">${formatPrice(meal.price, meal.currency || 'USD')}</div>
          <button class="btn-primary" style="padding:14px 34px;font-size:15px;" onclick='Cart.add(${JSON.stringify({ id: meal.id, name: meal.name, price: meal.price, emoji: meal.emoji, currency: meal.currency || 'USD' })}); closeMealDetail()'>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  document.getElementById('meal-modal-overlay')?.addEventListener('click', closeMealDetail);
  document.getElementById('meal-modal-close')?.addEventListener('click', closeMealDetail);
  document.addEventListener('keydown', handleMealModalEscape);

  requestAnimationFrame(() => {
    modal.querySelector('.modal-overlay').style.opacity = '1';
    modal.querySelector('.modal-panel').style.transform = 'translateX(0)';
  });
}

function handleMealModalEscape(e) {
  if (e.key === 'Escape') closeMealDetail();
}

function closeMealDetail() {
  const modal = document.getElementById('meal-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal-panel');
  const overlay = modal.querySelector('.modal-overlay');
  if (panel) panel.style.transform = 'translateX(100%)';
  if (overlay) overlay.style.opacity = '0';

  document.removeEventListener('keydown', handleMealModalEscape);
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 320);
}

// ── Navbar and UI Init ───────────────────────
function getStoredUser() {
  try {
    const raw = localStorage.getItem('dwm_user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function deriveInitials(name) {
  if (!name || typeof name !== 'string') return 'U';
  const pieces = name.trim().split(/\s+/).filter(Boolean);
  return pieces.slice(0, 2).map(piece => piece[0].toUpperCase()).join('') || 'U';
}

function updateNavbarAuthUI() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  const loginLink = navActions.querySelector('a.btn-login[href*="login"]');
  const joinFreeLink = navActions.querySelector('a.btn-primary[href*="signup"]');
  let initialsBadge = navActions.querySelector('.nav-user-initials');
  const user = getStoredUser();

  if (!user || !user.name) {
    if (loginLink) loginLink.style.display = '';
    if (initialsBadge) initialsBadge.remove();
    return;
  }

  if (loginLink) loginLink.style.display = 'none';

  if (!initialsBadge) {
    initialsBadge = document.createElement('span');
    initialsBadge.className = 'nav-user-initials';
    const hamburger = navActions.querySelector('.hamburger');
    navActions.insertBefore(initialsBadge, hamburger || null);
  }

  initialsBadge.textContent = deriveInitials(user.name);
  initialsBadge.title = user.name;
  initialsBadge.setAttribute('aria-label', `Signed in as ${user.name}`);

  if (joinFreeLink) {
    joinFreeLink.textContent = 'Join Free';
  }
}

function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const cartBtn = document.getElementById('cart-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartClose = document.getElementById('cart-close');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  function openCart() {
    cartOverlay?.classList.add('open');
    cartSidebar?.classList.add('open');
    Cart.renderSidebar();
  }

  function closeCart() {
    cartOverlay?.classList.remove('open');
    cartSidebar?.classList.remove('open');
  }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.2)' : '';
    }
  });

  Cart.updateCount();
  updateNavbarAuthUI();
  window.addEventListener('dwm:auth-changed', updateNavbarAuthUI);
  window.addEventListener('storage', event => {
    if (event.key === 'dwm_user') updateNavbarAuthUI();
  });
}

// ── Form Validation ───────────────────────────
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(inputId, msg) {
  const input = document.getElementById(inputId);
  const errEl = document.getElementById(`${inputId}-err`);
  if (input) input.classList.add('error');
  if (errEl) {
    errEl.textContent = msg;
    errEl.classList.add('show');
  }
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errEl = document.getElementById(`${inputId}-err`);
  if (input) input.classList.remove('error');
  if (errEl) errEl.classList.remove('show');
}

function initLoginForm() {
  if (window.__DWM_INTEGRATION_AUTH__) return;

  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    clearError('email');
    clearError('password');

    if (!validateEmail(email)) {
      showError('email', 'Enter a valid email address');
      valid = false;
    }
    if (!validatePassword(password)) {
      showError('password', 'Password must be at least 6 characters');
      valid = false;
    }

    if (valid) {
      showToast('Welcome back! Logging you in… ✨');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  });
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  if (window.__DWM_INTEGRATION_AUTH__) {
    if (form.classList.contains('signup-multistep')) {
      initSignupMultiStepForm(form);
    }
    return;
  }

  if (form.classList.contains('signup-multistep')) {
    initSignupMultiStepForm(form);
    return;
  }

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  if (!nameInput || !emailInput || !passwordInput) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    clearError('name');
    clearError('email');
    clearError('password');

    if (name.length < 2) {
      showError('name', 'Please enter your full name');
      valid = false;
    }
    if (!validateEmail(email)) {
      showError('email', 'Enter a valid email address');
      valid = false;
    }
    if (!validatePassword(password)) {
      showError('password', 'Password must be at least 6 characters');
      valid = false;
    }

    if (valid) {
      showToast('Account created! Welcome to Dine with Mee 🎉');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1800);
    }
  });
}

function initSignupMultiStepForm(form) {
  const steps = Array.from(form.querySelectorAll('.signup-step'));
  if (!steps.length) return;

  const progressSteps = Array.from(form.querySelectorAll('.signup-progress-step'));
  let activeStepIndex = 0;

  const showStep = index => {
    activeStepIndex = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, i) => {
      const isActive = i === activeStepIndex;
      step.classList.toggle('active', isActive);
      step.hidden = !isActive;
    });

    progressSteps.forEach((step, i) => {
      step.classList.toggle('active', i === activeStepIndex);
      step.classList.toggle('done', i < activeStepIndex);
    });
  };

  const validateActiveStep = () => {
    const currentStep = steps[activeStepIndex];
    if (!currentStep) return true;

    const requiredFields = Array.from(currentStep.querySelectorAll('[required]'));
    const invalidField = requiredFields.find(field => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        return !field.checked;
      }
      return !String(field.value || '').trim();
    });

    if (invalidField) {
      invalidField.focus();
      showToast('Please complete all required fields in this step.');
      return false;
    }

    if (activeStepIndex === 1) {
      const selectedGoals = form.querySelectorAll('input[name="health-goals"]:checked');
      if (!selectedGoals.length) {
        showToast('Select at least one health goal to continue.');
        return false;
      }
    }

    return true;
  };

  form.querySelectorAll('[data-step-next]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      if (!validateActiveStep()) return;
      showStep(activeStepIndex + 1);
    });
  });

  form.querySelectorAll('[data-step-prev]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      showStep(activeStepIndex - 1);
    });
  });

  form.addEventListener('submit', event => {
    if (window.__DWM_INTEGRATION_AUTH__) return;

    event.preventDefault();
    if (!validateActiveStep()) return;

    showToast('Account created successfully. Your health preferences are saved.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1300);
  });

  showStep(0);
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Session booked! A nutritionist will confirm shortly 📅');
    form.reset();
  });
}

// ── Home and Marketplace Rendering ───────────
function initHomeSections() {
  if (window.__DWM_INTEGRATION_HOME__) return;

  initHeroFoodImage();
  renderHomeFeaturedMeals();
  renderChefCards(CHEFS.slice(0, 4), 'chef-preview');
  renderTestimonials();
}

let currentMealRegion = 'All';
let currentHealthGoal = 'all';
let currentMealHealthTags = new Set();
let currentMealSearch = '';
let currentMealSort = 'featured';
let currentMaxCalories = Number.POSITIVE_INFINITY;
let currentMinProtein = 0;
let favoritesOnly = false;
let activeProgram = 'clinical';

const MEALS_PER_PAGE = 12;
let mealsVisibleCount = MEALS_PER_PAGE;

function initHeroFoodImage() {
  const heroImage = document.getElementById('hero-food-image');
  if (!heroImage) return;

  const imageMeals = MEALS.filter(meal => meal.image);
  if (!imageMeals.length) return;

  const pick = imageMeals[Math.floor(Math.random() * imageMeals.length)];
  heroImage.src = pick.image;
  heroImage.alt = `${pick.name} — African health-focused meal`;
}

function applyHealthGoalFilter(meals) {
  if (currentHealthGoal === 'all') return meals;

  const goalTags = HEALTH_GOAL_TAGS[currentHealthGoal] || [];
  if (!goalTags.length) return meals;

  return meals.filter(meal => {
    const tags = meal.healthTags || [];
    return tags.some(tag => goalTags.includes(tag));
  });
}

function updateFeaturedGoalLabel(matchCount = MEALS.length) {
  const label = document.getElementById('featured-goal-label');
  if (!label) return;

  const readableGoal = HEALTH_GOAL_LABELS[currentHealthGoal] || HEALTH_GOAL_LABELS.all;
  label.textContent = currentHealthGoal === 'all'
    ? `Showing top health meals across all goals (${matchCount} meals).`
    : `Goal Focus: ${readableGoal} (${matchCount} matching meals)`;
}

function syncHealthGoalButtons() {
  const container = document.getElementById('goal-selector');
  if (!container) return;

  container.querySelectorAll('.goal-card').forEach(button => {
    const isActive = button.dataset.goal === currentHealthGoal;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function renderHomeFeaturedMeals() {
  const container = document.getElementById('featured-meals');
  if (!container) return;

  let meals = applyHealthGoalFilter(MEALS);
  if (!meals.length) meals = [...MEALS];

  const ranked = [...meals]
    .sort((a, b) => getMealHealthScore(b).score - getMealHealthScore(a).score)
    .slice(0, 6);

  renderMealCards(ranked, 'featured-meals', { showDetails: true });
  updateFeaturedGoalLabel(meals.length);
}

function setHealthGoal(goal) {
  currentHealthGoal = goal;
  syncHealthGoalButtons();
  renderHomeFeaturedMeals();
  resetMealPagination();
  renderMarketplaceMeals();
}

function initHealthGoalSelector() {
  if (window.__DWM_INTEGRATION_HOME__) return;

  const container = document.getElementById('goal-selector');
  if (!container) return;

  syncHealthGoalButtons();

  container.addEventListener('click', event => {
    const button = event.target.closest('.goal-card');
    if (!button) return;

    const selectedGoal = button.dataset.goal || 'all';
    const nextGoal = currentHealthGoal === selectedGoal ? 'all' : selectedGoal;
    setHealthGoal(nextGoal);
    showToast(`Goal selected: ${HEALTH_GOAL_LABELS[nextGoal] || HEALTH_GOAL_LABELS.all}`);
  });
}

function initExpandableSections() {
  const setupGroup = (cardSelector, panelSelector, buttonSelector, expandedLabel) => {
    document.querySelectorAll(cardSelector).forEach(card => {
      const panel = card.querySelector(panelSelector);
      const button = card.querySelector(buttonSelector);
      if (!panel || !button) return;

      const collapsedLabel = button.textContent.trim();
      panel.hidden = true;
      panel.style.maxHeight = '0px';
      panel.style.opacity = '0';

      button.addEventListener('click', () => {
        const isExpanded = card.classList.contains('expanded');

        if (isExpanded) {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
          requestAnimationFrame(() => {
            panel.style.maxHeight = '0px';
            panel.style.opacity = '0';
          });

          const onEnd = () => {
            panel.hidden = true;
            panel.removeEventListener('transitionend', onEnd);
          };
          panel.addEventListener('transitionend', onEnd);

          card.classList.remove('expanded');
          button.textContent = collapsedLabel;
          button.setAttribute('aria-expanded', 'false');
          return;
        }

        panel.hidden = false;
        panel.style.maxHeight = '0px';
        requestAnimationFrame(() => {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
          panel.style.opacity = '1';
        });

        card.classList.add('expanded');
        button.textContent = expandedLabel;
        button.setAttribute('aria-expanded', 'true');
      });
    });
  };

  setupGroup('[data-about-card]', '[data-about-more]', '[data-about-toggle]', 'Read Less');
  setupGroup('[data-guide-card]', '[data-guide-more]', '[data-guide-toggle]', 'Hide Guide');
}

function getClinicalProgramDataset() {
  if (Array.isArray(window.DWM_PROGRAMS) && window.DWM_PROGRAMS.length > 0) {
    return window.DWM_PROGRAMS;
  }

  return [
    {
      id: 'chronic-disease',
      title: 'Building a Balanced African Meal Plan for Chronic Disease Prevention',
      date: 'March 19, 2026',
      readTime: '6 min read',
      category: 'Clinical Grade',
      preview:
        'A practical weekly framework using African whole foods to reduce long-term risk of diabetes, hypertension, and obesity.',
    },
    {
      id: 'maternal',
      title: 'Maternal Nutrition African Foods that Support Pregnancy',
      date: 'March 19, 2026',
      readTime: '6 min read',
      category: 'Maternal Focus',
      preview:
        'A trimester-aware nutrition article covering folate, iron, DHA, hydration, and practical African meal ideas for pregnancy.',
    },
    {
      id: 'sickle-cell',
      title: 'Nutrition Strategies for Sickle Cell Patients Using African Ingredients',
      date: 'March 19, 2026',
      readTime: '6 min read',
      category: 'Sickle Cell Support',
      preview:
        'Food-based strategies to support hemoglobin health, hydration, and oxidative stress reduction for people living with sickle cell disease.',
    },
    {
      id: 'obesity',
      title: 'Combating Obesity with Traditional African Meals',
      date: 'March 19, 2026',
      readTime: '6 min read',
      category: 'General Wellness',
      preview:
        'A realistic approach to sustainable weight management using high-fiber traditional meals, portion control, and lifestyle consistency.',
    },
    {
      id: 'hypertension',
      title: 'Heart-Healthy African Diet for Hypertension',
      date: 'March 19, 2026',
      readTime: '6 min read',
      category: 'Hypertension Focus',
      preview:
        'A low-sodium, potassium-forward meal structure using familiar African ingredients to support blood pressure and cardiovascular health.',
    },
    {
      id: 'diabetes',
      title: 'African Superfoods to Manage Diabetes',
      date: 'March 19, 2026',
      readTime: '6 min read',
      category: 'Diabetes Focus',
      preview:
        'A low-glycemic, high-fiber strategy built around African superfoods to stabilize glucose and improve daily diabetes control.',
    },
  ];
}

function updateProgramPreviewPanel(program) {
  const panel = document.getElementById('program-preview-panel');
  if (!panel || !program) return;

  const titleEl = document.getElementById('program-preview-title');
  const metaEl = document.getElementById('program-preview-meta');
  const textEl = document.getElementById('program-preview-text');
  const linkEl = document.getElementById('program-preview-link');

  if (titleEl) titleEl.textContent = program.title || '';
  if (metaEl) {
    const pieces = [program.date, program.readTime, program.category].filter(Boolean);
    metaEl.textContent = pieces.join(' • ');
  }
  if (textEl) textEl.textContent = program.preview || program.content || '';
  if (linkEl) {
    linkEl.href = `program-detail.html?id=${program.id}`;
  }
}

function initClinicalProgramFilter() {
  const cards = Array.from(
    document.querySelectorAll('#clinical-wellness .program-item, #clinical-wellness .wellness-program-card')
  );
  if (!cards.length) return;

  const dataset = getClinicalProgramDataset();
  const byId = new Map(dataset.map(program => [program.id, program]));

  const setActiveCard = (card, shouldScroll) => {
    const programId = card?.dataset?.programId;
    if (!programId || !byId.has(programId)) return;

    cards.forEach(item => item.classList.remove('is-active'));
    card.classList.add('is-active');

    activeProgram = card.dataset.programCategory || 'clinical';
    updateProgramPreviewPanel(byId.get(programId));

    if (shouldScroll) {
      const panel = document.getElementById('program-preview-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  cards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('mouseenter', () => {
      setActiveCard(card, false);
    });

    card.addEventListener('focusin', () => {
      setActiveCard(card, false);
    });

    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      setActiveCard(card, true);
    });

    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      setActiveCard(card, true);
      const actionLink = card.querySelector('a[href]');
      if (actionLink) actionLink.click();
    });
  });

  const firstCard = cards.find(card => byId.has(card.dataset.programId)) || cards[0];
  if (firstCard) {
    setActiveCard(firstCard, false);
  }
}

function initProgramNavigationLinks() {
  const links = Array.from(document.querySelectorAll('a[data-program-nav]'));
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === '_blank') return;

      const destination = link.getAttribute('href');
      if (!destination || destination.startsWith('#')) return;

      event.preventDefault();
      const baseLabel = link.dataset.baseLabel || link.textContent.trim();
      link.dataset.baseLabel = baseLabel;
      link.textContent = 'Opening...';
      link.classList.add('is-loading');

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        window.location.href = destination;
      }, 160);
    });
  });
}

function getFilteredMeals() {
  let meals = currentMealRegion === 'All'
    ? [...MEALS]
    : MEALS.filter(m => m.region === currentMealRegion);

  meals = applyHealthGoalFilter(meals);

  if (currentMealHealthTags.size > 0) {
    meals = meals.filter(m => Array.isArray(m.healthTags) && m.healthTags.some(tag => currentMealHealthTags.has(tag)));
  }

  if (favoritesOnly) {
    const favoriteIds = new Set(Favorites.get());
    meals = meals.filter(m => favoriteIds.has(m.id));
  }

  if (Number.isFinite(currentMaxCalories)) {
    meals = meals.filter(m => Number(m.nutrition?.calories || 0) <= currentMaxCalories);
  }

  if (currentMinProtein > 0) {
    meals = meals.filter(m => Number(m.nutrition?.protein || 0) >= currentMinProtein);
  }

  const q = currentMealSearch.trim().toLowerCase();
  if (q) {
    meals = meals.filter(m => {
      const haystack = [m.name, m.country, m.region, ...(m.ingredients || [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  return meals;
}

function sortMeals(meals) {
  const sorted = [...meals];
  const tagWeight = { bestseller: 0, popular: 1, 'chef special': 2, '': 3 };

  switch (currentMealSort) {
    case 'price-asc':
      sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
      break;
    case 'price-desc':
      sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      break;
    case 'calories-asc':
      sorted.sort((a, b) => Number(a.nutrition?.calories || 0) - Number(b.nutrition?.calories || 0));
      break;
    case 'calories-desc':
      sorted.sort((a, b) => Number(b.nutrition?.calories || 0) - Number(a.nutrition?.calories || 0));
      break;
    case 'protein-desc':
      sorted.sort((a, b) => Number(b.nutrition?.protein || 0) - Number(a.nutrition?.protein || 0));
      break;
    case 'name-asc':
      sorted.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
      break;
    default:
      sorted.sort((a, b) => {
        const aW = tagWeight[a.tag || ''] ?? 3;
        const bW = tagWeight[b.tag || ''] ?? 3;
        if (aW !== bW) return aW - bW;
        return String(a.name || '').localeCompare(String(b.name || ''));
      });
      break;
  }

  return sorted;
}

function resetMealPagination() {
  mealsVisibleCount = MEALS_PER_PAGE;
}

function syncHealthFilterButtonState() {
  const container = document.getElementById('health-filter');
  if (!container) return;

  container.querySelectorAll('.health-filter-btn').forEach(btn => {
    const tag = btn.dataset.tag || '';
    if (tag === '__all__') {
      btn.classList.toggle('active', currentMealHealthTags.size === 0);
    } else {
      btn.classList.toggle('active', currentMealHealthTags.has(tag));
    }
  });
}

function refreshNutritionLabels() {
  const caloriesInput = document.getElementById('meal-calories-range');
  const caloriesValue = document.getElementById('meal-calories-value');
  const proteinInput = document.getElementById('meal-protein-range');
  const proteinValue = document.getElementById('meal-protein-value');
  if (!caloriesInput || !caloriesValue || !proteinInput || !proteinValue) return;

  const maxCalories = Number(caloriesInput.dataset.maxValue || caloriesInput.max || 0);
  const selectedCalories = Number(caloriesInput.value || maxCalories);
  currentMaxCalories = selectedCalories >= maxCalories ? Number.POSITIVE_INFINITY : selectedCalories;
  caloriesValue.textContent = selectedCalories >= maxCalories ? `Any (up to ${maxCalories} kcal)` : `${selectedCalories} kcal`;

  const selectedProtein = Number(proteinInput.value || 0);
  currentMinProtein = selectedProtein;
  proteinValue.textContent = `${selectedProtein}g+`;
}

function renderFavoritesSection() {
  const section = document.getElementById('favorites-section');
  const grid = document.getElementById('meal-favorites-grid');
  const clearBtn = document.getElementById('meal-clear-favorites');
  if (!section || !grid) return;

  const favoriteIds = new Set(Favorites.get());
  const meals = MEALS.filter(m => favoriteIds.has(m.id));

  if (!meals.length) {
    section.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }

  section.style.display = '';
  if (clearBtn) clearBtn.style.display = '';
  renderMealCards(sortMeals(meals).slice(0, 6), 'meal-favorites-grid', { showDetails: true });
}

function buildHealthFilterButtons() {
  const container = document.getElementById('health-filter');
  if (!container) return;

  const tags = [...new Set(MEALS.flatMap(m => m.healthTags || []))].sort((a, b) => a.localeCompare(b));
  container.innerHTML = [
    '<button class="health-filter-btn active" data-tag="__all__">All Health Tags</button>',
    ...tags.map(tag => `<button class="health-filter-btn" data-tag="${tag}">${tag}</button>`),
  ].join('');

  container.querySelectorAll('.health-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag || '';
      if (tag === '__all__') {
        currentMealHealthTags.clear();
      } else if (currentMealHealthTags.has(tag)) {
        currentMealHealthTags.delete(tag);
      } else {
        currentMealHealthTags.add(tag);
      }

      syncHealthFilterButtonState();
      resetMealPagination();
      renderMarketplaceMeals();
    });
  });
}

function initMealSearch() {
  const input = document.getElementById('meal-search');
  if (!input) return;

  input.addEventListener('input', () => {
    currentMealSearch = input.value || '';
    resetMealPagination();
    renderMarketplaceMeals();
  });
}

function initNutritionFilters() {
  const caloriesInput = document.getElementById('meal-calories-range');
  const caloriesValue = document.getElementById('meal-calories-value');
  const proteinInput = document.getElementById('meal-protein-range');
  const proteinValue = document.getElementById('meal-protein-value');

  if (!caloriesInput || !caloriesValue || !proteinInput || !proteinValue) return;

  const caloriesData = MEALS
    .map(m => Number(m.nutrition?.calories || 0))
    .filter(v => Number.isFinite(v) && v > 0);

  const proteinData = MEALS
    .map(m => Number(m.nutrition?.protein || 0))
    .filter(v => Number.isFinite(v) && v >= 0);

  const minCalories = Math.min(...caloriesData);
  const maxCalories = Math.max(...caloriesData);
  const maxProtein = Math.max(...proteinData);

  caloriesInput.min = String(minCalories);
  caloriesInput.max = String(maxCalories);
  caloriesInput.value = String(maxCalories);
  caloriesInput.dataset.maxValue = String(maxCalories);

  proteinInput.min = '0';
  proteinInput.max = String(maxProtein);
  proteinInput.value = '0';
  proteinInput.dataset.maxValue = String(maxProtein);

  refreshNutritionLabels();

  caloriesInput.addEventListener('input', () => {
    refreshNutritionLabels();
    resetMealPagination();
    renderMarketplaceMeals();
  });

  proteinInput.addEventListener('input', () => {
    refreshNutritionLabels();
    resetMealPagination();
    renderMarketplaceMeals();
  });
}

function clearMealFilters() {
  currentMealRegion = 'All';
  currentHealthGoal = 'all';
  currentMealHealthTags.clear();
  currentMealSearch = '';
  currentMealSort = 'featured';
  favoritesOnly = false;

  const searchInput = document.getElementById('meal-search');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('meal-sort');
  if (sortSelect) sortSelect.value = 'featured';

  const regionButtons = [...document.querySelectorAll('#region-filter .region-btn')];
  regionButtons.forEach(b => b.classList.remove('active'));
  if (regionButtons[0]) regionButtons[0].classList.add('active');

  const caloriesInput = document.getElementById('meal-calories-range');
  if (caloriesInput) caloriesInput.value = caloriesInput.max;

  const proteinInput = document.getElementById('meal-protein-range');
  if (proteinInput) proteinInput.value = '0';

  syncHealthGoalButtons();
  syncHealthFilterButtonState();
  refreshNutritionLabels();
  updateFavoritesToggleState();
  renderHomeFeaturedMeals();
  resetMealPagination();
  renderMarketplaceMeals();
}

function initMealClearFilters() {
  const button = document.getElementById('meal-clear-filters');
  if (!button) return;

  button.addEventListener('click', () => {
    clearMealFilters();
    showToast('Meal filters reset.');
  });
}

function initClearFavorites() {
  const button = document.getElementById('meal-clear-favorites');
  if (!button) return;

  button.addEventListener('click', () => {
    Favorites.clear();
    favoritesOnly = false;
    updateFavoritesToggleState();
    resetMealPagination();
    renderMarketplaceMeals();
    showToast('Saved favorites cleared.');
  });
}

function initFavoritesToggle() {
  const button = document.getElementById('meal-favorites-toggle');
  if (!button) return;

  updateFavoritesToggleState();
  button.addEventListener('click', () => {
    favoritesOnly = !favoritesOnly;
    updateFavoritesToggleState();
    resetMealPagination();
    renderMarketplaceMeals();
  });
}

function exportFilteredMealsJSON() {
  const meals = sortMeals(getFilteredMeals());
  if (!meals.length) {
    showToast('No meals match current filters to export.');
    return;
  }

  const payload = {
    exportedAt: new Date().toISOString(),
    filters: {
      region: currentMealRegion,
      healthTags: [...currentMealHealthTags],
      search: currentMealSearch,
      sort: currentMealSort,
      maxCalories: Number.isFinite(currentMaxCalories) ? currentMaxCalories : null,
      minProtein: currentMinProtein,
      favoritesOnly,
    },
    totalMeals: meals.length,
    meals,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dwm-meals-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  showToast(`Exported ${meals.length} meals to JSON.`);
}

function initMealExport() {
  const button = document.getElementById('meal-export-json');
  if (!button) return;
  button.addEventListener('click', exportFilteredMealsJSON);
}

function initMealSort() {
  const select = document.getElementById('meal-sort');
  if (!select) return;

  select.addEventListener('change', () => {
    currentMealSort = select.value || 'featured';
    resetMealPagination();
    renderMarketplaceMeals();
  });
}

function initMealLoadMore() {
  const button = document.getElementById('meal-load-more');
  if (!button) return;

  button.addEventListener('click', () => {
    mealsVisibleCount += MEALS_PER_PAGE;
    renderMarketplaceMeals();
  });
}

function isExternalMarketplaceIntegrationActive() {
  return Boolean(window.__DWM_INTEGRATION_MARKETPLACE__ && window.__DWM_MARKETPLACE_RENDERED_BY_INTEGRATION__);
}

function renderMarketplaceMeals() {
  if (isExternalMarketplaceIntegrationActive()) return;
  if (!document.getElementById('marketplace-meals')) return;

  const meals = sortMeals(getFilteredMeals());
  const visibleMeals = meals.slice(0, mealsVisibleCount);

  renderFavoritesSection();
  updateFavoritesToggleState();

  renderMealCards(visibleMeals, 'marketplace-meals', { showDetails: true });

  const countEl = document.getElementById('meal-count');
  if (countEl) {
    if (visibleMeals.length < meals.length) {
      countEl.textContent = `${visibleMeals.length} of ${meals.length} meals shown`;
    } else {
      countEl.textContent = `${meals.length} meal${meals.length !== 1 ? 's' : ''} found`;
    }
  }

  const paginationWrap = document.getElementById('meal-pagination');
  const loadMoreBtn = document.getElementById('meal-load-more');
  if (paginationWrap && loadMoreBtn) {
    const remaining = meals.length - visibleMeals.length;
    if (remaining > 0) {
      paginationWrap.style.display = 'flex';
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = `Load More Meals (${remaining} left)`;
    } else {
      paginationWrap.style.display = meals.length > MEALS_PER_PAGE ? 'flex' : 'none';
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'All meals loaded';
    }
  }
}

function switchTab(tab) {
  const mealsPanel = document.getElementById('panel-meals');
  const ingredientsPanel = document.getElementById('panel-ingredients');
  const mealsBtn = document.getElementById('tab-meals');
  const ingredientsBtn = document.getElementById('tab-ingredients');

  if (!mealsPanel || !ingredientsPanel || !mealsBtn || !ingredientsBtn) return;

  mealsPanel.style.display = tab === 'meals' ? '' : 'none';
  ingredientsPanel.style.display = tab === 'ingredients' ? '' : 'none';
  mealsBtn.classList.toggle('active', tab === 'meals');
  ingredientsBtn.classList.toggle('active', tab === 'ingredients');

  if (tab === 'meals') {
    renderMarketplaceMeals();
  } else {
    renderIngredientCards(INGREDIENTS, 'marketplace-ingredients');
  }
}

function filterRegion(region, btn) {
  currentMealRegion = region;
  document.querySelectorAll('#region-filter .region-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  resetMealPagination();
  renderMarketplaceMeals();
}

function filterIngredients(region, btn) {
  document.querySelectorAll('#ingredient-region-filter .region-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filtered = region === 'All'
    ? INGREDIENTS
    : INGREDIENTS.filter(i => i.region === region);

  renderIngredientCards(filtered, 'marketplace-ingredients');
}

function initMarketplace() {
  if (isExternalMarketplaceIntegrationActive()) return;

  if (!document.getElementById('marketplace-meals')) return;
  buildHealthFilterButtons();
  syncHealthFilterButtonState();
  initMealSearch();
  initMealSort();
  initNutritionFilters();
  initFavoritesToggle();
  initMealClearFilters();
  initClearFavorites();
  initMealExport();
  initMealLoadMore();
  renderMarketplaceMeals();
  renderIngredientCards(INGREDIENTS, 'marketplace-ingredients');
}

function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots = Array.from(slider.querySelectorAll('[data-hero-dot]'));
  const prevBtn = slider.querySelector('[data-hero-prev]');
  const nextBtn = slider.querySelector('[data-hero-next]');
  if (!slides.length) return;

  let currentIndex = 0;
  let timerId = null;

  const showSlide = index => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const startAutoplay = () => {
    clearInterval(timerId);
    timerId = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 6000);
  };

  const stopAutoplay = () => {
    clearInterval(timerId);
    timerId = null;
  };

  prevBtn?.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  showSlide(0);
  startAutoplay();
}

function initRecoveryCarousel() {
  const carousel = document.querySelector('[data-recovery-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.recovery-slide'));
  const dots = Array.from(document.querySelectorAll('[data-recovery-dot]'));
  const prevBtn = carousel.querySelector('[data-recovery-prev]');
  const nextBtn = carousel.querySelector('[data-recovery-next]');
  if (!slides.length) return;

  let currentIndex = 0;
  let timerId = null;

  const showSlide = index => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const startAutoplay = () => {
    clearInterval(timerId);
    timerId = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 7000);
  };

  const stopAutoplay = () => {
    clearInterval(timerId);
    timerId = null;
  };

  prevBtn?.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  showSlide(0);
  startAutoplay();
}

function initTractionCounters() {
  const counters = Array.from(document.querySelectorAll('.counter-value[data-counter-target]'));
  if (!counters.length) return;

  const animateCounter = counter => {
    const target = Number(counter.dataset.counterTarget || 0);
    if (!Number.isFinite(target) || target <= 0) {
      counter.textContent = '0';
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const update = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(counter => {
      const target = Number(counter.dataset.counterTarget || 0);
      counter.textContent = Number.isFinite(target) ? target.toLocaleString() : '0';
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  counters.forEach(counter => {
    counter.textContent = '0';
    observer.observe(counter);
  });
}

function initFaqAccordion() {
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const toggle = item.querySelector('[data-faq-toggle]');
    const answer = item.querySelector('[data-faq-answer]');
    if (!toggle || !answer) return;

    answer.hidden = true;
    answer.style.maxHeight = '0px';

    toggle.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(otherItem => {
        const otherToggle = otherItem.querySelector('[data-faq-toggle]');
        const otherAnswer = otherItem.querySelector('[data-faq-answer]');
        if (!otherToggle || !otherAnswer) return;

        otherItem.classList.remove('open');
        otherToggle.setAttribute('aria-expanded', 'false');
        otherAnswer.style.maxHeight = '0px';
        setTimeout(() => {
          if (!otherItem.classList.contains('open')) {
            otherAnswer.hidden = true;
          }
        }, 240);
      });

      if (isOpen) {
        return;
      }

      item.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
      requestAnimationFrame(() => {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const hasEmptyField = requiredFields.some(field => !String(field.value || '').trim());

    if (hasEmptyField) {
      showToast('Please complete all required fields before sending.');
      return;
    }

    showToast('Thank you. Our team will contact you shortly.');
    form.reset();
  });
}

function initChefPartnerForm() {
  const form = document.getElementById('chef-partner-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const hasEmptyRequiredField = requiredFields.some(field => {
      if (field.type === 'checkbox') {
        return !field.checked;
      }

      return !String(field.value || '').trim();
    });

    const selectedCuisines = form.querySelectorAll('input[name="cuisines"]:checked');
    if (hasEmptyRequiredField || selectedCuisines.length === 0) {
      showToast('Please complete all required fields and select at least one cuisine style.');
      return;
    }

    showToast('Application received. Our partnerships team will contact you within 48 hours.');
    form.reset();
  });
}

// ── Scroll Animation ──────────────────────────
function initScrollAnimation() {
  const animatedElements = Array.from(document.querySelectorAll('.meal-card, .health-card, .chef-mini-card, .info-card, .feature-card, .goal-card, .plan-card, .program-card, .clinical-card, .traction-card, .why-card, .tele-card, .resource-card, .trimester-card, .article-card, .summary-card, .faq-item, .contact-info-card, .contact-form-card'));
  if (!animatedElements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.style.transitionDelay = '0ms';
    observer.observe(el);
  });

  document.querySelectorAll('.goal-card').forEach((el, index) => {
    const delay = Math.min(index * 90, 360);
    el.style.transitionDelay = `${delay}ms`;
  });

  document.querySelectorAll('.plan-card').forEach((el, index) => {
    const delay = Math.min(index * 110, 440);
    el.style.transitionDelay = `${delay}ms`;
  });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCheckoutSystem();
  initHealthGoalSelector();
  initExpandableSections();
  initHomeSections();
  initHeroSlider();
  initRecoveryCarousel();
  initTractionCounters();
  initMarketplace();
  initFaqAccordion();
  initContactForm();
  initChefPartnerForm();
  initLoginForm();
  initSignupForm();
  initBookingForm();
  initClinicalProgramFilter();
  initProgramNavigationLinks();
  initScrollAnimation();
});
