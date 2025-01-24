import type { ChangeEvent } from 'react';
import { type Ranker } from '../testers/testers';
export type GetValueFromEvent = <T extends ChangeEvent>(e: T) => any;
export type RankedControl<T> = {
    Control: T;
    getValueFromEvent: GetValueFromEvent;
    deriveRank: Ranker;
};
export default function createControl<T>(Control: T, getValueFromEvent: GetValueFromEvent, deriveRank: Ranker): RankedControl<T>;
export declare const createDateControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T>;
export declare const createTimeControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T>;
export declare const createTextControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T>;
export declare const createNumberControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T>;
export declare const createArrayControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T>;
export declare const createBooleanControl: <T>(Control: T, getValueFromEvent: GetValueFromEvent) => RankedControl<T>;
declare global {
    var createControl: <T>(C: T, getValueFromEvent: GetValueFromEvent, deriveRank: Ranker) => RankedControl<T>;
}
//# sourceMappingURL=createControl.d.ts.map