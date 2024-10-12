import { UiStoreContextProvider } from '../context/StoreContext';
import { memo, useMemo } from 'react';
import UiSchemaPrepare from '@binaryoperations/json-forms-core/schema/ui.schema';
import type { ComponentType, PropsWithChildren } from 'react';
import type { UiSchema } from '@binaryoperations/json-forms-core/models';

export type StoreContextProviderProps = PropsWithChildren<{
  uiSchema: UiSchema;
}>;
export type StoreContextProvider = ComponentType<StoreContextProviderProps>;

export const StoreContextProvider: StoreContextProvider = memo(
  function StoreContextProvider(props) {
    const uiContext = useMemo(() => {
      return {
        uiContext: UiSchemaPrepare.parse(
          JSON.parse(JSON.stringify(props.uiSchema))
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
