export default function invariant<T = any>(
  value: T | undefined | null,
  message: string,
  allowNull = false
) {
  if (allowNull && value === null) return value;
  if (value === null || value === undefined) throw new Error(message);

  return value;
}
