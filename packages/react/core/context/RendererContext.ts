import { getControlRepository, getLayoutRepository } from '@binaryoperations/json-forms-core/renderers';
import type { RankedControl } from '@binaryoperations/json-forms-core/controls/createControl';
import type { Breakpoints } from '@binaryoperations/json-forms-core/models';
import type { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';
import type { PropsWithChildren } from 'react';



export type ComponentRendererProps<T extends {}> = {
  id: string;
  breakpoints?: Breakpoints<Partial<T>>;
} & T;


type ControlProps = BaseControlProps<
  any,
  unknown,
  SyntheticEvent
>

export const ControlRepository = getControlRepository<RankedControl<ComponentType<ControlProps>, unknown>>();
export const LayoutRepository = getLayoutRepository<ComponentType<ComponentRendererProps<PropsWithChildren>>>();
