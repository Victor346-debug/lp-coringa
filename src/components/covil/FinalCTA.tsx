import { useState, type MouseEvent } from "react";
import { EnterButton } from "./Hero";
import { Reveal } from "./Reveal";

/** Hover zone where digital cards materialize under the pointer. */
export function FinalCTA() {
  const [cards, setCards] = useState<{ id: number; x: number; y: number; r: number }[]>([]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.12) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const card = {
      id,
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      r: (Math.random() - 0.5) * 40,
    };
    setCards((c) => [...c.slice(-8), card]);
    setTimeout(() => setCards((c) => c.filter((x) => x.id !== id)), 1600);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative z-10 overflow-hidden py-32 text-center sm:py-48"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {cards.map((c) => (
          <span
            key={c.id}
            className="absolute h-20 w-14 border border-neon/40 bg-background/60 backdrop-blur-sm"
            style={{
              left: c.x,
              top: c.y,
              transform: `translate(-50%,-50%) rotate(${c.r}deg)`,
              boxShadow: "var(--glow-neon)",
              animation: "floaty 1.6s ease-out forwards",
              opacity: 0.55,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-soft">
            último aviso
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-4xl uppercase leading-[0.92] sm:text-7xl">
            A porta abre por
            <br />
            <span className="text-gradient-neon glow-text">alguns minutos</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Ninguém entra duas vezes pelo mesmo lote. Quem executa hoje já está cobrando
            amanhã.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-14 flex justify-center">
            <EnterButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-neon/40 font-display text-[11px] text-neon">
            CP
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Coringa dos Prompts
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          ↑↑↓↓←→←→ B A
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} — todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
