import { useContext } from "react";
import { introContext } from "./IntroContext";

export const useIntro = () => {
  const context = useContext(introContext);
  if (!context) {
    throw new Error("useIntro must be used within an Inprovider");
  }
  return context;
};
