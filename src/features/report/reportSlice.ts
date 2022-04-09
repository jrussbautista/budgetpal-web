import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as service from 'services/report';
import { Status } from 'types';
import { Transaction } from 'types/Transaction';
import { getStartAndEndDate } from 'utils/getDateRange';

interface InitialState {
  transactions: Transaction[];
  status: Status;
  error: string | null | undefined;
  filter: Record<string, string>;
}

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

const initialDateRange = getStartAndEndDate('thisMonth');

const initialState: InitialState = {
  transactions: [],
  status: 'idle',
  error: null,
  filter: {
    label: 'This Month',
    value: 'thisMonth',
    start_date: initialDateRange.startDate,
    end_date: initialDateRange.endDate,
  },
};

export const fetchReport = createAsyncThunk(
  'report',
  async (filter: Record<string, string> = {}, { rejectWithValue }) => {
    try {
      const response = await service.getReport(filter);
      return response.data.data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;

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
  reducers: {
    setSelectedFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReport.pending, (state) => {
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

export const { setSelectedFilter } = reportSlice.actions;

export default reportSlice.reducer;
