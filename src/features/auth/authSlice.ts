import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as service from 'services/auth';
import { User, ValidationErrors } from 'types';
import { LoginFields, RegisterFields, UpdateProfileFields } from 'types/Auth';

import { removeAuth, setAuth, setUserLocalStorage } from './utils';

interface InitialState {
  user: User | null;
  error: string | null | undefined;
}

const localStorageCurrentUser = localStorage.getItem('currentUser');

const initialState: InitialState = {
  user: localStorageCurrentUser ? JSON.parse(localStorageCurrentUser as string) : null,
  error: null,
};

export const login = createAsyncThunk<User, LoginFields, { rejectValue: ValidationErrors }>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await service.getCSRFCookie();
      const response = await service.login(email, password);
      const { token, user } = response;
      setAuth(user, token);
      return user;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk<User, string, { rejectValue: ValidationErrors }>(
  'user/login/google',
  async (accessToken, { rejectWithValue }) => {
    try {
      await service.getCSRFCookie();
      const response = await service.loginWithGoogle(accessToken);
      const { token, user } = response;
      setAuth(user, token);
      return user;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk<User, RegisterFields, { rejectValue: ValidationErrors }>(
  'user/register',
  async (fields, { rejectWithValue }) => {
    try {
      await service.getCSRFCookie();
      const response = await service.register(fields);
      const { token, user } = response;
      setAuth(user, token);
      return user;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCurrentUser = createAsyncThunk('user/removeCurrentUser', async () => {
  removeAuth();
});

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: ValidationErrors }>(
  'user/currentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await service.getCurrentUser();
      setUserLocalStorage(user);
      return user;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk<
  User,
  UpdateProfileFields,
  { rejectValue: ValidationErrors }
>('user/updateProfile', async (fields, { rejectWithValue }) => {
  try {
    const user = await service.updateProfile(fields);
    setUserLocalStorage(user);
    return user;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateSettings = createAsyncThunk(
  'user/updateSettings',
  async (fields: { language: string; currency: string; theme: string }, { rejectWithValue }) => {
    try {
      const user = await service.updateSettings(fields);
      setUserLocalStorage(user);
      return user;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
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
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload?.message;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.error = action.payload?.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload?.message;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(removeCurrentUser.fulfilled, (state) => {
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
