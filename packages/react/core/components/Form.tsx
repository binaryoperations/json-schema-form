import { ComponentType, memo, useState } from 'react';

import {
  FormDataProvider,
  type FormDataProviderProps,
} from './FormDataProvider';
import {
  StoreContextProvider,
  type StoreContextProviderProps,
} from './StoreContextProvider';
import { useCustomLayoutNode } from '../hooks/useRenderer';
import { LayoutChildren } from './LayoutNode';


export type FormProps =
  Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & React.JSX.IntrinsicElements['form'] & {
    data: object;
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: FormDataProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
  };

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  const { data, onDataChange, ref, validationMode, uiSchema, schema, ...rest} = props;
  const [initialData] = useState(props.data);

  const FormRenderer = useCustomLayoutNode('form');

  return (
      <StoreContextProvider
        uiSchema={uiSchema}
        schema={schema}
        validationMode={validationMode ?? 'onBlur'}
        initialData={initialData}
      >
        <FormDataProvider
          value={data}
          onChange={onDataChange}
          ref={ref}
        >
          <FormRenderer {...rest} id="root">
            <LayoutChildren id='root' />
          </FormRenderer>
        </FormDataProvider>
      </StoreContextProvider>
  );
});
