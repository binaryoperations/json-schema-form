import { maxBy } from 'lodash';

import type { ControlSchema, FieldsetNode, UiSchema } from '../models';
import type { RankedControl } from './createControl';

export const findControl = <C, Props extends { value: any }>(
  controls: RankedControl<C, Props>[],
  node: UiSchema | FieldsetNode,
  schema: ControlSchema
) => {
  const ranked = controls.map((control) => ({
    ...control,
    rank: control.deriveRank(schema, node, { rootSchema: schema }),
  }));

  const rankedControl = maxBy(ranked, 'rank')!;
  if (!rankedControl || rankedControl.rank <= 0) return null;

  return rankedControl;
};
