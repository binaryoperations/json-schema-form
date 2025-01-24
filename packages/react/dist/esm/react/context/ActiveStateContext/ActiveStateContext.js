import { useCallback } from 'react';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { createFastContext } from '../../core/fast-context';
const ActiveStateContext = createFastContext(true);
export const ActiveStateProvider = ActiveStateContext.Provider;
export const useActiveStateValue = ActiveStateContext.useContextValue;
export function useActiveStateChange() {
    const { set } = ActiveStateContext.useStoreRef();
    return useCallback((id) => {
        set((previous) => {
            switch (true) {
                case !previous.multiple:
                    return { activeState: [id] };
                case previous.activeState.includes(id):
                    return {
                        activeState: previous.activeState.filter((x) => x !== id),
                    };
                default:
                    return {
                        activeState: [...previous.activeState, id],
                    };
            }
        });
    }, [set]);
}
export function useIsActive(id) {
    return useActiveStateValue((state) => state.activeState.includes(id));
}
export function useActiveState(id) {
    const isActive = useIsActive(id);
    const onActivate = useActiveStateChange();
    return [isActive, useSafeCallback(() => onActivate(id))];
}
//# sourceMappingURL=ActiveStateContext.js.map