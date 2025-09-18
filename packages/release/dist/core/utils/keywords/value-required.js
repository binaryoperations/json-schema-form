import { isNil } from "../../internals/object";
import { getTypeOf } from "json-schema-library";
export const valueRequiredKeyword = {
    id: "type",
    keyword: "type",
    addValidate: ({ schema }) => !!schema.type,
    validate: validateValueRequired,
    order: -1,
};
export const valueRequiredError = {
    "value-required": "Required {{label}}"
};
function getJsonSchemaType(value, expectedType) {
    const jsType = getTypeOf(value);
    if (jsType === "number" &&
        (expectedType === "integer" || (Array.isArray(expectedType) && expectedType.includes("integer")))) {
        return Number.isInteger(value) || isNaN(value) ? "integer" : "number";
    }
    return jsType;
}
function deriveError(dataType, value) {
    switch (dataType) {
        case "null":
            return true;
        case "integer":
        case "number":
            return isNil(value);
        case "string":
            return !value;
    }
    return false;
}
function validateValueRequired({ node, data, uiNode, pointer, }) {
    const schema = node.schema;
    const dataType = getJsonSchemaType(data, schema.type);
    if (!uiNode?.required) {
        return;
    }
    if (!deriveError(dataType, data))
        return;
    return node.createError("value-required", {
        value: data,
        received: dataType,
        expected: schema.type,
        schema,
        pointer: pointer,
        label: uiNode.options?.label ?? "",
        uiNode,
    });
}
