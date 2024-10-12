import { type FC, type PropsWithChildren } from 'react';

import { withActiveStateContext } from '../../../context/ActiveStateContext/withActiveStateContext';
import { ID } from '../../../type';
import { Column, ColumnProps } from '../Column';
import { Row } from '../Row';
import { styles } from '../styles';
import { TabItem, TabItemProps } from './TabItem';

export type TabsProps<T extends ID = string> = PropsWithChildren<{
  tabs: Omit<TabItemProps<T>, 'onActivate'>[];
  position?: 'left' | 'right' | 'top' | 'bottom';
  tabListProps?: Omit<ColumnProps, 'children'>;
}>;

export type Tabs<T extends ID = string> = FC<TabsProps<T>>;

export const Tabs = withActiveStateContext<TabsProps<ID>>(function Tabs(props) {
  const { position = 'top', tabs, tabListProps } = props;
  const reverse = position === 'bottom' || position === 'right';
  const isVertical = position === 'top' || position === 'bottom';
  const Wrapper = isVertical ? Row : Column;
  const NodeList = isVertical ? Column : Row;

  const tabNodes = tabs.map((tabProps) => (
    <TabItem key={tabProps.id} {...tabProps} onActivate={props.onChange} />
  ));

  return (
    <Wrapper reverse={reverse}>
      <NodeList {...tabListProps}>{tabNodes}</NodeList>
      <Row style={styles.tabChildren}>{props.children}</Row>
    </Wrapper>
  );
});
