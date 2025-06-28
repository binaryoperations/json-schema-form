import {
  type ChangeEvent,
  type SyntheticEvent,
} from 'react';

import { createControl } from '../../core/hoc/createControl';
import { TextInput } from '../Inputs/TextInput';

export const TextInputControl = createControl.TextControl(
  TextInput,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target!.value
);
