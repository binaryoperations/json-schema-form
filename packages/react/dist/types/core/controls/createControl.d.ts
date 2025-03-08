import { type Ranker } from '../testers/testers';
export type GetValueFromEvent<Output = any> = (...arg: any[]) => Output;
export type RankedControl<C, Value, ValueGetType = GetValueFromEvent<Value>> = {
    Control: C;
    getValueFromEvent: ValueGetType;
    deriveRank: Ranker;
};
export declare class ControlCreator<T = unknown> {
    constructor();
    create<C extends T, Value, ValueGetter extends GetValueFromEvent<Value>>(Control: C, getValueFromEvent: ValueGetter, deriveRank: Ranker): RankedControl<C, Value>;
    DateControl<C extends T>(Control: C, getValueFromEvent: GetValueFromEvent<Date | number | string>): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    TimeControl<C extends T>(Control: C, getValueFromEvent: GetValueFromEvent<string>): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    TextControl<C extends T>(Control: C, getValueFromEvent: GetValueFromEvent<string>): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    NumberControl<C extends T>(Control: C, getValueFromEvent: GetValueFromEvent<string | number>): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    ArrayControl<C extends T, ValueType = unknown>(Control: C, getValueFromEvent: GetValueFromEvent<ValueType>): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
    BooleanControl<C extends T>(Control: C, getValueFromEvent: GetValueFromEvent<boolean>): RankedControl<C, unknown, GetValueFromEvent<unknown>>;
}
//# sourceMappingURL=createControl.d.ts.map