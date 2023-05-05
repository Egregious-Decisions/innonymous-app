import { SerializedError } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AuthResponse, AuthBody, Chat, Message, MessageUpdate } from './models';

//const { API_ROOT } = process.env;
const API_ROOT = 'TODO';

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
  tagTypes: ['Chats', 'Messages'],
  endpoints: (builder) => ({
    authenticate: builder.mutation<AuthResponse, AuthBody>({
      query: (auth) => ({
        url: '/auth',
        method: 'POST',
        body: auth,
      }),
      invalidatesTags: ['Chats', 'Messages'],
    }),
    listChats: builder.query<Chat[], void>({
      query: () => ({ url: '/chats' }),
      providesTags: ['Chats'],
    }),
    getChat: builder.query<Chat, string>({
      query: (id) => ({ url: `/chats/${id}` }),
    }),
    createChat: builder.mutation<null, Chat>({
      query: (chat) => ({
        url: '/chats',
        method: 'POST',
        body: chat,
      }),
      invalidatesTags: ['Chats'],
    }),
    createMessage: builder.mutation<null, Message>({
      query: (message) => ({
        url: `/messages`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    updateMessage: builder.mutation<null, MessageUpdate>({
      query: ({ id, ...update }) => ({
        url: `/messages/${id}`,
        method: 'POST',
        body: update,
      }),
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation<null, string>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

const getFetchErrorMessage = (error: FetchBaseQueryError) => {
  if ('error' in error) {
    return error.error;
  }

  const { detail } = error.data as { detail?: string };

  return detail || JSON.stringify(error.data);
};

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    return getFetchErrorMessage(error);
  }

  const message = error.message || 'Unknown error';

  if (error.code === undefined) {
    return message;
  }

  return `${message} (code ${error.code})`;
};
