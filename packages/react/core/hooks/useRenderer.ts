import invariant from '@binaryoperations/json-forms-internals/invariant';
import { shallowCompare } from '@binaryoperations/json-forms-internals/object';
import { useStore } from './useStore';
import { useRendererContext } from '../context/RendererContext';
import { findControl } from '@binaryoperations/json-forms-core/controls/findControl';

export const useLayoutNode = (type: string) => {
  return invariant(
    useRendererContext((store) => {
      return store.layout[type];
    }),
    `Layout "${type}" has not been registered`
  );
};

export const useControlNode = (id: string) => {
  const controls = useRendererContext((store) => store.controls);

  return useStore((store) => {
    return findControl(
      controls,
      store.uiContext.getNode(id),
      store.uiContext.deriveNodeSchema(id)!
    );
  }, shallowCompare);
};
