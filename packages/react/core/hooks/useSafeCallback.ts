import { useCallback } from 'react';

import useValue from './useValue';

/**
 *
 * @template  {function} T
 * @param {T} func
 * @returns {T}
 */

export const useSafeCallback = <F extends (...any: any[]) => any>(func: F) => {
  const latestFunc = useValue(func);
  if (typeof func !== 'function')
    throw new Error(
      'useSafeCallback accepts exactly one argument of type function'
    );

  return useCallback(
    (...args: Parameters<F>) => {
      // there is a posibility that the latest function has been called AFTER unmount.
      return latestFunc.value?.(...args) as ReturnType<F>;
    },
    [latestFunc]
  );
};

export default useSafeCallback;
