import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { createControl } from './createControl';
import { Input } from './Input';
const Radio = forwardRef(function Radio(props, ref) {
    return _jsx(Input, { ...props, type: "radio", ref: ref });
});
export const RadioControl = createControl.BooleanControl(Radio, (event) => event.nativeEvent.target.checked);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL0NvbnRyb2xzL1JhZGlvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFvQixVQUFVLEVBQXVCLE1BQU0sT0FBTyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFtQixNQUFNLFNBQVMsQ0FBQztBQU1qRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQ3RCLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHO0lBQ3ZCLE9BQU8sS0FBQyxLQUFLLE9BQUssS0FBSyxFQUFFLElBQUksRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFFLEdBQUcsR0FBSSxDQUFDO0FBQ3JELENBQUMsQ0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQ3RELEtBQUssRUFDTCxDQUFDLEtBQXNFLEVBQUUsRUFBRSxDQUN6RSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ25DLENBQUMifQ==