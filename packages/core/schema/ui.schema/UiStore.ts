import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import { ControlSchema } from '@binaryoperations/json-forms-core/models/ControlSchema';

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

  freeze() {
    this.keyMap = Object.freeze(this.keyMap);
    this.tree = Object.freeze(this.tree);

    return this;
  }

  deriveSchemaAtPointer(key: string, data?: object) {
    if (!this.isControl(key)) return null;

    const node = cast<ControlNode>(this.getNode(key));

    let schema = node.schema;

    const value = resolvers.resolvePath(data, node.path);
    const template = value ?? this.draftSchema.prepareTemplate(data);

    if (!schema) {
      schema = this.draftSchema.getSchemaOf(
        node.path,
        template
      ) as ControlSchema;
    }

    if (Array.isArray(schema.type)) {
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
