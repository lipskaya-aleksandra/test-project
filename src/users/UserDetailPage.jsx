import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import store, { injectReducer } from "../common/store/config";
import { userApi } from "./userApiSlice";
import { Alert } from "@mui/material";
import UserCardFallback from "./UserCardFallback";
import UserCard from "./UserCard";

export default function UserDetailPage() {
  const { user } = useLoaderData();
  return (
    <Suspense fallback={<UserCard loading={true} />}>
      <Await
        resolve={user}
        errorElement={
          <Alert severity="error">Could not load user details</Alert>
        }
      >
        {(resolvedUser) => <UserCard user={resolvedUser.items[0]} />}
      </Await>
    </Suspense>
  );
}

export function userDetailLoader({ params }) {
  try {
    injectReducer(userApi.reducerPath, userApi.reducer);
    const { userId } = params;
    const response = store
      .dispatch(userApi.endpoints.getUserById.initiate({ id: userId }))
      .unwrap();

    return defer({ user: response });
  } catch (e) {
    console.log(e);
    throw json(
      { message: "Error occured while fetching user details" },
      { status: e.status }
    );
  }
}
