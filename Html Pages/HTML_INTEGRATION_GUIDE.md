# HTML INTEGRATION GUIDE — Dine With Mee
# ─────────────────────────────────────────────────────────────
# Paste these snippets into your existing HTML files.
# The ONE required script tag goes on EVERY page (bottom of <body>):
#
#   <script type="module" src="src/main.js"></script>
#
# Everything else below shows WHICH IDs / classes to add to
# elements already in your HTML.
# ─────────────────────────────────────────────────────────────


════════════════════════════════════════════════════════
EVERY PAGE  ―  Add this ONE script before </body>
════════════════════════════════════════════════════════

<script type="module" src="src/main.js"></script>


════════════════════════════════════════════════════════
NAVBAR  ―  Add these data attributes to your nav elements
════════════════════════════════════════════════════════

<!-- Cart count badge (add to your existing cart icon/link) -->
<span class="cart-count" style="display:none;">0</span>

<!-- Show ONLY when logged in -->
<div class="dwm-show-auth" style="display:none;">
  <span class="dwm-user-name">Account</span>
  <button class="dwm-logout-btn">Logout</button>
</div>

<!-- Show ONLY when logged out -->
<div class="dwm-hide-auth">
  <a href="/login.html">Login</a>
  <a href="/register.html">Register</a>
</div>


════════════════════════════════════════════════════════
INDEX.HTML  ―  Homepage
════════════════════════════════════════════════════════

<!-- Optional: greeting for logged-in users -->
<div id="user-greeting" style="display:none;"></div>

<!-- Featured meals grid -->
<div id="featured-meals-grid" class="meals-grid" style="
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
"></div>

<!-- Optional: personalized section (only shown when logged in) -->
<section id="personalized-section" style="display:none;">
  <h2>Recommended for You
    <span data-condition-badge class="condition-badge" style="display:none;
      font-size:0.75rem;padding:3px 12px;border-radius:20px;
      background:rgba(200,168,75,0.2);color:#c8a84b;margin-left:0.5rem;
    "></span>
  </h2>
  <div data-personalized-grid class="personalized-grid" style="
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  "></div>
</section>

<!-- Optional: category highlights -->
<div id="category-highlights" style="
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
"></div>


════════════════════════════════════════════════════════
MEALS.HTML  ―  Meals listing page
════════════════════════════════════════════════════════

<!-- Filter bar will render here -->
<div id="filter-bar-container"></div>

<!-- Result count text -->
<p id="results-count" style="color:rgba(255,255,255,0.5);font-size:0.85rem;"></p>

<!-- Personalized banner (shown above grid when user has health profile) -->
<div id="personalized-banner" style="display:none;"></div>

<!-- Optional: button to switch to personalized view -->
<button id="dwm-personalized-btn" style="
  background:rgba(200,168,75,0.1);
  border:1px solid rgba(200,168,75,0.3);
  color:#c8a84b;padding:0.5rem 1.25rem;
  border-radius:20px;font-size:0.85rem;cursor:pointer;
">🧬 My Recommendations</button>

<!-- Meals grid -->
<div id="meals-grid" style="
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
"></div>


════════════════════════════════════════════════════════
LOGIN.HTML  ―  Login page
════════════════════════════════════════════════════════

<form id="login-form">
  <div>
    <label>Email</label>
    <input id="login-email" type="email" placeholder="your@email.com" required />
  </div>
  <div>
    <label>Password</label>
    <input id="login-password" type="password" placeholder="••••••••" required />
    <button type="button" data-toggle-password data-target="login-password">👁️</button>
  </div>
  <div id="login-error" style="display:none;"></div>
  <button type="submit" id="login-btn">Sign In</button>
  <p>Don't have an account? <a href="/register.html">Register</a></p>
</form>


════════════════════════════════════════════════════════
REGISTER.HTML  ―  Registration page
════════════════════════════════════════════════════════

<form id="register-form">
  <div>
    <label>Full Name *</label>
    <input id="register-name" type="text" placeholder="Amara Diallo" required />
  </div>
  <div>
    <label>Email *</label>
    <input id="register-email" type="email" placeholder="your@email.com" required />
  </div>
  <div>
    <label>Password *</label>
    <input id="register-password" type="password" placeholder="Min 6 characters" required />
    <button type="button" data-toggle-password data-target="register-password">👁️</button>
    <small id="password-strength"></small>
  </div>
  <div>
    <label>Confirm Password</label>
    <input id="register-confirm" type="password" placeholder="Repeat password" />
  </div>
  <div>
    <label>Country</label>
    <select id="register-country"><!-- populated by JS --></select>
  </div>
  <div>
    <label>Phone (optional)</label>
    <input id="register-phone" type="tel" placeholder="+234 800 000 0000" />
  </div>
  <div id="register-error" style="display:none;"></div>
  <button type="submit" id="register-btn">Create Account</button>
  <p>Already have an account? <a href="/login.html">Sign in</a></p>
</form>


════════════════════════════════════════════════════════
CART.HTML  ―  Cart / basket page
════════════════════════════════════════════════════════

<div style="display:grid;grid-template-columns:1fr 320px;gap:2rem;align-items:start;">

  <!-- Left: cart items -->
  <div id="cart-items-container"></div>

  <!-- Right: summary + checkout -->
  <div id="cart-summary"></div>

</div>

<!-- Optional: delivery details (sent with order) -->
<input id="delivery-address" type="text" placeholder="Delivery address…" />
<textarea id="order-notes" placeholder="Special instructions…"></textarea>


════════════════════════════════════════════════════════
PROFILE.HTML  ―  User profile & health settings
════════════════════════════════════════════════════════

<!-- Profile section -->
<section>
  <h2>My Profile</h2>
  <div id="profile-form-container"></div>
</section>

<!-- Health profile section -->
<section>
  <h2>Health Profile</h2>
  <p style="color:rgba(255,255,255,0.5);font-size:0.85rem;">
    Your health data is used only to filter and personalise your meals.
    We never share it.
  </p>
  <div id="health-profile-container"></div>
</section>

<!-- Order history -->
<section>
  <h2>Order History</h2>
  <div id="order-history-container"></div>
</section>


════════════════════════════════════════════════════════
ORDER-CONFIRMATION.HTML  ―  Post-checkout
════════════════════════════════════════════════════════

<main id="confirmation-container"></main>
<!-- Content is rendered entirely by JS from the orderId URL param -->
<!-- URL format: /order-confirmation.html?orderId=<uuid> -->


════════════════════════════════════════════════════════
NOTES
════════════════════════════════════════════════════════

1. The integration uses native ES Modules (type="module").
   Your server must serve files with correct MIME types.
   For local dev, use:  npx serve .  or  python -m http.server 8080

2. The backend must be running at http://localhost:5000/api
   Change BASE_URL in src/api/apiClient.js for production.

3. CORS: The backend already has CORS enabled for your GitHub Pages URL.
   For local dev, it accepts all origins (*) in development mode.

4. localStorage keys used:
   - dwm_token   (JWT)
   - dwm_user    (user object)
   - dwm_cart    (cart array)

5. Custom events emitted on window:
   - dwm:login         { detail: user }
   - dwm:logout        
   - dwm:cartUpdate    { detail: { cart, count, total } }
