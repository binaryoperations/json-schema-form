"use strict";const n=require("../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEmpty.js"),o=require("./extractSegmentsFromPath.js");function c(r,t){return n(t)||!r?r:o.extractSegmentsFromPath(t).reduce((e,s)=>{if(!(!e||!Object.prototype.hasOwnProperty.call(e,s)))return e[s]},r)}const i={resolvePath:c};module.exports=i;
//# sourceMappingURL=resolvers.js.map
