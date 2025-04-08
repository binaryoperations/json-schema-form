import type { RankedControl } from '@binaryoperations/json-forms-core/controls/createControl';
import type { Breakpoints } from '@binaryoperations/json-forms-core/models';
import type { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';
export type ComponentRendererProps<T extends {}> = {
    id: string;
    breakpoints?: Breakpoints<Partial<T>>;
} & T;
type ControlProps = BaseControlProps<any, unknown, SyntheticEvent>;
export declare const ControlRepository: import("@binaryoperations/json-forms-core/internals/repository").Repository<Record<string, RankedControl<ComponentType<ControlProps>, unknown>>, string>;
export declare const LayoutRepository: import("@binaryoperations/json-forms-core/internals/repository").Repository<Record<string, ComponentType<ComponentRendererProps<{
    children?: import("react").ReactNode | undefined;
}>>>, string>;
export {};
//# sourceMappingURL=RendererContext.d.ts.map