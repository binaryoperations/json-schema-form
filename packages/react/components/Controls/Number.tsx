import { type ChangeEvent, forwardRef, type SyntheticEvent } from 'react';

import { createControl } from '../../core/hoc/createControl';
import { Input, type InputProps } from './Input';

export interface NumberProps extends InputProps {
  type?: 'number';
  value?: number | '';
}

export const Number = forwardRef<HTMLInputElement, NumberProps>(
  function Number(props, ref) {
    return <Input {...props} type="number" ref={ref} />;
  }
);

export const NumberControl = createControl.NumberControl(
  Number,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) => {
    const value = event.currentTarget.value;
    return value === '' || isNaN(+value) ? '' : +value;
  }
);
