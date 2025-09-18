import { cast } from '../../internals/cast';
import resolvers from '../../internals/resolvers';
import { EnumUiNode, } from '../../models/LayoutSchema';
import { assign } from '../../internals/object';
import { setNodes } from '../logical.schema/nodeStore';
export class UiStore {
    draftSchema;
    keyMap = {};
    pathMap = {};
    tree = {};
    constructor(draftSchema) {
        this.draftSchema = draftSchema;
    }
    get rootSchema() {
        return this.draftSchema.rootSchema;
    }
    get draftType() {
        return this.draftSchema.draftType;
    }
    deriveSchemaNode(schema, draft) {
        return this.draftSchema.deriveSchemaNode(schema, draft);
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
        assign(this.draftSchema, {
            beforeValidate: () => { setNodes(this.pathMap); },
            afterValidate: () => { setNodes(null); },
        });
        return this;
    }
    prepareTemplate(schema, data) {
        return this.draftSchema.prepareTemplate(schema, data);
    }
    deriveControlSchema(key, data) {
        if (!this.isControl(key))
            return null;
        const node = cast(this.getNode(key));
        let schema = node.schema;
        // this might break references/computed values
        const template = this.prepareTemplate(node.schema, data);
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
    deriveDataNodeAtPath(data, pointer) {
        return {
            pointer: pointer,
            value: this.draftSchema.getData(data, pointer) // ensure data exists at pointer
        };
    }
    deriveDataAtPointer(data, pointer) {
        return this.deriveDataNodeAtPath(data, pointer)?.value ?? null;
    }
}
