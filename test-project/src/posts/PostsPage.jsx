import { Await, useLoaderData, json, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography, Pagination } from "@mui/material";
import PostsList from "./PostsList.jsx";
import { postApi } from "./postApiSlice";
import store from "../common/store/config";

export default function PostsPage() {
  const [page, setPage] = useState(1);
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
              page={page}
              onChange={(e, value) => {
                setPage(value);
                navigate(`/posts/${value}`);
              }}
            />
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function postsLoader({ params }) {
  try {
    const { page } = params;
    const response = await store
      .dispatch(postApi.endpoints.getPosts.initiate(page))
      .unwrap();

    return { posts: response.items };
  } catch (e) {
    throw json(
      { message: "Error occured while fetching posts" },
      { status: e.status }
    );
  }
}
