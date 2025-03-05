/// <reference types="react" />
type CheckboxAttributes = React.JSX.IntrinsicElements['input'];
export interface CheckboxProps extends CheckboxAttributes {
    type?: 'checkbox';
}
export declare const CheckboxControl: import("../../../core/controls/createControl").RankedControl<import("react").NamedExoticComponent<Omit<CheckboxProps, "ref"> & import("react").RefAttributes<HTMLElement>>, {
    value: any;
}>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map