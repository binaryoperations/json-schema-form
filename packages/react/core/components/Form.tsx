import { ComponentType, memo } from 'react';
import {
  FormDataProvider,
  FormDataProviderProps,
} from '../context/FormDataContext';
import { UiSchema } from '@binaryoperations/json-forms-core/models';
import { StoreContextProvider } from './StoreContextProvider';
import {
  ComponentContextProvider,
  ComponentContextProviderProps,
} from './ComponentContextProvider';
import { Row } from '../../components/Semantic';
import { LayoutChildren } from './LayoutNode';

export type FormProps = Omit<ComponentContextProviderProps, 'children'> & {
  uiSchema: UiSchema;
  data: object;
  style?: JSX.IntrinsicElements['form']['style'];
  onDataChange?: FormDataProviderProps['onChange'];
};

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  return (
    <ComponentContextProvider layout={props.layout} controls={props.controls}>
      <StoreContextProvider uiSchema={props.uiSchema}>
        <FormDataProvider value={props.data} onChange={props.onDataChange}>
          <Row style={props.style}>
            <LayoutChildren id='root' />
          </Row>
        </FormDataProvider>
      </StoreContextProvider>
    </ComponentContextProvider>
  );
});
