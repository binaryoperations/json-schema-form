import s from"../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEmpty.js";import{extractSegmentsFromPath as n}from"./extractSegmentsFromPath.js";function i(r,t){return s(t)||!r?r:n(t).reduce((e,o)=>{if(!(!e||!Object.prototype.hasOwnProperty.call(e,o)))return e[o]},r)}const p={resolvePath:i};export{p as default};
//# sourceMappingURL=resolvers.js.map
