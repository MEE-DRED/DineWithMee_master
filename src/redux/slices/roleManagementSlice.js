import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for role-based user management
export const fetchUsersByRole = createAsyncThunk(
  'roleManagement/fetchUsersByRole',
  async ({ role, filters = {} }, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = {
        CUSTOMER: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CUSTOMER', status: 'ACTIVE', joinDate: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'CUSTOMER', status: 'ACTIVE', joinDate: '2024-02-01' },
        ],
        NUTRITIONIST: [
          { id: 3, name: 'Dr. Sarah Johnson', email: 'sarah@nutrition.com', role: 'NUTRITIONIST', status: 'VERIFIED', license: 'LN-2024-001' },
          { id: 4, name: 'Dr. Mike Chen', email: 'mike@nutrition.com', role: 'NUTRITIONIST', status: 'PENDING', license: 'LN-2024-002' },
        ],
        ADMIN: [
          { id: 5, name: 'Admin User', email: 'admin@dwm.com', role: 'ADMIN', status: 'ACTIVE', permissions: ['all'] },
        ],
        PHARMACY_PARTNER: [
          { id: 6, name: 'HealthPlus Pharmacy', email: 'pharmacy@healthplus.com', role: 'PHARMACY_PARTNER', status: 'VERIFIED' },
        ]
      };
      
      return {
        users: mockUsers[role] || [],
        role,
        total: mockUsers[role]?.length || 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'roleManagement/updateUserRole',
  async ({ userId, newRole, permissions }, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        userId,
        newRole,
        permissions,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user role');
    }
  }
);

export const assignPermissions = createAsyncThunk(
  'roleManagement/assignPermissions',
  async ({ userId, permissions }, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        userId,
        permissions,
        assignedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to assign permissions');
    }
  }
);

export const fetchRoleAnalytics = createAsyncThunk(
  'roleManagement/fetchRoleAnalytics',
  async ({ role, timeframe = 'month' }, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAnalytics = {
        CUSTOMER: {
          total: 1250,
          active: 890,
          newThisMonth: 45,
          engagementRate: 78,
          averageSessionDuration: 15
        },
        NUTRITIONIST: {
          total: 12,
          active: 8,
          newThisMonth: 2,
          averageConsultations: 24,
          satisfactionRate: 4.8
        },
        ADMIN: {
          total: 3,
          active: 3,
          systemActions: 156,
          lastLogin: '2024-04-12T10:30:00Z'
        },
        PHARMACY_PARTNER: {
          total: 5,
          active: 4,
          newThisMonth: 1,
          totalPrescriptions: 89,
          syncSuccessRate: 98
        }
      };
      
      return {
        role,
        analytics: mockAnalytics[role] || {},
        timeframe
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

const initialState = {
  usersByRole: {},
  roleAnalytics: {},
  loading: false,
  error: null,
  lastUpdated: null
};

const roleManagementSlice = createSlice({
  name: 'roleManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserInRole: (state, action) => {
      const { role, userId, updates } = action.payload;
      if (state.usersByRole[role]) {
        state.usersByRole[role] = state.usersByRole[role].map(user =>
          user.id === userId ? { ...user, ...updates } : user
        );
      }
    },
    removeUserFromRole: (state, action) => {
      const { role, userId } = action.payload;
      if (state.usersByRole[role]) {
        state.usersByRole[role] = state.usersByRole[role].filter(user => user.id !== userId);
      }
    },
    clearRoleUsers: (state, action) => {
      const { role } = action.payload;
      if (state.usersByRole[role]) {
        delete state.usersByRole[role];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch users by role
      .addCase(fetchUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.usersByRole[action.payload.role] = action.payload.users;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update user role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, newRole } = action.payload;
        
        // Remove user from all roles
        Object.keys(state.usersByRole).forEach(role => {
          state.usersByRole[role] = state.usersByRole[role].filter(user => user.id !== userId);
        });
        
        // Note: In a real implementation, you'd need to refetch the new role's users
        // or have the API return the updated user data
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Assign permissions
      .addCase(assignPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignPermissions.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, permissions } = action.payload;
        
        // Update user permissions across all roles
        Object.keys(state.usersByRole).forEach(role => {
          state.usersByRole[role] = state.usersByRole[role].map(user =>
            user.id === userId ? { ...user, permissions } : user
          );
        });
      })
      .addCase(assignPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch role analytics
      .addCase(fetchRoleAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.roleAnalytics[action.payload.role] = action.payload.analytics;
      })
      .addCase(fetchRoleAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateUserInRole, removeUserFromRole, clearRoleUsers } = roleManagementSlice.actions;

// Selectors
export const selectRoleManagement = (state) => state.roleManagement;
export const selectUsersByRole = (state, role) => state.roleManagement.usersByRole[role] || [];
export const selectRoleAnalytics = (state, role) => state.roleManagement.roleAnalytics[role] || {};
export const selectRoleManagementLoading = (state) => state.roleManagement.loading;
export const selectRoleManagementError = (state) => state.roleManagement.error;

// Memoized selectors for common queries
export const selectActiveUsersByRole = (state, role) => {
  return (state.roleManagement.usersByRole[role] || []).filter(user => 
    user.status === 'ACTIVE' || user.status === 'VERIFIED'
  );
};

export const selectUsersCountByRole = (state, role) => {
  return (state.roleManagement.usersByRole[role] || []).length;
};

export const selectRoleMetrics = (state, role) => {
  const users = state.roleManagement.usersByRole[role] || [];
  const analytics = state.roleManagement.roleAnalytics[role] || {};
  
  return {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'ACTIVE' || user.status === 'VERIFIED').length,
    ...analytics
  };
};

export default roleManagementSlice.reducer;
