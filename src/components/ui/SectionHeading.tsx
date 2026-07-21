import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-navy-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance max-w-2xl text-3xl font-semibold leading-[1.12] tracking-tight text-navy-900 sm:text-4xl md:text-[2.4rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty max-w-lg text-base leading-relaxed text-granite-500 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
