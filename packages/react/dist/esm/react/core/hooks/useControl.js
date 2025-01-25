import { cast } from '../../../core/internals/cast';
import { set, shallowCompare, } from '../../../core/internals/object';
import resolvers from '../../../core/internals/resolvers';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useFormDataContext, useStoreContextRef, } from '../context/FormDataContext';
import { useInvariantContext } from './useInvariantContext';
import { useStore } from './useStore';
const useInvariantControl = (message) => useInvariantContext(ControlContext, message);
/**
 *
 * Read the UI node for the current control
 *
 */
export function useControl(selector, equalityCheck = Object.is) {
    const currentControlId = useInvariantControl('useControl can only be called inside ControlContext');
    return useStore((store) => {
        return selector(cast(store.uiContext.getNode(currentControlId)));
    }, equalityCheck);
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlSchema(selector, equalityCheck) {
    const currentControl = useInvariantControl('useControlSchema can only be called inside ControlContext');
    return useStore((store) => {
        return selector(cast(store.uiContext.getNode(currentControl)).schema);
    }, equalityCheck);
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue(path) {
    const value = useFormDataContext((data) => resolvers.resolvePath(data, path), shallowCompare);
    const store = useStoreContextRef();
    return [
        value,
        useCallback((value) => {
            store.set((oldValue) => {
                return set(oldValue, path, value);
            });
        }, [path, store]),
    ];
}
//# sourceMappingURL=useControl.js.map