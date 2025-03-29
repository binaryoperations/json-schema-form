import type { Breakpoints } from '../../../core/models';
import type { FC } from 'react';
type DivProps = React.JSX.IntrinsicElements['div'];
export interface RowProps extends DivProps {
    reverse?: boolean;
    breakpoints?: Breakpoints;
}
export type Row = FC<RowProps>;
export declare const Row: Row;
export {};
//# sourceMappingURL=Row.d.ts.map