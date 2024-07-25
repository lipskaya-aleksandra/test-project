import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    //baseUrl: 'https://api.stackexchange.com/2.3/',
    baseUrl: 'http://localhost:3000/',
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, perPage }) => ({
        url: 'users',
        params: {
          page,
          perPage,
        },
      }),
    }),
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `users/${id}`,
      }),
    }),
    addUser: builder.mutation({
      query: ({ user }) => ({
        url: `users`,
        method: 'POST',
        body: JSON.stringify(user),
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'PATCH',
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAddUserMutation,
} = userApi;
