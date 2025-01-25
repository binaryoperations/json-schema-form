import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import useRef from '../../core/hooks/useRef';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { ActiveStateProvider } from './ActiveStateContext';
import type {
  ActiveStateContextPropsMultiple,
  ActiveStateContextPropsSingle,
  ActiveStateProps,
  ActiveStateType,
} from './types';

export const usePrepareContextValue = (props: ActiveStateProps) => {
  const defaultValue = useRef(props.defaultValue).current;
  const value = props.value ?? defaultValue;
  return useMemo(() => {
    const activeState = Array.isArray(value)
      ? value
      : !value && isNaN(Number(value ?? NaN))
        ? []
        : [value!];

    return { activeState, multiple: props.multiple };
  }, [value, props.multiple]);
};

export default function useActiveStateContext(props: ActiveStateProps) {
  const activeState = usePrepareContextValue(props);
  const onChange = useSafeCallback((nextValue: ActiveStateType) => {
    if (props.multiple) {
      cast<ActiveStateContextPropsMultiple>(props).onChange?.(
        nextValue.activeState
      );
      return;
    }

    cast<ActiveStateContextPropsSingle>(props).onChange?.(
      nextValue.activeState![0]
    );
  });

  return {
    onChange,
    render: (children: ReactNode) => (
      <ActiveStateProvider
        value={activeState}
        onChange={props.onChange && onChange}
      >
        {children}
      </ActiveStateProvider>
    ),
  };
}
