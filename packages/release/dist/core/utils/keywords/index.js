import { typeKeyword } from "./type";
import { valueRequiredKeyword } from "./value-required";
const customKeywords = [];
const keywordOverrides = [
    typeKeyword,
    valueRequiredKeyword,
];
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
