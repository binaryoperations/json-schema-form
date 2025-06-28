import {  EnumUiNode } from '@binaryoperations/json-forms-core/models';
import { RendererRepository, ControlRepository } from './core/context/RendererContext';
import {Form} from "./components/Semantic/Form";

import { createLayoutRenderer } from './core/hoc/createRenderer';
import { type RankedControl } from './core/hoc/createControl';


export { type RankedControl, createControl } from './core/hoc/createControl';

export * from './core/hoc/createControl';
export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';


/** This serves as the root of the component tree */
RendererRepository.register('form', createLayoutRenderer(Form));

type Layout = ReturnType<typeof RendererRepository['get']>;


const defaultLayoutGetters = {
  "rows": () => import('./components/Semantic/Row').then((module) => module.Row),
  "columns": () => import('./components/Semantic/Column').then((module) => module.Column),
};

export const registerRenderers = (arg: Record<string, Layout> = {}) => {
  const defaultLayouts = Object.fromEntries(Object.entries(defaultLayoutGetters).map(([key]) => [key, undefined]))

  async function registerLayout(name: string, layout: Layout |  undefined, loadRenderer?: () => Promise<Layout> ) {
    layout = layout ??  await loadRenderer?.();
    if (!layout) return;

    if ("Control" in layout) {
      registerControl(name, layout);
      return;
    }

    if (RendererRepository.get(name) === layout) return;


    const renderer = createLayoutRenderer(layout);
    RendererRepository.register(name, renderer)
  }


  Object.entries({ ...defaultLayouts, ...RendererRepository.getAll(), ...arg }).forEach(([name, layout]) => {
    registerLayout(name, layout, defaultLayoutGetters[name as keyof typeof defaultLayoutGetters]);
  });
}


  async function registerControl(name: string, renderer: RankedControl |  undefined, loadRenderer?: () => Promise<RankedControl> ) {
    renderer = renderer ?? await loadRenderer?.();
    if (!renderer) return;
    if (ControlRepository.get(name) === renderer) return;

    ControlRepository.register(name, renderer)
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

  Object.entries({ ...defaultControls, ...ControlRepository.getAll(), ...arg }).forEach(([name, control]) => {
    registerControl(name, control, defaultControlGetters[name]);
  });
}
