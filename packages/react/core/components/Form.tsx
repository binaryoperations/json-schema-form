import { ComponentType, memo, useState } from 'react';

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
import {
  StoreContextProvider,
  type StoreContextProviderProps,
} from './StoreContextProvider';

export type FormProps = Omit<ComponentContextProviderProps, 'children'> &
  Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & {
    data: object;
    style?: React.JSX.IntrinsicElements['form']['style'];
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: FormDataProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
  };

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  const [initialData] = useState(props.data);

  return (
    <ComponentContextProvider layout={props.layout} controls={props.controls}>
      <StoreContextProvider
        uiSchema={props.uiSchema}
        schema={props.schema}
        validationMode={props.validationMode ?? 'onBlur'}
        initialData={initialData}
      >
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
