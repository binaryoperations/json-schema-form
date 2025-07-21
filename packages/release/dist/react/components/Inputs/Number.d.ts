import { type InputProps } from './Input';
export interface NumberProps extends InputProps {
    type?: 'number';
    value?: number | '';
}
export declare const Number: import("react").ForwardRefExoticComponent<Omit<NumberProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Number.d.ts.map