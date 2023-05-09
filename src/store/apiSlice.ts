import { SerializedError } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  Credentials,
  Chat,
  Message,
  MessageUpdate,
  UserCreateBody,
  UserInfo,
  IdPathParameter,
  UserPrivateInfo,
  UserUpdate,
  Session,
  SessionUpdate,
  SessionInfo,
  QueryFilter,
  ObjectList,
  ChatCreateBody,
  MessageCreateBody,
  Error,
  Event,
  CaptchaTask,
} from './models';

const { VITE_API_ROOT: API_ROOT } = import.meta.env;

const eventSource = new EventSource(`${API_ROOT}/events`);
const eventsInit = new Promise<void>((resolve) => {
  eventSource.addEventListener('open', () => resolve());
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as { auth: { token: string } }).auth;
      if (token !== '') {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Session', 'User', 'Chats', 'Messages'],
  endpoints: (builder) => ({
    receiveUpdates: builder.query<Event[], void>({
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {
        await cacheDataLoaded;
        await eventsInit;

        const listener = (message: MessageEvent) => {
          const event = JSON.parse(message.data) as Event;
          if (event.message === undefined) return;

          updateCachedData((draft) => {
            draft.push(event);
          });
        };

        eventSource.addEventListener('message_created', listener);
        await cacheEntryRemoved;
        eventSource.removeEventListener('message_created', listener);
        eventSource.close();
      },
    }),
    getCaptcha: builder.query<CaptchaTask, void>({
      query: () => ({
        url: '/captcha',
      }),
    }),
    createUser: builder.mutation<UserInfo, UserCreateBody>({
      query: (auth) => ({
        url: '/users',
        method: 'POST',
        body: auth,
      }),
    }),
    getUser: builder.query<UserInfo, IdPathParameter<'user'>>({
      query: ({ user }) => ({
        url: `/users/${user}`,
      }),
    }),
    getCurrentUser: builder.query<UserPrivateInfo, void>({
      query: () => ({
        url: '/users/me',
      }),
      providesTags: ['User'],
    }),
    updateCurrentUser: builder.mutation<UserPrivateInfo, UserUpdate>({
      query: (update) => ({
        url: '/users/me',
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: ['User'],
    }),
    deleteCurrentUser: builder.mutation<null, void>({
      query: () => ({
        url: '/users/me',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    createSession: builder.mutation<Session, Credentials>({
      query: (credentials) => ({
        url: '/sessions',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Session', 'User', 'Chats', 'Messages'],
    }),
    updateSession: builder.mutation<Session, SessionUpdate>({
      query: (update) => ({
        url: '/sessions',
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: ['Session'],
    }),
    getSessions: builder.query<ObjectList<'sessions', SessionInfo>, void>({
      query: () => ({
        url: '/sessions',
      }),
      providesTags: ['Session'],
    }),
    deleteSession: builder.mutation<void, IdPathParameter<'session'>>({
      query: ({ session }) => ({
        url: `/sessions/${session}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Session'],
    }),
    deleteAllSessions: builder.mutation<null, void>({
      query: () => ({
        url: '/sessions',
        method: 'DELETE',
      }),
      invalidatesTags: ['Session'],
    }),
    listChats: builder.query<ObjectList<'chats', Chat>, QueryFilter>({
      query: (filter) => ({ url: '/chats', params: filter }),
      providesTags: ['Chats'],
    }),
    getChat: builder.query<Chat, IdPathParameter<'chat'>>({
      query: ({ chat }) => ({ url: `/chats/${chat}` }),
    }),
    createChat: builder.mutation<null, ChatCreateBody>({
      query: (chat) => ({
        url: '/chats',
        method: 'POST',
        body: chat,
      }),
      invalidatesTags: ['Chats'],
    }),
    listMessages: builder.query<
      ObjectList<'messages', Message>,
      IdPathParameter<'chat'> & QueryFilter
    >({
      query: ({ chat, ...filter }) => ({
        url: `/chats/${chat}/messages`,
        params: filter,
      }),
      providesTags: ['Messages'],
    }),
    getMessage: builder.query<Message, IdPathParameter<'chat' | 'message'>>({
      query: ({ chat, ...message }) => ({
        url: `/chats/${chat}/messages/${message}`,
      }),
    }),
    createMessage: builder.mutation<Message, MessageCreateBody & IdPathParameter<'chat'>>({
      query: ({ chat, ...message }) => ({
        url: `/chats/${chat}/messages`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    updateMessage: builder.mutation<null, MessageUpdate & IdPathParameter<'chat' | 'message'>>({
      query: ({ chat, message, ...update }) => ({
        url: `/chats/${chat}/messages/${message}`,
        method: 'POST',
        body: update,
      }),
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation<null, IdPathParameter<'message' | 'chat'>>({
      query: ({ chat, message }) => ({
        url: `/chats/${chat}/messages/${message}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

const getFetchErrorMessage = (error: FetchBaseQueryError, validationErrorMessage?: string) => {
  if (error.status === 422 && validationErrorMessage) {
    return validationErrorMessage;
  }

  if ('error' in error) {
    return error.error;
  }

  const {
    attributes: { message },
  } = error.data as Error;

  return message || JSON.stringify(error.data);
};

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
  validationErrorMessage?: string,
) => {
  if ('status' in error) {
    return getFetchErrorMessage(error, validationErrorMessage);
  }

  const message = error.message || 'Unknown error';

  if (error.code === undefined) {
    return message;
  }

  return `${message} (code ${error.code})`;
};
