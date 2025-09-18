
import { FormEvent, useCallback, useMemo, type ComponentProps } from 'react';


import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '@binaryoperations/json-forms-react/core/hooks';
import { uniqBy } from '@binaryoperations/json-forms-core/internals/object';

import {split} from "@sagold/json-pointer"
import { JsonError } from '@binaryoperations/json-forms-core/lib';


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

    let allValidatedResult = !props.id ?
      [storeRef.current.validate(formDataRef.current, uiContext.deriveControlSchemaNode("#", formDataRef.current))]
      : uniqBy(uiContext.getChildControls(props.id), "path")
        .map((node) => {
          const splitSlices = split(node.path);
          const currentNode = splitSlices.at(-1)!;
          const data = uiContext.deriveDataNodeAtPath(formDataRef.current, node.path);

          if (!node.required) return storeRef.current.validate(
            formDataRef.current,
            uiContext.deriveControlSchemaNode(node.path, formDataRef.current),
            node.path
          );

          const nodeSchema = uiContext
            .deriveControlSchemaNode(node.path, formDataRef.current);

          return storeRef.current.validate(
            { [currentNode]: data.value },
            uiContext.deriveSchemaNode({
              type: "object",
              properties: { [currentNode]: nodeSchema.schema },
              required: node.required ? [currentNode] : []
            }),
            ["#", ...splitSlices.slice(0, -1)].join("/"),
            "#",
          );
        });



    // Validate Parent schema
    const { errors } = allValidatedResult.reduce((x, validateState) => {
      return {
        ...x,
        isValid: x.valid && validateState.isValid,
        errors: [...x.errors, ...validateState.errors],
      }
    }, {
      valid: true,
      errors: [] as JsonError[],
    });


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

