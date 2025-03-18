import { findControl } from '../../../core/controls/findControl';
import invariant from '../../../core/internals/invariant';
import { shallowCompare } from '../../../core/internals/object';
import { useRendererContext } from '../context/RendererContext';
import { useStore } from './useStore';
export const useLayoutNode = (type) => {
    return invariant(useRendererContext((store) => {
        return store.layout[type];
    })[0], `Layout "${type}" has not been registered`);
};
export const useCustomLayoutNode = (type) => {
    return invariant(useRendererContext((store) => {
        return typeof type === 'string' ? store.layout[type] : type;
    })[0], `Custom Layout "${type}" has not been registered`);
};
export const useControlNode = (id) => {
    const [controls] = useRendererContext((store) => store.controls);
    return useStore((store) => {
        return findControl(controls, store.uiContext.getNode(id), store.uiContext.deriveSchemaAtPointer(id));
    }, shallowCompare)[0];
};
//# sourceMappingURL=useRenderer.js.map