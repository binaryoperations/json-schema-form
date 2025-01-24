import resolvers from '../../../internals/resolvers';
const arrayProperties = ['allOf', 'anyOf', 'oneOf'];
const objectProperties = [
    'contains',
    'propertyNames',
    'if',
    'not',
    'then',
    'else',
];
const hasPropertyValue = (node, segment) => segment in node && node[segment] !== undefined;
const hasWalkableProperties = (walkableProperties, node) => {
    return !walkableProperties.some((prop) => hasPropertyValue(node, prop));
};
export class JsonSchemaParser {
    rootSchema;
    constructor(rootSchema) {
        this.rootSchema = rootSchema;
    }
    static parse(object) {
        const instance = new this(object);
        return instance.walk(object);
    }
    explodeRef(ref) {
        const schema = resolvers.resolvePath(this.rootSchema, ref);
        if (!schema || typeof schema !== 'object' || Array.isArray(schema))
            throw new Error(`Invalid definition: "${ref}"`);
        return this.walk(schema);
    }
    walk(node) {
        if (node.$ref) {
            return this.explodeRef(node.$ref);
        }
        const type = node.type;
        node = !hasWalkableProperties([...arrayProperties, ...objectProperties], node)
            ? node
            : Object.entries(node).reduce((preparedNode, [nextKey, nextValue]) => {
                const typedKey = nextKey;
                if (!hasPropertyValue(node, typedKey))
                    return preparedNode;
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
            }, {});
        switch (type) {
            case 'array':
                return this.walkArray(node);
            case 'object':
                return this.walkObject(node);
            default:
                return node;
        }
    }
    // TODO: flatten schema from "allOf" | "oneOf" | "anyOf"
    walkObject(node) {
        const walkObjectValues = (value) => Object.entries(value).reduce((reducedValue, [key, value]) => Object.assign(reducedValue, {
            [key]: this.walk(value),
        }), {});
        const processors = {
            additionalProperties: (processedNode) => {
                const additionalProperties = node.additionalProperties;
                if (!additionalProperties || additionalProperties === true)
                    return processedNode;
                node.additionalProperties = this.walk(additionalProperties);
                return node;
            },
            definitions: (node) => {
                node.definitions = walkObjectValues(node.definitions);
                return node;
            },
            properties: (node) => {
                node.properties = walkObjectValues(node.properties);
                return node;
            },
            patternProperties: (node) => {
                node.patternProperties = walkObjectValues(node.patternProperties);
                return node;
            },
            dependencies: (node) => {
                const resolvedDependencies = Object.entries(node.dependencies).reduce((reducedValue, [key, value]) => {
                    return Object.assign(reducedValue, {
                        [key]: Array.isArray(value) ? value : this.walk(value),
                    });
                }, {});
                return Object.assign(node, {
                    dependencies: resolvedDependencies,
                });
            },
        };
        return Object.entries(processors).reduce((processedNode, [key, handler]) => {
            if (!hasPropertyValue(processedNode, key)) {
                return processedNode;
            }
            processedNode = { ...processedNode };
            return handler(processedNode);
        }, node);
    }
    walkArray(node) {
        if (!hasWalkableProperties(['items', 'additionalItems'], node))
            return node;
        node = { ...node };
        if (typeof node.additionalItems === 'object')
            node['additionalItems'] = this.walk(node['additionalItems']);
        if (!node.items)
            return node;
        const items = [].concat(node.items).map(this.walk.bind(this));
        node.items = Array.isArray(node.items) ? items : items.at(0);
        return node;
    }
}
//# sourceMappingURL=Parser.js.map