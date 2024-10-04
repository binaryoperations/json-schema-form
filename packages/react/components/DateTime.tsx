import type { FC } from 'react';
import { Input } from './Input';

export const Date: FC<JSX.IntrinsicElements['input'] & { type?: 'date' }> = (
  props
) => {
  return <Input {...props} type='date' />;
};

export const DateTime: FC<
  JSX.IntrinsicElements['input'] & { type?: 'datetime-local' }
> = (props) => {
  return <Input {...props} type='datetime-local' />;
};

export const Time: FC<JSX.IntrinsicElements['input'] & { type?: 'time' }> = (
  props
) => {
  return <Input {...props} type='time' />;
};
