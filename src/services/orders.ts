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
    },
    updateOrdersAction: (state, action) => {
      const old: FeedItem[] = [...state.orders];
      const newOrders = action.payload.orders;
      newOrders.forEach((val: FeedItem) => {
        const id = val._id;
        const idx = old.findIndex(e => e._id === id);
        if (idx === -1) {
          old.splice(0,0, val);
        } else {
          old.splice(idx, 1, { ...val });
        }
      });
      state.orders = old;
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
