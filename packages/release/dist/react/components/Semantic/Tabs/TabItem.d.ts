import { FC, ReactNode } from 'react';
import { type ButtonProps } from '../../../components/Button';
export interface TabItemProps<T = unknown> extends Omit<ButtonProps, 'onClick' | 'children' | 'id'> {
    id: T;
    label: ReactNode;
}
export declare const TabItem: FC<TabItemProps>;
//# sourceMappingURL=TabItem.d.ts.map