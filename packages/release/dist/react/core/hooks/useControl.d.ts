import type { ControlNode, ControlSchema } from '../../../core/models';
import type { Selector } from '../../../core/types/reducers';
import { UiStoreContextType } from '../context/StoreContext';
/**
 *
 * Read the UI node for the current control
 *
 */
export declare function useControl<SelectorOutput>(selector: Selector<ControlNode, SelectorOutput>, equalityCheck?: (value1: any, value2: any) => boolean): [value: SelectorOutput, set: (value: (prev: UiStoreContextType) => Partial<UiStoreContextType>) => void];
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
type ControlProps = {
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    value: any;
    setValue: (value: any) => void;
    disabled?: boolean;
    meta?: {
        touched: boolean;
        dirty: boolean;
        error?: string;
    };
};
export declare function useControlProps<P extends Record<string, any> = {}>(path: string, props: P & Pick<ControlProps, 'onBlur' | 'onFocus'>): ControlProps & P;
export {};
//# sourceMappingURL=useControl.d.ts.map