import type { RankedControl } from '../../../core/controls/createControl';
import type { Breakpoints } from '../../../core/models';
import type { BaseControlProps } from '../../../core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';
export type ComponentRendererProps<T extends {}> = {
    id: string;
    breakpoints?: Breakpoints<Partial<T>>;
} & T;
type ControlProps = BaseControlProps<any, unknown, SyntheticEvent>;
export declare const ControlRepository: import("../../../core/internals/repository").Repository<Record<string, RankedControl<ComponentType<ControlProps>, unknown>>, string>;
export declare const RendererRepository: import("../../../core/internals/repository").Repository<Record<string, RankedControl<ComponentType<ControlProps>, unknown> | ComponentType<ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>>>, string>;
export {};
//# sourceMappingURL=RendererContext.d.ts.map