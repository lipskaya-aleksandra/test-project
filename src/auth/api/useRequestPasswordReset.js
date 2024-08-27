import useApiClient from '../../common/hooks/useApiClient';

export function useRequestPasswordReset() {
  const apiClient = useApiClient();

  const requestPasswordReset = async data => {
    const response = await apiClient.post(`/auth/request-password-reset`, data);
    
return response.data;
  };

  return requestPasswordReset;
}
