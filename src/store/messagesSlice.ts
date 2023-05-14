import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { messageNew } from './actions';
import { Id, Message } from './models';
import type { RootState } from './store';
import { apiSlice } from './apiSlice';

export const getMessageId = (chat: Id, message: Id) => `${chat}/${message}`;

const messagesAdapter = createEntityAdapter<Message>({
  selectId: ({ chat, id }) => getMessageId(chat, id),
  sortComparer: ({ created_at: first }, { created_at: second }) =>
    new Date(second).getTime() - new Date(first).getTime(),
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(messageNew, messagesAdapter.addOne)
      .addMatcher(apiSlice.endpoints.listMessages.matchFulfilled, (state, { payload }) =>
        messagesAdapter.upsertMany(state, payload.messages),
      ),
});

export const messagesSelectors = messagesAdapter.getSelectors<RootState>((state) => state.messages);
