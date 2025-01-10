import type {
  GetValueFromEvent,
  RankedControl,
} from '@binaryoperations/json-forms-core/controls/createControl';
import type { Ranker } from '@binaryoperations/json-forms-core/testers/testers';
import type { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType } from 'react';

import { LayoutChildren } from '../components/LayoutNode';

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

export const createControl = <P extends ComponentType<BaseControlProps>>(
  Component: P,
  getValueFromEvent: GetValueFromEvent,
  deriveRank: Ranker
): RankedControl<P> => {
  return {
    Control: Component,
    deriveRank,
    getValueFromEvent,
  };
};
