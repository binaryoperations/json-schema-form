import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { compileSchema } from 'json-schema-library';
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
        const parentSchemaMap = new Map();
        let allNonRequiredPathsToValidate = !props.id ? ["#"] : uniq(uiContext.getChildControls(props.id)
            .map((node) => {
            const splitSlices = split(node.path);
            const parentPath = "#/" + splitSlices.slice(0, -1).join("/");
            if (!node.required)
                return parentSchemaMap.has(parentPath) ? null : node.path;
            const parentSchema = parentSchemaMap.get(parentPath) ?? {
                schema: { type: "object", properties: {}, required: [] },
                node: uiContext.deriveControlSchemaNode(parentPath, formDataRef.current)
            };
            parentSchemaMap.set(parentPath, {
                ...parentSchema,
                schema: {
                    ...parentSchema.schema,
                    required: [
                        ...(parentSchema.schema?.required ?? []),
                    ].concat(parentSchema.node.schema.required?.includes(splitSlices.at(-1))
                        ? splitSlices.at(-1) : [])
                }
            });
            return null;
        }));
        allNonRequiredPathsToValidate = Array.from(parentSchemaMap.keys()).reduce((nodes, key) => {
            return nodes.filter((node) => node && !node.startsWith(key));
        }, allNonRequiredPathsToValidate);
        // Validate Parent schema
        const validationState = Array.from(parentSchemaMap.entries()).reduce((x, [path, { schema }]) => {
            const { value = null, pointer } = uiContext.deriveDataNodeAtPath(formDataRef.current, path) ?? {};
            const validateState = compileSchema(schema).validate(value, pointer);
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
        // Validate other properties schema
        const { errors } = allNonRequiredPathsToValidate.reduce((x, path) => {
            if (!path)
                return x;
            const { value = null, pointer } = uiContext.deriveDataNodeAtPath(formDataRef.current, path) ?? {};
            const validateState = uiContext.deriveControlSchemaNode(path, formDataRef.current).validate(value, pointer);
            return {
                ...x,
                valid: x.valid && validateState.valid,
                errors: [...x.errors, ...validateState.errors],
            };
        }, validationState);
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
