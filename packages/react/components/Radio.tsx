import type { FC, } from "react";
import { Input } from "./Input";

export const Radio: FC<JSX.IntrinsicElements['input'] & { type?: "radio"}> = (props) => {
    return <Input {...props} type="radio" />
}