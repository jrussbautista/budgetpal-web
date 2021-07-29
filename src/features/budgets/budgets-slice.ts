import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '@/app/store';

import { Status } from '../../shared/types/Status';

import { BudgetApi } from './budget-api';
import { Budget } from './types/Budget';

interface InitialState {
  status: Status;
  budgets: Budget[];
  error: string | null | undefined;
  selectedModal: null | string;
  selectedBudget: Budget | null;
}

const initialState: InitialState = {
  status: 'idle',
  budgets: [],
  error: null,
  selectedModal: null,
  selectedBudget: null,
};

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

export const fetchBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BudgetApi.getBudgets();
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

export const addBudget = createAsyncThunk(
  'budgets/addBudget',
  async (
    budget: {
      category_id: string;
      amount: number;
      type: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await BudgetApi.addBudget(budget);
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

export const deleteBudget = createAsyncThunk(
  'budgets/deleteBudget',
  async (id: string, { rejectWithValue }) => {
    try {
      await BudgetApi.deleteBudget(id);
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

export const updateBudget = createAsyncThunk(
  'Budgets/updateBudget',
  async (
    {
      id,
      fields,
    }: {
      id: string;
      fields: {
        category_id: string;
        amount: number;
        type: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await BudgetApi.updateBudget(id, fields);
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

export const BudgetsSlice = createSlice({
  name: 'Budgets',
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload;
    },
    setSelectedBudget: (state, action) => {
      state.selectedBudget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBudgets.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBudgets.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.budgets = action.payload;
    });
    builder.addCase(fetchBudgets.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
      state.status = 'failed';
    });
    builder.addCase(addBudget.fulfilled, (state, action) => {
      state.budgets.unshift(action.payload);
    });
    builder.addCase(deleteBudget.fulfilled, (state, action) => {
      state.budgets = state.budgets.filter((budget) => budget.id !== action.payload);
    });
    builder.addCase(updateBudget.fulfilled, (state, action) => {
      state.budgets = state.budgets.map((budget) =>
        budget.id === action.payload.id ? { ...budget, ...action.payload } : budget
      );
    });
  },
});

export const { setSelectedModal, setSelectedBudget } = BudgetsSlice.actions;

export const selectAllBudgets = (state: RootState) => state.budgets.budgets;

export const selectBudgetsByStatus = createSelector(
  [selectAllBudgets, (state: RootState, status: string) => status],
  (budgets, status) => budgets.filter((budget) => budget.status === status)
);

export default BudgetsSlice.reducer;
