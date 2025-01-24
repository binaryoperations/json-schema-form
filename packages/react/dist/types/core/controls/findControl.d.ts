import type { ControlSchema, FieldsetNode, UiSchema } from '../models';
import type { RankedControl } from './createControl';
export declare const findControl: <T>(controls: RankedControl<T>[], node: UiSchema | FieldsetNode, schema: ControlSchema) => {
    rank: number;
    Control: T;
    getValueFromEvent: import("./createControl").GetValueFromEvent;
    deriveRank: import("../testers/testers").Ranker;
} | null;
//# sourceMappingURL=findControl.d.ts.map