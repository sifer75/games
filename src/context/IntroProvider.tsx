import { useState, type ReactNode } from "react";
import { introContext } from "./IntroContext";

interface IntroProviderProps {
  children: ReactNode;
}

export const IntroProvider = ({ children }: IntroProviderProps) => {
  const [introDone, setIntroDone] = useState(false);
  return (
    <introContext.Provider value={{ introDone, setIntroDone }}>
      {children}
    </introContext.Provider>
  );
};
