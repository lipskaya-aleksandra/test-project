import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Root, { rootLoader } from "./common/Root";
import UsersPage, { usersLoader } from "./users/UsersPage";
import store from "./common";
import PostsPage, { postsLoader } from "./posts/PostsPage";
import DefaultPageRedirect from "./common/DefaultPageRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "users",
        //loader: usersLoader,
        element: (
          // <DefaultPageRedirect path="users">
          //   <UsersPage />
          // </DefaultPageRedirect>
          <p>users</p>
        ),
      },
      // {
      //   path: "posts/:page",
      //   loader: postsLoader,
      //   element: (
      //     <DefaultPageRedirect path="posts">
      //       <PostsPage />
      //     </DefaultPageRedirect>
      //   ),
      // },
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
