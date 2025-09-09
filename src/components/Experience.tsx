import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  fadeUp, 
  fadeInStagger, 
  cardReveal, 
  timelineStagger, 
  drawPath, 
  progressFill, 
  activeDot,
  hoverLift,
  fadeUpReduced,
  cardRevealReduced
} from '../lib/motion';
import { experience, type Experience } from '../data/experience';
import { BackgroundScene } from '../three/BackgroundScene';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  isReducedMotion: boolean;
}

function ExperienceCard({ experience, index, isActive, onActivate, isReducedMotion }: ExperienceCardProps) {
  const [showMore, setShowMore] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const handleToggleMore = () => {
    setShowMore(!showMore);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleMore();
    }
  };

  const visiblePoints = showMore ? experience.points : experience.points.slice(0, 3);
  const hasMorePoints = experience.points.length > 3;

  return (
    <motion.div
      ref={cardRef}
      variants={isReducedMotion ? cardRevealReduced : cardReveal}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      whileHover={isReducedMotion ? {} : { y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Active Glow Effect */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl blur-sm -z-10"
        />
      )}

      {/* Card */}
      <div
        className={`
          relative rounded-xl border bg-bg/95 px-6 py-5 cursor-pointer
          transition-all duration-300 overflow-hidden
          ${isActive ? 'border-accent/30 shadow-lg' : 'border-line hover:border-accent/20'}
        `}
        onClick={onActivate}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={hasMorePoints ? showMore : undefined}
        aria-label={`View details for ${experience.role} at ${experience.company}`}
      >
        {/* Active Left Border */}
        {isActive && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l-xl"
          />
        )}

        {/* Header */}
        <motion.div
          variants={isReducedMotion ? fadeUpReduced : fadeUp}
          className="flex flex-col md:flex-row md:items-start md:justify-between mb-4"
        >
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-fg mb-1 group-hover:text-accent transition-colors duration-300">
              {experience.role}
            </h3>
            <h4 className="text-lg font-medium text-accent mb-2">
              {experience.company}
            </h4>
          </div>
          <div className="text-right mt-2 md:mt-0">
            <p className="text-sm text-mute font-medium">
              {experience.period}
            </p>
            {experience.location && (
              <p className="text-sm text-mute">
                {experience.location}
              </p>
            )}
          </div>
        </motion.div>

        {/* Points */}
        <motion.div
          variants={isReducedMotion ? fadeInStagger(0.06) : fadeInStagger(0.06)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-2"
        >
          <AnimatePresence mode="wait">
            {visiblePoints.map((point, pointIndex) => (
              <motion.div
                key={pointIndex}
                variants={isReducedMotion ? fadeUpReduced : fadeUp}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex items-start text-sm text-fg/80 leading-relaxed"
              >
                <span className="text-accent mr-3 mt-1 flex-shrink-0">•</span>
                <span>{point}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Show More Button */}
          {hasMorePoints && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleMore();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleMore();
                }
              }}
              className="flex items-center space-x-1 text-accent hover:text-accent/80 transition-colors duration-200 mt-3 group"
              aria-label={showMore ? "Show less details" : "Show more details"}
            >
              <span className="text-sm font-medium">
                {showMore ? 'Show less' : `Show ${experience.points.length - 3} more`}
              </span>
              <motion.svg
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isReducedMotion = useReducedMotion();

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
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
              className="space-y-6"
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
                    onActivate={() => setActiveIndex(index)}
                    isReducedMotion={isReducedMotion}
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