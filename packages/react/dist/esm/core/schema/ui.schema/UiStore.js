import { cast } from '../../internals/cast';
import { UiNodeType, } from '../../models/UiSchema';
export class UiStore {
    keyMap = {};
    tree = {};
    constructor() { }
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
    deriveNodeSchema(key) {
        if (!this.isControl(key))
            return null;
        const node = cast(this.getNode(key));
        return node.schema;
    }
}
//# sourceMappingURL=UiStore.js.map