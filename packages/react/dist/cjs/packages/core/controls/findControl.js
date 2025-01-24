"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const d=require("../../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js"),l=(t,e,n)=>{const a=t.map(o=>({...o,rank:o.deriveRank(n,e,{rootSchema:n})})),r=d.lodashExports.maxBy(a,"rank");return!r||r.rank<=0?null:r};exports.findControl=l;
//# sourceMappingURL=findControl.js.map
