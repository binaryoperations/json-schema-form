import { createNumberControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { type ChangeEvent, forwardRef, type SyntheticEvent } from 'react';

import { Input, type InputProps } from './Input';

export interface NumberProps extends InputProps {
  type?: 'number';
}

export const Number = forwardRef<HTMLInputElement, NumberProps>(
  function Number(props, ref) {
    return <Input {...props} type="number" ref={ref} />;
  }
);

export const NumberControl = createNumberControl(
  Number,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
