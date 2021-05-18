import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface InitialState {
  theme: Theme;
}

const initialTheme =
  window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

const initialState: InitialState = {
  theme: initialTheme,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
