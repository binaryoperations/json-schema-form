import { type PropsWithChildren } from 'react';
import { type ActiveStateProps } from '../../../context/ActiveStateContext';
import { ColumnProps } from '../Column';
import { TabItemProps } from './TabItem';
export type TabsPropsBase<T = unknown> = PropsWithChildren<{
    tabs: Omit<TabItemProps<T>, 'onActivate'>[];
    position?: 'left' | 'right' | 'top' | 'bottom';
    tabListProps?: Omit<ColumnProps, 'children'>;
}>;
export type TabsProps<T = unknown> = ActiveStateProps<T> & TabsPropsBase<T>;
export declare const Tabs: (props: TabsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabParent.d.ts.map