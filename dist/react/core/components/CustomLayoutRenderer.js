import { jsx as _jsx } from "react/jsx-runtime";
import { useStore } from '../hooks';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useCustomLayoutNode } from '../hooks/useRenderer';
import { LayoutChildren } from './LayoutNode';
export const CustomLayoutRenderer = function CustomLayoutRendererRoot(props) {
    const [{ renderer, options, nodes }] = useStore((store) => {
        const node = store.uiContext.getNode(props.id);
        return node;
    });
    const { value, props: restProps } = useBreakpoints(props);
    const LayoutNode = useCustomLayoutNode(renderer);
    const nodesArray = [nodes ?? []].flat();
    const children = !nodesArray.length ? null : (_jsx(LayoutChildren, { id: props.id }));
    return (_jsx(LayoutNode, { ...options, ...restProps, ...value, children: children }));
};
