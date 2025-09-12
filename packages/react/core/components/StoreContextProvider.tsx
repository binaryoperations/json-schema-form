import type {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import LogicalSchema from '@binaryoperations/json-forms-core/schema/logical.schema';
import UiSchema from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { JsonSchema, SchemaNode } from 'json-schema-library';
import type { ComponentType, FormEvent, PropsWithChildren, Ref, RefObject } from 'react';
import { memo, useImperativeHandle, useMemo } from 'react';
import { useCallback } from 'react';

import { UiStoreContextProvider, type UiStoreContextType, type ValidateData } from '../context/StoreContext';
import { useControlState } from './useControlState';
import { useFormDataRef } from '../context/FormDataContext';
import { useLatest } from '../hooks/useLatest';
import { useValidateData } from '../hooks/useControl';
import { fastDeepEqual, noop } from '@binaryoperations/json-forms-core/internals/object';
import { useMemoizedValue } from '../hooks/useMemoizedValue';


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
  onSubmit?: (e: FormEvent | undefined, data: object) => void | Promise<void>;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const schema = useMemoizedValue(props.schema, fastDeepEqual);
    const schemaDraft = useMemo(
      () => LogicalSchema.parse(schema),
      [schema]
    );


    const formDataRef = useFormDataRef();
    const schemaDraftRef = useLatest(schemaDraft);
    const onSubmitLatestRef = useLatest(props.onSubmit);

    const controlState = useControlState(props.initialData);

    const validate = useCallback(
      (value: any, schema?: JsonSchema) => schemaDraftRef.current!.validate(value, schema),
      []
    );

    const uiSchema = useMemoizedValue(props.uiSchema, fastDeepEqual);
    const uiContext = useMemo(
      () => UiSchema.prepare(uiSchema, schemaDraft),
      [uiSchema, schemaDraft]
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

    const submit = useCallback((e?: FormEvent, data = formDataRef.current, schemaNode?: SchemaNode, shouldValidate = true) => {
      const isValid = !shouldValidate || validateFunc(data, schemaNode);
      if (!isValid) return;

      return onSubmitLatestRef.current?.(e, formDataRef.current);
    }, [validateFunc]);


    const onSubmit = useCallback<UiStoreContextType['onSubmit']>((e?, handleSubmit? ) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (handleSubmit) return handleSubmit(e);
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
