import { ROLE_ROUTES, ROLE_PERMISSIONS } from './authConstants';

// Route definitions for each role
export const ROLE_BASED_ROUTES = {
  CUSTOMER: [
    {
      path: '/customer/dashboard',
      component: 'CustomerDashboard',
      name: 'Dashboard',
      icon: 'Home',
      permissions: ['view_own_profile']
    },
    {
      path: '/customer/health-profile',
      component: 'HealthProfile',
      name: 'Health Profile',
      icon: 'Heart',
      permissions: ['view_health_data']
    },
    {
      path: '/customer/progress',
      component: 'ProgressTracker',
      name: 'Progress',
      icon: 'TrendingUp',
      permissions: ['view_health_data']
    },
    {
      path: '/customer/assessment',
      component: 'AssessmentForm',
      name: 'Health Assessment',
      icon: 'ClipboardList',
      permissions: ['view_health_data']
    },
    {
      path: '/customer/consultations',
      component: 'ConsultationScheduler',
      name: 'Consultations',
      icon: 'Calendar',
      permissions: ['book_consultation']
    },
    {
      path: '/customer/meal-plans',
      component: 'MealPlans',
      name: 'Meal Plans',
      icon: 'Utensils',
      permissions: ['view_meal_plans']
    },
    {
      path: '/customer/orders',
      component: 'Orders',
      name: 'Orders',
      icon: 'ShoppingCart',
      permissions: ['order_meals']
    },
    {
      path: '/customer/content',
      component: 'ContentLibrary',
      name: 'Learn',
      icon: 'BookOpen',
      permissions: ['view_content']
    }
  ],
  NUTRITIONIST: [
    {
      path: '/nutritionist/dashboard',
      component: 'NutritionistDashboard',
      name: 'Dashboard',
      icon: 'Home',
      permissions: ['view_analytics']
    },
    {
      path: '/nutritionist/clients',
      component: 'ClientManagement',
      name: 'Clients',
      icon: 'Users',
      permissions: ['view_client_profiles']
    },
    {
      path: '/nutritionist/schedule',
      component: 'ConsultationScheduler',
      name: 'Schedule',
      icon: 'Calendar',
      permissions: ['manage_consultations']
    },
    {
      path: '/nutritionist/meal-plans',
      component: 'MealPlanBuilder',
      name: 'Meal Plans',
      icon: 'Utensils',
      permissions: ['create_meal_plans']
    },
    {
      path: '/nutritionist/assessments',
      component: 'AssessmentReview',
      name: 'Assessments',
      icon: 'ClipboardList',
      permissions: ['review_assessments']
    },
    {
      path: '/nutritionist/content',
      component: 'ContentCreator',
      name: 'Content',
      icon: 'FileText',
      permissions: ['create_content']
    },
    {
      path: '/nutritionist/profile',
      component: 'NutritionistProfile',
      name: 'Profile',
      icon: 'User',
      permissions: ['view_own_profile']
    }
  ],
  ADMIN: [
    {
      path: '/admin/dashboard',
      component: 'AdminDashboard',
      name: 'Dashboard',
      icon: 'Home',
      permissions: ['view_system_analytics']
    },
    {
      path: '/admin/users',
      component: 'UserManagement',
      name: 'Users',
      icon: 'Users',
      permissions: ['manage_users']
    },
    {
      path: '/admin/content',
      component: 'ContentManagement',
      name: 'Content',
      icon: 'FileText',
      permissions: ['manage_content']
    },
    {
      path: '/admin/nutritionists',
      component: 'NutritionistManagement',
      name: 'Nutritionists',
      icon: 'UserCheck',
      permissions: ['manage_nutritionists']
    },
    {
      path: '/admin/partners',
      component: 'PartnerManagement',
      name: 'Partners',
      icon: 'Handshake',
      permissions: ['manage_partners']
    },
    {
      path: '/admin/analytics',
      component: 'SystemAnalytics',
      name: 'Analytics',
      icon: 'BarChart',
      permissions: ['view_system_analytics']
    },
    {
      path: '/admin/settings',
      component: 'SystemSettings',
      name: 'Settings',
      icon: 'Settings',
      permissions: ['system_configuration']
    }
  ],
  PHARMACY_PARTNER: [
    {
      path: '/pharmacy/dashboard',
      component: 'PharmacyDashboard',
      name: 'Dashboard',
      icon: 'Home',
      permissions: ['view_patient_data']
    },
    {
      path: '/pharmacy/patients',
      component: 'PatientManagement',
      name: 'Patients',
      icon: 'Users',
      permissions: ['view_patient_data']
    },
    {
      path: '/pharmacy/medications',
      component: 'MedicationManagement',
      name: 'Medications',
      icon: 'Package',
      permissions: ['manage_medications']
    },
    {
      path: '/pharmacy/prescriptions',
      component: 'PrescriptionManagement',
      name: 'Prescriptions',
      icon: 'FileText',
      permissions: ['manage_medications']
    },
    {
      path: '/pharmacy/inventory',
      component: 'InventoryManagement',
      name: 'Inventory',
      icon: 'Package',
      permissions: ['manage_inventory']
    },
    {
      path: '/pharmacy/compliance',
      component: 'ComplianceTracking',
      name: 'Compliance',
      icon: 'CheckCircle',
      permissions: ['track_compliance']
    },
    {
      path: '/pharmacy/sync',
      component: 'HealthDataSync',
      name: 'Data Sync',
      icon: 'Sync',
      permissions: ['sync_health_data']
    }
  ]
};

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  { path: '/', component: 'LandingPage' },
  { path: '/login', component: 'LoginPage' },
  { path: '/signup', component: 'SignupPage' },
  { path: '/about', component: 'AboutPage' },
  { path: '/contact', component: 'ContactPage' }
];

// Role-based navigation structure
export const getNavigationForRole = (role) => {
  const routes = ROLE_BASED_ROUTES[role] || [];
  return routes.map(route => ({
    ...route,
    exact: true,
    key: route.path
  }));
};

// Check if user has permission to access a route
export const canAccessRoute = (userRole, routePath) => {
  const routes = ROLE_BASED_ROUTES[userRole] || [];
  const route = routes.find(r => r.path === routePath);
  
  if (!route) return false;
  
  // For now, we'll assume if the route exists in the role's routes, they can access it
  // In a real app, you'd check specific permissions
  return true;
};

// Get default route for a role
export const getDefaultRouteForRole = (role) => {
  return ROLE_ROUTES[role] || '/customer/dashboard';
};

// Get redirect path based on user role
export const getRoleBasedRedirect = (user) => {
  if (!user || !user.role) {
    return '/login';
  }
  
  return getDefaultRouteForRole(user.role);
};

// Route guard component logic
export const createRouteGuard = (userRole, requiredRole = null, requiredPermissions = []) => {
  // If no specific role required, just check if user is authenticated
  if (!requiredRole && requiredPermissions.length === 0) {
    return !!userRole;
  }
  
  // Check if user has the required role
  if (requiredRole && userRole !== requiredRole) {
    return false;
  }
  
  // Check if user has the required permissions
  if (requiredPermissions.length > 0) {
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }
  
  return true;
};

// Middleware for protecting routes
export const protectRoute = (route, userRole) => {
  const { permissions = [], roles = [] } = route;
  
  // If no permissions or roles specified, route is public
  if (permissions.length === 0 && roles.length === 0) {
    return true;
  }
  
  // Check if user has required role
  if (roles.length > 0 && !roles.includes(userRole)) {
    return false;
  }
  
  // Check if user has required permissions
  if (permissions.length > 0) {
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.every(permission => userPermissions.includes(permission));
  }
  
  return true;
};

// Generate breadcrumb navigation
export const generateBreadcrumbs = (currentPath, userRole) => {
  const routes = ROLE_BASED_ROUTES[userRole] || [];
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  const breadcrumbs = [];
  let currentPathBuilder = '';
  
  pathSegments.forEach((segment, index) => {
    currentPathBuilder += `/${segment}`;
    const route = routes.find(r => r.path === currentPathBuilder);
    
    if (route) {
      breadcrumbs.push({
        name: route.name,
        path: route.path,
        isLast: index === pathSegments.length - 1
      });
    }
  });
  
  return breadcrumbs;
};

// Get sidebar navigation items for a role
export const getSidebarNavigation = (userRole) => {
  const routes = ROLE_BASED_ROUTES[userRole] || [];
  
  return routes.map(route => ({
    id: route.path,
    title: route.name,
    path: route.path,
    icon: route.icon,
    badge: null, // Could be used for notifications
    children: [] // For nested navigation items
  }));
};

// Role-based page titles
export const getPageTitle = (path, userRole) => {
  const routes = ROLE_BASED_ROUTES[userRole] || [];
  const route = routes.find(r => r.path === path);
  return route ? route.name : 'DineWithMee';
};

// Check if route requires authentication
export const requiresAuth = (path) => {
  return !PUBLIC_ROUTES.some(route => route.path === path);
};

// Get all routes for a role (including nested routes)
export const getAllRoutesForRole = (userRole) => {
  const roleRoutes = ROLE_BASED_ROUTES[userRole] || [];
  return [...PUBLIC_ROUTES, ...roleRoutes];
};
