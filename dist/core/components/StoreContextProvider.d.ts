import type { LayoutSchema, ObjectJsonSchema } from '@binaryoperations/json-forms-core/models';
import type { ComponentType, PropsWithChildren } from 'react';
export type StoreContextProviderProps = PropsWithChildren<{
    uiSchema: LayoutSchema;
    schema: ObjectJsonSchema;
    validationMode: 'onBlur' | 'onChange' | 'onSubmit';
    initialData: object;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;
export declare const StoreContextProvider: StoreContextProvider;
//# sourceMappingURL=StoreContextProvider.d.ts.map