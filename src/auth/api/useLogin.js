import { useMutation } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useLogin() {
  const apiClient = useApiClient();

  const login = async credentials => {
    const response = await apiClient.post(`/auth/login`, credentials);

    return response;
  };

  return useMutation({ mutationKey: ['users', 'login'], mutationFn: login });
}
