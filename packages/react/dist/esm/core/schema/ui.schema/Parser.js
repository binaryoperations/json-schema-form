import orderBy from 'lodash/orderBy';
import { UiStore } from './UiStore';
export class UiSchemaParser {
    counter = 0;
    store;
    constructor() {
        this.store = new UiStore();
    }
    // reconsider:
    // Do I need to prepare the tree in ahead-of-time?
    // can the child nodes be derived just-in-time?
    traverse(uiSchema, idRoot) {
        const nextCount = ++this.counter;
        const id = idRoot + '/' + (uiSchema.id ?? nextCount);
        this.store.keyMap[id] = uiSchema;
        if (!('nodes' in uiSchema))
            return id;
        const treeNodes = [];
        const nodes = uiSchema.nodes.filter(Boolean);
        for (const nextUiSchema of nodes) {
            treeNodes.push(this.traverse(nextUiSchema, id));
        }
        this.store.tree[id] = orderBy(treeNodes, (nodeId) => this.store.keyMap[nodeId].id ?? 0, 'asc');
        return id;
    }
    static parse(uiSchema) {
        const ClassConstructor = Object.assign(this);
        const parser = new ClassConstructor();
        const id = parser.traverse(uiSchema, 'root');
        parser.store.setRoot(id);
        const store = parser.store;
        return new Proxy(store, {
            get(target, key, receiver) {
                return Reflect.get(target, key, receiver);
            },
        });
    }
}
//# sourceMappingURL=Parser.js.map