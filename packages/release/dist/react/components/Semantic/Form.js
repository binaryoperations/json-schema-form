import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '../../core/hooks';
import { uniqBy } from '../../../core/internals/object';
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
        let allValidatedResult = !props.id ?
            [storeRef.current.validate(formDataRef.current, uiContext.deriveControlSchemaNode("#", formDataRef.current))]
            : uniqBy(uiContext.getChildControls(props.id), "path")
                .map((node) => {
                const splitSlices = split(node.path);
                const currentNode = splitSlices.at(-1);
                const data = uiContext.deriveDataNodeAtPath(formDataRef.current, node.path);
                if (!node.required)
                    return storeRef.current.validate(formDataRef.current, uiContext.deriveControlSchemaNode(node.path, formDataRef.current), node.path);
                const nodeSchema = uiContext
                    .deriveControlSchemaNode(node.path, formDataRef.current);
                return storeRef.current.validate({ [currentNode]: data.value }, uiContext.deriveSchemaNode({
                    type: "object",
                    properties: { [currentNode]: nodeSchema.schema },
                    required: node.required ? [currentNode] : []
                }), ["#", ...splitSlices.slice(0, -1)].join("/"), "#");
            });
        // Validate Parent schema
        const { errors } = allValidatedResult.reduce((x, validateState) => {
            return {
                ...x,
                isValid: x.valid && validateState.isValid,
                errors: [...x.errors, ...validateState.errors],
            };
        }, {
            valid: true,
            errors: [],
        });
        storeRef.current.setErrors("#", errors, true);
        if (errors.length) {
            e?.preventDefault();
            e?.stopPropagation();
            return;
        }
        if (onSubmit)
            onSubmit(storeRef.current.submit);
        else
            storeRef.current.submit(e);
    }, [storeRef, props.id]);
    return useMemo(() => ({
        onSubmit: handleSubmit,
    }), [handleSubmit]);
}
