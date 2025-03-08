import { isArrayRanked, isBooleanRanked, isDateRanked, isNumberRanked, isTextRanked, isTimeRanked, } from '../testers/testers';
export class ControlCreator {
    constructor() { }
    create(Control, getValueFromEvent, deriveRank) {
        return {
            Control,
            deriveRank,
            getValueFromEvent,
        };
    }
    DateControl(Control, getValueFromEvent) {
        return this.create(Control, getValueFromEvent, isDateRanked);
    }
    TimeControl(Control, getValueFromEvent) {
        return this.create(Control, getValueFromEvent, isTimeRanked);
    }
    TextControl(Control, getValueFromEvent) {
        return this.create(Control, getValueFromEvent, isTextRanked);
    }
    NumberControl(Control, getValueFromEvent) {
        return this.create(Control, getValueFromEvent, isNumberRanked);
    }
    ArrayControl(Control, getValueFromEvent) {
        return this.create(Control, getValueFromEvent, isArrayRanked);
    }
    BooleanControl(Control, getValueFromEvent) {
        return this.create(Control, getValueFromEvent, isBooleanRanked);
    }
}
//# sourceMappingURL=createControl.js.map