import { ComponentType, memo, useState } from 'react';

import {
  FormDataProvider,
  type FormDataProviderProps,
} from './FormDataProvider';
import {
  StoreContextProvider,
  type StoreContextProviderProps,
} from './StoreContextProvider';
import { useLayoutNode } from '../hooks/useRenderer';


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

  const FormRenderer = useLayoutNode('form');

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
          <FormRenderer {...rest} id="root" />
        </FormDataProvider>
      </StoreContextProvider>
  );
});
