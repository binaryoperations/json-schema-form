import { jsx as _jsx } from "react/jsx-runtime";
import { withLabel } from './withLabel';
export const Checkbox = withLabel(function Checkbox(props) {
    return _jsx("input", { ...props });
});
