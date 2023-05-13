import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { chatNew, messageNew } from './actions';
import { Chat } from './models';
import type { RootState } from './store';
import { apiSlice } from './apiSlice';

const chatsAdapter = createEntityAdapter<Chat>({
  sortComparer: ({ updated_at: first }, { updated_at: second }) =>
    new Date(second).getTime() - new Date(first).getTime(),
});

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: chatsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(chatNew, chatsAdapter.addOne)
      .addCase(messageNew, (state, { payload }) =>
        chatsAdapter.updateOne(state, {
          id: payload.chat,
          changes: { updated_at: payload.created_at },
        }),
      )
      .addMatcher(apiSlice.endpoints.listChats.matchFulfilled, (state, { payload }) =>
        chatsAdapter.upsertMany(state, payload.chats),
      ),
});

export const chatsSelectors = chatsAdapter.getSelectors<RootState>((state) => state.chats);
