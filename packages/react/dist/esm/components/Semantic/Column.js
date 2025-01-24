import { jsx as _jsx } from "react/jsx-runtime";
import { styles } from './styles';
export const Column = function Column(props) {
    const { reverse = false, ...divProps } = props;
    const style = {
        ...styles.column,
        ...(reverse ? styles.columnReverse : {}),
        ...props.style,
    };
    return _jsx("div", { ...divProps, style: style });
};
//# sourceMappingURL=Column.js.map