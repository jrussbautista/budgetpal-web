import { Budget } from './BudgetModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BudgetApi } from './budget-api';
import { AxiosError } from 'axios';
import { Status } from '../../shared/models/Status';

interface InitialState {
  status: Status;
  budgets: Budget[];
  error: string | null | undefined;
  isOpenBudgetModal: boolean;
  selectedBudget: Budget | null;
}

const initialState: InitialState = {
  status: 'idle',
  budgets: [],
  error: null,
  isOpenBudgetModal: false,
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
      let error: AxiosError<ValidationErrors> = err;

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
      let error: AxiosError<ValidationErrors> = err;

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
      let error: AxiosError<ValidationErrors> = err;

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
      let error: AxiosError<ValidationErrors> = err;

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
    showBudgetModal: (state, action) => {
      state.isOpenBudgetModal = action.payload;
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
      state.budgets = state.budgets.filter(
        (Budget) => Budget.id !== action.payload
      );
    });
    builder.addCase(updateBudget.fulfilled, (state, action) => {
      state.budgets = state.budgets.map((budget) =>
        budget.id === action.payload.id
          ? { ...budget, ...action.payload }
          : budget
      );
    });
  },
});

export const { showBudgetModal, setSelectedBudget } = BudgetsSlice.actions;

export default BudgetsSlice.reducer;
