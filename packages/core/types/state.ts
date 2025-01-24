import { Ajv } from 'ajv';

import type { Schema } from '../models';

type State = {
  schema: Schema;
  ajv: Ajv;
};

export default State;
