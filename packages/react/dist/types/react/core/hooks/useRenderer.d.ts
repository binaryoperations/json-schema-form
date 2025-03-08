import type { ComponentType } from 'react';
export declare const useLayoutNode: (type: string) => import("react").ComponentClass<import("react").PropsWithChildren<{
    id: string;
}>, any> | import("react").FunctionComponent<import("react").PropsWithChildren<{
    id: string;
}>>;
export declare const useCustomLayoutNode: (type: string | ComponentType<object>) => import("react").ComponentClass<import("react").PropsWithChildren<{
    id: string;
}>, any> | import("react").FunctionComponent<import("react").PropsWithChildren<{
    id: string;
}>> | import("react").ComponentClass<object, any>;
export declare const useControlNode: (id: string) => import("../../../core/controls/createControl").RankedControl<ComponentType<import("../../../core/types/control").BaseControlProps<any, unknown, import("react").SyntheticEvent<Element, Event>>>, unknown, (e: import("react").SyntheticEvent<Element, Event>) => unknown> | null;
//# sourceMappingURL=useRenderer.d.ts.map