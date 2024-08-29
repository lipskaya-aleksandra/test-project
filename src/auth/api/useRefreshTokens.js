import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useApiClient from '../../common/hooks/useApiClient';

export function useRefreshTokens() {
  const navigate = useNavigate();
  const apiClient = useApiClient();

  const refreshTokens = useCallback(async () => {
    try {
      const response = await apiClient.post('/auth/refresh-tokens');

      return response;
    } catch (err) {
      navigate('/login', { replace: true });

      throw err;
    }
  }, [navigate, apiClient]);

  return refreshTokens;
}
