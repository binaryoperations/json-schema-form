import { findControl } from '../../../core/controls/findControl';
import invariant from '../../../core/internals/invariant';
import { shallowCompare } from '../../../core/internals/object';
import { ControlRepository, RendererRepository } from '../../core/context/RendererContext';
import { useStore } from './useStore';
export const useLayoutNode = (type) => {
    return invariant(typeof type === 'string' ? RendererRepository.get(type) : type, `Layout "${type}" has not been registered`);
};
export const useControlNode = (id) => {
    const controls = Object.values(ControlRepository.getAll());
    return useStore((store) => {
        return findControl(controls, store.uiContext.getNode(id), store.uiContext.deriveControlSchema(id));
    }, shallowCompare)[0];
};
