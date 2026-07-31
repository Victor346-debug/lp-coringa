import {
  Bookmark,
  Download,
  FileText,
  Flame,
  Home,
  Library as LibraryIcon,
  PlayCircle,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const sidebar = [
  { icon: Home, label: "Visão geral", active: true },
  { icon: LibraryIcon, label: "Biblioteca" },
  { icon: Search, label: "Prompt Search" },
  { icon: Bookmark, label: "Favoritos" },
  { icon: Download, label: "Downloads" },
  { icon: Settings, label: "Config" },
];

const stats = [
  { label: "Prompts liberados", value: "1.482", delta: "+34 hoje" },
  { label: "Execuções", value: "27.9k", delta: "+8,2%" },
  { label: "Clientes fechados", value: "R$ 41.300", delta: "últimos 30d" },
];

const files = [
  { icon: FileText, name: "Manual_Prospeccao_Dark.pdf", meta: "PDF · 4.2 MB" },
  { icon: PlayCircle, name: "Aula_01_Arquitetura_de_Prompt.mp4", meta: "Vídeo · 22 min" },
  { icon: FileText, name: "Scripts_Fechamento_V4.pdf", meta: "PDF · 1.8 MB" },
  { icon: PlayCircle, name: "Agentes_Autonomos_Setup.mp4", meta: "Vídeo · 38 min" },
];

export function DashboardDemo() {
  return (
    <section id="covil" className="relative z-10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="04">Dentro do Covil</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
            A área de membros parece um <span className="text-gradient-neon">sistema</span>, não um curso
          </h2>
        </Reveal>

        <Reveal delay={0.2} y={40}>
          <div
            className="glass mt-16 overflow-hidden"
            style={{ boxShadow: "0 60px 160px -80px color-mix(in oklab, var(--neon) 40%, transparent)" }}
          >
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
              <span className="ml-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                covil.coringadosprompts.io
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
              <aside className="border-b border-border p-5 md:border-b-0 md:border-r">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center border border-neon/40 font-display text-xs text-neon">
                    CP
                  </span>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    membro · nível 03
                  </div>
                </div>
                <nav className="mt-8 space-y-1">
                  {sidebar.map((s) => (
                    <div
                      key={s.label}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                        s.active
                          ? "border-l-2 border-neon bg-neon/5 text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <s.icon className="h-4 w-4" strokeWidth={1.5} />
                      {s.label}
                    </div>
                  ))}
                </nav>
              </aside>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 border border-border px-4 py-3">
                  <Search className="h-4 w-4 text-neon" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-muted-foreground">
                    buscar prompt: “fechar cliente de landing page”
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {stats.map((s) => (
                    <div key={s.label} className="border border-border p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="mt-3 font-display text-3xl text-foreground">{s.value}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-neon">
                        <TrendingUp className="h-3 w-3" /> {s.delta}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
                  <div className="border border-border p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Biblioteca recente
                      </p>
                      <Flame className="h-4 w-4 text-neon" strokeWidth={1.5} />
                    </div>
                    <ul className="mt-4 divide-y divide-border">
                      {files.map((f) => (
                        <li key={f.name} className="flex items-center gap-3 py-3">
                          <f.icon className="h-4 w-4 shrink-0 text-neon/80" strokeWidth={1.5} />
                          <span className="truncate text-sm text-foreground/90">{f.name}</span>
                          <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">
                            {f.meta}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-border p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Progresso da operação
                    </p>
                    <div className="mt-6 space-y-5">
                      {[
                        ["Prompt Engineering", 92],
                        ["Prospecção", 68],
                        ["Agentes", 45],
                      ].map(([label, pct]) => (
                        <div key={label as string}>
                          <div className="flex justify-between text-[11px] text-muted-foreground">
                            <span>{label}</span>
                            <span className="text-neon">{pct}%</span>
                          </div>
                          <div className="mt-2 h-1 bg-secondary">
                            <div
                              className="h-full bg-neon"
                              style={{
                                width: `${pct}%`,
                                boxShadow: "var(--glow-neon)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
