import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroImg from "@/assets/hero-strategist.jpg";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 sm:pt-0"
    >
      {/* Character plate */}
      <motion.div
        style={reduce ? undefined : { y: imgY }}
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full sm:w-[62%] lg:w-[55%]"
      >
        <img
          src={heroImg}
          width={1280}
          height={1600}
          alt="Estrategista mascarado do Coringa dos Prompts emergindo da escuridão com fumaça verde e cartas digitais"
          className="h-full w-full object-cover object-[60%_center] opacity-70 sm:opacity-95"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #030303 8%, rgba(3,3,3,0.72) 34%, rgba(3,3,3,0.05) 70%), linear-gradient(to top, #030303 2%, transparent 40%)",
          }}
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-3 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.34em] text-neon-soft"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon" />
            organização · acesso restrito
          </motion.p>

          <h1 className="font-display text-[13vw] font-bold uppercase leading-[0.86] tracking-tight sm:text-[9vw] lg:text-[6.4vw]">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="block"
            >
              Você não precisa
              <br />
              aprender IA.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="mt-3 block text-gradient-neon glow-text"
            >
              Você precisa aprender
              <br />
              a faturar com ela.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-10 max-w-md font-mono text-xs leading-relaxed text-muted-foreground sm:text-[13px]"
          >
            Cloud Code. Lovable. Claude. ChatGPT. Low-Code.
            <br />
            <span className="text-foreground/70">
              Tudo conectado em um único método.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <EnterButton />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              vagas limitadas por lote
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span className="animate-flicker">desça</span>
      </div>
    </section>
  );
}

export function EnterButton({ label = "Entrar no Covil" }: { label?: string }) {
  return (
    <a
      href="#covil"
      data-cursor="hover"
      className="group relative inline-flex items-center justify-center overflow-hidden border border-neon/50 bg-neon/5 px-9 py-5 font-display text-base font-bold uppercase tracking-[0.18em] text-foreground transition-all duration-500 hover:scale-[1.04] hover:border-neon sm:px-12 sm:text-lg"
      style={{ boxShadow: "var(--glow-neon)" }}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-y-full bg-neon/25 blur-2xl transition-transform duration-700 group-hover:translate-y-0"
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "var(--glow-neon-lg)" }}
      />
      <span className="relative z-10 transition-all duration-500 group-hover:text-neon">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 bg-neon transition-all duration-500 group-hover:w-full"
      />
    </a>
  );
}
