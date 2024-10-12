import { useCallback } from 'react';

import { createFastContext } from '../../core/fast-context';
import { ID } from '../../type';
import { ActiveStateType } from './types';

const ActiveStateContext = createFastContext<ActiveStateType>(true);

export const ActiveStateProvider = ActiveStateContext.Provider;
export const useActiveState = ActiveStateContext.useContext;
export const useActiveStateValue = ActiveStateContext.useContextValue;

export function useActiveStateChange() {
  const { set } = ActiveStateContext.useStoreRef();

  return useCallback(
    (id: ID) => {
      set((previous: ActiveStateType) => {
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
    [set]
  );
}

export function useIsActive(id: ID) {
  return useActiveStateValue((state) => state.activeState.includes(id));
}
