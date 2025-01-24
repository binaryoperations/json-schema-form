import { createFastContext } from '../fast-context';
const StoreContext = createFastContext({
    debugName: 'StoreContext',
});
export const UiStoreContextProvider = StoreContext.Provider;
export const useUiStoreContext = StoreContext.useContextValue;
//# sourceMappingURL=StoreContext.js.map