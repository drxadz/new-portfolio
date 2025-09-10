import { motion } from 'framer-motion';
import { fadeUp, drawPath, useReducedMotionGuard } from '../../lib/motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  showUnderline?: boolean;
  children?: ReactNode;
}

export function SectionHeader({ 
  eyebrow, 
  title, 
  description, 
  centered = true,
  showUnderline = false,
  children 
}: SectionHeaderProps) {
  const { isReducedMotion, fadeUp: fadeUpVariant, drawPath: drawPathVariant } = useReducedMotionGuard();

  return (
    <div className={`${centered ? 'text-center' : ''} mb-16`}>
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
            {eyebrow}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-display font-semibold mb-4 relative"
      >
        {title}
        {showUnderline && (
          <motion.svg
            variants={isReducedMotion ? {} : drawPathVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1"
            fill="none"
            viewBox="0 0 64 4"
          >
            <motion.path
              d="M2 2 L62 2"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={`text-lg text-mute max-w-3xl ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}

      {/* Additional content */}
      {children && (
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
