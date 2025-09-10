import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeInStagger, useReducedMotionGuard } from '../lib/motion';

interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ExperienceCard({ 
  experience, 
  index, 
  isActive, 
  onActivate, 
  isExpanded, 
  onToggle 
}: ExperienceCardProps) {
  const { isReducedMotion } = useReducedMotionGuard();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
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
          relative rounded-xl border bg-bg/95 cursor-pointer
          transition-all duration-300 overflow-hidden
          ${isActive ? 'border-accent/30 shadow-lg' : 'border-line hover:border-accent/20'}
          ${isExpanded ? 'hover:-translate-y-1 hover:shadow-soft' : ''}
        `}
        onClick={onActivate}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
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

        {/* Compact Header - Always Visible */}
        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-fg mb-1 group-hover:text-accent transition-colors duration-300">
                {experience.role}
              </h3>
              <h4 className="text-base md:text-lg font-medium text-accent mb-1">
                {experience.company}
              </h4>
              <p className="text-sm text-mute font-medium">
                {experience.period}
              </p>
            </div>
            
            {/* Expand/Collapse Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle();
                }
              }}
              className="
                mt-2 md:mt-0 flex items-center space-x-1 text-accent hover:text-accent/80 
                transition-colors duration-200 group/btn
              "
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <span className="text-sm font-medium">
                {isExpanded ? 'Show less' : 'Show more'}
              </span>
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: isReducedMotion 
                  ? { duration: 0.1 }
                  : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: isReducedMotion 
                  ? { duration: 0.1 }
                  : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-line/50">
                {/* Location */}
                {experience.location && (
                  <motion.div
                    variants={isReducedMotion ? {} : fadeUp}
                    initial="hidden"
                    animate="show"
                    className="mb-4"
                  >
                    <div className="flex items-center text-sm text-mute">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {experience.location}
                    </div>
                  </motion.div>
                )}

                {/* Bullet Points */}
                <motion.div
                  variants={isReducedMotion ? {} : fadeInStagger(0.05)}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {experience.points.map((point, pointIndex) => (
                    <motion.div
                      key={pointIndex}
                      variants={isReducedMotion ? {} : fadeUp}
                      className="flex items-start text-sm text-fg/80 leading-relaxed"
                    >
                      <span className="text-accent mr-3 mt-1 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
