import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

function mapDefaults(params) {
  const defaults = {};
  for (const [key, value] of Object.entries(params)) {
    defaults[key] = value || [];
  }
  return defaults;
}

const isArrayOfStrings = (source) =>
  Array.isArray(source) &&
  (source.filter((v) => typeof v === 'string') || source.length === 0);

export default function useQueryParams(defaults) {
  const mappedDefaults = mapDefaults(defaults);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentParams = useCallback(
    (includesAll) => {
      const params = {};

      for (const key of searchParams.keys()) {
        if (!(key in defaults) && !includesAll) {
          continue;
        }

        const value = Array.isArray(defaults[key])
          ? searchParams.getAll(key)
          : searchParams.get(key);

        params[key] = value;
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
          updatedParams[key] = value || mappedDefaults[key];
        }
      }

      setSearchParams({
        ...getCurrentParams(true),
        ...updatedParams,
      });
    },
    [getCurrentParams, setSearchParams, defaults],
  );

  return [getCurrentParams(false), updateParams];
}
