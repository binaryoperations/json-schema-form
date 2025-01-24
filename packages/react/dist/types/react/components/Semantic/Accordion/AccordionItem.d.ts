import { FC, ReactNode } from 'react';
export type DetailsProp = JSX.IntrinsicElements['details'];
export interface AccordionItemProps<T = unknown> extends Omit<DetailsProp, 'onClick' | 'children' | 'id'> {
    id: T;
    label: ReactNode;
    description: ReactNode;
}
export declare const AccordionItem: FC<AccordionItemProps>;
//# sourceMappingURL=AccordionItem.d.ts.map