import { type PropsWithChildren } from 'react';

import {
  type ActiveStateProps,
  useActiveStateContext,
} from '@binaryoperations/json-forms-react/context/ActiveStateContext';

import { Column, ColumnProps } from '../Column';
import { Row } from '../Row';
import { styles } from '../styles';
import { TabItem, TabItemProps } from './TabItem';

export type TabsPropsBase<T = unknown> = PropsWithChildren<{
  tabs: Omit<TabItemProps<T>, 'onActivate'>[];
  position?: 'left' | 'right' | 'top' | 'bottom';
  tabListProps?: Omit<ColumnProps, 'children'>;
}>;

export type TabsProps<T = unknown> = ActiveStateProps<T> & TabsPropsBase<T>;

export const Tabs = function Tabs(props: TabsProps) {
  const { render } = useActiveStateContext(props);

  const { position = 'top', tabs, tabListProps } = props;
  const reverse = position === 'bottom' || position === 'right';
  const isVertical = position === 'top' || position === 'bottom';
  const Wrapper = isVertical ? Row : Column;
  const NodeList = isVertical ? Column : Row;

  const tabNodes = tabs.map((tabProps) => (
    <TabItem key={tabProps.id + ''} {...tabProps} />
  ));

  return render(
    <Wrapper reverse={reverse}>
      <NodeList {...tabListProps}>{tabNodes}</NodeList>
      <Row style={styles.tabChildren}>{props.children}</Row>
    </Wrapper>
  );
};
