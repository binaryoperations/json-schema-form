import { jsx as _jsx } from "react/jsx-runtime";
import { LayoutChildren } from '../components/LayoutNode';
export const createLayoutRenderer = (Component) => {
    return function LayoutRenderer(props) {
        return (_jsx(Component, { ...props, children: _jsx(LayoutChildren, { id: props.id }) }));
    };
};
export const createControl = (Component, getValueFromEvent, deriveRank) => {
    return {
        Control: Component,
        deriveRank,
        getValueFromEvent,
    };
};
//# sourceMappingURL=createRenderer.js.map