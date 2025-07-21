import { createControl } from '../../core/hoc/createControl';
import { Radio } from '../Inputs/Radio';
export const RadioControl = createControl.BooleanControl(Radio, (event) => event.nativeEvent.target.checked);
