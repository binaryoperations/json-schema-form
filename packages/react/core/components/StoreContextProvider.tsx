import type {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import LogicalSchema from '@binaryoperations/json-forms-core/schema/logical.schema';
import UiSchema from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { JsonSchema } from 'json-schema-library';
import type { ComponentType, PropsWithChildren } from 'react';
import { memo, useMemo } from 'react';
import { useCallback } from 'react';

import { UiStoreContextProvider } from '../context/StoreContext';
import { useControlState } from './useControlState';

export type StoreContextProviderProps = PropsWithChildren<{
  uiSchema: LayoutSchema;
  schema: ObjectJsonSchema;
  validationMode: 'onBlur' | 'onChange' | 'onSubmit';
  initialData: object;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const schemaDraft = useMemo(
      () => LogicalSchema.parse(props.schema),
      [props.schema]
    );

    const controlState = useControlState(props.initialData, schemaDraft);

    const validate = useCallback(
      (value: any, schema?: JsonSchema) => schemaDraft.validate(value, schema),
      [schemaDraft]
    );

    const uiContext = useMemo(
      () => UiSchema.prepare(props.uiSchema, schemaDraft),
      [props.uiSchema, schemaDraft]
    );

    const contextValue = useMemo(
      () => ({
        uiContext,
        validate,
        validationMode: props.validationMode,
        ...controlState,
      }),
      [uiContext, validate, props.validationMode, controlState]
    );

    return (
      <UiStoreContextProvider value={contextValue}>
        {props.children}
      </UiStoreContextProvider>
    );
  }
);
