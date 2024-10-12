import { maxBy } from 'lodash';
import { ControlSchema, FieldsetNode, UiSchema } from '../models';
import { RankedControl } from './createControl';

export const findControl = <T>(
  controls: RankedControl<T>[],
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
