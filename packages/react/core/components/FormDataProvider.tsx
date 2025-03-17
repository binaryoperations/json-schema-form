import { RefObject, useImperativeHandle } from 'react';

import {
  FormDataProvider as FormProvider,
  type FormDataProviderProps as FormProviderProps,
} from '../context/FormDataContext';
import { useUiStoreRef, type ValidateData } from '../context/StoreContext';

type FormDataRef = {
  validate: ValidateData;
  resetErrors: () => void;
};

export type FormDataProviderProps = FormProviderProps & {
  ref?: RefObject<FormDataRef | null>;
};

export const FormDataProvider = (props: FormDataProviderProps) => {
  const { ref, ...rest } = props;

  const { validate, resetErrors } = useUiStoreRef().current;

  useImperativeHandle(ref, () => ({ validate, resetErrors }), [
    validate,
    resetErrors,
  ]);

  return <FormProvider {...rest} />;
};
