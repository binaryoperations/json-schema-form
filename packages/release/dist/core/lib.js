import { extendDraft as extend } from "json-schema-library";
import { merge } from "./internals/object";
import { valueRequiredError } from "./utils/keywords/value-required";
export * from "json-schema-library";
export { addKeyword, removeKeyword } from "./utils/keywords";
export const extendDraft = (draft, extension) => {
    return extend(draft, merge({ errors: { ...valueRequiredError } }, extension));
};
