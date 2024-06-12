import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Typography } from "@mui/material";
import PostsList from "./PostsList";
import { postApi } from "./postApiSlice";

export default function PostsPage() {
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
              onChange={() => {
                setPage((prevPage) => {
                  navigate(`/users/${prevPage + 1}`);
                  return prevPage + 1;
                });
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

    return response;
  } catch (e) {
    throw json(
      { message: "Error occured while fetching posts" },
      { status: e.status }
    );
  }
}
