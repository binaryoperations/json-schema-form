import type { ChangeEvent } from 'react';

import {
  isArrayRanked,
  isDateRanked,
  isNumberRanked,
  isTextRanked,
  isTimeRanked,
  type Ranker,
} from '../testers/testers';

import { cast } from '#/internals/cast';

export type GetValueFromEvent<Output = any> = <T extends ChangeEvent>(e: T) => Output;

export type RankedControl<C extends unknown, Props extends { value: any }> = {
  Control: C;
  getValueFromEvent: GetValueFromEvent<Props['value']>;
  deriveRank: Ranker;
};

export default function createControl<C extends unknown, P extends { value: any }>(
  Control: C,
  getValueFromEvent: GetValueFromEvent<P['value']>,
  deriveRank: Ranker
) {
  if (!('createControl' in globalThis))
    throw Error(`Attempted to "createControl" before registration`);
  return cast<{ createControl: CreateControl }>(globalThis).createControl(Control, getValueFromEvent, deriveRank);
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
  interface CreateControl {
    <C extends unknown, Props extends { value: any }>(
      Control: C,
      getValueFromEvent: GetValueFromEvent,
      deriveRank: Ranker
    ): RankedControl<C, Props>;
  }

  var createControl: CreateControl;
}
