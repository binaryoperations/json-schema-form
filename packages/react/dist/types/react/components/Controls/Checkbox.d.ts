/// <reference types="react" />
type CheckboxAttributes = JSX.IntrinsicElements['input'];
export interface CheckboxProps extends CheckboxAttributes {
    type?: 'checkbox';
}
export declare const CheckboxControl: import("../../../core/controls/createControl").RankedControl<import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Omit<CheckboxProps & {
    label?: import("react").ReactNode;
}, "ref"> & import("react").RefAttributes<unknown>>>, {
    value: any;
}>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map