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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlL2hvYy9jcmVhdGVSZW5kZXJlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztBQUU1RCxTQUFTLG9CQUFvQixDQUFtQixTQUEyQjtJQUN6RSxRQUFRLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXhFLE9BQU8sUUFBUSxDQUFDO0lBRWhCLFNBQVMsUUFBUSxDQUNmLEtBQWdFO1FBRWhFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxRCxPQUFPLENBQ0wsS0FBQyxTQUFTLE9BQUssU0FBUyxLQUFNLEtBQUssWUFDakMsS0FBQyxjQUFjLElBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUksR0FDdEIsQ0FDYixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLDBCQUEwQixDQUNqQyxTQUEyQjtJQUUzQixRQUFRLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQzlFLE9BQU8sUUFBUSxDQUFDO0lBRWhCLFNBQVMsUUFBUSxDQUFDLEtBQW1EO1FBQ25FLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4RCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFlLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxRCxNQUFNLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxRQUFrQyxDQUFDLENBQUM7UUFFM0UsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQzNDLEtBQUMsY0FBYyxJQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFJLENBQ2pDLENBQUM7UUFFRixPQUFPLENBQ0wsS0FBQyxVQUFVLE9BQUssT0FBTyxLQUFNLFNBQVMsS0FBTSxLQUFLLFlBQzlDLFFBQVEsR0FDRSxDQUNkLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQUVELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNoQixTQUFTLG1CQUFtQixDQUFDLENBQTJCLEVBQUUsVUFBa0I7SUFDMUUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSyxDQUFtQixDQUFDLElBQUksQ0FBQztJQUMvRCxPQUFPLFVBQVUsR0FBRyxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMifQ==