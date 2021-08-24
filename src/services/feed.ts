import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFeed, FeedItem } from '../utils/orders';

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
      const old: FeedItem[] = [...state.feed];
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
      state.feed = old;
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
