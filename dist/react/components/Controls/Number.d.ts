import { type InputProps } from './Input';
export interface NumberProps extends InputProps {
    type?: 'number';
    value?: number | '';
}
export declare const Number: import("react").ForwardRefExoticComponent<Omit<NumberProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const NumberControl: import("@binaryoperations/json-forms-core/controls/createControl").RankedControl<import("react").ForwardRefExoticComponent<Omit<NumberProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>, unknown, import("@binaryoperations/json-forms-core/controls/createControl").GetValueFromEvent<unknown>>;
//# sourceMappingURL=Number.d.ts.map