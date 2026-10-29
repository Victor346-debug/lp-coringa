import { createFileRoute } from "@tanstack/react-router";
import ogCover from "@/assets/og-cover.png.asset.json";
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
import { getRequestOrigin } from "@/lib/origin.functions";

// Crawlers only read absolute image URLs, so the share image is assembled
// per request from the host that is actually serving the page.
export const Route = createFileRoute("/")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const shareImage = `${loaderData.origin}${ogCover.url}`;
    return {
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
        { property: "og:image", content: shareImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: shareImage },
      ],
    };
  },
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
