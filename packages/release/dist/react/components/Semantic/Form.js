import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import resolvers from '../../../core/internals/resolvers';
import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '../../core/hooks';
export const Form = function Form(props) {
    return _jsx("form", { ...useFormProps(props) });
};
export const SubForm = function SubForm(props) {
    const [storeRef] = useStore(x => x);
    const subFormProps = useSubFormProps({ id: props.id });
    const contextValue = useMemo(() => ({
        ...storeRef,
        ...subFormProps,
    }), [storeRef]);
    return _jsx(UiStoreContextProvider, { value: contextValue, children: props.children });
};
function useSubFormProps(props) {
    const storeRef = useUiStoreRef();
    const formDataRef = useFormDataRef();
    const handleSubmit = useCallback((e, onSubmit) => {
        const uiContext = storeRef.current.uiContext;
        const { errors } = uiContext.getChildControls(props.id ?? 'root').reduce((x, control) => {
            const node = uiContext.deriveSchemaNodeAtPointer(control.path);
            const validateState = node.validate(resolvers.resolvePath(formDataRef.current, control.path), node.evaluationPath);
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
