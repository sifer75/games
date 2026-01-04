import type { ReactNode, TransitionEvent } from "react";

interface LayeringProps {
  children: ReactNode;
  fadeIn: boolean;
  pageTransitionDone: boolean;
  handlePageTransitionDone: (e: TransitionEvent<HTMLDivElement>) => void;
}

export const Layering = ({
  children,
  fadeIn,
  handlePageTransitionDone,
  pageTransitionDone,
}: LayeringProps) => {
  return (
    <div>
      <div
        className="absolute bg-amber-500 w-full h-full transition-transform duration-2000 ease-out pointer-events-none"
        style={{
          transform: fadeIn ? "translate(0)" : "translate(100vw, 100vh)",
        }}
      />
      <div
        className="absolute bg-blue-500 delay-150 w-full h-full transition-transform duration-2000 ease-out pointer-events-none"
        style={{
          transform: fadeIn ? "translate(0)" : "translate(100vw, 100vh)",
        }}
      />
      <div
        className="absolute bg-purple-500 delay-300 w-full h-full transition-transform duration-2000 ease-out pointer-events-none"
        style={{
          transform: fadeIn ? "translate(0)" : "translate(100vw, 100vh)",
        }}
      />
      <div
        className="absolute bg-orange-500 delay-450 w-full h-full transition-transform duration-2000 ease-out pointer-events-none"
        style={{
          transform: fadeIn ? "translate(0)" : "translate(100vw, 100vh)",
        }}
        onTransitionEnd={handlePageTransitionDone}
      >
        <div
          className={`${
            pageTransitionDone ? "opacity-100" : "opacity-0"
          } transition-opacity duration-400 delay-500 flex flex-col h-full w-full ease-in-out justify-between px-16 py-10 pointer-events-none`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
