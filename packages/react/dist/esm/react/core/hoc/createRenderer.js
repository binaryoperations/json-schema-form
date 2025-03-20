import { jsx as _jsx } from "react/jsx-runtime";
import { LayoutChildren } from '../components/LayoutNode';
import { useStore } from '../hooks';
import { useCustomLayoutNode } from '../hooks/useRenderer';
export const createLayoutRenderer = (Component) => {
    return function LayoutRenderer(props) {
        return (_jsx(Component, { ...props, children: _jsx(LayoutChildren, { id: props.id }) }));
    };
};
export const createCustomLayoutRenderer = (Component) => {
    return function CustomLayoutRenderer(props) {
        const [{ renderer, options, nodes }] = useStore((store) => {
            const node = store.uiContext.getNode(props.id);
            return node;
        });
        const LayoutNode = useCustomLayoutNode(renderer);
        const nodesArray = [nodes ?? []].flat();
        const children = !nodesArray.length ? null : (_jsx(LayoutChildren, { id: props.id }));
        return (_jsx(Component, { ...props, children: _jsx(LayoutNode, { id: props.id, ...options, children: children }) }));
    };
};
//# sourceMappingURL=createRenderer.js.map