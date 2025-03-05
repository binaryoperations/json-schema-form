import { UiSchema } from '../../../core/models';
import { ComponentType } from 'react';
import { FormDataProviderProps } from '../context/FormDataContext';
import { ComponentContextProviderProps } from './ComponentContextProvider';
export type FormProps = Omit<ComponentContextProviderProps, 'children'> & {
    uiSchema: UiSchema;
    data: object;
    style?: React.JSX.IntrinsicElements['form']['style'];
    onDataChange?: FormDataProviderProps['onChange'];
};
export type Bootstrap = ComponentType<FormProps>;
export declare const Bootstrap: Bootstrap;
//# sourceMappingURL=Form.d.ts.map