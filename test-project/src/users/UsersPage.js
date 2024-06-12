import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { Typography } from "@mui/material";
import UsersList from "./UsersList";
import store from "../common";
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
            <UsersList users={resolvedUsers} />
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

export async function usersLoader({ params }) {
  try {
    console.log("in users loader");
    const { page } = params;
    const response = await store
      .dispatch(userApi.endpoints.getUsers.initiate(page))
      .unwrap();

    return response;
  } catch (e) {
    throw json(
      { message: "Error occured while fetching users" },
      { status: e.status }
    );
  }
}
