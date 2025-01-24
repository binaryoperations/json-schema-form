import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useActiveStateContext, } from '../../../context/ActiveStateContext';
import { Column } from '../Column';
import { Row } from '../Row';
import { styles } from '../styles';
import { TabItem } from './TabItem';
export const Tabs = function Tabs(props) {
    const { render } = useActiveStateContext(props);
    const { position = 'top', tabs, tabListProps } = props;
    const reverse = position === 'bottom' || position === 'right';
    const isVertical = position === 'top' || position === 'bottom';
    const Wrapper = isVertical ? Row : Column;
    const NodeList = isVertical ? Column : Row;
    const tabNodes = tabs.map((tabProps) => (_jsx(TabItem, { ...tabProps }, tabProps.id + '')));
    return render(_jsxs(Wrapper, { reverse: reverse, children: [_jsx(NodeList, { ...tabListProps, children: tabNodes }), _jsx(Row, { style: styles.tabChildren, children: props.children })] }));
};
//# sourceMappingURL=TabParent.js.map