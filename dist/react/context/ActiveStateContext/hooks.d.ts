import type { ReactNode } from 'react';
import type { ActiveStateProps, ActiveStateType } from './types';
export declare const usePrepareContextValue: (props: ActiveStateProps) => {
    activeState: any[];
    multiple: boolean | undefined;
};
export declare function useActiveStateContext(props: ActiveStateProps): {
    onChange: (nextValue: ActiveStateType) => void;
    render: (children: ReactNode) => import("react").FunctionComponentElement<import("../../core/fast-context").ProviderProps<ActiveStateType>>;
};
//# sourceMappingURL=hooks.d.ts.map