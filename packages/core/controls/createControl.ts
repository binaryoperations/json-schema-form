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


export class ControlCreator<T = unknown, V = any> implements RankedControl<T, V>{
  constructor(
    public Control: T,
    public getValueFromEvent: GetValueFromEvent<V>,
    public deriveRank: Ranker,
  ) {}

  static withType<T extends unknown>() {
    return ControlCreator<T>;
  }

  static create<C, Value, ValueGetter extends GetValueFromEvent<Value>>(
    Control: C,
    getValueFromEvent: ValueGetter,
    deriveRank: Ranker
  ): RankedControl<C, Value> {
    return new this(Control, getValueFromEvent, deriveRank);
  }

  static DateControl<C>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<Date | number | string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isDateRanked, customRanker].filter((x) => x !== undefined)));
  }

  static DateTimeControl<C>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<Date | number | string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isDateTimeRanked, customRanker].filter((x) => x !== undefined)));
  }

  static TimeControl<C>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isTimeRanked, customRanker].filter((x) => x !== undefined)));
  }

  static TextControl<C>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isTextRanked, customRanker].filter((x) => x !== undefined)));
  }

  static NumberControl<C>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<string | number>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isNumberRanked, customRanker].filter((x) => x !== undefined)));
  }

  static ArrayControl<C, ValueType = unknown>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<ValueType>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isArrayRanked, customRanker].filter((x) => x !== undefined)));
  }

  static BooleanControl<C>(
    Control: C,
    getValueFromEvent: GetValueFromEvent<boolean>,
    customRanker?: Ranker
  ) {
    return this.create(Control, getValueFromEvent, and.apply(null, [isBooleanRanked, customRanker].filter((x) => x !== undefined)));
  }

  up() {
    this.deriveRank = and(this.deriveRank, () => 1);
    return this;
  }
}
