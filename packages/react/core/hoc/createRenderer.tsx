import type { CustomNode } from '@binaryoperations/json-forms-core/models';
import type { ComponentType, PropsWithChildren } from 'react';

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
  CustomLayoutRenderer.displayName = `CustomLayoutRenderer${Component.displayName ?? Component.name ?? 'UnknownComponent'}`;

  return CustomLayoutRenderer;

  function CustomLayoutRenderer(props: { id: string } & P) {
    const [{ renderer, options, nodes }] = useStore((store) => {
      const node = store.uiContext.getNode(props.id) as CustomNode;
      return node;
    });

    const LayoutNode = useCustomLayoutNode(renderer);

    const nodesArray = [nodes ?? []].flat();
    const children = !nodesArray.length ? null : (
      <LayoutChildren id={props.id} />
    );

    return (
      <LayoutNode {...options} {...props}>
        {children}
      </LayoutNode>
    );
  }
};
