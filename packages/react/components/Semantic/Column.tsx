import type { FC } from 'react';

import { styles } from './styles';

type DivProps = React.JSX.IntrinsicElements['div'];
export interface ColumnProps extends DivProps {
  reverse?: boolean;
}
export type Column = FC<ColumnProps>;

export const Column: Column = function Column(props) {
  const { reverse = false, ...divProps } = props;

  const style = {
    ...styles.column,
    ...(reverse ? styles.columnReverse : {}),
    ...props.style,
  };

  return <div {...divProps} style={style}></div>;
};
