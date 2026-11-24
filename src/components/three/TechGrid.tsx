"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { brandPaths } from "@/lib/brand-paths";
import { techGroups } from "@/lib/data";
import { TechIcon3D } from "./TechIcon3D";

function FallbackIcon({ iconKey, hovered }: { iconKey: string; hovered: boolean }) {
  return (
    <div className="flex h-24 items-center justify-center [perspective:600px] sm:h-28">
      <div
        className="h-12 w-12 [transform-style:preserve-3d] transition-transform duration-500 [transform:rotateY(-20deg)_rotateX(12deg)] group-hover:[transform:rotateY(18deg)_rotateX(-8deg)] sm:h-14 sm:w-14"
        style={hovered ? { transform: "rotateY(18deg) rotateX(-8deg)" } : undefined}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full drop-shadow-[0_0_14px_rgba(220,38,38,0.75)]"
          aria-hidden="true"
        >
          <path d={brandPaths[iconKey] ?? ""} fill="#DC2626" />
        </svg>
      </div>
    </div>
  );
}

export function TechGrid() {
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    try {
      const probe = document.createElement("canvas");
      setWebglAvailable(
        Boolean(probe.getContext("webgl2") || probe.getContext("webgl")),
      );
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  return (
    <div className="relative">
      {webglAvailable ? (
        <Canvas
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            pointerEvents: "none",
            background: "transparent",
          }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor("#09090B", 0)}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.2], fov: 40, near: 0.1, far: 100 }}
        >
          <View.Port />
        </Canvas>
      ) : null}

      <div className="relative space-y-14">
        {techGroups.map((group) => (
          <div key={group.category}>
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-mono text-sm uppercase tracking-[0.22em] text-smoke">
                {group.category}
              </h3>
              <span className="text-xs text-steel/70">{group.description}</span>
              <span className="ml-auto font-mono text-[11px] text-ruby/70">
                {String(group.items.length).padStart(2, "0")} / {String(techGroups.length).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => {
                const id = `${group.category}-${item.name}`;
                const isHovered = hovered === id;

                return (
                  <div
                    key={id}
                    className="glass group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-ruby/50 hover:glow-ruby"
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-6 top-4 h-24 rounded-full bg-ruby/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    {webglAvailable ? (
                      <View className="relative h-24 w-full cursor-grab active:cursor-grabbing sm:h-28">
                        <TechIcon3D iconKey={item.iconKey} hovered={isHovered} />
                      </View>
                    ) : (
                      <FallbackIcon iconKey={item.iconKey} hovered={isHovered} />
                    )}

                    <div className="relative z-40 border-t border-edge/70 px-3 py-3 text-center">
                      <p className="truncate text-[13px] font-medium text-smoke">{item.name}</p>
                      <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-wider text-steel/60">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
