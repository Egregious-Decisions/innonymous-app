import { createAction } from '@reduxjs/toolkit';
import { Chat, Id, Message, MessageCreateBody, Session } from './models';

export const authLogout = createAction('auth/logout');
export const authFailed = createAction('auth/failed');
export const authLogin = createAction<Session>('auth/login');
export const authRenewed = createAction<Session>('auth/renewed');
export const authRestored = createAction<Partial<Session>>('auth/restored');

export const messageNew = createAction<Message>('message/new');

export type PendingMessage = MessageCreateBody &
  Pick<Message, 'chat' | 'created_at'> & {
    requestId: string;
    failed?: boolean;
  };
export const messagePending = createAction<PendingMessage>('message/pending');
export const messageSent = createAction<string>('message/pending/sent');
export const messageFailed = createAction<string>('message/pending/failed');
export const messageRetry = createAction<string>('message/pending/retry');

export const chatNew = createAction<Chat>('chat/new');
