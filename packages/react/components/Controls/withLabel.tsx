import { ComponentType, forwardRef, memo, type ReactNode, useId } from 'react';

export function withLabel<
  P extends { id?: string; label?: ReactNode },
  R = HTMLElement,
>(Component: ComponentType<Omit<P, 'label'>>) {
  return memo(
    forwardRef<R, P>((props, ref) => {
      const inputId = useId();
      const id = props.id ?? inputId;

      const { label, ...inputProps } = props;
      return (
        <>
          {!label ? null : <label htmlFor={id}>{label}</label>}
          <Component {...(inputProps as Omit<P, 'label'>)} ref={ref} id={id} />
        </>
      );
    })
  );
}
