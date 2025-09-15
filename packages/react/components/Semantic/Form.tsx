
import { FormEvent, useCallback, useMemo, type ComponentProps } from 'react';
import { ValidateReturnType, compileSchema } from 'json-schema-library';

import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '@binaryoperations/json-forms-react/core/hooks';
import { uniqBy } from '@binaryoperations/json-forms-core/internals/object';

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

    let allValidatedResult = !props.id ?
      [uiContext.deriveControlSchemaNode("#", formDataRef.current).validate(formDataRef.current)]
      : uniqBy(uiContext.getChildControls(props.id), "path")
        .map((node) => {
          const splitSlices = split(node.path);
          const currentNode = splitSlices.at(-1)!;
          const data = uiContext.deriveDataNodeAtPath(formDataRef.current, node.path);

          if (!node.required) return uiContext
            .deriveControlSchemaNode(node.path, formDataRef.current)
            .validate(data.value, data.pointer);

          const nodeSchema = uiContext
            .deriveControlSchemaNode(node.path, formDataRef.current);

          return compileSchema({
              type: "object",
              properties: { [currentNode]: nodeSchema },
              required: node.required ? [currentNode] : []
            }, {drafts: [uiContext.draftType]})
            .validate({[currentNode]: data.value}, data.pointer);
        });



    // Validate Parent schema
    const { errors } = allValidatedResult.reduce((x: ValidateReturnType, validateState) => {
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

