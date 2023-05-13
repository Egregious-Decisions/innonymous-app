import { EntityState, Slice, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { messageNew } from './actions';
import { Message } from './models';
import type { RootState } from './store';
import { apiSlice } from './apiSlice';

const messagesAdapter = createEntityAdapter<Message>({
  selectId: ({ chat, id }) => `${chat}.${id}`,
  sortComparer: ({ created_at: first }, { created_at: second }) =>
    new Date(second).getTime() - new Date(first).getTime(),
});

export const messagesSlice: Slice<
  EntityState<Message>,
  Record<string, never>,
  'messages'
> = createSlice({
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
