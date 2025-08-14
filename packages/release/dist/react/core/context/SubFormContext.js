import { createContext, use } from "react";
export const SubFormContext = createContext({});
export const useSubformContext = () => use(SubFormContext);
