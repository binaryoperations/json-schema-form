import {
  createDateControl,
  createTimeControl,
} from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import { type ChangeEvent, forwardRef, type SyntheticEvent } from 'react';

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

export const DateControl = createDateControl(
  Date,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
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

export const DateTimeControl = createDateControl(
  DateTime,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
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
export const TimeControl = createTimeControl(
  Time,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
