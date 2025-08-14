import type {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import LogicalSchema from '@binaryoperations/json-forms-core/schema/logical.schema';
import UiSchema from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { JsonSchema, SchemaNode } from 'json-schema-library';
import type { ComponentType, PropsWithChildren, Ref, RefObject } from 'react';
import { memo, useImperativeHandle, useMemo } from 'react';
import { useCallback } from 'react';

import { UiStoreContextProvider, UiStoreContextType, ValidateData } from '../context/StoreContext';
import { useControlState } from './useControlState';
import { useFormDataRef } from '../context/FormDataContext';
import { useLatest } from '../hooks/useLatest';
import { useValidateData } from '../hooks/useControl';
import noop from 'lodash/noop';


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
    const schemaDraftRef = useLatest(schemaDraft);
    const onSubmitLatestRef = useLatest(props.onSubmit);

    const controlState = useControlState(props.initialData, schemaDraftRef as RefObject<ReturnType<typeof LogicalSchema['parse']>>);

    const validate = useCallback(
      (value: any, schema?: JsonSchema) => schemaDraftRef.current!.validate(value, schema),
      []
    );

    const uiContext = useMemo(
      () => UiSchema.prepare(props.uiSchema, schemaDraft),
      [props.uiSchema, schemaDraft]
    );



    const validateOnSubmit = useLatest({
      uiContext,
      validationMode: "onSubmit",
      validate,
      onSubmit: noop,
      submit: noop,
      ...controlState
    });

    const validateFunc = useValidateData("#", "onSubmit", validateOnSubmit as RefObject<UiStoreContextType>);


    const submit = useCallback((data = formDataRef.current, schemaNode?: SchemaNode) => {
      const isValid = validateFunc(data, schemaNode);
      if (!isValid) return;

      return onSubmitLatestRef.current?.(formDataRef.current);
    }, [validateFunc]);


    const onSubmit: UiStoreContextType['onSubmit'] = useCallback((e?) => {
      e?.preventDefault();
      e?.stopPropagation();

      return submit();
    }, [submit]);


    useImperativeHandle(
      props.ref,
      () => ({ validate: validateFunc, resetErrors: controlState.resetErrors }),
      [validateOnSubmit, controlState.resetErrors]
    );

    const contextValue = useMemo(
      () => ({
        uiContext,
        validate,
        validationMode: props.validationMode,
        onSubmit,
        submit,
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
