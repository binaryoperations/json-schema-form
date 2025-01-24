/// <reference types="react" />
import { type InputProps } from './Input';
export interface NumberProps extends InputProps {
    type?: 'number';
}
export declare const Number: import("react").ForwardRefExoticComponent<Omit<NumberProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const NumberControl: import("../../../core/controls/createControl").RankedControl<import("react").ForwardRefExoticComponent<Omit<NumberProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>>;
//# sourceMappingURL=Number.d.ts.map