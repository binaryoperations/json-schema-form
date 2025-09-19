import { typeKeyword } from "./type";
import { valueRequiredKeyword } from "./value-required";
import { $$getNode } from "../../schema/logical.schema/nodeStore";
const customKeywords = [];
const keywordOverrides = [
    typeKeyword,
    valueRequiredKeyword,
];
export const $$validatorGetUiNode = $$getNode;
export const getDefaultKeywords = () => {
    return keywordOverrides.concat(customKeywords);
};
export const addKeyword = (keyword) => {
    customKeywords.push(keyword);
};
export const removeKeyword = (keyword) => {
    const index = customKeywords.indexOf(keyword);
    if (index < 0)
        return;
    customKeywords.splice(index, 1);
};
