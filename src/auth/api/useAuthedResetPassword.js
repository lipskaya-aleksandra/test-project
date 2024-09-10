import { useMutation } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useAuthedResetPassword() {
  const apiClient = useApiClient();

  const resetPassword = async data => {
    const response = await apiClient.post(`/auth/authed-reset-password`, data);

    return response;
  };

  return useMutation({
    mutationFn: resetPassword,
  });
}
