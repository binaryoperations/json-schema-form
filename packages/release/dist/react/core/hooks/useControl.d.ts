import type { ControlNodeType, ControlSchema } from '../../../core/models';
import type { Selector } from '../../../core/types/reducers';
import { RefObject } from 'react';
import { UiStoreContextType } from '../context/StoreContext';
import type { SchemaNode } from 'json-schema-library';
/**
 *
 * Read the UI node for the current control
 *
 */
export declare function useControl<SelectorOutput = ControlNodeType>(selector: Selector<ControlNodeType, SelectorOutput>, equalityCheck?: (value1: any, value2: any) => boolean): [value: SelectorOutput, set: (value: (prev: UiStoreContextType) => Partial<UiStoreContextType>) => void];
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
export declare function useValidateData(path: string, validateOn: UiStoreContextType['validationMode'], storeRef: RefObject<UiStoreContextType>): (value: any, schema?: SchemaNode) => {
    isValid: boolean;
    errors: import("json-schema-library").JsonError[];
};
export {};
//# sourceMappingURL=useControl.d.ts.map