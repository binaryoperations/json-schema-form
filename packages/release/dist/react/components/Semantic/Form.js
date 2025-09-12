import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '../../core/hooks';
import { uniq } from '../../../core/internals/object';
import { split } from "@sagold/json-pointer";
export const Form = function Form(props) {
    return _jsx("form", { ...useFormProps(props) });
};
export const SubForm = function SubForm(props) {
    const [storeRef] = useStore(x => x);
    const subFormProps = useSubFormProps({ id: props.id });
    const contextValue = useMemo(() => ({
        ...storeRef,
        ...subFormProps,
    }), [storeRef, subFormProps]);
    return _jsx(UiStoreContextProvider, { value: contextValue, children: props.children });
};
function useSubFormProps(props) {
    const storeRef = useUiStoreRef();
    const formDataRef = useFormDataRef();
    const handleSubmit = useCallback((e, onSubmit) => {
        const uiContext = storeRef.current.uiContext;
        const allPathsToValidate = !props.id ? ["#"] : uniq(uiContext.getChildControls(props.id)
            .map((node) => node.required
            ? "#/" + split(node.path).slice(0, -1).join("/")
            : node.path));
        const { errors } = allPathsToValidate.reduce((x, path) => {
            const { value = null, pointer } = uiContext.deriveDataNodeAtPath(formDataRef.current, path) ?? {};
            const validateState = uiContext.deriveControlSchemaNode(path, formDataRef.current).validate(value, pointer);
            return {
                ...x,
                valid: x.valid && validateState.valid,
                errors: [...x.errors, ...validateState.errors],
            };
        }, {
            valid: true,
            errors: [],
            errorsAsync: [],
        });
        storeRef.current.setErrors("#", errors, true);
        if (errors.length) {
            e?.preventDefault();
            e?.stopPropagation();
            return;
        }
        if (onSubmit)
            onSubmit(e);
        else
            storeRef.current.submit?.(e, undefined, undefined, true);
    }, [storeRef, props.id]);
    return useMemo(() => ({
        onSubmit: handleSubmit,
    }), [handleSubmit]);
}
