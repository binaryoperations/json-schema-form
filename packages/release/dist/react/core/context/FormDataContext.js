import { createFastContext } from '../fast-context';
const FormDataContext = createFastContext('FormDataContext', {
    watch: true,
});
export const FormDataProvider = FormDataContext.Provider;
export const useSetFormData = FormDataContext.useSetStore;
export const useFormDataRef = FormDataContext.useStoreRef;
export const useFormDataContext = FormDataContext.useContextValue;
