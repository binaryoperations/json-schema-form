import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import invariant from '../../../core/internals/invariant';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useControl, useControlProps, useControlValue } from '../hooks';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { withErrorBoundary } from './ErrorBoundary';
const Unhandled = () => {
    const [control] = useControl((control) => control);
    const [value] = useControlValue(control.path);
    return useMaybeDevValue(() => (_jsxs("div", { style: { backgroundColor: '#e5e5e5', wordBreak: 'break-all' }, children: ["value: ", JSON.stringify(value), " ", _jsx("br", {}), "scope: ", JSON.stringify(control.path), " ", _jsx("br", {})] })), () => null);
};
const withControlContext = (Component) => {
    return function withControlContext(props) {
        return (_jsx(ControlContext.Provider, { value: props.id, children: _jsx(Component, { ...props }) }));
    };
};
export const ControlNode = withControlContext(withErrorBoundary(function ControlNode(props) {
    const [control] = useControl((control) => control);
    const { Control, getValueFromEvent } = invariant(useControlNode(props.id), `Cannot find a relevant control for id: ${props.id}`);
    const path = control.path;
    const { value, setValue, meta, onBlur, onFocus } = useControlProps(path, props);
    const handleSetValue = useCallback((e) => {
        setValue(getValueFromEvent(e));
    }, [getValueFromEvent, setValue]);
    return (_jsx(Control, { ...control.options, ...useBreakpoints(control)?.value, error: meta?.error, label: path, value: (value ?? ''), onChange: handleSetValue, onBlur: onBlur, onFocus: onFocus }));
}, Unhandled));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlL2NvbXBvbmVudHMvQ29udHJvbE5vZGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLFNBQVMsTUFBTSx1REFBdUQsQ0FBQztBQUU5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXBDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUMsT0FBTyxnQkFBZ0IsQ0FDckIsR0FBRyxFQUFFLENBQUMsQ0FDSixlQUFLLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSx3QkFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBRSxjQUFNLGFBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFFLGNBQU0sSUFDeEMsQ0FDUCxFQUNELEdBQUcsRUFBRSxDQUFDLElBQUksQ0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxDQUN6QixTQUErQixFQUMvQixFQUFFO0lBQ0YsT0FBTyxTQUFTLGtCQUFrQixDQUFDLEtBQVk7UUFDN0MsT0FBTyxDQUNMLEtBQUMsY0FBYyxDQUFDLFFBQVEsSUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsWUFDdEMsS0FBQyxTQUFTLE9BQUssS0FBSyxHQUFJLEdBQ0EsQ0FDM0IsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FDM0MsaUJBQWlCLENBQUMsU0FBUyxXQUFXLENBQUMsS0FBcUI7SUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLFNBQVMsQ0FDOUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFDeEIsMENBQTBDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FDckQsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDMUIsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxlQUFlLENBQ2hFLElBQUksRUFDSixLQUFLLENBQ04sQ0FBQztJQUVGLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FDaEMsQ0FBQyxDQUFpQixFQUFFLEVBQUU7UUFDcEIsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQyxFQUNELENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQzlCLENBQUM7SUFFRixPQUFPLENBQ0wsS0FBQyxPQUFPLE9BQ0YsT0FBTyxDQUFDLE9BQU8sS0FDZixjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUNsQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFDbEIsS0FBSyxFQUFFLElBQUksRUFDWCxLQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFRLEVBQzNCLFFBQVEsRUFBRSxjQUFjLEVBQ3hCLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE9BQU8sR0FDaEIsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUNkLENBQUMifQ==