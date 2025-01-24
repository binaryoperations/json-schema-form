import type { ComponentType } from 'react';
import { type PropsWithChildren, PureComponent, type ReactNode } from 'react';
type ErrorBoundaryState = {
    error: Error | null;
};
type ErrorBoundaryProps = PropsWithChildren<{
    renderError?: (onRetry: () => void) => ReactNode;
    Fallback?: ComponentType<{
        onRetry: () => void;
    }>;
}>;
export declare class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    state: {
        error: null;
    };
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    retry: () => void;
    renderErrored(): string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
    render(): string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export declare const withErrorBoundary: <Props extends object>(Component: ComponentType<Props>, Fallback?: ErrorBoundaryProps['Fallback']) => (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map