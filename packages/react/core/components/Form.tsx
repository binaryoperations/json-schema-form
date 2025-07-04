import { ComponentProps, ComponentType, memo, useState } from 'react';

import {
  FormDataProvider,
  type FormDataProviderProps,
} from './FormDataProvider';
import {
  StoreContextProvider,
  type StoreContextProviderProps,
} from './StoreContextProvider';
import { LayoutNode } from './LayoutNode';


export type FormProps =
  Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & Omit<ComponentProps<'form'>, 'ref'> & {
    data: object;
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: FormDataProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
  };

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  const { data, onDataChange, ref, validationMode, uiSchema, schema, ...rest} = props;
  const [initialData] = useState(props.data);


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
          <LayoutNode {...rest} id="root" />
        </FormDataProvider>
      </StoreContextProvider>
  );
});
