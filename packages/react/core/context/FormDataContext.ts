import { ComponentProps } from 'react';

import { CreateFastContext, createFastContext } from '../fast-context';

const FormDataContext = createFastContext<object>('FormDataContext', {
  watch: true,
});

export type FormDataProviderProps = ComponentProps<
  ReturnType<CreateFastContext<object>>['Provider']
>;

export const FormDataProvider = FormDataContext.Provider;
export const useSetFormData = FormDataContext.useSetStore;
export const useFormDataRef = FormDataContext.useStoreRef;
export const useFormDataContext = FormDataContext.useContextValue;
