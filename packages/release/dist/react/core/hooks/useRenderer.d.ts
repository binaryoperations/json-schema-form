import type { ComponentType } from 'react';
export declare const useLayoutNode: (type: string | ComponentType<object>) => import("../..").RankedControl | import("react").ComponentClass<import("../../core/context/RendererContext").ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>, any> | import("react").FunctionComponent<import("../../core/context/RendererContext").ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>> | import("react").ComponentClass<object, any>;
export declare const useControlNode: (id: string) => import("../../../core/controls/createControl").RankedControl<ComponentType<import("../../../core/types/control").BaseControlProps<any, any, import("react").SyntheticEvent<Element, Event>>>, unknown, (e: unknown) => unknown> | null;
//# sourceMappingURL=useRenderer.d.ts.map