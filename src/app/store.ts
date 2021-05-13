import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import dashboardReducer from '../features/dashboard/dashboard-slice';
import transactionsReducer from '../features/transactions/transactions-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
