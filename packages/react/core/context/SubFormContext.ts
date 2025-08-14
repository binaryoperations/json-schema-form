import { createContext, FormEventHandler, use } from "react";

type SubFormContext = {
  id?: string;
  onSubmit?: FormEventHandler;
};

export const SubFormContext = createContext<SubFormContext | null>({});


export const useSubformContext = () => use(SubFormContext);
