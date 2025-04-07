import { fastDeepEqual, get, } from '@binaryoperations/json-forms-core/internals/object';
import { groupBy } from 'lodash';
import { useCallback, useMemo, useReducer } from 'react';
export function useControlState(initialData, draft) {
    const [controlState, setControlState] = useReducer(reduceStoreState, {
        touchedControlPaths: new Map(),
        dirtyControlPaths: new Map(),
        errors: new Map(),
    });
    const derivePath = useCallback((path) => draft.getSchemaNodeOf(path).pointer, [draft]);
    const setTouched = useCallback((path) => {
        setControlState({
            type: 'SET_TOUCHED',
            payload: {
                path: derivePath(path),
            },
        });
    }, [derivePath]);
    const setDirty = useCallback((path, value) => {
        setControlState({
            type: 'SET_DIRTY',
            payload: {
                path: derivePath(path),
                isDirty: !fastDeepEqual(get(initialData, path), value),
            },
        });
    }, [derivePath, initialData]);
    const setErrors = useCallback((path, errors, reset = false) => {
        setControlState({
            type: 'SET_ERRORS',
            payload: { path: derivePath(path), errors, reset },
        });
    }, [derivePath]);
    const resetErrors = useCallback(() => {
        setControlState({
            type: 'RESET_ERRORS',
            payload: undefined,
        });
    }, []);
    return useMemo(() => ({ ...controlState, setTouched, setDirty, setErrors, resetErrors }), [controlState, resetErrors, setDirty, setErrors, setTouched]);
}
function reduceStoreState(state, action) {
    switch (action.type) {
        case 'SET_TOUCHED': {
            const touchedControlPaths = state.touchedControlPaths;
            if (touchedControlPaths.get(action.payload.path))
                return state;
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
            else
                dirtyControlPaths.delete(action.payload.path);
            return {
                ...state,
                dirtyControlPaths: new Map(dirtyControlPaths.entries()),
            };
        }
        case 'SET_ERRORS': {
            const { reset, path, errors } = action.payload;
            const errorState = reset ? new Map() : state.errors;
            if (!errors.length)
                errorState.delete(path);
            const nextErrorsMap = new Map(Object.entries({
                ...Object.fromEntries(errorState.entries()),
                ...(reset
                    ? groupBy(errors, (record) => record.data.pointer)
                    : {
                        [path]: errors.map((error) => ({
                            ...error,
                            data: { ...error.data, pointer: path },
                        })),
                    }),
            }));
            return {
                ...state,
                errors: nextErrorsMap,
            };
        }
        case 'RESET_ERRORS': {
            return {
                ...state,
                errors: new Map(),
            };
        }
        default:
            throw new Error('Invalid action type');
    }
}
