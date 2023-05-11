import { createAction } from '@reduxjs/toolkit';
import { Chat, Message, Session } from './models';

export const authLogout = createAction('auth/logout');
export const authFailed = createAction('auth/failed');
export const authLogin = createAction<Session>('auth/login');
export const authRenewed = createAction<Session>('auth/renewed');
export const authRestored = createAction<Partial<Session>>('auth/restored');

export const messageNew = createAction<Message>('message/new');

export const chatNew = createAction<Chat>('chat/new');
