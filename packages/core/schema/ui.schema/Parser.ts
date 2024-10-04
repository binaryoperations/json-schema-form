import orderBy from 'lodash/orderBy';
import { UiSchema, FieldsetNode } from '../../models/UiSchema';
import { JsonSchema } from '../../models';
import { UiStore } from './UiStore';

export class UiSchemaParser {
  private counter = 0;

  store!: UiStore;

  constructor(private schema: JsonSchema) {
    this.store = new UiStore(this.schema);
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

  static parse(uiSchema: UiSchema, schema: JsonSchema) {
    const ClassConstructor: typeof UiSchemaParser = Object.assign(this);
    const parser = new ClassConstructor(schema);

    const id = parser.walk(uiSchema, 'root');

    parser.store.setRoot(id);
    const store = parser.store;

    return new Proxy(store, {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
    });
  }
}
