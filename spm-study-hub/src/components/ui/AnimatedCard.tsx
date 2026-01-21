'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hoverEffect = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={hoverEffect ? cardHover : undefined}
        initial={hoverEffect ? 'rest' : undefined}
        whileHover={hoverEffect ? 'hover' : undefined}
        className={cn(
          'rounded-xl border border-border bg-card p-6 shadow-card',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';
