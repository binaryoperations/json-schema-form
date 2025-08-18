import isNaN from './isNaN';
export function extractSegmentsFromPath(path) {
    const segments = path
        .replace(/^#\//, "/")
        .split("/")
        .filter((part, index) => index !== 0 || !!part);
    const pathHasPropertiesOrItem = path.match(/\/item\/|\/properties\//);
    if (!pathHasPropertiesOrItem)
        return extractSchmeaSegmentsFromPath(path);
    // ODD number of segments means that the path doesn't have /properties or /items
    const hasValidPaths = !(segments.length % 2);
    // If the path doesn't contain /#properties or /#item, return as is
    path = segments.reduce((next, part, index) => {
        if (index % 2)
            return [next, part].filter(Boolean).join("/");
        if (hasValidPaths)
            return next;
        if (["item", "properties"].includes(part))
            return next;
        throw new Error(`Malformed path: ${path}. Error after ${next}. Expected '#properties' or '#item' but got '${part}'`);
    }, "");
    return extractSchmeaSegmentsFromPath(path);
}
export function extractSchmeaSegmentsFromPath(path) {
    return path
        .replace(/^#\//, "/")
        .split('/')
        .reduce((nodes, node) => !node ? nodes : nodes.concat(isNaN(node) ? node : +node), []);
}
