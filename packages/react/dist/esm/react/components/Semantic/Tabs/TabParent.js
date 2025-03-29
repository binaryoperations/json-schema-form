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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiUGFyZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9TZW1hbnRpYy9UYWJzL1RhYlBhcmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFFTCxxQkFBcUIsR0FDdEIsTUFBTSw4QkFBOEIsQ0FBQztBQUV0QyxPQUFPLEVBQUUsTUFBTSxFQUFlLE1BQU0sV0FBVyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLFdBQVcsQ0FBQztBQVVsRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBZ0I7SUFDaEQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELE1BQU0sRUFBRSxRQUFRLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDdkQsTUFBTSxPQUFPLEdBQUcsUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssT0FBTyxDQUFDO0lBQzlELE1BQU0sVUFBVSxHQUFHLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQztJQUMvRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzFDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFFM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FDdEMsS0FBQyxPQUFPLE9BQTRCLFFBQVEsSUFBOUIsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQWtCLENBQ2pELENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUNYLE1BQUMsT0FBTyxJQUFDLE9BQU8sRUFBRSxPQUFPLGFBQ3ZCLEtBQUMsUUFBUSxPQUFLLFlBQVksWUFBRyxRQUFRLEdBQVksRUFDakQsS0FBQyxHQUFHLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLFlBQUcsS0FBSyxDQUFDLFFBQVEsR0FBTyxJQUM5QyxDQUNYLENBQUM7QUFDSixDQUFDLENBQUMifQ==