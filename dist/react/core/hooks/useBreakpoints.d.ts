import type { Breakpoints } from '@binaryoperations/json-forms-core/models';
export declare function useBreakpoints<T extends {}, V = any>(props: T & {
    breakpoints?: Breakpoints<V>;
}): {
    value: V | undefined;
    props: Omit<T & {
        breakpoints?: Breakpoints<V>;
    }, "breakpoints">;
    currentBreakpoint: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
};
//# sourceMappingURL=useBreakpoints.d.ts.map