# Frontend Refinement Plan - DynWithMee

**Date**: April 23, 2026  
**Based on**: HTML Pages reference designs + existing Redux architecture

---

## 🎯 Goals

1. **Responsive Navigation** - Enhance navbar to match HTML reference design with improved mobile experience
2. **Redux Integration** - Ensure all state management uses Redux (no Context API duplication)
3. **Design Consistency** - Match the premium look from HTML pages (styles.css)
4. **Mobile-First** - Responsive components for all screen sizes
5. **Complete Features** - Implement all sections from HTML reference pages

---

## 📊 Current State Analysis

### ✅ What's Working:
- Redux store with 14+ slices (auth, cart, meals, health, consultations, etc.)
- Basic responsive navbar with mobile menu
- Cart sidebar functionality
- Authentication flow
- Toast notifications

### ❌ Issues Identified:
1. **Duplicate State Management**: Both Redux + Context API (AuthContext, CartContext)
2. **Navigation Mismatch**: Current navbar doesn't match HTML reference design
3. **Missing Features**: Hero slider, clinical focus cards, region filters
4. **Styling Inconsistency**: Not using the premium styles from HTML pages
5. **Cart UX**: Cart is in sidebar, HTML reference shows it as button with count badge
6. **Mobile Navigation**: Current mobile menu is basic, needs enhancement

---

## 🔧 Phase 1: Navigation Enhancement (Priority 1)

### 1.1 Enhanced Navbar Component

**Match HTML reference navigation exactly:**

```jsx
// Features to implement:
- Fixed navbar with backdrop blur
- Logo with circular "D" mark + "Dine with Mee" text
- Desktop: Horizontal links (Home, Health Hub, Marketplace, Contact)
- Cart button with badge count (not sidebar trigger)
- Auth buttons: "Log in" + "Join Free" (when logged out)
- Logged in: Show user menu dropdown + Dashboard link
- Mobile: Hamburger menu with slide-in drawer
- Active link highlighting with dwm-gold color
```

**Redux State Used:**
- `selectAuth` - for auth state
- `selectCartTotalItems` - for cart badge count

### 1.2 Mobile Navigation Drawer

**Match HTML reference mobile experience:**
- Slide from right side
- Full-height drawer with dark green background
- Logo at top
- Navigation links with icons
- User section at bottom (logged in/out states)
- Close button with "×" icon
- Backdrop overlay with blur

### 1.3 Remove Context API Dependencies

**Refactor:**
- Remove `AuthContext` - use Redux `authSlice` directly
- Remove `CartContext` - use Redux `cartSlice` directly
- Update all components importing from context
- Keep Redux as single source of truth

**Files to Update:**
1. `src/context/AuthContext.jsx` - DELETE
2. `src/context/CartContext.jsx` - DELETE
3. `src/App.jsx` - Remove Provider wrappers
4. `src/components/Navbar.jsx` - Use Redux hooks
5. `src/components/CartSidebar.jsx` - Use Redux hooks
6. All pages importing from context - switch to Redux

---

## 🎨 Phase 2: Design System Integration (Priority 1)

### 2.1 CSS Variables from HTML Reference

**Import CSS variables from styles.css:**

```css
/* Add to index.css or global.css */
:root {
  --green-deep:   #0D3B2B;
  --green-mid:    #145A3E;
  --green-light:  #1E7A56;
  --green-pale:   #E8F5EF;
  --gold:         #C9973A;
  --gold-light:   #E8B85C;
  --gold-pale:    #FBF3E3;
  --white:        #FFFFFF;
  --off-white:    #F9F6F0;
  --text-dark:    #1A1A1A;
  --text-mid:     #4A4A4A;
  --text-light:   #888888;
  --shadow-sm:    0 2px 12px rgba(13,59,43,0.08);
  --shadow-md:    0 8px 32px rgba(13,59,43,0.14);
  --shadow-lg:    0 20px 60px rgba(13,59,43,0.18);
  --radius-sm:    8px;
  --radius-md:    16px;
  --radius-lg:    24px;
  --transition:   0.3s cubic-bezier(0.4,0,0.2,1);
}
```

### 2.2 Update Tailwind Config

**Extend Tailwind with CSS variables:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'dwm-green-deep': 'var(--green-deep)',
        'dwm-green-mid': 'var(--green-mid)',
        'dwm-green-light': 'var(--green-light)',
        'dwm-green-pale': 'var(--green-pale)',
        'dwm-gold': 'var(--gold)',
        'dwm-gold-light': 'var(--gold-light)',
        'dwm-gold-pale': 'var(--gold-pale)',
        'dwm-text-dark': 'var(--text-dark)',
        'dwm-text-mid': 'var(--text-mid)',
        'dwm-text-light': 'var(--text-light)',
      },
      boxShadow: {
        'dwm-sm': 'var(--shadow-sm)',
        'dwm-md': 'var(--shadow-md)',
        'dwm-lg': 'var(--shadow-lg)',
      },
      borderRadius: {
        'dwm-sm': 'var(--radius-sm)',
        'dwm-md': 'var(--radius-md)',
        'dwm-lg': 'var(--radius-lg)',
      },
    },
  },
};
```

### 2.3 Button Component Styles

**Create button variants matching HTML reference:**

```jsx
// src/components/ui/Button.jsx enhancements
const buttonVariants = {
  primary: 'bg-dwm-gold hover:bg-dwm-gold-light text-dwm-green-deep',
  secondary: 'bg-transparent border-2 border-dwm-gold text-dwm-gold hover:bg-dwm-gold/10',
  login: 'bg-transparent border border-white/30 text-white hover:bg-white/10',
  cart: 'bg-white/8 border border-white/15 text-white hover:bg-white/15',
};
```

---

## 🏠 Phase 3: Homepage Components (Priority 2)

### 3.1 Hero Slider Component

**From HTML reference index.html:**

```jsx
// src/components/home/HeroSlider.jsx
Features:
- 3 slides with background images
- Auto-play (5 seconds per slide)
- Navigation: Previous/Next arrows + dot indicators
- Overlay gradient for text readability
- Slide content: Kicker text, H1 title, description, CTA buttons
- Smooth transitions (fade/slide)
```

**Redux State:**
- None needed (local state for current slide)

### 3.2 Clinical Focus Section

**Grid of health program cards:**

```jsx
// src/components/home/ClinicalFocusGrid.jsx
Cards:
1. Diabetes Care
2. Hypertension Support
3. Maternal Health
4. Weight Management
5. Sickle Cell Support

Each card:
- Image
- Title
- Description
- "Explore Program" link
```

**Redux State:**
- Could fetch from backend or use static data

### 3.3 Featured Meals Section

**Already exists, enhance with HTML reference styling:**

```jsx
// src/components/meals/FeaturedMeals.jsx
- Grid layout (3-4 columns on desktop, 1-2 on mobile)
- Meal cards with hover effects
- "Add to Cart" button
- Price, calories, health tags
- Link to meal details
```

**Redux State:**
- `selectMeals` with featured filter
- `addToCart` action

### 3.4 Stats Section

**From HTML reference - impressive numbers:**

```jsx
// src/components/home/StatsSection.jsx
Stats:
- 500+ Therapeutic Meals
- 15,000+ Active Users
- 50+ Partner Chefs
- 98% Satisfaction Rate

Animated counter on scroll
```

---

## 🛒 Phase 4: Marketplace Enhancement (Priority 2)

### 4.1 Region Filter Bar

**From HTML reference marketplace.html:**

```jsx
// src/components/marketplace/RegionFilterBar.jsx
Regions:
- All Regions (default)
- West Africa
- East Africa
- North Africa
- Southern Africa
- Central Africa

Features:
- Horizontal scroll on mobile
- Active state highlighting
- Click to filter meals
```

**Redux State:**
- `setRegionFilter` action
- `selectFilters` selector

### 4.2 Advanced Meal Filters

**Comprehensive filtering UI:**

```jsx
// src/components/marketplace/AdvancedFilters.jsx
Filters:
1. Search input (meal name, country, ingredient)
2. Sort dropdown (featured, price, calories, protein, name)
3. Max Calories slider
4. Min Protein slider
5. Health tags (checkboxes)
6. Dietary preferences (vegetarian, vegan, etc.)
7. Price range slider
8. Clear filters button
```

**Redux State:**
- `setPriceRangeFilter`
- `setHealthTagFilter`
- `setSearchTerm`
- `clearAllFilters`
- `applyFilters`

### 4.3 Meals Grid with Personalization

**Smart meal recommendations:**

```jsx
// src/components/marketplace/MealsGrid.jsx
Features:
- Grid layout (auto-fit minmax(280px, 1fr))
- Personalized banner (if user has health profile)
- "My Recommendations" toggle button
- Empty state (when no meals match filters)
- Loading skeletons
- Pagination or infinite scroll
```

**Redux State:**
- `selectFilteredMeals`
- `selectHealthProfile` (for personalization)
- `selectMealsLoading`

---

## 🏥 Phase 5: Health Hub Page (Priority 2)

### 5.1 Health Pathways Section

**From HTML reference health.html:**

```jsx
// src/pages/Health.jsx sections:
1. Hero banner with health focus
2. Health condition pathways (cards)
3. Nutrition research articles
4. Health assessment CTA
5. Testimonials
6. Book consultation section
```

### 5.2 Health Assessment Flow

**Interactive health profiling:**

```jsx
// src/components/health/HealthAssessmentFlow.jsx
Multi-step form:
1. Personal info (age, gender, location)
2. Health conditions (checkboxes: diabetes, hypertension, etc.)
3. Dietary preferences
4. Goals (weight loss, manage condition, wellness)
5. Activity level
6. Review & submit

Redux State:
- createHealthProfile action
- selectHealthProfile selector
```

---

## 📱 Phase 6: Mobile Responsiveness (Priority 2)

### 6.1 Breakpoints Strategy

**Tailwind breakpoints:**

```
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Small desktops
xl: 1280px  - Large desktops
2xl: 1536px - Extra large
```

### 6.2 Mobile-Specific Components

**Components to create:**

```jsx
1. src/components/mobile/BottomNavigation.jsx
   - Fixed bottom nav on mobile (<768px)
   - Icons: Home, Marketplace, Health, Cart, Profile
   - Active state highlighting

2. src/components/mobile/MobileHeader.jsx
   - Simplified header for small screens
   - Logo + hamburger + cart badge

3. src/components/mobile/MobileFilters.jsx
   - Filter drawer (slide from bottom)
   - "Apply Filters" button
   - Clear filters option
```

### 6.3 Responsive Utilities

**CSS utilities:**

```css
/* Add to global.css */
.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 768px) {
  .mobile-only { display: none; }
  .desktop-only { display: block; }
}

.container-dwm {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 5%;
}
```

---

## 🔄 Phase 7: Redux State Cleanup (Priority 1)

### 7.1 Remove Context API

**Step-by-step migration:**

1. **Create Redux hooks utilities:**

```typescript
// src/hooks/useReduxAuth.ts
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAuth, 
  loginUser, 
  logoutUser, 
  registerUser 
} from '../redux';

export const useReduxAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  return {
    user: auth.user,
    isAuthenticated: !!auth.user,
    isLoading: auth.loading,
    error: auth.error,
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    register: (userData) => dispatch(registerUser(userData)),
  };
};
```

2. **Create Redux cart hook:**

```typescript
// src/hooks/useReduxCart.ts
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectCartIsOpen,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} from '../redux';

export const useReduxCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isOpen = useSelector(selectCartIsOpen);

  return {
    items,
    totalItems,
    totalPrice,
    isOpen,
    addItem: (meal) => dispatch(addToCart(meal)),
    removeItem: (mealId) => dispatch(removeFromCart(mealId)),
    updateItemQuantity: (mealId, quantity) => dispatch(updateQuantity({ mealId, quantity })),
    clearCart: () => dispatch(clearCart()),
    toggleCart: () => dispatch(toggleCart()),
  };
};
```

3. **Update all components:**

```jsx
// Before (using Context):
import { useAuth } from '../context/AuthContext';
const { isAuthenticated, user } = useAuth();

// After (using Redux):
import { useReduxAuth } from '../hooks/useReduxAuth';
const { isAuthenticated, user } = useReduxAuth();
```

### 7.2 Files to Update

**Component updates:**
1. `src/components/Navbar.jsx`
2. `src/components/CartSidebar.jsx`
3. `src/pages/Dashboard.jsx`
4. `src/pages/Login.jsx`
5. `src/pages/Signup.jsx`
6. `src/pages/Profile.jsx`
7. All protected route components

**Files to delete:**
1. `src/context/AuthContext.jsx`
2. `src/context/CartContext.jsx`

---

## 📦 Phase 8: Component Library Enhancement (Priority 3)

### 8.1 Additional UI Components Needed

**From HTML reference patterns:**

```jsx
1. src/components/ui/Tabs.tsx
   - Horizontal tabs with underline active state
   - Used in: Marketplace (Meals/Ingredients tabs)

2. src/components/ui/Slider.tsx
   - Range slider for numerical filters
   - Used in: Meal filters (calories, protein, price)

3. src/components/ui/Breadcrumbs.tsx
   - Navigation breadcrumb trail
   - Used in: All interior pages

4. src/components/ui/Avatar.tsx
   - User avatar with fallback initials
   - Used in: Navbar, profile, comments

5. src/components/ui/Dropdown.tsx
   - Dropdown menu with options
   - Used in: User menu, sort options

6. src/components/ui/SearchInput.tsx
   - Search input with icon and clear button
   - Used in: Marketplace, health content

7. src/components/ui/PriceTag.tsx
   - Formatted price display
   - Used in: Meal cards, cart items
```

### 8.2 Card Component Variants

**Meal Card Enhancement:**

```jsx
// src/components/meals/MealCard.jsx
Variants:
1. Grid view (default) - full details
2. List view - horizontal layout
3. Compact view - minimal info
4. Featured view - larger with banner

Features:
- Image with lazy loading
- Health tags (badges)
- Nutrition info (calories, protein)
- Price
- Add to cart button
- Quick view modal trigger
- Favorite button
- Region flag/icon
```

---

## 🎯 Phase 9: Page-Specific Refinements (Priority 3)

### 9.1 Homepage
- ✅ Hero slider
- ✅ Clinical focus grid
- ✅ Featured meals
- ✅ Stats section
- ✅ Call-to-action sections
- ✅ Testimonials

### 9.2 Marketplace
- ✅ Region filters
- ✅ Advanced filters
- ✅ Meals grid with personalization
- ✅ Tabs (Meals/Ingredients)
- ✅ Sort and search
- ✅ Empty states

### 9.3 Health Hub
- ✅ Health pathways
- ✅ Assessment flow
- ✅ Research articles
- ✅ Consultation booking CTA
- ✅ Resource library

### 9.4 Contact
- ✅ Contact form
- ✅ Office locations
- ✅ FAQ section
- ✅ Social media links

### 9.5 User Dashboard
- ✅ Overview cards (meals ordered, consultations, health progress)
- ✅ Recent activity
- ✅ Quick actions
- ✅ Personalized recommendations
- ✅ Health goals progress

---

## 🚀 Implementation Order

### Week 1 (High Priority):
1. ✅ Remove Context API, migrate to Redux hooks
2. ✅ Refactor Navbar to match HTML reference
3. ✅ Implement mobile navigation drawer
4. ✅ Update CSS variables and design system
5. ✅ Create button variants

### Week 2 (Core Features):
6. ✅ Hero slider component
7. ✅ Clinical focus grid
8. ✅ Region filter bar
9. ✅ Advanced meal filters UI
10. ✅ Responsive breakpoints implementation

### Week 3 (Enhanced UI):
11. ✅ Additional UI components (Tabs, Slider, Breadcrumbs, etc.)
12. ✅ Meal card enhancements
13. ✅ Mobile-specific components
14. ✅ Health assessment flow

### Week 4 (Polish):
15. ✅ Page-specific refinements
16. ✅ Animation and transitions
17. ✅ Empty states
18. ✅ Loading states
19. ✅ Error states
20. ✅ Accessibility audit

---

## ✅ Success Metrics

### Responsive Design:
- ✅ All pages work on screens 320px - 2560px
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Readable text on all devices (min 16px body)
- ✅ No horizontal scroll on mobile

### Performance:
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Lighthouse score > 90

### Redux State Management:
- ✅ Zero Context API dependencies
- ✅ All state in Redux store
- ✅ Proper action/reducer patterns
- ✅ Optimized selectors with reselect

### Design Consistency:
- ✅ Matches HTML reference visual design
- ✅ Consistent spacing (8px grid)
- ✅ Consistent colors (dwm palette)
- ✅ Consistent typography (Playfair + DM Sans)

---

## 📝 Files to Create/Modify

### New Files (25+):
1. `src/hooks/useReduxAuth.ts`
2. `src/hooks/useReduxCart.ts`
3. `src/components/home/HeroSlider.jsx`
4. `src/components/home/ClinicalFocusGrid.jsx`
5. `src/components/home/StatsSection.jsx`
6. `src/components/marketplace/RegionFilterBar.jsx`
7. `src/components/marketplace/AdvancedFilters.jsx`
8. `src/components/marketplace/MealsGrid.jsx`
9. `src/components/mobile/BottomNavigation.jsx`
10. `src/components/mobile/MobileHeader.jsx`
11. `src/components/mobile/MobileFilters.jsx`
12. `src/components/ui/Tabs.tsx`
13. `src/components/ui/Slider.tsx`
14. `src/components/ui/Breadcrumbs.tsx`
15. `src/components/ui/Avatar.tsx`
16. `src/components/ui/Dropdown.tsx`
17. `src/components/ui/SearchInput.tsx`
18. `src/components/ui/PriceTag.tsx`

### Files to Modify (15+):
1. `src/App.jsx` - Remove Context providers
2. `src/components/Navbar.jsx` - Complete redesign
3. `src/components/CartSidebar.jsx` - Use Redux
4. `src/pages/Home.jsx` - Add new sections
5. `src/pages/Marketplace.jsx` - Enhanced filters
6. `src/pages/Health.jsx` - Complete redesign
7. `tailwind.config.js` - Add CSS variables
8. `src/index.css` - Import CSS variables

### Files to Delete (2):
1. `src/context/AuthContext.jsx`
2. `src/context/CartContext.jsx`

---

*Last Updated: April 23, 2026 - 20:15*  
*Total Estimated Files: 40+ files (25 new, 15 modified, 2 deleted)*
