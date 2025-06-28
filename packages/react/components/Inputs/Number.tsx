import { forwardRef, } from 'react';

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
