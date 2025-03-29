import { fastDeepEqual, get, } from '../../../core/internals/object';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29udHJvbFN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS9jb21wb25lbnRzL3VzZUNvbnRyb2xTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLEdBQUcsR0FDSixNQUFNLG9EQUFvRCxDQUFDO0FBRzVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBa0J6RCxNQUFNLFVBQVUsZUFBZSxDQUFDLFdBQW1CLEVBQUUsS0FBb0I7SUFDdkUsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7UUFDbkUsbUJBQW1CLEVBQUUsSUFBSSxHQUFHLEVBQWdCO1FBQzVDLGlCQUFpQixFQUFFLElBQUksR0FBRyxFQUFnQjtRQUMxQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQXVCO0tBQ3ZDLENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FDNUIsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUNyRCxDQUFDLEtBQUssQ0FBQyxDQUNSLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQzVCLENBQUMsSUFBWSxFQUFFLEVBQUU7UUFDZixlQUFlLENBQUM7WUFDZCxJQUFJLEVBQUUsYUFBYTtZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDdkI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLEVBQ0QsQ0FBQyxVQUFVLENBQUMsQ0FDYixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUMxQixDQUFDLElBQVksRUFBRSxLQUFjLEVB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