import { isNil } from "@binaryoperations/json-forms-core/internals/object";
import { ControlNodeType } from "@binaryoperations/json-forms-core/models";
import { ErrorConfig, getTypeOf, JsonSchemaValidatorParams, Keyword } from "json-schema-library";
import type { JSType } from "json-schema-library/dist/src/utils/getTypeOf";

export const valueRequiredKeyword: Keyword = {
  id: "type",
  keyword: "type",
  addValidate: ({ schema }) => !!schema.type,
  validate: validateValueRequired,
  order: -1,
};


export const valueRequiredError: ErrorConfig = {
  "value-required": "Required {{label}}"
}


function getJsonSchemaType(value: unknown, expectedType: string | string[]): JSType | "integer" {
    const jsType = getTypeOf(value);
    if (
        jsType === "number" &&
        (expectedType === "integer" || (Array.isArray(expectedType) && expectedType.includes("integer")))
    ) {
        return Number.isInteger(value) || isNaN(value as any) ? "integer" : "number";
    }

    return jsType;
}

function deriveError(dataType: string, value?: unknown) {
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


function validateValueRequired({ node, data, uiNode, pointer, }: JsonSchemaValidatorParams & { uiNode?: ControlNodeType & { required?: boolean} }) {
  const schema = node.schema;
  const dataType = getJsonSchemaType(data, schema.type);

  if (!uiNode?.required) {
    return;
  }

  if (!deriveError(dataType, data)) return;

  return node.createError("value-required", {
    value: data,
    received: dataType,
    expected: schema.type,
    schema,
    pointer: pointer!,
    label: uiNode.options?.label ?? "",
    uiNode,
  });
}

