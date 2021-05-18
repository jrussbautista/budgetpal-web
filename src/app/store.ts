import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import dashboardReducer from '../features/dashboard/dashboard-slice';
import transactionsReducer from '../features/transactions/transactions-slice';
import budgetReducer from '../features/budgets/budgets-slice';
import settingsReducer from '../features/settings/settings-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
    budgets: budgetReducer,
    settings: settingsReducer,
  },
});

store.subscribe(() => {
  const { theme } = store.getState().settings;
  window.localStorage.setItem('theme', theme);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
