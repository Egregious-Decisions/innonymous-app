import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FailedMessage, messageFailed, messageRetry } from './actions';
import type { RootState } from './store';

const failedAdapter = createEntityAdapter<FailedMessage>({
  selectId: ({ requestId }) => requestId,
  sortComparer: ({ created_at: first }, { created_at: second }) =>
    new Date(second).getTime() - new Date(first).getTime(),
});

export const failedSlice = createSlice({
  name: 'failed',
  initialState: failedAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(messageFailed, failedAdapter.addOne)
      .addCase(messageRetry, failedAdapter.removeOne),
});

export const failedSelectors = failedAdapter.getSelectors<RootState>((state) => state.failed);
