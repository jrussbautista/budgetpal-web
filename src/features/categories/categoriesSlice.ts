import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as service from 'services/categories';
import { Status, ValidationErrors, Result } from 'types';
import { Category, ManageCategoryFields } from 'types/Category';

interface InitialState {
  status: Status;
  categories: Category[];
  error: string | null | undefined;
  selectedCategory: null | Category;
  selectedModal: null | string;
  category: { status: Status; data: Category | null; error: string };
}

const initialState: InitialState = {
  status: 'idle',
  categories: [],
  error: null,
  selectedCategory: null,
  selectedModal: null,
  category: { status: 'idle', data: null, error: '' },
};

export const fetchCategories = createAsyncThunk<
  Result<Category>,
  void,
  { rejectValue: ValidationErrors }
>('categories', async (_, { rejectWithValue }) => {
  try {
    return service.getCategories();
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchCategory = createAsyncThunk<Category, string, { rejectValue: ValidationErrors }>(
  'categories/fetchCategory',
  async (id, { rejectWithValue }) => {
    try {
      return service.getCategory(id);
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: ValidationErrors }>(
  'categories/delete',
  async (id, { rejectWithValue }) => {
    try {
      return service.deleteCategory(id);
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk<
  Category,
  { id: string; fields: ManageCategoryFields },
  { rejectValue: ValidationErrors }
>('categories/update', async ({ id, fields }, { rejectWithValue }) => {
  try {
    return service.updateCategory(id, fields);
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const addCategory = createAsyncThunk<
  Category,
  ManageCategoryFields,
  { rejectValue: ValidationErrors }
>('transactions/addTransaction', async (fields, { rejectWithValue }) => {
  try {
    return service.addCategory(fields);
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch categories case
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
      state.status = 'succeed';
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = 'failed';
    });

    // fetch category case
    builder.addCase(fetchCategory.pending, (state) => {
      state.category.status = 'loading';
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category.status = 'succeed';
      state.category.data = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.category.status = 'failed';
    });

    // add category case
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    // delete category case
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    });
    // update category case
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? { ...category, ...action.payload } : category
      );
    });
  },
});

export const { setSelectedModal, setSelectedCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
