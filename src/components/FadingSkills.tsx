import { useEffect, useRef } from "react";

const stack = ["WEB", "DEVELOPER", "FULL STACK"] as const;

export const FadingSkills = () => {
  const stackRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    function handleScroll() {
      const { scrollY: currentScrollY } = window;
      const { current: stackNode } = stackRef;
      if (stackNode === null) return null;
      const texts = stackNode.children as HTMLCollectionOf<HTMLElement>;
      if (currentScrollY <= 0) {
        for (const element of texts) element.style.opacity = "";
        return;
      }

      const fadeDelta = 150;
      const startOffset = 10;

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const startFade = fadeDelta * i - startOffset;

        const distance = currentScrollY - startFade;
        const opacity = Math.max(0, 1 - distance / fadeDelta);

        text.style.opacity = String(opacity);
      }
    }

    document.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <h2
      className="transition-opacity z-10 duration-500 font-Merich text-yellow-100"
      ref={stackRef}
    >
      {stack.map((value, k) => (
        <span
          className="block text-4xl xs:text-5xl sm:text-6xl lg:text-7xl"
          key={k}
        >
          {value}
        </span>
      ))}
    </h2>
  );
}