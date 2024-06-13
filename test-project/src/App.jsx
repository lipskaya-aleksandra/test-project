import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Root, { rootLoader } from "./common/components/Root.jsx";
import UsersPage, { usersLoader } from "./users/UsersPage.jsx";
import { store } from "./common/store/index.js";
import PostsPage, { postsLoader } from "./posts/PostsPage.jsx";
import DefaultPageRedirect from "./common/components/DefaultPageRedirect.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, loader: rootLoader },
      {
        path: "users",
        loader: usersLoader,
        element: (
          <DefaultPageRedirect path="users">
            <UsersPage />
          </DefaultPageRedirect>
        ),
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

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
