import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { useActiveState } from '../../../context/ActiveStateContext';
export const AccordionItem = memo(function Tabs(props) {
    const { id, label, className = '', description, ...detailsProps } = props;
    const [isActive, onActivate] = useActiveState(id);
    const state = isActive ? 'active' : 'not-active';
    const resolvedClassName = !className ? state : `${className} ${state}`;
    return (_jsxs("details", { ...detailsProps, open: isActive, className: resolvedClassName, children: [_jsx("summary", { onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onActivate();
                }, children: label }), description] }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3JkaW9uSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvU2VtYW50aWMvQWNjb3JkaW9uL0FjY29yZGlvbkl0ZW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQU0sSUFBSSxFQUFhLE1BQU0sT0FBTyxDQUFDO0FBRTVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVc5RCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQTJCLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLO0lBQzNFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLEdBQUcsWUFBWSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRTFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWxELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDakQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUV2RSxPQUFPLENBQ0wsc0JBQWEsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixhQUNyRSxrQkFDRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDYixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkIsVUFBVSxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxZQUVBLEtBQUssR0FDRSxFQUNULFdBQVcsSUFDSixDQUNYLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9