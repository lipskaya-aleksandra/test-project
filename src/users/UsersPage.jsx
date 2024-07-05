import { Await, useLoaderData, Link, json, defer } from "react-router-dom";
import { Suspense } from "react";
import { TablePagination, Alert } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";

import Table from "../common/components/Table.jsx";
import store, { injectReducer } from "../common/store/config";
import { userApi } from "./userApiSlice";
import { usePagination } from "../common/hooks/usePagination.js";
import FilterWidget from "../common/components/filter/FilterWidget.jsx";
import Select from "../common/components/filter/Select.jsx";
import FilterResults from "../common/components/filter/FilterResults.jsx";

const columnHelper = createColumnHelper();

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

export default function UsersPage() {
  const [pageParams, setPageParams] = usePagination();
  const { users } = useLoaderData();
  return (
    <>
      <FilterWidget>
        <Select
          label={"Badge"}
          options={["bronze", "silver", "gold"]}
          placeholder={"Choose badge"}
          filter="badge"
          defaultFilter={{ badge: null }}
        />
        {/* <FilterResults defaultFilters={{ badge: null }} /> */}
      </FilterWidget>
      <Suspense
        fallback={
          <Table
            columns={columns}
            pageSize={pageParams.perPage}
            loading={true}
          />
        }
      >
        <Await
          resolve={users}
          errorElement={<Alert severity="error">Could not load users</Alert>}
        >
          {(resolvedUsers) => (
            <Table data={resolvedUsers.items} columns={columns} />
          )}
        </Await>
      </Suspense>
      <TablePagination
        component="div"
        count={100}
        page={pageParams.page - 1}
        onPageChange={(e, value) => {
          setPageParams({ page: value + 1 });
        }}
        rowsPerPage={pageParams.perPage}
        onRowsPerPageChange={(e) => {
          setPageParams({ perPage: e.target.value, page: 1 });
        }}
      />
    </>
  );
}

export async function usersLoader({ request }) {
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
      { message: "Error occured while fetching users" },
      { status: e.status }
    );
  }
}
