import { type PropsWithChildren, useId } from 'react';

import {
  type ActiveStateProps,
  useActiveStateContext,
} from '@binaryoperations/json-forms-react/context/ActiveStateContext';

import { Row } from '../Row';
import { AccordionItem, AccordionItemProps } from './AccordionItem';

export type AccordionPropsBase<T = unknown> = PropsWithChildren<{
  items: AccordionItemProps<T>[];
}>;
export type AccordionProps<T = unknown> = ActiveStateProps<T> &
  AccordionPropsBase<T>;

const createUniqueName = (multiple: boolean, idBase: string, index: number) => {
  return multiple ? idBase + index : idBase;
};

export function Accordion(props: AccordionProps) {
  const { render } = useActiveStateContext(props);

  const name = useId();

  const { items, multiple = true } = props;

  const tabNodes = items.map((itemProps, index) => (
    <AccordionItem
      {...itemProps}
      key={itemProps.id + ''}
      name={createUniqueName(multiple, name, index)}
    />
  ));

  return render(<Row>{tabNodes}</Row>);
}
