import{l as k}from"../../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js";const l=(a,t,n)=>{const e=a.map(o=>({...o,rank:o.deriveRank(n,t,{rootSchema:n})})),r=k.maxBy(e,"rank");return!r||r.rank<=0?null:r};export{l as findControl};
//# sourceMappingURL=findControl.js.map
