/** Debe coincidir con `basePath` en next.config.ts. */
const DEFAULT_BASE_PATH = "/portafolio";

/** Ruta base del sitio: "" para DMoya-max.github.io, /<repo> para sitios de proyecto. */
export const BASE_PATH = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH
).replace(/\/$/, "");

/** Antepone la ruta base a recursos servidos desde /public. */
export function assetPath(path: string) {
  if (!BASE_PATH || !path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
