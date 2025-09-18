import { type Draft } from "json-schema-library";
export * from "json-schema-library";
export type PartialDraft = Partial<Omit<Draft, "errors" | "formats">> & {
    errors?: Partial<Draft["errors"]>;
    formats?: Partial<Draft["formats"]>;
};
export { addKeyword, removeKeyword } from "./utils/keywords";
export declare const extendDraft: (draft: Draft, extension: PartialDraft) => Draft;
//# sourceMappingURL=lib.d.ts.map