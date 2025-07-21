import { RendererRepository } from './core/context/RendererContext';
import { type RankedControl } from './core/hoc/createControl';
export { type RankedControl, createControl } from './core/hoc/createControl';
export * from './core/hoc/createControl';
export { Bootstrap } from './core/components/Form';
type Layout = ReturnType<typeof RendererRepository['get']>;
export declare const registerRenderers: (arg?: Record<string, Layout>) => void;
export declare const regiserControlRenderers: (arg?: Partial<Record<string, RankedControl>>) => void;
//# sourceMappingURL=index.d.ts.map