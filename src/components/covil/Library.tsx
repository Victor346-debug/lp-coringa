import { useRef, type MouseEvent } from "react";
import {
  Bot,
  Braces,
  Cloud,
  Instagram,
  LayoutTemplate,
  Layers,
  MessageSquareCode,
  Radar,
  Rocket,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const modules = [
  { icon: Cloud, title: "Cloud Code", code: "MOD_01", desc: "Construção de produtos digitais no terminal, sem depender de time." },
  { icon: Sparkles, title: "Claude", code: "MOD_02", desc: "Raciocínio longo, análise e documentos que vendem sozinhos." },
  { icon: Layers, title: "Lovable", code: "MOD_03", desc: "Sites e apps premium entregues em horas, não em semanas." },
  { icon: MessageSquareCode, title: "ChatGPT", code: "MOD_04", desc: "Prompts de precisão cirúrgica para cada etapa da operação." },
  { icon: Instagram, title: "Instagram", code: "MOD_05", desc: "Páginas dark, retenção e conteúdo que hipnotiza." },
  { icon: LayoutTemplate, title: "Sites", code: "MOD_06", desc: "Arquitetura visual de alto padrão como assinatura." },
  { icon: Target, title: "Landing Pages", code: "MOD_07", desc: "Estrutura de conversão testada, palavra por palavra." },
  { icon: Radar, title: "Prospecção", code: "MOD_08", desc: "Listas, abordagem e follow-up automatizados." },
  { icon: Braces, title: "Vendas", code: "MOD_09", desc: "Scripts de fechamento com gatilhos de autoridade." },
  { icon: Bot, title: "Agentes", code: "MOD_10", desc: "Operadores que trabalham enquanto você dorme." },
  { icon: Workflow, title: "Automação", code: "MOD_11", desc: "Fluxos que eliminam trabalho humano repetido." },
  { icon: Rocket, title: "Prompt Engineering", code: "MOD_12", desc: "O idioma real da máquina — dominado como arma." },
];

function ModuleCard({
  icon: Icon,
  title,
  code,
  desc,
}: {
  icon: typeof Cloud;
  title: string;
  code: string;
  desc: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(14px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className="glass group relative overflow-hidden p-6 transition-[transform,box-shadow,border-color] duration-300 will-change-transform hover:border-neon/35"
      style={{ boxShadow: "0 20px 60px -40px rgba(0,0,0,0.9)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--neon) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <Icon
          className="h-6 w-6 text-neon transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          strokeWidth={1.4}
        />
        <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
          {code}
        </span>
      </div>
      <h3 className="relative mt-8 font-display text-lg uppercase tracking-wide">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px w-0 neon-line transition-all duration-500 group-hover:w-full"
      />
    </div>
  );
}

export function Library() {
  return (
    <section id="biblioteca" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="02">A Biblioteca</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-2xl font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
            Uma parede de <span className="text-gradient-neon">arsenal</span> operacional
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Doze frentes. Cada uma um sistema fechado, pronto para copiar, colar e faturar.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.06} y={26}>
              <ModuleCard {...m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
