import type { Breakpoints } from '@binaryoperations/json-forms-core/models';
import type { FC } from 'react';

import { styles } from './styles';

type DivProps = React.JSX.IntrinsicElements['div'];
export interface RowProps extends DivProps {
  reverse?: boolean;
  breakpoints?: Breakpoints;
}
export type Row = FC<RowProps>;

export const Row: Row = function Row(props) {
  const { reverse = false, ...divProps } = props;

  const style = {
    ...styles.row,
    ...(reverse ? styles.rowReverse : {}),
    ...props.style,
  };

  return <div {...divProps} style={style}></div>;
};
