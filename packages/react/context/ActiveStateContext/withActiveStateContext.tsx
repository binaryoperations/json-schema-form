import { cast } from '@binaryoperations/json-forms-internals/cast';
import type { ComponentType } from 'react';
import { memo, useMemo } from 'react';

import useRef from '../../core/hooks/useRef';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { ID } from '../../type';
import {
  ActiveStateProvider,
  useActiveStateChange,
} from './ActiveStateContext';
import { ActiveStateType } from './types';

type P<T = ID> = {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  multiple?: boolean;
};

type PM<T = ID> = {
  defaultValue?: T | T[];
  value?: T | T[];
  onChange?: (value: T[]) => void;
  multiple: true;
};

type C<T> = ComponentType<T>;

export type ActiveStateProps<T = ID> = P<T> | PM<T>;

export type {
  PM as withActiveStateContextPropsMultiple,
  P as withActiveStateContextPropsSingle,
};

const usePrepareContextValue = (props: P | PM) => {
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

export function withActiveStateContext<
  T extends Record<string, any>,
  ComponentProps = T & Pick<Required<P>, 'onChange'>,
>(Component: C<ComponentProps>) {
  return Object.assign(
    memo(function WithActiveStateContext(props: T & ActiveStateProps) {
      const {
        onChange: onChangeProp,
        value: __,
        defaultValue: ___,
        ...restProps
      } = cast<ActiveStateProps>(props);
      const multiple = restProps.multiple;
      const onChange = useSafeCallback((nextValue: ActiveStateType) => {
        if (multiple) {
          cast<PM>(props).onChange?.(nextValue.activeState);
          return;
        }

        cast<P>(props).onChange?.(nextValue.activeState![0]);
      });

      return (
        <ActiveStateProvider
          value={usePrepareContextValue({ ...props, multiple })}
          onChange={onChangeProp && onChange}
        >
          <RenderComponentInContext {...props} />
        </ActiveStateProvider>
      );
    }),
    Component.displayName ? { displayName: Component.displayName } : {}
  );

  function RenderComponentInContext(props: T) {
    const onActivate = useActiveStateChange();
    return <Component {...cast<ComponentProps>(props)} onChange={onActivate} />;
  }
}
