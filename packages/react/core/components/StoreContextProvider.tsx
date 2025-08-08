import type {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import LogicalSchema from '@binaryoperations/json-forms-core/schema/logical.schema';
import UiSchema from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { JsonSchema } from 'json-schema-library';
import type { ComponentType, PropsWithChildren, Ref } from 'react';
import { memo, useImperativeHandle, useMemo, useRef } from 'react';
import { useCallback } from 'react';

import { UiStoreContextProvider, UiStoreContextType, ValidateData } from '../context/StoreContext';
import { useControlState } from './useControlState';
import { useFormDataRef } from '../context/FormDataContext';


type FormRef = {
  validate: ValidateData;
  resetErrors: () => void;
};

export type StoreContextProviderProps = PropsWithChildren<{
  uiSchema: LayoutSchema;
  schema: ObjectJsonSchema;
  validationMode: 'onBlur' | 'onChange' | 'onSubmit';
  initialData: object;
  ref?: Ref<FormRef>;
  onSubmit?: (data: object) => void | Promise<void>;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const schemaDraft = useMemo(
      () => LogicalSchema.parse(props.schema),
      [props.schema]
    );

    const formDataRef = useFormDataRef();

    const controlState = useControlState(props.initialData, schemaDraft);


    const schemaDraftRef = useRef(schemaDraft);
    schemaDraftRef.current = schemaDraft;

    const validate = useCallback(
      (value: any, schema?: JsonSchema) => schemaDraft.validate(value, schema),
      []
    );

    const uiContext = useMemo(
      () => UiSchema.prepare(props.uiSchema, schemaDraft),
      [props.uiSchema, schemaDraft]
    );


    const onSubmitLatestRef = useRef(props.onSubmit);
    onSubmitLatestRef.current = props.onSubmit;

    const onSubmit: UiStoreContextType['onSubmit'] = useCallback((e?) => {
      e?.preventDefault();
      e?.stopPropagation();

      const {isValid} = schemaDraftRef.current.validate(formDataRef.current, props.schema);
      if (!isValid) return;

      return onSubmitLatestRef.current?.(formDataRef.current);
    }, [validate]);


    useImperativeHandle(
      props.ref,
      () => ({ validate, resetErrors: controlState.resetErrors }),
      [validate, controlState.resetErrors]
    );


    const contextValue = useMemo(
      () => ({
        uiContext,
        validate,
        validationMode: props.validationMode,
        onSubmit,
        submit: onSubmit,
        ...controlState,
      }),
      [uiContext, validate, props.validationMode, controlState, onSubmit]
    );

    return (
      <UiStoreContextProvider value={contextValue}>
        {props.children}
      </UiStoreContextProvider>
    );
  }
);
