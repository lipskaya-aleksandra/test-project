import { createBrowserRouter } from "react-router-dom";

import Root, { rootLoader } from "../components/Root";
import UsersPage, { usersLoader } from "../../users/UsersPage";
import PostsPage, { postsLoader } from "../../posts/PostsPage";
import UserDetailPage, { userDetailLoader } from "../../users/UserDetailPage";
import CurrentPageRedirect from "../components/CurrentPageRedirect";

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
              <CurrentPageRedirect path="users">
                <UsersPage />
              </CurrentPageRedirect>
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
          <CurrentPageRedirect path="posts">
            <PostsPage />
          </CurrentPageRedirect>
        ),
      },
    ],
  },
]);

export { router };
