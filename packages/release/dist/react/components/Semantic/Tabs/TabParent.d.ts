import { type PropsWithChildren } from 'react';
import { type ActiveStateProps } from '@binaryoperations/json-forms-react/context/ActiveStateContext';
import { ColumnProps } from '../Column';
import { TabItemProps } from './TabItem';
export type TabsPropsBase<T = unknown> = PropsWithChildren<{
    tabs: Omit<TabItemProps<T>, 'onActivate'>[];
    position?: 'left' | 'right' | 'top' | 'bottom';
    tabListProps?: Omit<ColumnProps, 'children'>;
}>;
export type TabsProps<T = unknown> = ActiveStateProps<T> & TabsPropsBase<T>;
export declare const Tabs: (props: TabsProps) => import("react").FunctionComponentElement<import("../../../core/fast-context").ProviderProps<import("../../../context/ActiveStateContext/types").ActiveStateType>>;
//# sourceMappingURL=TabParent.d.ts.map