import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow } from "@/components/covil/CursorGlow";
import { DashboardDemo } from "@/components/covil/DashboardDemo";
import { Footer, FinalCTA } from "@/components/covil/FinalCTA";
import { Hero } from "@/components/covil/Hero";
import { HowItWorks } from "@/components/covil/HowItWorks";
import { Library } from "@/components/covil/Library";
import { LiveBackground } from "@/components/covil/LiveBackground";
import { Manifesto } from "@/components/covil/Manifesto";
import { MatrixRain } from "@/components/covil/MatrixRain";
import { Nav } from "@/components/covil/Nav";
import { useSecretModes } from "@/components/covil/useSecretModes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coringa dos Prompts — Fature com Inteligência Artificial" },
      {
        name: "description",
        content:
          "Você não precisa aprender IA. Precisa aprender a faturar com ela. Método, prompts e agentes para construir sua agência digital. Entre no Covil.",
      },
      { property: "og:title", content: "Coringa dos Prompts — Entre no Covil" },
      {
        property: "og:description",
        content:
          "Uma organização para quem quer dominar a Inteligência Artificial e transformá-la em dinheiro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { hacker, matrix, registerSigilClick } = useSecretModes();

  return (
    <main className="hide-cursor relative min-h-screen overflow-x-hidden bg-background">
      <LiveBackground intensity={hacker ? 1.6 : 1} />
      {matrix && <MatrixRain />}
      <CursorGlow />
      <Nav onSigilClick={registerSigilClick} hacker={hacker} />
      <h1 className="sr-only">Coringa dos Prompts — aprenda a faturar com Inteligência Artificial</h1>
      <Hero />
      <Manifesto />
      <Library />
      <HowItWorks />
      <DashboardDemo />
      <FinalCTA />
      <Footer />
    </main>
  );
}
