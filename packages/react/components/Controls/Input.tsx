import { forwardRef } from 'react';

import { withLabel } from './withLabel';

export type InputProps = JSX.IntrinsicElements['input'];

export const Input = withLabel<InputProps>(
  forwardRef(function Input(props, ref) {
    return <input {...props} ref={ref} />;
  })
);
