import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../shared/types/Status';

import { TransactionApi } from './transaction-api';
import { Transaction } from './types/Transaction';

interface InitialState {
  status: Status;
  transactions: Transaction[];
  error: string | null | undefined;
  selectedTransaction: Transaction | null;
  selectedFilter: Record<string, string>;
  selectedModal: string | null;
  total: number;
}

const initialSelectedFilter = {
  category_id: '',
  type: '',
  title: '',
  start_date: '',
  end_date: '',
  min_amount: '',
  max_amount: '',
};

const initialState: InitialState = {
  status: 'idle',
  transactions: [],
  error: null,
  selectedTransaction: null,
  selectedFilter: initialSelectedFilter,
  selectedModal: null,
  total: 0,
};

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (
    { filter, page }: { filter: Record<string, string>; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await TransactionApi.getTransactions(page, filter);
      return response.data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;

      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (
    transaction: {
      title: string;
      category_id: string;
      amount: number;
      type: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await TransactionApi.addTransaction(transaction);
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

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: string, { rejectWithValue }) => {
    try {
      await TransactionApi.deleteTransaction(id);
      return id;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;

      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (
    {
      id,
      fields,
    }: {
      id: string;
      fields: {
        title: string;
        category_id: string;
        amount: number;
        type: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await TransactionApi.updateTransaction(id, fields);
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

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload;
    },
    setSelectedFilter: (state, action: PayloadAction<Record<string, string>>) => {
      state.status = 'idle'; // necessary in order to refetch transactions from api
      state.selectedFilter = { ...state.selectedFilter, ...action.payload };
    },
    resetSelectedFilter: (state) => {
      state.status = 'idle'; // necessary in order to refetch transactions from api
      state.selectedFilter = initialSelectedFilter;
    },
    setBudgetStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.transactions = action.payload.data;
      state.total = action.payload.meta.total;
    });
    builder.addCase(fetchTransactions.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
      state.status = 'failed';
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions.unshift(action.payload);
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.id ? { ...transaction, ...action.payload } : transaction
      );
    });
  },
});

export const {
  setSelectedTransaction,
  setSelectedFilter,
  setSelectedModal,
  setBudgetStatus,
  resetSelectedFilter,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
