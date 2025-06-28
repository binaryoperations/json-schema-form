import { type ChangeEvent, type SyntheticEvent } from 'react';

import { createControl } from '../../core/hoc/createControl';
import { Date, DateTime, Time } from '../Inputs/DateTime';



/**
 *
 * Date
 */

export const DateControl = createControl.DateControl(
  Date,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.value
);

/**
 *
 * Date time Input
 */

export const DateTimeControl = createControl.DateTimeControl(
  DateTime,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.value
);

/**
 *
 * Time Input
 */

export const TimeControl = createControl.TimeControl(
  Time,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.value
);
