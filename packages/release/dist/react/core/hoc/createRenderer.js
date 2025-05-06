import { jsx as _jsx } from "react/jsx-runtime";
import { LayoutChildren } from '../components/LayoutNode';
import { useBreakpoints } from '../hooks/useBreakpoints';
export { createLayoutRenderer };
function createLayoutRenderer(Component) {
    Renderer.displayName = createComponentName(Component, `LayoutRenderer`);
    return Renderer;
    function Renderer(props) {
        const { value, props: restProps } = useBreakpoints(props);
        return (_jsx(Component, { ...restProps, ...value, children: props.children ?? _jsx(LayoutChildren, { id: props.id }) }));
    }
}
let counter = 0;
function createComponentName(C, namePrefix) {
    const displayName = C.displayName ?? C.name;
    return namePrefix + (displayName ?? `UnknownComponent_${++counter}`);
}
