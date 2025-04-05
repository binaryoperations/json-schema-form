import { type ChangeEvent, forwardRef, type SyntheticEvent } from 'react';

import { createControl } from '../../core/hoc/createControl';
import { Input, type InputProps } from './Input';

/**
 *
 * Date
 */
export interface DateInputProps extends InputProps {
  type?: 'date';
}

export const Date = forwardRef<HTMLInputElement, DateInputProps>(
  function Date(props, ref) {
    return <Input {...props} type="date" ref={ref} />;
  }
);

export const DateControl = createControl.DateControl(
  Date,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.value
);

/**
 *
 * Date time Input
 */
export interface DateTimeProps extends InputProps {
  type?: 'datetime-local';
}

export const DateTime = forwardRef<HTMLInputElement, DateTimeProps>(
  function DateTime(props, ref) {
    return <Input {...props} type="datetime-local" ref={ref} />;
  }
);

export const DateTimeControl = createControl.DateTimeControl(
  DateTime,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.value
);

/**
 *
 * Time Input
 */
export interface TimeProps extends InputProps {
  type?: 'time';
}
export const Time = forwardRef<HTMLInputElement, TimeProps>(
  function Time(props, ref) {
    return <Input {...props} type="time" ref={ref} />;
  }
);
export const TimeControl = createControl.TimeControl(
  Time,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.value
);
