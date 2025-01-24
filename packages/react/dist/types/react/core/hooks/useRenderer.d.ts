/// <reference types="react" />
export declare const useLayoutNode: (type: string) => import("react").ComponentClass<import("react").PropsWithChildren<{
    id: string;
}>, any> | import("react").FunctionComponent<import("react").PropsWithChildren<{
    id: string;
}>>;
export declare const useControlNode: (id: string) => {
    rank: number;
    Control: import("react").ComponentType<import("../../../core/types/control").BaseControlProps<any>>;
    getValueFromEvent: import("../../../core/controls/createControl").GetValueFromEvent;
    deriveRank: import("../../../core/testers/testers").Ranker;
} | null;
//# sourceMappingURL=useRenderer.d.ts.map