import { motion } from 'framer-motion';
import { fadeInStagger, fadeUp, buttonHover, chipHover, useReducedMotionGuard } from '../lib/motion';
import { profile } from '../data/profile';
import { hero } from '../data/hero';
import { PerformanceGuard, FallbackVisual } from './PerformanceGuard';
import { Section } from './ui/Section';
import { Container } from './ui/Container';

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
  const { isReducedMotion } = useReducedMotionGuard();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="home" padding="large">
      <Container>
        <div className="grid gap-8 md:gap-10 md:grid-cols-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={fadeInStagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <motion.h1 
              variants={fadeUp} 
              className="font-bold leading-tight text-center md:text-left text-3xl md:text-4xl lg:text-6xl"
            >
              {title || profile.name}
            </motion.h1>
            
            <motion.p 
              variants={fadeUp} 
              className="mt-3 text-mute font-medium text-center md:text-left text-base md:text-lg lg:text-2xl"
            >
              {subtitle || profile.role}
            </motion.p>
            
            <motion.p 
              variants={fadeUp} 
              className="mt-4 max-w-2xl text-fg/80 leading-relaxed text-center md:text-left mx-auto md:mx-0 text-sm md:text-base"
            >
              {hero.subhead}
            </motion.p>

            {/* Badges */}
            <motion.div 
              variants={fadeUp} 
              className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2"
            >
              {profile.badges.map((badge, index) => (
                <motion.span
                  key={badge}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={isReducedMotion ? {} : chipHover.whileHover}
                  whileTap={chipHover.whileTap}
                  className="
                    px-3 py-2 rounded-xl border border-line text-mobile-small font-medium
                    bg-bg/50 hover:bg-accent/10 hover:border-accent/30
                    text-mute hover:text-accent transition-all duration-300
                    will-change-transform mobile-tap-target
                  "
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={fadeUp} 
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <motion.button
                whileHover={isReducedMotion ? {} : buttonHover.whileHover}
                whileTap={buttonHover.whileTap}
                onClick={() => scrollToSection(hero.primaryCta.href)}
                className="
                  px-6 py-4 rounded-xl bg-accent text-white font-medium text-mobile-body
                  hover:bg-accent/90 transition-all duration-300
                  shadow-lg hover:shadow-xl hover:shadow-accent/25
                  will-change-transform mobile-tap-target
                "
              >
                {primaryCta || hero.primaryCta.label}
              </motion.button>
              
              <motion.button
                whileHover={isReducedMotion ? {} : buttonHover.whileHover}
                whileTap={buttonHover.whileTap}
                onClick={() => scrollToSection(hero.secondaryCta.href)}
                className="
                  px-6 py-4 rounded-xl border border-line font-medium text-mobile-body
                  hover:bg-fg/5 hover:border-accent/30 transition-all duration-300
                  will-change-transform mobile-tap-target
                "
              >
                {secondaryCta || hero.secondaryCta.label}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right 3D Canvas */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 order-1 md:order-2"
          >
            <div className="w-full max-w-sm mx-auto md:max-w-none aspect-[16/10] sm:aspect-[4/3] md:aspect-square lg:aspect-[5/4]">
              <PerformanceGuard
                model={model}
                accent={accent}
                autoFallbackOnMobile={true}
                fallback={<FallbackVisual accent={accent} />}
              >
                <div className="w-full h-full" />
              </PerformanceGuard>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
