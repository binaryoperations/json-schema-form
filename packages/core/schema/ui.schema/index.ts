import { UiSchemaGenerator } from './Generator';
import { UiSchemaParser } from './Parser';

export default {
  parse: UiSchemaParser.parse.bind(UiSchemaParser),
  generate: UiSchemaGenerator.generate.bind(UiSchemaGenerator),
};

export { UiStore } from './UiStore';
