import type {
  ArrayJsonSchema,
  BaseKeys,
  BooleanJsonSchema,
  JsonSchema,
  NullJsonSchema,
  NumberJsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from '../../models/JsonSchema';

import uniqBy from 'lodash/uniqBy';
import { extractSegmentsFromPath } from '@binaryoperations/json-forms-internals/extractSegmentsFromPath';

type Properties = { [property: string]: JsonSchema };

export enum CONSTANTS {
  OBJECT,
  ARRAY,
  STRING,
  NUMBER,
  NULL,
}

type ExpectedResponse = {
  [CONSTANTS.OBJECT]: Partial<Omit<ObjectJsonSchema, BaseKeys | 'properties'>>;
  [CONSTANTS.ARRAY]: Partial<Omit<ArrayJsonSchema, BaseKeys | 'items'>>;
  [CONSTANTS.STRING]: Partial<Omit<StringJsonSchema, BaseKeys>>;
  [CONSTANTS.NUMBER]: Partial<Omit<StringJsonSchema, BaseKeys>>;
  [CONSTANTS.NULL]: Partial<Omit<StringJsonSchema, BaseKeys>>;
};

type DeriveOptions = (
  value: any,
  path: (string | number)[]
) => <T extends CONSTANTS = CONSTANTS>(
  prop: T
) => undefined | ExpectedResponse[T];

export class JsonSchemaGenerator<T extends JsonSchema = JsonSchema> {
  static StringSchema: typeof JsonSchemaGenerator<StringJsonSchema>;
  static NumberSchema: typeof JsonSchemaGenerator<NumberJsonSchema>;
  static BooleanSchema: typeof JsonSchemaGenerator<BooleanJsonSchema>;
  static NullSchema: typeof JsonSchemaGenerator<NullJsonSchema>;
  static ArraySchema: typeof JsonSchemaGenerator<ArrayJsonSchema>;
  static ObjectSchema: typeof JsonSchemaGenerator<ObjectJsonSchema>;

  constructor(protected deriveOptions: DeriveOptions) {}

  protected get Constructor(): typeof JsonSchemaGenerator {
    return this.constructor as typeof JsonSchemaGenerator;
  }

  private static construct(deriveOptions?: DeriveOptions) {
    deriveOptions = deriveOptions ?? (() => () => undefined);
    return new this(deriveOptions);
  }

  static generate(object: unknown, deriveOptions?: DeriveOptions) {
    const instance = this.construct(deriveOptions);
    return instance.getTypedInstance(object).prepareSchema(object, '', '#');
  }

  protected getTypedClass(type: string) {
    switch (type) {
      case 'null':
        return this.Constructor.NullSchema;
      case 'number':
        return this.Constructor.NumberSchema;
      case 'boolean':
        return this.Constructor.BooleanSchema;
      case 'object':
        return this.Constructor.ObjectSchema;
      case 'array':
        return this.Constructor.ArraySchema;
      case 'string':
      default:
        return this.Constructor.StringSchema;
    }
  }

  protected getTypedInstance(type: unknown) {
    const normalizedType =
      typeof type === 'string'
        ? type
        : type === null
          ? 'null'
          : Array.isArray(type)
            ? 'array'
            : typeof type;
    // TODO: infer type correctly
    const Class = this.getTypedClass(normalizedType);
    return Class.construct(this.deriveOptions);
  }

  protected preparePath(tail: string | string[], head = '') {
    const $id = [head].concat(tail).filter(Boolean).filter(Boolean).join('/');
    return {
      $id,
      path: extractSegmentsFromPath($id),
    };
  }

  protected parseProperties(object: object, head?: string) {
    return Object.entries(object).reduce(
      (properties: Properties | any, [key, value]) =>
        Object.defineProperty(properties, key, {
          value: this.parseValue(value, key, head),
        }),
      {}
    );
  }

  protected parseArrayOrObject(
    value: object | any[],
    key: string,
    head?: string
  ) {
    if (Array.isArray(value)) {
      return this.getTypedInstance('array').prepareSchema(value, key, head);
    }

    return this.getTypedInstance('object').prepareSchema(value, key, head);
  }

  protected parseValue(value: any, key: string, head?: string): JsonSchema {
    if (value === null)
      return this.getTypedInstance('null').prepareSchema(value, '');

    switch (typeof value) {
      case 'object':
        return this.parseArrayOrObject(value, key, head);
      default:
        return this.getTypedInstance(typeof value).prepareSchema(
          value,
          key,
          head
        );
    }
  }

  prepareSchema(value: any, _key: string, _head?: string): T {
    throw new Error(
      `"${
        value === null ? 'null' : typeof value
      }" prepareSchema method is not defined on this class`
    );
  }
}

class JsconSchemaProcesserObjectSchema extends JsonSchemaGenerator<ObjectJsonSchema> {
  prepareSchema(value: object, key: string, head?: string): ObjectJsonSchema {
    const { $id, path } = this.preparePath([key, 'properties'], head);
    const deriveOptions = this.deriveOptions(value, path);

    const objectSchema: ObjectJsonSchema = {
      $id,
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: this.parseProperties(value, $id),
      ...deriveOptions(CONSTANTS.OBJECT),
    };

    return objectSchema;
  }
}

class JsconSchemaProcesserArraySchema extends JsonSchemaGenerator<ArrayJsonSchema> {
  private parseArray(value: any[], head: string) {
    if (!value.length) return value;

    const childrenSchema = value.map((item, i) =>
      this.parseValue(item, `${i}`, head)
    );

    const distinctChildren = uniqBy(childrenSchema, 'type');

    if (distinctChildren.length === 1) return distinctChildren;

    return {
      oneOf: distinctChildren,
    };
  }

  prepareSchema(value: any[], key: string, head?: string): ArrayJsonSchema {
    const { $id, path } = this.preparePath(['items', key], head);
    const items = this.parseArray(value, $id);

    const deriveOptions = this.deriveOptions(value, path);

    return {
      $id,
      type: 'array',
      items: items,
      ...deriveOptions(CONSTANTS.ARRAY),
    };
  }
}

class JsconSchemaProcesserStringSchema extends JsonSchemaGenerator<StringJsonSchema> {
  prepareSchema(value: string, key: string, head?: string): StringJsonSchema {
    const { $id, path } = this.preparePath(key, head);

    const deriveOptions = this.deriveOptions(value, path);

    return {
      $id,
      type: 'string',
      ...deriveOptions(CONSTANTS.STRING),
    };
  }
}

class JsconSchemaProcesserNumberSchema extends JsonSchemaGenerator<NumberJsonSchema> {
  prepareSchema(value: number, key: string, head?: string): NumberJsonSchema {
    const { $id, path } = this.preparePath(key, head);

    const deriveOptions = this.deriveOptions(value, path);

    return {
      $id,
      type: 'number',
      ...deriveOptions(CONSTANTS.NUMBER),
    };
  }
}

class JsconSchemaProcesserBooleanSchema extends JsonSchemaGenerator<BooleanJsonSchema> {
  prepareSchema(
    _value: boolean,
    key: string,
    head?: string
  ): BooleanJsonSchema {
    const { $id } = this.preparePath(key, head);

    return {
      $id,
      type: 'boolean',
    };
  }
}

class JsconSchemaProcesserNullSchema extends JsonSchemaGenerator<NullJsonSchema> {
  prepareSchema(value: any[], key: string, head?: string): NullJsonSchema {
    const { $id, path } = this.preparePath(key, head);
    const deriveOptions = this.deriveOptions(value, path);

    return {
      $id,
      type: 'null',
      ...deriveOptions(CONSTANTS.NULL),
    };
  }
}

JsonSchemaGenerator.StringSchema = JsconSchemaProcesserStringSchema;
JsonSchemaGenerator.NumberSchema = JsconSchemaProcesserNumberSchema;
JsonSchemaGenerator.BooleanSchema = JsconSchemaProcesserBooleanSchema;
JsonSchemaGenerator.ObjectSchema = JsconSchemaProcesserObjectSchema;
JsonSchemaGenerator.ArraySchema = JsconSchemaProcesserArraySchema;
JsonSchemaGenerator.NullSchema = JsconSchemaProcesserNullSchema;
