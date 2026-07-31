import { useEffect, useState } from "react";

/** Secret modes: 5 clicks on the sigil = hacker mode; Konami code = matrix mode. */
export function useSecretModes() {
  const [hacker, setHacker] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks >= 5) {
      setHacker((h) => !h);
      setClicks(0);
    }
  }, [clicks]);

  useEffect(() => {
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) {
        i++;
        if (i === seq.length) {
          setMatrix((m) => !m);
          i = 0;
        }
      } else {
        i = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hacker-mode", hacker);
    root.classList.toggle("matrix-mode", matrix);
  }, [hacker, matrix]);

  return { hacker, matrix, registerSigilClick: () => setClicks((c) => c + 1) };
}
