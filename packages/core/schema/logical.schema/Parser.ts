import { ArrayJsonSchema, JsonSchema, ObjectJsonSchema } from '../../models';
import { resolvePath } from '@binaryoperations/json-forms-internals/resolvers';

const arrayProperties: (keyof JsonSchema)[] = ['allOf', 'anyOf', 'oneOf'];
const objectProperties: (keyof JsonSchema)[] = [
  'contains',
  'propertyNames',
  'if',
  'not',
  'then',
  'else',
];

const hasPropertyValue = <T extends object>(node: T, segment: keyof T) =>
  segment in node && node[segment] !== undefined;

const hasWalkableProperties = <T extends object>(
  walkableProperties: (keyof T)[],
  node: T
) => {
  return !walkableProperties.some((prop) => hasPropertyValue(node, prop));
};

export class JsonSchemaParser {
  constructor(private rootSchema: JsonSchema) {}

  static parse(object: JsonSchema) {
    const instance = new this(object);
    return instance.walk(object);
  }

  private explodeRef(ref: string): JsonSchema {
    const schema = resolvePath(this.rootSchema, ref);
    if (!schema || typeof schema !== 'object' || Array.isArray(schema))
      throw new Error(`Invalid definition: "${ref}"`);

    return schema;
  }

  walk(node: JsonSchema): JsonSchema {
    if (node.$ref) {
      return this.explodeRef(node.$ref);
    }

    const type = node.type;

    node = !hasWalkableProperties(
      [...arrayProperties, ...objectProperties],
      node
    )
      ? node
      : Object.entries(node).reduce(
          (preparedNode: JsonSchema, [nextKey, nextValue]) => {
            const typedKey = nextKey as keyof JsonSchema;
            if (!hasPropertyValue(node, typedKey)) return preparedNode;
            if (arrayProperties.includes(typedKey))
              return Object.assign(preparedNode, {
                [nextKey]: [].concat(nextValue).map(this.walk.bind(this)),
              });

            if (objectProperties.includes(typedKey))
              return Object.assign(preparedNode, {
                [nextKey]: this.walk(nextValue),
              });

            return Object.assign(preparedNode, {
              [nextKey]: nextValue,
            });
          },
          {}
        );

    switch (type) {
      case 'array':
        return this.walkArray(node as ArrayJsonSchema);
      case 'object':
        return this.walkObject(node as ObjectJsonSchema);
      default:
        return node;
    }
  }

  private walkObject(node: ObjectJsonSchema): ObjectJsonSchema {
    const walkObjectValues = (value: Record<string, JsonSchema>) =>
      Object.entries(value).reduce(
        (reducedValue: Record<string, JsonSchema>, [key, value]) =>
          Object.assign(reducedValue, {
            [key]: this.walk(value),
          }),
        {}
      );

    const processors = {
      additionalProperties: (processedNode: ObjectJsonSchema) => {
        const additionalProperties = node.additionalProperties;
        if (!additionalProperties || additionalProperties === true)
          return processedNode;

        node.additionalProperties = this.walk(additionalProperties);
        return node;
      },
      definitions: (node: ObjectJsonSchema) => {
        node.definitions = walkObjectValues(node.definitions!);
        return node;
      },
      properties: (node: ObjectJsonSchema) => {
        node.properties = walkObjectValues(node.properties!);
        return node;
      },
      patternProperties: (node: ObjectJsonSchema) => {
        node.patternProperties = walkObjectValues(node.patternProperties!);
        return node;
      },
      dependencies: (node: ObjectJsonSchema) => {
        const resolvedDependencies = Object.entries(node.dependencies!).reduce(
          (reducedValue: ObjectJsonSchema['dependencies'], [key, value]) => {
            return Object.assign(reducedValue!, {
              [key]: Array.isArray(value) ? value : this.walk(value),
            });
          },
          {}
        );

        return Object.assign(node, {
          dependencies: resolvedDependencies,
        });
      },
    };

    return Object.entries(processors).reduce(
      (processedNode, [key, handler]) => {
        if (!hasPropertyValue(processedNode, key as keyof ObjectJsonSchema)) {
          return processedNode;
        }

        processedNode = { ...processedNode };
        return handler(processedNode);
      },
      node
    );
  }

  private walkArray(node: ArrayJsonSchema): ArrayJsonSchema {
    if (!hasWalkableProperties(['items', 'additionalItems'], node)) return node;
    node = { ...node };

    if (typeof node.additionalItems === 'object')
      node['additionalItems'] = this.walk(node['additionalItems']);

    if (!node.items) return node;

    const items = ([] as JsonSchema[])
      .concat(node.items)
      .map(this.walk.bind(this));

    node.items = Array.isArray(node.items) ? items : items.at(0);
    return node;
  }
}
