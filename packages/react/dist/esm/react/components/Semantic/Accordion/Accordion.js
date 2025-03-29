import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { useId } from 'react';
import { useActiveStateContext, } from '../../../context/ActiveStateContext';
import { Row } from '../Row';
import { AccordionItem } from './AccordionItem';
const createUniqueName = (multiple, idBase, index) => {
    return multiple ? idBase + index : idBase;
};
export function Accordion(props) {
    const { render } = useActiveStateContext(props);
    const name = useId();
    const { items, multiple = true } = props;
    const tabNodes = items.map((itemProps, index) => (_createElement(AccordionItem, { ...itemProps, key: itemProps.id + '', name: createUniqueName(multiple, name, index) })));
    return render(_jsx(Row, { children: tabNodes }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9TZW1hbnRpYy9BY2NvcmRpb24vQWNjb3JkaW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBMEIsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXRELE9BQU8sRUFFTCxxQkFBcUIsR0FDdEIsTUFBTSw4QkFBOEIsQ0FBQztBQUV0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxhQUFhLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFRcEUsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQWlCLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxFQUFFO0lBQzVFLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDNUMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFxQjtJQUM3QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFFckIsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRXpDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUMvQyxlQUFDLGFBQWEsT0FDUixTQUFTLEVBQ2IsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUN0QixJQUFJLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsR0FDN0MsQ0FDSCxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQyxLQUFDLEdBQUcsY0FBRSxRQUFRLEdBQU8sQ0FBQyxDQUFDO0FBQ3ZDLENBQUMifQ==