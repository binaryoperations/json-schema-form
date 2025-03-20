import type { ComponentType, PropsWithChildren } from 'react';
export declare const createLayoutRenderer: <P extends object>(Component: ComponentType<P>) => ComponentType<{
    id: string;
} & P>;
export declare const createCustomLayoutRenderer: <P extends object>(Component: ComponentType<PropsWithChildren>) => ComponentType<{
    id: string;
    children?: PropsWithChildren['children'];
} & P>;
//# sourceMappingURL=createRenderer.d.ts.map