import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StatsStrip } from "@/components/home/StatsStrip";
import { AboutEcosystem } from "@/components/home/AboutEcosystem";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ArticlesPreview } from "@/components/home/ArticlesPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesOverview />
      <AboutEcosystem />
      <QuoteSection />
      <ArticlesPreview />
    </>
  );
}
