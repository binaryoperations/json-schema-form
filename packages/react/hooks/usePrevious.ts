import { useLayoutEffect } from 'react';
import { useRef } from './useRef';

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>(value);

  // this hook runs before any use effect, so set the previous value.
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export default usePrevious;
