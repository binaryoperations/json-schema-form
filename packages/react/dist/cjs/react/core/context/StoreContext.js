import { createFastContext } from '../fast-context';
const StoreContext = createFastContext('StoreContext', {
    watch: true,
});
export const UiStoreContextProvider = StoreContext.Provider;
export const useUiStoreContext = StoreContext.useContextValue;
export const useUiStoreRef = StoreContext.useStoreRef;
//# sourceMappingURL=StoreContext.js.map