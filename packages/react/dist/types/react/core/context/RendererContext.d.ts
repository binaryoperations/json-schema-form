import type { RankedControl } from '../../../core/controls/createControl';
import type { BaseControlProps } from '../../../core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';
import type { PropsWithChildren } from 'react';
export type RendererContextType<Props extends BaseControlProps<any, unknown, SyntheticEvent> = BaseControlProps<any, unknown, SyntheticEvent>> = {
    controls: RankedControl<ComponentType<Props>, unknown>[];
    layout: Record<string, ComponentType<PropsWithChildren<{
        id: string;
    }>>>;
};
export declare const RendererContextProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<RendererContextType<BaseControlProps<any, unknown, SyntheticEvent<Element, Event>>>>> & {
    displayName: string | undefined;
};
export declare const useRendererContext: <SelectorOutput>(selector: (store: RendererContextType<BaseControlProps<any, unknown, SyntheticEvent<Element, Event>>>) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: RendererContextType<BaseControlProps<any, unknown, SyntheticEvent<Element, Event>>>) => Partial<RendererContextType<BaseControlProps<any, unknown, SyntheticEvent<Element, Event>>>>) => void];
//# sourceMappingURL=RendererContext.d.ts.map