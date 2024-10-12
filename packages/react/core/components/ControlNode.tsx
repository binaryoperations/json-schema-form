import { memo } from 'react';
import { useControl, useControlValue } from '../hooks';

import { useControlNode } from '../hooks/useRenderer';
import { ComponentType } from 'react';
import { ControlContext } from '../context/ControlContext';
import invariant from '@binaryoperations/json-forms-internals/invariant';
import { withErrorBoundary } from './ErrorBoundary';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useCallback } from 'react';
import { ChangeEvent } from 'react';

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
  return memo((props: Props) => {
    return (
      <ControlContext.Provider value={props.id}>
        <Component {...props} />
      </ControlContext.Provider>
    );
  });
};

export const ControlNode = withControlContext(
  withErrorBoundary((props: { id: string }) => {
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
