import { ComponentProps, ComponentType } from 'react';
import { type FormDataProviderProps } from './FormDataProvider';
import { type StoreContextProviderProps } from './StoreContextProvider';
export type FormProps = Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & Omit<ComponentProps<'form'>, 'ref' | "onSubmit"> & {
    data: object;
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: StoreContextProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
    onSubmit?: StoreContextProviderProps['onSubmit'];
};
export type Bootstrap = ComponentType<FormProps>;
export declare const Bootstrap: Bootstrap;
//# sourceMappingURL=Form.d.ts.map