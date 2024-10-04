import type { FC } from 'react';
import { Input } from './Input';

export const Checkbox: FC<
  JSX.IntrinsicElements['input'] & { type?: 'checkbox' }
> = (props) => {
  return <Input {...props} type='checkbox' />;
};
