import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  refresh: string | null;
}

export const initialState: AuthState = {
  token: null,
  refresh: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<AuthState>) => ({ ...state, ...payload }),
    clearTokens: (state) => ({ ...state, token: '', refresh: '' }),
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
