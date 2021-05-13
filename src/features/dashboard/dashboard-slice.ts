import { Dashboard } from './DashboardModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardApi } from './dashboard-api';
import { AxiosError } from 'axios';
import { Status } from '../../shared/models/Status';

interface InitialState {
  status: Status;
  dashboard: Dashboard | null;
  error: string | null | undefined;
}

const initialState: InitialState = {
  status: 'idle',
  dashboard: null,
  error: null,
};

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

export const fetchDashboard = createAsyncThunk(
  'dashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await DashboardApi.getDashboard();
      return response.data.data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;

      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      state.dashboard = action.payload;
      state.status = 'succeed';
    });
    builder.addCase(fetchDashboard.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
      state.status = 'failed';
    });
  },
});

export default dashboardSlice.reducer;
