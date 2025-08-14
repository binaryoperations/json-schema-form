import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import { fpPick, cloneDeep } from '@binaryoperations/json-forms-core/internals/object';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import { ControlSchema } from '@binaryoperations/json-forms-core/models/ControlSchema';

import {
  ControlNodeType,
  LayoutSchema,
  EnumUiNode,
} from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';

export type { SchemaNode };

export class UiStore {
  keyMap: Record<string, LayoutSchema> = {};
  tree: Record<string, string[]> = {};

  constructor(private draftSchema: LogicalSchema) {}

  get rootSchema() {
    return this.draftSchema;
  }

  getChildren(key: string) {
    return this.tree[key];
  }

  getNode(key: string) {
    return this.keyMap[key];
  }

  getChildNodes(key: string) {
    return this.getChildren(key)?.map(this.getNode.bind(this)) ?? [];
  }

  getChildControls(key: string) {
    return this.getChildNodes(key).flatMap((node): ControlNodeType[] => {
      if (this.isControl(node.id!)) return [node] as ControlNodeType[];
      return [...this.getChildControls(node.id!)] as ControlNodeType[];
    });
  }

  getNodeType(key: string) {
    return this.getNode(key).type;
  }

  isControl(key: string) {
    return this.getNodeType(key) === EnumUiNode.CONTROL;
  }

  freeze() {
    this.keyMap = Object.freeze(this.keyMap);
    this.tree = Object.freeze(this.tree);

    return this;
  }

  deriveSchemaAtPointer(key: string, data?: object) {
    if (!this.isControl(key)) return null;

    const node = cast<ControlNodeType>(this.getNode(key));

    let schema = node.schema;
    // this might break references/computed values
    const template = this.draftSchema.prepareTemplate(cloneDeep(fpPick(node.path.split("/"), data)));

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
        type: schema.type.find((type) => type === typeof value) ?? schema.type.at(0),
      };
    }

    return schema;
  }

  deriveSchemaNodeAtPointer(key: string, data?: object) {
    return this.draftSchema.getSchemaNodeOf(key, data);
  }
}
