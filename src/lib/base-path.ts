/** Nombre del repositorio en GitHub Actions (por ejemplo, "portafolio"). */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repoName.endsWith(".github.io");
const actionsBasePath = process.env.GITHUB_ACTIONS && !isUserSite ? `/${repoName}` : "";

/** Ruta base del sitio: "" para DMoya-max.github.io, /<repo> para sitios de proyecto. */
export const BASE_PATH = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? actionsBasePath
).replace(/\/$/, "");

/** Antepone la ruta base a recursos servidos desde /public. */
export function assetPath(path: string) {
  if (!BASE_PATH || !path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
