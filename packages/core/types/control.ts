export interface BaseControlProps<
  Value = unknown,
  ChangesMeta = unknown,
  EventType = Event,
> extends Record<string, unknown> {
  label?: string;
  value?: Value;

  /**
   *
   * @param Value value of the control
   * @param Changes onUpdate, the control will emit the changes.
   * A control has the ability to send
   *
   */
  onChange?: (
    originalEvent: EventType,
    nextValue?: Value,
    changes?: ChangesMeta
  ) => void;
}
