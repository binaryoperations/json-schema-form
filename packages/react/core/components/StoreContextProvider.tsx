import type {
  LayoutSchema,
  ObjectJsonSchema,
} from '@binaryoperations/json-forms-core/models';
import LogicalSchema from '@binaryoperations/json-forms-core/schema/logical.schema';
import UiSchema from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { ComponentType, PropsWithChildren } from 'react';
import { memo, useMemo } from 'react';

import { UiStoreContextProvider } from '../context/StoreContext';

export type StoreContextProviderProps = PropsWithChildren<{
  uiSchema: LayoutSchema;
  schema: ObjectJsonSchema;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const schemaDraft = useMemo(
      () => LogicalSchema.parse(props.schema),
      [props.schema]
    );

    const uiContext = useMemo(
      () => ({
        uiContext: UiSchema.prepare(
          JSON.parse(JSON.stringify(props.uiSchema)),
          schemaDraft
        ),
      }),
      [props.uiSchema, schemaDraft]
    );

    return (
      <UiStoreContextProvider value={uiContext}>
        {props.children}
      </UiStoreContextProvider>
    );
  }
);
