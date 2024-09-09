import useApiClient from '../../common/hooks/useApiClient';

export function useSignUp() {
  const apiClient = useApiClient();

  const signUp = async credentials => {
    const response = await apiClient.post(`/auth/signup`, credentials);

    return response;
  };

  return signUp;
}
