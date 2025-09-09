import { motion } from 'framer-motion';
import { fadeInStagger, fadeUp } from '../lib/motion';
import { profile } from '../data/profile';
import { hero } from '../data/hero';
import { PerformanceGuard, FallbackVisual } from './PerformanceGuard';

interface Hero3DProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  model?: 'knot' | 'cubeStack';
  accent?: string;
  autoFallbackOnMobile?: boolean;
}

export function Hero3D({ 
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  model = 'knot',
  accent = '#ff6a00',
  autoFallbackOnMobile = true
}: Hero3DProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section">
      <div className="container-page grid gap-10 md:grid-cols-12 items-center">
        {/* Left Content */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-7"
        >
          <motion.h1 variants={fadeUp} className="text-hero font-bold">
            {title || profile.name}
          </motion.h1>
          
          <motion.p variants={fadeUp} className="mt-3 text-display text-mute">
            {subtitle || profile.role}
          </motion.p>
          
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-fg/80">
            {hero.subhead}
          </motion.p>

          {/* Badges */}
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-2">
            {profile.badges.map(badge => (
              <span
                key={badge}
                className="px-3 py-1 rounded-xl border border-line text-sm text-mute hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex gap-3">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(255, 106, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection(hero.primaryCta.href)}
              className="px-5 py-3 rounded-xl bg-accent text-white hover:opacity-90 transition-all duration-300 font-medium"
            >
              {primaryCta || hero.primaryCta.label}
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2, borderColor: accent }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection(hero.secondaryCta.href)}
              className="px-5 py-3 rounded-xl border border-line hover:bg-fg/5 transition-all duration-300 font-medium"
            >
              {secondaryCta || hero.secondaryCta.label}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-5"
        >
          <div className="aspect-[4/3] md:aspect-square">
            <PerformanceGuard
              model={model}
              accent={accent}
              autoFallbackOnMobile={autoFallbackOnMobile}
              fallback={<FallbackVisual accent={accent} />}
            >
              <div className="w-full h-full" />
            </PerformanceGuard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
