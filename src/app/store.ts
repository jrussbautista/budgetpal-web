import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import dashboardReducer from '../features/dashboard/dashboard-slice';
import transactionsReducer from '../features/transactions/transactions-slice';
import budgetReducer from '../features/budgets/budgets-slice';
import reportReducer from '../features/report/report-slice';
import categoriesReducer from '../features/categories/categories-slice';

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
