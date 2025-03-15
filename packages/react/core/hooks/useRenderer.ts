import { findControl } from '@binaryoperations/json-forms-core/controls/findControl';
import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { shallowCompare } from '@binaryoperations/json-forms-core/internals/object';
import type { ComponentType } from 'react';

import { useRendererContext } from '../context/RendererContext';
import { useStore } from './useStore';

export const useLayoutNode = (type: string) => {
  return invariant(
    useRendererContext((store) => {
      return store.layout[type];
    })[0],
    `Layout "${type}" has not been registered`
  );
};

export const useCustomLayoutNode = (type: string | ComponentType<object>) => {
  return invariant(
    useRendererContext((store) => {
      return typeof type === 'string' ? store.layout[type] : type;
    })[0],
    `Custom Layout "${type}" has not been registered`
  );
};

export const useControlNode = (id: string) => {
  const [controls] = useRendererContext((store) => store.controls);

  return useStore((store) => {
    return findControl(
      controls,
      store.uiContext.getNode(id),
      store.uiContext.deriveNodeSchema(id)!
    );
  }, shallowCompare)[0];
};
