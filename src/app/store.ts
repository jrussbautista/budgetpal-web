import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import dashboardReducer from '../features/dashboard/dashboard-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
