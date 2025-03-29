import { cast } from '../../../core/internals/cast';
import { createElement, useMemo } from 'react';
import useRef from '../../core/hooks/useRef';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { ActiveStateProvider } from './ActiveStateContext';
export const usePrepareContextValue = (props) => {
    const defaultValue = useRef(props.defaultValue).current;
    const value = props.value ?? defaultValue;
    return useMemo(() => {
        const activeState = Array.isArray(value)
            ? value
            : !value && isNaN(Number(value ?? NaN))
                ? []
                : [value];
        return { activeState, multiple: props.multiple };
    }, [value, props.multiple]);
};
export function useActiveStateContext(props) {
    const activeState = usePrepareContextValue(props);
    const onChange = useSafeCallback((nextValue) => {
        if (props.multiple) {
            cast(props).onChange?.(nextValue.activeState);
            return;
        }
        cast(props).onChange?.(nextValue.activeState[0]);
    });
    return {
        onChange,
        render: (children) => createElement(ActiveStateProvider, {
            value: activeState,
            onChange: props.onChange && onChange,
        }, children),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb250ZXh0L0FjdGl2ZVN0YXRlQ29udGV4dC9ob29rcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFFeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFL0MsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRM0QsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxLQUF1QixFQUFFLEVBQUU7SUFDaEUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUM7SUFDMUMsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxLQUFLO1lBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsRUFBRTtnQkFDSixDQUFDLENBQUMsQ0FBQyxLQUFNLENBQUMsQ0FBQztRQUVmLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuRCxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQXVCO0lBQzNELE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxDQUFDLFNBQTBCLEVBQUUsRUFBRTtRQUM5RCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFrQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDckQsU0FBUyxDQUFDLFdBQVcsQ0FDdEIsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELElBQUksQ0FBZ0MsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQ25ELFNBQVMsQ0FBQyxXQUFZLENBQUMsQ0FBQyxDQUFDLENBQzFCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxRQUFRO1FBQ1IsTUFBTSxFQUFFLENBQUMsUUFBbUIsRUFBRSxFQUFFLENBQzlCLGFBQWEsQ0FDWCxtQkFBbUIsRUFDbkI7WUFDRSxLQUFLLEVBQUUsV0FBVztZQUNsQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxRQUFRO1NBQ3JDLEVBQ0QsUUFBUSxDQUNUO0tBQ0osQ0FBQztBQUNKLENBQUMifQ==