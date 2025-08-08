
import { useUiStoreRef } from '@binaryoperations/json-forms-react/core/context/StoreContext';
import type { FC } from 'react';

export const Form: FC<React.JSX.IntrinsicElements['form']> = function Form(
  props
) {
  const storeRef = useUiStoreRef();

  return <form {...props} onSubmit={storeRef.current.onSubmit} />;
};


