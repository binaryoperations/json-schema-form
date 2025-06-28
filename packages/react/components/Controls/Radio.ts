import { type ChangeEvent, type SyntheticEvent } from 'react';

import { createControl } from '../../core/hoc/createControl';
import { Radio } from '../Inputs/Radio';


export const RadioControl = createControl.BooleanControl(
  Radio,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.checked
);
