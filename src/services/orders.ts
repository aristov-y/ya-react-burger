import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrders, FeedItem } from '../utils/orders';

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

export {
  orders,
  loadOrders
}
