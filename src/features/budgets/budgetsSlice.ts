import { createSlice } from '@reduxjs/toolkit';

export const budgesSlice = createSlice({
  name: 'budgets',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = budgesSlice.actions;

export default budgesSlice.reducer;
