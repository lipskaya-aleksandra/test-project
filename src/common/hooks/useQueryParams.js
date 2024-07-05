import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useQueryParams(defaults) {
  const mappedDefaults = {};
  for (const [key, value] of Object.entries(defaults)) {
    mappedDefaults[key] = value || [];
  }
  const defaultParams = new URLSearchParams(mappedDefaults);
  const [searchParams, setSearchParams] = useSearchParams(defaultParams);

  const getCurrentParams = useCallback(
    (getAll) => {
      const params = {};

      for (const [key, value] of searchParams.entries()) {
        if ((!defaults || (defaults && key in defaults) || getAll) && value) {
          params[key] = value;

          console.log({ value, getAll: searchParams.getAll(key) });
        }
      }

      return { ...mappedDefaults, ...params };
    },
    [defaults, searchParams]
  );

  const updateParams = useCallback(
    (newParams) => {
      let validParams = {};
      for (const [key, value] of Object.entries(newParams)) {
        if (key in defaults) {
          validParams[key] = value || [];
        }
      }

      setSearchParams({ ...getCurrentParams(true), ...validParams });
    },
    [getCurrentParams, setSearchParams, defaults]
  );

  return [{ ...getCurrentParams(false) }, updateParams];
}
