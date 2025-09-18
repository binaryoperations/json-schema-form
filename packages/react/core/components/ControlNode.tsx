import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { ComponentType, SyntheticEvent, use } from 'react';
import { useCallback } from 'react';

import { ControlContext } from '../context/ControlContext';
import { useControl, useControlProps } from '../hooks';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { WithErrorBoundary } from './ErrorBoundary';
import { fastDeepEqual } from '@binaryoperations/json-forms-core/internals/object';


const Unhandled = (props: { error?: Error | null }) => {
  const controlId = use(ControlContext);

  return useMaybeDevValue(
    () => (
      <div style={{ backgroundColor: '#e5e5e5', wordBreak: 'break-all' }}>
        {controlId}: {props.error?.message}
      </div>
    ),
    () => null
  );
};

const WithControlContext = <Props extends { id: string }>(
  Component: ComponentType<Props>
) => {
  return function WithControlContext(props: Props) {
    return (
      <ControlContext.Provider value={props.id}>
        <Component {...props} />
      </ControlContext.Provider>
    );
  };
};

export const ControlNode = WithControlContext(
  WithErrorBoundary(function ControlNode(props: { id: string }) {
    const [path] = useControl((control) => control.path);
    const [options] = useControl((control) => control.options, fastDeepEqual);

    const { Control, getValueFromEvent } = invariant(
      useControlNode(props.id),
      `Cannot find a relevant control for id: ${props.id}`
    );

    const { value, setValue, meta, onBlur, onFocus, id: _id, ...rest } = useControlProps(path, {
      ...props,
      ...options,
    });

    const handleSetValue = useCallback(
      (e: SyntheticEvent) => {
        setValue(getValueFromEvent(e));
      },
      [getValueFromEvent, setValue]
    );

    return (
      <Control
        {...rest}
        {...meta}
        value={(value ?? '') as any}
        onChange={handleSetValue}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }, Unhandled)
);
