import {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import { ComponentType, memo } from 'react';

import { Row } from '../../components/Semantic';
import {
  FormDataProvider,
  FormDataProviderProps,
} from '../context/FormDataContext';
import {
  ComponentContextProvider,
  ComponentContextProviderProps,
} from './ComponentContextProvider';
import { LayoutChildren } from './LayoutNode';
import { StoreContextProvider } from './StoreContextProvider';

export type FormProps = Omit<ComponentContextProviderProps, 'children'> & {
  uiSchema: LayoutSchema;
  schema: ObjectJsonSchema;
  data: object;
  style?: React.JSX.IntrinsicElements['form']['style'];
  onDataChange?: FormDataProviderProps['onChange'];
};

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  return (
    <ComponentContextProvider layout={props.layout} controls={props.controls}>
      <StoreContextProvider uiSchema={props.uiSchema} schema={props.schema}>
        <FormDataProvider value={props.data} onChange={props.onDataChange}>
          <Row style={props.style}>
            <LayoutChildren id="root" />
          </Row>
        </FormDataProvider>
      </StoreContextProvider>
    </ComponentContextProvider>
  );
});
