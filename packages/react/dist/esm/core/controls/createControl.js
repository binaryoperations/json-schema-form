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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUvY29udHJvbHMvY3JlYXRlQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixZQUFZLEVBQ1osY0FBYyxFQUNkLFlBQVksRUFDWixZQUFZLEdBRWIsTUFBTSxvQkFBb0IsQ0FBQztBQVU1QixNQUFNLE9BQU8sY0FBYztJQUN6QixnQkFBZSxDQUFDO0lBRWhCLE1BQU0sQ0FDSixPQUFVLEVBQ1YsaUJBQThCLEVBQzlCLFVBQWtCO1FBRWxCLE9BQU87WUFDTCxPQUFPO1lBQ1AsVUFBVTtZQUNWLGlCQUFpQjtTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FDVCxPQUFVLEVBQ1YsaUJBQTREO1FBRTVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFdBQVcsQ0FDVCxPQUFVLEVBQ1YsaUJBQTRDO1FBRTVDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFdBQVcsQ0FDVCxPQUFVLEVBQ1YsaUJBQTRDO1FBRTVDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGFBQWEsQ0FDWCxPQUFVLEVBQ1YsaUJBQXFEO1FBRXJELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFlBQVksQ0FDVixPQUFVLEVBQ1YsaUJBQStDO1FBRS9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGNBQWMsQ0FDWixPQUFVLEVBQ1YsaUJBQTZDO1FBRTdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGIn0=