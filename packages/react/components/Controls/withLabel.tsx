import { ComponentType, forwardRef, memo, type ReactNode, useId } from 'react';

export function withLabel<
  P extends { id?: string; label?: ReactNode; error?: string },
  R = HTMLElement,
>(Component: ComponentType<Omit<P, 'label'>>) {
  return memo(
    forwardRef<R, P>((props, ref) => {
      const inputId = useId();
      const id = props.id ?? inputId;

      const { label, error, ...inputProps } = props;
      return (
        <>
          {!error && !label ? null : (
            <label htmlFor={id}>{error || label}</label>
          )}
          <Component {...(inputProps as Omit<P, 'label'>)} ref={ref} id={id} />
        </>
      );
    })
  );
}
