import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFeed, FeedItem } from '../utils/orders';
import mergeOrders from '../utils/mergeOrders';

const defaultState = {
  feed: [] as FeedItem[],
  total: 0,
  totalToday: 0,
  loading: false,
  hasError: false
};

const loadFeed = createAsyncThunk(
  'load/feed',
  () => fetchFeed()
);

const feed = createSlice({
  name: 'feed',
  initialState: defaultState,
  reducers: {
    setFeed: ((state, action: PayloadAction<FeedItem[]>) => {
      state.feed = action.payload;
    }),
    updateFeed: (state, action) => {
      const newOrders = action.payload.orders;
      if (Array.isArray(newOrders)) {
        state.feed = mergeOrders(newOrders, state.feed);
      } else {
        console.error('Incorrect payload: ', action.payload);
      }
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(loadFeed.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.feed = [...action.payload.orders];
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(loadFeed.rejected, (state) => {
        state.feed = [];
        state.loading = false;
        state.hasError = true;
      })
  })
});

const updateFeedAction = feed.actions.updateFeed;

export {
  feed,
  loadFeed,
  updateFeedAction
};
