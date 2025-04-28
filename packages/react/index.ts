import {  UiNodeType } from '@binaryoperations/json-forms-core/models';
import './core/components/CustomLayoutRenderer';
import { ControlRepository, LayoutRepository } from './core/context/RendererContext';
import {Form} from "./components/Semantic/Form";
import { CustomLayoutRenderer  } from './core/components/CustomLayoutRenderer';
import { createLayoutRenderer } from './core/hoc/createRenderer';
import { type RankedControl } from './core/hoc/createControl';


export { type RankedControl, createControl } from './core/hoc/createControl';

export * from './core/hoc/createControl';
export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';


/** This serves as the root of the component tree */
LayoutRepository.register('form', createLayoutRenderer(Form));
LayoutRepository.register(UiNodeType.CUSTOM, CustomLayoutRenderer);


type CustomLayouts = Record<string, Layout>;
type UiNodeLayouts = Record<UiNodeType, Layout>;

type Layout = ReturnType<typeof LayoutRepository['get']>;
type Layouts = UiNodeLayouts | CustomLayouts;

type PromiseKeys<T extends object> = {
  [K in keyof T]: () => Promise<T[K]>;
};


export const registerLayoutsRenderers = (arg: Partial<Layouts> = {}) => {
  const defaultLayoutGetters: Partial<PromiseKeys<UiNodeLayouts>> = {
    [UiNodeType.ROWS]: () => import('./components/Semantic/Row').then((module) => module.Row),
    [UiNodeType.COLUMNS]: () => import('./components/Semantic/Column').then((module) => module.Column),
  };

  const defaultLayouts = Object.fromEntries(Object.entries(defaultLayoutGetters).map(([key]) => [key, undefined]))


  async function registerLayout(name: string, layout: Layout |  undefined, loadRenderer?: () => Promise<Layout> ) {
    layout = layout ?? LayoutRepository.get(name) ?? await loadRenderer?.();
    if (!layout) return;

    const renderer = createLayoutRenderer(layout as Layouts[UiNodeType.COLUMNS]);
    LayoutRepository.register(name, renderer)
  }


  Object.entries({ ...defaultLayouts, ...arg }).forEach(([name, layout]) => {
    registerLayout(name, layout, defaultLayoutGetters[name as UiNodeType]);
  });
}




export const regiserControlRenderers = (arg: Partial<Record<string, RankedControl>> = {}) => {
  const defaultControlGetters: Partial<Record<string, () => Promise<RankedControl>>> = {
    'number': () => {
      return import('./components/Controls/Number').then((module) => module.NumberControl as RankedControl);
    },
   'string': () => {
      return import('./components/Controls/TextInput').then((module) => module.TextInputControl as RankedControl);
    },
  };

  const defaultControls = Object.fromEntries(Object.entries(defaultControlGetters).map(([key]) => [key, undefined]))


  async function registerControl(name: string, renderer: RankedControl |  undefined, loadRenderer?: () => Promise<RankedControl> ) {
    renderer = renderer ?? ControlRepository.get(name) ?? await loadRenderer?.();
    if (!renderer) return;

    ControlRepository.register(name, renderer)
  }


  Object.entries({ ...defaultControls, ...arg }).forEach(([name, control]) => {
    registerControl(name, control, defaultControlGetters[name]);
  });
}
