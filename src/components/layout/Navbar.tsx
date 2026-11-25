"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "#formacion", label: "Formación" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (section): section is Element => Boolean(section),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }, 80);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-edge/80 bg-obsidian/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir al inicio">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-ruby/40 bg-ruby/10 font-mono text-xs font-bold text-ruby transition-colors group-hover:bg-ruby group-hover:text-white">
              DM
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-steel transition-colors group-hover:text-smoke sm:block">
              D. Moya <span className="text-ruby">/</span> Portfolio
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3.5 py-2 text-sm transition-colors ${
                  active === link.href
                    ? "text-smoke"
                    : "text-steel hover:text-smoke"
                }`}
              >
                {link.label}
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-ruby to-transparent"
                  />
                ) : null}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden rounded-md border border-ruby/50 bg-ruby/10 px-4 py-2 text-xs font-medium text-red-200 transition-all hover:bg-ruby hover:text-white hover:shadow-[0_0_24px_-6px_rgba(220,38,38,0.9)] md:inline-block"
          >
            Hablemos
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-md border border-edge p-2 text-steel transition-colors hover:border-ruby hover:text-smoke md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="z-50 pointer-events-auto overflow-hidden border-t border-ruby/60 bg-[#09090B]/98 shadow-[0_20px_50px_-20px_rgba(220,38,38,0.45)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col px-5 py-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleMobileNavClick(event, link.href.slice(1))}
                    className={`min-h-[44px] border-b border-ruby/25 py-3 font-mono text-xs uppercase tracking-[0.18em] last:border-b-0 ${
                      active === link.href ? "text-ruby" : "text-steel"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={(event) => handleMobileNavClick(event, "contacto")}
                  className="my-2 flex min-h-[44px] items-center justify-center rounded-md border border-ruby/60 bg-ruby/15 px-4 py-3 text-sm font-medium text-red-100 transition-colors hover:bg-ruby hover:text-white"
                >
                  Hablemos
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
