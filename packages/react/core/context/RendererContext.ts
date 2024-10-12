import { type ComponentType } from 'react';
import { createFastContext } from '../fast-context';
import { RankedControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import { PropsWithChildren } from 'react';

export type RendererContextType<
  T extends BaseControlProps<any> = BaseControlProps<any>,
> = {
  controls: RankedControl<ComponentType<T>>[];
  layout: Record<string, ComponentType<PropsWithChildren<{ id: string }>>>;
};

const RendererContext = createFastContext<RendererContextType>({
  debugName: 'ComponentContext',
});

export const RendererContextProvider = RendererContext.Provider;
export const useRendererContext = RendererContext.useContextValue;
