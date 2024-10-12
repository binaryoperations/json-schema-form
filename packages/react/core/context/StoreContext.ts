import { UiStore } from '@binaryoperations/json-forms-core/schema/ui.schema';
import { createFastContext } from '../fast-context';

const StoreContext = createFastContext<{ uiContext: UiStore }>({
  debugName: 'StoreContext',
});

export const UiStoreContextProvider = StoreContext.Provider;
export const useUiStoreContext = StoreContext.useContextValue;
