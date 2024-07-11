import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

function mapDefaults(params) {
  const defaults = {};
  for (const [key, value] of Object.entries(params)) {
    // if (Array.isArray(value)) {
    defaults[key] = value || [];
    // } else {
    //   defaults[key] = value || '';
    // }
  }
  return defaults;
}

export default function useQueryParams(defaults) {
  const mappedDefaults = mapDefaults(defaults);
  //const defaultParams = new URLSearchParams(mappedDefaults);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentParams = useCallback(
    (getAll) => {
      const params = {};
      for (const key of searchParams.keys()) {
        const value = Array.isArray(defaults[key])
          ? searchParams.getAll(key)
          : searchParams.get(key);
        if ((!defaults || (defaults && key in defaults) || getAll) && value) {
          params[key] = value;
        }
      }
      return { ...mappedDefaults, ...params };
    },
    [defaults, searchParams],
  );

  const updateParams = useCallback(
    (newParams) => {
      const validParams = {};
      for (const [key, value] of Object.entries(newParams)) {
        if (key in defaults) {
          validParams[key] = value || mappedDefaults[key];
        }
      }
      setSearchParams({
        ...getCurrentParams(true),
        ...validParams,
      });
    },
    [getCurrentParams, setSearchParams, defaults],
  );

  return [{ ...getCurrentParams(false) }, updateParams];
}
