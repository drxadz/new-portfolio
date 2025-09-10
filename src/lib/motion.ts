import { Variants, useReducedMotion as useFramerReducedMotion } from "framer-motion";

// Premium easing curve for all animations
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

// Check for reduced motion preference
export const useReducedMotion = () => {
  return useFramerReducedMotion();
};

// Helper to get reduced motion variants
export const useReducedMotionGuard = () => {
  const isReducedMotion = useReducedMotion();
  return {
    isReducedMotion,
    fadeUp: isReducedMotion ? fadeUpReduced : fadeUp,
    cardReveal: isReducedMotion ? cardRevealReduced : cardReveal,
    stagger: isReducedMotion ? 0.02 : 0.08,
    duration: isReducedMotion ? 0.25 : 0.65,
  };
};

// Standard viewport options for consistent scroll-triggered animations
export const inViewOptions = {
  once: true,
  amount: 0.3,
  margin: "-100px",
} as const;

// === CORE ANIMATION VARIANTS ===

// Primary fade up animation - used across all sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: PREMIUM_EASE },
  },
};

// Staggered container for multiple children
export const fadeInStagger = (stagger = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

// === INTERACTION VARIANTS ===

// Premium hover lift with spring physics
export const hoverLift = {
  whileHover: { 
    y: -4, 
    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
    transition: { type: "spring", stiffness: 280, damping: 22 }
  },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 280, damping: 22 },
};

// Button hover with underline sweep
export const buttonHover = {
  whileHover: { 
    y: -2,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  whileTap: { scale: 0.95 },
};

// Card hover with subtle lift and border accent
export const cardHover = {
  whileHover: { 
    y: -4, 
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    borderColor: "var(--accent)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  whileTap: { scale: 0.995 },
};

// === SPECIALIZED VARIANTS ===

// SVG path drawing animation for decorative elements
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: PREMIUM_EASE },
  },
};

// Card reveal with enhanced easing
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: PREMIUM_EASE },
  },
};

// Timeline-specific stagger
export const timelineStagger = (stagger = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

// Progress indicator animation
export const progressFill: Variants = {
  hidden: { height: "0%" },
  show: {
    height: "100%",
    transition: { duration: 0.8, ease: PREMIUM_EASE },
  },
};

// Active dot scale animation
export const activeDot: Variants = {
  hidden: { scale: 0.8, opacity: 0.6 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Chip/skill hover animation
export const chipHover = {
  whileHover: { 
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  whileTap: { scale: 0.98 },
};

// Form input focus animation
export const inputFocus = {
  whileFocus: { 
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
};

// Modal/overlay animations
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: PREMIUM_EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: PREMIUM_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Carousel/slider animations
export const carouselSlide: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASE },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3 },
  },
};

// === REDUCED MOTION VARIANTS ===

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
};

export const cardRevealReduced: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
};

export const drawPathReduced: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
};

// === UTILITY FUNCTIONS ===

// Get appropriate variants based on reduced motion preference
export const getVariants = (isReducedMotion: boolean) => ({
  fadeUp: isReducedMotion ? fadeUpReduced : fadeUp,
  cardReveal: isReducedMotion ? cardRevealReduced : cardReveal,
  drawPath: isReducedMotion ? drawPathReduced : drawPath,
  stagger: isReducedMotion ? 0.02 : 0.08,
  duration: isReducedMotion ? 0.25 : 0.65,
});

// Section wrapper animation props
export const sectionAnimationProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: inViewOptions,
} as const;
