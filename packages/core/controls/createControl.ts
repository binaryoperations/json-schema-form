import type { ChangeEvent } from 'react';

import {
  isArrayRanked,
  isDateRanked,
  isNumberRanked,
  isTextRanked,
  isTimeRanked,
  type Ranker,
} from '../testers/testers';

export type GetValueFromEvent = <T extends ChangeEvent>(e: T) => any;

export type RankedControl<T> = {
  Control: T;
  getValueFromEvent: GetValueFromEvent;
  deriveRank: Ranker;
};

export default function createControl<T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent,
  deriveRank: Ranker
) {
  if (!('createControl' in globalThis))
    throw Error(`Attempted to "createControl" before registration`);
  return globalThis.createControl(Control, getValueFromEvent, deriveRank);
}

export const createDateControl = <T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent
) => createControl(Control, getValueFromEvent, isDateRanked);

export const createTimeControl = <T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent
) => createControl(Control, getValueFromEvent, isTimeRanked);

export const createTextControl = <T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent
) => createControl(Control, getValueFromEvent, isTextRanked);

export const createNumberControl = <T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent
) => createControl(Control, getValueFromEvent, isNumberRanked);

export const createArrayControl = <T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent
) => createControl(Control, getValueFromEvent, isArrayRanked);

export const createBooleanControl = <T>(
  Control: T,
  getValueFromEvent: GetValueFromEvent
) => createControl(Control, getValueFromEvent, isArrayRanked);

declare global {
  // eslint-disable-next-line no-var
  var createControl: <T>(
    C: T,
    getValueFromEvent: GetValueFromEvent,
    deriveRank: Ranker
  ) => RankedControl<T>;
}
