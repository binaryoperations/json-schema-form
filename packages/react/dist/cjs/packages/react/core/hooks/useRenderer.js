"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("../../../core/controls/findControl.js"),u=require("../../../internals/invariant.js"),s=require("../../../internals/object.js"),r=require("../context/RendererContext.js"),i=require("./useStore.js"),c=e=>u(r.useRendererContext(t=>t.layout[e]),`Layout "${e}" has not been registered`),d=e=>{const t=r.useRendererContext(o=>o.controls);return i.useStore(o=>n.findControl(t,o.uiContext.getNode(e),o.uiContext.deriveNodeSchema(e)),s.shallowCompare)};exports.useControlNode=d;exports.useLayoutNode=c;
//# sourceMappingURL=useRenderer.js.map
