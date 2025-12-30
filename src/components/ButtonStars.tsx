import { useLayoutEffect, useRef, useState } from "react";

type sizeType = { width: number; height: number };

type Star = {
  id: number;
  x: number;
  y: number;
  orbit: number;
  explodeOrbit: number;
  speed: number;
  rotation: number;
  color: string;
};

export const ButtonStars = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<Star[]>([]);
  const explosionProgress = useRef(0);
  const hoverProgress = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState<sizeType>({ width: 0, height: 0 });

  const maxOrbit = 255;

  /* =======================
     ResizeObserver bouton
  ======================= */
  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  /* =======================
     Canvas + Retina
  ======================= */
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const scale = window.devicePixelRatio || 1;

    canvasRef.current.width = size.width * scale;
    canvasRef.current.height = size.height * scale;

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    ctxRef.current = ctx;
  }, [size.width, size.height]);

  /* =======================
     Création des étoiles
  ======================= */
  useLayoutEffect(() => {
    if (!size.width || !size.height) return;

    const centerX = size.width / 2;
    const centerY = size.height / 2;

    const MIN_ORBIT = maxOrbit * 0.6;
    const MAX_ORBIT = maxOrbit * 1.2;

    starsRef.current = Array.from({ length: 400 }, (_, id) => {
      const t = Math.random();
      const orbit = MIN_ORBIT + Math.pow(t, 0.35) * (MAX_ORBIT - MIN_ORBIT);

      const explodeOrbit = orbit + Math.random() * maxOrbit * 3.5;
      const rotation = Math.random() * Math.PI * 2;

      return {
        id,
        x: centerX,
        y: centerY,
        orbit,
        explodeOrbit,
        speed: ((Math.random() * 1.5 + 0.3) * Math.PI) / 180,
        rotation,
        color: `rgba(255,255,255,${0.3 + 0.7 * (orbit / MAX_ORBIT)})`,
      };
    });
  }, [size.width, size.height]);

  /* =======================
     Animation
  ======================= */
  useLayoutEffect(() => {
    if (!ctxRef.current) return;

    const ctx = ctxRef.current;
    let frameId: number;

    const centerX = size.width / 2;
    const centerY = size.height / 2;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      ctx.fillStyle = "rgba(25,25,25,0.25)";
      ctx.fillRect(0, 0, size.width, size.height);

      // Explosion progress
      if (expanded) {
        explosionProgress.current = Math.min(
          explosionProgress.current + 0.025,
          1
        );
      } else {
        explosionProgress.current = Math.max(
          explosionProgress.current - 0.02,
          0
        );
      }
      const eased = easeInOutCubic(explosionProgress.current);

      // Hover progress
      if (hovered && explosionProgress.current === 0) {
        hoverProgress.current = Math.min(hoverProgress.current + 0.04, 1);
      } else {
        hoverProgress.current = Math.max(hoverProgress.current - 0.04, 0);
      }
      const hoverEased = easeOut(hoverProgress.current);

      starsRef.current.forEach((star) => {
        star.rotation += star.speed;

        let baseOrbit = star.orbit;

        // Smooth hover applied
        baseOrbit *= 1 + 0.2 * hoverEased;

        const orbit = baseOrbit + (star.explodeOrbit - baseOrbit) * eased;

        const x = centerX + Math.cos(star.rotation) * orbit;
        const y = centerY + Math.sin(star.rotation) * orbit;

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.arc(x, y, 0.9, 0, Math.PI * 2);
        ctx.fill();

        star.x = x;
        star.y = y;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hovered, expanded, size.width, size.height]);

  /* =======================
     Click explosion
  ======================= */
  const handleClick = () => {
    if (expanded) return;
    setExpanded(true);
    setTimeout(() => setExpanded(false), 1200);
  };

  return (
    <div className="relative w-screen h-screen bg-zinc-900 overflow-hidden flex items-center justify-center group">
      <canvas
        ref={canvasRef}
        className="absolute"
        width={size.width}
        height={size.height}
      />
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative z-10 w-full h-full rounded-full text-white tracking-widest transition-all duration-700 hover:scale-105 hover:border-white"
      >
        <span className="opacity-70 hover:opacity-100 transition">
          SEE STARS
        </span>
      </button>
    </div>
  );
};
