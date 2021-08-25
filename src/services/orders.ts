import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FeedItem, fetchUserOrders } from '../utils/orders';
import mergeOrders from '../utils/mergeOrders';

const defaultState = {
  orders: [] as FeedItem[],
  loading: false,
  hasError: false
};

const loadOrders = createAsyncThunk(
  'orders/load',
  () => fetchUserOrders()
);
const orders = createSlice({
  name: 'orders',
  initialState: defaultState,
  reducers: {
    // only test purposes
    resetState: (state) => {
      state.orders = [];
      state.loading = false;
      state.hasError = false;
    },
    updateOrdersAction: (state, action) => {
      const newOrders = action.payload.orders;
      if (Array.isArray(newOrders)) {
        state.orders = mergeOrders(newOrders, state.orders);
      } else {
        console.error('Incorrect payload: ', action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.orders = [...action.payload || []];
        state.loading = false;
      })
      .addCase(loadOrders.rejected, (state) => {
        state.orders = [];
        state.loading = false;
        state.hasError = true;
      })
  }
});

const {
  resetState,
  updateOrdersAction
} = orders.actions;

export {
  orders,
  loadOrders,
  resetState,
  updateOrdersAction
}
