import { extendDraft as extend, type Draft } from "json-schema-library";
import { merge } from "./internals/object";
import { valueRequiredError } from "./utils/keywords/value-required";

export * from "json-schema-library";

export type PartialDraft = Partial<Omit<Draft, "errors" | "formats">> & {
    errors?: Partial<Draft["errors"]>;
    formats?: Partial<Draft["formats"]>;
};

export { addKeyword, removeKeyword } from "./utils/keywords"

export const extendDraft = (draft: Draft, extension: PartialDraft) => {
  return extend(draft, merge({ errors: {...valueRequiredError} }, extension ));
}
