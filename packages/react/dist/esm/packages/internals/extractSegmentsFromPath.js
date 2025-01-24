import c from"./isNaN.js";function l(e){return a(e.replaceAll(/#|properties|items\/?/g,""))}function a(e){return e.replaceAll(/#\/?/g,"").split("/").reduce((r,t)=>t?r.concat(c(t)?t:+t):r,[])}export{a as extractSchmeaSegmentsFromPath,l as extractSegmentsFromPath};
//# sourceMappingURL=extractSegmentsFromPath.js.map
