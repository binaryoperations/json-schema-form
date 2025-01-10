import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { type ChangeEvent, forwardRef, type SyntheticEvent } from 'react';

import { Input, type InputProps } from './Input';

export interface RadioProps extends InputProps {
  type?: 'radio';
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    return <Input {...props} type="radio" ref={ref} />;
  }
);

export const RadioControl = createBooleanControl(
  Radio,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
