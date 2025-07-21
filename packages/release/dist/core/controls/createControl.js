import { and, isArrayRanked, isBooleanRanked, isDateRanked, isDateTimeRanked, isNumberRanked, isTextRanked, isTimeRanked, } from '../testers/testers';
export class ControlCreator {
    Control;
    getValueFromEvent;
    deriveRank;
    constructor(Control, getValueFromEvent, deriveRank) {
        this.Control = Control;
        this.getValueFromEvent = getValueFromEvent;
        this.deriveRank = deriveRank;
    }
    static withType() {
        return ControlCreator;
    }
    static create(Control, getValueFromEvent, deriveRank) {
        return new this(Control, getValueFromEvent, deriveRank);
    }
    static DateControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isDateRanked, customRanker].filter((x) => x !== undefined)));
    }
    static DateTimeControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isDateTimeRanked, customRanker].filter((x) => x !== undefined)));
    }
    static TimeControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isTimeRanked, customRanker].filter((x) => x !== undefined)));
    }
    static TextControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isTextRanked, customRanker].filter((x) => x !== undefined)));
    }
    static NumberControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isNumberRanked, customRanker].filter((x) => x !== undefined)));
    }
    static ArrayControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isArrayRanked, customRanker].filter((x) => x !== undefined)));
    }
    static BooleanControl(Control, getValueFromEvent, customRanker) {
        return this.create(Control, getValueFromEvent, and.apply(null, [isBooleanRanked, customRanker].filter((x) => x !== undefined)));
    }
    up() {
        this.deriveRank = and(this.deriveRank, () => 1);
        return this;
    }
}
