import { cast } from '@binaryoperations/json-forms-internals/cast';
import { type ComponentType, memo } from 'react';

import useSafeCallback from '../../core/hooks/useSafeCallback';
import {
  ActiveStateProvider,
  useActiveStateChange,
} from './ActiveStateContext';
import { usePrepareContextValue } from './hooks';
import type {
  ActiveStateContextPropsMultiple,
  ActiveStateContextPropsSingle,
  ActiveStateProps,
  ActiveStateType,
} from './types';

type C<P = object> = ComponentType<P>;

export default function withActiveStateContext<
  T extends Record<string, any>,
  ComponentProps = T &
    Pick<Required<ActiveStateContextPropsSingle>, 'onChange'>,
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
          cast<ActiveStateContextPropsMultiple>(props).onChange?.(
            nextValue.activeState
          );
          return;
        }

        cast<ActiveStateContextPropsSingle>(props).onChange?.(
          nextValue.activeState![0]
        );
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
