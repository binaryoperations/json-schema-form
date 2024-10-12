import { ComponentProps } from 'react';
import { CreateFastContext, createFastContext } from '../fast-context';

const FormDataContext = createFastContext<object>(true);

export type FormDataProviderProps = ComponentProps<
  ReturnType<CreateFastContext<object>>['Provider']
>;

export const FormDataProvider = FormDataContext.Provider;
export const useStoreContextRef = FormDataContext.useStoreRef;
export const useFormDataContext = FormDataContext.useContextValue;
