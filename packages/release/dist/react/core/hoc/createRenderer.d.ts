import type { Breakpoints } from '../../../core/models';
import type { ComponentType } from 'react';
export { createLayoutRenderer };
declare function createLayoutRenderer<P extends object>(Component: ComponentType<P>): {
    (props: {
        id: string;
        breakPoints?: Breakpoints<Partial<P>>;
    } & P): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=createRenderer.d.ts.map