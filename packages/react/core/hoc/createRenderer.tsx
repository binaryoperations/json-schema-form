import type {
  CreateControl as CreateControlType,
  GetValueFromEvent,
  RankedControl,
} from '@binaryoperations/json-forms-core/controls/createControl';
import type { CustomNode } from '@binaryoperations/json-forms-core/models';
import type { Ranker } from '@binaryoperations/json-forms-core/testers/testers';
import type { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentProps, ComponentType, PropsWithChildren } from 'react';

import { LayoutChildren } from '../components/LayoutNode';
import { useStore } from '../hooks';
import { useCustomLayoutNode } from '../hooks/useRenderer';

export const createLayoutRenderer = <P extends object>(
  Component: ComponentType<P>
): ComponentType<{ id: string } & P> => {
  return function LayoutRenderer(props) {
    return (
      <Component {...props}>
        <LayoutChildren id={props.id} />
      </Component>
    );
  };
};

export const createCustomLayoutRenderer = <P extends object>(
  Component: ComponentType<PropsWithChildren>
): ComponentType<{ id: string } & P> => {
  return function CustomLayoutRenderer(props) {
    const { renderer, options } = useStore((store) => {
      const node = store.uiContext.getNode(props.id) as CustomNode;
      return node;
    });

    const LayoutNode = useCustomLayoutNode(renderer);

    return (
      <Component {...props}>
        <LayoutNode id={props.id} {...options} />
      </Component>
    );
  };
};

export type CreateControl = CreateControlType<ComponentType<BaseControlProps>>;

export const createControl = <P extends ComponentType<BaseControlProps>>(
  Component: P,
  getValueFromEvent: GetValueFromEvent,
  deriveRank: Ranker
): RankedControl<P, ComponentProps<P>> => {
  return {
    Control: Component,
    deriveRank,
    getValueFromEvent,
  };
};
