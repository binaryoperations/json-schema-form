import { ComponentType, type ReactNode } from 'react';
export declare function withLabel<P extends {
    id?: string;
    label?: ReactNode;
}, R = HTMLElement>(Component: ComponentType<Omit<P, 'label'>>): import("react").NamedExoticComponent<import("react").PropsWithoutRef<P> & import("react").RefAttributes<R>>;
//# sourceMappingURL=withLabel.d.ts.map