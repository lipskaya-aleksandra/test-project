import { Await, useLoaderData, json, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography, TablePagination } from "@mui/material";
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
            <TablePagination
              component="div"
              count={100}
              page={pageParams.page - 1}
              onPageChange={(e, value) => {
                setPageParams({ page: value + 1 });
                //navigate(`/users?page=${value}&perPage=${pageParams.perPage}`);
              }}
              rowsPerPage={pageParams.perPage}
              onRowsPerPageChange={(e) => {
                setPageParams({ perPage: e.target.value, page: 1 });
                //navigate(`/users?page=${value}&perPage=${pageParams.perPage}`);
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
    injectReducer(postApi.reducerPath, postApi.reducer);
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
