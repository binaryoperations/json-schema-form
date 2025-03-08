import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import {
  set,
  shallowCompare,
} from '@binaryoperations/json-forms-core/internals/object';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import type {
  ControlNode,
  ControlSchema,
} from '@binaryoperations/json-forms-core/models';
import type { Selector } from '@binaryoperations/json-forms-core/types/reducers';
import { useCallback } from 'react';

import { ControlContext } from '../context/ControlContext';
import {
  useFormDataContext,
  useStoreContextRef,
} from '../context/FormDataContext';
import { useInvariantContext } from './useInvariantContext';
import { useStore } from './useStore';

const useInvariantControl = (message: string) =>
  useInvariantContext(ControlContext, message);

/**
 *
 * Read the UI node for the current control
 *
 */
export function useControl<SelectorOutput>(
  selector: Selector<ControlNode, SelectorOutput>,
  equalityCheck = Object.is
) {
  const currentControlId = useInvariantControl(
    'useControl can only be called inside ControlContext'
  );

  return useStore((store) => {
    return selector(
      cast<ControlNode>(store.uiContext.getNode(currentControlId))
    );
  }, equalityCheck);
}

/**
 *
 * Read the schema of the control
 *
 */
export function useControlSchema<SelectorOutput>(
  selector: Selector<ControlSchema, SelectorOutput>,
  equalityCheck?: typeof Object.is
) {
  const currentControl = useInvariantControl(
    'useControlSchema can only be called inside ControlContext'
  );

  return useStore((store) => {
    return selector(
      cast<ControlNode>(store.uiContext.getNode(currentControl)).schema
    );
  }, equalityCheck);
}

/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue<V = unknown>(path: string) {
  const value = useFormDataContext(
    (data) => resolvers.resolvePath(data, path),
    shallowCompare
  );

  const store = useStoreContextRef();

  return [
    value,
    useCallback(
      (value: V) => {
        store.set((oldValue) => {
          return set(oldValue, path, value);
        });
      },
      [path, store]
    ),
  ] as [value: V, set: (value: V) => void];
}
