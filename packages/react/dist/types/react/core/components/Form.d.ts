import { ComponentType } from 'react';
import { ComponentContextProviderProps } from './ComponentContextProvider';
import { type FormDataProviderProps } from './FormDataProvider';
import { type StoreContextProviderProps } from './StoreContextProvider';
export type FormProps = Omit<ComponentContextProviderProps, 'children'> & Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & {
    data: object;
    style?: React.JSX.IntrinsicElements['form']['style'];
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: FormDataProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
};
export type Bootstrap = ComponentType<FormProps>;
export declare const Bootstrap: Bootstrap;
//# sourceMappingURL=Form.d.ts.map