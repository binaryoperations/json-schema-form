import orderBy from 'lodash/orderBy';
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
        const nextCount = this.counter++;
        const id = [idRoot ?? [], (uiSchema.id ?? nextCount)].flat().join("/");
        this.store.keyMap[id] = uiSchema;
        if (!uiSchema.nodes)
            return id;
        const treeNodes = [];
        const nodes = [uiSchema.nodes].flat().filter(Boolean);
        if (!Array.isArray(uiSchema.nodes)) {
            this.store.keyMap[id] = { ...uiSchema, nodes };
        }
        for (const nextUiSchema of nodes) {
            treeNodes.push(this.traverse(nextUiSchema, id));
        }
        this.store.tree[id] = orderBy(treeNodes, (nodeId) => this.store.keyMap[nodeId].order ?? 0, 'asc');
        return id;
    }
    static prepare(uiSchema, draftSchema) {
        const ClassConstructor = Object.assign(this);
        const parser = new ClassConstructor(draftSchema);
        parser.traverse({
            id: "root",
            nodes: [uiSchema],
            type: "form",
        });
        return new Proxy(parser.store.freeze(), {
            get(target, key, receiver) {
                return Reflect.get(target, key, receiver);
            },
        });
    }
}
