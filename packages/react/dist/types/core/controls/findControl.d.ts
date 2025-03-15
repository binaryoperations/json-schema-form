import { ComponentType, SyntheticEvent } from 'react';
import type { ControlSchema, FieldsetNode, LayoutSchema } from '../models';
import type { RankedControl } from './createControl';
export declare const findControl: <C extends ComponentType, Value>(controls: RankedControl<C | ComponentType, Value>[], node: LayoutSchema | FieldsetNode, schema: ControlSchema) => RankedControl<C, Value, (e: SyntheticEvent) => Value> | null;
//# sourceMappingURL=findControl.d.ts.map