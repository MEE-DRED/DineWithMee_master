// Role-based permissions
export const ROLE_PERMISSIONS = {
  CUSTOMER: [
    'view_own_profile',
    'edit_own_profile',
    'view_health_data',
    'edit_health_data',
    'book_consultation',
    'view_meal_plans',
    'order_meals',
    'view_content'
  ],
  NUTRITIONIST: [
    'view_own_profile',
    'edit_own_profile',
    'view_client_profiles',
    'manage_consultations',
    'create_meal_plans',
    'review_assessments',
    'create_content',
    'view_analytics'
  ],
  ADMIN: [
    'view_all_profiles',
    'manage_users',
    'manage_content',
    'view_system_analytics',
    'manage_nutritionists',
    'manage_partners',
    'system_configuration'
  ],
  PHARMACY_PARTNER: [
    'view_own_profile',
    'edit_own_profile',
    'view_patient_data',
    'manage_medications',
    'sync_health_data',
    'coordinate_consultations',
    'manage_inventory',
    'track_compliance'
  ]
};

// Role-based routes
export const ROLE_ROUTES = {
  CUSTOMER: '/customer/dashboard',
  NUTRITIONIST: '/nutritionist/dashboard',
  ADMIN: '/admin/dashboard',
  PHARMACY_PARTNER: '/pharmacy/dashboard'
};

// User roles
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  NUTRITIONIST: 'NUTRITIONIST',
  ADMIN: 'ADMIN',
  PHARMACY_PARTNER: 'PHARMACY_PARTNER'
};

// Account status
export const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION'
};
