import { ComponentProps, ComponentType } from 'react';
import { type FormDataProviderProps } from './FormDataProvider';
import { type StoreContextProviderProps } from './StoreContextProvider';
export type FormProps = Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & Omit<ComponentProps<'form'>, 'ref'> & {
    data: object;
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: FormDataProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
};
export type Bootstrap = ComponentType<FormProps>;
export declare const Bootstrap: Bootstrap;
//# sourceMappingURL=Form.d.ts.map