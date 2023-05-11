import { SerializedError } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  Credentials,
  Chat,
  Message,
  MessageUpdate,
  UserCreateBody,
  UserInfo,
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
import type { RootState } from './store';
import { authFailed, authRenewed } from './actions';

const { VITE_API_ROOT: API_ROOT } = import.meta.env;

const eventSource = new EventSource(`${API_ROOT}/events`);
const eventsInit = new Promise<void>((resolve) => {
  eventSource.addEventListener('open', () => resolve());
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const queryWithAuth = fetchBaseQuery({
      baseUrl: API_ROOT,
      prepareHeaders: (headers) => {
        const {
          auth: { access_token },
        } = api.getState() as RootState;
        if (access_token) {
          headers.set('Authorization', `Bearer ${access_token}`);
        }
        return headers;
      },
    });

    const originalQuery = async () => queryWithAuth(args, api, extraOptions);
    let response = await originalQuery();
    if (response.error?.status !== 401) {
      return response;
    }

    const {
      auth: { refresh_token },
    } = api.getState() as RootState;

    if (!refresh_token || api.endpoint === 'updateSession') {
      api.dispatch(authFailed());
      return response;
    }

    const update: SessionUpdate = { refresh_token };

    const authResponse = await queryWithAuth(
      {
        url: '/sessions',
        method: 'PATCH',
        body: update,
      },
      api,
      extraOptions,
    );

    if (authResponse.error) {
      api.dispatch(authFailed());
      return response;
    }

    api.dispatch(authRenewed(authResponse.data as Session));

    response = await originalQuery();
    return response;
  },
  tagTypes: ['chat', 'user', 'message'],
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
      providesTags: (result) =>
        result
          ? [
              { type: 'user', id: result.id },
              { type: 'user', id: 'me' },
            ]
          : [],
    }),
    updateCurrentUser: builder.mutation<UserPrivateInfo, UserUpdate>({
      query: (update) => ({
        url: '/users/me',
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: [{ type: 'user', id: 'me' }],
    }),
    deleteCurrentUser: builder.mutation<null, void>({
      query: () => ({
        url: '/users/me',
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'user', id: 'me' }],
    }),
    createSession: builder.mutation<Session, Credentials>({
      query: (credentials) => ({
        url: '/sessions',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['user', 'chat', 'message'],
    }),
    updateSession: builder.mutation<Session, SessionUpdate>({
      query: (update) => ({
        url: '/sessions',
        method: 'PATCH',
        body: update,
      }),
    }),
    getSessions: builder.query<ObjectList<'sessions', SessionInfo>, void>({
      query: () => ({
        url: '/sessions',
      }),
    }),
    deleteSession: builder.mutation<void, IdPathParameter<'session'>>({
      query: ({ session }) => ({
        url: `/sessions/${session}`,
        method: 'DELETE',
      }),
    }),
    deleteAllSessions: builder.mutation<null, void>({
      query: () => ({
        url: '/sessions',
        method: 'DELETE',
      }),
    }),
    listChats: builder.query<ObjectList<'chats', Chat>, QueryFilter>({
      query: (filter) => ({ url: '/chats', params: filter }),
      providesTags: (result) => result?.chats.map(({ id }) => ({ type: 'chat', id })) ?? [],
    }),
    getChat: builder.query<Chat, PathParameter<'chat', Id | string>>({
      query: ({ chat }) => ({ url: `/chats/${chat}` }),
      providesTags: (result) => (result ? [{ type: 'chat', id: result.id }] : []),
    }),
    createChat: builder.mutation<null, ChatCreateBody>({
      query: (chat) => ({
        url: '/chats',
        method: 'POST',
        body: chat,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['chat']),
    }),
    listMessages: builder.query<
      ObjectList<'messages', Message>,
      PathParameter<'chat', Id> & QueryFilter
    >({
      query: ({ chat, ...filter }) => ({
        url: `/chats/${chat}/messages`,
        params: filter,
      }),
      providesTags: (result) => result?.messages.map(({ id }) => ({ type: 'message', id })) ?? [],
    }),
    getMessage: builder.query<Message, PathParameter<'chat' | 'message', Id>>({
      query: ({ chat, ...message }) => ({
        url: `/chats/${chat}/messages/${message}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'message', id: `${result.chat}.${result.id}` }] : [],
    }),
    createMessage: builder.mutation<Message, MessageCreateBody & PathParameter<'chat', Id>>({
      query: ({ chat, ...message }) => ({
        url: `/chats/${chat}/messages`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['message'],
    }),
    updateMessage: builder.mutation<Message, MessageUpdate & PathParameter<'chat' | 'message', Id>>(
      {
        query: ({ chat, message, ...update }) => ({
          url: `/chats/${chat}/messages/${message}`,
          method: 'POST',
          body: update,
        }),
        invalidatesTags: (result) =>
          result ? [{ type: 'message', id: `${result.chat}.${result.id}` }] : [],
      },
    ),
    deleteMessage: builder.mutation<null, PathParameter<'message' | 'chat', Id>>({
      query: ({ chat, message }) => ({
        url: `/chats/${chat}/messages/${message}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _, { chat, message }) =>
        result ? [{ type: 'message', id: `${chat}.${message}` }] : [],
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
