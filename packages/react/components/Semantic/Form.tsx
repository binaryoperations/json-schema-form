
import { FormEvent, useCallback, useMemo, type ComponentProps } from 'react';
import { JsonSchema, SchemaNode, ValidateReturnType, compileSchema } from 'json-schema-library';

import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '@binaryoperations/json-forms-react/core/hooks';
import { uniq } from '@binaryoperations/json-forms-core/internals/object';

import {split} from "@sagold/json-pointer"


export const Form = function Form(props: ComponentProps<'form'>) {
  return <form {...useFormProps(props)}/>;
};



export const SubForm = function SubForm(props: Pick<ComponentProps<'form'>, 'children' | 'id'>) {
  const [storeRef] = useStore(x => x);
  const subFormProps = useSubFormProps({ id: props.id! });

  const contextValue = useMemo(() => ({
    ...storeRef,
    ...subFormProps,
  }), [storeRef, subFormProps]);

  return <UiStoreContextProvider value={contextValue}>{props.children}</UiStoreContextProvider>
}


function useSubFormProps(props: {id: string}) {
  const storeRef = useUiStoreRef();
  const formDataRef = useFormDataRef();

  const handleSubmit = useCallback((e?: FormEvent, onSubmit?: (e?: FormEvent) => void) => {
    const uiContext = storeRef.current.uiContext;

    const parentSchemaMap = new Map<string, {
      schema: JsonSchema,
      node: SchemaNode,
    }>();

    let allNonRequiredPathsToValidate = !props.id ? ["#"] : uniq(
      uiContext.getChildControls(props.id)
        .map((node) => {
          const splitSlices = split(node.path);
          const parentPath = "#/" + splitSlices.slice(0, -1).join("/");

          if (!node.required) return parentSchemaMap.has(parentPath) ? null : node.path;

          const parentSchema = parentSchemaMap.get(parentPath) ?? {
            schema: {type: "object", properties: {}, required: [] },
            node: uiContext.deriveControlSchemaNode(parentPath, formDataRef.current)
          };

          parentSchemaMap.set(parentPath, {
            ...parentSchema,
            schema: {
              ...parentSchema.schema,
              required: [
                ...(parentSchema.schema?.required ?? []),
              ].concat(
                parentSchema.node.schema.required?.includes(splitSlices.at(-1))
                  ? splitSlices.at(-1) : []
              )
            }
          })

          return null;
        })
    );

     allNonRequiredPathsToValidate = Array.from(parentSchemaMap.keys()).reduce((nodes, key) => {
      return nodes.filter((node) => node && !node.startsWith(key));
    }, allNonRequiredPathsToValidate);


    // Validate Parent schema
    const validationState = Array.from(parentSchemaMap.entries()).reduce((x: ValidateReturnType, [path, { schema }]) => {
      const {value = null, pointer} = uiContext.deriveDataNodeAtPath(formDataRef.current, path) ?? {};
      const validateState = compileSchema(schema). validate(value, pointer);

      return {
        ...x,
        valid: x.valid && validateState.valid,
        errors: [...x.errors, ...validateState.errors],
      }
    }, {
      valid: true,
      errors: [],
      errorsAsync: [],
    });



    // Validate other properties schema
    const {errors} = allNonRequiredPathsToValidate.reduce((x, path) => {
      if (!path) return x;

      const {value = null, pointer} = uiContext.deriveDataNodeAtPath(formDataRef.current, path) ?? {};
      const validateState = uiContext.deriveControlSchemaNode(path, formDataRef.current).validate(
        value,
        pointer
      );

      return {
        ...x,
        valid: x.valid && validateState.valid,
        errors: [...x.errors, ...validateState.errors],
      }
    }, validationState);

    storeRef.current.setErrors("#", errors, true);

    if (errors.length) {
        e?.preventDefault();
        e?.stopPropagation();
        return;
    }

    if (onSubmit) onSubmit(e);
    else storeRef.current.submit?.(e, undefined, undefined, true);
  }, [storeRef, props.id]);

  return useMemo(() => ({
    onSubmit: handleSubmit,
  }), [handleSubmit])
}

