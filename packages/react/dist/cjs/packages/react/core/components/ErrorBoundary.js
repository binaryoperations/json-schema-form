"use strict";var d=Object.defineProperty;var a=(e,r,t)=>r in e?d(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var o=(e,r,t)=>a(e,typeof r!="symbol"?r+"":r,t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("../../../../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js"),p=require("../../../../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");class s extends p.reactExports.PureComponent{constructor(){super(...arguments);o(this,"state",{error:null});o(this,"retry",()=>{this.setState({error:null})})}static getDerivedStateFromError(t){return{error:t}}renderErrored(){if(this.props.renderError)return this.props.renderError(this.retry);const t=this.props.Fallback;return t?n.jsxRuntimeExports.jsx(t,{onRetry:this.retry}):null}render(){return this.state.error?this.renderErrored():n.jsxRuntimeExports.jsx(n.jsxRuntimeExports.Fragment,{children:this.props.children})}}const x=(e,r)=>function(i){const{...u}=i;return n.jsxRuntimeExports.jsx(s,{Fallback:r,children:n.jsxRuntimeExports.jsx(e,{...u})})};exports.ErrorBoundary=s;exports.withErrorBoundary=x;
//# sourceMappingURL=ErrorBoundary.js.map
