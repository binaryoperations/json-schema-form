import { useCallback } from 'react';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { createFastContext } from '../../core/fast-context';
const ActiveStateContext = createFastContext('ActiveStateContext', true);
export const ActiveStateProvider = ActiveStateContext.Provider;
export const useActiveStateValue = ActiveStateContext.useContextValue;
export function useActiveStateChange() {
    const setStore = ActiveStateContext.useSetStore();
    return useCallback((id) => {
        setStore((previous) => {
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
    }, [setStore]);
}
export function useIsActive(id) {
    return useActiveStateValue((state) => state.activeState.includes(id));
}
export function useActiveState(id) {
    const [isActive] = useIsActive(id);
    const onActivate = useActiveStateChange();
    return [isActive, useSafeCallback(() => onActivate(id))];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aXZlU3RhdGVDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29udGV4dC9BY3RpdmVTdGF0ZUNvbnRleHQvQWN0aXZlU3RhdGVDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFcEMsT0FBTyxlQUFlLE1BQU0sOEJBQThCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHNUQsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FDMUMsb0JBQW9CLEVBQ3BCLElBQUksQ0FDTCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0FBQy9ELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztBQUV0RSxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRWxELE9BQU8sV0FBVyxDQUNoQixDQUFDLEVBQUssRUFBRSxFQUFFO1FBQ1IsUUFBUSxDQUFDLENBQUMsUUFBeUIsRUFBRSxFQUFFO1lBQ3JDLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUTtvQkFDckIsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQy9CLEtBQUssUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUNwQyxPQUFPO3dCQUNMLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDMUQsQ0FBQztnQkFDSjtvQkFDRSxPQUFPO3dCQUNMLFdBQVcsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7cUJBQzNDLENBQUM7YUFDTDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNELENBQUMsUUFBUSxDQUFDLENBQ1gsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFJLEVBQUs7SUFDbEMsT0FBTyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBSSxFQUFLO0lBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLEVBQUssQ0FBQztJQUM3QyxPQUFPLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBVSxDQUFDO0FBQ3BFLENBQUMifQ==