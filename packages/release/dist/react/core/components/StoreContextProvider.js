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
import { fastDeepEqual, noop } from '../../../core/internals/object';
import { useMemoizedValue } from '../hooks/useMemoizedValue';
export const StoreContextProvider = memo(function StoreContextProvider(props) {
    const schema = useMemoizedValue(props.schema, fastDeepEqual);
    const schemaDraft = useMemo(() => LogicalSchema.parse(schema, props.draft), [schema, props.draft]);
    const formDataRef = useFormDataRef();
    const onSubmitLatestRef = useLatest(props.onSubmit);
    const controlState = useControlState(props.initialData);
    const uiSchema = useMemoizedValue(props.uiSchema, fastDeepEqual);
    const uiContext = useMemo(() => UiSchema.prepare(uiSchema, schemaDraft, formDataRef.current), [uiSchema, schemaDraft]);
    const validateOnSubmit = useLatest({
        uiContext,
        validationMode: "onSubmit",
        validate: schemaDraft.validate,
        onSubmit: noop,
        submit: noop,
        ...controlState
    });
    const validateFunc = useValidateData("#", "onSubmit", validateOnSubmit);
    const submit = useCallback((e, data = formDataRef.current, schemaNode, shouldValidate = true) => {
        const isValid = !shouldValidate || validateFunc(data, schemaNode);
        if (!isValid)
            return;
        return onSubmitLatestRef.current?.(e, formDataRef.current);
    }, [validateFunc]);
    const onSubmit = useCallback((e, handleSubmit) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (handleSubmit)
            return handleSubmit(submit);
        return submit();
    }, [submit]);
    useImperativeHandle(props.ref, () => ({ validate: validateFunc, resetErrors: controlState.resetErrors }), [validateOnSubmit, controlState.resetErrors]);
    const contextValue = useMemo(() => ({
        uiContext,
        validate: schemaDraft.validate,
        validationMode: props.validationMode,
        onSubmit,
        submit,
        ...controlState,
    }), [uiContext, schemaDraft, props.validationMode, controlState, onSubmit]);
    return (_jsx(UiStoreContextProvider, { value: contextValue, children: props.children }));
});
