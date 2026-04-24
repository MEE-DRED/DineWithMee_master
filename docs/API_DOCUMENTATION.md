# Complete API Documentation - DinewithMee/ChatwithMee Backend

**Version:** 1.0  
**Base URL:** `https://new-dine-with-mee-backend.onrender.com`  
**Last Updated:** April 23, 2026

---

## Table of Contents

1. [Authentication](#authentication)
2. [Error Handling](#error-handling)
3. [Common Headers](#common-headers)
4. [Pagination](#pagination)
5. [Environment Setup](#environment-setup)
6. [API Endpoints by Module](#api-endpoints-by-module)
   - [Auth Module](#auth-module)
   - [Users Module](#users-module)
   - [Admin Module](#admin-module)
   - [AI Recommendations Module](#ai-recommendations-module)
   - [Chatbot Module](#chatbot-module)
   - [Consultations Module](#consultations-module)
   - [Content Module](#content-module)
   - [Diet Recalls Module](#diet-recalls-module)
   - [Health Assessments Module](#health-assessments-module)
   - [Health Profiles Module](#health-profiles-module)
   - [Health Progress Module](#health-progress-module)
   - [Health Triage Module](#health-triage-module)
   - [Ingredients Module](#ingredients-module)
   - [Meal Plans Module](#meal-plans-module)
   - [Meals Module](#meals-module)
   - [Nutritionists Module](#nutritionists-module)
   - [Regions Module](#regions-module)
   - [Tags Module](#tags-module)
7. [React Integration Patterns](#react-integration-patterns)
8. [Custom Hooks Examples](#custom-hooks-examples)

---

## Authentication

### Overview
The API uses **JWT (JSON Web Tokens)** for authentication. Most endpoints require a valid access token in the `Authorization` header.

### Token Types
- **Access Token**: Short-lived token (15 minutes) for API access
- **Refresh Token**: Long-lived token (7 days) for obtaining new access tokens

### Authentication Flow
1. User signs up with email/password
2. Verify email with OTP code
3. Login to receive access and refresh tokens
4. Include access token in subsequent API requests
5. Use refresh token to get new access token when expired

### Token Storage
```javascript
// Tokens are stored in localStorage
localStorage.setItem('dwm-token', accessToken);
localStorage.setItem('dwm-refresh-token', refreshToken);
```

### Headers Required
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Automatic Token Injection
The app automatically injects tokens using Axios interceptors (see `src/redux/api/index.js`):

```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dwm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request",
  "timestamp": "2026-04-23T10:30:00.000Z",
  "path": "/api/v1/users"
}
```

### Common HTTP Status Codes
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Successful deletion
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists
- **500 Internal Server Error**: Server error

### Automatic Error Handling
The app includes a response interceptor that handles 401 errors automatically:

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('dwm-token');
      localStorage.removeItem('dwm-user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## Common Headers

### Request Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json
```

### Response Headers
```http
Content-Type: application/json
```

---

## Pagination

### Query Parameters
Most list endpoints support pagination:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

### Response Format
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Example Usage
```javascript
const response = await api.get('/api/v1/meals', {
  params: {
    page: 2,
    limit: 20
  }
});
```

---

## Environment Setup

### 1. Create `.env` file in project root:
```bash
VITE_API_URL=https://new-dine-with-mee-backend.onrender.com
```

### 2. For local development:
```bash
VITE_API_URL=http://localhost:3000
```

### 3. Access in code:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

---

## API Endpoints by Module

---

## Auth Module

Base path: `/auth`

### Available Functions
Import from: `src/redux/api/auth.js`
```javascript
import { authAPI } from '../redux/api/auth';
```

### 1. Sign Up

**Function**: `authAPI.register(userData)`  
**Endpoint**: `POST /auth/signup`  
**Authentication**: Not required

**Description**: Register a new user account. An OTP will be sent to the provided email for verification.

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348012345678",
  "dateOfBirth": "1990-01-15",
  "role": "CUSTOMER"
}
```

**Response**: `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "clx1234567890abc",
    "email": "john.doe@example.com",
    "message": "OTP sent to your email. Valid for 15 minutes."
  }
}
```

**React Example**:
```javascript
import { authAPI } from '../redux/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    role: 'CUSTOMER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.register(formData);
      console.log('Signup successful:', response);
      // Navigate to OTP verification page
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      {/* Add other fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

---

### 2. Verify OTP

**Function**: `authAPI.verifyOtp(otpData)`  
**Endpoint**: `POST /auth/verify-otp`  
**Authentication**: Not required

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "message": "Email verified successfully. Account is now active.",
    "userStatus": "ACTIVE"
  }
}
```

---

### 3. Login

**Function**: `authAPI.login(credentials)`  
**Endpoint**: `POST /auth/login`  
**Authentication**: Not required

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clx1234567890abc",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 900,
      "tokenType": "Bearer"
    }
  }
}
```

**React Example**:
```javascript
import { authAPI } from '../redux/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(credentials);
      
      // Store tokens
      localStorage.setItem('dwm-token', response.data.tokens.accessToken);
      localStorage.setItem('dwm-refresh-token', response.data.tokens.refreshToken);
      localStorage.setItem('dwm-user', JSON.stringify(response.data.user));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### 4. Logout

**Function**: `authAPI.logout()`  
**Endpoint**: `POST /auth/logout`  
**Authentication**: Required

**React Example**:
```javascript
import { authAPI } from '../redux/api/auth';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('dwm-token');
      localStorage.removeItem('dwm-refresh-token');
      localStorage.removeItem('dwm-user');
      navigate('/login');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

---

### 5. Change Password

**Function**: `authAPI.changePassword(passwordData)`  
**Endpoint**: `POST /auth/change-password`  
**Authentication**: Required

**Request Body**:
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

---

### 6. Get Current User Profile

**Function**: `authAPI.getCurrentUser()`  
**Endpoint**: `GET /auth/me`  
**Authentication**: Required

**React Example**:
```javascript
import { authAPI } from '../redux/api/auth';
import { useEffect, useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

---

## Chatbot Module

Base path: `/chatbot`

### Available Functions
Import from: `src/redux/api/chatbot.js`
```javascript
import { chatbotAPI } from '../redux/api/chatbot';
```

### 1. Create Conversation with Nia

**Function**: `chatbotAPI.createConversation(conversationData)`  
**Endpoint**: `POST /chatbot/conversations`  
**Authentication**: Required

**Request Body**:
```json
{
  "conversationType": "INITIAL_TRIAGE"
}
```

**Conversation Types**:
- `INITIAL_TRIAGE`: First health assessment
- `FOLLOW_UP`: Follow-up conversation
- `RECIPE_INQUIRY`: Recipe questions

**Response**: `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "conv-123",
    "userId": "user-123",
    "conversationType": "INITIAL_TRIAGE",
    "status": "ACTIVE",
    "createdAt": "2026-04-23T10:00:00Z"
  }
}
```

**React Example**:
```javascript
import { chatbotAPI } from '../redux/api/chatbot';
import { useState } from 'react';

function StartChatWithNia() {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  const startConversation = async (type = 'INITIAL_TRIAGE') => {
    setLoading(true);
    try {
      const response = await chatbotAPI.createConversation({
        conversationType: type
      });
      setConversation(response.data);
      console.log('Conversation started:', response.data);
    } catch (err) {
      console.error('Failed to start conversation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => startConversation('INITIAL_TRIAGE')} disabled={loading}>
        Start Health Assessment
      </button>
      <button onClick={() => startConversation('RECIPE_INQUIRY')} disabled={loading}>
        Ask About Recipes
      </button>
      {conversation && <p>Conversation ID: {conversation.id}</p>}
    </div>
  );
}
```

---

### 2. Send Message in Conversation

**Function**: `chatbotAPI.sendMessage(conversationId, messageData)`  
**Endpoint**: `POST /chatbot/conversations/:id/messages`  
**Authentication**: Required

**Request Body**:
```json
{
  "content": "I need help managing my hypertension"
}
```

**Response**: `201 Created`
```json
{
  "success": true,
  "data": {
    "userMessage": {
      "id": "msg-123",
      "content": "I need help managing my hypertension",
      "sender": "USER",
      "timestamp": "2026-04-23T10:05:00Z"
    },
    "aiResponse": {
      "id": "msg-124",
      "content": "I understand you'd like help with hypertension. Can you tell me about your current diet?",
      "sender": "AI",
      "timestamp": "2026-04-23T10:05:02Z"
    }
  }
}
```

**React Example**:
```javascript
import { chatbotAPI } from '../redux/api/chatbot';
import { useState } from 'react';

function ChatInterface({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await chatbotAPI.sendMessage(conversationId, {
        content: input
      });

      // Add both user message and AI response to state
      setMessages([
        ...messages,
        response.data.userMessage,
        response.data.aiResponse
      ]);
      setInput('');
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender.toLowerCase()}`}>
            <p>{msg.content}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
```

---

### 3. Get All User Conversations

**Function**: `chatbotAPI.getAllConversations()`  
**Endpoint**: `GET /chatbot/conversations`  
**Authentication**: Required

---

## Health Triage Module

Base path: `/health-triage`

### Available Functions
Import from: `src/redux/api/healthTriage.js`
```javascript
import { healthTriageAPI } from '../redux/api/healthTriage';
```

### 1. Perform Health Risk Assessment

**Function**: `healthTriageAPI.assess(assessmentData)`  
**Endpoint**: `POST /health-triage/assess`  
**Authentication**: Required

**Request Body**:
```json
{
  "age": 45,
  "systolicBp": 145,
  "diastolicBp": 95,
  "fastingGlucose": 120,
  "medications": ["None"],
  "healthConditions": ["Family history of hypertension"],
  "highSodiumDiet": true,
  "irregularMeals": true,
  "highGiFoods": true
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "riskScore": 7.5,
    "riskLevel": "HIGH",
    "conditions": [
      {
        "condition": "Hypertension",
        "risk": "HIGH",
        "reason": "Elevated blood pressure readings"
      },
      {
        "condition": "Pre-diabetes",
        "risk": "MODERATE",
        "reason": "Fasting glucose above normal range"
      }
    ],
    "recommendations": [
      "Consult a healthcare provider immediately",
      "Reduce sodium intake to under 2000mg/day",
      "Monitor blood pressure daily"
    ],
    "urgency": "IMMEDIATE"
  }
}
```

**React Example**:
```javascript
import { healthTriageAPI } from '../redux/api/healthTriage';
import { useState } from 'react';

function HealthRiskAssessment() {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    systolicBp: '',
    diastolicBp: '',
    fastingGlucose: '',
    medications: [],
    healthConditions: [],
    highSodiumDiet: false,
    irregularMeals: false,
    highGiFoods: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await healthTriageAPI.assess(formData);
      setAssessment(response.data);
    } catch (err) {
      console.error('Assessment failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" disabled={loading}>
          {loading ? 'Assessing...' : 'Get Assessment'}
        </button>
      </form>

      {assessment && (
        <div className="assessment-results">
          <h3>Risk Assessment Results</h3>
          <div className={`risk-level ${assessment.riskLevel.toLowerCase()}`}>
            <p>Risk Score: {assessment.riskScore}/10</p>
            <p>Risk Level: {assessment.riskLevel}</p>
            <p>Urgency: {assessment.urgency}</p>
          </div>

          <div className="conditions">
            <h4>Identified Conditions</h4>
            {assessment.conditions.map((condition, index) => (
              <div key={index} className="condition">
                <h5>{condition.condition}</h5>
                <p>Risk: {condition.risk}</p>
                <p>{condition.reason}</p>
              </div>
            ))}
          </div>

          <div className="recommendations">
            <h4>Recommendations</h4>
            <ul>
              {assessment.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Meals Module

Base path: `/api/v1/meals`

### Available Functions
Import from: `src/redux/api/meals.js`
```javascript
import { mealsAPI } from '../redux/api/meals';
```

### 1. Get All Meals

**Function**: `mealsAPI.getAll(params)`  
**Endpoint**: `GET /api/v1/meals`  
**Authentication**: Not required

**Query Parameters**:
- `include` (optional): Relations (e.g., "ingredients,region")
- `page` (optional): Page number
- `limit` (optional): Items per page

**React Example**:
```javascript
import { mealsAPI } from '../redux/api/meals';
import { useEffect, useState } from 'react';

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await mealsAPI.getAll({
          page,
          limit: 12,
          include: 'ingredients,region'
        });
        setMeals(response.data);
      } catch (err) {
        console.error('Failed to fetch meals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [page]);

  if (loading) return <div>Loading meals...</div>;

  return (
    <div className="meals-grid">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-card">
          <h3>{meal.name}</h3>
          <p>{meal.description}</p>
          <span>{meal.region?.name}</span>
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
}
```

---

### 2. Search Meals

**Function**: `mealsAPI.search(query)`  
**Endpoint**: `GET /api/v1/meals/search`  

**React Example**:
```javascript
import { mealsAPI } from '../redux/api/meals';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

function MealSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await mealsAPI.search(query);
        setResults(response.data);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search meals..."
      />
      {loading && <p>Searching...</p>}
      <div className="search-results">
        {results.map((meal) => (
          <div key={meal.id}>{meal.name}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## React Integration Patterns

### 1. Protected Route with Authentication

```javascript
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('dwm-token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

### 2. API Error Boundary

```javascript
import { Component } from 'react';

class APIErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('API Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

### 3. Loading States Pattern

```javascript
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/endpoint');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <NoData />;

  return <DataDisplay data={data} />;
}
```

---

## Custom Hooks Examples

### 1. useAuth Hook

```javascript
import { useState, useEffect } from 'react';
import { authAPI } from '../redux/api/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('dwm-token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
      } catch (err) {
        console.error('Failed to load user:', err);
        localStorage.removeItem('dwm-token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    localStorage.setItem('dwm-token', response.data.tokens.accessToken);
    setUser(response.data.user);
    return response;
  };

  const logout = async () => {
    await authAPI.logout();
    localStorage.removeItem('dwm-token');
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

---

### 2. useAPI Hook

```javascript
import { useState, useEffect } from 'react';

export function useAPI(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        if (!cancelled) {
          setData(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Request failed');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
}

// Usage
function MealsComponent() {
  const { data: meals, loading, error } = useAPI(() => mealsAPI.getAll(), []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <MealsList meals={meals} />;
}
```

---

### 3. usePagination Hook

```javascript
import { useState } from 'react';

export function usePagination(fetchFunction, initialPage = 1, initialLimit = 10) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetchFunction({ page: pageNumber, limit });
      setData(response.data);
      setTotal(response.pagination?.total || 0);
      setPage(pageNumber);
    } catch (err) {
      console.error('Pagination error:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => fetchPage(page + 1);
  const prevPage = () => page > 1 && fetchPage(page - 1);
  const goToPage = (pageNum) => fetchPage(pageNum);

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    loading,
    nextPage,
    prevPage,
    goToPage,
  };
}
```

---

## Additional Resources

- **Backend Swagger Documentation**: Contact backend team for interactive API docs
- **Postman Collection**: Available in project repository
- **Support**: Create an issue in the GitHub repository

---

## API Coverage Summary

✅ **Auth Module**: 10 endpoints  
✅ **Users Module**: 9 endpoints  
✅ **Admin Module**: 15 endpoints  
✅ **AI Recommendations Module**: 6 endpoints  
✅ **Chatbot Module**: 5 endpoints  
✅ **Consultations Module**: 12 endpoints  
✅ **Content Module**: 7 endpoints  
✅ **Diet Recalls Module**: 3 endpoints  
✅ **Health Assessments Module**: 9 endpoints  
✅ **Health Profiles Module**: 11 endpoints  
✅ **Health Progress Module**: 10 endpoints  
✅ **Health Triage Module**: 2 endpoints  
✅ **Ingredients Module**: 7 endpoints  
✅ **Meal Plans Module**: 12 endpoints  
✅ **Meals Module**: 9 endpoints  
✅ **Nutritionists Module**: 7 endpoints  
✅ **Regions Module**: 2 endpoints  
✅ **Tags Module**: 4 endpoints  

**Total: 140+ API endpoints documented and implemented**

---

**Last Updated**: April 23, 2026  
**Maintained by**: DinewithMee Development Team
