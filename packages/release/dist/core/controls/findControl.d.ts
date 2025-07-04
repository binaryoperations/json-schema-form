import type { ControlSchema, LayoutSchema } from '../models';
import type { RankedControl } from './createControl';
export declare const findControl: <C, EventType, Value>(controls: RankedControl<C, Value>[], node: LayoutSchema, schema: ControlSchema) => RankedControl<C, Value, (e: EventType) => Value> | null;
//# sourceMappingURL=findControl.d.ts.map