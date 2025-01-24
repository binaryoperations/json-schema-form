import type { FC } from 'react';
type DivProps = JSX.IntrinsicElements['div'];
export interface ColumnProps extends DivProps {
    reverse?: boolean;
}
export type Column = FC<ColumnProps>;
export declare const Column: Column;
export {};
//# sourceMappingURL=Column.d.ts.map