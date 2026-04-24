import axios from 'axios';

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Warn if API URL is not configured
if (!import.meta.env.VITE_API_URL) {
  console.warn('⚠️ VITE_API_URL is not defined in .env file. Using fallback:', API_BASE_URL);
}

console.log('🌐 API Base URL:', API_BASE_URL);

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dwm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
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


// Helper to get Unsplash image URLs (no API key needed for URLs)
export const getUnsplashImageUrl = (query, width = 400, height = 300) => {
  return `https://images.unsplash.com/photo-${query}?w=${width}&h=${height}&fit=crop`;
};

// Helper to get random Unsplash image by search term
export const getRandomFoodImage = (searchTerm = 'food') => {
  return `https://source.unsplash.com/featured/${400}x${300}/?${searchTerm}`;
};

export default api;
