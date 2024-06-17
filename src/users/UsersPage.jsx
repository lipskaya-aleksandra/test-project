import {
  Await,
  useLoaderData,
  useNavigate,
  json,
  defer,
} from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography, TablePagination, Alert } from "@mui/material";
import UsersTable from "./UsersTable.jsx";
import store, { injectReducer } from "../common/store/config";
import { userApi } from "./userApiSlice";
import { usePagination } from "../common/hooks/usePagination.js";

export default function UsersPage() {
  const [pageParams, setPageParams] = usePagination();
  const { users } = useLoaderData();
  return (
    <Suspense
      fallback={<UsersTable pageSize={pageParams.perPage} loading={true} />}
    >
      <Await
        resolve={users}
        errorElement={<Alert severity="error">Could not load users</Alert>}
      >
        {(resolvedUsers) => (
          <>
            <UsersTable users={resolvedUsers.items} />
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

export async function usersLoader({ request, params }) {
  try {
    //store.reducerManager.add(userApi.reducerPath, userApi.reducer);
    injectReducer(userApi.reducerPath, userApi.reducer);
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");
    const perPage = searchParams.get("perPage");
    const response = store //await
      .dispatch(userApi.endpoints.getUsers.initiate({ page, perPage }))
      .unwrap();

    return defer({ users: response }); //.items
  } catch (e) {
    console.log(e);
    throw json(
      { message: "Error occured while fetching users" },
      { status: e.status }
    );
  }
}
