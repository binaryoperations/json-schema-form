import type { ControlNode, ControlSchema } from '../../../core/models';
import type { Selector } from '../../../core/types/reducers';
/**
 *
 * Read the UI node for the current control
 *
 */
export declare function useControl<SelectorOutput>(selector: Selector<ControlNode, SelectorOutput>, equalityCheck?: (value1: any, value2: any) => boolean): SelectorOutput;
/**
 *
 * Read the schema of the control
 *
 */
export declare function useControlSchema<SelectorOutput>(selector: Selector<ControlSchema, SelectorOutput>, equalityCheck?: typeof Object.is): SelectorOutput;
/**
 *
 * Read the schema of the control
 *
 */
export declare function useControlValue<V = unknown>(path: string): [value: V, set: (value: V) => void];
//# sourceMappingURL=useControl.d.ts.map