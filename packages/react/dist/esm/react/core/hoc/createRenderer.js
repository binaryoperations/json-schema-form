import { jsx as _jsx } from "react/jsx-runtime";
import { LayoutChildren } from '../components/LayoutNode';
import { useStore } from '../hooks';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useCustomLayoutNode } from '../hooks/useRenderer';
export { createCustomLayoutRenderer, createLayoutRenderer };
function createLayoutRenderer(Component) {
    Renderer.displayName = createComponentName(Component, `LayoutRenderer`);
    return Renderer;
    function Renderer(props) {
        const { value, props: restProps } = useBreakpoints(props);
        return (_jsx(Component, { ...restProps, ...value, children: _jsx(LayoutChildren, { id: props.id }) }));
    }
}
function createCustomLayoutRenderer(Component) {
    Renderer.displayName = createComponentName(Component, 'CustomLayoutRenderer');
    return Renderer;
    function Renderer(props) {
        const [{ renderer, options, nodes }] = useStore((store) => {
            const node = store.uiContext.getNode(props.id);
            return node;
        });
        const { value, props: restProps } = useBreakpoints(props);
        const LayoutNode = useCustomLayoutNode(renderer);
        const nodesArray = [nodes ?? []].flat();
        const children = !nodesArray.length ? null : (_jsx(LayoutChildren, { id: props.id }));
        return (_jsx(LayoutNode, { ...options, ...restProps, ...value, children: children }));
    }
}
let counter = 0;
function createComponentName(C, namePrefix) {
    const displayName = C.displayName ?? C.name;
    return namePrefix + (displayName ?? `UnknownComponent_${++counter}`);
}
//# sourceMappingURL=createRenderer.js.map