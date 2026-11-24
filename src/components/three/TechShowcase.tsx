"use client";

import dynamic from "next/dynamic";
import { techGroups } from "@/lib/data";

const TechGrid = dynamic(() => import("./TechGrid").then((module) => module.TechGrid), {
  ssr: false,
  loading: () => (
    <div className="space-y-14">
      {techGroups.map((group) => (
        <div key={group.category}>
          <div className="mb-5 font-mono text-sm uppercase tracking-[0.22em] text-smoke">
            {group.category}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="glass flex h-[184px] flex-col items-center justify-center rounded-xl"
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
