
import type { ComponentProps, FormEvent } from 'react';
import { useUiStoreRef } from '../context/StoreContext';

export const useFormProps = function Form(props: ComponentProps<'form'>) {
  const storeRef = useUiStoreRef();

  return {
    ...props,
    onSubmit: storeRef.current.onSubmit,
  }
};


export const useSubmitButtonProps = function useSubmitButtonProps(): ComponentProps<'button'> {
  const storeRef = useUiStoreRef();

  return {
    type: 'submit',
    // disabled: storeRef.current.isSubmitting,
    onClick: (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      storeRef.current.onSubmit(e);
    },
  };
}
