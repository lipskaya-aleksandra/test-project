import { useState } from 'react';
import { useEffect } from 'react';

export default function useDebouncedValue(value, timeout) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [value, timeout]);

  return debouncedValue;
}
