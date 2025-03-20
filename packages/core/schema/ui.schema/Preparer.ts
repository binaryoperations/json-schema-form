import orderBy from 'lodash/orderBy';

import {
  CustomNode,
  type FieldsetNode,
  type LayoutSchema,
} from '../../models/LayoutSchema';
import { LogicalSchema } from '../logical.schema/Parser';
import { UiStore } from './UiStore';

export class UiSchemaPreparer {
  private counter = 0;

  store!: UiStore;

  constructor(draftSchema: LogicalSchema) {
    this.store = new UiStore(draftSchema);
  }

  // reconsider:
  // Do I need to prepare the tree in ahead-of-time?
  // can the child nodes be derived just-in-time?
  private traverse(uiSchema: LayoutSchema | FieldsetNode, idRoot: string) {
    const nextCount = ++this.counter;
    const id = idRoot + '/' + (uiSchema.id ?? nextCount);

    this.store.keyMap[id] = uiSchema;

    if (!('nodes' in uiSchema) || !uiSchema.nodes) return id;

    const treeNodes: string[] = [];

    const nodes = [uiSchema.nodes].flat().filter(Boolean) as LayoutSchema[];

    if (!Array.isArray(uiSchema.nodes)) {
      this.store.keyMap[id] = { ...(uiSchema as CustomNode), nodes };
    }

    for (const nextUiSchema of nodes) {
      treeNodes.push(this.traverse(nextUiSchema, id));
    }

    this.store.tree[id] = orderBy(
      treeNodes,
      (nodeId) => this.store.keyMap[nodeId].id ?? 0,
      'asc'
    );

    return id;
  }

  static prepare(uiSchema: LayoutSchema, draftSchema: LogicalSchema) {
    const ClassConstructor: typeof UiSchemaPreparer = Object.assign(this);
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
