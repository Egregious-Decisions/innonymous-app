import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../../store/apiSlice';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => ({ ...state, token: payload }),
    clearToken: (state) => ({ ...state, token: '' }),
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(apiSlice.endpoints.authenticate.matchFulfilled, (state, { payload }) => ({
        ...state,
        token: payload.access_token,
      }))
      .addMatcher(
        isAnyOf(
          apiSlice.endpoints.authenticate.matchRejected,
          apiSlice.endpoints.getChat.matchRejected,
          apiSlice.endpoints.listChats.matchRejected,
          apiSlice.endpoints.createChat.matchRejected,
          apiSlice.endpoints.createMessage.matchRejected,
          apiSlice.endpoints.deleteMessage.matchRejected,
        ),
        (state, { payload }) => {
          if (!payload) {
            return state;
          }
          if (payload.status === 401) {
            return { ...state, token: '' };
          }
          return state;
        },
      ),
});

export const { setToken, clearToken } = authSlice.actions;
