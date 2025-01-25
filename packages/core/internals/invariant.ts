export default function invariant<T = any>(
  value: T | undefined | null,
  message: string
) {
  if (value === null || value === undefined) throw new Error(message);

  return value;
}
