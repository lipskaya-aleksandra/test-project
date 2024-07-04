import {
  useLoaderData,
  json,
  defer,
  Await,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Suspense } from "react";
import store, { injectReducer } from "../common/store/config";
import { userApi } from "./userApiSlice";
import { Alert } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "./UserType";

type LoaderData = {
  user: User;
};

export default function UserDetailPage() {
  const { user } = useLoaderData() as LoaderData;
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

export async function userDetailLoader(
  loaderParams: LoaderFunctionArgs
): Promise<any> {
  const { params } = loaderParams;
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
      { message: "Error occured while fetching user details" }
      //{ status: e.status }
    );
  }
}
