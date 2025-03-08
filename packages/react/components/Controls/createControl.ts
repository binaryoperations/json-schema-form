import { ControlCreator } from '@binaryoperations/json-forms-core/controls/createControl';
import { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';

export const createControl = new ControlCreator<
  ComponentType<BaseControlProps<any, any, SyntheticEvent>>
>();
