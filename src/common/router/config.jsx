import { createBrowserRouter } from 'react-router-dom';

import Root, { rootLoader } from '../components/Root';
import UsersPage from '../../users/pages/UsersPage';
import PostsPage from '../../posts/PostsPage';
import UserDetailPage from '../../users/pages/UserDetailPage';
import RedirectToCurrentPagination from '../components/RedirectToCurrentPagination';
import LoginPage from '../../users/pages/LoginPage';
import CreateUserPage from '../../users/pages/CreateUserPage';
import EditUserPage from '../../users/pages/EditUserPage';

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
            element: <UsersPage />,
          },
          {
            path: ':userId',
            element: <UserDetailPage />,
          },
          {
            path: 'edit/:userId',
            element: <EditUserPage />,
          },
          {
            path: 'create',
            element: <CreateUserPage />,
          },
        ],
      },
      {
        path: 'posts',
        //loader: postsLoader,
        element: (
          //<RedirectToCurrentPagination path="posts">
          <PostsPage />
          //</RedirectToCurrentPagination>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export { router };
