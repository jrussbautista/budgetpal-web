import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import User from '../../shared/models/User';
import { AuthApi } from './auth-api';
import { AxiosError } from 'axios';
import apiClient from '../../shared/utils/apiClient';

interface InitialState {
  user: User | null;
  error: string | null | undefined;
}

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

const localStorageCurrentUser = localStorage.getItem('currentUser');

const initialState: InitialState = {
  user: localStorageCurrentUser
    ? JSON.parse(localStorageCurrentUser as string)
    : null,
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await AuthApi.getCSRFCookie();
      const response = await AuthApi.login(email, password);
      const { token, user } = response.data.data;
      window.localStorage.setItem('accessToken', token);
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return response.data.data.user;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;

      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (
    {
      email,
      password,
      password_confirmation,
      name,
    }: {
      email: string;
      password: string;
      name: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await AuthApi.getCSRFCookie();
      const response = await AuthApi.register({
        email,
        name,
        password,
        password_confirmation,
      });
      const { token, user } = response.data.data;
      window.localStorage.setItem('accessToken', token);
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return response.data.data.user;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;

      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCurrentUser = createAsyncThunk(
  'user/removeCurrentUser',
  async () => {
    window.localStorage.removeItem('currentUser');
    window.localStorage.removeItem('accessToken');
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/currentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.getCurrentUser();
      const user = response.data.data;
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (fields: { name: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await AuthApi.updateProfile(fields);
      const user = response.data.data.user;
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'user/updateSettings',
  async (
    fields: { language: string; currency: string; theme: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthApi.updateSettings(fields);
      console.log(response);
      const user = response.data.data;
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(removeCurrentUser.fulfilled, (state, action) => {
      state.user = null;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
