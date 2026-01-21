'use client';

import { motion } from 'framer-motion';
import { progressBar } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div
      className={cn(
        'h-1 w-full overflow-hidden rounded-full bg-muted',
        className
      )}
    >
      <motion.div
        variants={progressBar}
        initial="initial"
        animate="animate"
        custom={progress}
        className="h-full bg-gradient-to-r from-coral-500 to-teal-500"
      />
    </div>
  );
}
