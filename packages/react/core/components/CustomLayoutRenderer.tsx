import type { ComponentType, PropsWithChildren } from 'react';
import type { ComponentRendererProps } from '../context/RendererContext';
import { useStore } from '../hooks';
import type { CustomNode } from '@binaryoperations/json-forms-core/models';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useCustomLayoutNode } from '../hooks/useRenderer';
import { LayoutChildren } from './LayoutNode';




export const CustomLayoutRenderer = function CustomLayoutRendererRoot(props: ComponentRendererProps<PropsWithChildren<any>>) {
  const [{ renderer, options, nodes }] = useStore((store) => {
    const node = store.uiContext.getNode(props.id) as CustomNode;
    return node;
  });

  const { value, props: restProps } = useBreakpoints(props);

  const LayoutNode = useCustomLayoutNode(renderer as string | ComponentType);

  const nodesArray = [nodes ?? []].flat();
  const children = !nodesArray.length ? true : (
    <LayoutChildren id={props.id} />
  );

  return (
    <LayoutNode {...options} {...restProps} {...value}>
      {children}
    </LayoutNode>
  );
}
