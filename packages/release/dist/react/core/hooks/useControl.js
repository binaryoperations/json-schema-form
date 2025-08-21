import { cast } from '../../../core/internals/cast';
import { set, shallowCompare, noop, fastDeepEqual, } from '../../../core/internals/object';
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
    const [currentControlId] = useInvariantControl('useControlSchema can only be called inside ControlContext');
    const formDataRef = useFormDataRef();
    return useStore((store) => {
        return selector(store.uiContext.deriveControlSchema(currentControlId, formDataRef.current));
    }, equalityCheck)[0];
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue(path) {
    const storeRef = useUiStoreRef();
    const [value, setFormData] = useFormDataContext((data) => storeRef.current.uiContext.deriveDataAtPointer(data, path), shallowCompare);
    const validate = useValidateData(path, 'onChange', storeRef);
    return [
        value,
        useCallback((value) => {
            setFormData((oldValue) => set(oldValue, path, value));
            storeRef.current.setDirty(path, value);
            validate(value);
        }, [validate, path, setFormData, storeRef.current.setDirty]),
    ];
}
export function useControlProps(path, props) {
    const { onBlur, onFocus, ...rest } = props;
    const validate = useValidateData(path, 'onBlur', useUiStoreRef());
    const setTouched = useUiStoreRef().current.setTouched;
    const [value, setValue] = useControlValue(path);
    const proxyValue = useValue(value);
    const formDataRef = useFormDataRef();
    const [schema] = useUiStoreContext((state) => {
        const node = state.uiContext.deriveControlSchemaNode(path, formDataRef.current);
        return node?.schema;
    }, fastDeepEqual);
    const [meta] = useUiStoreContext((state) => {
        return {
            touched: state.touchedControlPaths.has(path),
            dirty: state.dirtyControlPaths.has(path),
            error: state.errors.get(path)?.at(0)?.message,
            required: !!state.uiContext.getNodeByPath(path)?.required
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
    const disabled = props.disabled || schema.readOnly;
    return {
        ...rest,
        ...schema.options,
        disabled,
        onBlur: deriveValue(handleOnBlur, onBlur, disabled),
        onFocus: deriveValue(handleOnFocus, onFocus, disabled),
        setValue: deriveValue(setValue, noop, disabled),
        value,
        meta,
    };
}
export function useValidateData(path, validateOn, storeRef) {
    const formDataRef = useFormDataRef();
    const { validationMode, validate: validateFn } = storeRef.current;
    const validate = validationMode === validateOn ? validateFn : undefined;
    return useCallback((value, schema) => {
        if (!validate)
            return {
                isValid: true,
                errors: [],
            };
        const shouldReset = validateOn === 'onSubmit';
        const testSchema = schema?.schema ??
            storeRef.current.uiContext.deriveControlSchemaNode(path, formDataRef.current).schema;
        const validateResult = shouldReset
            ? validate(value ?? formDataRef.current, testSchema)
            : validate(value, testSchema);
        storeRef.current.setErrors(path, validateResult.isValid ? [] : validateResult.errors, shouldReset);
        return validateResult;
    }, [path, validate, storeRef, validateOn, formDataRef]);
}
function deriveValue(value, readOnlyValue, readOnly) {
    if (readOnly) {
        return readOnlyValue;
    }
    return value;
}
