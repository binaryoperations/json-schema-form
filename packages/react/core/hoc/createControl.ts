import { ControlCreator, RankedControl as RankedControlBase } from '@binaryoperations/json-forms-core/controls/createControl';
import { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';

export type RankedControl = RankedControlBase<ComponentType<BaseControlProps<any, any, SyntheticEvent>>, unknown>;

export const createControl = ControlCreator.withType<
  ComponentType<BaseControlProps<any, any, SyntheticEvent>>
>();
