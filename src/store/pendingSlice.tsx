import { EntityState, Slice, createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  PendingMessage,
  messageFailed,
  messagePending,
  messageRetry,
  messageSent,
} from './actions';
import type { RootState } from './store';

const pendingAdapter = createEntityAdapter<PendingMessage>({
  selectId: ({ requestId }) => requestId,
  sortComparer: ({ created_at: first }, { created_at: second }) =>
    new Date(second).getTime() - new Date(first).getTime(),
});

export const pendingSlice: Slice<
  EntityState<PendingMessage>,
  Record<string, never>,
  'pending'
> = createSlice({
  name: 'pending',
  initialState: pendingAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(messagePending, pendingAdapter.addOne)
      .addCase(messageFailed, (state, { payload }) =>
        pendingAdapter.updateOne(state, { id: payload, changes: { failed: true } }),
      )
      .addMatcher(isAnyOf(messageSent, messageRetry), pendingAdapter.removeOne),
});

export const pendingSelectors = pendingAdapter.getSelectors<RootState>((state) => state.pending);
