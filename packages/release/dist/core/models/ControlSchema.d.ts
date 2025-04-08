export type ControlSchemaTypes = 'string' | 'number' | 'array' | 'object' | 'boolean' | 'null';
export interface CompositeSchema {
    /**
     * This interface represents the complete set of properties
     * that can be expected in a JSON Schema as per the latest
     * specification.
     */
    $schema?: string;
    $id?: string;
    title?: string;
    description?: string;
    default?: any;
    examples?: any[];
    type?: `${ControlSchemaTypes}` | `${ControlSchemaTypes}`[];
    enum?: any[];
    const?: any;
    format?: string;
    readOnly?: boolean;
    writeOnly?: boolean;
    allOf?: CompositeSchema[];
    anyOf?: CompositeSchema[];
    oneOf?: CompositeSchema[];
    not?: CompositeSchema;
    if?: CompositeSchema;
    then?: CompositeSchema;
    else?: CompositeSchema;
    errorMessage?: any;
    definitions?: {
        [key: string]: CompositeSchema;
    };
    properties?: {
        [property: string]: CompositeSchema;
    };
    patternProperties?: {
        [pattern: string]: CompositeSchema;
    };
    additionalProperties?: boolean | CompositeSchema;
    required?: string[];
    dependencies?: {
        [key: string]: CompositeSchema | string[];
    };
    minProperties?: number;
    maxProperties?: number;
    items?: CompositeSchema | CompositeSchema[];
    additionalItems?: boolean | CompositeSchema;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    contains?: CompositeSchema;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
    propertyNames?: CompositeSchema;
}
interface ControlSchemaBase<Default = unknown> {
    $ref?: string;
    /**
     * This is important because it tells refs where
     * the root of the document is located
     */
    $id?: string;
    /**
     * It is recommended that the meta-schema is
     * included in the root of any JSON Schema
     */
    $schema?: string;
    /**
     * Title of the schema
     */
    title?: string;
    /**
     * Schema description
     */
    description?: string;
    /**
     * Default json for the object represented by
     * this schema
     */
    default?: Default;
    /**
     * Enumerates the values that this schema can be
     * e.g.
     * {"type": "string",
     *  "enum": ["red", "green", "blue"]}
     */
    enum?: any[];
    /**
     * The basic type of this schema, can be one of
     * [string, number, object, array, boolean, null]
     * or an array of the acceptable types
     */
    type?: `${ControlSchemaTypes}`;
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    /**
     * The entity being validated must not match this schema
     */
    not?: Schema;
    format?: string;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: any[];
    contains?: Schema;
    propertyNames?: Schema;
    const?: any;
    if?: Schema;
    then?: Schema;
    else?: Schema;
    errorMessage?: any;
}
export interface StringJsonSchema extends ControlSchemaBase<string> {
    type: 'string';
    maxLength?: number;
    minLength?: number;
    /**
     * This is a regex string that the value must
     * conform to
     */
    pattern?: string;
}
export interface NumberJsonSchema extends ControlSchemaBase<number> {
    type: 'number';
    /**
     * The value must be a multiple of the number
     * (e.g. 10 is a multiple of 5)
     */
    multipleOf?: number;
    maximum?: number;
    /**
     * If true maximum must be > value, >= otherwise
     */
    exclusiveMaximum?: number;
    minimum?: number;
    /**
     * If true minimum must be < value, <= otherwise
     */
    exclusiveMinimum?: number;
}
export interface ArrayJsonSchema extends ControlSchemaBase<any[]> {
    type: 'array';
    additionalItems?: boolean | Schema;
    items?: Schema | Schema[];
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
}
export interface ObjectJsonSchema extends ControlSchemaBase<object> {
    type: 'object';
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    additionalProperties?: boolean | Schema;
    /**
     * Holds simple JSON Schema definitions for
     * referencing from elsewhere.
     */
    definitions?: {
        [key: string]: Schema;
    };
    /**
     * The keys that can exist on the object with the
     * json schema that should validate their value
     */
    properties?: {
        [property: string]: Schema;
    };
    /**
     * The key of this object is a regex for which
     * properties the schema applies to
     */
    patternProperties?: {
        [pattern: string]: Schema;
    };
    /**
     * If the key is present as a property then the
     * string of properties must also be present.
     * If the value is a JSON Schema then it must
     * also be valid for the object if the key is
     * present.
     */
    dependencies?: {
        [key: string]: Schema | string[];
    };
}
export interface NullJsonSchema extends ControlSchemaBase<null> {
    type: 'null';
}
export interface BooleanJsonSchema extends ControlSchemaBase<boolean> {
    type: 'boolean';
}
export interface OneOfRootSchema extends ControlSchemaBase<boolean> {
    oneOf: Schema[];
}
export interface AnyOfRootSchema extends ControlSchemaBase<boolean> {
    anyOf: Schema[];
}
type Schema = StringJsonSchema | NumberJsonSchema | ArrayJsonSchema | ObjectJsonSchema | NullJsonSchema | BooleanJsonSchema | OneOfRootSchema | AnyOfRootSchema | CompositeSchema;
export type ControlSchema = Schema;
export {};
//# sourceMappingURL=ControlSchema.d.ts.map