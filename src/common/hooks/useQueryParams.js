import { useMemo } from 'react';
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

export default function useQueryParams(defaults = {}) {
  const mappedDefaults = mapDefaults(defaults);
  const [searchParams, setSearchParams] = useSearchParams(mappedDefaults);

  const getCurrentParams = useCallback(
    (includesAll) => {
      const params = {};

      for (const key of searchParams.keys()) {
        if (!(key in defaults) && !includesAll) {
          continue;
        }

        const getsValueAsArray =
          (defaults[key] && Array.isArray(defaults[key])) || !defaults[key];

        let value = getsValueAsArray
          ? searchParams.getAll(key)
          : searchParams.get(key);

        if (!defaults[key]) value = value.length === 1 ? value[0] : value;

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

  return useMemo(
    () => ({
      queryParams: getCurrentParams(false),
      setQueryParams: updateParams,
    }),
    [getCurrentParams, updateParams],
  );
}
