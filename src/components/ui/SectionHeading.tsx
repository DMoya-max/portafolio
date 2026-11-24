import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-ruby">
        <span className="text-smoke/40">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-ruby to-transparent" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-smoke sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-steel md:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
