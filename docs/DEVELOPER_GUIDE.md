# Developer Guide - Using the DinewithMee API

A practical guide for developers working with the DinewithMee/ChatwithMee API.

---

## 🎯 Getting Started

### Prerequisites
- Node.js 16+
- React 18+
- Understanding of Promises/async-await
- Basic knowledge of JWT authentication

### Setup Steps

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
Create `.env` file:
```bash
VITE_API_URL=https://new-dine-with-mee-backend.onrender.com
```

3. **Import API services**
```javascript
import { authAPI } from './redux/api/auth';
import { mealsAPI } from './redux/api/meals';
// ... other imports
```

---

## 🔐 Authentication

### Initial Authentication Flow

```javascript
import { authAPI } from '../redux/api/auth';
import { useState } from 'react';

function AuthExample() {
  const [user, setUser] = useState(null);

  // Step 1: Register
  const handleRegister = async (formData) => {
    try {
      const response = await authAPI.register(formData);
      console.log('Registration successful:', response);
      // User will receive OTP via email
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (email, otp) => {
    try {
      const response = await authAPI.verifyOtp({ email, otp });
      console.log('Verification successful:', response);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  // Step 3: Login
  const handleLogin = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      // Store tokens
      localStorage.setItem('dwm-token', response.data.tokens.accessToken);
      localStorage.setItem('dwm-refresh-token', response.data.tokens.refreshToken);
      localStorage.setItem('dwm-user', JSON.stringify(response.data.user));
      
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } finally {
      localStorage.clear();
      setUser(null);
    }
  };

  return (
    // Your UI here
  );
}
```

---

## 🏥 Health Features

### 1. Health Profile Management

```javascript
import { healthAPI } from '../redux/api/health';

// Get user's health profile
const getHealthProfile = async () => {
  try {
    const response = await healthAPI.getProfile();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health profile:', error);
  }
};

// Create health profile
const createHealthProfile = async () => {
  try {
    const profileData = {
      healthConditions: ['Hypertension', 'Diabetes'],
      allergies: ['Peanuts'],
      dietaryRestrictions: ['Vegetarian'],
      weight: 75,
      height: 170,
      medications: ['Lisinopril 10mg']
    };
    
    const response = await healthAPI.create(profileData);
    console.log('Profile created:', response);
  } catch (error) {
    console.error('Failed to create profile:', error);
  }
};

// Update health profile
const updateHealthProfile = async (id, updates) => {
  try {
    const response = await healthAPI.update(id, updates);
    console.log('Profile updated:', response);
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};
```

### 2. Health Progress Tracking

```javascript
import { healthProgressAPI } from '../redux/api/healthProgress';

// Log daily progress
const logProgress = async () => {
  try {
    const progressData = {
      date: new Date().toISOString().split('T')[0],
      weight: 74.5,
      bloodPressureSystolic: 130,
      bloodPressureDiastolic: 85,
      bloodSugar: 105,
      notes: 'Feeling great today!'
    };
    
    const response = await healthProgressAPI.create(progressData);
    console.log('Progress logged:', response);
  } catch (error) {
    console.error('Failed to log progress:', error);
  }
};

// Get progress trends
const getProgressTrends = async () => {
  try {
    const response = await healthProgressAPI.getMyTrends({ days: 30 });
    console.log('Trends:', response.data);
    
    // Access trend data
    const { weightTrend, bloodPressureTrend } = response.data;
    console.log('Weight change:', weightTrend.change);
  } catch (error) {
    console.error('Failed to get trends:', error);
  }
};

// Get weekly summary
const getWeeklySummary = async () => {
  try {
    const response = await healthProgressAPI.getWeeklySummary();
    console.log('Weekly summary:', response.data);
  } catch (error) {
    console.error('Failed to get weekly summary:', error);
  }
};
```

### 3. Health Risk Assessment (Triage)

```javascript
import { healthTriageAPI } from '../redux/api/healthTriage';

const performHealthAssessment = async () => {
  try {
    const assessmentData = {
      age: 45,
      systolicBp: 145,
      diastolicBp: 95,
      fastingGlucose: 120,
      medications: ['None'],
      healthConditions: ['Family history of hypertension'],
      highSodiumDiet: true,
      irregularMeals: true,
      highGiFoods: true
    };
    
    const response = await healthTriageAPI.assess(assessmentData);
    
    // Access assessment results
    const { riskScore, riskLevel, conditions, recommendations, urgency } = response.data;
    
    console.log('Risk Level:', riskLevel);
    console.log('Risk Score:', riskScore);
    console.log('Conditions:', conditions);
    console.log('Recommendations:', recommendations);
    
    // Handle urgency
    if (urgency === 'IMMEDIATE') {
      alert('Please consult a healthcare provider immediately!');
    }
  } catch (error) {
    console.error('Assessment failed:', error);
  }
};
```

---

## 🤖 AI Chat (Nia)

### Chatbot Integration

```javascript
import { chatbotAPI } from '../redux/api/chatbot';
import { useState, useEffect } from 'react';

function ChatWithNia() {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Start conversation
  const startChat = async () => {
    try {
      const response = await chatbotAPI.createConversation({
        conversationType: 'INITIAL_TRIAGE'
      });
      
      setConversationId(response.data.id);
      console.log('Conversation started:', response.data);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;

    setLoading(true);
    try {
      const response = await chatbotAPI.sendMessage(conversationId, {
        content: input
      });

      // Add both user message and AI response
      setMessages(prev => [
        ...prev,
        response.data.userMessage,
        response.data.aiResponse
      ]);
      
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load conversation history
  const loadHistory = async () => {
    if (!conversationId) return;

    try {
      const response = await chatbotAPI.getConversationHistory(conversationId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  // Complete conversation
  const endChat = async () => {
    try {
      await chatbotAPI.completeConversation(conversationId);
      console.log('Conversation completed');
    } catch (error) {
      console.error('Failed to complete conversation:', error);
    }
  };

  useEffect(() => {
    startChat();
  }, []);

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
          disabled={loading}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      
      <button onClick={endChat}>End Conversation</button>
    </div>
  );
}
```

---

## 🍽️ Meals & Nutrition

### 1. Browsing and Searching Meals

```javascript
import { mealsAPI } from '../redux/api/meals';
import { useState, useEffect } from 'react';

function MealsBrowser() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch all meals
  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await mealsAPI.getAll({
        page,
        limit: 12,
        include: 'ingredients,region'
      });
      
      setMeals(response.data);
      console.log('Pagination:', response.pagination);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search meals
  const searchMeals = async (query) => {
    try {
      const response = await mealsAPI.search(query);
      setMeals(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  // Get meals by suitability
  const getMealsBySuitability = async (condition) => {
    try {
      const response = await mealsAPI.getBySuitability(condition);
      setMeals(response.data);
    } catch (error) {
      console.error('Failed to fetch suitable meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [page]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => searchMeals(e.target.value)}
        placeholder="Search meals..."
      />
      
      <div>
        <button onClick={() => getMealsBySuitability('hypertension-friendly')}>
          Hypertension-Friendly
        </button>
        <button onClick={() => getMealsBySuitability('diabetes-friendly')}>
          Diabetes-Friendly
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="meals-grid">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. Meal Planning

```javascript
import { mealPlansAPI } from '../redux/api/mealPlans';

// Get my meal plans
const getMyMealPlans = async () => {
  try {
    const response = await mealPlansAPI.getMyPlans({
      include: 'meals,nutritionist'
    });
    
    console.log('My meal plans:', response.data);
  } catch (error) {
    console.error('Failed to fetch meal plans:', error);
  }
};

// Generate weekly meal plan
const generateWeeklyPlan = async () => {
  try {
    const preferences = {
      preferences: {
        cuisineType: 'Nigerian',
        excludeIngredients: ['pork'],
        targetCalories: 2000,
        dietaryRestrictions: ['halal']
      }
    };
    
    const response = await mealPlansAPI.generateWeeklyPlan(preferences);
    console.log('Generated plan:', response.data);
  } catch (error) {
    console.error('Failed to generate plan:', error);
  }
};

// Get meal plan items
const getPlanItems = async (planId) => {
  try {
    const response = await mealPlansAPI.getPlanItems(planId);
    
    // Group by day
    const itemsByDay = response.data.reduce((acc, item) => {
      if (!acc[item.dayNumber]) acc[item.dayNumber] = [];
      acc[item.dayNumber].push(item);
      return acc;
    }, {});
    
    console.log('Plan items by day:', itemsByDay);
  } catch (error) {
    console.error('Failed to fetch plan items:', error);
  }
};

// Get nutritional summary
const getNutritionalSummary = async (planId) => {
  try {
    const response = await mealPlansAPI.getNutritionalSummary(planId);
    
    const { dailyAverage, weeklyTotals } = response.data;
    console.log('Daily average calories:', dailyAverage.calories);
    console.log('Weekly total protein:', weeklyTotals.protein);
  } catch (error) {
    console.error('Failed to fetch summary:', error);
  }
};
```

---

## 👨‍⚕️ Nutritionist Services

### Finding and Booking Nutritionists

```javascript
import { nutritionistsAPI, consultationsAPI } from '../redux/api';

// Find nutritionists
const findNutritionist = async () => {
  try {
    const response = await nutritionistsAPI.getAll({
      specialization: 'hypertension',
      region: 'Lagos',
      isAvailable: true,
      page: 1,
      limit: 10
    });
    
    console.log('Available nutritionists:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to find nutritionists:', error);
  }
};

// Get nutritionist details
const getNutritionistDetails = async (nutritionistId) => {
  try {
    const response = await nutritionistsAPI.getById(nutritionistId, {
      include: 'consultations,reviews'
    });
    
    const nutritionist = response.data;
    console.log('Nutritionist:', nutritionist);
    console.log('Reviews:', nutritionist.reviews);
  } catch (error) {
    console.error('Failed to fetch details:', error);
  }
};

// Check availability
const checkAvailability = async (nutritionistId, date) => {
  try {
    const response = await nutritionistsAPI.getAvailability(nutritionistId, {
      date: date
    });
    
    console.log('Available slots:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to check availability:', error);
  }
};

// Book consultation
const bookConsultation = async (nutritionistId, timeSlot) => {
  try {
    const consultationData = {
      nutritionistId: nutritionistId,
      scheduledAt: timeSlot,
      notes: 'Initial consultation for hypertension management'
    };
    
    const response = await consultationsAPI.create(consultationData);
    console.log('Consultation booked:', response.data);
  } catch (error) {
    console.error('Failed to book consultation:', error);
  }
};

// Complete booking flow
const completeBookingFlow = async () => {
  // 1. Find nutritionists
  const nutritionists = await findNutritionist();
  
  if (nutritionists && nutritionists.length > 0) {
    const nutritionistId = nutritionists[0].id;
    
    // 2. Check availability
    const availableSlots = await checkAvailability(
      nutritionistId,
      '2026-04-25'
    );
    
    if (availableSlots && availableSlots.length > 0) {
      // 3. Book consultation
      await bookConsultation(nutritionistId, availableSlots[0].time);
    }
  }
};
```

---

## 🔄 Best Practices

### 1. Error Handling

```javascript
const safeAPICall = async (apiFunction, errorMessage) => {
  try {
    const response = await apiFunction();
    return { success: true, data: response.data };
  } catch (error) {
    console.error(errorMessage, error);
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    } else if (error.response?.status === 404) {
      // Handle not found
      return { success: false, error: 'Resource not found' };
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Request failed'
    };
  }
};

// Usage
const result = await safeAPICall(
  () => mealsAPI.getById('meal-123'),
  'Failed to fetch meal'
);

if (result.success) {
  console.log('Meal:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### 2. Loading States

```javascript
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await someAPI.getData();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
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

### 3. Pagination Helper

```javascript
const usePagination = (fetchFunction, initialPage = 1) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetchFunction({ page: pageNumber, limit: 20 });
      setData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
      setPage(pageNumber);
    } catch (error) {
      console.error('Pagination error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => page < totalPages && fetchPage(page + 1);
  const prevPage = () => page > 1 && fetchPage(page - 1);

  useEffect(() => {
    fetchPage(page);
  }, []);

  return { data, page, totalPages, loading, nextPage, prevPage };
};

// Usage
function PaginatedList() {
  const { data, page, totalPages, loading, nextPage, prevPage } = usePagination(
    mealsAPI.getAll
  );

  return (
    <div>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
      
      <button onClick={prevPage} disabled={page === 1}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={nextPage} disabled={page === totalPages}>Next</button>
    </div>
  );
}
```

---

## 🐛 Debugging Tips

### 1. Check Token
```javascript
const token = localStorage.getItem('dwm-token');
console.log('Token exists:', !!token);
console.log('Token:', token);
```

### 2. Inspect API Responses
```javascript
try {
  const response = await mealsAPI.getAll();
  console.log('Full response:', response);
  console.log('Data:', response.data);
  console.log('Pagination:', response.pagination);
} catch (error) {
  console.error('Error:', error);
  console.error('Response:', error.response);
  console.error('Status:', error.response?.status);
  console.error('Message:', error.response?.data?.message);
}
```

### 3. Network Tab
- Open browser DevTools (F12)
- Go to Network tab
- Filter by XHR/Fetch
- Check request headers, payload, and response

---

## 📚 Additional Resources

- **Full API Reference**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Quick Reference**: [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
- **Implementation Status**: [../API_IMPLEMENTATION.md](../API_IMPLEMENTATION.md)

---

Happy coding! 🚀
