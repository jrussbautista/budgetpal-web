import { ReportApi } from './report-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../transactions/TransactionModel';
import { AxiosError } from 'axios';
import { Status } from '../../shared/models/Status';

interface InitialState {
  transactions: Transaction[];
  status: Status;
  error: string | null | undefined;
}

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

const initialState: InitialState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchReport = createAsyncThunk(
  'report',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ReportApi.getReport();
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

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReport.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchReport.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.status = 'succeed';
    });
    builder.addCase(fetchReport.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
      state.status = 'failed';
    });
  },
});

export default reportSlice.reducer;
