import { QuoteHero } from "@/components/home/QuoteHero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AboutEcosystem } from "@/components/home/AboutEcosystem";
import { ArticlesPreview } from "@/components/home/ArticlesPreview";

export default function HomePage() {
  return (
    <>
      <QuoteHero />
      <StatsStrip />
      <ServicesOverview />
      <AboutEcosystem />
      <ArticlesPreview />
    </>
  );
}