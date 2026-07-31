import { Reveal, SectionLabel } from "./Reveal";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative z-10 py-32 sm:py-44">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="01">Manifesto</SectionLabel>
        </Reveal>
        <div className="mt-12 space-y-8 font-display text-2xl leading-[1.25] tracking-tight sm:text-4xl lg:text-[3.1rem]">
          {[
            "O mundo não recompensa quem sabe mais.",
            "Recompensa quem executa mais rápido.",
          ].map((line, i) => (
            <Reveal key={line} delay={i * 0.1}>
              <p>{line}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="text-muted-foreground">
              Enquanto milhares estudam Inteligência Artificial…
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-gradient-neon glow-text">
              Poucos aprenderam a transformá-la em dinheiro.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-neon-soft">
              Bem-vindo ao Covil.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
