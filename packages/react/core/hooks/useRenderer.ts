import { findControl } from '@binaryoperations/json-forms-core/controls/findControl';
import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { shallowCompare } from '@binaryoperations/json-forms-core/internals/object';
import type { ComponentType } from 'react';

import { ControlRepository, RendererRepository } from '@binaryoperations/json-forms-react/core/context/RendererContext';
import { useStore } from './useStore';


export const useLayoutNode = (type: string | ComponentType<object>) => {
  return invariant(
    typeof type === 'string' ? RendererRepository.get(type) : type,
    `Layout "${type}" has not been registered`
  );
};

export const useControlNode = (id: string) => {
  const controls = Object.values(ControlRepository.getAll());

  return useStore((store) => {
    return findControl(
      controls,
      store.uiContext.getNode(id),
      store.uiContext.deriveSchemaAtPointer(id)!
    );
  }, shallowCompare)[0];
};
