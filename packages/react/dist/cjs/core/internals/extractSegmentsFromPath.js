import isNaN from './isNaN';
export function extractSegmentsFromPath(path) {
    return extractSchmeaSegmentsFromPath(path.replaceAll(/#|properties|items\/?/g, ''));
}
export function extractSchmeaSegmentsFromPath(path) {
    return path
        .replaceAll(/#\/?/g, '')
        .split('/')
        .reduce((nodes, node) => !node ? nodes : nodes.concat(isNaN(node) ? node : +node), []);
}
//# sourceMappingURL=extractSegmentsFromPath.js.map