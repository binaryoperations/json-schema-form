import { createFastContext } from '../fast-context';

const FormDataContext = createFastContext<object>(true);

export const FormDataProvider = FormDataContext.Provider;
export const useStoreContextRef = FormDataContext.useStoreRef;
export const useFormDataContext = FormDataContext.useContextValue;
