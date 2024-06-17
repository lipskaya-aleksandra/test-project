import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.stackexchange.com/2.3/",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page, perPage }) => ({
        url: "questions",
        params: {
          page,
          pagesize: perPage,
          site: "stackoverflow",
        },
      }),
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useGetPosts, useGetPostById } = postApi;
