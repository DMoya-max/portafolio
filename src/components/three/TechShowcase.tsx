"use client";

import dynamic from "next/dynamic";
import { techGroups } from "@/lib/data";

const TechGrid = dynamic(() => import("./TechGrid").then((module) => module.TechGrid), {
  ssr: false,
  loading: () => (
    <div className="space-y-14">
      {techGroups.map((group) => (
        <div key={group.category}>
          <div className="mb-5 flex items-center gap-4">
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ruby/80">
              {"// "}{group.category.toUpperCase()}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-red-500/40 to-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="flex h-[184px] flex-col items-center justify-center rounded-xl border-b border-l border-r border-zinc-800/90 border-t-2 border-t-red-500/70 bg-[#121215]/95"
              >
                <div className="h-12 w-12 animate-pulse rounded-full bg-ruby/10" />
                <p className="mt-4 text-[13px] text-steel">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
});

export function TechShowcase() {
  return <TechGrid />;
}
