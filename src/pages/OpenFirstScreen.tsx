import { useEffect, useState, type TransitionEvent } from "react";
import { useIntro } from "../context/useIntro";

export const OpenFirstScreen = () => {
  const [scale, setScale] = useState<boolean>(false);
  const { introDone, setIntroDone } = useIntro();
  useEffect(() => {
    requestAnimationFrame(() => {
      setScale(true);
    });
  }, []);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") {
      setIntroDone(true);
    }
  };
  return (
    <div
      className={`bg-blue-500 fixed inset-0
 transition-transform duration-2500 ease-in-out ${
   scale ? "scale-100" : "scale-0"
 }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={`transition-opacity duration-300 ease-in-out opacity-0 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white text-4xl ">Welcome to the App!</span>
        fdslkjfdsfldsjk
      </div>
    </div>
  );
};
