import { jsx as _jsx } from "react/jsx-runtime";
import LogicalSchema from '../../../core/schema/logical.schema';
import UiSchema from '../../../core/schema/ui.schema';
import { memo, useImperativeHandle, useMemo, useRef } from 'react';
import { useCallback } from 'react';
import { UiStoreContextProvider } from '../context/StoreContext';
import { useControlState } from './useControlState';
import { useFormDataRef } from '../context/FormDataContext';
export const StoreContextProvider = memo(function StoreContextProvider(props) {
    const schemaDraft = useMemo(() => LogicalSchema.parse(props.schema), [props.schema]);
    const formDataRef = useFormDataRef();
    const controlState = useControlState(props.initialData, schemaDraft);
    const schemaDraftRef = useRef(schemaDraft);
    schemaDraftRef.current = schemaDraft;
    const validate = useCallback((value, schema) => schemaDraft.validate(value, schema), []);
    const uiContext = useMemo(() => UiSchema.prepare(props.uiSchema, schemaDraft), [props.uiSchema, schemaDraft]);
    const onSubmitLatestRef = useRef(props.onSubmit);
    onSubmitLatestRef.current = props.onSubmit;
    const onSubmit = useCallback((e) => {
        e?.preventDefault();
        e?.stopPropagation();
        const { isValid } = schemaDraftRef.current.validate(formDataRef.current, props.schema);
        if (!isValid)
            return;
        return onSubmitLatestRef.current?.(formDataRef.current);
    }, [validate]);
    useImperativeHandle(props.ref, () => ({ validate, resetErrors: controlState.resetErrors }), [validate, controlState.resetErrors]);
    const contextValue = useMemo(() => ({
        uiContext,
        validate,
        validationMode: props.validationMode,
        onSubmit,
        submit: onSubmit,
        ...controlState,
    }), [uiContext, validate, props.validationMode, controlState, onSubmit]);
    return (_jsx(UiStoreContextProvider, { value: contextValue, children: props.children }));
});
