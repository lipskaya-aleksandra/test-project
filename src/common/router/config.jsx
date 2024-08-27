import { createBrowserRouter } from 'react-router-dom';

import Root, { rootLoader } from '../components/Root';
import UsersPage from '../../users/pages/UsersPage';
import PostsPage from '../../posts/PostsPage';
import UserDetailPage from '../../users/pages/UserDetailPage';
import LoginPage from '../../users/pages/LoginPage';
import CreateUserPage from '../../users/pages/CreateUserPage';
import EditUserPage from '../../users/pages/EditUserPage';
import SignUpPage from '../../users/pages/SignUpPage';
import RequestPasswordResetPage from '../../users/pages/RequestPasswordResetPage';
import PasswordResetPage from '../../users/pages/PasswordResetPage';

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
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/request-password-reset',
    element: <RequestPasswordResetPage />,
  },
  {
    path: '/password-reset',
    element: <PasswordResetPage />,
  },
]);

export { router };
