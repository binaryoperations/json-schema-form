
import { useCallback, type ComponentProps } from 'react';
import { useUiStoreRef } from '../context/StoreContext';
import { useFormDataRef } from '../context/FormDataContext';

export const useFormProps = function Form(props: ComponentProps<'form'>) {
  const storeRef = useUiStoreRef();

  return {
    ...props,
    onSubmit: storeRef.current.onSubmit,
  }
};


export const useSubFormProps = function SubForm(props: ComponentProps<'form'>) {
  const storeRef = useUiStoreRef();
  const formDataRef = useFormDataRef();

  const handleSubmit = useCallback<Exclude<ComponentProps<'form'>['onSubmit'], undefined>>((e) => {
    const uiContext = storeRef.current.uiContext;
    const errors = uiContext.rootSchema
      .getSchemaNodeOf("#")
      .validate(formDataRef.current, "#", uiContext.getChildControls(props.id ?? 'root').map((control) => {
        const node = uiContext.deriveSchemaNodeAtPointer(control.path);
        return {
          pointer: node.evaluationPath,
          node,
        }
      })).errors

      storeRef.current.setErrors("#", errors, false);

      if (errors.length) {
          e.preventDefault();
          e.stopPropagation();
          return;
      }
  }, [storeRef]);

  return {
    ...props,
    onSubmitCapture: handleSubmit,
  }
}
