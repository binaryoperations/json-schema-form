import type { LayoutSchema, ObjectJsonSchema } from '../../../core/models';
import type { ComponentType, PropsWithChildren } from 'react';
export type StoreContextProviderProps = PropsWithChildren<{
    uiSchema: LayoutSchema;
    schema: ObjectJsonSchema;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;
export declare const StoreContextProvider: StoreContextProvider;
//# sourceMappingURL=StoreContextProvider.d.ts.map