import {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import { ComponentType, memo } from 'react';

import { Row } from '../../components/Semantic';
import {
  ComponentContextProvider,
  ComponentContextProviderProps,
} from './ComponentContextProvider';
import {
  FormDataProvider,
  type FormDataProviderProps,
} from './FormDataProvider';
import { LayoutChildren } from './LayoutNode';
import { StoreContextProvider } from './StoreContextProvider';

export type FormProps = Omit<ComponentContextProviderProps, 'children'> & {
  uiSchema: LayoutSchema;
  schema: ObjectJsonSchema;
  data: object;
  style?: React.JSX.IntrinsicElements['form']['style'];
  onDataChange?: FormDataProviderProps['onChange'];
  ref?: FormDataProviderProps['ref'];
};

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  return (
    <ComponentContextProvider layout={props.layout} controls={props.controls}>
      <StoreContextProvider uiSchema={props.uiSchema} schema={props.schema}>
        <FormDataProvider
          value={props.data}
          onChange={props.onDataChange}
          ref={props.ref}
        >
          <Row style={props.style}>
            <LayoutChildren id="root" />
          </Row>
        </FormDataProvider>
      </StoreContextProvider>
    </ComponentContextProvider>
  );
});
