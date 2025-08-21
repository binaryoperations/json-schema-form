
import { FormEvent, useCallback, useMemo, type ComponentProps } from 'react';
import { ValidateReturnType } from 'json-schema-library';

import { UiStoreContextProvider, useUiStoreRef } from '../../core/context/StoreContext';
import { useFormDataRef } from '../../core/context/FormDataContext';
import { useFormProps } from '../../core/hooks/useFormProps';
import { useStore } from '@binaryoperations/json-forms-react/core/hooks';

export const Form = function Form(props: ComponentProps<'form'>) {
  return <form {...useFormProps(props)}/>;
};



export const SubForm = function SubForm(props: Pick<ComponentProps<'form'>, 'children' | 'id'>) {
  const [storeRef] = useStore(x => x);
  const subFormProps = useSubFormProps({ id: props.id! });

  const contextValue = useMemo(() => ({
    ...storeRef,
    ...subFormProps,
  }), [storeRef]);

  return <UiStoreContextProvider value={contextValue}>{props.children}</UiStoreContextProvider>
}


function useSubFormProps(props: {id: string}) {
  const storeRef = useUiStoreRef();
  const formDataRef = useFormDataRef();

  const handleSubmit = useCallback((e?: FormEvent, onSubmit?: (e?: FormEvent) => void) => {
    const uiContext = storeRef.current.uiContext;

    const {errors} = uiContext.getChildControls(props.id ?? 'root').reduce((x: ValidateReturnType, control) => {
      const node = uiContext.deriveControlSchemaNode(control.path, formDataRef.current);
      const {value = null, pointer} = uiContext.deriveDataNodeAtPath(formDataRef.current, control.path) ?? {};
      const validateState = node.validate(
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

