import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { ComponentType, SyntheticEvent } from 'react';
import { useCallback } from 'react';

import { ControlContext } from '../context/ControlContext';
import { useControl, useControlProps, useControlValue } from '../hooks';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { WithErrorBoundary } from './ErrorBoundary';


const Unhandled = () => {
  const [control] = useControl((control) => control);
  const [value] = useControlValue(control.path);

  return useMaybeDevValue(
    () => (
      <div style={{ backgroundColor: '#e5e5e5', wordBreak: 'break-all' }}>
        value: {JSON.stringify(value)} <br />
        scope: {JSON.stringify(control.path)} <br />
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
    const [control] = useControl((control) => control);

    const { Control, getValueFromEvent } = invariant(
      useControlNode(props.id),
      `Cannot find a relevant control for id: ${props.id}`
    );

    const path = control.path;
    const { value, setValue, meta, onBlur, onFocus, id: _id, ...rest } = useControlProps(path, {
      ...props,
      ...control.options,
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
        value={(value ?? '') as any}
        onChange={handleSetValue}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }, Unhandled)
);
