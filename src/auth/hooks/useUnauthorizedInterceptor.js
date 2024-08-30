import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import useApiClient from '../../common/hooks/useApiClient';
import { useRefreshTokens } from '../api/useRefreshTokens';
import { ALLOWED_UNAUTHORIZED_URLS } from '../constants';

export default function useUnauthorizedInterceptor() {
  const apiClient = useApiClient();
  const refreshTokens = useRefreshTokens();
  const queryClient = useQueryClient();

  useEffect(() => {
    const int = apiClient.interceptors.response.use(undefined, async error => {
      if (
        error.response.status === 401 &&
        !ALLOWED_UNAUTHORIZED_URLS.includes(error.config.url)
      ) {
        await refreshTokens();
      }

      return Promise.reject(error);
    });

    return () => {
      apiClient.interceptors.response.eject(int);
    };
  }, [apiClient, refreshTokens, queryClient]);
}
