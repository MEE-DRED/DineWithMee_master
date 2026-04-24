# 🌍 Dine With Mee — Frontend Integration Layer

Complete API integration between the Dine With Mee frontend and backend.

---

## 📁 File Structure

```
src/
├── api/
│   ├── apiClient.js          ← Base HTTP client (auto JWT, error handling)
│   ├── auth.js               ← register, login, me
│   ├── meals.js              ← fetchMeals, fetchPersonalizedMeals
│   ├── orders.js             ← createOrder, fetchUserOrders
│   └── user.js               ← profile, health profile
│
├── utils/
│   ├── auth.js               ← saveToken, getToken, isLoggedIn, logout
│   ├── cart.js               ← addToCart, removeFromCart, getCart, clearCart
│   ├── toast.js              ← toast.success / error / warning / info
│   └── spinner.js            ← setButtonLoading, showSkeleton, showOverlay
│
├── components/
│   ├── Navbar.js             ← initNavbar() — auth state + cart badge
│   ├── MealCard.js           ← createMealCardHTML, renderMealsGrid
│   └── FilterBar.js          ← initFilterBar(container, onFilter)
│
├── pages/
│   ├── home.js               ← Homepage logic
│   ├── meals.js              ← Meals listing + filters + personalized
│   ├── login.js              ← Login form handler
│   ├── register.js           ← Register form + password strength
│   ├── cart.js               ← Cart render + checkout
│   ├── profile.js            ← Profile + health profile + order history
│   └── order-confirmation.js ← Post-checkout confirmation
│
└── main.js                   ← 🚀 ONE script tag for all pages (auto-routes)
```

---

## ⚡ Setup (3 steps)

### Step 1 — Copy files
Drop the entire `src/` folder into your frontend project root.

### Step 2 — Add ONE script tag to every HTML page
```html
<!-- Before </body> on EVERY page -->
<script type="module" src="src/main.js"></script>
```

### Step 3 — Add IDs to your existing HTML elements

See `HTML_INTEGRATION_GUIDE.md` for the exact markup to add per page.

---

## 🔑 Key IDs the integration listens for

| Page | Required ID | Description |
|------|-------------|-------------|
| All | `.cart-count` | Cart item badge |
| All | `.dwm-show-auth` | Visible when logged in |
| All | `.dwm-hide-auth` | Visible when logged out |
| All | `.dwm-logout-btn` | Logout trigger |
| Home | `#featured-meals-grid` | Featured meal cards |
| Meals | `#meals-grid` | All meals grid |
| Meals | `#filter-bar-container` | Filter controls |
| Meals | `#personalized-banner` | Health filter notice |
| Login | `#login-form` | Login form |
| Login | `#login-email` | Email field |
| Login | `#login-password` | Password field |
| Register | `#register-form` | Register form |
| Cart | `#cart-items-container` | Cart item list |
| Cart | `#cart-summary` | Summary + checkout button |
| Profile | `#profile-form-container` | Profile edit form |
| Profile | `#health-profile-container` | Health condition form |
| Profile | `#order-history-container` | Past orders list |
| Confirmation | `#confirmation-container` | Order details |

---

## 🧠 How personalized meals work

1. User sets health condition in Profile → Health Profile
2. Backend saves it to `HealthProfile` table
3. `GET /meals/personalized` runs the Health Filter Engine:
   - **Diabetes** → removes meals with sugar >10g or carbs >50g
   - **Hypertension** → removes meals with sodium >400mg  
   - **Pregnancy** → prioritises protein-rich, folate-rich meals
4. Frontend shows `safeMeals` with a banner explaining what was filtered

---

## 🛒 Cart flow

```
addToCart(meal)           → saved to localStorage
renderCart()              → reads cart, renders items + summary
handleCheckout()          → calls createOrder(buildOrderPayload())
clearCart()               → empties cart after success
redirect to /order-confirmation.html?orderId=<id>
```

---

## 🔐 Auth flow

```
register / login          → POST /auth/* → save token + user to localStorage
isLoggedIn()              → checks token + expiry
requireAuth()             → guards protected pages, redirects to /login.html
logout()                  → clears localStorage, emits dwm:logout event
```

---

## 📡 Custom events

Listen on `window` for reactive UI updates:

```js
window.addEventListener('dwm:login',      e => console.log(e.detail)); // user object
window.addEventListener('dwm:logout',     () => ...);
window.addEventListener('dwm:cartUpdate', e => console.log(e.detail)); // { cart, count, total }
```

---

## 🌐 Changing the backend URL

Edit `src/api/apiClient.js` line 6:

```js
const BASE_URL = "https://your-backend.railway.app/api"; // ← production URL
```

---

## 🛠 Local development server

ES Modules require a real server (not `file://`):

```bash
# Option 1
npx serve .

# Option 2  
python -m http.server 8080

# Option 3 (VS Code)
Install "Live Server" extension → right-click index.html → Open with Live Server
```
