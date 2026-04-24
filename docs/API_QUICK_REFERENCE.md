# API Quick Reference Guide

**Quick lookup for common API operations**

---

## Authentication Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Sign Up | POST | `/auth/signup` | `authAPI.register(userData)` |
| Verify OTP | POST | `/auth/verify-otp` | `authAPI.verifyOtp(otpData)` |
| Login | POST | `/auth/login` | `authAPI.login(credentials)` |
| Logout | POST | `/auth/logout` | `authAPI.logout()` |
| Get Profile | GET | `/auth/me` | `authAPI.getCurrentUser()` |
| Change Password | POST | `/auth/change-password` | `authAPI.changePassword(data)` |
| Forgot Password | POST | `/auth/forgot-password` | `authAPI.forgotPassword(email)` |
| Reset Password | POST | `/auth/reset-password` | `authAPI.resetPassword(data)` |

---

## Users Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get All Users | GET | `/api/v1/users` | `usersAPI.getAll(params)` |
| Get User by ID | GET | `/api/v1/users/:id` | `usersAPI.getById(id)` |
| Update User Status | PATCH | `/api/v1/users/:id/status` | `usersAPI.updateStatus(id, status)` |
| Get User Analytics | GET | `/api/v1/users/analytics/dashboard` | `usersAPI.getAnalytics()` |

---

## Meals Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get All Meals | GET | `/api/v1/meals` | `mealsAPI.getAll(params)` |
| Get Meal by ID | GET | `/api/v1/meals/:id` | `mealsAPI.getById(id)` |
| Search Meals | GET | `/api/v1/meals/search` | `mealsAPI.search(query)` |
| Get Featured Meals | GET | `/api/v1/meals/featured` | `mealsAPI.getFeatured()` |
| Get By Suitability | GET | `/api/v1/meals/suitability` | `mealsAPI.getBySuitability(type)` |

---

## Health Profiles Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get My Profile | GET | `/api/v1/health-profiles/me` | `healthAPI.getProfile()` |
| Create Profile | POST | `/api/v1/health-profiles` | `healthAPI.create(data)` |
| Update Profile | PUT | `/api/v1/health-profiles/:id` | `healthAPI.update(id, data)` |
| Get Nutritional Goals | GET | `/api/v1/health-profiles/:id/nutritional-goals` | `healthAPI.getNutritionalGoals(id)` |

---

## Chatbot Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Create Conversation | POST | `/chatbot/conversations` | `chatbotAPI.createConversation(data)` |
| Send Message | POST | `/chatbot/conversations/:id/messages` | `chatbotAPI.sendMessage(id, data)` |
| Get Conversation | GET | `/chatbot/conversations/:id` | `chatbotAPI.getConversationHistory(id)` |
| Get All Conversations | GET | `/chatbot/conversations` | `chatbotAPI.getAllConversations()` |
| Complete Conversation | PATCH | `/chatbot/conversations/:id/complete` | `chatbotAPI.completeConversation(id)` |

---

## Health Triage Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Perform Assessment | POST | `/health-triage/assess` | `healthTriageAPI.assess(data)` |
| Get Risk Score | GET | `/health-triage/risk-score/:userId` | `healthTriageAPI.getRiskScore(userId)` |

---

## Consultations Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get All Consultations | GET | `/api/v1/consultations` | `consultationsAPI.getAll(params)` |
| Get by ID | GET | `/api/v1/consultations/:id` | `consultationsAPI.getById(id)` |
| Create Consultation | POST | `/api/v1/consultations` | `consultationsAPI.create(data)` |
| Get My Consultations | GET | `/api/v1/consultations/my-consultations` | `consultationsAPI.getMyConsultations()` |
| Get Upcoming | GET | `/api/v1/consultations/upcoming` | `consultationsAPI.getUpcoming()` |
| Update Status | PATCH | `/api/v1/consultations/:id/status` | `consultationsAPI.updateStatus(id, data)` |
| Add Review | POST | `/api/v1/consultations/:id/review` | `consultationsAPI.addReview(id, data)` |

---

## Meal Plans Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get All Plans | GET | `/meal-plans` | `mealPlansAPI.getAll()` |
| Get My Plans | GET | `/api/v1/meal-plans/my-plans` | `mealPlansAPI.getMyPlans()` |
| Get Plan by ID | GET | `/meal-plans/:id` | `mealPlansAPI.getById(id)` |
| Create Plan | POST | `/meal-plans` | `mealPlansAPI.create(data)` |
| Get Plan Items | GET | `/api/v1/meal-plans/:id/items` | `mealPlansAPI.getPlanItems(id)` |
| Get Nutritional Summary | GET | `/api/v1/meal-plans/:id/nutritional-summary` | `mealPlansAPI.getNutritionalSummary(id)` |
| Generate Weekly Plan | POST | `/api/v1/meal-plans/generate-weekly` | `mealPlansAPI.generateWeeklyPlan(prefs)` |

---

## Health Progress Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get My Progress | GET | `/api/v1/health-progress/my-progress` | `healthProgressAPI.getMyProgress()` |
| Get My Trends | GET | `/api/v1/health-progress/my-progress/trends` | `healthProgressAPI.getMyTrends()` |
| Get Weekly Summary | GET | `/api/v1/health-progress/my-progress/weekly-summary` | `healthProgressAPI.getWeeklySummary()` |
| Get Monthly Stats | GET | `/api/v1/health-progress/my-progress/monthly-stats` | `healthProgressAPI.getMonthlyStats()` |
| Create Progress Log | POST | `/api/v1/health-progress` | `healthProgressAPI.create(data)` |

---

## Diet Recalls Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Create Recall | POST | `/diet-recalls` | `dietRecallsAPI.createRecall(data)` |
| Get User History | GET | `/diet-recalls/user/:userId` | `dietRecallsAPI.getUserHistory(userId)` |
| Get Analysis | GET | `/diet-recalls/:id/analysis` | `dietRecallsAPI.getAnalysis(id)` |

---

## Nutritionists Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get All Nutritionists | GET | `/api/v1/nutritionists` | `nutritionistsAPI.getAll(params)` |
| Get by ID | GET | `/api/v1/nutritionists/:id` | `nutritionistsAPI.getById(id)` |
| Get My Profile | GET | `/api/v1/nutritionists/me` | `nutritionistsAPI.getMyProfile()` |
| Get Consultations | GET | `/api/v1/nutritionists/:id/consultations` | `nutritionistsAPI.getConsultations(id)` |
| Get Reviews | GET | `/api/v1/nutritionists/:id/reviews` | `nutritionistsAPI.getReviews(id)` |
| Get Availability | GET | `/api/v1/nutritionists/:id/availability` | `nutritionistsAPI.getAvailability(id)` |

---

## Admin Endpoints

| Operation | Method | Endpoint | Function |
|-----------|--------|----------|----------|
| Get Dashboard Stats | GET | `/api/v1/admin/dashboard/stats` | `adminAPI.getDashboardStats()` |
| Get All Users | GET | `/api/v1/admin/users` | `adminAPI.getUsers(params)` |
| Update User | PATCH | `/api/v1/admin/users/:userId` | `adminAPI.updateUser(userId, data)` |
| Verify Nutritionist | PUT | `/api/v1/admin/users/:userId/verify` | `adminAPI.verifyNutritionist(userId, data)` |
| Get Pending Content | GET | `/api/v1/admin/content/pending` | `adminAPI.getPendingContent()` |
| Approve Content | PUT | `/api/v1/admin/content/:id/approve` | `adminAPI.approveContent(id, type)` |
| Reject Content | PUT | `/api/v1/admin/content/:id/reject` | `adminAPI.rejectContent(id, type)` |
| Get System Health | GET | `/api/v1/admin/system/health` | `adminAPI.getSystemHealth()` |

---

## Common Use Cases

### 1. User Registration Flow
```javascript
// Step 1: Sign up
const signupResponse = await authAPI.register({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
});

// Step 2: Verify OTP
const verifyResponse = await authAPI.verifyOtp({
  email: 'user@example.com',
  otp: '123456'
});

// Step 3: Login
const loginResponse = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
});

// Step 4: Store token
localStorage.setItem('dwm-token', loginResponse.data.tokens.accessToken);
```

---

### 2. Health Assessment Flow
```javascript
// Step 1: Create health profile
const profileResponse = await healthAPI.create({
  healthConditions: ['Hypertension'],
  weight: 75,
  height: 170
});

// Step 2: Perform triage assessment
const triageResponse = await healthTriageAPI.assess({
  age: 45,
  systolicBp: 145,
  diastolicBp: 95,
  fastingGlucose: 110
});

// Step 3: Log progress
const progressResponse = await healthProgressAPI.create({
  date: '2026-04-23',
  weight: 75,
  bloodPressureSystolic: 145,
  bloodPressureDiastolic: 95
});
```

---

### 3. Chatbot Conversation Flow
```javascript
// Step 1: Start conversation
const conversation = await chatbotAPI.createConversation({
  conversationType: 'INITIAL_TRIAGE'
});

// Step 2: Send messages
const message1 = await chatbotAPI.sendMessage(conversation.data.id, {
  content: 'I need help with my diet'
});

const message2 = await chatbotAPI.sendMessage(conversation.data.id, {
  content: 'I have hypertension'
});

// Step 3: Complete conversation
await chatbotAPI.completeConversation(conversation.data.id);
```

---

### 4. Consultation Booking Flow
```javascript
// Step 1: Get available nutritionists
const nutritionists = await nutritionistsAPI.getAll({
  specialization: 'hypertension',
  isAvailable: true
});

// Step 2: Check availability
const availability = await nutritionistsAPI.getAvailability(
  nutritionists.data[0].id,
  { date: '2026-04-25' }
);

// Step 3: Book consultation
const consultation = await consultationsAPI.create({
  nutritionistId: nutritionists.data[0].id,
  scheduledAt: '2026-04-25T14:00:00Z',
  notes: 'Initial consultation for hypertension management'
});
```

---

### 5. Meal Planning Flow
```javascript
// Step 1: Search for suitable meals
const meals = await mealsAPI.getBySuitability('hypertension-friendly');

// Step 2: Generate weekly meal plan
const mealPlan = await mealPlansAPI.generateWeeklyPlan({
  preferences: {
    cuisineType: 'Nigerian',
    targetCalories: 2000,
    excludeIngredients: ['pork']
  }
});

// Step 3: Get plan details
const planItems = await mealPlansAPI.getPlanItems(mealPlan.data.id);
const nutritionSummary = await mealPlansAPI.getNutritionalSummary(mealPlan.data.id);
```

---

## Troubleshooting

### 401 Unauthorized Error
**Problem**: Token is missing or expired  
**Solution**:
```javascript
// Check if token exists
const token = localStorage.getItem('dwm-token');
if (!token) {
  // Redirect to login
  window.location.href = '/login';
}

// Try refreshing the token
const refreshToken = localStorage.getItem('dwm-refresh-token');
if (refreshToken) {
  const response = await authAPI.refreshToken();
  localStorage.setItem('dwm-token', response.data.accessToken);
}
```

---

### Network Timeout
**Problem**: Request takes too long  
**Solution**:
```javascript
// Increase timeout in api config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
});
```

---

### CORS Errors
**Problem**: Cross-origin request blocked  
**Solution**: Contact backend team to whitelist your domain

---

## Environment Variables

Create a `.env` file in the project root:

```bash
# API Configuration
VITE_API_URL=https://new-dine-with-mee-backend.onrender.com

# For local development
# VITE_API_URL=http://localhost:3000
```

---

## HTTP Status Code Reference

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Process response data |
| 201 | Created | Resource created successfully |
| 204 | No Content | Successful deletion |
| 400 | Bad Request | Check request payload |
| 401 | Unauthorized | Refresh token or re-login |
| 403 | Forbidden | Check user permissions |
| 404 | Not Found | Check endpoint URL |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Retry or contact support |

---

## Common Request Headers

```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>',
  'Accept': 'application/json'
}
```

---

## Common Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| page | number | Page number | `?page=2` |
| limit | number | Items per page | `?limit=20` |
| include | string | Relations to include | `?include=ingredients,region` |
| search | string | Search term | `?search=jollof` |
| filter | string | Filter criteria | `?filter=hypertension-friendly` |

---

## Rate Limiting

- **Limit**: 100 requests per minute per user
- **Header**: `X-RateLimit-Remaining`
- **Action**: Implement exponential backoff if rate limited

---

## FAQ

**Q: How do I handle token refresh?**  
A: The axios interceptor automatically handles 401 errors. Implement a refresh token flow in the error handler.

**Q: Can I use the API without authentication?**  
A: Some endpoints (meals, ingredients, content) are public. Most require authentication.

**Q: How do I upload images?**  
A: Use FormData with `Content-Type: multipart/form-data`

**Q: What's the maximum request payload size?**  
A: 10MB for regular requests, 50MB for file uploads

**Q: How do I paginate results?**  
A: Use the `page` and `limit` query parameters. Response includes pagination metadata.

---

**Need more help?** Check the full [API Documentation](./API_DOCUMENTATION.md)
