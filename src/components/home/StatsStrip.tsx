import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { STATS } from "@/lib/constants";

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 hex-bg opacity-30" aria-hidden />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <StatCounter stat={stat} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
