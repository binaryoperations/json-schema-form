import type { LayoutSchema, ObjectJsonSchema } from '../../../core/models';
import type { ComponentType, FormEvent, PropsWithChildren, Ref } from 'react';
import { type ValidateData } from '../context/StoreContext';
type FormRef = {
    validate: ValidateData;
    resetErrors: () => void;
};
export type StoreContextProviderProps = PropsWithChildren<{
    uiSchema: LayoutSchema;
    schema: ObjectJsonSchema;
    validationMode: 'onBlur' | 'onChange' | 'onSubmit';
    initialData: object;
    ref?: Ref<FormRef>;
    onSubmit?: (e: FormEvent | undefined, data: object) => void | Promise<void>;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;
export declare const StoreContextProvider: StoreContextProvider;
export {};
//# sourceMappingURL=StoreContextProvider.d.ts.map