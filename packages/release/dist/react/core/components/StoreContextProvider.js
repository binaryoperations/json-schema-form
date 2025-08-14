import { jsx as _jsx } from "react/jsx-runtime";
import LogicalSchema from '../../../core/schema/logical.schema';
import UiSchema from '../../../core/schema/ui.schema';
import { memo, useImperativeHandle, useMemo } from 'react';
import { useCallback } from 'react';
import { UiStoreContextProvider } from '../context/StoreContext';
import { useControlState } from './useControlState';
import { useFormDataRef } from '../context/FormDataContext';
import { useLatest } from '../hooks/useLatest';
import { useValidateData } from '../hooks/useControl';
import noop from 'lodash/noop';
export const StoreContextProvider = memo(function StoreContextProvider(props) {
    const schemaDraft = useMemo(() => LogicalSchema.parse(props.schema), [props.schema]);
    const formDataRef = useFormDataRef();
    const schemaDraftRef = useLatest(schemaDraft);
    const onSubmitLatestRef = useLatest(props.onSubmit);
    const controlState = useControlState(props.initialData, schemaDraftRef);
    const validate = useCallback((value, schema) => schemaDraftRef.current.validate(value, schema), []);
    const uiContext = useMemo(() => UiSchema.prepare(props.uiSchema, schemaDraft), [props.uiSchema, schemaDraft]);
    const validateOnSubmit = useLatest({
        uiContext,
        validationMode: "onSubmit",
        validate,
        onSubmit: noop,
        submit: noop,
        ...controlState
    });
    const validateFunc = useValidateData("#", "onSubmit", validateOnSubmit);
    const submit = useCallback((data = formDataRef.current, schemaNode) => {
        const isValid = validateFunc(data, schemaNode);
        if (!isValid)
            return;
        return onSubmitLatestRef.current?.(formDataRef.current);
    }, [validateFunc]);
    const onSubmit = useCallback((e) => {
        e?.preventDefault();
        e?.stopPropagation();
        return submit();
    }, [submit]);
    useImperativeHandle(props.ref, () => ({ validate: validateFunc, resetErrors: controlState.resetErrors }), [validateOnSubmit, controlState.resetErrors]);
    const contextValue = useMemo(() => ({
        uiContext,
        validate,
        validationMode: props.validationMode,
        onSubmit,
        submit,
        ...controlState,
    }), [uiContext, validate, props.validationMode, controlState, onSubmit]);
    return (_jsx(UiStoreContextProvider, { value: contextValue, children: props.children }));
});
