import { useMutation, useQueryClient } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useCreateUser(options) {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const createUserFn = async user => {
    const response = await apiClient.post('/users', user);

    return response;
  };

  return useMutation({
    mutationFn: createUserFn,
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
    ...options,
  });
}
