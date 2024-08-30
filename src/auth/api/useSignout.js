import useApiClient from '../../common/hooks/useApiClient';

export function useSignout() {
  const apiClient = useApiClient();

  const signout = async () => {
    const response = await apiClient.post(`/auth/signout`);

    return response;
  };

  return signout;
}
