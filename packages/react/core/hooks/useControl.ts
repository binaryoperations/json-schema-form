import {
  ControlNode,
  ControlSchema,
} from '@binaryoperations/json-forms-core/models';
import { Selector } from '@binaryoperations/json-forms-core/types/reducers';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { ControlContext } from '../context/ControlContext';
import { useStore } from './useStore';
import { useInvariantContext } from './useInvariantContext';
import {
  useFormDataContext,
  useStoreContextRef,
} from '../context/FormDataContext';
import resolvers from '@binaryoperations/json-forms-internals/resolvers';
import {
  set,
  shallowCompare,
} from '@binaryoperations/json-forms-internals/object';
import { useCallback } from 'react';

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
  const currentControl = useInvariantControl(
    'useControl can only be called inside ControlContext'
  );

  return useStore((store) => {
    return selector(cast<ControlNode>(store.uiContext.getNode(currentControl)));
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
export function useControlValue(path: string) {
  const value = useFormDataContext(
    (data) => resolvers.resolvePath(data, path),
    shallowCompare
  );

  const store = useStoreContextRef();

  return [
    value,
    useCallback(
      (value: unknown) => {
        store.set((oldValue) => {
          return set(oldValue, path, value);
        });
      },
      [path, store]
    ),
  ];
}
