import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../../store/apiSlice';

interface AuthState {
  token: string;
  refresh: string;
}

export const initialState: AuthState = {
  token: '',
  refresh: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<AuthState>) => ({ ...state, ...payload }),
    clearTokens: (state) => ({ ...state, token: '', refresh: '' }),
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      isAnyOf(
        apiSlice.endpoints.createSession.matchFulfilled,
        apiSlice.endpoints.updateSession.matchFulfilled,
      ),
      (state, { payload }) => ({
        ...state,
        token: payload.access_token,
        refresh: payload.refresh_token,
      }),
    ),
});

export const { setTokens, clearTokens } = authSlice.actions;
