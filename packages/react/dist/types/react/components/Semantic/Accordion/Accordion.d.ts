import { type PropsWithChildren } from 'react';
import { type ActiveStateProps } from '../../../context/ActiveStateContext';
import { AccordionItemProps } from './AccordionItem';
export type AccordionPropsBase<T = unknown> = PropsWithChildren<{
    items: AccordionItemProps<T>[];
}>;
export type AccordionProps<T = unknown> = ActiveStateProps<T> & AccordionPropsBase<T>;
export declare function Accordion(props: AccordionProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Accordion.d.ts.map