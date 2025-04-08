import { maxBy } from 'lodash';
export const findControl = (controls, node, schema) => {
    const ranked = controls.map((control) => ({
        ...control,
        rank: control.deriveRank(schema, node, { rootSchema: schema }),
    }));
    const rankedControl = maxBy(ranked, 'rank');
    if (!rankedControl || rankedControl.rank <= 0)
        return null;
    return rankedControl;
};
