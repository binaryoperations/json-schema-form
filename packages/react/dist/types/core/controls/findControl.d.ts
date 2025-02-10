import type { ControlSchema, FieldsetNode, UiSchema } from '../models';
import type { RankedControl } from './createControl';
export declare const findControl: <C, Props extends {
    value: any;
}>(controls: RankedControl<C, Props>[], node: UiSchema | FieldsetNode, schema: ControlSchema) => {
    rank: number;
    Control: C;
    getValueFromEvent: import("./createControl").GetValueFromEvent<Props["value"]>;
    deriveRank: import("../testers/testers").Ranker;
} | null;
//# sourceMappingURL=findControl.d.ts.map