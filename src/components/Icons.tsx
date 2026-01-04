import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logos } from "../lib/icons.utils";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useRef, useState } from "react";

const shuffleArray = (array: IconDefinition[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const Icons = () => {
  const [linesCount, setLinesCount] = useState(35);
  const iconsRef = useRef<HTMLDivElement>(null);
  const iconSize = 64; // 4x en px
  const gap = 28; // gap-7
  const iconWidthGap = iconSize + gap;

  useEffect(() => {
    if (!iconsRef.current) return;

    const observer = new ResizeObserver(() => {
      const heightLines = Math.ceil(iconsRef.current!.clientHeight / iconSize);
      setLinesCount(heightLines);
    });

    observer.observe(iconsRef.current);
    return () => observer.disconnect();
  }, []);

  const renderIcons = () => {
    const shuffleLogos = shuffleArray([...logos]);
    const iconsPerRow = Math.ceil(window.innerWidth / iconWidthGap);

    return Array.from({ length: iconsPerRow }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={shuffleLogos[index % shuffleLogos.length]}
        size="4x"
        className="i text-gray-900 -rotate-45"
      />
    ));
  };

  return (
    <div
      className="w-screen h-screen top-0 left-0 pt-2 inset-0 z-0 pointer-events-auto flex absolute items-center justify-center flex-col gap-7 overflow-hidden"
      ref={iconsRef}
    >
      {Array.from({ length: linesCount }).map((_, index) => (
        <div key={index} className="w-full flex gap-7">
          {renderIcons()}
        </div>
      ))}
    </div>
  );
};

export default Icons;
