import { createControl } from '../../core/hoc/createControl';
import { Date, DateTime, Time } from '../Inputs/DateTime';
/**
 *
 * Date
 */
export const DateControl = createControl.DateControl(Date, (event) => event.nativeEvent.target.value);
/**
 *
 * Date time Input
 */
export const DateTimeControl = createControl.DateTimeControl(DateTime, (event) => event.nativeEvent.target.value);
/**
 *
 * Time Input
 */
export const TimeControl = createControl.TimeControl(Time, (event) => event.nativeEvent.target.value);
