import { createAction } from '@reduxjs/toolkit';
import { Chat, Id, Message, MessageCreateBody, MessageForward, Session } from './models';

export const authLogout = createAction('auth/logout');
export const authFailed = createAction('auth/failed');
export const authLogin = createAction<Session>('auth/login');
export const authRenewed = createAction<Session>('auth/renewed');
export const authRestored = createAction<Partial<Session>>('auth/restored');

export const messageNew = createAction<Message>('message/new');

export type FailedMessage = MessageCreateBody &
  Pick<Message, 'chat' | 'created_at'> & {
    requestId: string;
  };
export const messageFailed = createAction<FailedMessage>('message/failed');
export const messageRetry = createAction<string>('message/retry');

export const messageInputReply = createAction<Id>('message/input/reply');
export const messageInputForward = createAction<MessageForward[]>('message/input/forward');
export const messageInputCancel = createAction('message/input/cancel');

export const chatNew = createAction<Chat>('chat/new');
