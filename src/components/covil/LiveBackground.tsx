import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  hue: "neon" | "violet" | "dust";
};

/**
 * Living background: drifting dust, digital particles, blurred binary code,
 * fog blooms and faint scanlines. Reacts subtly to pointer movement.
 */
export function LiveBackground({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    const particles: Particle[] = [];
    const glyphs: { x: number; y: number; v: number; ch: string; o: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(
        Math.min(150, Math.max(45, (width * height) / 16000)) * intensity,
      );
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -Math.random() * 0.18 - 0.02,
          r: Math.random() * 1.6 + 0.3,
          a: Math.random() * 0.5 + 0.1,
          hue: Math.random() > 0.86 ? "violet" : Math.random() > 0.55 ? "neon" : "dust",
        });
      }

      glyphs.length = 0;
      const gcount = Math.round(Math.min(40, width / 46));
      for (let i = 0; i < gcount; i++) {
        glyphs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          v: Math.random() * 0.35 + 0.08,
          ch: Math.random() > 0.5 ? "1" : "0",
          o: Math.random() * 0.13 + 0.03,
        });
      }
    };

    const onPointer = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = e.clientY / window.innerHeight;
    };

    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      // fog blooms drifting with pointer
      const px = (pointer.current.x - 0.5) * 90;
      const py = (pointer.current.y - 0.5) * 60;
      const blooms = [
        { x: width * 0.2 + px, y: height * 0.75 + py, r: Math.max(width, height) * 0.45, c: "57,255,20", a: 0.06 },
        { x: width * 0.85 - px, y: height * 0.2 - py, r: Math.max(width, height) * 0.4, c: "138,46,255", a: 0.05 },
        { x: width * (0.5 + Math.sin(t) * 0.08), y: height * 0.45, r: width * 0.35, c: "57,255,20", a: 0.03 },
      ];
      for (const b of blooms) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.c},${b.a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // blurred binary rain
      ctx.font = "12px monospace";
      for (const g of glyphs) {
        g.y += g.v;
        if (g.y > height + 12) {
          g.y = -12;
          g.x = Math.random() * width;
          g.ch = Math.random() > 0.5 ? "1" : "0";
        }
        ctx.fillStyle = `rgba(57,255,20,${g.o})`;
        ctx.fillText(g.ch, g.x, g.y);
      }

      // particles
      for (const p of particles) {
        p.x += p.vx + (pointer.current.x - 0.5) * 0.25;
        p.y += p.vy;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        const color =
          p.hue === "neon"
            ? `rgba(57,255,20,${p.a})`
            : p.hue === "violet"
              ? `rgba(138,46,255,${p.a})`
              : `rgba(220,220,220,${p.a * 0.5})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [intensity]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* digital grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 78%)",
        }}
      />
      {/* scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-40 animate-scan neon-line opacity-20" />
      {/* vignette + grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
