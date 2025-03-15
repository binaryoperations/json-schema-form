import { maxBy } from 'lodash';
import { ComponentType, SyntheticEvent } from 'react';

import type { ControlSchema, FieldsetNode, LayoutSchema } from '../models';
import type { RankedControl } from './createControl';

export const findControl = <C extends ComponentType, Value>(
  controls: RankedControl<ComponentType | C, Value>[],
  node: LayoutSchema | FieldsetNode,
  schema: ControlSchema
) => {
  const ranked = controls.map((control) => ({
    ...control,
    rank: control.deriveRank(schema, node, { rootSchema: schema }),
  }));

  const rankedControl = maxBy(ranked, 'rank')!;
  if (!rankedControl || rankedControl.rank <= 0) return null;

  return rankedControl as RankedControl<C, Value, (e: SyntheticEvent) => Value>;
};
