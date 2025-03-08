import { type ChangeEvent, forwardRef, type SyntheticEvent } from 'react';

import { createControl } from './createControl';
import { Input, type InputProps } from './Input';

export interface RadioProps extends InputProps {
  type?: 'radio';
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    return <Input {...props} type="radio" ref={ref} />;
  }
);

export const RadioControl = createControl.BooleanControl(
  Radio,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.checked
);
