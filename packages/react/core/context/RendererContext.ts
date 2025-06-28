import { getControlRepository, getLayoutRepository } from '@binaryoperations/json-forms-core/renderers';
import type { Breakpoints } from '@binaryoperations/json-forms-core/models';
import type { ComponentType } from 'react';
import type { PropsWithChildren } from 'react';
import { RankedControl } from '../hoc/createControl';



export type ComponentRendererProps<T extends {}> = {
  id: string;
  breakpoints?: Breakpoints<Partial<T>>;
} & T;



export const ControlRepository = getControlRepository<RankedControl>();
export const RendererRepository = getLayoutRepository<ComponentType<ComponentRendererProps<PropsWithChildren>> | RankedControl>();
