import { shallowCompare } from '@binaryoperations/json-forms-core/internals/object';
import { memo } from 'react';

import { useStore } from '../hooks';
import { useLayoutNode } from '../hooks/useRenderer';
import { ControlNode } from './ControlNode';


import type { ComponentType, PropsWithChildren } from 'react';
import type { ComponentRendererProps } from '../context/RendererContext';
import { LayoutNodeType } from '@binaryoperations/json-forms-core/models';

import { useBreakpoints } from '../hooks/useBreakpoints';

export const LayoutNode = function CustomLayoutRendererRoot(props: ComponentRendererProps<PropsWithChildren<any>>) {
  const [{ type, options, nodes, breakpoints }] = useStore((store) => {
    const node = store.uiContext.getNode(props.id) as LayoutNodeType<ComponentType>;
    return node;
  });

  const { value, props: restProps } = useBreakpoints({...props, breakpoints });

  const Actor = useLayoutNode(type);

  if ("Control" in Actor) {
    throw new Error("Unexpected Control rendererd");
  }

  const nodesArray = [nodes ?? []].flat();
  const children = !nodesArray.length
    ? null
    : <LayoutChildren id={props.id} />;

  return (
    <Actor {...options} {...restProps} {...value} breakpoints={breakpoints}>
      {children}
    </Actor>
  );
}

export const LayoutChildren = memo(function LayoutChildren(props: {
  id: string;
}) {
  const [isControl] = useStore((store) => store.uiContext.isControl(props.id));
  const [nodes] = useStore((store) => store.uiContext.getChildren(props.id), shallowCompare);

  if (isControl) {
    return <ControlNode id={props.id} />;
  }

  const renderedNodes = nodes.map((node) => {
    return <LayoutNode key={node} id={node} />;
  });

  return <>{renderedNodes}</>;
});
