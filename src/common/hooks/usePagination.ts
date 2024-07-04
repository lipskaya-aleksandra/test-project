import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type PaginationConfig = {
  page: number;
  perPage: number;
};

function convertConfig(inputConfig: PaginationConfig): Record<string, string> {
  return {
    page: inputConfig.page.toString(),
    perPage: inputConfig.perPage.toString(),
  };
}

const defaultValues: PaginationConfig = { page: 1, perPage: 10 };
export const defaultSearchParams = convertConfig(defaultValues);

export function usePagination(
  defaults: PaginationConfig = defaultValues
): [PaginationConfig, (newParams: Partial<PaginationConfig>) => void] {
  const defaultParams = new URLSearchParams(convertConfig(defaults));
  const [searchParams, setSearchParams] = useSearchParams(defaultParams);

  const getCurrentParams = useCallback(() => {
    const params = {} as PaginationConfig;

    for (const [key, value] of searchParams.entries()) {
      params[key as keyof PaginationConfig] = parseInt(value, 10);
    }

    return params;
  }, [searchParams]);

  const updatePageParams = useCallback(
    //Record<keyof PaginationConfig, string>
    (newParams: Partial<PaginationConfig>) => {
      setSearchParams(convertConfig({ ...getCurrentParams(), ...newParams }));
    },
    [getCurrentParams, setSearchParams]
  );

  return [getCurrentParams(), updatePageParams];
}
