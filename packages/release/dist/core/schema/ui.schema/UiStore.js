import { cast } from '../../internals/cast';
import resolvers from '../../internals/resolvers';
import { UiNodeType, } from '../../models/LayoutSchema';
export class UiStore {
    draftSchema;
    keyMap = {};
    tree = {};
    constructor(draftSchema) {
        this.draftSchema = draftSchema;
    }
    getChildren(key) {
        return this.tree[key];
    }
    getNode(key) {
        return this.keyMap[key];
    }
    getChildNodes(key) {
        return this.getChildren(key).map(this.getNode.bind(this));
    }
    getNodeType(key) {
        return this.getNode(key).type;
    }
    isControl(key) {
        return this.getNodeType(key) === UiNodeType.CONTROL;
    }
    freeze() {
        this.keyMap = Object.freeze(this.keyMap);
        this.tree = Object.freeze(this.tree);
        return this;
    }
    deriveSchemaAtPointer(key, data) {
        if (!this.isControl(key))
            return null;
        const node = cast(this.getNode(key));
        let schema = node.schema;
        const value = resolvers.resolvePath(data, node.path);
        const template = value ?? this.draftSchema.prepareTemplate(data);
        if (!schema) {
            schema = this.draftSchema.getSchemaOf(node.path, template);
        }
        if (Array.isArray(schema.type)) {
            schema = {
                ...schema,
                type: schema.type.find((type) => type === typeof value) ?? 'null',
            };
        }
        return schema;
    }
    deriveSchemaNodeAtPointer(key, data) {
        return this.draftSchema.getSchemaNodeOf(key, data);
    }
}
