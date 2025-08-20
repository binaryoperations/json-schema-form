import {
  fastDeepEqual,
  get,
} from '@binaryoperations/json-forms-core/internals/object';
import type { JsonError } from 'json-schema-library';
import { groupBy } from 'lodash';
import { useCallback, useMemo, useReducer } from 'react';

import type { UiStoreContextType } from '../context/StoreContext';
import { extractSegmentsFromPath } from '@binaryoperations/json-forms-core/internals/extractSegmentsFromPath';
import { useLatest } from '../hooks/useLatest';

type ControlState = Pick<
  UiStoreContextType,
  'touchedControlPaths' | 'dirtyControlPaths' | 'errors'
>;

type Action =
  | { type: 'RESET_ERRORS'; payload: void }
  | { type: 'SET_TOUCHED'; payload: { path: string } }
  | { type: 'SET_DIRTY'; payload: { path: string; isDirty: boolean } }
  | {
      type: 'SET_ERRORS';
      payload: { path: string; errors: JsonError[]; reset?: boolean };
    };

export function useControlState(initialData: object) {
  const [controlState, setControlState] = useReducer(reduceStoreState, {
    touchedControlPaths: new Map<string, true>(),
    dirtyControlPaths: new Map<string, true>(),
    errors: new Map<string, JsonError[]>(),
  });

  const initialDataRef = useLatest(initialData);

  const setTouched = useCallback(
    (path: string) => {
      setControlState({
        type: 'SET_TOUCHED',
        payload: {
          path,
        },
      });
    },
    []
  );

  const setDirty = useCallback(
    (path: string, value: unknown) => {
      setControlState({
        type: 'SET_DIRTY',
        payload: {
          path,
          isDirty: !fastDeepEqual(get(initialDataRef.current, path), value),
        },
      });
    },
    [initialDataRef]
  );

  const setErrors = useCallback(
    (path: string, errors: JsonError[], reset = false) => {
      setControlState({
        type: 'SET_ERRORS',
        payload: { path, errors, reset },
      });
    },
    []
  );

  const resetErrors = useCallback(() => {
    setControlState({
      type: 'RESET_ERRORS',
      payload: undefined,
    });
  }, []);

  return useMemo(
    () => ({ ...controlState, setTouched, setDirty, setErrors, resetErrors }),
    [controlState, resetErrors, setDirty, setErrors, setTouched]
  );
}

function reduceStoreState(state: ControlState, action: Action) {
  switch (action.type) {
    case 'SET_TOUCHED': {
      const touchedControlPaths = state.touchedControlPaths;
      if (touchedControlPaths.get(action.payload.path)) return state;
      const nextState = touchedControlPaths.set(action.payload.path, true);
      return {
        ...state,
        touchedControlPaths: new Map(nextState.entries()),
      };
    }
    case 'SET_DIRTY': {
      const dirtyControlPaths = state.dirtyControlPaths;
      if (action.payload.isDirty)
        dirtyControlPaths.set(action.payload.path, true);
      else dirtyControlPaths.delete(action.payload.path);

      return {
        ...state,
        dirtyControlPaths: new Map(dirtyControlPaths.entries()),
      };
    }
    case 'SET_ERRORS': {
      const { reset, path, errors } = action.payload;
      const errorState = reset ? new Map<string, JsonError[]>() : state.errors;

      if (!errors.length) errorState.delete(extractSegmentsFromPath(path).join('/'));

      const nextErrorsMap = new Map(
        Object.entries({
          ...Object.fromEntries(errorState.entries()),
          ...groupBy(errors, (record) => extractSegmentsFromPath(record.data.pointer).join('/')),
        })
      );

      return {
        ...state,
        errors: nextErrorsMap,
      };
    }

    case 'RESET_ERRORS': {
      return {
        ...state,
        errors: new Map<string, JsonError[]>(),
      };
    }

    default:
      throw new Error('Invalid action type');
  }
}
