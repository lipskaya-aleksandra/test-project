import useApiClient from '../../common/hooks/useApiClient';

export function useRefreshTokens() {
  const apiClient = useApiClient();

  const refreshTokens = async data => {
    const response = await apiClient.post(`/auth/refresh-tokens`, {
      data,
    });

    return response;
  };

  return refreshTokens;
}
