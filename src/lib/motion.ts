import { Variants, useReducedMotion } from "framer-motion";

// Check for reduced motion preference
export const useReducedMotion = () => {
  return useReducedMotion();
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInStagger = (stagger = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

// Enhanced hover lift with spring physics
export const hoverLift = {
  whileHover: { y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" },
  transition: { type: "spring", stiffness: 280, damping: 22 },
};

// SVG path drawing animation
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// Card reveal animation with enhanced easing
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stagger for timeline items
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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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

// Reduced motion variants
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
