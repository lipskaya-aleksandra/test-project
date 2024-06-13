import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.stackexchange.com/2.3/",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page) => ({
        url: "users",
        params: {
          page,
          pagesize: 10,
          site: "stackoverflow",
        },
      }),
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUsers, useGetUserById } = userApi;
