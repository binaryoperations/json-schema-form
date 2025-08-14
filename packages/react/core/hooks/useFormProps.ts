

import { fastDeepEqual } from '@binaryoperations/json-forms-core/internals/object';

import { useCallback, type ComponentProps } from 'react';
import { useUiStoreContext, useUiStoreRef } from '../context/StoreContext';

export const useFormProps = function Form(props: ComponentProps<'form'>) {
  const storeRef = useUiStoreRef();

  return {
    ...props,
    onSubmit: storeRef.current.onSubmit,
  }
};


export const useSubFormProps = function SubForm(props: ComponentProps<'form'>) {
  const storeRef = useUiStoreRef();
  const [schemaNode] = useUiStoreContext((store) => {
    return store.uiContext.deriveSchemaNodeAtPointer(props.id!);
  }, fastDeepEqual);

  const handleSubmit = useCallback(() => {
    return storeRef.current.submit(schemaNode);
  }, [schemaNode, storeRef]);

  return {
    ...props,
    onSubmit: handleSubmit,
  }
}
