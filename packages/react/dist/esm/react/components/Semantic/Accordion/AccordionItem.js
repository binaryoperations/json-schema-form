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
//# sourceMappingURL=AccordionItem.js.map