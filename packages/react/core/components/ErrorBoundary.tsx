import type { ComponentType } from 'react';
import { type PropsWithChildren, type ReactNode, PureComponent } from 'react';

type ErrorBoundaryState = {
  error: Error | null;
};

type ErrorBoundaryProps = PropsWithChildren<{
  renderError?: (onRetry: () => void) => ReactNode;
  Fallback?: ComponentType<{ onRetry: () => void }>;
}>;

export class ErrorBoundary extends PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  retry = () => {
    this.setState({ error: null });
  };

  renderErrored() {
    if (this.props.renderError) return this.props.renderError(this.retry);

    const Fallback = this.props.Fallback;
    if (Fallback) return <Fallback onRetry={this.retry} />;

    return null;
  }

  render() {
    if (this.state.error) return this.renderErrored();
    return <>{this.props.children}</>;
  }
}

export const withErrorBoundary = <Props extends object>(
  Component: ComponentType<Props>,
  Fallback?: ErrorBoundaryProps['Fallback']
) => {
  return function withErrorBoundary(props: Props) {
    const { ...componentProps } = props;
    return (
      <ErrorBoundary Fallback={Fallback}>
        <Component {...(componentProps as Props)} />
      </ErrorBoundary>
    );
  };
};
