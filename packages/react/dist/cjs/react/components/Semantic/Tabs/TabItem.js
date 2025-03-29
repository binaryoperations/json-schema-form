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
//# sourceMappingURL=TabItem.js.map