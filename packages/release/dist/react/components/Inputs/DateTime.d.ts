import { type InputProps } from './Input';
/**
 *
 * Date
 */
export interface DateInputProps extends InputProps {
    type?: 'date';
}
export declare const Date: import("react").ForwardRefExoticComponent<Omit<DateInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
/**
 *
 * Date time Input
 */
export interface DateTimeProps extends InputProps {
    type?: 'datetime-local';
}
export declare const DateTime: import("react").ForwardRefExoticComponent<Omit<DateTimeProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
/**
 *
 * Time Input
 */
export interface TimeProps extends InputProps {
    type?: 'time';
}
export declare const Time: import("react").ForwardRefExoticComponent<Omit<TimeProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=DateTime.d.ts.map