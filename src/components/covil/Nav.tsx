import { useEffect, useState } from "react";

const links = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Biblioteca", href: "#biblioteca" },
  { label: "Método", href: "#metodo" },
  { label: "O Covil", href: "#covil" },
];

export function Nav({
  onSigilClick,
  hacker,
}: {
  onSigilClick: () => void;
  hacker: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={onSigilClick}
          aria-label="Sigilo Coringa dos Prompts"
          data-cursor="hover"
          className="group flex items-center gap-3"
        >
          <span
            className="relative grid h-9 w-9 place-items-center border border-border font-display text-sm font-bold text-neon transition-all duration-300 group-hover:scale-110"
            style={{ boxShadow: "var(--glow-neon)" }}
          >
            CP
            <span className="absolute -inset-1 animate-pulse-glow border border-neon/20" />
          </span>
          <span className="hidden font-display text-xs uppercase tracking-[0.35em] text-foreground/80 sm:block">
            Coringa dos Prompts
          </span>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-neon"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {hacker && (
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-neon sm:block">
              modo_hacker
            </span>
          )}
          <a
            href="#covil"
            className="border border-neon/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neon transition-all duration-300 hover:bg-neon/10"
            style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
          >
            Acesso
          </a>
        </div>
      </nav>
    </header>
  );
}
