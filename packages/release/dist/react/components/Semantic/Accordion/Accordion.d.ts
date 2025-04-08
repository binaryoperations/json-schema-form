import { type PropsWithChildren } from 'react';
import { type ActiveStateProps } from '../../../context/ActiveStateContext';
import { AccordionItemProps } from './AccordionItem';
export type AccordionPropsBase<T = unknown> = PropsWithChildren<{
    items: AccordionItemProps<T>[];
}>;
export type AccordionProps<T = unknown> = ActiveStateProps<T> & AccordionPropsBase<T>;
export declare function Accordion(props: AccordionProps): import("react").FunctionComponentElement<import("../../../core/fast-context").ProviderProps<import("../../../context/ActiveStateContext/types").ActiveStateType>>;
//# sourceMappingURL=Accordion.d.ts.map