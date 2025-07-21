import { createControl } from '../../core/hoc/createControl';
import { TextInput } from '../Inputs/TextInput';
export const TextInputControl = createControl.TextControl(TextInput, (event) => event.nativeEvent.target.value);
