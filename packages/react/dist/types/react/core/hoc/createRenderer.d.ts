import type { GetValueFromEvent, RankedControl } from '../../../core/controls/createControl';
import type { Ranker } from '../../../core/testers/testers';
import type { BaseControlProps } from '../../../core/types/control';
import type { ComponentProps, ComponentType, PropsWithChildren } from 'react';
export declare const createLayoutRenderer: <P extends object>(Component: ComponentType<P>) => ComponentType<{
    id: string;
} & P>;
export declare const createCustomLayoutRenderer: <P extends object>(Component: ComponentType<PropsWithChildren>) => ComponentType<{
    id: string;
} & P>;
export declare const createControl: <P extends ComponentType<BaseControlProps<unknown>>>(Component: P, getValueFromEvent: GetValueFromEvent, deriveRank: Ranker) => RankedControl<P, ComponentProps<P>>;
//# sourceMappingURL=createRenderer.d.ts.map