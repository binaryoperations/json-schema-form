import isNaN from './isNaN';

export function extractSegmentsFromPath(path: string) {
  return extractSchmeaSegmentsFromPath(
    path.replaceAll(/#|properties|items\/?/g, '')
  );
}

export function extractSchmeaSegmentsFromPath(path: string) {
  return path
    .replaceAll(/#\/?/g, '')
    .split('/')
    .reduce(
      (nodes: (string | number)[], node) =>
        !node ? nodes : nodes.concat(isNaN(node) ? node : +node),
      []
    );
}
