import { shallowCompare } from '@binaryoperations/json-forms-internals/object';
import { memo } from 'react';

import { useStore } from '../hooks';
import { useLayoutNode } from '../hooks/useRenderer';
import { ControlNode } from './ControlNode';

export const LayoutNode = function LayoutNode(props: { id: string }) {
  const nodeType = useStore((store) => store.uiContext.getNodeType(props.id));
  const LayoutNode = useLayoutNode(nodeType);

  return <LayoutNode id={props.id} />;
};

export const LayoutChildren = memo(function LayoutChildren(props: {
  id: string;
}) {
  const isControl = useStore((store) => store.uiContext.isControl(props.id));
  const nodes = useStore((store) => {
    if (isControl) return [];
    return store.uiContext.getChildren(props.id);
  }, shallowCompare);

  if (isControl) {
    return <ControlNode id={props.id} />;
  }

  const renderedNodes = nodes.map((node) => {
    return <LayoutNode key={node} id={node} />;
  });

  return <>{renderedNodes}</>;
});
