export interface BaseControlProps<Value = unknown>
  extends Record<string, unknown> {
  label?: string;
  value: Value;
  onChange: (nextValue: Value) => void;
}
