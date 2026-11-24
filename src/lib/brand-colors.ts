export type BrandPalette = {
  base: string;
  accent?: string;
  contrast?: string;
};

export const brandPalettes: Record<string, BrandPalette> = {
  python: { base: "#3776AB", accent: "#FFD43B" },
  django: { base: "#44B78B", accent: "#092E20" },
  nodedotjs: { base: "#339933", accent: "#68A063" },
  react: { base: "#61DAFB" },
  nextdotjs: { base: "#FFFFFF", contrast: "#000000" },
  javascript: { base: "#F7DF1E" },
  typescript: { base: "#3178C6" },
  html5: { base: "#E34F26" },
  css: { base: "#1572B6" },
  tailwindcss: { base: "#06B6D4" },
  postgresql: { base: "#4169E1" },
  mysql: { base: "#4479A1", accent: "#F29111" },
  sqlite: { base: "#44A8E0", accent: "#003B57" },
  mongodb: { base: "#47A248" },
  git: { base: "#F05032" },
  github: { base: "#F4F4F5" },
  docker: { base: "#2496ED" },
};
