import type { ComponentType } from 'react';
export declare const useLayoutNode: (type: string) => import("react").ComponentClass<import("../../core/context/RendererContext").ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>, any> | import("react").FunctionComponent<import("../../core/context/RendererContext").ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>>;
export declare const useCustomLayoutNode: (type: string | ComponentType<object>) => import("react").ComponentClass<import("../../core/context/RendererContext").ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>, any> | import("react").FunctionComponent<import("../../core/context/RendererContext").ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>> | import("react").ComponentClass<object, any>;
export declare const useControlNode: (id: string) => import("../../../core/controls/createControl").RankedControl<ComponentType<import("../../../core/types/control").BaseControlProps<any, unknown, import("react").SyntheticEvent<Element, Event>>>, unknown, (e: unknown) => unknown> | null;
//# sourceMappingURL=useRenderer.d.ts.map