import {
  and,
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
    getValueFromEvent: GetValueFromEvent<Date | number | string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isDateRanked, customRanker].filter((x) => x !== undefined)));
  }

  DateTimeControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<Date | number | string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isDateTimeRanked, customRanker].filter((x) => x !== undefined)));
  }

  TimeControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isTimeRanked, customRanker].filter((x) => x !== undefined)));
  }

  TextControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isTextRanked, customRanker].filter((x) => x !== undefined)));
  }

  NumberControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string | number>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isNumberRanked, customRanker].filter((x) => x !== undefined)));
  }

  ArrayControl<C extends T, ValueType = unknown>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<ValueType>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isArrayRanked, customRanker].filter((x) => x !== undefined)));
  }

  BooleanControl<C extends T>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<boolean>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isBooleanRanked, customRanker].filter((x) => x !== undefined)));
  }
}
