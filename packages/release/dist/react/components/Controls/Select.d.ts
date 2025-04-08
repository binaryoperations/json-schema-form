import { type ReactNode } from 'react';
export type OptionProps = {
    label: ReactNode;
    id: string;
};
export type OptionGroupProps = {
    label: string;
    options: OptionProps[];
};
export type SelectProps = Omit<React.JSX.IntrinsicElements['select'], 'children'> & {
    options: (OptionProps | OptionGroupProps)[];
    label: string;
};
export declare const Select: (props: SelectProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map