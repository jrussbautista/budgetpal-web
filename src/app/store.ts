import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'features/auth/authSlice';
import budgetReducer from 'features/budgets/budgetsSlice';
import categoriesReducer from 'features/categories/categoriesSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import reportReducer from 'features/report/reportSlice';
import transactionsReducer from 'features/transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
    budgets: budgetReducer,
    report: reportReducer,
    categories: categoriesReducer,
  },
});

store.subscribe(() => {
  const { user } = store.getState().auth;
  window.localStorage.setItem('currentUser', JSON.stringify(user));
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
