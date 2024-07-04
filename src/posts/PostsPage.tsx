import {
  Await,
  useLoaderData,
  json,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Suspense } from "react";
import { Typography, TablePagination } from "@mui/material";
import PostsList from "./PostsList.js";
import { postApi } from "./postApiSlice.js";
import store, { injectReducer } from "../common/store/config.js";
import { usePagination } from "../common/hooks/usePagination.js";
import { Post } from "./PostType.js";

type LoaderData = {
  posts: Post[];
};

export default function PostsPage() {
  const [pageParams, setPageParams] = usePagination();
  const { posts } = useLoaderData() as LoaderData;
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
              }}
              rowsPerPage={pageParams.perPage}
              onRowsPerPageChange={(e) => {
                setPageParams({ perPage: parseInt(e.target.value), page: 1 });
              }}
            />
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function postsLoader(loaderParams: LoaderFunctionArgs) {
  const { request } = loaderParams;
  try {
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
      { message: "Error occured while fetching posts" }
      //{ status: e.status }
    );
  }
}
