import {
  type ComponentType,
  forwardRef,
  memo,
  type ReactNode,
  useId,
} from 'react';

export function withLabel<P extends { id?: string }>(
  Component: ComponentType<P>
) {
  return memo(
    forwardRef((props: P & { label?: ReactNode }, ref) => {
      const inputId = useId();
      const id = props.id ?? inputId;

      const { label, ...inputProps } = props;
      return (
        <>
          {!label ? null : <label htmlFor={id}>{label}</label>}
          <Component {...(inputProps as P)} ref={ref} id={id} />
        </>
      );
    })
  );
}
