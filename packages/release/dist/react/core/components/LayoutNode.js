import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { fastDeepEqual, shallowCompare } from '../../../core/internals/object';
import { memo } from 'react';
import { useStore } from '../hooks';
import { useLayoutNode } from '../hooks/useRenderer';
import { ControlNode } from './ControlNode';
import { useBreakpoints } from '../hooks/useBreakpoints';
export const LayoutNode = function CustomLayoutRendererRoot(props) {
    const [{ type, options, breakpoints }] = useStore((store) => {
        const node = store.uiContext.getNode(props.id);
        return {
            type: node.type,
            options: node.options,
            breakpoints: node.breakpoints,
        };
    }, fastDeepEqual);
    const { value, props: restProps } = useBreakpoints({ ...props, breakpoints });
    const Actor = useLayoutNode(type);
    if ("Control" in Actor) {
        throw new Error("Unexpected Control rendererd");
    }
    return (_jsx(Actor, { ...options, ...restProps, ...value, breakpoints: breakpoints, children: _jsx(LayoutChildren, { id: props.id }) }));
};
export const LayoutChildren = memo(function LayoutChildren(props) {
    const [isControl] = useStore((store) => store.uiContext.isControl(props.id));
    const [nodes] = useStore((store) => store.uiContext.getChildren(props.id), shallowCompare);
    if (isControl) {
        return _jsx(ControlNode, { id: props.id });
    }
    const renderedNodes = nodes?.map((node) => {
        return _jsx(LayoutNode, { id: node }, node);
    });
    return _jsx(_Fragment, { children: renderedNodes });
});
