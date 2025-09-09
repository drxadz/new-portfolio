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

  const visiblePoints = showMore ? experience.points : experience.points.slice(0, 4);
  const hasMorePoints = experience.points.length > 4;

  return (
    <motion.div
      ref={cardRef}
      variants={isReducedMotion ? cardRevealReduced : cardReveal}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      whileHover={isReducedMotion ? {} : hoverLift.whileHover}
      whileTap={{ scale: 0.995 }}
      transition={isReducedMotion ? {} : hoverLift.transition}
      className="relative"
    >
      {/* Timeline Dot */}
      <motion.div
        variants={isReducedMotion ? {} : activeDot}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        className="absolute -left-8 top-6 w-3 h-3 bg-accent rounded-full border-2 border-bg shadow-lg z-10"
      >
        <div className="absolute inset-1 bg-white rounded-full" />
      </motion.div>

      {/* Card */}
      <div
        className={`
          rounded-xl border border-line bg-bg/95 px-6 py-5 cursor-pointer
          hover:shadow-soft transition-shadow duration-300
          ${isActive ? 'ring-2 ring-accent/20' : ''}
        `}
        onClick={onActivate}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={hasMorePoints ? showMore : undefined}
        aria-label={`View details for ${experience.role} at ${experience.company}`}
      >
        {/* Header */}
        <motion.div
          variants={isReducedMotion ? fadeUpReduced : fadeUp}
          className="flex flex-col md:flex-row md:items-start md:justify-between mb-3"
        >
          <div>
            <h3 className="text-xl font-semibold text-fg mb-1">
              {experience.role}
            </h3>
            <h4 className="text-lg font-medium text-accent">
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
                <span className="text-accent mr-2 mt-1 flex-shrink-0">•</span>
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
              className="flex items-center space-x-1 text-accent hover:text-accent/80 transition-colors duration-200 mt-3"
              aria-label={showMore ? "Show less details" : "Show more details"}
            >
              <span className="text-sm font-medium">
                {showMore ? 'Show less' : `Show ${experience.points.length - 4} more`}
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
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isReducedMotion = useReducedMotion();

  // Calculate progress based on visible cards
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const cards = timelineRef.current.querySelectorAll('[data-experience-card]');
      const cardHeight = cards[0]?.getBoundingClientRect().height || 0;
      const totalHeight = cardHeight * cards.length;
      const scrollTop = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop || 0;
      const sectionHeight = sectionRef.current?.offsetHeight || 0;

      const relativeScroll = Math.max(0, scrollTop - sectionTop);
      const progressRatio = Math.min(1, relativeScroll / (sectionHeight - window.innerHeight));
      
      setProgress(progressRatio);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="section border-t border-line bg-fg/[0.02]"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky Left Rail - Desktop Only */}
          <motion.div
            variants={isReducedMotion ? fadeUpReduced : fadeUp}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="sticky top-24">
              {/* Title */}
              <motion.h2 
                variants={isReducedMotion ? fadeUpReduced : fadeUp}
                className="text-display font-semibold mb-8"
                style={{ opacity: 0.6 + (progress * 0.4) }}
              >
                Experience
              </motion.h2>

              {/* Progress Indicator */}
              <div className="relative">
                <div className="w-1 h-32 bg-line rounded-full overflow-hidden">
                  <motion.div
                    variants={isReducedMotion ? {} : progressFill}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="w-full bg-accent rounded-full origin-top"
                    style={{ height: `${progress * 100}%` }}
                  />
                </div>
                
                {/* Year Indicators */}
                <div className="absolute -left-2 top-0 w-5 h-5 bg-accent rounded-full border-2 border-bg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute -left-2 bottom-0 w-5 h-5 bg-line rounded-full border-2 border-bg" />
              </div>

              {/* Years */}
              <div className="mt-4 space-y-2">
                <p className="text-sm text-mute">2023-2025</p>
                <p className="text-sm text-mute">2022-2024</p>
                <p className="text-sm text-mute">2022</p>
                <p className="text-sm text-mute">2021</p>
                <p className="text-sm text-mute">2020+</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Column */}
          <div className="lg:col-span-9">
            {/* Mobile Title */}
            <motion.h2
              variants={isReducedMotion ? fadeUpReduced : fadeUp}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="text-display font-semibold mb-8 lg:hidden"
            >
              Experience
            </motion.h2>

            {/* Timeline Container */}
            <div ref={timelineRef} className="relative">
              {/* SVG Timeline Spine */}
              <motion.svg
                variants={isReducedMotion ? {} : drawPath}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="absolute left-0 top-0 w-0.5 h-full hidden lg:block"
                style={{ left: '-1.5rem' }}
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

              {/* Experience Cards */}
              <motion.div
                variants={isReducedMotion ? timelineStagger(0.1) : timelineStagger(0.08)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="space-y-8 lg:pl-8"
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
      </div>
    </section>
  );
}