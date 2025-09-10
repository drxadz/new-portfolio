import { motion, Variants } from 'framer-motion';
import { fadeInStagger, sectionAnimationProps, useReducedMotionGuard } from '../../lib/motion';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: 'default' | 'subtle' | 'accent';
  padding?: 'default' | 'large' | 'small';
  variants?: Variants;
}

export function Section({ 
  id, 
  className = '', 
  children, 
  background = 'default',
  padding = 'default',
  variants
}: SectionProps) {
  const { isReducedMotion, stagger } = useReducedMotionGuard();
  
  const backgroundClasses = {
    default: '',
    subtle: 'bg-fg/[0.02]',
    accent: 'bg-gradient-to-br from-accent/5 to-accent/10',
  };

  const paddingClasses = {
    default: 'py-section',
    large: 'py-24 md:py-32',
    small: 'py-12 md:py-16',
  };

  const sectionVariants = variants || fadeInStagger(stagger);

  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      {...sectionAnimationProps}
      className={`
        ${paddingClasses[padding]}
        ${backgroundClasses[background]}
        ${background !== 'default' ? 'border-t border-line' : ''}
        ${className}
      `}
    >
      {children}
    </motion.section>
  );
}
