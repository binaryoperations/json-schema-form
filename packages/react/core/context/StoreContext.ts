import type { UiStore } from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { JsonError, JsonSchema } from 'json-schema-library';

import { createFastContext } from '../fast-context';

export type ValidateData = (value: any) => {
  isValid: boolean;
  errors: JsonError[];
};

type ValidateDataInternal = (
  value: any,
  schema?: JsonSchema
) => {
  isValid: boolean;
  errors: JsonError[];
};

export type UiStoreContextType = {
  uiContext: UiStore;
  validate: ValidateDataInternal;
  validationMode: 'onBlur' | 'onChange' | 'onSubmit';
  touchedControlPaths: Map<string, true>;
  dirtyControlPaths: Map<string, true>;
  errors: Map<string, JsonError[]>;

  setTouched: (path: string) => void;
  setDirty: (path: string, value: any) => void;
  setErrors: (path: string, errors: JsonError[], shouldReset: boolean) => void;
  resetErrors: () => void;
};

const StoreContext = createFastContext<UiStoreContextType>({
  debugName: 'StoreContext',
  watch: true,
});

export const UiStoreContextProvider = StoreContext.Provider;
export const useUiStoreContext = StoreContext.useContextValue;
export const useUiStoreRef = StoreContext.useStoreRef;
