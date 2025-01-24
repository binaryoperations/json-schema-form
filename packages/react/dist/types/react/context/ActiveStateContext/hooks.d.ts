import type { ReactNode } from 'react';
import type { ActiveStateProps, ActiveStateType } from './types';
export declare const usePrepareContextValue: (props: ActiveStateProps) => {
    activeState: any[];
    multiple: boolean | undefined;
};
export default function useActiveStateContext(props: ActiveStateProps): {
    onChange: (nextValue: ActiveStateType) => void;
    render: (children: ReactNode) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=hooks.d.ts.map