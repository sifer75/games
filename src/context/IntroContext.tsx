import { createContext } from "react";

interface IntroContextType {
  introDone: boolean;
  setIntroDone: (done: boolean) => void;
}

export const introContext = createContext<IntroContextType | undefined>(
  undefined,
);
