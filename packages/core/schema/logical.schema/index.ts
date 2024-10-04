import { JsonSchemaGenerator } from './Generator';
import { JsonSchemaParser } from './Parser';

export default {
  parse: JsonSchemaParser.parse.bind(JsonSchemaParser),
  generate: JsonSchemaGenerator.generate.bind(JsonSchemaGenerator),
};
