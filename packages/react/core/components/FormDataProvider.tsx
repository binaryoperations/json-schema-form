import { RefObject, useImperativeHandle } from 'react';

import {
  FormDataProvider as FormProvider,
  type FormDataProviderProps as FormProviderProps,
} from '../context/FormDataContext';
import { useUiStoreRef, type ValidateData } from '../context/StoreContext';

export type FormDataProviderProps = FormProviderProps & {
  ref?: RefObject<{ validate: ValidateData } | null>;
};

export const FormDataProvider = (props: FormDataProviderProps) => {
  const { ref, ...rest } = props;

  const validate = useUiStoreRef().current.validate;

  useImperativeHandle(ref, () => ({ validate }), [validate]);

  return <FormProvider {...rest} />;
};
