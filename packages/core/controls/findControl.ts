import { maxBy } from 'lodash';

import type { ControlSchema, LayoutSchema } from '../models';
import type { RankedControl } from './createControl';

export const findControl = <C, EventType, Value>(
  controls: RankedControl<C, Value>[],
  node: LayoutSchema,
  schema: ControlSchema
) => {
  const ranked = controls.map((control) => ({
    ...control,
    rank: control.deriveRank(schema, node, { rootSchema: schema }),
  }));

  const rankedControl = maxBy(ranked, 'rank')!;
  if (!rankedControl || rankedControl.rank <= 0) return null;

  return rankedControl as RankedControl<C, Value, (e: EventType) => Value>;
};
