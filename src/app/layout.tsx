import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel Jose Moya Quiroz | Desarrollador de Software Full-Stack",
  description:
    "Portafolio de Daniel Jose Moya Quiroz. Desarrollo web full-stack con Python, Django, Node.js, React y Next.js.",
  keywords: [
    "Daniel Moya",
    "Desarrollador Full-Stack",
    "Next.js",
    "React",
    "Django",
    "Node.js",
    "Python",
  ],
  authors: [{ name: "Daniel Jose Moya Quiroz" }],
  openGraph: {
    title: "Daniel Jose Moya Quiroz | Desarrollador de Software Full-Stack",
    description:
      "Aplicaciones web escalables, seguras y bien estructuradas de principio a fin.",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} overflow-x-clip`}>
      <body className="min-h-screen overflow-x-clip bg-obsidian text-smoke antialiased">
        {children}
      </body>
    </html>
  );
}
