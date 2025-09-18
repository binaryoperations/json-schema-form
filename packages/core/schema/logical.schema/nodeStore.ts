import { ControlNodeType } from "@binaryoperations/json-forms-core/models/LayoutSchema";

let store: null | Record<string, ControlNodeType> = null;

export const getNode = (pointer?: string) => {
  return store?.[pointer || ""] ?? null;
}


export const setNodes = (nextStore: null | Record<string, ControlNodeType>) => {
  store = nextStore;
}
