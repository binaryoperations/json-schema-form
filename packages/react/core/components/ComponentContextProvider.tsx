import { ComponentType, PropsWithChildren } from 'react';
import {
  type RendererContextType,
  RendererContextProvider,
} from '../context/RendererContext';
import { useMemo } from 'react';

export type ComponentContextProviderProps =
  PropsWithChildren<RendererContextType>;

export type ComponentContextProvider =
  ComponentType<ComponentContextProviderProps>;

export const ComponentContextProvider: ComponentContextProvider = (props) => {
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
};
