import { createFastContext } from '../fast-context';
const RendererContext = createFastContext({
    debugName: 'ComponentContext',
});
export const RendererContextProvider = RendererContext.Provider;
export const useRendererContext = RendererContext.useContextValue;
//# sourceMappingURL=RendererContext.js.map