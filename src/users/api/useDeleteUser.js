import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseServerUrl } from '../../common/constants/server';
import useApiClient from '../../common/hooks/useApiClient';

export function useDeleteUser(options) {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const deleteUserFn = async (id) => {
    const response = await apiClient.delete(`/users/${id}`);

    return response;
  };

  return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    ...options,
  });
}
