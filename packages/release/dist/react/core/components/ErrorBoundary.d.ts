import type { ComponentType } from 'react';
import { type PropsWithChildren, PureComponent, type ReactNode } from 'react';
type ErrorBoundaryState = {
    error: Error | null;
};
type ErrorBoundaryProps = PropsWithChildren<{
    renderError?: (onRetry: () => void) => ReactNode;
    Fallback?: ComponentType<{
        onRetry: () => void;
        error: null | Error;
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
    renderErrored(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
    render(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export declare const WithErrorBoundary: <Props extends object>(Component: ComponentType<Props>, Fallback?: ErrorBoundaryProps["Fallback"]) => (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map