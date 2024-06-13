import { Await, useLoaderData, json, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography, Pagination } from "@mui/material";
import PostsList from "./PostsList.jsx";
import { postApi } from "./postApiSlice";
import store, { injectReducer } from "../common/store/config";
import { usePagination } from "../common/hooks/usePagination.js";

export default function PostsPage() {
  //const [page, setPage] = useState(1);
  const [pageParams, setPageParams] = usePagination();
  const navigate = useNavigate();
  const { posts } = useLoaderData();
  return (
    <Suspense fallback={<Typography>Loading users...</Typography>}>
      <Await
        resolve={posts}
        errorElement={<Typography>Could not load users</Typography>}
      >
        {(resolvedPosts) => (
          <>
            <PostsList posts={resolvedPosts} />
            <Pagination
              count={10}
              page={pageParams.page}
              onChange={(e, value) => {
                navigate(`/posts`);
                setPageParams({ page: value });
              }}
            />
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function postsLoader({ request }) {
  try {
    //store.reducerManager.add(postApi.reducerPath, postApi.reducer);
    //const { page } = params;
    //injectReducer(postApi.reducerPath, postApi.reducer);
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");
    const perPage = searchParams.get("perPage");
    const response = await store
      .dispatch(postApi.endpoints.getPosts.initiate({ page, perPage }))
      .unwrap();

    return { posts: response.items };
  } catch (e) {
    console.log(e);
    throw json(
      { message: "Error occured while fetching posts" },
      { status: e.status }
    );
  }
}
