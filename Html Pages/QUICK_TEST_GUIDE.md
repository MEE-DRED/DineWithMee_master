# 🚀 Quick Start Testing Guide

## Step 1: Open Test Dashboard

**URL**: http://localhost:3000/test-dashboard.html

This opens a visual test runner with real-time results and logging.

## Step 2: Run Tests

Inside the dashboard, you'll see buttons:

### 🔴 Run All Tests (Recommended First)

- Tests guard flags on current page
- Verifies DOM elements exist
- Checks localStorage/sessionStorage
- Tests backend connectivity
- Validates module loading

**Expected Results**:

- ✅ 8-10 tests should PASS (frontend integration is complete)
- ⚠️ 1-2 tests may show PENDING (database not configured - normal)
- ❌ 0 tests should FAIL (if any fail, we'll debug together)

### 📄 Test Current Page

- Validates page-specific integration flags
- Checks page's custom form fields

### 🔌 Test Backend

- Attempts health check connection
- If database is set up: Will return more detailed response
- If database not set up: Will show warning (expected)

## Step 3: Interpret Results

### Green ✅ (Passed)

- Module loaded correctly
- Selector found
- Storage working
- Backend responding

### Red ❌ (Failed)

- Missing DOM element
- Module loading error
- Integration flag not set
- Report this to debug

### Yellow ⚠️ (Warning)

- Backend not available (database not configured - normal for now)
- Non-critical feature degraded

## Step 4: Manually Test Each Page

After running automated tests, visit each page:

1. **Homepage**: http://localhost:3000/index-new.html
   - Look for: Featured meals section, category highlights
   - Check console: Should see no JavaScript errors

2. **Login**: http://localhost:3000/login.html
   - Look for: Email/password form, login button
   - Try entering test data (won't submit without backend)

3. **Sign Up**: http://localhost:3000/signup.html
   - Look for: Multi-field form (name, email, password, country)
   - All fields should be discoverable

4. **Marketplace**: http://localhost:3000/marketplace.html
   - Look for: Meals grid, filter controls
   - Filter bar should be visible

## Step 5: Check Browser Console

In each page, press **F12** to open DevTools:

### Console Tab

Look for any **red errors** - if you find any:

1. Copy the error message
2. Check if it's related to:
   - Module loading (network tab)
   - API calls (should say "Cannot reach localhost:5000" - normal without DB)
   - DOM selection (element not found - we'll fix)

### Network Tab

Look for failed requests (red indicators):

- 404s on module files = Problem (report it)
- 404 on /api/meals = Normal (no database yet)
- CORS errors = Backend misconfiguration (we'll fix)

## Troubleshooting If Tests Fail

### "Guard flag not set"

**Action**: Restart backend with `npm start`, reload page

### "Form element not found"

**Action**: Check element IDs using browser DevTools Inspector

```
1. Open DevTools (F12)
2. Click Inspector (top-left)
3. Click on form element
4. Note the ID in HTML panel
5. Report to me
```

### "Backend not responding"

**Action**: This is expected without PostgreSQL setup

- Tests will show warning, not fail
- Proceed with database setup when ready

### "Module failed to load"

**Action**: Check Network tab for 404s

```
1. Open DevTools Network tab
2. Reload page
3. Look for .js files showing 404 status
4. Report file names
```

## When Everything Passes ✅

If all frontend tests pass:

**Next Step**: Set up PostgreSQL database

Choose one option:

### Quick Option: Supabase (Recommended)

```
1. Go to https://supabase.com
2. Sign up (free tier available)
3. Create new project → get connection string
4. In .env file: DATABASE_URL="postgresql://..."
5. Run: npm run db:push
6. Run: npm run db:seed
7. Restart backend: npm start
```

### Local Option: Docker

```bash
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15

# Then update .env and run migrations
```

### System Option: PostgreSQL Native

```
1. Install from postgresql.org
2. Create database
3. Update .env
4. Run migrations
```

## After Database Setup

Then test end-to-end flows:

1. Sign up with test account
2. Browse marketplace with filters
3. Add meals to cart
4. Proceed to checkout
5. Place order

---

**Current Status**: ✅ Ready for frontend testing  
**Server Status**: Both running (verified 200 OK)  
**Next Action**: Open test dashboard and click "Run All Tests"

Good luck! Report any errors and I'll help you fix them! 🍲
