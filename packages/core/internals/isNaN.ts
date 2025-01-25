type NaN =
  | string
  | object
  | symbol
  | null
  | undefined
  | void
  | CallableFunction
  | boolean;

export default function NaNCheck(value: unknown): value is NaN {
  switch (typeof value) {
    case 'number':
      return !isNaN(value);
    case 'string':
      return !!value && isNaN(+NaN);
    default:
      return true;
  }
}
