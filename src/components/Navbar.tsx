import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur border-b border-line">
      <div className="container-page h-16 flex items-center justify-between">
        <button 
          onClick={() => scrollToSection('#home')}
          className="font-semibold text-lg tracking-tight hover:text-accent transition-colors"
        >
          {profile.name}
        </button>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollToSection(l.href)}
              className="text-sm text-mute hover:text-fg transition"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="text-sm px-4 py-2 rounded-xl bg-accent text-white hover:opacity-90 transition"
          >
            Contact
          </button>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-line"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-lg">{open ? '×' : '≡'}</span>
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-line"
        >
          <div className="container-page py-3 flex flex-col gap-2">
            {links.map(l => (
              <button
                key={l.href}
                onClick={() => scrollToSection(l.href)}
                className="py-2 text-mute hover:text-fg border-b border-line/70 last:border-none text-left"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="mt-2 text-center px-4 py-2 rounded-xl bg-accent text-white"
            >
              Contact
            </button>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
