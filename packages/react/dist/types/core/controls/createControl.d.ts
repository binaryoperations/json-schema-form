import type { ChangeEvent } from 'react';
import { type Ranker } from '../testers/testers';
export type GetValueFromEvent<Output = any> = <T extends ChangeEvent>(e: T) => Output;
export type RankedControl<C, Props extends {
    value: any;
}> = {
    Control: C;
    getValueFromEvent: GetValueFromEvent<Props['value']>;
    deriveRank: Ranker;
};
export default function createControl<C, P extends {
    value: any;
}>(Control: C, getValueFromEvent: GetValueFromEvent<P['value']>, deriveRank: Ranker): RankedControl<C, {
    value: any;
}>;
export declare const createDateControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T, {
    value: any;
}>;
export declare const createTimeControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T, {
    value: any;
}>;
export declare const createTextControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T, {
    value: any;
}>;
export declare const createNumberControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T, {
    value: any;
}>;
export declare const createArrayControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T, {
    value: any;
}>;
export declare const createBooleanControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T, {
    value: any;
}>;
declare global {
    interface CreateControl {
        <C, Props extends {
            value: any;
        }>(Control: C, getValueFromEvent: GetValueFromEvent, deriveRank: Ranker): RankedControl<C, Props>;
    }
    var createControl: CreateControl;
}
//# sourceMappingURL=createControl.d.ts.map