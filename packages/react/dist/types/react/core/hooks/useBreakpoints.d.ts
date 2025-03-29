import type { Breakpoints } from '../../../core/models';
export declare function useBreakpoints<T extends {}, V = any>(props: T & {
    breakpoints?: Breakpoints<V>;
}): {
    value: V | undefined;
    props: Omit<T & {
        breakpoints?: Partial<{
            xs: V;
            sm: V;
            md: V;
            lg: V;
            xl: V;
        }> | undefined;
    }, "breakpoints">;
    currentBreakpoint: "xs" | "sm" | "md" | "lg" | "xl";
};
//# sourceMappingURL=useBreakpoints.d.ts.map