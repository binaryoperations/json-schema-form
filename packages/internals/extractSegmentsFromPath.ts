import isNaN from "./isNaN"

export default function extractSegmentsFromPath(path: string) {
    return path.replaceAll(/#|properties|items\/?/g, "").split("/").filter(Boolean).map((node) => isNaN(node) ? node : +node)
}

