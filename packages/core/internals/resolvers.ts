

import { extractSegmentsFromPath } from './extractSegmentsFromPath';
import { isEmpty } from './object';

function resolvePath<T = any>(data: any, path: string): T {
  if (isEmpty(path)) return data;
  if (!data) return data;

  const segments = extractSegmentsFromPath(path);

  return segments.reduce((value, nextSegment) => {
    if (!value || !Object.prototype.hasOwnProperty.call(value, nextSegment))
      return undefined;

    return value[nextSegment];
  }, data);
}

export default {
  resolvePath,
};
