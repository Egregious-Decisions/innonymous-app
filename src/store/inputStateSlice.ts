import { createSlice } from '@reduxjs/toolkit';
import { messageInputCancel, messageInputForward, messageInputReply } from './actions';
import { Id, MessageForward } from './models';

export type InputState = {
  reply_to?: Id;
  forwarded_from: MessageForward[];
};

export const initialState: InputState = { reply_to: undefined, forwarded_from: [] };

export const inputStateSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(messageInputReply, (state, { payload }) => ({ ...state, reply_to: payload }))
      .addCase(messageInputForward, (state, { payload }) => ({ ...state, forwarded_from: payload }))
      .addCase(messageInputCancel, (state) => ({
        ...state,
        ...initialState,
      })),
});
