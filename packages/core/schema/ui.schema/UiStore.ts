import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import { ControlSchema } from '@binaryoperations/json-forms-core/models';

import {
  ControlNode,
  FieldsetNode,
  LayoutSchema,
  UiNodeType,
} from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';

export type { SchemaNode };

export class UiStore {
  keyMap: Record<string, LayoutSchema | FieldsetNode> = {};
  tree: Record<string, string[]> = {};

  constructor(private draftSchema: LogicalSchema) {}

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
        nodes: [cast<ControlNode>(this.getNode(key))],
      };

      this.tree.root = [key];
      return;
    }

    this.keyMap.root = this.getNode(key);
    this.tree.root = this.getChildren(key);

    this.keyMap = Object.freeze(this.keyMap);
    this.tree = Object.freeze(this.tree);
  }

  deriveSchemaAtPointer(key: string, data?: object) {
    if (!this.isControl(key)) return null;

    const node = cast<ControlNode>(this.getNode(key));

    let schema = node.schema;
    const template = this.draftSchema.prepareTemplate(data);

    if (!schema) {
      schema = this.draftSchema.getSchemaOf(
        node.path,
        template
      ) as ControlSchema;
    }

    if (Array.isArray(schema.type)) {
      const value = resolvers.resolvePath(template, node.path);
      schema = {
        ...schema,
        type: schema.type.find((type) => type === typeof value) ?? 'null',
      };
    }

    return schema;
  }

  deriveSchemaNodeAtPointer(key: string, data?: object) {
    return this.draftSchema.getSchemaNodeOf(key, data);
  }
}
