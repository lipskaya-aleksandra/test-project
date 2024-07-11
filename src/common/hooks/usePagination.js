import { useCallback } from "react";
import useQueryParams from "./useQueryParams";

export const defaultValues = { page: 1, perPage: 10 };

export function usePagination(defaults = defaultValues) {
  const [searchParams, setSearchParams] = useQueryParams(defaults);

  const getCurrentParams = useCallback(() => {
    const params = {};

    for (const [key, value] of Object.entries(searchParams)) {
      params[key] = parseInt(value, 10);
    }

    return params;
  }, [searchParams]);

  const updatePageParams = useCallback(
    (newParams) => {
      setSearchParams({ ...getCurrentParams(), ...newParams });
    },
    [getCurrentParams, setSearchParams]
  );

  return [getCurrentParams(), updatePageParams];
}
