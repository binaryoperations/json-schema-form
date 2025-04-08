import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { shallowCompare } from '../../../core/internals/object';
import { memo } from 'react';
import { useStore } from '../hooks';
import { useLayoutNode } from '../hooks/useRenderer';
import { ControlNode } from './ControlNode';
export const LayoutNode = function LayoutNode(props) {
    const [{ nodeType, breakpoints }] = useStore((store) => {
        const node = store.uiContext.getNode(props.id);
        return { nodeType: node.type, breakpoints: node.breakpoints };
    }, shallowCompare);
    const LayoutNode = useLayoutNode(nodeType);
    return _jsx(LayoutNode, { id: props.id, breakpoints: breakpoints });
};
export const LayoutChildren = memo(function LayoutChildren(props) {
    const [isControl] = useStore((store) => store.uiContext.isControl(props.id));
    const [nodes] = useStore((store) => {
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
