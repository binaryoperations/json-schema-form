import { type ChangeEvent, type SyntheticEvent } from 'react';

import { createControl } from '../../core/hoc/createControl';
import { Number } from '../Inputs/Number';

export const NumberControl = createControl.NumberControl(
  Number,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) => {
    const value = event.currentTarget.value;
    return value === '' || isNaN(+value) ? '' : +value;
  }
);
