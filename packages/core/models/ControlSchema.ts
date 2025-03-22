export type ControlSchemaTypes =
  | 'string'
  | 'number'
  | 'array'
  | 'object'
  | 'boolean'
  | 'null';

export type BaseKeys = keyof ControlSchemaBase;

interface ControlSchemaBase<Default = unknown> {
  $ref?: string;
  /////////////////////////////////////////////////
  // Schema Metadata
  /////////////////////////////////////////////////
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
  /////////////////////////////////////////////////
  // Generic
  /////////////////////////////////////////////////
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

  /////////////////////////////////////////////////
  // Combining Schemas
  /////////////////////////////////////////////////
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

//string, number, object, array, boolean, null
export interface StringJsonSchema extends ControlSchemaBase<string> {
  /////////////////////////////////////////////////
  // String Validation
  /////////////////////////////////////////////////
  type: 'string';
  maxLength?: number;
  minLength?: number;
  /**
   * This is a regex string that the value must
   * conform to
   */
  pattern?: string;
}

//string, number, object, array, boolean, null
export interface NumberJsonSchema extends ControlSchemaBase<number> {
  /////////////////////////////////////////////////
  // Number Validation
  /////////////////////////////////////////////////
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
  /////////////////////////////////////////////////
  // Array Validation
  /////////////////////////////////////////////////
  type: 'array';
  additionalItems?: boolean | Schema;
  items?: Schema | Schema[];
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
}

export interface ObjectJsonSchema extends ControlSchemaBase<object> {
  /////////////////////////////////////////////////
  // Object Validation
  /////////////////////////////////////////////////
  type: 'object';
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  additionalProperties?: boolean | Schema;
  /**
   * Holds simple JSON Schema definitions for
   * referencing from elsewhere.
   */
  definitions?: { [key: string]: Schema };
  /**
   * The keys that can exist on the object with the
   * json schema that should validate their value
   */
  properties?: { [property: string]: Schema };
  /**
   * The key of this object is a regex for which
   * properties the schema applies to
   */
  patternProperties?: { [pattern: string]: Schema };
  /**
   * If the key is present as a property then the
   * string of properties must also be present.
   * If the value is a JSON Schema then it must
   * also be valid for the object if the key is
   * present.
   */
  dependencies?: { [key: string]: Schema | string[] };
}

export interface NullJsonSchema extends ControlSchemaBase<null> {
  /////////////////////////////////////////////////
  // Object Validation
  /////////////////////////////////////////////////
  type: 'null';
}

export interface BooleanJsonSchema extends ControlSchemaBase<boolean> {
  /////////////////////////////////////////////////
  // Object Validation
  /////////////////////////////////////////////////
  type: 'boolean';
}

export interface OneOfRootSchema extends ControlSchemaBase<boolean> {
  oneOf: Schema[];
}
export interface AnyOfRootSchema extends ControlSchemaBase<boolean> {
  anyOf: Schema[];
}

export type ControlSchema =
  | StringJsonSchema
  | NumberJsonSchema
  | ArrayJsonSchema
  | ObjectJsonSchema
  | NullJsonSchema
  | BooleanJsonSchema
  | OneOfRootSchema
  | AnyOfRootSchema;

export type Schema = ControlSchema;
