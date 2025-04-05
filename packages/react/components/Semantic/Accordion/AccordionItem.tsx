import { FC, memo, ReactNode } from 'react';

import { useActiveState } from '@binaryoperations/json-forms-react/context/ActiveStateContext';

export type DetailsProp = React.JSX.IntrinsicElements['details'];

export interface AccordionItemProps<T = unknown>
  extends Omit<DetailsProp, 'onClick' | 'children' | 'id'> {
  id: T;
  label: ReactNode;
  description: ReactNode;
}

export const AccordionItem: FC<AccordionItemProps> = memo(function Tabs(props) {
  const { id, label, className = '', description, ...detailsProps } = props;

  const [isActive, onActivate] = useActiveState(id);

  const state = isActive ? 'active' : 'not-active';
  const resolvedClassName = !className ? state : `${className} ${state}`;

  return (
    <details {...detailsProps} open={isActive} className={resolvedClassName}>
      <summary
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onActivate();
        }}
      >
        {label}
      </summary>
      {description}
    </details>
  );
});
