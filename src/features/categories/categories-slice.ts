import { Category } from '../../shared/models/Category';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryApi } from './category-api';
import { AxiosError } from 'axios';
import { Status } from '../../shared/models/Status';

interface InitialState {
  status: Status;
  categories: Category[];
  error: string | null | undefined;
}

const initialState: InitialState = {
  status: 'idle',
  categories: [],
  error: null,
};

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

export const fetchCategories = createAsyncThunk(
  'categories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CategoryApi.getCategories();
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

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.status = 'succeed';
    });
    builder.addCase(fetchCategories.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
      state.status = 'failed';
    });
  },
});

export default categoriesSlice.reducer;
