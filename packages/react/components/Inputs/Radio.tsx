import { forwardRef } from 'react';

import { Input, type InputProps } from './Input';

export interface RadioProps extends InputProps {
  type?: 'radio';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    return <Input {...props} type="radio" ref={ref} />;
  }
);


