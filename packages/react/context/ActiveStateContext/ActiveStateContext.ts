import { useCallback } from 'react';

import useSafeCallback from '#/core/hooks/useSafeCallback';

import { createFastContext } from '../../core/fast-context';
import { ActiveStateType } from './types';

const ActiveStateContext = createFastContext<ActiveStateType>(true);

export const ActiveStateProvider = ActiveStateContext.Provider;
export const useActiveStateValue = ActiveStateContext.useContextValue;

export function useActiveStateChange<T>() {
  const setStore = ActiveStateContext.useSetStore();

  return useCallback(
    (id: T) => {
      setStore((previous: ActiveStateType) => {
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
    },
    [setStore]
  );
}

export function useIsActive<T>(id: T) {
  return useActiveStateValue((state) => state.activeState.includes(id));
}

export function useActiveState<T>(id: T) {
  const [isActive] = useIsActive(id);
  const onActivate = useActiveStateChange<T>();
  return [isActive, useSafeCallback(() => onActivate(id))] as const;
}
