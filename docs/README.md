# API Documentation

Welcome to the DinewithMee/ChatwithMee API documentation!

## 📚 Documentation Files

### [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
**Complete API Reference Guide**

This is the master API documentation containing:
- Full authentication flow and setup
- All 18 API modules with detailed endpoint documentation
- Request/response examples for every endpoint
- React integration examples and patterns
- Custom hooks and best practices
- Error handling strategies

**Use this when**: You need detailed information about specific endpoints, want to understand authentication flow, or need React integration examples.

---

### [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
**Quick Lookup Guide**

Quick reference containing:
- Endpoint lookup tables organized by module
- Common use case examples with code
- Troubleshooting guide
- Environment setup instructions
- FAQ section

**Use this when**: You need to quickly find an endpoint, want copy-paste code snippets, or need to troubleshoot common issues.

---

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your project root:

```bash
VITE_API_URL=https://new-dine-with-mee-backend.onrender.com
```

### 2. Import API Functions

All API functions are available in `src/redux/api/`:

```javascript
// Authentication
import { authAPI } from '../redux/api/auth';

// Meals
import { mealsAPI } from '../redux/api/meals';

// Health
import { healthAPI } from '../redux/api/health';

// Chatbot (Nia)
import { chatbotAPI } from '../redux/api/chatbot';

// And more...
```

### 3. Make Your First API Call

```javascript
import { mealsAPI } from '../redux/api/meals';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mealsAPI.getAll({ limit: 10 });
        setMeals(response.data);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {meals.map(meal => (
        <div key={meal.id}>{meal.name}</div>
      ))}
    </div>
  );
}
```

---

## 📦 Available API Modules

### Core Modules
- **Auth** (`authAPI`) - User authentication and profile management
- **Users** (`usersAPI`) - User management
- **Admin** (`adminAPI`) - Administrative functions

### Health & Wellness
- **Health Profiles** (`healthAPI`) - User health profiles
- **Health Progress** (`healthProgressAPI`) - Health metrics tracking
- **Health Triage** (`healthTriageAPI`) - AI health risk assessment
- **Health Assessments** (`healthAPI.getMyAssessments()`) - Health assessments
- **Diet Recalls** (`dietRecallsAPI`) - 24-hour dietary recalls

### Nutrition & Meals
- **Meals** (`mealsAPI`) - Meal browsing and search
- **Meal Plans** (`mealPlansAPI`) - Personalized meal planning
- **Ingredients** (`ingredientsAPI`) - Ingredient database
- **Nutritionists** (`nutritionistsAPI`) - Nutritionist profiles and services

### AI & Chat
- **Chatbot** (`chatbotAPI`) - Nia AI health assistant
- **AI Recommendations** (`aiRecommendationsAPI`) - AI-powered suggestions

### Content & Community
- **Content** (`contentAPI`) - Educational articles
- **Consultations** (`consultationsAPI`) - Consultation booking and management
- **Regions** (`regionsAPI`) - Geographic regions
- **Tags** (`tagsAPI`) - Content tags and categories

---

## 🔐 Authentication

### Basic Authentication Flow

```javascript
import { authAPI } from '../redux/api/auth';

// 1. Register
const signupResponse = await authAPI.register({
  email: 'user@example.com',
  password: 'SecurePass123!',
  firstName: 'John',
  lastName: 'Doe'
});

// 2. Verify OTP
const verifyResponse = await authAPI.verifyOtp({
  email: 'user@example.com',
  otp: '123456'
});

// 3. Login
const loginResponse = await authAPI.login({
  email: 'user@example.com',
  password: 'SecurePass123!'
});

// 4. Store token
localStorage.setItem('dwm-token', loginResponse.data.tokens.accessToken);
```

### Protected Requests

All authenticated requests automatically include the token via axios interceptors (configured in `src/redux/api/index.js`).

---

## 🎯 Common Use Cases

### 1. Get Personalized Meal Recommendations

```javascript
import { mealsAPI } from '../redux/api/meals';

const meals = await mealsAPI.getBySuitability('hypertension-friendly');
```

### 2. Chat with Nia (AI Health Assistant)

```javascript
import { chatbotAPI } from '../redux/api/chatbot';

// Start conversation
const conversation = await chatbotAPI.createConversation({
  conversationType: 'INITIAL_TRIAGE'
});

// Send message
const response = await chatbotAPI.sendMessage(conversation.data.id, {
  content: 'I need help managing my blood pressure'
});
```

### 3. Track Health Progress

```javascript
import { healthProgressAPI } from '../redux/api/healthProgress';

// Log today's metrics
await healthProgressAPI.create({
  date: '2026-04-23',
  weight: 75,
  bloodPressureSystolic: 130,
  bloodPressureDiastolic: 85
});

// Get trends
const trends = await healthProgressAPI.getMyTrends({ days: 30 });
```

### 4. Book a Nutritionist Consultation

```javascript
import { nutritionistsAPI, consultationsAPI } from '../redux/api';

// Find nutritionists
const nutritionists = await nutritionistsAPI.getAll({
  specialization: 'hypertension'
});

// Check availability
const availability = await nutritionistsAPI.getAvailability(
  nutritionists.data[0].id,
  { date: '2026-04-25' }
);

// Book consultation
const consultation = await consultationsAPI.create({
  nutritionistId: nutritionists.data[0].id,
  scheduledAt: '2026-04-25T14:00:00Z'
});
```

---

## 🛠️ Development Tips

### Error Handling Pattern

```javascript
const [error, setError] = useState(null);

try {
  const response = await mealsAPI.getAll();
  setData(response.data);
} catch (err) {
  setError(err.response?.data?.message || 'Request failed');
  console.error('API Error:', err);
}
```

### Loading States

```javascript
const [loading, setLoading] = useState(false);

setLoading(true);
try {
  await someAPI.method();
} finally {
  setLoading(false);
}
```

### Pagination

```javascript
const [page, setPage] = useState(1);

const response = await mealsAPI.getAll({
  page,
  limit: 20
});

// Access pagination metadata
const { total, totalPages } = response.pagination;
```

---

## 📖 Further Reading

- **Full API Reference**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Quick Reference**: [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
- **Implementation Guide**: [../API_IMPLEMENTATION.md](../API_IMPLEMENTATION.md)

---

## 🆘 Support

### Common Issues

**401 Unauthorized**: Token expired or missing
- Solution: Check if token exists in localStorage, try logging in again

**Network Timeout**: Request takes too long
- Solution: Check your internet connection, verify API is accessible

**CORS Errors**: Cross-origin request blocked
- Solution: Contact backend team to whitelist your domain

### Getting Help

1. Check the [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md) FAQ section
2. Review the [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed examples
3. Check browser console for detailed error messages
4. Contact the development team

---

## 📊 API Statistics

- **Total Modules**: 18
- **Total Endpoints**: 118+
- **Authentication**: JWT-based
- **Documentation Coverage**: 100%
- **React Examples**: Comprehensive

---

**Last Updated**: April 23, 2026  
**Version**: 1.0  
**Maintained by**: DinewithMee Development Team
