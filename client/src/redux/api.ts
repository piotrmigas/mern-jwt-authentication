import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<User, User>({
      query: (data) => ({
        url: '/auth',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation<User, User>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
    }),
    updateProfile: builder.mutation<User, User>({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation } = api;
