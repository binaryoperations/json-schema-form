import { FC, memo, ReactNode } from 'react';

import { useIsActive } from '../../../context/ActiveStateContext';
import { useLatest } from '../../../core/hooks';
import useSafeCallback from '../../../core/hooks/useSafeCallback';
import type { ID } from '../../../type';
import { Button, ButtonProps } from '../../Button';

export interface TabItemProps<T extends ID = string>
  extends Omit<ButtonProps, 'onClick' | 'children' | 'id'> {
  id: T;
  label: ReactNode;
  onActivate: (id: T) => void;
}

export type TabItem = FC<TabItemProps<ID>>;

export const TabItem: TabItem = memo(function Tabs(props) {
  const { id, label, onActivate, className = '', ...buttonProps } = props;
  const onActivateRef = useLatest(onActivate);

  const isActive = useIsActive(id);

  const onChange = useSafeCallback(() => {
    onActivateRef.current?.(id);
  });

  const state = isActive ? 'active' : 'not-active';
  const resolvedClassName = !className ? state : `${className} ${state}`;

  return (
    <Button className={resolvedClassName} onClick={onChange} {...buttonProps}>
      {label}
    </Button>
  );
});
