import { type Ranker } from '../testers/testers';
export type GetValueFromEvent<Output = any> = (...arg: any[]) => Output;
export type RankedControl<C, Value, ValueGetType = GetValueFromEvent<Value>> = {
    Control: C;
    getValueFromEvent: ValueGetType;
    deriveRank: Ranker;
};
export declare class ControlCreator<T = unknown, V = any> implements RankedControl<T, V> {
    Control: T;
    getValueFromEvent: GetValueFromEvent<V>;
    deriveRank: Ranker;
    constructor(Control: T, getValueFromEvent: GetValueFromEvent<V>, deriveRank: Ranker);
    static withType<T extends unknown>(): {
        new (Control: T, getValueFromEvent: GetValueFromEvent<any>, deriveRank: Ranker): ControlCreator<T, any>;
        withType<T extends unknown>(): /*elided*/ any;
        create<C, Value, ValueGetter extends GetValueFromEvent<Value>>(Control: C, getValueFromEvent: ValueGetter, deriveRank: Ranker): RankedControl<C, Value>;
        DateControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<Date | number | string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
        DateTimeControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<Date | number | string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
        TimeControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
        TextControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
        NumberControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<string | number>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
        ArrayControl<C, ValueType = unknown>(Control: C, getValueFromEvent: GetValueFromEvent<ValueType>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
        BooleanControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<boolean>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    };
    static create<C, Value, ValueGetter extends GetValueFromEvent<Value>>(Control: C, getValueFromEvent: ValueGetter, deriveRank: Ranker): RankedControl<C, Value>;
    static DateControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<Date | number | string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    static DateTimeControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<Date | number | string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    static TimeControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    static TextControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<string>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    static NumberControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<string | number>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    static ArrayControl<C, ValueType = unknown>(Control: C, getValueFromEvent: GetValueFromEvent<ValueType>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    static BooleanControl<C>(Control: C, getValueFromEvent: GetValueFromEvent<boolean>, customRanker?: Ranker): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    up(): this;
}
//# sourceMappingURL=createControl.d.ts.map