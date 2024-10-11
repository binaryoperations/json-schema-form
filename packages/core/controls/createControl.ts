import {
  type Ranker,
  isArrayRanked,
  isDateRanked,
  isNumberRanked,
  isTextRanked,
  isTimeRanked,
} from '../testers/testers';

export default function createControl<T>(Control: T, is: Ranker) {
  return {
    Control,
    is,
  };
}

export const createDateControl = <T>(Control: T) =>
  createControl(Control, isDateRanked);

export const createTimeControl = <T>(Control: T) =>
  createControl(Control, isTimeRanked);

export const createTextControl = <T>(Control: T) =>
  createControl(Control, isTextRanked);

export const createNumberControl = <T>(Control: T) =>
  createControl(Control, isNumberRanked);

export const createArrayControl = <T>(Control: T) =>
  createControl(Control, isArrayRanked);

export const createBooleanControl = <T>(Control: T) =>
  createControl(Control, isArrayRanked);
