import { Variants } from 'framer-motion';

/**
 * Slide transition variants for carousel-style navigation
 */
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  }),
};

/**
 * Step-by-step content reveal variants
 */
export const stepVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Container with staggered children animations
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Advanced staggered container with better timing
 */
export const staggerContainerAdvanced: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

/**
 * Card hover animation
 */
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

/**
 * 3D Card hover effect
 */
export const card3DHover: Variants = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Card hover with glow effect
 */
export const cardHoverGlow: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 40px -10px rgb(255 107 71 / 0.2), 0 10px 20px -5px rgb(20 184 166 / 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Scale in animation
 */
export const scaleIn: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide up animation
 */
export const slideUp: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Scroll reveal - fade up with scale
 */
export const scrollReveal: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Hero text reveal with dramatic effect
 */
export const heroTextReveal: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
    rotateX: -15,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Floating element animation
 */
export const floatingElement: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/**
 * Badge pop-in with spring
 */
export const badgePopIn: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  },
};

/**
 * Page transition
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Icon bounce on hover
 */
export const iconBounce: Variants = {
  rest: {
    y: 0,
    rotate: 0,
  },
  hover: {
    y: -3,
    rotate: [-5, 5, 0],
    transition: {
      y: { duration: 0.2 },
      rotate: { duration: 0.4, ease: 'easeInOut' },
    },
  },
};

/**
 * Arrow slide animation for CTAs
 */
export const arrowSlide: Variants = {
  rest: {
    x: 0,
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

/**
 * Pulse animation for highlights
 */
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

/**
 * Glow pulse animation
 */
export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 20px rgb(255 107 71 / 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgb(255 107 71 / 0.3)',
      '0 0 40px rgb(255 107 71 / 0.5)',
      '0 0 20px rgb(255 107 71 / 0.3)',
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/**
 * Modal animation
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

/**
 * Overlay animation
 */
export const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * List item animation for staggered lists
 */
export const listItem: Variants = {
  hidden: {
    x: -10,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Progress bar animation
 */
export const progressBar: Variants = {
  initial: {
    width: 0,
  },
  animate: (percent: number) => ({
    width: `${percent}%`,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

/**
 * Button press animation
 */
export const buttonPress = {
  tap: {
    scale: 0.98,
  },
};

/**
 * Shake animation for incorrect answers
 */
export const shake: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Success animation (checkmark)
 */
export const checkmark: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Navbar scroll animation
 */
export const navbarScroll: Variants = {
  top: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(0, 0, 0, 0)',
  },
  scrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
};

/**
 * Mobile menu animation
 */
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Mobile menu item animation
 */
export const mobileMenuItemVariants: Variants = {
  closed: {
    x: -20,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Sparkle animation
 */
export const sparkle: Variants = {
  initial: {
    scale: 0,
    rotate: 0,
    opacity: 0,
  },
  animate: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

/**
 * Trophy bounce
 */
export const trophyBounce: Variants = {
  initial: {
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [-2, 2, -2],
    rotate: [-3, 3, -3],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};
