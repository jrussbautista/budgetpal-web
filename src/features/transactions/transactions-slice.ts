import { Transaction } from './TransactionModel';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TransactionApi } from './transaction-api';
import { AxiosError } from 'axios';
import { Status } from '../../shared/models/Status';

interface InitialState {
  status: Status;
  transactions: Transaction[];
  error: string | null | undefined;
  isOpenTransactionModal: boolean;
  selectedTransaction: Transaction | null;
  isOpenFilter: boolean;
  selectedFilter: Record<string, string>;
  selectedModal: string | null;
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
  isOpenTransactionModal: false,
  isOpenFilter: false,
  selectedTransaction: null,
  selectedFilter: initialSelectedFilter,
  selectedModal: null,
};

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (filter: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await TransactionApi.getTransactions(filter);
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
      let error: AxiosError<ValidationErrors> = err;

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
      let error: AxiosError<ValidationErrors> = err;

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
      let error: AxiosError<ValidationErrors> = err;

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
    showTransactionModal: (state, action) => {
      state.isOpenTransactionModal = action.payload;
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    toggleFilter: (state) => {
      state.isOpenFilter = !state.isOpenFilter;
    },
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload;
    },
    setSelectedFilter: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.status = 'idle'; // necessary in order to refetch transactions from api
      state.selectedFilter = { ...state.selectedFilter, ...action.payload };
    },
    resetSelectedFilter: (state) => {
      state.status = 'idle'; // necessary in order to refetch transactions from api
      state.selectedFilter = initialSelectedFilter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.transactions = action.payload;
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
        transaction.id === action.payload.id
          ? { ...transaction, ...action.payload }
          : transaction
      );
    });
  },
});

export const {
  showTransactionModal,
  setSelectedTransaction,
  toggleFilter,
  setSelectedFilter,
  setSelectedModal,
  resetSelectedFilter,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
