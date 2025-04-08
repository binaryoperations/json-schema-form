import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { useId } from 'react';
import { useActiveStateContext, } from '@binaryoperations/json-forms-react/context/ActiveStateContext';
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
