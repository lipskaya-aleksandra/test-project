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
  console.assert(
    Object.values(defaults).filter(
      (v) => typeof v === 'string' || isArrayOfStrings(v),
    ).length === Object.values(defaults).length,
    { defaults, message: '4itaj doku' },
  );

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

  return [{ ...getCurrentParams(false) }, updateParams];
}
