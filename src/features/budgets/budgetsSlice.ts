import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from 'app/store';
import * as service from 'services/budgets';
import { Status } from 'types';
import { Budget, ManageBudgetFields } from 'types/Budget';

interface InitialState {
  status: Status;
  budgets: Budget[];
  error: string | null | undefined;
  budget: { status: Status; data: Budget | null; error: string };
}

const initialState: InitialState = {
  status: 'idle',
  budgets: [],
  error: null,
  budget: { status: 'idle', data: null, error: '' },
};

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

export const fetchBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getBudgets();
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

export const fetchBudget = createAsyncThunk<Budget, string>(
  'budgets/fetchBudget',
  async (id, { rejectWithValue }) => {
    try {
      return service.getBudget(id);
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBudget = createAsyncThunk<Budget, ManageBudgetFields>(
  'budgets/addBudget',
  async (fields, { rejectWithValue }) => {
    try {
      return service.addBudget(fields);
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
      const res = await service.deleteBudget(id);
      return res;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBudget = createAsyncThunk<Budget, { id: string; fields: ManageBudgetFields }>(
  'budgets/updateBudget',
  async ({ id, fields }, { rejectWithValue }) => {
    try {
      return service.updateBudget(id, fields);
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
    clearBudget: (state) => {
      state.budget = initialState.budget;
    },
  },
  extraReducers: (builder) => {
    // fetch budgets case
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
    // fetch budget case
    builder.addCase(fetchBudget.pending, (state) => {
      state.budget.status = 'loading';
    });
    builder.addCase(fetchBudget.fulfilled, (state, action) => {
      state.budget.status = 'succeed';
      state.budget.data = action.payload;
    });
    builder.addCase(fetchBudget.rejected, (state) => {
      state.budget.status = 'failed';
    });
    // add budget case
    builder.addCase(addBudget.fulfilled, (state, action) => {
      state.budgets.unshift(action.payload);
    });
    // delete budget case
    builder.addCase(deleteBudget.fulfilled, (state, action) => {
      state.budgets = state.budgets.filter((budget) => budget.id !== action.payload);
    });
    // update budget case
    builder.addCase(updateBudget.fulfilled, (state, action) => {
      state.budgets = state.budgets.map((budget) =>
        budget.id === action.payload.id ? { ...budget, ...action.payload } : budget
      );
    });
  },
});

export const { clearBudget } = BudgetsSlice.actions;

export const selectAllBudgets = (state: RootState) => state.budgets.budgets;

export const selectBudgetsByStatus = createSelector(
  [selectAllBudgets, (state: RootState, status: string) => status],
  (budgets, status) => budgets.filter((budget) => budget.status === status)
);

export default BudgetsSlice.reducer;
