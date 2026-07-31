import { Reveal, SectionLabel } from "./Reveal";

const steps = [
  { n: "I", title: "Entrar", desc: "Acesso ao Covil. O silêncio vale mais que o alarde." },
  { n: "II", title: "Aprender", desc: "Prompts prontos, sem teoria inútil. Direto ao mecanismo." },
  { n: "III", title: "Executar", desc: "Primeiro entregável no mesmo dia. Velocidade é vantagem." },
  { n: "IV", title: "Fechar Clientes", desc: "Prospecção, proposta e fechamento com autoridade." },
  { n: "V", title: "Escalar", desc: "Agentes e automações assumem a operação por você." },
];

export function HowItWorks() {
  return (
    <section id="metodo" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="03">Como funciona</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
            Do escuro ao <span className="text-gradient-neon">escalável</span>
          </h2>
        </Reveal>

        <ol className="relative mt-20">
          <span
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px sm:left-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--neon) 60%, transparent), color-mix(in oklab, var(--violet) 50%, transparent), transparent)",
            }}
          />
          {steps.map((s, i) => (
            <li key={s.n} className="relative pb-16 last:pb-0">
              <Reveal delay={0.05 * i}>
                <div
                  className={`flex items-start gap-6 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:pr-14" : "sm:ml-auto sm:flex-row-reverse sm:pl-14 sm:text-right"
                  }`}
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center border border-neon/40 bg-background font-display text-lg text-neon"
                    style={{ boxShadow: "var(--glow-neon)" }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
