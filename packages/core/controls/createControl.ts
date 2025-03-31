import {
  isArrayRanked,
  isBooleanRanked,
  isDateRanked,
  isDateTimeRanked,
  isNumberRanked,
  isTextRanked,
  isTimeRanked,
  type Ranker,
} from '../testers/testers';

export type GetValueFromEvent<Output = any> = (...arg: any[]) => Output;

export type RankedControl<C, Value, ValueGetType = GetValueFromEvent<Value>> = {
  Control: C;
  getValueFromEvent: ValueGetType;
  deriveRank: Ranker;
};

export class ControlCreator<T = unknown> {
  constructor() {}

  create<C extends T, Value, ValueGetter extends GetValueFromEvent<Value>>(
    Control: C,
    getValueFromEvent: ValueGetter,
    deriveRank: Ranker
  ): RankedControl<C, Value> {
    return {
      Control,
      deriveRank,
      getValueFromEvent,
    };
  }

  DateControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<Date | number | string>
  ) {
    return this.create(Control, getValueFromEvent, isDateRanked);
  }

  DateTimeControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<Date | number | string>
  ) {
    return this.create(Control, getValueFromEvent, isDateTimeRanked);
  }

  TimeControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string>
  ) {
    return this.create(Control, getValueFromEvent, isTimeRanked);
  }

  TextControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string>
  ) {
    return this.create(Control, getValueFromEvent, isTextRanked);
  }

  NumberControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string | number>
  ) {
    return this.create(Control, getValueFromEvent, isNumberRanked);
  }

  ArrayControl<C extends T, ValueType = unknown>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<ValueType>
  ) {
    return this.create(Control, getValueFromEvent, isArrayRanked);
  }

  BooleanControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<boolean>
  ) {
    return this.create(Control, getValueFromEvent, isBooleanRanked);
  }
}
