"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getBrandPaths } from "@/lib/brand-paths";
import { techGroups } from "@/lib/data";
import { TechIcon3D } from "./TechIcon3D";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const GROUP_LABELS: Record<string, string> = {
  Backend: "// BACKEND",
  "Frontend / Móvil": "// FRONTEND & MÓVIL",
  "Bases de datos": "// BASES DE DATOS",
  Herramientas: "// HERRAMIENTAS",
};

function techLabel(category: string, name: string) {
  if (category === "Backend") return "BACKEND";
  if (category === "Frontend / Móvil") return name === "React Native" ? "MÓVIL" : "FRONTEND";
  if (category === "Bases de datos") return name === "MongoDB" ? "NOSQL" : "SQL";
  return "HERRAMIENTAS";
}

function FallbackIcon({ iconKey }: { iconKey: string }) {
  return (
    <div className="flex h-28 items-center justify-center sm:h-32">
      <div className="h-12 w-12 sm:h-14 sm:w-14">
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          {getBrandPaths(iconKey).map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={index > 0 ? 0.7 : 1}
              className="transition-colors duration-300 [stroke:#A1A1AA] group-hover:[stroke:#DC2626]"
              transform={index === 0 && iconKey === "reactnative" ? "translate(5.28 5.28) scale(0.56)" : undefined}
            />
          ))}
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

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative space-y-14"
      >
        {techGroups.map((group) => (
          <motion.div key={group.category} variants={item}>
            <div className="mb-2 flex items-center gap-4">
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ruby/80">
                {GROUP_LABELS[group.category] ?? `// ${group.category.toUpperCase()}`}
              </span>
              <span
                className="h-px flex-1 bg-gradient-to-r from-red-500/40 to-transparent"
                aria-hidden="true"
              />
            </div>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <p className="text-xs text-steel/70">{group.description}</p>
              <span className="shrink-0 font-mono text-[11px] text-ruby/70">
                {String(group.items.length).padStart(2, "0")} / {String(techGroups.length).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((tech) => {
                const id = `${group.category}-${tech.name}`;

                return (
                  <motion.div
                    key={id}
                    variants={item}
                    onPointerEnter={() => setHovered(id)}
                    onPointerLeave={() => setHovered(null)}
                    className="group relative overflow-hidden rounded-xl border-b border-l border-r border-zinc-800/90 border-t-2 border-t-red-500/70 bg-[#121215]/95 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/60 hover:shadow-[0_12px_30px_rgba(220,38,38,0.14)]"
                  >
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 z-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.14),transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="relative z-40 w-full pb-1 pt-3 text-center font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-colors group-hover:text-red-400/90">
                      {techLabel(group.category, tech.name)}
                    </div>

                    {webglAvailable ? (
                      <View className="relative h-28 w-full sm:h-32">
                        <TechIcon3D iconKey={tech.iconKey} hovered={hovered === id} />
                      </View>
                    ) : (
                      <FallbackIcon iconKey={tech.iconKey} />
                    )}

                    <div className="relative z-40 border-t border-zinc-800/80 bg-[#0d0d10]/70 px-3 py-3 text-center transition-colors group-hover:border-t-red-500/60">
                      <p className="truncate font-medium text-zinc-200 transition-colors group-hover:text-white">
                        {tech.name}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-wider text-steel/60">
                        {tech.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
