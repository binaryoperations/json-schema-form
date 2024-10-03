import isNaN from "./isNaN"

export default function extractPathsFromSegment(segment: string) {
    return segment.replaceAll(/#|properties|items\/?/g, "").split("/").filter(Boolean).map((node) => isNaN(node) ? node : +node)
}