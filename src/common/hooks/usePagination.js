import { useCallback } from "react";
//import { useSearchParams } from "react-router-dom";
import useQueryParams from "./useQueryParams";

const defaultValues = { page: 1, perPage: 10 };

export function usePagination(defaults = defaultValues) {
  // const defaultParams = new URLSearchParams(defaults)
  // const [searchParams, setSearchParams] = useSearchParams(defaultParams);

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
