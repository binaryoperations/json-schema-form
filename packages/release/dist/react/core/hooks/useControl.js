import { cast } from '../../../core/internals/cast';
import { set, shallowCompare, } from '../../../core/internals/object';
import resolvers from '../../../core/internals/resolvers';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useFormDataContext, useFormDataRef } from '../context/FormDataContext';
import { useUiStoreContext, useUiStoreRef, } from '../context/StoreContext';
import { useInvariantContext } from './useInvariantContext';
import { useStore } from './useStore';
import useValue from './useValue';
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
    const formDataRef = useFormDataRef();
    return useStore((store) => {
        return selector(store.uiContext.deriveSchemaAtPointer(currentControl, formDataRef.current));
    }, equalityCheck)[0];
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue(path) {
    const [value, setFormData] = useFormDataContext((data) => resolvers.resolvePath(data, path), shallowCompare);
    const setDirty = useUiStoreRef().current.setDirty;
    const validate = useValidateData(path, 'onChange');
    return [
        value,
        useCallback((value) => {
            setFormData((oldValue) => set(oldValue, path, value));
            setDirty(path, value);
            validate(value);
        }, [validate, path, setFormData, setDirty]),
    ];
}
export function useControlProps(path, props) {
    const { onBlur, onFocus, ...rest } = props;
    const validate = useValidateData(path, 'onBlur');
    const setTouched = useUiStoreRef().current.setTouched;
    const [value, setValue] = useControlValue(path);
    const proxyValue = useValue(value);
    const [{ pointer, schemaOptions }] = useUiStoreContext((state) => {
        const node = state.uiContext.deriveSchemaNodeAtPointer(path);
        return {
            pointer: node?.pointer,
            schemaOptions: node?.schema?.options,
        };
    }, shallowCompare);
    const [meta] = useUiStoreContext((state) => {
        return {
            touched: state.touchedControlPaths.has(pointer),
            dirty: state.dirtyControlPaths.has(pointer),
            error: state.errors.get(pointer)?.at(0)?.message,
        };
    }, shallowCompare);
    const handleOnBlur = useCallback((e) => {
        onBlur?.(e);
        validate(proxyValue.value);
    }, [onBlur, validate, proxyValue]);
    const handleOnFocus = useCallback((e) => {
        onFocus?.(e);
        setTouched(path);
    }, [onFocus, setTouched, path]);
    const { readOnly, disabled } = props;
    return {
        ...rest,
        ...schemaOptions,
        onBlur: deriveValue(handleOnBlur, onBlur, readOnly, disabled),
        onFocus: deriveValue(handleOnFocus, onFocus, readOnly, disabled),
        value,
        setValue,
        meta,
    };
}
function useValidateData(path, validateOn) {
    const formDataRef = useFormDataRef();
    const uiStoreRef = useUiStoreRef();
    const [validate] = useUiStoreContext((state) => state.validationMode === validateOn ? state.validate : undefined);
    return useCallback((value) => {
        if (!validate)
            return;
        const shouldReset = validateOn === 'onSubmit';
        const schema = uiStoreRef.current.uiContext.deriveSchemaNodeAtPointer(path).schema;
        const validateResult = shouldReset
            ? validate(value ?? formDataRef.current, schema)
            : validate(value, schema);
        uiStoreRef.current.setErrors(path, validateResult.isValid ? [] : validateResult.errors, shouldReset);
    }, [path, validate, uiStoreRef, validateOn, formDataRef]);
}
function deriveValue(value, readOnlyValue, readOnly, disabled) {
    if (disabled)
        return undefined;
    if (readOnly) {
        return readOnlyValue;
    }
    return value;
}
