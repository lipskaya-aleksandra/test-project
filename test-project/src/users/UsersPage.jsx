import { Await, useLoaderData, useNavigate, json } from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography, Pagination } from "@mui/material";
import UsersTable from "./UsersTable.jsx";
import store from "../common/store/config";
import { userApi } from "./userApiSlice";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
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
              page={page}
              onChange={(e, value) => {
                setPage(value);
                navigate(`/users/${value}`);
              }}
            />
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function usersLoader({ params }) {
  try {
    const { page } = params;
    const response = await store
      .dispatch(userApi.endpoints.getUsers.initiate(page))
      .unwrap();

    return { users: response.items };
  } catch (e) {
    throw json(
      { message: "Error occured while fetching users" },
      { status: e.status }
    );
  }
}
