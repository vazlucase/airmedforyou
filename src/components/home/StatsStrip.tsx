import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { STATS } from "@/lib/constants";

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-ink-panel py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-600/50 to-transparent" aria-hidden />
      </div>
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
