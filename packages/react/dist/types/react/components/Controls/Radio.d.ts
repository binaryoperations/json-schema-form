/// <reference types="react" />
import { type InputProps } from './Input';
export interface RadioProps extends InputProps {
    type?: 'radio';
}
export declare const RadioControl: import("../../../core/controls/createControl").RankedControl<import("react").ForwardRefExoticComponent<Omit<RadioProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>, {
    value: any;
}>;
//# sourceMappingURL=Radio.d.ts.map