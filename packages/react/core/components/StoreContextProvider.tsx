import type { UiSchema } from '@binaryoperations/json-forms-core/models';
import UiSchemaPrepare from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { ComponentType, PropsWithChildren } from 'react';
import { memo, useMemo } from 'react';

import { UiStoreContextProvider } from '../context/StoreContext';

export type StoreContextProviderProps = PropsWithChildren<{
  uiSchema: UiSchema;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const uiContext = useMemo(() => {
      return {
        uiContext: UiSchemaPrepare.parse(
          JSON.parse(JSON.stringify(props.uiSchema)),
        ),
      };
    }, [props.uiSchema]);

    return (
      <UiStoreContextProvider value={uiContext}>
        {props.children}
      </UiStoreContextProvider>
    );
  }
);
