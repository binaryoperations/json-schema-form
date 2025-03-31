import { Ajv } from 'ajv';

import type { ControlSchema } from '../models';

type State = {
  schema: ControlSchema;
  ajv: Ajv;
};

export default State;
