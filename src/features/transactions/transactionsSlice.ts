import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as service from 'services/transactions';
import { Status, Result, ValidationErrors } from 'types';
import { Transaction, ManageTransactionFields } from 'types/Transaction';

interface InitialState {
  status: Status;
  transactions: Transaction[];
  error: string | null | undefined;
  transaction: { status: Status; data: Transaction | null; error: string };
  selectedFilter: Record<string, string>;
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
  selectedFilter: initialSelectedFilter,
  total: 0,
  transaction: { status: 'idle', data: null, error: '' },
};

export const fetchTransactions = createAsyncThunk<
  Result<Transaction>,
  { page: number; filter: Record<string, string> },
  { rejectValue: ValidationErrors }
>('transactions/fetchTransactions', async ({ filter, page }, { rejectWithValue }) => {
  try {
    const response = await service.getTransactions(page, filter);
    return response;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchTransaction = createAsyncThunk<
  Transaction,
  string,
  { rejectValue: ValidationErrors }
>('transactions/fetchTransaction', async (id, { rejectWithValue }) => {
  try {
    return service.getTransaction(id);
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const addTransaction = createAsyncThunk<
  Transaction,
  ManageTransactionFields,
  { rejectValue: ValidationErrors }
>('transactions/addTransaction', async (transaction, { rejectWithValue }) => {
  try {
    return service.addTransaction(transaction);
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteTransaction = createAsyncThunk<
  string,
  string,
  { rejectValue: ValidationErrors }
>('transactions/deleteTransaction', async (id, { rejectWithValue }) => {
  try {
    await service.deleteTransaction(id);
    return id;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateTransaction = createAsyncThunk<
  Transaction,
  { id: string; fields: ManageTransactionFields },
  { rejectValue: ValidationErrors }
>('transactions/updateTransaction', async ({ id, fields }, { rejectWithValue }) => {
  try {
    return service.updateTransaction(id, fields);
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
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
    clearTransaction: (state) => {
      state.transaction = initialState.transaction;
    },
  },
  extraReducers: (builder) => {
    // fetch transactions case
    builder.addCase(fetchTransactions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.transactions = action.payload.data;
      state.total = action.payload.meta.total;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.status = 'failed';
    });
    // fetch transaction case
    builder.addCase(fetchTransaction.pending, (state) => {
      state.transaction.status = 'loading';
    });
    builder.addCase(fetchTransaction.fulfilled, (state, action) => {
      state.transaction.status = 'succeed';
      state.transaction.data = action.payload;
    });
    builder.addCase(fetchTransaction.rejected, (state) => {
      state.transaction.status = 'failed';
    });
    // add transaction case
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions.unshift(action.payload);
    });
    // delete transaction case
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    });
    // update transaction case
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.id ? { ...transaction, ...action.payload } : transaction
      );
    });
  },
});

export const { setSelectedFilter, setBudgetStatus, resetSelectedFilter, clearTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
