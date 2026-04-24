import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API functions - in production these would make actual API calls
const ordersAPI = {
  createOrder: async (orderData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock order ID
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    return {
      success: true,
      orderId,
      message: 'Order created successfully',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
  },

  getUserOrders: async (userId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user orders
    return {
      success: true,
      orders: [
        {
          id: 'ORD-ABC123XYZ',
          date: '2026-04-20',
          total: 15000,
          status: 'delivered',
          items: [
            { name: 'Jollof Rice', quantity: 2, price: 4500 },
            { name: 'Efo Riro', quantity: 1, price: 4200 }
          ]
        },
        {
          id: 'ORD-DEF456ABC',
          date: '2026-04-22',
          total: 8500,
          status: 'processing',
          items: [
            { name: 'Waakye', quantity: 2, price: 4300 }
          ]
        }
      ]
    };
  },

  getOrderById: async (orderId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      order: {
        id: orderId,
        date: '2026-04-23',
        total: 12700,
        status: 'processing',
        shippingInfo: {
          fullName: 'John Doe',
          address: '123 Main St, Kiyovu',
          city: 'Kigali',
          country: 'Rwanda'
        },
        items: [
          { name: 'Agatogo', quantity: 1, price: 4000 },
          { name: 'Ugali & Sukuma Wiki', quantity: 2, price: 3500 }
        ]
      }
    };
  }
};

// Async thunks for order operations
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getUserOrders(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getOrderById(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch order');
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  createOrderLoading: false,
  createOrderError: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createOrderError = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetCreateOrderState: (state) => {
      state.createOrderLoading = false;
      state.createOrderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true;
        state.createOrderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        state.currentOrder = action.payload;
        state.createOrderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoading = false;
        state.createOrderError = action.payload;
      })
      
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentOrder, resetCreateOrderState } = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectCreateOrderLoading = (state) => state.orders.createOrderLoading;
export const selectCreateOrderError = (state) => state.orders.createOrderError;

export default ordersSlice.reducer;
