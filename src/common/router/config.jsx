import { createBrowserRouter } from 'react-router-dom';

import AccountPage from '../../account/pages/AccountPage';
import AuthedPasswordResetPage from '../../account/pages/AuthedPasswordResetPage';
import LoginPage from '../../auth/pages/LoginPage';
import PasswordResetPage from '../../auth/pages/PasswordResetPage';
import RequestPasswordResetPage from '../../auth/pages/RequestPasswordResetPage';
import SignUpPage from '../../auth/pages/SignUpPage';
import PostsPage from '../../posts/PostsPage';
import CreateUserPage from '../../users/pages/CreateUserPage';
import EditUserPage from '../../users/pages/EditUserPage';
import UserDetailPage from '../../users/pages/UserDetailPage';
import UsersPage from '../../users/pages/UsersPage';
import Root, { rootLoader } from '../components/Root';

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
        path: 'account',
        children: [
          {
            index: true,
            element: <AccountPage />,
          },
          {
            path: 'reset-password',
            element: <AuthedPasswordResetPage />,
          },
        ],
      },
      {
        path: 'posts',
        element: <PostsPage />,
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
