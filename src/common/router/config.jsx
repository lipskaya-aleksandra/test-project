import { createBrowserRouter } from 'react-router-dom';

import Root, { rootLoader } from '../components/Root';
import UsersPage, { usersLoader } from '../../users/UsersPage';
import PostsPage, { postsLoader } from '../../posts/PostsPage';
import UserDetailPage, { userDetailLoader } from '../../users/UserDetailPage';
import RedirectToCurrentPagination from '../components/RedirectToCurrentPagination';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, loader: rootLoader },
      {
        path: 'users',
        children: [
          {
            index: true,
            loader: usersLoader,
            element: (
              <RedirectToCurrentPagination path="users">
                <UsersPage />
              </RedirectToCurrentPagination>
            ),
          },
          {
            path: ':userId',
            loader: userDetailLoader,
            element: <UserDetailPage />,
          },
        ],
      },
      {
        path: 'posts',
        loader: postsLoader,
        element: (
          <RedirectToCurrentPagination path="posts">
            <PostsPage />
          </RedirectToCurrentPagination>
        ),
      },
    ],
  },
]);

export { router };
