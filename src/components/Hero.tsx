import { motion } from "framer-motion";
import { fadeInStagger, fadeUp } from "../lib/motion";
import { profile } from "../data/profile";
import { hero } from "../data/hero";
import profileImage from "../assets/images/profile.svg";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section">
      <div className="container-page grid gap-10 md:grid-cols-12 items-center">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-7"
        >
          <motion.h1 variants={fadeUp} className="text-hero font-bold">
            {profile.name}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-display text-mute">
            {profile.role}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-fg/80">
            {hero.subhead}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-2">
            {profile.badges.map(b => (
              <span
                key={b}
                className="px-3 py-1 rounded-xl border border-line text-sm text-mute"
              >
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex gap-3">
            <button
              onClick={() => scrollToSection(hero.primaryCta.href)}
              className="px-5 py-3 rounded-xl bg-accent text-white hover:opacity-90 transition"
            >
              {hero.primaryCta.label}
            </button>
            <button
              onClick={() => scrollToSection(hero.secondaryCta.href)}
              className="px-5 py-3 rounded-xl border border-line hover:bg-fg/5 transition"
            >
              {hero.secondaryCta.label}
            </button>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-5"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl border border-line bg-gradient-to-br from-fg/[0.04] to-fg/[0.02] overflow-hidden">
              <img
                src={profileImage}
                alt={`${profile.name} - ${profile.role}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-semibold">OSCP</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
