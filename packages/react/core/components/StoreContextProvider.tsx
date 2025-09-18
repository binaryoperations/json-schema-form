import type {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import LogicalSchema from '@binaryoperations/json-forms-core/schema/logical.schema';
import UiSchema from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { Draft, SchemaNode } from 'json-schema-library';
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
  draft?: Draft
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const schema = useMemoizedValue(props.schema, fastDeepEqual);
    const schemaDraft = useMemo(
      () => LogicalSchema.parse(schema, props.draft),
      [schema, props.draft]
    );


    const formDataRef = useFormDataRef();
    const onSubmitLatestRef = useLatest(props.onSubmit);

    const controlState = useControlState(props.initialData);

    const uiSchema = useMemoizedValue(props.uiSchema, fastDeepEqual);
    const uiContext = useMemo(
      () => UiSchema.prepare(uiSchema, schemaDraft),
      [uiSchema, schemaDraft]
    );

    const validateOnSubmit = useLatest({
      uiContext,
      validationMode: "onSubmit",
      validate: schemaDraft.validate,
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
        validate: schemaDraft.validate,
        validationMode: props.validationMode,
        onSubmit,
        submit,
        ...controlState,
      }),
      [uiContext, schemaDraft, props.validationMode, controlState, onSubmit]
    );


    return (
      <UiStoreContextProvider value={contextValue}>
        {props.children}
      </UiStoreContextProvider>
    );
  }
);
