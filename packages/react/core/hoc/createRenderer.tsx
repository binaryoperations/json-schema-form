import type {
  Breakpoints,
} from '@binaryoperations/json-forms-core/models';
import type { ComponentType, ReactNode } from 'react';

import { LayoutChildren } from '../components/LayoutNode';
import { useBreakpoints } from '../hooks/useBreakpoints';

export {  createLayoutRenderer };

function createLayoutRenderer<P extends object>(Component: ComponentType<P>) {
  Renderer.displayName = createComponentName(Component, `LayoutRenderer`);

  return Renderer;

  function Renderer(
    props: { id: string; breakPoints?: Breakpoints<Partial<P>>, children?: ReactNode } & P
  ) {
    const { value, props: restProps } = useBreakpoints(props);

    return (
      <Component {...restProps} {...value}>
        {props.children ?? <LayoutChildren id={props.id} />}
      </Component>
    );
  }
}

let counter = 0;
function createComponentName(C: { displayName?: string }, namePrefix: string) {
  const displayName = C.displayName ?? (C as ComponentType).name;
  return namePrefix + (displayName ?? `UnknownComponent_${++counter}`);
}
