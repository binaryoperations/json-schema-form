import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import { ControlSchema } from '@binaryoperations/json-forms-core/models/ControlSchema';

import {
  ControlNodeType,
  LayoutSchema,
  EnumUiNode,
} from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';


export type { SchemaNode };

type Extensions = {
  required?: boolean;
  parent?: string
}

export type ExtendedLayoutSchema = LayoutSchema & Extensions;
export type ExtendedControlSchema = ControlNodeType & Extensions;

export class UiStore {
  keyMap: Record<string, ExtendedLayoutSchema> = {};
  pathMap: Record<string, ExtendedControlSchema> = {};
  tree: Record<string, string[]> = {};

  constructor(private draftSchema: LogicalSchema) {}

  get rootSchema() {
    return this.draftSchema.rootSchema;
  }

  getChildren(key: string) {
    return this.tree[key];
  }

  getNode(key: string) {
    return this.keyMap[key];
  }

  getNodeByPath(path: string) {
    return this.pathMap[path];
  }

  getChildNodes(key: string) {
    return this.getChildren(key)?.map(this.getNode.bind(this)) ?? [];
  }

  getChildControls(key: string) {
    return this.getChildNodes(key).flatMap((node): ExtendedControlSchema[] => {
      if (this.isControl(node.id!)) return [node] as ExtendedControlSchema[];
      return [...this.getChildControls(node.id!)] as ExtendedControlSchema[];
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

  prepareTemplate(schema?: ControlSchema, data?: object) {
    return this.draftSchema.prepareTemplate(schema, data);
  }

  deriveControlSchema(key: string, data?: object): ControlSchema | null {
    if (!this.isControl(key)) return null;

    const node = cast<ControlNodeType>(this.getNode(key));

    let schema = node.schema;
    // this might break references/computed values
    const template = this.prepareTemplate(node.schema, data);

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

  deriveControlSchemaNode(path: string, data: object) {
    return this.draftSchema.getSchemaNodeOf(path, data);
  }


  deriveDataNodeAtPath(data: object, pointer: string) {
    return {
      pointer: pointer,
      value: this.draftSchema.getData(data, pointer) // ensure data exists at pointer
    }
  }

  deriveDataAtPointer(data: object, pointer: string) {
    return this.deriveDataNodeAtPath(data, pointer)?.value ?? null;
  }
}
