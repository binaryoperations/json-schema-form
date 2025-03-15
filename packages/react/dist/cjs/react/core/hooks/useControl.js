import { cast } from '../../../core/internals/cast';
import { set, shallowCompare, } from '../../../core/internals/object';
import resolvers from '../../../core/internals/resolvers';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useFormDataContext, useFormDataContextRef, } from '../context/FormDataContext';
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
    const storeRef = useFormDataContextRef();
    return useStore((store) => {
        return selector(store.uiContext.deriveNodeSchema(currentControl, storeRef.current));
    }, equalityCheck)[0];
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue(path) {
    const [value, setFormData] = useFormDataContext((data) => resolvers.resolvePath(data, path), shallowCompare);
    return [
        value,
        useCallback((value) => {
            setFormData((oldValue) => set(oldValue, path, value));
        }, [path, setFormData]),
    ];
}
//# sourceMappingURL=useControl.js.map