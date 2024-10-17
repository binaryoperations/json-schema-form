import { type PropsWithChildren } from 'react';

import {
  type ActiveStateProps,
  useActiveStateContext,
} from '#context/ActiveStateContext';

import { Column, ColumnProps } from '../Column';
import { Row } from '../Row';
import { styles } from '../styles';
import { TabItem, TabItemProps } from './TabItem';

export type TabsProps<T = unknown> = PropsWithChildren<
  ActiveStateProps & {
    tabs: Omit<TabItemProps<T>, 'onActivate'>[];
    position?: 'left' | 'right' | 'top' | 'bottom';
    tabListProps?: Omit<ColumnProps, 'children'>;
  }
>;

export const Tabs = function Tabs<T = unknown>(props: TabsProps<T>) {
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
