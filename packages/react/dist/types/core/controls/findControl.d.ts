import { ComponentType, SyntheticEvent } from 'react';
import type { ControlSchema, FieldsetNode, UiSchema } from '../models';
import type { RankedControl } from './createControl';
export declare const findControl: <C extends ComponentType, Value>(controls: RankedControl<C | ComponentType, Value>[], node: UiSchema | FieldsetNode, schema: ControlSchema) => RankedControl<C, Value, (e: SyntheticEvent) => Value> | null;
//# sourceMappingURL=findControl.d.ts.map