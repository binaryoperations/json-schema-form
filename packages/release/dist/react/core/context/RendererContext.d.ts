import type { Breakpoints } from '../../../core/models';
import type { ComponentType } from 'react';
import { RankedControl } from '../hoc/createControl';
export type ComponentRendererProps<T extends {}> = {
    id: string;
    breakpoints?: Breakpoints<Partial<T>>;
} & T;
export declare const ControlRepository: import("../../../core/internals/repository").Repository<Record<string, RankedControl>, string>;
export declare const RendererRepository: import("../../../core/internals/repository").Repository<Record<string, RankedControl | ComponentType<ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>>>, string>;
//# sourceMappingURL=RendererContext.d.ts.map