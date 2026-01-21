'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type GradientVariant = 'warm' | 'cool' | 'coral' | 'teal';

interface GradientBoxProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GradientVariant;
  children: React.ReactNode;
}

const gradientStyles: Record<GradientVariant, string> = {
  warm: 'bg-gradient-to-br from-coral-50 via-orange-50 to-amber-50',
  cool: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50',
  coral: 'bg-gradient-to-r from-coral-500 to-coral-600 text-white',
  teal: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white',
};

export const GradientBox = forwardRef<HTMLDivElement, GradientBoxProps>(
  ({ className, variant = 'warm', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6',
          gradientStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GradientBox.displayName = 'GradientBox';
