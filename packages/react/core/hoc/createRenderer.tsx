import type {
  Breakpoints,
  CustomNode,
} from '@binaryoperations/json-forms-core/models';
import type { ComponentType, PropsWithChildren } from 'react';

import { LayoutChildren } from '../components/LayoutNode';
import { ComponentRendererProps } from '../context/RendererContext';
import { useStore } from '../hooks';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useCustomLayoutNode } from '../hooks/useRenderer';

export { createCustomLayoutRenderer, createLayoutRenderer };

function createLayoutRenderer<P extends object>(Component: ComponentType<P>) {
  Renderer.displayName = createComponentName(Component, `LayoutRenderer`);

  return Renderer;

  function Renderer(
    props: { id: string; breakPoints?: Breakpoints<Partial<P>> } & P
  ) {
    const { value, props: restProps } = useBreakpoints(props);

    return (
      <Component {...restProps} {...value}>
        <LayoutChildren id={props.id} />
      </Component>
    );
  }
}

function createCustomLayoutRenderer<P extends PropsWithChildren>(
  Component: ComponentType<P>
) {
  Renderer.displayName = createComponentName(Component, 'CustomLayoutRenderer');
  return Renderer;

  function Renderer(props: ComponentRendererProps<PropsWithChildren<P>>) {
    const [{ renderer, options, nodes }] = useStore((store) => {
      const node = store.uiContext.getNode(props.id) as CustomNode;
      return node;
    });

    const { value, props: restProps } = useBreakpoints(props);

    const LayoutNode = useCustomLayoutNode(renderer);

    const nodesArray = [nodes ?? []].flat();
    const children = !nodesArray.length ? null : (
      <LayoutChildren id={props.id} />
    );

    return (
      <LayoutNode {...options} {...restProps} {...value}>
        {children}
      </LayoutNode>
    );
  }
}

let counter = 0;
function createComponentName(C: { displayName?: string }, namePrefix: string) {
  const displayName = C.displayName ?? (C as ComponentType).name;
  return namePrefix + (displayName ?? `UnknownComponent_${++counter}`);
}
