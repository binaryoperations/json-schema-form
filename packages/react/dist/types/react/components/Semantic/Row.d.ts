import type { FC } from 'react';
type DivProps = JSX.IntrinsicElements['div'];
export interface RowProps extends DivProps {
    reverse?: boolean;
}
export type Row = FC<RowProps>;
export declare const Row: Row;
export {};
//# sourceMappingURL=Row.d.ts.map