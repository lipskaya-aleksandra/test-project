import {
  Await,
  useLoaderData,
  Link,
  json,
  defer,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Suspense } from "react";
import { TablePagination, Alert, Skeleton } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";

import Table from "../common/components/table/Table.js";
import store, { injectReducer } from "../common/store/config.js";
import { userApi } from "./userApiSlice.js";
import { usePagination } from "../common/hooks/usePagination.js";
import { User } from "./UserType.js";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("user_id", {
    cell: (info) => info.getValue(),
    header: () => <span>id</span>,
  }),
  columnHelper.accessor("display_name", {
    cell: (info) => (
      <Link to={`/users/${info.row.original.user_id}`}>{info.getValue()}</Link>
    ),

    header: () => <span>username</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("creation_date", {
    header: () => <span>created</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: () => <span>type</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_access_date", {
    header: () => <span>last online</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location", {
    header: () => <span>location</span>,
    cell: (info) => info.getValue(),
  }),
];

type LoaderData = {
  users: User[];
};

export default function UsersPage() {
  const [pageParams, setPageParams] = usePagination();
  const { users } = useLoaderData() as LoaderData;

  const renderAvatarFallback = (cell: { column: { id: string } }) => {
    if (cell.column.id === "profile_image") {
      return <Skeleton variant="circular" width={40} height={40} />;
    }

    return null;
  };

  return (
    <Suspense
      fallback={
        <Table columns={columns} pageSize={pageParams.perPage} loading={true} />
      }
    >
      <Await
        resolve={users}
        errorElement={<Alert severity="error">Could not load users</Alert>}
      >
        {(resolvedUsers) => (
          <>
            <Table
              renderFallback={renderAvatarFallback}
              data={resolvedUsers.items}
              columns={columns}
            />

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

export async function usersLoader(
  loaderParams: LoaderFunctionArgs
): Promise<any> {
  const { request } = loaderParams;
  try {
    injectReducer(userApi.reducerPath, userApi.reducer);
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");
    const perPage = searchParams.get("perPage");
    const response = store
      .dispatch(userApi.endpoints.getUsers.initiate({ page, perPage }))
      .unwrap();

    return defer({ users: response });
  } catch (e) {
    console.log(e);
    throw json(
      { message: "Error occured while fetching users" }
      //{ status: e.status }
    );
  }
}
