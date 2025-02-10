import type { ComponentType } from 'react';
export declare const useLayoutNode: (type: string) => import("react").ComponentClass<import("react").PropsWithChildren<{
    id: string;
}>, any> | import("react").FunctionComponent<import("react").PropsWithChildren<{
    id: string;
}>>;
export declare const useCustomLayoutNode: (type: string | ComponentType<object>) => import("react").FunctionComponent<object> | import("react").ComponentClass<import("react").PropsWithChildren<{
    id: string;
}>, any> | import("react").FunctionComponent<import("react").PropsWithChildren<{
    id: string;
}>> | import("react").ComponentClass<object, any>;
export declare const useControlNode: (id: string) => {
    rank: number;
    Control: ComponentType<import("../../../core/types/control").BaseControlProps<any>>;
    getValueFromEvent: import("../../../core/controls/createControl").GetValueFromEvent<any>;
    deriveRank: import("../../../core/testers/testers").Ranker;
} | null;
//# sourceMappingURL=useRenderer.d.ts.map