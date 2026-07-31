import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Blur + fade reveal on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.4em] text-neon-soft">
      <span className="opacity-60">{index}</span>
      <span className="h-px w-10 neon-line" />
      <span>{children}</span>
    </div>
  );
}
