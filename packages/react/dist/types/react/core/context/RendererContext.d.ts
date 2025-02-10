import type { RankedControl } from '../../../core/controls/createControl';
import type { BaseControlProps } from '../../../core/types/control';
import type { ComponentType } from 'react';
import type { PropsWithChildren } from 'react';
export type RendererContextType<Props extends BaseControlProps<any> = BaseControlProps<any>> = {
    controls: RankedControl<ComponentType<Props>, Props>[];
    layout: Record<string, ComponentType<PropsWithChildren<{
        id: string;
    }>>>;
};
export declare const RendererContextProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<RendererContextType<BaseControlProps<any>>>> & {
    displayName: string | undefined;
};
export declare const useRendererContext: <SelectorOutput>(selector: (store: RendererContextType<BaseControlProps<any>>) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => SelectorOutput;
//# sourceMappingURL=RendererContext.d.ts.map