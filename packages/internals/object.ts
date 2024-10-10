import get from 'lodash/get';
import fpSet from 'lodash/fp/set';
import type _set from 'lodash/set';
import { extractSegmentsFromPath } from './extractSegmentsFromPath';

export const set: typeof _set = (data: object, path: string, value: any) => {
  if (Object.is(get(data, path), value)) return data;
  return fpSet(extractSegmentsFromPath(path), value, data);
};
