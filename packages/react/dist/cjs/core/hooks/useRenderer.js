import { findControl } from '@binaryoperations/json-forms-core/controls/findControl';
import invariant from '@binaryoperations/json-forms-internals/invariant';
import { shallowCompare } from '@binaryoperations/json-forms-internals/object';
import { useRendererContext } from '../context/RendererContext';
import { useStore } from './useStore';
export const useLayoutNode = (type) => {
    return invariant(useRendererContext((store) => {
        return store.layout[type];
    }), `Layout "${type}" has not been registered`);
};
export const useControlNode = (id) => {
    const controls = useRendererContext((store) => store.controls);
    return useStore((store) => {
        return findControl(controls, store.uiContext.getNode(id), store.uiContext.deriveNodeSchema(id));
    }, shallowCompare);
};
//# sourceMappingURL=useRenderer.js.map