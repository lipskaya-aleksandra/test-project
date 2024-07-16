import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

function mapDefaults(params) {
  const defaults = {};
  for (const [key, value] of Object.entries(params)) {
    defaults[key] = value.toString() || [];
  }
  return defaults;
}

export default function useQueryParams(defaults) {
  const mappedDefaults = mapDefaults(defaults);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentParams = useCallback(
    (includesAll) => {
      const params = {};
      for (const key of searchParams.keys()) {
        const value = Array.isArray(defaults[key])
          ? searchParams.getAll(key)
          : searchParams.get(key);
        if (
          (!defaults || (defaults && key in defaults) || includesAll) &&
          value
        ) {
          params[key] = value;
        }
      }
      return { ...mappedDefaults, ...params };
    },
    [defaults, searchParams],
  );

  const updateParams = useCallback(
    (newParams) => {
      const updatedParams = {};
      for (const [key, value] of Object.entries(newParams)) {
        if (key in defaults) {
          updatedParams[key] = value.toString() || mappedDefaults[key];
        }
      }
      setSearchParams({
        ...getCurrentParams(true),
        ...updatedParams,
      });
    },
    [getCurrentParams, setSearchParams, defaults],
  );

  return [{ ...getCurrentParams(false) }, updateParams];
}
