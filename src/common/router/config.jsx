import { createBrowserRouter } from "react-router-dom";

import Root, { rootLoader } from "../components/Root";
import UsersPage, { usersLoader } from "../../users/UsersPage";
import PostsPage, { postsLoader } from "../../posts/PostsPage";
import UserDetailPage, { userDetailLoader } from "../../users/UserDetailPage";
import DefaultPageRedirect from "../components/DefaultPageRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, loader: rootLoader },
      {
        path: "users",
        children: [
          {
            index: true,
            loader: usersLoader,
            element: (
              <DefaultPageRedirect path="users">
                <UsersPage />
              </DefaultPageRedirect>
            ),
          },
          {
            path: ":userId",
            loader: userDetailLoader,
            element: <UserDetailPage />,
          },
        ],
      },
      {
        path: "posts",
        loader: postsLoader,
        element: (
          <DefaultPageRedirect path="posts">
            <PostsPage />
          </DefaultPageRedirect>
        ),
      },
    ],
  },
]);

export { router };
