import { ControlCreator } from '@binaryoperations/json-forms-core/controls/createControl';
import { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';

export type RankedControl = ReturnType<typeof createControl.create>;

export const createControl = new ControlCreator<
  ComponentType<BaseControlProps<any, any, SyntheticEvent>>
>();
