import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { shallowCompare } from '../../../internals/object';
import { memo } from 'react';
import { useStore } from '../hooks';
import { useLayoutNode } from '../hooks/useRenderer';
import { ControlNode } from './ControlNode';
export const LayoutNode = function LayoutNode(props) {
    const nodeType = useStore((store) => store.uiContext.getNodeType(props.id));
    const LayoutNode = useLayoutNode(nodeType);
    return _jsx(LayoutNode, { id: props.id });
};
export const LayoutChildren = memo(function LayoutChildren(props) {
    const isControl = useStore((store) => store.uiContext.isControl(props.id));
    const nodes = useStore((store) => {
        if (isControl)
            return [];
        return store.uiContext.getChildren(props.id);
    }, shallowCompare);
    if (isControl) {
        return _jsx(ControlNode, { id: props.id });
    }
    const renderedNodes = nodes.map((node) => {
        return _jsx(LayoutNode, { id: node }, node);
    });
    return _jsx(_Fragment, { children: renderedNodes });
});
//# sourceMappingURL=LayoutNode.js.map