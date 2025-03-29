import { cast } from '../../internals/cast';
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
    setRoot(key) {
        if (this.isControl(key)) {
            this.keyMap.root = {
                id: 'root',
                type: UiNodeType.ROWS,
                nodes: [cast(this.getNode(key))],
            };
            this.tree.root = [key];
            return;
        }
        this.keyMap.root = this.getNode(key);
        this.tree.root = this.getChildren(key);
        this.keyMap = Object.freeze(this.keyMap);
        this.tree = Object.freeze(this.tree);
    }
    deriveSchemaAtPointer(key, data) {
        if (!this.isControl(key))
            return null;
        const node = cast(this.getNode(key));
        if (!node.schema) {
            return cast(this.draftSchema.getSchemaOf(node.path, data));
        }
        return node.schema;
    }
    deriveSchemaNodeAtPointer(key, data) {
        return this.draftSchema.getSchemaNodeOf(key, data);
    }
}
//# sourceMappingURL=UiStore.js.map