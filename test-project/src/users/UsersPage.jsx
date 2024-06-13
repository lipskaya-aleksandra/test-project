import { Await, useLoaderData, useNavigate, json } from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography, Pagination } from "@mui/material";
import UsersTable from "./UsersTable.jsx";
import store, { injectReducer } from "../common/store/config";
import { userApi } from "./userApiSlice";
import { usePagination } from "../common/hooks/usePagination.js";

export default function UsersPage() {
  //const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [pageParams, setPageParams] = usePagination();
  const { users } = useLoaderData();
  return (
    <Suspense fallback={<Typography>Loading users...</Typography>}>
      <Await
        resolve={users}
        errorElement={<Typography>Could not load users</Typography>}
      >
        {(resolvedUsers) => (
          <>
            <UsersTable users={resolvedUsers} />
            <Pagination
              count={10}
              page={pageParams.page}
              onChange={(e, value) => {
                navigate(`/users`);
                setPageParams({ page: value });
              }}
            />
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function usersLoader({ request }) {
  try {
    //store.reducerManager.add(userApi.reducerPath, userApi.reducer);
    //const { page } = params;
    //injectReducer(userApi.reducerPath, userApi.reducer);
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");
    const perPage = searchParams.get("perPage");
    const response = await store
      .dispatch(userApi.endpoints.getUsers.initiate({ page, perPage }))
      .unwrap();

    return { users: response.items };
  } catch (e) {
    console.log(e);
    throw json(
      { message: "Error occured while fetching users" },
      { status: e.status }
    );
  }
}
