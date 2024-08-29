import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import useApiClient from '../../common/hooks/useApiClient';
import { useRefreshTokens } from '../api/useRefreshTokens';
import { ALLOWED_UNAUTHORIZED_URLS } from '../constants';

export default function useUnauthorizedInterceptor() {
  const apiClient = useApiClient();
  const refreshTokens = useRefreshTokens();
  const queryClient = useQueryClient();

  const interceptorRef = useRef(
    apiClient.interceptors.response.use(
      undefined,
      async error => {
        if (
          error.response.status === 401 &&
          !ALLOWED_UNAUTHORIZED_URLS.includes(error.config.url)
        ) {
          await refreshTokens();

          return apiClient.request(error.config);
        }

        return Promise.reject(error);
      },
      { synchronous: true },
    ),
  );

  useEffect(
    () => () => {
      apiClient.interceptors.response.eject(interceptorRef.current);
    },
    [apiClient, refreshTokens, queryClient],
  );
}
