import { type ComponentType, type ReactNode } from 'react';
export declare function withLabel<P extends {
    id?: string;
}>(Component: ComponentType<P>): import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<P & {
    label?: ReactNode;
}> & import("react").RefAttributes<unknown>>>;
//# sourceMappingURL=withLabel.d.ts.map