import { createBrowserRouter } from 'react-router-dom';

import AccountPage from '../../account/pages/AccountPage';
import AuthedPasswordResetPage from '../../account/pages/AuthedPasswordResetPage';
import LoginPage from '../../auth/pages/LoginPage';
import PasswordResetPage from '../../auth/pages/PasswordResetPage';
import RequestPasswordResetPage from '../../auth/pages/RequestPasswordResetPage';
import SignUpPage from '../../auth/pages/SignUpPage';
import PostsPage from '../../posts/PostsPage';
import UserCardFallback from '../../users/components/UserCardFallback';
import CreateUserPage from '../../users/pages/CreateUserPage';
import EditUserPage from '../../users/pages/EditUserPage';
import UserDetailPage from '../../users/pages/UserDetailPage';
import UsersPage from '../../users/pages/UsersPage';
import CenteredContentLayout from '../components/CenteredContentLayout';
import QueryWrapper from '../components/QueryWrapper';
import Root, { rootLoader } from '../components/Root';
import Error404Fallback from '../components/fallbacks/Error404Fallback';

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
            element: <CenteredContentLayout />,
            children: [
              {
                path: ':userId',
                element: (
                  <QueryWrapper
                    suspenseFallback={<UserCardFallback />}
                    errorFallback={<Error404Fallback />}
                  >
                    <UserDetailPage />
                  </QueryWrapper>
                ),
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
        ],
      },
      {
        path: 'account',
        element: <CenteredContentLayout />,
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
    element: <CenteredContentLayout />,
    children: [
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
    ],
  },
]);

export { router };
