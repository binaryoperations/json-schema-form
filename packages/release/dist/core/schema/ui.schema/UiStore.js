import { cast } from '../../internals/cast';
import { cloneDeep, keyBy } from '../../internals/object';
import resolvers from '../../internals/resolvers';
import { EnumUiNode, } from '../../models/LayoutSchema';
export class UiStore {
    draftSchema;
    keyMap = {};
    pathMap = {};
    tree = {};
    $$dataNodesCache = new WeakMap();
    constructor(draftSchema) {
        this.draftSchema = draftSchema;
    }
    get rootSchema() {
        return this.draftSchema.rootSchema;
    }
    getChildren(key) {
        return this.tree[key];
    }
    getNode(key) {
        return this.keyMap[key];
    }
    getNodeByPath(path) {
        return this.pathMap[path];
    }
    getChildNodes(key) {
        return this.getChildren(key)?.map(this.getNode.bind(this)) ?? [];
    }
    getChildControls(key) {
        return this.getChildNodes(key).flatMap((node) => {
            if (this.isControl(node.id))
                return [node];
            return [...this.getChildControls(node.id)];
        });
    }
    getNodeType(key) {
        return this.getNode(key).type;
    }
    isControl(key) {
        return this.getNodeType(key) === EnumUiNode.CONTROL;
    }
    freeze() {
        this.keyMap = Object.freeze(this.keyMap);
        this.tree = Object.freeze(this.tree);
        return this;
    }
    prepareTemplate(data) {
        return this.draftSchema.prepareTemplate(cloneDeep(data ?? {}));
    }
    deriveControlSchema(key, data) {
        if (!this.isControl(key))
            return null;
        const node = cast(this.getNode(key));
        let schema = node.schema;
        // this might break references/computed values
        const template = this.prepareTemplate(data);
        if (!schema) {
            schema = this.draftSchema.getSchemaOf(node.path, template);
        }
        if (Array.isArray(schema.type)) {
            const value = resolvers.resolvePath(template, node.path);
            schema = {
                ...schema,
                type: schema.type.find((type) => type === typeof value) ?? schema.type.at(0),
            };
        }
        return schema;
    }
    deriveControlSchemaNode(path, data) {
        return this.draftSchema.getSchemaNodeOf(path, data);
    }
    deriveDataNodes(data) {
        if (!this.$$dataNodesCache.has(data)) {
            const dataNodes = keyBy(this.rootSchema.toDataNodes(this.prepareTemplate(data)), (dataNode) => dataNode.pointer);
            this.$$dataNodesCache.set(data, dataNodes);
        }
        return this.$$dataNodesCache.get(data);
    }
    deriveDataNodeAtPath(data, pointer) {
        return this.deriveDataNodes(data)[pointer] ?? null;
    }
    deriveDataAtPointer(data, pointer) {
        return this.deriveDataNodeAtPath(data, pointer)?.value ?? null;
    }
}
