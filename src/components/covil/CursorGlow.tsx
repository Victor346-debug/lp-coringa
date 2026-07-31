import { useEffect, useRef, useState } from "react";

/** Custom neon cursor with trailing particles; morphs over interactive targets. */
export function CursorGlow() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const canvas = trailRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    const parts: { x: number; y: number; life: number; r: number }[] = [];
    let raf = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a,button,[data-cursor='hover']"));
      if (Math.random() > 0.35) {
        parts.push({ x: e.clientX, y: e.clientY, life: 1, r: Math.random() * 2.2 + 0.6 });
        if (parts.length > 90) parts.shift();
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of parts) {
          p.life -= 0.022;
          p.y -= 0.35;
          if (p.life <= 0) continue;
          ctx.fillStyle = `rgba(57,255,20,${p.life * 0.55})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <canvas ref={trailRef} className="absolute inset-0" />
      <div
        ref={ring}
        className="absolute left-0 top-0 rounded-full border transition-all duration-200"
        style={{
          width: active ? 58 : 30,
          height: active ? 58 : 30,
          borderColor: "color-mix(in oklab, var(--neon) 70%, transparent)",
          boxShadow: active ? "var(--glow-neon-lg)" : "var(--glow-neon)",
          background: active
            ? "color-mix(in oklab, var(--neon) 12%, transparent)"
            : "transparent",
        }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: active ? 4 : 6,
          height: active ? 4 : 6,
          background: "var(--neon)",
          boxShadow: "var(--glow-neon)",
        }}
      />
    </div>
  );
}
