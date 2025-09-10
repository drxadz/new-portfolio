import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { 
  fadeUp, 
  fadeInStagger, 
  timelineStagger, 
  drawPath, 
  activeDot,
  useReducedMotionGuard
} from '../lib/motion';
import { experience, type Experience } from '../data/experience';
import { BackgroundScene } from '../three/BackgroundScene';
import { ExperienceCard } from './ExperienceCard';


export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { isReducedMotion } = useReducedMotionGuard();

  const handleCardActivate = (index: number) => {
    setActiveIndex(index);
  };

  const handleCardToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Update active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const cards = timelineRef.current.querySelectorAll('[data-experience-card]');
      const scrollTop = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop || 0;

      cards.forEach((card, index) => {
        const cardTop = (card as HTMLElement).offsetTop + sectionTop;
        const cardHeight = (card as HTMLElement).offsetHeight;
        
        if (scrollTop >= cardTop - window.innerHeight / 2 && 
            scrollTop < cardTop + cardHeight - window.innerHeight / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="section border-t border-line bg-fg/[0.02] relative overflow-hidden"
    >
      {/* 3D Background */}
      {!isReducedMotion && (
        <BackgroundScene className="pointer-events-none" />
      )}

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold mb-4">
            Professional Experience
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-mute max-w-3xl mx-auto">
            Over 3+ years of hands-on experience in cybersecurity, from penetration testing 
            to red teaming, working with diverse clients and delivering high-impact security solutions.
          </motion.p>
        </motion.div>

        {/* Mobile: Single Column Layout */}
        <div className="lg:hidden">
          <motion.div
            ref={timelineRef}
            variants={isReducedMotion ? timelineStagger(0.1) : timelineStagger(0.08)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-4"
          >
            {experience.map((exp, index) => (
              <div
                key={index}
                data-experience-card
                className="relative"
              >
                <ExperienceCard
                  experience={exp}
                  index={index}
                  isActive={activeIndex === index}
                  onActivate={() => handleCardActivate(index)}
                  isExpanded={expandedIndex === index}
                  onToggle={() => handleCardToggle(index)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop: Two Column Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Timeline */}
          <motion.div
            variants={fadeInStagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24">
              {/* Timeline Spine */}
              <div className="relative">
                {/* SVG Timeline Spine */}
                <motion.svg
                  variants={isReducedMotion ? {} : drawPath}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="absolute left-6 top-0 w-0.5 h-full"
                >
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* Timeline Markers */}
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="relative flex items-center"
                    >
                      {/* Marker */}
                      <motion.div
                        variants={isReducedMotion ? {} : activeDot}
                        initial="hidden"
                        animate={activeIndex === index ? "show" : "hidden"}
                        className="relative z-10 w-12 h-12 bg-bg rounded-full border-2 border-line flex items-center justify-center shadow-lg"
                      >
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="ml-6 flex-1">
                        <h4 className="font-semibold text-fg text-sm">
                          {exp.role}
                        </h4>
                        <p className="text-accent text-xs font-medium">
                          {exp.company}
                        </p>
                        <p className="text-mute text-xs">
                          {exp.period}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Experience Cards */}
          <div className="lg:col-span-8">
            <motion.div
              ref={timelineRef}
              variants={isReducedMotion ? timelineStagger(0.1) : timelineStagger(0.08)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="space-y-4"
            >
              {experience.map((exp, index) => (
                <div
                  key={index}
                  data-experience-card
                  className="relative"
                >
                  <ExperienceCard
                    experience={exp}
                    index={index}
                    isActive={activeIndex === index}
                    onActivate={() => handleCardActivate(index)}
                    isExpanded={expandedIndex === index}
                    onToggle={() => handleCardToggle(index)}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}