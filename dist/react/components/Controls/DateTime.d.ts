import { type InputProps } from './Input';
/**
 *
 * Date
 */
export interface DateInputProps extends InputProps {
    type?: 'date';
}
export declare const Date: import("react").ForwardRefExoticComponent<Omit<DateInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const DateControl: import("@binaryoperations/json-forms-core/controls/createControl").RankedControl<import("react").ForwardRefExoticComponent<Omit<DateInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>, unknown, import("@binaryoperations/json-forms-core/controls/createControl").GetValueFromEvent<unknown>>;
/**
 *
 * Date time Input
 */
export interface DateTimeProps extends InputProps {
    type?: 'datetime-local';
}
export declare const DateTime: import("react").ForwardRefExoticComponent<Omit<DateTimeProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const DateTimeControl: import("@binaryoperations/json-forms-core/controls/createControl").RankedControl<import("react").ForwardRefExoticComponent<Omit<DateTimeProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>, unknown, import("@binaryoperations/json-forms-core/controls/createControl").GetValueFromEvent<unknown>>;
/**
 *
 * Time Input
 */
export interface TimeProps extends InputProps {
    type?: 'time';
}
export declare const Time: import("react").ForwardRefExoticComponent<Omit<TimeProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const TimeControl: import("@binaryoperations/json-forms-core/controls/createControl").RankedControl<import("react").ForwardRefExoticComponent<Omit<TimeProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>, unknown, import("@binaryoperations/json-forms-core/controls/createControl").GetValueFromEvent<unknown>>;
//# sourceMappingURL=DateTime.d.ts.map