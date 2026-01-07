import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logos } from "../lib/icons.utils";
import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useMemo, useRef, useState } from "react";

export const Icons = () => {
  const iconsRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<{ rows: number; cols: number }>({
    rows: 0,
    cols: 0,
  });

  const iconSize = 64; // 4x en px
  const gap = 28; // gap-7
  const iconWidthGap = iconSize + gap;

  const [shuffledIcons] = useState<IconDefinition[]>(() =>
    [...logos].sort(() => Math.random() - 0.5),
  );

  useEffect(() => {
    const calculateGrid = () => {
      if (!iconsRef.current) return;
      const { width, height } = iconsRef.current!.getBoundingClientRect();
      const cols = Math.floor((width + gap) / iconWidthGap);
      const rows = Math.floor((height + gap) / iconWidthGap);
      setGrid({ rows, cols });
    };
    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = useMemo(() => {
    return Array.from({ length: grid.rows }).map(() =>
      Array.from({ length: grid.cols }).map(() => {
        const randomIndex = Math.floor(Math.random() * shuffledIcons.length);
        return shuffledIcons[randomIndex];
      }),
    );
  }, [grid, shuffledIcons]);

  return (
    <div
      ref={iconsRef}
      className="w-screen h-screen absolute inset-0 flex flex-col gap-7 overflow-hidden p-4"
    >
      {lines.map((line, i) => (
        <div key={i} className="w-full flex gap-7">
          {line.map((icon, j) => (
            <FontAwesomeIcon
              key={j}
              icon={icon}
              size="4x"
              className="text-gray-900 -rotate-45 pointer-events-auto i"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Icons;
