import { Keyword } from "json-schema-library";
import { typeKeyword } from "./type";
import { valueRequiredKeyword } from "./value-required";
import { $$getNode } from "@binaryoperations/json-forms-core/schema/logical.schema/nodeStore";

const customKeywords: Keyword[] = []

const keywordOverrides: Keyword[] = [
  typeKeyword,
  valueRequiredKeyword,
];

export const $$validatorGetUiNode = $$getNode;

export const getDefaultKeywords = () => {
  return keywordOverrides.concat(customKeywords)
}

export const addKeyword = (keyword: Keyword) => {
  customKeywords.push(keyword);
}

export const removeKeyword = (keyword: Keyword) => {
  const index = customKeywords.indexOf(keyword);
  if (index < 0) return;

  customKeywords.splice(index, 1);
}
