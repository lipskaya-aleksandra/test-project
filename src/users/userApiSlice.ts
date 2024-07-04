import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./UserType";
import { PaginationConfig } from "../common/hooks/usePagination";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.stackexchange.com/2.3/",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], PaginationConfig>({
      query: ({ page, perPage }) => ({
        url: "users",
        params: {
          page,
          pagesize: perPage,
          site: "stackoverflow",
        },
      }),
    }),
    getUserById: builder.query<User, { id: number }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        params: {
          site: "stackoverflow",
        },
      }),
    }),
  }),
});

export const { useGetUsers } = userApi;

export const useGetUserById = userApi.endpoints.getUserById.useQuery;
