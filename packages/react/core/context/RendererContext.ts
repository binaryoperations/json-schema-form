import type { RankedControl } from '@binaryoperations/json-forms-core/controls/createControl';
import type { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';
import type { PropsWithChildren } from 'react';

import { createFastContext } from '../fast-context';

export type RendererContextType<
  Props extends BaseControlProps<
    any,
    unknown,
    SyntheticEvent
  > = BaseControlProps<any, unknown, SyntheticEvent>,
> = {
  controls: RankedControl<ComponentType<Props>, unknown>[];
  layout: Record<string, ComponentType<PropsWithChildren<{ id: string }>>>;
};

const RendererContext = createFastContext<RendererContextType>({
  debugName: 'ComponentContext',
});

export const RendererContextProvider = RendererContext.Provider;
export const useRendererContext = RendererContext.useContextValue;
