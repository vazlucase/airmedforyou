import { Reveal } from "@/components/ui/Reveal";

interface Step {
  title: string;
  description: string;
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative flex flex-col gap-6 pl-10 before:absolute before:left-[15px] before:top-0 before:h-full before:w-px before:bg-navy-200">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08}>
          <div className="relative">
            <span className="absolute -left-[30px] flex size-8 items-center justify-center rounded-full bg-navy-600 text-xs font-semibold text-white font-heading">
              {i + 1}
            </span>
            <h3 className="text-lg font-semibold leading-snug text-navy-900 font-heading">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-granite-600">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
