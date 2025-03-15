import { createFastContext } from '../fast-context';
const FormDataContext = createFastContext({
    watch: true,
    debugName: 'FormDataContext',
});
export const FormDataProvider = FormDataContext.Provider;
export const useSetFormData = FormDataContext.useSetStore;
export const useFormDataContextRef = FormDataContext.useStoreRef;
export const useFormDataContext = FormDataContext.useContextValue;
//# sourceMappingURL=FormDataContext.js.map