import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

function mapDefaults(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, value || []]),
  );
}

export default function useQueryParams({
  defaults = {},
  allowOverrideKeys = [],
}) {
  const mappedDefaults = mapDefaults(defaults);
  const [searchParams, setSearchParams] = useSearchParams(mappedDefaults);

  const getCurrentParams = useCallback(
    includesAll => {
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
    [defaults, searchParams, mappedDefaults],
  );

  const updateParams = useCallback(
    newParams => {
      const updatedParams = {};

      for (const [key, value] of Object.entries(newParams)) {
        if (key in defaults || allowOverrideKeys.includes(key)) {
          updatedParams[key] = value || mappedDefaults[key];
        }
      }

      setSearchParams({
        ...getCurrentParams(true),
        ...updatedParams,
      });
    },
    [
      getCurrentParams,
      setSearchParams,
      defaults,
      mappedDefaults,
      allowOverrideKeys,
    ],
  );

  return useMemo(
    () => ({
      queryParams: getCurrentParams(false),
      setQueryParams: updateParams,
    }),
    [getCurrentParams, updateParams],
  );
}
