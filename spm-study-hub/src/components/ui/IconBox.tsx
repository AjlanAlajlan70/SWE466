'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type IconBoxSize = 'sm' | 'md' | 'lg' | 'xl';
type IconBoxVariant = 'default' | 'coral' | 'teal' | 'muted';

interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  size?: IconBoxSize;
  variant?: IconBoxVariant;
  children: React.ReactNode;
}

const sizeStyles: Record<IconBoxSize, string> = {
  sm: 'h-8 w-8 text-lg',
  md: 'h-10 w-10 text-xl',
  lg: 'h-12 w-12 text-2xl',
  xl: 'h-16 w-16 text-4xl',
};

const variantStyles: Record<IconBoxVariant, string> = {
  default: 'bg-accent text-accent-foreground',
  coral: 'bg-coral-100 text-coral-600',
  teal: 'bg-teal-100 text-teal-600',
  muted: 'bg-muted text-muted-foreground',
};

export const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-xl',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconBox.displayName = 'IconBox';
