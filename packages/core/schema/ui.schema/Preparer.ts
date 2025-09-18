

import { orderBy, assign } from '@binaryoperations/json-forms-core/internals/object';
import type { LayoutNodeType, LayoutSchema, } from '../../models/LayoutSchema';
import { LogicalSchema } from '../logical.schema/Parser';
import { ExtendedControlSchema, UiStore } from './UiStore';

export class UiSchemaPreparer {
  private counter = 0;

  store!: UiStore;

  constructor(draftSchema: LogicalSchema) {
    this.store = new UiStore(draftSchema);
  }

  // reconsider:
  // Do I need to prepare the tree in ahead-of-time?
  // can the child nodes be derived just-in-time?
  private traverse(uiSchema: LayoutSchema, idRoot?: string) {
    const id = [idRoot ?? [], (uiSchema.id ?? this.counter++)].flat().join("/");

    if (uiSchema.id) {
      uiSchema = assign({}, uiSchema, {
          options: {
            ...uiSchema.options,
            id: uiSchema.id,
          },
          id,
      })
    }


    if ("path" in  uiSchema) {
      uiSchema.path = uiSchema.path.startsWith("#") ? uiSchema.path : `#/${uiSchema.path}`.split("/").filter(Boolean).join("/")

      const dataPath = uiSchema.path.split("/");
      const parentNode = dataPath.slice(0, -1).join("/");
      const item = dataPath.pop();

      const options = uiSchema?.options ?? {}
      const isRequired = "required" in options ? !!options.required : !!this.store.rootSchema.getNode(parentNode)?.node?.schema.required?.includes(item);
      uiSchema = Object.defineProperty(uiSchema, 'required', {
        value: isRequired,
        writable: false,
        enumerable: false,
      });
    }

    this.store.keyMap[id] = "id" in uiSchema ? uiSchema : Object.defineProperties(uiSchema, {
      id: { value: id, writable: false, enumerable: false },
    });

    this.store.keyMap[id] = Object.defineProperty(this.store.keyMap[id], "parent", { value: idRoot, writable: false, enumerable: false});

    if ("path" in uiSchema) {
      this.store.pathMap[uiSchema.path] = this.store.keyMap[id] as ExtendedControlSchema;
      return id;
    }

    if (!uiSchema.nodes) return id;

    const treeNodes: string[] = [];
    const nodes = [uiSchema.nodes].flat().filter(Boolean) as LayoutSchema[];

    if (!Array.isArray(uiSchema.nodes)) {
      this.store.keyMap[id] = { ...(uiSchema as LayoutNodeType), nodes };
      this.store.keyMap[id] = Object.hasOwn(this.store.keyMap[id], "id")
        ? this.store.keyMap[id]
        : Object.defineProperties(
          this.store.keyMap[id],
          { id: { value: id, writable: false, enumerable: false }, });
    }

    for (const nextUiSchema of nodes) {
      treeNodes.push(this.traverse({...nextUiSchema}, id));
    }

    this.store.tree[id] = orderBy(
      treeNodes,
      (nodeId) => this.store.keyMap[nodeId].order ?? 0,
      'asc'
    );

    return id;
  }

  static prepare(uiSchema: LayoutSchema, draftSchema: LogicalSchema) {
    const ClassConstructor: typeof UiSchemaPreparer = Object.assign(this);
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
