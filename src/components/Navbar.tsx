import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { profile } from "../data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll for sticky header height
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: -20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line transition-all duration-300 ${
        scrolled ? 'h-14' : 'h-16'
      }`}>
        <div className="container-page h-full flex items-center justify-between">
          <motion.button 
            onClick={() => scrollToSection('#home')}
            className="font-semibold text-lg tracking-tight hover:text-accent transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {profile.name}
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <motion.button
              onClick={() => navigate('/works')}
              className="text-sm text-mute hover:text-fg transition-colors duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Works
            </motion.button>
            <motion.button
              onClick={() => navigate('/notes')}
              className="text-sm text-mute hover:text-fg transition-colors duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Notes
            </motion.button>
            {links.map(l => (
              <motion.button
                key={l.href}
                onClick={() => scrollToSection(l.href)}
                className="text-sm text-mute hover:text-fg transition-colors duration-300"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="text-sm px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors duration-300"
              whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(255, 106, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl border border-line bg-bg/50 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="text-xl font-light"
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {open ? '×' : '≡'}
            </motion.span>
          </motion.button>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-fg/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            
            {/* Drawer Content */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[90vw] z-50 md:hidden bg-bg border-l border-line shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-line">
                  <span className="font-semibold text-lg">{profile.name}</span>
                  <motion.button
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 rounded-xl border border-line bg-bg/50 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <span className="text-xl">×</span>
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-2">
                    <motion.button
                      key={'works'}
                      onClick={() => { navigate('/works'); setOpen(false); }}
                      className="w-full text-left py-3 px-4 rounded-xl text-base font-medium text-fg hover:bg-accent/10 hover:text-accent transition-all duration-300 min-h-[44px] flex items-center"
                      whileTap={{ scale: 0.98 }}
                    >
                      Works
                    </motion.button>
                    <motion.button
                      key={'notes'}
                      onClick={() => { navigate('/notes'); setOpen(false); }}
                      className="w-full text-left py-3 px-4 rounded-xl text-base font-medium text-fg hover:bg-accent/10 hover:text-accent transition-all duration-300 min-h-[44px] flex items-center"
                      whileTap={{ scale: 0.98 }}
                    >
                      Notes
                    </motion.button>
                    {links.map((l) => (
                      <motion.button
                        key={l.href}
                        onClick={() => scrollToSection(l.href)}
                        className="w-full text-left py-3 px-4 rounded-xl text-base font-medium text-fg hover:bg-accent/10 hover:text-accent transition-all duration-300 min-h-[44px] flex items-center"
                        whileTap={{ scale: 0.98 }}
                      >
                        {l.label}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full mt-6 py-3 px-4 rounded-xl bg-accent text-white text-base font-medium hover:bg-accent/90 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                    whileTap={{ scale: 0.98 }}
                  >
                    Get In Touch
                  </motion.button>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-line text-center text-sm text-mute">
                  {profile.role} • {profile.location}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
