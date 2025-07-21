import { createControl } from '../../core/hoc/createControl';
import { Number } from '../Inputs/Number';
export const NumberControl = createControl.NumberControl(Number, (event) => {
    const value = event.currentTarget.value;
    return value === '' || isNaN(+value) ? '' : +value;
});
