
import { FormEvent, useCallback, useMemo, type ComponentProps } from 'react';
import { ValidateReturnType } from 'json-schema-library';

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

    const allPathsToValidate = !props.id ? ["#"] : uniq(
      uiContext.getChildControls(props.id)
        .map((node) =>
          node.required
          ? "#/" + split(node.path).slice(0, -1).join("/")
          : node.path
        )
    );

    const {errors} = allPathsToValidate.reduce((x: ValidateReturnType, path) => {
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

