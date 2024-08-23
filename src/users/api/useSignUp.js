import useApiClient from '../../common/hooks/useApiClient';

export function useSignUp() {
  const apiClient = useApiClient();

  const signUp = async (credentials) => {
    console.log(credentials);
    const response = await apiClient.post(`/auth/signup`, credentials);

    return response.data;
  };

  return signUp;
}
