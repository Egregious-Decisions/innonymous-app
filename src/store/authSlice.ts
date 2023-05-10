import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authFailed, authLogin, authLogout, authRenewed, authRestored } from './actions';
import { Session } from './models';

export const initialState: Partial<Session> = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(isAnyOf(authFailed, authLogout), (state) => ({
        ...state,
        access_token: '',
        refresh_token: '',
      }))
      .addMatcher(isAnyOf(authLogin, authRenewed, authRestored), (state, { payload }) => ({
        ...state,
        ...payload,
      })),
});
