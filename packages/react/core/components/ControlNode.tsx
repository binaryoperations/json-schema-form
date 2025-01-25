import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { ComponentType } from 'react';
import { useCallback } from 'react';
import { ChangeEvent } from 'react';

import { ControlContext } from '../context/ControlContext';
import { useControl, useControlValue } from '../hooks';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { withErrorBoundary } from './ErrorBoundary';

const Unhandled = () => {
  const control = useControl((control) => control);
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

const withControlContext = <Props extends { id: string }>(
  Component: ComponentType<Props>
) => {
  return function withControlContext(props: Props) {
    return (
      <ControlContext.Provider value={props.id}>
        <Component {...props} />
      </ControlContext.Provider>
    );
  };
};

export const ControlNode = withControlContext(
  withErrorBoundary(function ControlNode(props: { id: string }) {
    const control = useControl((control) => control);

    const { Control, getValueFromEvent } = invariant(
      useControlNode(props.id),
      `Cannot find a relevant control for id: ${props.id}`
    );

    const path = control.path;
    const [value, setValue] = useControlValue(path);

    const handleSetValue = useCallback(
      (e: ChangeEvent) => {
        setValue(getValueFromEvent(e));
      },
      [getValueFromEvent, setValue]
    );

    return (
      <Control
        {...control.options}
        label={path}
        value={(value ?? '') as any}
        onChange={handleSetValue}
      />
    );
  }, Unhandled)
);
