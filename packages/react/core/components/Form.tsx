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
  Pick<StoreContextProviderProps, 'uiSchema' | 'schema'> & Omit<ComponentProps<'form'>, 'ref' | "onSubmit"> & {
    data: object;
    onDataChange?: FormDataProviderProps['onChange'];
    ref?: StoreContextProviderProps['ref'];
    validationMode?: StoreContextProviderProps['validationMode'];
    onSubmit?:StoreContextProviderProps['onSubmit']
  };

export type Bootstrap = ComponentType<FormProps>;

export const Bootstrap: Bootstrap = memo(function Bootsrap(props) {
  const { data, onDataChange, ref, validationMode, uiSchema, schema, onSubmit, ...rest} = props;
  const [initialData] = useState(props.data);


  return (
    <FormDataProvider
      value={data}
      onChange={onDataChange}
    >
      <StoreContextProvider
        uiSchema={uiSchema}
        schema={schema}
        onSubmit={onSubmit}
        validationMode={validationMode ?? 'onBlur'}
        initialData={initialData}
        ref={ref}
      >
          <LayoutNode {...rest} id="root" />
      </StoreContextProvider>
    </FormDataProvider>
  );
});
