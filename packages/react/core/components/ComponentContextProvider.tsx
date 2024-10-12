import { ComponentType, memo, PropsWithChildren, useMemo } from 'react';

import {
  RendererContextProvider,
  type RendererContextType,
} from '../context/RendererContext';

export type ComponentContextProviderProps =
  PropsWithChildren<RendererContextType>;

export type ComponentContextProvider =
  ComponentType<ComponentContextProviderProps>;

export const ComponentContextProvider: ComponentContextProvider = memo(
  function ComponentContextProvider(props) {
    const contextValue = useMemo(
      () => ({
        layout: props.layout,
        controls: props.controls,
      }),
      [props.controls, props.layout]
    );

    return (
      <RendererContextProvider value={contextValue} children={props.children} />
    );
  }
);
