'use client';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export function StepIndicator({
  totalSteps,
  currentStep,
  className,
}: StepIndicatorProps) {
  if (totalSteps <= 1) return null;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            index <= currentStep
              ? 'w-6 bg-coral-500'
              : 'w-2 bg-muted'
          )}
        />
      ))}
    </div>
  );
}
