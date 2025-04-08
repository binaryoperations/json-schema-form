import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { PureComponent } from 'react';
export class ErrorBoundary extends PureComponent {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return {
            error,
        };
    }
    retry = () => {
        this.setState({ error: null });
    };
    renderErrored() {
        if (this.props.renderError)
            return this.props.renderError(this.retry);
        const Fallback = this.props.Fallback;
        if (Fallback)
            return _jsx(Fallback, { onRetry: this.retry });
        return null;
    }
    render() {
        if (this.state.error)
            return this.renderErrored();
        return _jsx(_Fragment, { children: this.props.children });
    }
}
export const withErrorBoundary = (Component, Fallback) => {
    return function withErrorBoundary(props) {
        const { ...componentProps } = props;
        return (_jsx(ErrorBoundary, { Fallback: Fallback, children: _jsx(Component, { ...componentProps }) }));
    };
};
