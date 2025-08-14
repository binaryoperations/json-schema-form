import type { UiStore } from '../../../core/schema/ui.schema';
import type { JsonError, JsonSchema, SchemaNode } from 'json-schema-library';
import type { FormEvent } from 'react';
export type ValidateData = (value: any) => {
    isValid: boolean;
    errors: JsonError[];
};
type ValidateDataInternal = (value: any, schema?: JsonSchema) => {
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
    onSubmit: (e?: FormEvent<HTMLFormElement>) => void | Promise<void>;
    submit: (schemaNode: SchemaNode) => void;
};
export declare const UiStoreContextProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<UiStoreContextType>> & {
    displayName: string | undefined;
};
export declare const useUiStoreContext: <SelectorOutput>(selector: (store: UiStoreContextType) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: UiStoreContextType) => Partial<UiStoreContextType>) => void];
export declare const useUiStoreRef: () => import("react").RefObject<UiStoreContextType>;
export {};
//# sourceMappingURL=StoreContext.d.ts.map