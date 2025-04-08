import { UiNodeType } from '../core/models';
import './core/components/CustomLayoutRenderer';
import { LayoutRepository } from './core/context/RendererContext';
import { type RankedControl } from './core/hoc/createControl';
export { type RankedControl, createControl } from './core/hoc/createControl';
export * from './core/hoc/createControl';
export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';
type CustomLayouts = Record<string, Layout>;
type UiNodeLayouts = Record<UiNodeType, Layout>;
type Layout = ReturnType<typeof LayoutRepository['get']>;
type Layouts = UiNodeLayouts | CustomLayouts;
export declare const registerLayoutsRenderers: (arg?: Partial<Layouts>) => void;
export declare const regiserControlRenderers: (arg?: Partial<Record<string, RankedControl>>) => void;
//# sourceMappingURL=index.d.ts.map