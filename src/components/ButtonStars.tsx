import { useLayoutEffect, useRef, useState } from "react";

type sizeType = { width: number; height: number };

type Star = {
  id: number;
  x: number;
  y: number;
  orbit: number;
  hoverOrbit: number;
  explodeOrbit: number;
  currentOrbit: number;
  speed: number;
  rotation: number;
  color: string;
};

export const ButtonStars = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<Star[]>([]);

  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState<sizeType>({ width: 0, height: 0 });

  // Resize du boutton

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  // Canvas + Retina

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // calcul du ratio pour les écrans retina

    const scale = window.devicePixelRatio || 1;

    canvasRef.current.width = size.width * scale;
    canvasRef.current.height = size.height * scale;

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    ctxRef.current = ctx;
  }, [size.width, size.height]);

  // Création des étoiles

  useLayoutEffect(() => {
    if (!size.width || !size.height) return;

    const maxOrbit = 200;
    const MIN_ORBIT = maxOrbit * 1.2;
    const MAX_ORBIT = maxOrbit * 0.6;

    starsRef.current = Array.from({ length: 3000 }, (_, id) => {
      const orbit =
        MIN_ORBIT + Math.pow(Math.random(), 0.35) * (MAX_ORBIT - MIN_ORBIT);

      return {
        id,
        x: size.width / 2,
        y: size.height / 2,
        orbit: orbit,
        hoverOrbit: orbit + (MAX_ORBIT - orbit) * (0.5 + 0.4 * Math.random()),
        explodeOrbit: orbit + Math.random() * maxOrbit * 2,
        currentOrbit: orbit,
        speed: ((Math.random() * 1.5 + 0.3) * Math.PI) / 90,
        rotation: Math.random() * Math.PI * 3,
        color: `rgba(255,255,255,${0.2 + 0.6 * (orbit / MAX_ORBIT)})`,
      };
    });
  }, [size.width, size.height]);

  // position des 3 états : normal, hover, click

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    let frameId: number;

    const animate = () => {
      let targetOrbit: number;

      ctx.clearRect(0, 0, size.width, size.height);

      starsRef.current.forEach((star) => {
        if (expanded) {
          targetOrbit = star.explodeOrbit;
        } else if (hovered) {
          targetOrbit = star.hoverOrbit;
        } else {
          targetOrbit = star.orbit;
        }

        // animation des transitions entre les états

        star.currentOrbit += (targetOrbit - star.currentOrbit) * 0.08;
        star.rotation += star.speed;

        // dessin de l'étoile

        const x = size.width / 2 + Math.cos(star.rotation) * star.currentOrbit;
        const y = size.height / 2 + Math.sin(star.rotation) * star.currentOrbit;

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.arc(x, y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [expanded, hovered, size]);

  // Click explosion

  const handleClick = () => {
    if (expanded) return;
    setExpanded(true);
    setTimeout(() => setExpanded(false), 3000);
  };

  return (
    <div className="relative w-screen h-screen bg-zinc-900 overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full"
        width={size.width}
        height={size.height}
      />
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative z-10 w-1/2 h-1/2 overflow-hidden group rounded-full text-white tracking-widest transition-all duration-700 hover:border-white"
      >
        <div className="opacity-70 group-hover:opacity-100 transition group-hover:scale-120">
          SEE STARS
        </div>
      </button>
    </div>
  );
};
