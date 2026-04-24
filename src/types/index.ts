// User types
export type UserRole = 'CUSTOMER' | 'NUTRITIONIST' | 'ADMIN' | 'PHARMACY';

export type AccountStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'INACTIVE';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  account_status: AccountStatus;
  phone_number?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Health types
export interface HealthCondition {
  id: string;
  name: string;
  description?: string;
}

export interface HealthProfile {
  id: string;
  user_id: string;
  age?: number;
  height?: number;
  weight?: number;
  bmi?: number;
  systolic_bp?: number;
  diastolic_bp?: number;
  fasting_glucose?: number;
  health_conditions: string[];
  medications: string[];
  dietary_preferences: string[];
  allergies: string[];
  created_at: string;
  updated_at: string;
}

// Meal types
export type DietaryNomenclature = 'DASH' | 'Low GI' | 'Balanced' | 'High Protein' | 'High Carb' | 'High Fat';

export type Country = 'Nigeria' | 'Rwanda';

export interface Meal {
  id: string;
  name: string;
  description?: string;
  country: Country;
  dietary_nomenclature: DietaryNomenclature;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  fiber?: number;
  sodium?: number;
  key_ingredients: string[];
  health_tags: string[];
  suitable_for: string[];
  warnings: string[];
  price: number;
  currency: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Cart types
export interface CartItem {
  meal_id: string;
  meal: Meal;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}

// API Response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

// Form types
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role: UserRole;
}

// Component prop types
export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
