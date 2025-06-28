
import { withLabel } from './withLabel';

type CheckboxAttributes = React.JSX.IntrinsicElements['input'];

export interface CheckboxProps extends CheckboxAttributes {
  type?: 'checkbox';
}

export const Checkbox = withLabel<CheckboxProps>(function Checkbox(props) {
  return <input {...props} />;
});
