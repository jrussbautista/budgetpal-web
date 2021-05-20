import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface Currency {
  code: string;
  title: string;
  locale: string;
}

interface InitialState {
  theme: Theme;
  currency: Currency;
  selectedDialog: string | null;
}

const initialTheme =
  window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

const initialState: InitialState = {
  theme: initialTheme,
  selectedDialog: null,
  currency: {
    code: 'USD',
    title: 'US Dollar',
    locale: 'en-US',
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSelectedDialog: (state, action) => {
      state.selectedDialog = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { toggleTheme, setSelectedDialog, setCurrency } =
  settingsSlice.actions;

export default settingsSlice.reducer;
