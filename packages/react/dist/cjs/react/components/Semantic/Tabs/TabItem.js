import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Button } from '../../../components/Button';
import { useActiveState } from '../../../context/ActiveStateContext';
export const TabItem = memo(function Tabs(props) {
    const { id, label, className = '', ...buttonProps } = props;
    const [isActive, onActivate] = useActiveState(id);
    const state = isActive ? 'active' : 'not-active';
    const resolvedClassName = !className ? state : `${className} ${state}`;
    return (_jsx(Button, { className: resolvedClassName, onClick: onActivate, ...buttonProps, children: label }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvU2VtYW50aWMvVGFicy9UYWJJdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFNLElBQUksRUFBYSxNQUFNLE9BQU8sQ0FBQztBQUU1QyxPQUFPLEVBQUUsTUFBTSxFQUFvQixNQUFNLHFCQUFxQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVE5RCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQXFCLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLO0lBQy9ELE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsR0FBRyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFNUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsR0FBRyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNqRCxNQUFNLGlCQUFpQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXZFLE9BQU8sQ0FDTCxLQUFDLE1BQU0sSUFBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFVBQVUsS0FBTSxXQUFXLFlBQ3ZFLEtBQUssR0FDQyxDQUNWLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9