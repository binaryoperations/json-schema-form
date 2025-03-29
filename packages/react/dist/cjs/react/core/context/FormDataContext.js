import { createFastContext } from '../fast-context';
const FormDataContext = createFastContext('FormDataContext', {
    watch: true,
});
export const FormDataProvider = FormDataContext.Provider;
export const useSetFormData = FormDataContext.useSetStore;
export const useFormDataRef = FormDataContext.useStoreRef;
export const useFormDataContext = FormDataContext.useContextValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybURhdGFDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS9jb250ZXh0L0Zvcm1EYXRhQ29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdkUsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQVMsaUJBQWlCLEVBQUU7SUFDbkUsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDLENBQUM7QUFNSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO0FBQzFELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO0FBQzFELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLGVBQWUsQ0FBQyxlQUFlLENBQUMifQ==