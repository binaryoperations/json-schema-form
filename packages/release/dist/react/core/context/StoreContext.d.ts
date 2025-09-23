import type { UiStore } from '../../../core/schema/ui.schema';
import type { JsonError, JsonSchema, SchemaNode } from 'json-schema-library';
import type { FormEvent } from 'react';
export type ValidateData = (value: any) => {
    isValid: boolean;
    errors: JsonError[];
};
type ValidateDataInternal = (value: any, schema?: JsonSchema, pointer?: string, path?: string) => {
    isValid: boolean;
    errors: JsonError[];
};
/**
 * Submit function type
 * @param e - optional form event
 * @param data - optional form data
 * @param schemaNode - optional schema node
 * @param shouldValidate [true] - whether to validate before submitting
 */
type SubmitFunction = (e?: FormEvent, data?: object, schemaNode?: SchemaNode, shouldValidate?: boolean) => void;
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
    onSubmit: (e?: FormEvent, onSubmit?: (handleSubmit?: SubmitFunction) => void | Promise<void>) => void | Promise<void>;
    submit: SubmitFunction;
};
export declare const UiStoreContextProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<UiStoreContextType>> & {
    displayName: string | undefined;
};
export declare const useUiStoreContext: <SelectorOutput>(selector: (store: UiStoreContextType) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: UiStoreContextType) => Partial<UiStoreContextType>) => void];
export declare const useUiStoreRef: () => import("react").RefObject<UiStoreContextType>;
export {};
//# sourceMappingURL=StoreContext.d.ts.map