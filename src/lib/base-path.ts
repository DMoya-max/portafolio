/** Ruta base del sitio en GitHub Pages (por ejemplo, /portafolio). */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/portafolio").replace(
  /\/$/,
  "",
);

/** Antepone la ruta base a recursos servidos desde /public. */
export function assetPath(path: string) {
  if (!BASE_PATH || !path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
