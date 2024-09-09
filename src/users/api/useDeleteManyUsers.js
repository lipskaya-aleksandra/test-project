import { useMutation, useQueryClient } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useDeleteManyUsers(options) {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const deleteUserFn = async ids => {
    const response = await apiClient.delete('/users', { data: ids });

    return response;
  };

  return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    ...options,
  });
}
