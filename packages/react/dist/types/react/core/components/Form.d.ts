import { LayoutSchema, ObjectJsonSchema } from '../../../core/models';
import { ComponentType } from 'react';
import { FormDataProviderProps } from '../context/FormDataContext';
import { ComponentContextProviderProps } from './ComponentContextProvider';
export type FormProps = Omit<ComponentContextProviderProps, 'children'> & {
    uiSchema: LayoutSchema;
    schema: ObjectJsonSchema;
    data: object;
    style?: React.JSX.IntrinsicElements['form']['style'];
    onDataChange?: FormDataProviderProps['onChange'];
};
export type Bootstrap = ComponentType<FormProps>;
export declare const Bootstrap: Bootstrap;
//# sourceMappingURL=Form.d.ts.map