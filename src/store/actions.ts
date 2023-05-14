import { createAction } from '@reduxjs/toolkit';
import { Chat, Message, MessageCreateBody, Session } from './models';

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

export const chatNew = createAction<Chat>('chat/new');
