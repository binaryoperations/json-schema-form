import { cast } from '#/internals/cast';

import {
  ControlNode,
  FieldsetNode,
  LayoutSchema,
  UiNodeType,
} from '../../models/LayoutSchema';
import { LogicalSchema } from '../logical.schema/Parser';

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

  deriveNodeSchema(key: string, data: object) {
    if (!this.isControl(key)) return null;

    const node = cast<ControlNode>(this.getNode(key));

    if (!node.schema) {
      return cast<Required<ControlNode>['schema']>(
        this.draftSchema.getSchemaOf(node.path, data)
      );
    }

    return node.schema;
  }
}
