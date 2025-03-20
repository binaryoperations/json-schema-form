import { UiNodeType } from '@binaryoperations/json-forms-core/models';
import { ComponentType, memo, PropsWithChildren, useMemo } from 'react';

import {
  RendererContextProvider,
  type RendererContextType,
} from '../context/RendererContext';
import { createCustomLayoutRenderer } from '../hoc/createRenderer';

export type ComponentContextProviderProps =
  PropsWithChildren<RendererContextType>;

export type ComponentContextProvider =
  ComponentType<ComponentContextProviderProps>;

const CustomLayoutRenderer = createCustomLayoutRenderer(
  function CustomLayoutRendererRoot(props: PropsWithChildren) {
    return <>{props.children}</>;
  }
);

export const ComponentContextProvider: ComponentContextProvider = memo(
  function ComponentContextProvider(props) {
    const contextValue = useMemo(() => {
      const layout =
        UiNodeType['CUSTOM'] in props.layout
          ? props.layout
          : { ...props.layout, [UiNodeType['CUSTOM']]: CustomLayoutRenderer };

      return {
        layout,
        controls: props.controls,
      };
    }, [props.controls, props.layout]);

    return (
      <RendererContextProvider value={contextValue} children={props.children} />
    );
  }
);
