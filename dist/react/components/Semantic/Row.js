import { jsx as _jsx } from "react/jsx-runtime";
import { styles } from './styles';
export const Row = function Row(props) {
    const { reverse = false, ...divProps } = props;
    const style = {
        ...styles.row,
        ...(reverse ? styles.rowReverse : {}),
        ...props.style,
    };
    return _jsx("div", { ...divProps, style: style });
};
