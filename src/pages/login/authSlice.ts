import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
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
});

export const { setTokens, clearTokens } = authSlice.actions;
