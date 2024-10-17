import { FC, memo, ReactNode } from 'react';

import { Button, type ButtonProps } from '#/components/Button';
import { useActiveState } from '#context/ActiveStateContext';

export interface TabItemProps<T = unknown>
  extends Omit<ButtonProps, 'onClick' | 'children' | 'id'> {
  id: T;
  label: ReactNode;
}

export const TabItem: FC<TabItemProps> = memo(function Tabs(props) {
  const { id, label, className = '', ...buttonProps } = props;

  const [isActive, onActivate] = useActiveState(id);

  const state = isActive ? 'active' : 'not-active';
  const resolvedClassName = !className ? state : `${className} ${state}`;

  return (
    <Button className={resolvedClassName} onClick={onActivate} {...buttonProps}>
      {label}
    </Button>
  );
});
