import { cast } from '@binaryoperations/json-forms-internals/cast';
import { JsonSchema } from '../../models';
import {
  UiSchema,
  FieldsetNode,
  UiNodeType,
  ControlNode,
} from '../../models/UiSchema';
import { resolvePath } from '@binaryoperations/json-forms-internals/resolvers';

export class UiStore {
  keyMap: Record<string, UiSchema | FieldsetNode> = {};
  tree: Record<string, string[]> = {};

  constructor(private schema: JsonSchema) {}

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

  deriveNodeSchema(key: string) {
    if (!this.isControl(key)) return null;

    const node = cast<ControlNode>(this.getNode(key));

    return resolvePath(this.schema, node.scope);
  }
}
