import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetPosts(params, options) {
  const getPostsFn = async () => {
    const response = await axios.get(
      'https://api.stackexchange.com/2.3/questions',
      {
        params: {
          page: params.page,
          pagesize: params.perPage,
          site: 'stackoverflow',
        },
      },
    );

    return response.data.items;
  };

  return useSuspenseQuery({
    queryKey: ['posts', params],
    queryFn: getPostsFn,
    ...options,
  });
}
