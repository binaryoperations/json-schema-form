import type {
    ArrayJsonSchema,
    BooleanJsonSchema,
    JsonSchema,
    NullJsonSchema,
    NumberJsonSchema,
    ObjectJsonSchema,
    StringJsonSchema,
} from "../models/JsonSchema";

export const isStringSchema = (
    schema: JsonSchema
): schema is StringJsonSchema => schema.type === "string";

export const isNumberSchema = (
    schema: JsonSchema
): schema is NumberJsonSchema => schema.type === "number";

export const isBooleanSchema = (
    schema: JsonSchema
): schema is BooleanJsonSchema => schema.type === "boolean";

export const isNullSchema = (schema: JsonSchema): schema is NullJsonSchema =>
    schema.type === "null";

export const isObjectSchema = (
    schema: JsonSchema
): schema is ObjectJsonSchema => schema.type === "object";

export const isArraySchema = (schema: JsonSchema): schema is ArrayJsonSchema =>
    schema.type === "array";
