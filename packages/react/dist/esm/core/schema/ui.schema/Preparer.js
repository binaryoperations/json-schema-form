import orderBy from 'lodash/orderBy';
import { UiNodeType, } from '../../models/LayoutSchema';
import { UiStore } from './UiStore';
export class UiSchemaPreparer {
    counter = 0;
    store;
    constructor(draftSchema) {
        this.store = new UiStore(draftSchema);
    }
    // reconsider:
    // Do I need to prepare the tree in ahead-of-time?
    // can the child nodes be derived just-in-time?
    traverse(uiSchema, idRoot) {
        const nextCount = ++this.counter;
        const id = idRoot + '/' + (uiSchema.id ?? nextCount);
        this.store.keyMap[id] = uiSchema;
        if (uiSchema.type === UiNodeType.CUSTOM)
            return id;
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
    static prepare(uiSchema, draftSchema) {
        const ClassConstructor = Object.assign(this);
        const parser = new ClassConstructor(draftSchema);
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
//# sourceMappingURL=Preparer.js.map