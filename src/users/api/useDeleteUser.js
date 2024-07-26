import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseServerUrl } from '../../constants/server';

export function useDeleteUser({ onSuccess }) {
  const queryClient = useQueryClient();

  const deleteUserFn = async (id) => {
    const response = await fetch(`${baseServerUrl}/users/${id}`, {
      mode: 'cors',
      method: 'DELETE',
    });
    return response;
  };

  return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
    },
    onSuccess,
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
