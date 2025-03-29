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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JCb3VuZGFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUEwQixhQUFhLEVBQWtCLE1BQU0sT0FBTyxDQUFDO0FBVzlFLE1BQU0sT0FBTyxhQUFjLFNBQVEsYUFHbEM7SUFDQyxLQUFLLEdBQUc7UUFDTixLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7SUFFRixNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBWTtRQUMxQyxPQUFPO1lBQ0wsS0FBSztTQUNOLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxHQUFHLEdBQUcsRUFBRTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLFFBQVE7WUFBRSxPQUFPLEtBQUMsUUFBUSxJQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFJLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbEQsT0FBTyw0QkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQy9CLFNBQStCLEVBQy9CLFFBQXlDLEVBQ3pDLEVBQUU7SUFDRixPQUFPLFNBQVMsaUJBQWlCLENBQUMsS0FBWTtRQUM1QyxNQUFNLEVBQUUsR0FBRyxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDcEMsT0FBTyxDQUNMLEtBQUMsYUFBYSxJQUFDLFFBQVEsRUFBRSxRQUFRLFlBQy9CLEtBQUMsU0FBUyxPQUFNLGNBQXdCLEdBQUksR0FDOUIsQ0FDakIsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9