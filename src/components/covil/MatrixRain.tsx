import { useEffect, useRef } from "react";

/** Full-screen matrix glyph rain, only mounted when Matrix Mode is unlocked. */
export function MatrixRain() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    let cols = 0;
    let drops: number[] = [];
    const size = 16;
    const chars = "01アイウエオカキクケコサシスセソ$#%&";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();

    const draw = () => {
      ctx.fillStyle = "rgba(3,3,3,0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${size}px monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.97 ? "#eaffea" : "rgba(57,255,20,0.55)";
        ctx.fillText(ch, i * size, drops[i] * size);
        drops[i] += 0.6;
        if (drops[i] * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-40 mix-blend-screen"
    />
  );
}
