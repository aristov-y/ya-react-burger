import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  completed: ['034533', '034532', '034530', '034527', '034525'],
  inProgress: ['034538', '034541', '034542'],
  total: 25456,
  todayTotal: 138
};

const feedStatistic = createSlice({
  name: 'feedStatistic',
  initialState: defaultState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    }
  }
});

export {
  feedStatistic
}
