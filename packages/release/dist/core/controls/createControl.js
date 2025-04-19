import { and, isArrayRanked, isBooleanRanked, isDateRanked, isDateTimeRanked, isNumberRanked, isTextRanked, isTimeRanked, } from '../testers/testers';
export class ControlCreator {
    constructor() { }
    create(Control, getValueFromEvent, deriveRank) {
        return {
            Control,
            deriveRank,
            getValueFromEvent,
        };
    }
    DateControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isDateRanked, customRanker].filter((x) => x !== undefined)));
    }
    DateTimeControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isDateTimeRanked, customRanker].filter((x) => x !== undefined)));
    }
    TimeControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isTimeRanked, customRanker].filter((x) => x !== undefined)));
    }
    TextControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isTextRanked, customRanker].filter((x) => x !== undefined)));
    }
    NumberControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isNumberRanked, customRanker].filter((x) => x !== undefined)));
    }
    ArrayControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isArrayRanked, customRanker].filter((x) => x !== undefined)));
    }
    BooleanControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isBooleanRanked, customRanker].filter((x) => x !== undefined)));
    }
}
