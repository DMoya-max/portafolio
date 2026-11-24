import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-edge/60 bg-transparent py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
        <div>
          <p className="text-sm font-medium text-smoke">Daniel Jose Moya Quiroz</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-steel/60">
            Desarrollador de Software Full-Stack
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-steel">
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ruby">
            {CONTACT_EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-ruby"
          >
            GitHub <ArrowUpRight size={12} />
          </a>
          <span className="font-mono text-[10px] text-steel/50">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
