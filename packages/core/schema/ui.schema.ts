import orderBy from 'lodash/orderBy';
import {
  UiSchema,
  FieldsetNode,
  UiNodeType,
  ControlNode,
} from '../models/UiSchema';

export class Generate {}

export class Parser {
  private counter = 0;

  private store!: UiStore;

  constructor() {
    this.resetStore();
  }

  private resetStore() {
    this.counter = 0;
    this.store = new UiStore();
  }

  private walk(uiSchema: UiSchema | FieldsetNode, idRoot: string) {
    const nextCount = ++this.counter;
    const id = idRoot + '/' + (uiSchema.id ?? nextCount);

    this.store.keyMap[id] = uiSchema;

    if ('nodes' in uiSchema) {
      const treeNodes: string[] = [];

      const nodes = uiSchema.nodes.filter(Boolean);
      for (const nextUiSchema of nodes) {
        treeNodes.push(this.walk(nextUiSchema, id));
      }

      this.store.tree[id] = orderBy(
        treeNodes,
        (nodeId) => this.store.keyMap[nodeId].id ?? 0,
        'asc'
      );
    }

    return id;
  }

  parse(uiSchema: UiSchema) {
    const id = this.walk(uiSchema, 'root');

    this.store.setRoot(id);

    const store = this.store;

    // Cleanup store
    this.resetStore();

    return new Proxy(store, {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
    });
  }
}

export class UiStore {
  keyMap: Record<string, UiSchema | FieldsetNode> = {};
  tree: Record<string, string[]> = {};

  constructor() {}

  getChildren(key: string) {
    return this.tree[key];
  }

  getNode(key: string) {
    return this.keyMap[key];
  }

  getChildNodes(key: string) {
    return this.getChildren(key).map(this.getNode.bind(this));
  }

  getNodeType(key: string) {
    return this.getNode(key).type;
  }

  isControl(key: string) {
    return this.getNodeType(key) === UiNodeType.CONTROL;
  }

  setRoot(key: string) {
    if (this.isControl(key)) {
      this.keyMap.root = {
        id: 'root',
        type: UiNodeType.ROWS,
        nodes: [this.keyMap[key] as ControlNode],
      };

      this.tree.root = [key];
      return;
    }

    this.keyMap.root = this.getNode(key);
    this.tree.root = this.getChildren(key);

    this.keyMap = Object.freeze(this.keyMap);
    this.tree = Object.freeze(this.tree);
  }
}
