import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseServerUrl } from '../../constants/server';
import useApiClient from '../../common/hooks/useApiClient';

export function useEditUser(id, options) {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const editUserFn = async (updatedUser) => {
    const response = await apiClient.patch(`/users/${id}`, updatedUser);

    return response;
  };

  return useMutation({
    mutationFn: editUserFn,
    onSettled: () => {
      queryClient.invalidateQueries(['users', id]);
    },
    ...options,
  });
}
