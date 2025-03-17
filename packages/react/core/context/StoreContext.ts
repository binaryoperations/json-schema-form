import type { UiStore } from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { JsonError } from 'json-schema-library';

import { createFastContext } from '../fast-context';

export type ValidateData = (value: any) => {
  isValid: boolean;
  errors: JsonError[];
};

const StoreContext = createFastContext<{
  uiContext: UiStore;
  validate: ValidateData;
}>({
  debugName: 'StoreContext',
});

export const UiStoreContextProvider = StoreContext.Provider;
export const useUiStoreContext = StoreContext.useContextValue;
export const useUiStoreRef = StoreContext.useStoreRef;
