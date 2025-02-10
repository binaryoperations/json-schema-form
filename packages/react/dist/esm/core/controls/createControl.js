import { isArrayRanked, isDateRanked, isNumberRanked, isTextRanked, isTimeRanked, } from '../testers/testers';
import { cast } from '../internals/cast';
export default function createControl(Control, getValueFromEvent, deriveRank) {
    if (!('createControl' in globalThis))
        throw Error(`Attempted to "createControl" before registration`);
    return cast(globalThis).createControl(Control, getValueFromEvent, deriveRank);
}
export const createDateControl = (Control, getValueFromEvent) => createControl(Control, getValueFromEvent, isDateRanked);
export const createTimeControl = (Control, getValueFromEvent) => createControl(Control, getValueFromEvent, isTimeRanked);
export const createTextControl = (Control, getValueFromEvent) => createControl(Control, getValueFromEvent, isTextRanked);
export const createNumberControl = (Control, getValueFromEvent) => createControl(Control, getValueFromEvent, isNumberRanked);
export const createArrayControl = (Control, getValueFromEvent) => createControl(Control, getValueFromEvent, isArrayRanked);
export const createBooleanControl = (Control, getValueFromEvent) => createControl(Control, getValueFromEvent, isArrayRanked);
//# sourceMappingURL=createControl.js.map