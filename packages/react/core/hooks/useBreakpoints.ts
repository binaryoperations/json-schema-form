import type { Breakpoints } from '@binaryoperations/json-forms-core/models';
import { useMemo } from 'react';

import { useMediaQuery } from './useMediaQuery';

export function useBreakpoints<T extends {}, V = any>(
  props: T & { breakpoints?: Breakpoints<V> }
) {
  const { breakpoints, ...rest } = props;

  const { xs, sm, md, lg, xl } = {
    xs: useMediaQuery('(max-width: 460px)'),
    sm: useMediaQuery('(min-width: 460px) and (max-width: 787px)'),
    md: useMediaQuery('(max-width: 787px) and (max-width: 992px)'),
    lg: useMediaQuery('(max-width: 992px) and (max-width: 1280px)'),
    xl: useMediaQuery('(min-width: 1280px)'),
  };

  const currentBreakpoint = useMemo(() => {
    const breakpointsDefinitions = { xs, sm, md, lg, xl };
    const keys: (keyof Breakpoints)[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return keys.reduce((previous, key) => {
      if (breakpointsDefinitions[key])
        return breakpoints?.[key] ? key : previous;
      return previous;
    }, 'xs');
  }, [breakpoints, xs, sm, md, lg, xl]);

  const value = breakpoints?.[currentBreakpoint];

  return {
    value,
    props: rest,
    currentBreakpoint,
  };
}
