import type { Breakpoints } from '../../../core/models';
import type { ComponentType, PropsWithChildren } from 'react';
import { ComponentRendererProps } from '../context/RendererContext';
export { createCustomLayoutRenderer, createLayoutRenderer };
declare function createLayoutRenderer<P extends object>(Component: ComponentType<P>): {
    (props: {
        id: string;
        breakPoints?: Breakpoints<Partial<P>>;
    } & P): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare function createCustomLayoutRenderer<P extends PropsWithChildren>(Component: ComponentType<P>): {
    (props: ComponentRendererProps<PropsWithChildren<P>>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=createRenderer.d.ts.map