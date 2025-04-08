import { findControl } from '@binaryoperations/json-forms-core/controls/findControl';
import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { shallowCompare } from '@binaryoperations/json-forms-core/internals/object';
import { ControlRepository, LayoutRepository } from '@binaryoperations/json-forms-react/core/context/RendererContext';
import { useStore } from './useStore';
export const useLayoutNode = (type) => {
    return invariant(LayoutRepository.get(type), `Layout "${type}" has not been registered`);
};
export const useCustomLayoutNode = (type) => {
    return invariant(typeof type === 'string' ? LayoutRepository.get(type) : type, `Custom Layout "${type}" has not been registered`);
};
export const useControlNode = (id) => {
    const controls = Object.values(ControlRepository.getAll());
    return useStore((store) => {
        return findControl(controls, store.uiContext.getNode(id), store.uiContext.deriveSchemaAtPointer(id));
    }, shallowCompare)[0];
};
