import { jsx as _jsx } from "react/jsx-runtime";
import { createControl } from './createControl';
import { withLabel } from './withLabel';
const Checkbox = withLabel(function Checkbox(props) {
    return _jsx("input", { ...props });
});
export const CheckboxControl = createControl.BooleanControl(Checkbox, (event) => event.nativeEvent.target.checked);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL0NvbnRyb2xzL0NoZWNrYm94LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFReEMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFnQixTQUFTLFFBQVEsQ0FBQyxLQUFLO0lBQy9ELE9BQU8sbUJBQVcsS0FBSyxHQUFJLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FDekQsUUFBUSxFQUNSLENBQUMsS0FBc0UsRUFBRSxFQUFFLENBQ3pFLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDbkMsQ0FBQyJ9